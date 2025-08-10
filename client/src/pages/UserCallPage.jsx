import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";

const UserCallPage = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnectionRef = useRef(null);
  const remoteSocketIdRef = useRef(null);

  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const iceServers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  useEffect(() => {
    async function setupLocalStream() {
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
          if (event.candidate && remoteSocketIdRef.current) {
            socket.emit("ice-candidate", { to: remoteSocketIdRef.current, candidate: event.candidate });
          }
        };
      } catch {
        setErrorMsg("Allow access to camera and microphone.");
      }
    }

    setupLocalStream();

    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    socket.on("call-answered", async ({ answer, from }) => {
      remoteSocketIdRef.current = from;
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      setCallStarted(true);
      setCallEnded(false);
      setErrorMsg("");
    });

    socket.on("ice-candidate", ({ candidate }) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
      }
    });

    socket.on("no-admin", () => {
      setErrorMsg("No admin available right now. Try again later.");
    });

    socket.on("call-rejected", () => {
      setErrorMsg("Admin rejected the call.");
      setCallStarted(false);
      setCallEnded(true);
    });

    socket.on("call-ended", () => {
      setErrorMsg("Call ended by admin.");
      endCall();
    });

    return () => {
      socket.off("call-answered");
      socket.off("ice-candidate");
      socket.off("no-admin");
      socket.off("call-rejected");
      socket.off("call-ended");
    };
  }, []);

  async function startCall() {
    if (!peerConnectionRef.current) {
      setErrorMsg("Error starting call, refresh and try again.");
      return;
    }
    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      socket.emit("call-user", { offer });

      remoteSocketIdRef.current = null;

      setErrorMsg("");
    } catch {
      setErrorMsg("Unable to start call.");
    }
  }

  function endCall() {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setCallStarted(false);
    setCallEnded(true);
    setErrorMsg("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center p-10 font-sans">
      <h1 className="text-4xl font-bold text-blue-900 mb-2">Video KYC Process</h1>
      <p className="max-w-xl text-center text-blue-700 mb-8">
        Connect securely with a bank employee for your KYC verification. Please allow camera and microphone access.
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
            {callStarted ? "Bank Employee" : "Waiting for connection..."}
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-6 p-3 max-w-md text-center bg-red-100 text-red-700 rounded-md font-semibold shadow-md">
          {errorMsg}
        </div>
      )}

      <div className="mt-8">
        {!callStarted && !callEnded && (
          <button
            onClick={startCall}
            className="px-12 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow-md transition"
          >
            Start Call
          </button>
        )}

        {callStarted && (
          <button
            onClick={endCall}
            className="px-12 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition"
          >
            End Call
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCallPage;
