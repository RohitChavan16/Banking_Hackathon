import React, { useEffect, useRef, useState } from "react";
import socket from "../socket"; // Make sure your socket client connects to backend URL

const AdminVideoPage = () => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [callStarted, setCallStarted] = useState(false);
  const [currentCaller, setCurrentCaller] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Speech-to-Text states
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [remoteTranscript, setRemoteTranscript] = useState("");
  const [captions, setCaptions] = useState([]);
  const [speechSupported, setSpeechSupported] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const recognitionRef = useRef(null);

  const iceServers = [
  // Keep Google STUN for fallback
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },

  // Metered STUN/TURN
  { urls: "stun:stun.relay.metered.ca:80" },
  {
    urls: "turn:global.relay.metered.ca:80",
    username: "5016b78f1e715b84d92a6e8b",
    credential: "L9iEXm2ksn1bHU94",
  },
  {
    urls: "turn:global.relay.metered.ca:80?transport=tcp",
    username: "5016b78f1e715b84d92a6e8b",
    credential: "L9iEXm2ksn1bHU94",
  },
  {
    urls: "turn:global.relay.metered.ca:443",
    username: "5016b78f1e715b84d92a6e8b",
    credential: "L9iEXm2ksn1bHU94",
  },
  {
    urls: "turns:global.relay.metered.ca:443?transport=tcp",
    username: "5016b78f1e715b84d92a6e8b",
    credential: "L9iEXm2ksn1bHU94",
  },
];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        console.log("Speech recognition started");
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }
        
        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);
        
        // Send real-time transcript to remote user
        if (currentCaller && currentTranscript.trim()) {
          socket.emit("speech-transcript", {
            to: currentCaller,
            transcript: currentTranscript,
            isFinal: !!finalTranscript,
            speaker: "admin"
          });
        }
        
        // Add to captions if final
        if (finalTranscript.trim()) {
          const newCaption = {
            id: Date.now(),
            text: finalTranscript,
            speaker: "You",
            timestamp: new Date().toLocaleTimeString()
          };
          setCaptions(prev => [...prev.slice(-9), newCaption]);
          setTranscript("");
        }
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition not supported in this browser");
      setSpeechSupported(false);
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentCaller]);

  // Socket event listeners for speech
  useEffect(() => {
    socket.on("speech-transcript", (data) => {
      console.log("Received transcript:", data);
      setRemoteTranscript(data.transcript);
      
      // Add to captions if final
      if (data.isFinal && data.transcript.trim()) {
        const newCaption = {
          id: Date.now(),
          text: data.transcript,
          speaker: "User",
          timestamp: new Date().toLocaleTimeString()
        };
        setCaptions(prev => [...prev.slice(-9), newCaption]);
        setRemoteTranscript("");
      }
    });

    return () => {
      socket.off("speech-transcript");
    };
  }, []);

  // Toggle Speech Recognition
  const toggleSpeechRecognition = () => {
    if (!speechSupported) {
      setErrorMsg("Speech recognition not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  useEffect(() => {
    // Register admin on connect and reconnect
    function registerAdmin() {
      console.log("Registering admin...");
      socket.emit("admin-register");
    }

    // Check connection status
    socket.on("connect", () => {
      console.log("Admin socket connected with ID:", socket.id);
      setIsConnected(true);
      registerAdmin();
    });

    socket.on("disconnect", () => {
      console.log("Admin socket disconnected");
      setIsConnected(false);
      setIncomingCall(null);
      endCallCleanup();
    });

    socket.on("admin-registered", (data) => {
      console.log("✓ Admin registration confirmed:", data);
      setErrorMsg("");
    });

    // Initial registration if already connected
    if (socket.connected) {
      console.log("Socket already connected, registering admin");
      setIsConnected(true);
      registerAdmin();
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("admin-registered");
    };
  }, []);

  useEffect(() => {
    socket.on("incoming-call", ({ from, offer }) => {
      console.log("=== INCOMING CALL ===");
      console.log("From:", from);
      console.log("Offer:", offer);
      console.log("===================");
      setIncomingCall({ from, offer });
      setErrorMsg("");
    });

    socket.on("ice-candidate", (data) => {
      console.log("Received ICE candidate from:", data.from);
      if (peerConnectionRef.current && data.candidate) {
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate))
          .catch(err => console.error("Error adding ICE candidate:", err));
      }
    });

    socket.on("call-ended", (data) => {
      console.log("Call ended by user:", data.from);
      endCallCleanup();
      setErrorMsg("User ended the call.");
      setTimeout(() => setErrorMsg(""), 3000);
    });

    socket.on("user-disconnected", (data) => {
      console.log("User disconnected:", data.userId);
      if (currentCaller === data.userId) {
        endCallCleanup();
        setErrorMsg("User disconnected.");
        setTimeout(() => setErrorMsg(""), 3000);
      }
    });

    return () => {
      socket.off("incoming-call");
      socket.off("ice-candidate");
      socket.off("call-ended");
      socket.off("user-disconnected");
    };
  }, [currentCaller]);

  async function acceptCall() {
    if (!incomingCall) return;
    setIsAccepting(true);
    setErrorMsg("");

    try {
      console.log("Accepting call from:", incomingCall.from);
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      localVideoRef.current.srcObject = stream;

      // Create peer connection
       const pc = new RTCPeerConnection({ iceServers });
      peerConnectionRef.current = pc;

      // Add local stream to peer connection
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      // Handle remote stream
      pc.ontrack = (event) => {
        console.log("Remote track received", event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate to:", incomingCall.from);
          socket.emit("ice-candidate", { 
            to: incomingCall.from, 
            candidate: event.candidate 
          });
        }
      };

      // Connection state monitoring
      pc.onconnectionstatechange = () => {
        console.log("Connection state:", pc.connectionState);
        if (pc.connectionState === 'failed') {
          setErrorMsg("Connection failed. Please try again.");
        }
      };

      // Set remote description (offer)
      await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
      
      // Create and set answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send answer to user
      socket.emit("answer-call", { 
        to: incomingCall.from, 
        answer: answer 
      });

      setCurrentCaller(incomingCall.from);
      setCallStarted(true);
      setIncomingCall(null);
      
      // Auto-start speech recognition when call starts
      if (speechSupported && recognitionRef.current) {
        setTimeout(() => {
          recognitionRef.current.start();
        }, 1000);
      }
      
      console.log("Call accepted successfully");

    } catch (err) {
      console.error("Error accepting call:", err);
      setErrorMsg("Failed to accept call. Please check camera/microphone permissions.");
    } finally {
      setIsAccepting(false);
    }
  }

  function rejectCall() {
    if (incomingCall) {
      console.log("Rejecting call from:", incomingCall.from);
      socket.emit("call-rejected", { to: incomingCall.from });
      setIncomingCall(null);
    }
  }

  function hangUpCall() {
    if (currentCaller) {
      console.log("Hanging up call with:", currentCaller);
      socket.emit("call-ended", { to: currentCaller });
    }
    endCallCleanup();
  }

  function endCallCleanup() {
    console.log("Cleaning up call");
    
    // Stop speech recognition
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }
    
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }
    
    setCallStarted(false);
    setCurrentCaller(null);
    setIncomingCall(null);
    setCaptions([]);
    setTranscript("");
    setRemoteTranscript("");
    setIsListening(false);
  }

  return (
    <div className="min-h-screen p-10 flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-300">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">Admin Video Panel</h1>
      
      {/* Connection Status */}
      <div className={`mb-6 px-4 py-2 rounded-lg ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        Status: {isConnected ? 'Connected' : 'Disconnected'}
        {isConnected && <span className="ml-2 text-sm">ID: {socket.id}</span>}
      </div>

      {/* Speech Recognition Controls */}
      {callStarted && (
        <div className="mb-4 flex items-center gap-4">
          <div className={`px-3 py-1 rounded-lg text-sm ${speechSupported ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
            Speech: {speechSupported ? 'Available' : 'Not Supported'}
          </div>
          {speechSupported && (
            <button
              onClick={toggleSpeechRecognition}
              className={`px-4 py-2 rounded-lg text-white font-semibold ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isListening ? '🔴 Stop' : '🎤 Listen'}
            </button>
          )}
        </div>
      )}

      {/* Manual Registration Button for debugging */}
      {isConnected && (
        <button 
          onClick={() => {
            console.log("Manual admin registration");
            socket.emit("admin-register");
          }}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Re-register as Admin
        </button>
      )}

      <div className="flex gap-12 mb-8">
        {/* Video Section */}
        <div className="flex gap-12">
          <div className="relative">
            <video 
              ref={localVideoRef} 
              autoPlay 
              muted 
              playsInline 
              className="w-80 h-60 rounded-xl border-4 border-blue-700 shadow-lg bg-gray-200" 
            />
            <p className="mt-4 text-blue-800 font-semibold text-center">Your Camera</p>
            
            {/* Current transcript overlay for admin */}
            {callStarted && transcript && (
              <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-sm p-2 rounded">
                You: {transcript}
              </div>
            )}
          </div>
          
          <div className="relative">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={`w-80 h-60 rounded-xl border-4 shadow-lg bg-gray-200 ${
                callStarted ? "border-green-600" : "border-gray-400"
              }`}
            />
            <p className={`mt-4 font-semibold text-center ${
              callStarted ? "text-green-700" : "text-gray-500"
            }`}>
              {callStarted ? "User Camera" : "Waiting for call..."}
            </p>
            
            {/* Remote transcript overlay */}
            {callStarted && remoteTranscript && (
              <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-sm p-2 rounded">
                User: {remoteTranscript}
              </div>
            )}
          </div>
        </div>

        {/* Captions Panel */}
        {callStarted && (
          <div className="w-80 bg-white rounded-xl border-2 border-gray-300 shadow-lg">
            <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold">
              Live Captions
            </div>
            <div className="h-64 p-3 overflow-y-auto">
              {captions.length === 0 ? (
                <div className="text-gray-500 text-center mt-8">
                  Captions will appear here...
                </div>
              ) : (
                captions.map((caption) => (
                  <div key={caption.id} className="mb-3 p-2 rounded bg-gray-50">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-semibold text-sm ${
                        caption.speaker === 'You' ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {caption.speaker}
                      </span>
                      <span className="text-xs text-gray-500">{caption.timestamp}</span>
                    </div>
                    <div className="text-gray-800">{caption.text}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md max-w-md text-center font-medium shadow-md">
          {errorMsg}
        </div>
      )}

      {incomingCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-blue-600 shadow-lg rounded-xl p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold mb-5">Incoming Call</h2>
            <p className="mb-8 text-lg">
              User <span className="font-mono bg-gray-100 px-2 py-1 rounded">{incomingCall.from}</span> is calling you.
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={acceptCall}
                disabled={isAccepting}
                className={`text-white font-semibold px-8 py-3 rounded-lg shadow-md transition ${
                  isAccepting 
                    ? "bg-green-400 cursor-not-allowed" 
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isAccepting ? "Accepting..." : "Accept"}
              </button>
              <button 
                onClick={rejectCall} 
                disabled={isAccepting} 
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {callStarted && (
        <button
          onClick={hangUpCall}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold px-12 py-4 rounded-xl shadow-lg transition"
        >
          Hang Up Call
        </button>
      )}
    </div>
  );
};

export default AdminVideoPage;