import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://banking-hackathon.onrender.com");

const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
  ],
};

const UserCallPage = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  const [peerConnection, setPeerConnection] = useState(null);
  const [callStarted, setCallStarted] = useState(false);

  useEffect(() => {
    socket.on("call-accepted", async ({ answer }) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socket.on("call-rejected", () => {
      alert("Call rejected by admin");
      cleanup();
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

    socket.on("no-admin", () => {
      alert("Admin is not available");
      cleanup();
    });

    return () => {
      socket.off("call-accepted");
      socket.off("call-rejected");
      socket.off("ice-candidate");
      socket.off("no-admin");
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

  const startCall = async () => {
    const stream = await startLocalStream();
    if (!stream) return;

    const pc = new RTCPeerConnection(configuration);

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, to: "admin" });
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Send offer to admin via socket
    socket.emit("call-admin", { offer, from: socket.id });

    setPeerConnection(pc);
    setCallStarted(true);
  };

  const cleanup = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    setCallStarted(false);
    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Page (Call Admin)</h2>

      {!callStarted ? (
        <button onClick={startCall} className="px-6 py-3 bg-blue-600 text-white rounded">Call Admin</button>
      ) : (
        <button onClick={cleanup} className="px-6 py-3 bg-red-600 text-white rounded">End Call</button>
      )}

      <div className="flex space-x-4 mt-4">
        <div>
          <h3 className="font-semibold">Your Video</h3>
          <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", backgroundColor: "#000" }} />
        </div>
        <div>
          <h3 className="font-semibold">Admin Video</h3>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", backgroundColor: "#000" }} />
        </div>
      </div>
    </div>
  );
};

export default UserCallPage;
