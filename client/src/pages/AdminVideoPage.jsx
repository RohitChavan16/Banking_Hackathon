import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://banking-hackathon.onrender.com");

const AdminVideoPage = () => {
  const [incomingCall, setIncomingCall] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnectionRef = useRef(null);

  const iceServers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  useEffect(() => {
    socket.emit("admin-register");
  }, []);

  useEffect(() => {
    socket.on("incoming-call", async ({ from, offer }) => {
      setIncomingCall({ from, offer });
    });

    socket.on("ice-candidate", ({ candidate }) => {
      if (peerConnectionRef.current) {
        console.log("Admin received ICE candidate", candidate);
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
      }
    });

    return () => {
      socket.off("incoming-call");
      socket.off("ice-candidate");
    };
  }, []);

  async function acceptCall() {
    if (!incomingCall) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;

      const pc = new RTCPeerConnection(iceServers);
      peerConnectionRef.current = pc;

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.ontrack = (event) => {
        console.log("Admin ontrack:", event.streams[0]);
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Admin sending ICE candidate", event.candidate);
          socket.emit("ice-candidate", { to: incomingCall.from, candidate: event.candidate });
        }
      };

      await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("answer-call", { to: incomingCall.from, answer });

      setIncomingCall(null);
    } catch (err) {
      console.error("Admin accept call error", err);
    }
  }

  return (
    <div>
      <h2>Admin Video</h2>
      <video ref={localVideoRef} autoPlay muted playsInline style={{ width: "300px" }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px" }} />
      {incomingCall && <button onClick={acceptCall}>Accept Call</button>}
    </div>
  );
};

export default AdminVideoPage;
