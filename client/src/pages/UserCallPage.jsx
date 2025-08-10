import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://banking-hackathon.onrender.com"); 

const UserCallPage = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [callStarted, setCallStarted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection(iceServers);
        peerConnectionRef.current = pc;

        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        pc.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", { to: null, candidate: event.candidate }); // to admin, server will route
          }
        };
      } catch {
        setErrorMsg("Cannot access camera or mic.");
      }
    }
    setup();

    socket.on("call-answered", async ({ answer }) => {
      try {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        setCallStarted(true);
        setErrorMsg("");
      } catch {
        setErrorMsg("Error setting remote description");
      }
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        await peerConnectionRef.current.addIceCandidate(candidate);
      } catch (e) {
        console.error(e);
      }
    });

    socket.on("no-admin", () => {
      setErrorMsg("No admin available. Try again later.");
    });

    socket.on("call-ended", () => {
      setCallStarted(false);
      peerConnectionRef.current?.close();
      peerConnectionRef.current = null;
    });

    return () => {
      socket.off("call-answered");
      socket.off("ice-candidate");
      socket.off("no-admin");
      socket.off("call-ended");
    };
  }, []);

  const startCall = async () => {
    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      socket.emit("call-user", { offer });

      setErrorMsg("");
    } catch {
      setErrorMsg("Failed to start call.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Start Video KYC Call</h1>
      <p>Click below to call admin for KYC verification</p>

      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <h3>Your Video</h3>
          <video ref={localVideoRef} autoPlay muted playsInline style={{ width: 300, border: "1px solid black" }} />
        </div>

        <div>
          <h3>Admin Video</h3>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: 300, border: "1px solid black" }} />
        </div>
      </div>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <button onClick={startCall} disabled={callStarted} style={{ marginTop: 20 }}>
        Start Call
      </button>
    </div>
  );
};

export default UserCallPage;
