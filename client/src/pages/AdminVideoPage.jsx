import React, { useEffect, useRef, useState } from "react";
import socket from "../socket"; // Your socket instance
import styles from "./VideoCall.module.css";

const AdminVideoPage = () => {
  const [incomingCall, setIncomingCall] = useState(null); // { from, offer }
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

  // Register admin on connect and reconnect
  useEffect(() => {
    function registerAdmin() {
      socket.emit("admin-register");
    }

    registerAdmin();

    socket.on("connect", registerAdmin);

    return () => {
      socket.off("connect", registerAdmin);
    };
  }, []);

  // Listen for incoming call, ice candidates, and call ended
  useEffect(() => {
    socket.on("incoming-call", ({ from, offer }) => {
      setIncomingCall({ from, offer });
      setErrorMsg("");
    });

    socket.on("ice-candidate", (data) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current
          .addIceCandidate(new RTCIceCandidate(data.candidate))
          .catch(console.error);
      }
    });

    socket.on("call-ended", () => {
      endCallCleanup();
      alert("User ended the call.");
    });

    socket.on("call-rejected", () => {
      setErrorMsg("User rejected the call.");
      setIncomingCall(null);
    });

    return () => {
      socket.off("incoming-call");
      socket.off("ice-candidate");
      socket.off("call-ended");
      socket.off("call-rejected");
    };
  }, []);

  // Accept incoming call
  async function acceptCall() {
    if (!incomingCall) return;
    setIsAccepting(true);
    setErrorMsg("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
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

  // Reject call
  function rejectCall() {
    if (incomingCall) {
      socket.emit("call-rejected", { to: incomingCall.from });
      setIncomingCall(null);
    }
  }

  // Cleanup peer connection and media streams
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

  // Hang up call manually
  function hangUpCall() {
    if (currentCaller) {
      socket.emit("call-ended", { to: currentCaller });
    }
    endCallCleanup();
  }

  return (
    <div className={styles.container}>
      <h1 className="text-4xl font-extrabold text-blue-900 mb-10">Admin Video Panel</h1>

      <div className={styles.videos}>
        {/* Local Video */}
        <div className={styles.videoWrapper}>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className={`${styles.video} ${styles.mutedVideo}`}
          />
          <p className="mt-4 text-blue-800 font-semibold text-lg">Your Camera</p>
        </div>

        {/* Remote Video */}
        <div className={styles.videoWrapper}>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`${styles.video} ${callStarted ? "border-green-600" : "border-gray-400"}`}
          />
          <p
            className={`mt-4 font-semibold text-lg ${
              callStarted ? "text-green-700" : "text-gray-500"
            }`}
          >
            {callStarted ? "User Camera" : "Waiting for call..."}
          </p>
        </div>
      </div>

      {errorMsg && <div className={styles.error}>{errorMsg}</div>}

      {/* Incoming Call Modal */}
      {incomingCall && (
        <div className={styles.modal}>
          <h2 className={styles.modalHeading}>Incoming Call</h2>
          <p className={styles.modalText}>
            User <span className="font-mono">{incomingCall.from}</span> is calling you.
          </p>
          <div className={styles.btnGroup}>
            <button
              onClick={acceptCall}
              disabled={isAccepting}
              className={styles.acceptBtn}
            >
              {isAccepting ? "Accepting..." : "Accept"}
            </button>
            <button
              onClick={rejectCall}
              disabled={isAccepting}
              className={styles.rejectBtn}
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {/* Hang Up Button */}
      {callStarted && (
        <button onClick={hangUpCall} className={styles.hangupBtn}>
          Hang Up Call
        </button>
      )}
    </div>
  );
};

export default AdminVideoPage;
