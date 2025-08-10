import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const AdminVideoPage = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [incomingCall, setIncomingCall] = useState(null);
  const [callerId, setCallerId] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    socket.emit("register-admin");

    socket.on("incoming-call", ({ offer, from }) => {
      setIncomingCall(offer);
      setCallerId(from);
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (peerConnection) {
        try {
          await peerConnection.addIceCandidate(candidate);
        } catch (e) {
          console.error("Error adding ICE", e);
        }
      }
    });

    return () => {
      socket.off("incoming-call");
      socket.off("ice-candidate");
    };
  }, [peerConnection]);

  const startLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    return stream;
  };

  const acceptCall = async () => {
    const stream = await startLocalStream();
    const pc = new RTCPeerConnection(configuration);
    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, to: callerId });
      }
    };

    await pc.setRemoteDescription(new RTCSessionDescription(incomingCall));
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
      <h2>Admin Page</h2>
      {incomingCall ? (
        <div>
          <p>Incoming Call...</p>
          <button onClick={acceptCall} className="bg-green-500 text-white p-2 mr-2">Accept</button>
          <button onClick={rejectCall} className="bg-red-500 text-white p-2">Reject</button>
        </div>
      ) : (
        <p>No incoming calls</p>
      )}
      <div className="flex gap-4 mt-4">
        <div>
          <h3>Your Video</h3>
          <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", background: "#000" }} />
        </div>
        <div>
          <h3>User Video</h3>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", background: "#000" }} />
        </div>
      </div>
    </div>
  );
};

export default AdminVideoPage;
