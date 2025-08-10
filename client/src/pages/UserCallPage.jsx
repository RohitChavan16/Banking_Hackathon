import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
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
          console.error("Error adding ICE", e);
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
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    return stream;
  };

  const startCall = async () => {
    const stream = await startLocalStream();
    const pc = new RTCPeerConnection(configuration);
    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, to: "admin" }); // will fix below
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("call-admin", { offer, from: socket.id });
    setPeerConnection(pc);
    setCallStarted(true);
  };

  const cleanup = () => {
    if (peerConnection) peerConnection.close();
    setPeerConnection(null);
    setCallStarted(false);
    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
  };

  return (
    <div className="p-4">
      <h2>User Page</h2>
      {!callStarted ? (
        <button onClick={startCall} className="bg-blue-500 text-white p-2">Call Admin</button>
      ) : (
        <button onClick={cleanup} className="bg-red-500 text-white p-2">End Call</button>
      )}
      <div className="flex gap-4 mt-4">
        <div>
          <h3>Your Video</h3>
          <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", background: "#000" }} />
        </div>
        <div>
          <h3>Admin Video</h3>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", background: "#000" }} />
        </div>
      </div>
    </div>
  );
};

export default UserCallPage;
