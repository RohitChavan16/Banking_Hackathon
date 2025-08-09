import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const AdminVideoPage = () => {
  const [incomingCall, setIncomingCall] = useState(null); // { from, offer }
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    socket.emit("admin-register"); // Register as admin on connect
  }, []);

  // Listen for incoming calls from users
  useEffect(() => {
    socket.on("incoming-call", async ({ from, offer }) => {
      console.log("Incoming call from user:", from);
      setIncomingCall({ from, offer });
    });

    return () => {
      socket.off("incoming-call");
    };
  }, []);

  // Accept call handler
  async function acceptCall() {
    if (!incomingCall) return;

    try {
      // Setup local media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = stream;

      peerConnectionRef.current = new RTCPeerConnection(iceServers);
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current.addTrack(track, stream);
      });

      peerConnectionRef.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            to: incomingCall.from,
            candidate: event.candidate,
          });
        }
      };

      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(incomingCall.offer)
      );

      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      socket.emit("answer-call", {
        to: incomingCall.from,
        answer,
      });

      setIncomingCall(null); // Clear incoming call modal or message
    } catch (err) {
      console.error("Failed to accept call:", err);
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center font-sans">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">Admin Video Panel</h1>

      <div className="flex flex-row gap-10">
        {/* Local Video */}
        <div className="flex flex-col items-center">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-72 h-56 rounded-lg border-4 border-blue-700 shadow-lg"
          />
          <p className="mt-3 font-semibold text-blue-800">Your Camera</p>
        </div>

        {/* Remote Video */}
        <div className="flex flex-col items-center">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-72 h-56 rounded-lg border-4 border-green-600 shadow-lg"
          />
          <p className="mt-3 font-semibold text-green-700">User Camera</p>
        </div>
      </div>

      {/* Incoming Call Popup */}
      {incomingCall && (
        <div className="fixed top-20 bg-white border-2 border-blue-600 shadow-lg rounded-lg p-6 max-w-md text-center z-50">
          <h2 className="text-xl font-bold mb-4">Incoming Call</h2>
          <p className="mb-6">User {incomingCall.from} is calling you.</p>
          <button
            onClick={acceptCall}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded mr-4"
          >
            Accept
          </button>
          <button
            onClick={() => setIncomingCall(null)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminVideoPage;
