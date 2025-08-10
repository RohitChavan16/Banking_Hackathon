import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";

const AdminVideoPage = () => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [callStarted, setCallStarted] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnectionRef = useRef(null);

  const iceServers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  useEffect(() => {
    socket.emit("admin-register");
  }, []);

  useEffect(() => {
    socket.on("incoming-call", ({ from, offer }) => {
      setIncomingCall({ from, offer });
      setErrorMsg("");
    });

    socket.on("ice-candidate", ({ candidate }) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
      }
    });

    socket.on("call-ended", () => {
      endCall();
      alert("User ended the call.");
    });

    return () => {
      socket.off("incoming-call");
      socket.off("ice-candidate");
      socket.off("call-ended");
    };
  }, []);

  async function acceptCall() {
    if (!incomingCall) return;
    setIsAccepting(true);
    setErrorMsg("");

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
      setErrorMsg("Failed to accept call.");
      console.error(err);
    } finally {
      setIsAccepting(false);
    }
  }

  function hangUp() {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    socket.emit("call-ended", { to: incomingCall?.from });
    setCallStarted(false);
    setIncomingCall(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-10 font-sans">
      <h1 className="text-4xl font-bold text-blue-900 mb-2">Admin Video Panel</h1>
      <p className="mb-8 max-w-xl text-center text-blue-700">
        You are the bank employee. Accept incoming user video KYC requests here.
      </p>

      <div className="flex flex-col md:flex-row gap-10 justify-center w-full max-w-5xl">
        <div className="flex flex-col items-center">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-80 h-60 rounded-lg border-4 border-blue-600 shadow-lg"
          />
          <span className="mt-3 text-blue-700 font-semibold">Your Camera</span>
        </div>

        <div className="flex flex-col items-center">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`w-80 h-60 rounded-lg border-4 shadow-lg ${callStarted ? "border-green-600" : "border-gray-400"}`}
          />
          <span className={`mt-3 font-semibold ${callStarted ? "text-green-700" : "text-gray-500"}`}>
            {callStarted ? "User Camera" : "Waiting for user..."}
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-6 p-3 max-w-md text-center bg-red-100 text-red-700 rounded-md font-semibold shadow-md">
          {errorMsg}
        </div>
      )}

      {!callStarted && incomingCall && (
        <div className="mt-8 flex gap-6">
          <button
            onClick={acceptCall}
            disabled={isAccepting}
            className={`px-10 py-3 rounded-lg font-semibold text-white shadow-lg transition ${
              isAccepting ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isAccepting ? "Accepting..." : "Accept Call"}
          </button>
          <button
            onClick={() => {
              socket.emit("call-rejected", { to: incomingCall.from });
              setIncomingCall(null);
            }}
            disabled={isAccepting}
            className="px-10 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-lg transition"
          >
            Reject
          </button>
        </div>
      )}

      {callStarted && (
        <button
          onClick={hangUp}
          className="mt-10 px-12 py-4 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold shadow-lg transition"
        >
          Hang Up Call
        </button>
      )}
    </div>
  );
};

export default AdminVideoPage;
