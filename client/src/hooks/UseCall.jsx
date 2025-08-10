import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// 👇 Replace with your machine's LAN IP (e.g., 192.168.x.x:5000)
const socket = io("http://192.168.1.10:5000", {
  transports: ["websocket"], // force websocket for stability
});

export default function UseCall(isAdmin) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    // 🔹 Create PeerConnection with STUN server
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // 🔹 Get local video/audio
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });
      })
      .catch((err) => console.error("Camera error:", err));

    // 🔹 Remote stream handling
    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // 🔹 ICE Candidate exchange
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate);
      }
    };

    // 🔹 Socket events
    socket.on("offer", async (offer) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", answer);
    });

    socket.on("answer", async (answer) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", async (candidate) => {
      try {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("Error adding ICE candidate", e);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 🔹 Start call (Admin only)
  const startCall = async () => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.emit("offer", offer);
    setCallActive(true);
  };

  return { localVideoRef, remoteVideoRef, startCall, callActive };
}
