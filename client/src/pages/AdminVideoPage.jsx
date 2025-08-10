import React, { useEffect, useRef, useState } from "react";
import socket from "../socket"; // Make sure your socket client connects to backend URL

const AdminVideoPage = () => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [callStarted, setCallStarted] = useState(false);
  const [currentCaller, setCurrentCaller] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    // Register admin on connect
    function registerAdmin() {
      socket.emit("admin-register");
    }
    registerAdmin();
    socket.on("connect", registerAdmin);
    return () => {
      socket.off("connect", registerAdmin);
    };
  }, []);

  useEffect(() => {
    socket.on("incoming-call", ({ from, offer }) => {
      setIncomingCall({ from, offer });
      setErrorMsg("");
    });

    socket.on("ice-candidate", (data) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate)).catch(console.error);
      }
    });

    socket.on("call-ended", () => {
      endCallCleanup();
      alert("User ended the call.");
    });

    socket.on("disconnect", () => {
      // If current caller disconnected, clean up
      endCallCleanup();
      setIncomingCall(null);
      setErrorMsg("User disconnected.");
    });

    return () => {
      socket.off("incoming-call");
      socket.off("ice-candidate");
      socket.off("call-ended");
      socket.off("disconnect");
    };
  }, [currentCaller]);

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

      setCurrentCaller(incomingCall.from);
      setCallStarted(true);
      setIncomingCall(null);
    } catch (err) {
      setErrorMsg("Failed to accept call.");
      console.error(err);
    } finally {
      setIsAccepting(false);
    }
  }

  function rejectCall() {
    if (incomingCall) {
      socket.emit("call-rejected", { to: incomingCall.from });
      setIncomingCall(null);
    }
  }

  function hangUpCall() {
    if (currentCaller) {
      socket.emit("call-ended", { to: currentCaller });
    }
    endCallCleanup();
  }

  function endCallCleanup() {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      remoteVideoRef.current.srcObject = null;
    }
    setCallStarted(false);
    setCurrentCaller(null);
  }

  return (
    <div className="min-h-screen p-10 flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-300">
      <h1 className="text-4xl font-bold mb-10 text-blue-900">Admin Video Panel</h1>

      <div className="flex gap-12">
        <div>
          <video ref={localVideoRef} autoPlay muted playsInline className="w-80 h-60 rounded-xl border-4 border-blue-700 shadow-lg" />
          <p className="mt-4 text-blue-800 font-semibold">Your Camera</p>
        </div>
        <div>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`w-80 h-60 rounded-xl border-4 shadow-lg ${callStarted ? "border-green-600" : "border-gray-400"}`}
          />
          <p className={`mt-4 font-semibold ${callStarted ? "text-green-700" : "text-gray-500"}`}>
            {callStarted ? "User Camera" : "Waiting for call..."}
          </p>
        </div>
      </div>

      {errorMsg && <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md max-w-md text-center font-medium shadow-md">{errorMsg}</div>}

      {incomingCall && (
        <div className="fixed top-24 bg-white border-2 border-blue-600 shadow-lg rounded-xl p-8 max-w-md text-center z-50">
          <h2 className="text-2xl font-bold mb-5">Incoming Call</h2>
          <p className="mb-8 text-lg">
            User <span className="font-mono">{incomingCall.from}</span> is calling you.
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={acceptCall}
              disabled={isAccepting}
              className={`text-white font-semibold px-8 py-3 rounded-lg shadow-md transition ${
                isAccepting ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isAccepting ? "Accepting..." : "Accept"}
            </button>
            <button onClick={rejectCall} disabled={isAccepting} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition">
              Reject
            </button>
          </div>
        </div>
      )}

      {callStarted && (
        <button
          onClick={hangUpCall}
          className="mt-12 bg-red-600 hover:bg-red-700 text-white font-semibold px-12 py-4 rounded-xl shadow-lg transition"
        >
          Hang Up Call
        </button>
      )}
    </div>
  );
};

export default AdminVideoPage;
