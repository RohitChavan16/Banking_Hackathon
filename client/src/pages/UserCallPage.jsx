import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://banking-hackathon.onrender.com");

const UserCallPage = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnectionRef = useRef(null);
  const [callStarted, setCallStarted] = useState(false);
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  const iceServers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  useEffect(() => {
    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection(iceServers);
        peerConnectionRef.current = pc;

        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        pc.ontrack = (event) => {
          console.log("User ontrack:", event.streams[0]);
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        pc.onicecandidate = (event) => {
          if (event.candidate && remoteSocketId) {
            console.log("User sending ICE candidate", event.candidate);
            socket.emit("ice-candidate", { to: remoteSocketId, candidate: event.candidate });
          }
        };
      } catch (err) {
        console.error("User media error", err);
      }
    }

    setup();

    socket.on("call-answered", ({ answer, from }) => {
      setRemoteSocketId(from);
      peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      setCallStarted(true);
    });

    socket.on("ice-candidate", ({ candidate, from }) => {
      console.log("User received ICE candidate", candidate);
      peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
      setRemoteSocketId(from);
    });

    return () => {
      socket.off("call-answered");
      socket.off("ice-candidate");
    };
  }, [remoteSocketId]);

  async function startCall() {
    if (!peerConnectionRef.current) return;

    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      socket.emit("call-user", { offer });

      setCallStarted(false);
      setRemoteSocketId(null);
    } catch (err) {
      console.error("User startCall error", err);
    }
  }

  return (
    <div>
      <h2>User Video</h2>
      <video ref={localVideoRef} autoPlay muted playsInline style={{ width: "300px" }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px" }} />
      {!callStarted && <button onClick={startCall}>Start Call</button>}
      {callStarted && <p>Call in progress...</p>}
    </div>
  );
};

export default UserCallPage;
