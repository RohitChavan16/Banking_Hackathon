import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://banking-hackathon.onrender.com");

const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
  ],
};

const AdminVideoPage = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  const [incomingCall, setIncomingCall] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [callerId, setCallerId] = useState(null);

  useEffect(() => {
    socket.emit("register-admin");

    socket.on("incoming-call", async ({ offer, from }) => {
      setIncomingCall({ offer });
      setCallerId(from);
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (peerConnection) {
        try {
          await peerConnection.addIceCandidate(candidate);
        } catch (e) {
          console.error("Error adding ICE candidate", e);
        }
      }
    });

    return () => {
      socket.off("incoming-call");
      socket.off("ice-candidate");
    };
  }, [peerConnection]);

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;
      return stream;
    } catch (err) {
      console.error("Error accessing media devices.", err);
      alert("Could not access camera/mic");
      return null;
    }
  };

  const acceptCall = async () => {
    const stream = await startLocalStream();
    if (!stream) return;

    const pc = new RTCPeerConnection(configuration);

    // Add local tracks to peer connection
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.ontrack = (event) => {
      // Set remote video stream
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, to: callerId });
      }
    };

    await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("answer-call", { answer, to: callerId });

    setPeerConnection(pc);
    setIncomingCall(null);
  };

  const rejectCall = () => {
    socket.emit("reject-call", { to: callerId });
    setIncomingCall(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Page (Receive Calls)</h2>

      {incomingCall ? (
        <div className="mb-4 border p-4 bg-yellow-100 rounded">
          <p>Incoming call...</p>
          <button onClick={acceptCall} className="mr-2 px-4 py-2 bg-green-500 text-white rounded">Accept</button>
          <button onClick={rejectCall} className="px-4 py-2 bg-red-500 text-white rounded">Reject</button>
        </div>
      ) : (
        <p>No incoming calls</p>
      )}

      <div className="flex space-x-4 mt-4">
        <div>
          <h3 className="font-semibold">Your Video</h3>
          <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", backgroundColor: "#000" }} />
        </div>
        <div>
          <h3 className="font-semibold">User Video</h3>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", backgroundColor: "#000" }} />
        </div>
      </div>
    </div>
  );
};

export default AdminVideoPage;
