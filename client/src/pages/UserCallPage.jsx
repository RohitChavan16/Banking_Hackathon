import React, { useEffect, useRef, useState } from "react";
import socket from "../socket"; // your socket instance
import styles from "./VideoCall.module.css";

const UserCallPage = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const remoteSocketIdRef = useRef(null);

  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    async function setupLocalStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection(iceServers);
        peerConnectionRef.current = pc;

        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        pc.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        pc.onicecandidate = (event) => {
          if (event.candidate && remoteSocketIdRef.current) {
            socket.emit("ice-candidate", {
              to: remoteSocketIdRef.current,
              candidate: event.candidate,
            });
          }
        };
      } catch (err) {
        setErrorMsg("Error accessing camera or microphone. Please allow permissions.");
      }
    }

    setupLocalStream();

    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
      // Keep socket connected for reuse
    };
  }, []);

  useEffect(() => {
    socket.on("call-answered", async (data) => {
      try {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
        setCallStarted(true);
        setCallEnded(false);
        setErrorMsg("");
      } catch {
        setErrorMsg("Failed to establish connection.");
      }
    });

    socket.on("ice-candidate", (data) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate)).catch(console.error);
      }
    });

    socket.on("no-admin", () => {
      setErrorMsg("No admin available right now. Please try later.");
    });

    socket.on("call-rejected", () => {
      setErrorMsg("Admin rejected the call.");
      setCallStarted(false);
      setCallEnded(true);
    });

    socket.on("call-ended", () => {
      setErrorMsg("Call ended by admin.");
      endCallCleanup();
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
      setErrorMsg("Something went wrong, please refresh.");
      return;
    }
    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      socket.emit("call-user", { offer });

      // Server will forward messages, no admin socketId here
      remoteSocketIdRef.current = null;

      setErrorMsg("");
    } catch {
      setErrorMsg("Unable to start call. Try again.");
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
    setCallEnded(true);
  }

  return (
    <div className={styles.container}>
      <h1 className="text-4xl font-extrabold text-blue-900 mb-6">Video KYC Verification</h1>
      <p className="max-w-xl mx-auto text-gray-700 mb-10 px-2">
        This video call allows you to connect securely with a bank employee for your KYC verification. Please enable your camera and microphone.
      </p>

      <div className={styles.videos}>
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

        <div className={styles.videoWrapper}>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`${styles.video} ${callStarted ? "border-green-600" : "border-gray-400"}`}
          />
          <p className={`mt-4 font-semibold text-lg ${callStarted ? "text-green-700" : "text-gray-500"}`}>
            {callStarted ? "Bank Employee" : "Waiting for connection..."}
          </p>
        </div>
      </div>

      {errorMsg && <div className={styles.error}>{errorMsg}</div>}

      <div className={styles.btnGroup}>
        {!callStarted && !callEnded && (
          <button onClick={startCall} className={styles.acceptBtn}>
            Start Call
          </button>
        )}

        {callStarted && (
          <button onClick={endCall} className={styles.hangupBtn}>
            End Call
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCallPage;
