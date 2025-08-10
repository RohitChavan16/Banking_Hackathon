import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://banking-hackathon.onrender.com"); 

const AdminVideoPage = () => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [callStarted, setCallStarted] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    socket.emit("admin-register");
    console.log("Admin registered:", socket.id);

    socket.on("incoming-call", async ({ from, offer }) => {
      console.log("Incoming call from:", from);
      setIncomingCall({ from, offer });
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        await peerConnectionRef.current?.addIceCandidate(candidate);
      } catch (e) {
        console.error(e);
      }
    });

    socket.on("call-ended", () => {
      endCall();
    });

    return () => {
      socket.off("incoming-call");
      socket.off("ice-candidate");
      socket.off("call-ended");
    };
  }, []);

  const acceptCall = async () => {
    if (!incomingCall) return;

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
          socket.emit("ice-candidate", { to: incomingCall.from, candidate: event.candidate });
        }
      };

      await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("answer-call", { to: incomingCall.from, answer });

      setCallStarted(true);
      setIncomingCall(null);
    } catch (err) {
      console.error(err);
      alert("Failed to accept call");
    }
  };

  const endCall = () => {
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;

    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      remoteVideoRef.current.srcObject = null;
    }

    setCallStarted(false);
    setIncomingCall(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Video Call</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <h3>Your Video</h3>
          <video ref={localVideoRef} autoPlay muted playsInline style={{ width: 300, border: "1px solid black" }} />
        </div>

        <div>
          <h3>User Video</h3>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: 300, border: "1px solid black" }} />
        </div>
      </div>

      {incomingCall && (
        <div style={{ marginTop: 20 }}>
          <p>Incoming call from {incomingCall.from}</p>
          <button onClick={acceptCall}>Accept Call</button>
          <button onClick={() => setIncomingCall(null)}>Reject Call</button>
        </div>
      )}

      {callStarted && (
        <div style={{ marginTop: 20 }}>
          <button onClick={endCall}>End Call</button>
        </div>
      )}
    </div>
  );
};

export default AdminVideoPage;
