import React, { useEffect, useRef, useState } from "react";
import socket from "../socket"; // Use the centralized socket

const UserCallPage = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [localStream, setLocalStream] = useState(null);

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" }
    ],
  };

  useEffect(() => {
    // Setup local media stream on component mount
    async function setupLocalStream() {
      try {
        console.log("Requesting user media...");
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user"
          }, 
          audio: {
            echoCancellation: true,
            noiseSuppression: true
          }
        });
        
        console.log("Local stream obtained:", stream.getTracks().map(t => `${t.kind}: ${t.label}`));
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.onloadedmetadata = () => {
            console.log("Local video metadata loaded");
            localVideoRef.current.play().catch(e => console.error("Local video play error:", e));
          };
        }
        setLocalStream(stream);
        console.log("Local stream setup complete");
      } catch (err) {
        console.error("Error accessing media devices:", err);
        if (err.name === 'NotAllowedError') {
          setErrorMsg("Camera/microphone permission denied. Please allow access and refresh the page.");
        } else if (err.name === 'NotFoundError') {
          setErrorMsg("No camera or microphone found. Please check your devices.");
        } else {
          setErrorMsg("Error accessing camera or microphone. Please allow permissions.");
        }
      }
    }

    // Socket connection handlers
    socket.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
      setErrorMsg("");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
      setErrorMsg("Disconnected from server");
      endCallCleanup();
    });

    setupLocalStream();

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      // Clean up local stream
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    socket.on("call-sent", (data) => {
      console.log("✅ Call sent confirmation:", data);
    });

    socket.on("admin-status", (data) => {
      console.log("📊 Admin status:", data);
    });

    socket.on("call-answered", async (data) => {
      console.log("Call answered by admin");
      try {
        if (peerConnectionRef.current && data.answer) {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
          setCallStarted(true);
          setCallEnded(false);
          setIsCallInProgress(false);
          setErrorMsg("");
          console.log("Call established successfully");
        }
      } catch (err) {
        console.error("Error setting remote description:", err);
        setErrorMsg("Failed to establish connection.");
        setIsCallInProgress(false);
        endCallCleanup();
      }
    });

    socket.on("ice-candidate", (data) => {
      console.log("Received ICE candidate from admin");
      if (peerConnectionRef.current && data.candidate) {
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate))
          .catch(err => console.error("Error adding ICE candidate:", err));
      }
    });

    socket.on("no-admin", (data) => {
      console.log("No admin available:", data);
      setErrorMsg(`No admin available: ${data?.reason || 'Please try again later'}`);
      setIsCallInProgress(false);
      endCallCleanup();
    });

    socket.on("call-rejected", () => {
      console.log("Call rejected by admin");
      setErrorMsg("Admin rejected the call. Please try again later.");
      setCallStarted(false);
      setCallEnded(true);
      setIsCallInProgress(false);
      endCallCleanup();
    });

    socket.on("call-ended", () => {
      console.log("Call ended by admin");
      setErrorMsg("Call ended by admin.");
      endCallCleanup();
      setTimeout(() => setErrorMsg(""), 3000);
    });

    // Add timeout for call attempts
    let callTimeout;
    if (isCallInProgress) {
      callTimeout = setTimeout(() => {
        console.log("Call timeout - no response from admin");
        setErrorMsg("Call timeout. Admin may not be available. Please try again.");
        setIsCallInProgress(false);
        endCallCleanup();
      }, 30000); // 30 second timeout
    }

    return () => {
      socket.off("call-sent");
      socket.off("call-answered");
      socket.off("ice-candidate");
      socket.off("no-admin");
      socket.off("call-rejected");
      socket.off("call-ended");
      if (callTimeout) {
        clearTimeout(callTimeout);
      }
    };
  }, [isCallInProgress]); // Add isCallInProgress as dependency

  async function startCall() {
    if (!localStream) {
      setErrorMsg("Camera/microphone not available. Please refresh the page.");
      return;
    }

    if (!isConnected) {
      setErrorMsg("Not connected to server. Please wait...");
      return;
    }

    setIsCallInProgress(true);
    setErrorMsg("");
    
    try {
      console.log("Starting call...");
      
      // Create peer connection
      const pc = new RTCPeerConnection(iceServers);
      peerConnectionRef.current = pc;

      // Add local stream tracks
      localStream.getTracks().forEach((track) => {
        console.log(`Adding track: ${track.kind} - ${track.label}`);
        pc.addTrack(track, localStream);
      });

      // Handle remote stream
      pc.ontrack = (event) => {
        console.log("Remote track received:", event.track.kind, event.streams[0]);
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
          remoteVideoRef.current.onloadedmetadata = () => {
            console.log("Remote video metadata loaded");
            remoteVideoRef.current.play().catch(e => console.error("Remote video play error:", e));
          };
        }
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate to admin");
          socket.emit("ice-candidate", {
            to: adminSocketId, // Admin socket ID handled by server
            candidate: event.candidate,
          });
        }
      };

      // Monitor connection state
      pc.onconnectionstatechange = () => {
        console.log("Connection state:", pc.connectionState);
        if (pc.connectionState === 'connected') {
          console.log("Peer connection established successfully!");
        } else if (pc.connectionState === 'failed') {
          setErrorMsg("Connection failed. Please try again.");
          setIsCallInProgress(false);
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log("ICE connection state:", pc.iceConnectionState);
      };

      // Create offer
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });
      await pc.setLocalDescription(offer);

      // Send call request to admin
      socket.emit("call-user", { offer: offer });
      console.log("Call request sent to server");

    } catch (err) {
      console.error("Error starting call:", err);
      setErrorMsg("Unable to start call. Please try again.");
      setIsCallInProgress(false);
      
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    }
  }

  function endCall() {
    console.log("Ending call");
    
    if (peerConnectionRef.current) {
      socket.emit("call-ended", { to: null }); // Server will handle routing to admin
    }
    
    endCallCleanup();
  }

  function endCallCleanup() {
    console.log("Cleaning up call");
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }
    
    setCallStarted(false);
    setCallEnded(true);
    setIsCallInProgress(false);
  }

  function resetCall() {
    setCallEnded(false);
    setErrorMsg("");
  }

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-white flex flex-col items-center p-8 font-sans">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-4 text-center">
        Video KYC Verification
      </h1>
      <p className="max-w-xl text-center text-gray-700 mb-6 px-4">
        This video call allows you to connect securely with a bank employee for your KYC verification. 
        Please enable camera and microphone.
      </p>

      {/* Connection Status */}
      <div className={`mb-6 px-4 py-2 rounded-lg ${
        isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        Status: {isConnected ? 'Connected' : 'Disconnected from server'}
        {isConnected && <span className="ml-2 text-sm">ID: {socket.id}</span>}
      </div>

      {/* Debug button */}
      {isConnected && (
        <button 
          onClick={() => {
            console.log("Checking admin status...");
            socket.emit("check-admin-status");
          }}
          className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
        >
          Check Admin Status
        </button>
      )}

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-8">
        <div className="flex flex-col items-center">
          <video 
            ref={localVideoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-72 h-56 rounded-xl border-4 border-blue-600 shadow-lg bg-gray-200 object-cover" 
          />
          <span className="mt-3 text-blue-800 font-semibold">Your Camera</span>
        </div>
        <div className="flex flex-col items-center">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`w-72 h-56 rounded-xl border-4 shadow-lg bg-gray-200 object-cover ${
              callStarted ? "border-green-600" : "border-gray-300"
            }`}
          />
          <span className={`mt-3 font-semibold ${
            callStarted ? "text-green-700" : "text-gray-400"
          }`}>
            {callStarted ? "Bank Employee" : "Waiting for connection..."}
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md max-w-md text-center font-medium mb-4">
          {errorMsg}
        </div>
      )}

      <div className="flex space-x-6">
        {!callStarted && !isCallInProgress && (
          <button
            onClick={startCall}
            disabled={!isConnected || !localStream}
            className={`font-bold px-8 py-3 rounded-lg shadow-md transition duration-300 ${
              isConnected && localStream
                ? "bg-blue-700 hover:bg-blue-800 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Start Call
          </button>
        )}

        {isCallInProgress && (
          <div className="flex flex-col items-center">
            <button
              disabled
              className="bg-yellow-500 text-white font-bold px-8 py-3 rounded-lg shadow-md cursor-not-allowed mb-4"
            >
              Calling Admin...
            </button>
            <button
              onClick={() => {
                setIsCallInProgress(false);
                endCallCleanup();
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-300"
            >
              Cancel Call
            </button>
          </div>
        )}

        {callStarted && (
          <button
            onClick={endCall}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg shadow-md transition duration-300"
          >
            End Call
          </button>
        )}

        {callEnded && (
          <button
            onClick={resetCall}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg shadow-md transition duration-300"
          >
            Start New Call
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCallPage;