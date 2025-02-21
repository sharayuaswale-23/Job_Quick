import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import * as faceapi from 'face-api.js';

const InterviewApp = () => {
  const [category, setCategory] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [warningCount, setWarningCount] = useState(0);
  const webcamRef = useRef(null);
  const [isUserVisible, setIsUserVisible] = useState(true);
  const [isUserLookingAway, setIsUserLookingAway] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [currentScore, setCurrentScore] = useState(null);
  const [lastEvaluation, setLastEvaluation] = useState("");
  const [inactiveTimer, setInactiveTimer] = useState(0);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [interviewProgress, setInterviewProgress] = useState({
    currentQuestion: 0,
    totalQuestions: 15,
    averageScore: 0
  });

  const invisibilityTimerRef = useRef(null);
  const faceCheckIntervalRef = useRef(null);
  const canvasRef = useRef(null);
  const lookAwayTimerRef = useRef(null);
  const lookAwayStartTimeRef = useRef(null);

  // Load Face API models
  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models'); // Add expression detection
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading face detection models:", error);
        // Fall back to simulated face detection if models fail to load
        setModelsLoaded(true);
      }
      setLoading(false);
    };
    loadModels();
  }, []);

  // Start face detection once models are loaded and interview starts
  useEffect(() => {
    if (isInterviewStarted && modelsLoaded) {
      faceCheckIntervalRef.current = setInterval(detectFace, 500); // Check more frequently (every 500ms)
      return () => {
        clearInterval(faceCheckIntervalRef.current);
        if (invisibilityTimerRef.current) {
          clearInterval(invisibilityTimerRef.current);
        }
        if (lookAwayTimerRef.current) {
          clearTimeout(lookAwayTimerRef.current);
        }
      };
    }
  }, [isInterviewStarted, modelsLoaded]);

  // Voice initialization
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const startInterview = async () => {
    if (!category) {
      alert("Please select a category");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post("https://video-ai-interview.onrender.com/api/interview/start", { category });
      setSessionId(response.data.sessionId);
      setIsInterviewStarted(true);
      fetchNextQuestion(response.data.sessionId);
    } catch (error) {
      console.error("Error starting interview:", error);
      alert("Failed to start interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchNextQuestion = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post("https://video-ai-interview.onrender.com/api/interview/question", { sessionId: id });
      if (response.data.completed) {
        setInterviewCompleted(true);
        fetchCorrectAnswers(id);
      } else {
        // Clean question by removing backticks
        const cleanedQuestion = response.data.question.replace(/`/g, '');
        setQuestion(cleanedQuestion);
        speakQuestion(cleanedQuestion);
        fetchInterviewProgress(id);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInterviewProgress = async (id) => {
    try {
      const response = await axios.post("https://video-ai-interview.onrender.com/api/interview/progress", { sessionId: id });
      setInterviewProgress(response.data);
    } catch (error) {
      console.error("Error fetching interview progress:", error);
    }
  };

  const speakQuestion = (text) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // Prioritize female voices
    const femaleVoice = voices.find(
      voice => 
        voice.name.includes("Female") || 
        voice.name.includes("female") || 
        voice.name.includes("Samantha") || 
        voice.name.includes("Victoria") || 
        voice.name.includes("Karen") ||
        (voice.name.includes("Google") && voice.name.includes("UK English Female"))
    );
    
    if (femaleVoice) {
      speech.voice = femaleVoice;
    } else {
      // If no female voice found, use higher pitch
      speech.pitch = 1.2;
    }
    
    speech.rate = 0.8;
    window.speechSynthesis.speak(speech);
  };

  const fetchCorrectAnswers = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post("https://video-ai-interview.onrender.com/api/interview/correct-answers", { sessionId: id });
      const formattedAnswers = response.data.answers.map(answer => formatModelAnswer(answer));
      setCorrectAnswers(formattedAnswers);
    } catch (error) {
      console.error("Error fetching correct answers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format model answers by removing asterisks and adding proper formatting
  const formatModelAnswer = (answer) => {
    if (!answer) return answer;
    
    // Replace asterisks with proper HTML formatting
    let formattedAnswer = answer;
    
    // Bold text between asterisks (like *important point*)
    formattedAnswer = formattedAnswer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedAnswer = formattedAnswer.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    
    // Convert bulleted lists to proper HTML
    formattedAnswer = formattedAnswer.replace(/^\s*\*\s+(.+)$/gm, '<li>$1</li>');
    
    // Wrap adjacent list items in <ul> tags
    formattedAnswer = formattedAnswer.replace(/(<li>.*?<\/li>)\s*(<li>)/g, '$1$2');
    formattedAnswer = formattedAnswer.replace(/(<li>.*?<\/li>)(?!\s*<li>)/g, '<ul>$1</ul>');
    
    return formattedAnswer;
  };

  const detectFace = async () => {
    if (!webcamRef.current || !webcamRef.current.video) return;
    
    const video = webcamRef.current.video;
    if (video.readyState !== 4) return; // Make sure video is fully loaded
    
    let faceDetected = false;
    let isLookingAway = false;
    
    try {
      // Try to use face-api.js if available
      if (modelsLoaded && faceapi) {
        const detections = await faceapi.detectAllFaces(
          video, 
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceExpressions();
        
        faceDetected = detections.length > 0;
        
        // Check if user is looking away based on face pose
        if (faceDetected) {
          const face = detections[0];
          const landmarks = face.landmarks;
          const jawOutline = landmarks.getJawOutline();
          const nose = landmarks.getNose();
          
          // Calculate face orientation
          if (jawOutline && nose && jawOutline.length > 0 && nose.length > 0) {
            // Calculate face rotation by checking nose position relative to face center
            const faceCenter = jawOutline[8]; // Bottom of chin
            const noseBase = nose[0]; // Top of nose
            
            // Check horizontal angle (left-right)
            const horizontalAngle = Math.abs(noseBase.x - video.width/2) / (video.width/4);
            
            // Check if user is looking at screen or away
            isLookingAway = horizontalAngle > 0.5; // If nose is too far to either side
            
            // Additional check for attention using eye landmarks
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();
            
            if (leftEye && rightEye) {
              // Check for eye closure (both eyes mostly closed = likely not looking at screen)
              const eyeAspectRatio = calculateEyeAspectRatio(leftEye, rightEye);
              if (eyeAspectRatio < 0.2) {
                isLookingAway = true;
              }
            }
          }
        }
        
        // Draw face detection on canvas
        if (canvasRef.current) {
          const displaySize = { 
            width: video.width, 
            height: video.height 
          };
          faceapi.matchDimensions(canvasRef.current, displaySize);
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          if (faceDetected) {
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
            
            // Draw attention status
            ctx.font = '16px Arial';
            ctx.fillStyle = isLookingAway ? 'red' : 'green';
            ctx.fillText(
              isLookingAway ? 'Looking Away!' : 'Attention OK', 
              10, 
              30
            );
          }
        }
      } else {
        // Fallback to simulation for testing
        faceDetected = Math.random() > 0.2;
        isLookingAway = Math.random() > 0.8;
      }
    } catch (error) {
      console.error("Face detection error:", error);
      // Fallback to simulation
      faceDetected = Math.random() > 0.2;
      isLookingAway = Math.random() > 0.8;
    }
    
    // Update state with detection results
    setIsUserVisible(faceDetected);
    setIsUserLookingAway(isLookingAway);
    
    // Handle tracking user attention
    handleUserAttention(faceDetected, isLookingAway);
  };

  const calculateEyeAspectRatio = (leftEye, rightEye) => {
    // Calculate the eye aspect ratio which is the height/width ratio
    // Lower values indicate more closed eyes
    
    if (!leftEye || !rightEye || leftEye.length < 6 || rightEye.length < 6) return 0.3; // Default if not enough points
    
    // Left eye horizontal distance
    const leftEyeWidth = Math.sqrt(
      Math.pow(leftEye[3].x - leftEye[0].x, 2) + 
      Math.pow(leftEye[3].y - leftEye[0].y, 2)
    );
    
    // Left eye vertical distances
    const leftEyeHeight1 = Math.sqrt(
      Math.pow(leftEye[1].x - leftEye[5].x, 2) + 
      Math.pow(leftEye[1].y - leftEye[5].y, 2)
    );
    const leftEyeHeight2 = Math.sqrt(
      Math.pow(leftEye[2].x - leftEye[4].x, 2) + 
      Math.pow(leftEye[2].y - leftEye[4].y, 2)
    );
    
    // Right eye horizontal distance
    const rightEyeWidth = Math.sqrt(
      Math.pow(rightEye[3].x - rightEye[0].x, 2) + 
      Math.pow(rightEye[3].y - rightEye[0].y, 2)
    );
    
    // Right eye vertical distances
    const rightEyeHeight1 = Math.sqrt(
      Math.pow(rightEye[1].x - rightEye[5].x, 2) + 
      Math.pow(rightEye[1].y - rightEye[5].y, 2)
    );
    const rightEyeHeight2 = Math.sqrt(
      Math.pow(rightEye[2].x - rightEye[4].x, 2) + 
      Math.pow(rightEye[2].y - rightEye[4].y, 2)
    );
    
    // Calculate average eye aspect ratio
    const leftRatio = (leftEyeHeight1 + leftEyeHeight2) / (2 * leftEyeWidth);
    const rightRatio = (rightEyeHeight1 + rightEyeHeight2) / (2 * rightEyeWidth);
    
    return (leftRatio + rightRatio) / 2;
  };

  const handleUserAttention = (faceDetected, isLookingAway) => {
    const notEngaged = !faceDetected || isLookingAway;
    
    if (notEngaged) {
      // Start tracking disengagement time if not already tracking
      if (!lookAwayStartTimeRef.current) {
        lookAwayStartTimeRef.current = Date.now();
        lookAwayTimerRef.current = setTimeout(() => {
          if (lookAwayStartTimeRef.current) {
            const disengagedTime = (Date.now() - lookAwayStartTimeRef.current) / 1000;
            setInactiveTimer(Math.floor(disengagedTime));
            
            // After 3 seconds of looking away, show warning
            if (disengagedTime >= 3 && !showWarningPopup) {
              setShowWarningPopup(true);
            }
          }
        }, 3000); // Check after 3 seconds
      } else {
        // Update timer display
        const disengagedTime = (Date.now() - lookAwayStartTimeRef.current) / 1000;
        setInactiveTimer(Math.floor(disengagedTime));
      }
    } else {
      // Reset tracking if user is engaged again
      if (lookAwayStartTimeRef.current) {
        lookAwayStartTimeRef.current = null;
        if (lookAwayTimerRef.current) {
          clearTimeout(lookAwayTimerRef.current);
          lookAwayTimerRef.current = null;
        }
        setInactiveTimer(0);
        setShowWarningPopup(false);
      }
    }
  };

  const issueWarning = () => {
    setWarningCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        alert("You have been disqualified due to excessive distractions. Interview terminated.");
        setIsInterviewStarted(false);
        setInterviewCompleted(true);
        window.speechSynthesis.cancel();
      } else {
        const warningsLeft = 3 - newCount;
        const warningMessage = `Warning! Please focus on the camera. You have ${warningsLeft} warning${warningsLeft !== 1 ? 's' : ''} left.`;
        alert(warningMessage);
      }
      return newCount;
    });
    setShowWarningPopup(false);
    lookAwayStartTimeRef.current = null;
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition is not supported in your browser. Please use Chrome.");
      return;
    }
    
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.start();
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      alert("There was an error with speech recognition. Please try again or type your answer.");
    };
  };

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please provide an answer.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post("https://video-ai-interview.onrender.com/api/interview/answer", { 
        sessionId, 
        answer 
      });
      
      // Update with the new score and evaluation
      setCurrentScore(response.data.score);
      
      // Format the evaluation to remove asterisks and improve readability
      const formattedEvaluation = formatModelAnswer(response.data.evaluation);
      setLastEvaluation(formattedEvaluation);
      
      setAnswers((prev) => [...prev, { 
        question, 
        answer,
        score: response.data.score,
        evaluation: formattedEvaluation,
        originalScore: response.data.originalScore
      }]);
      
      // Clear the answer field and move to next question
      setAnswer("");
      
      if (response.data.completed) {
        setInterviewCompleted(true);
        fetchCorrectAnswers(sessionId);
      } else {
        fetchNextQuestion(sessionId);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatEvaluationText = (evaluation) => {
    if (!evaluation) return "No evaluation available";
    
    // Check if the evaluation is already in HTML format
    if (evaluation.includes('<strong>') || evaluation.includes('<li>')) {
      return (
        <div dangerouslySetInnerHTML={{ __html: evaluation }} />
      );
    }
    
    // Split into paragraphs for better readability
    const parts = evaluation.split(/\n+/);
    
    if (parts.length <= 1) return evaluation;
    
    // Extract score, feedback, and improvement areas
    const scorePart = parts.find(p => p.match(/score/i)) || parts[0];
    const feedbackParts = parts.filter(p => !p.match(/score/i) && p.trim().length > 0);
    
    return (
      <>
        <div className="font-bold">{scorePart}</div>
        {feedbackParts.map((part, i) => (
          <div key={i} className="mt-1">{part}</div>
        ))}
      </>
    );
  };

  // Render loading spinner
  if (loading && !isInterviewStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-xl text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading interview system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      {/* Warning Popup */}
      {showWarningPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-4">Attention Required!</h2>
            <p className="mb-6">
              {isUserVisible 
                ? "You appear to be looking away from the screen." 
                : "You are not visible in the camera."}
              <br />
              You've been distracted for {inactiveTimer} seconds. Please focus on the interview.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setShowWarningPopup(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
              >
                Dismiss
              </button>
              <button 
                onClick={issueWarning}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Issue Warning ({warningCount + 1}/3)
              </button>
            </div>
          </div>
        </div>
      )}

      {!isInterviewStarted ? (
        <div className="p-8 bg-white shadow-xl rounded-xl text-center max-w-2xl w-full transform transition-all hover:scale-105">
          <h1 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            AI Technical Interview Simulator
          </h1>
          <p className="mb-6 text-gray-600">Practice your technical interview skills with our AI interviewer. Choose a category below to begin.</p>
          
          <div className="mb-6">
            <select 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Select Your Technical Area</option>
              <option value="frontend">Frontend Development</option>
              <option value="backend">Backend Development</option>
              <option value="fullstack">Fullstack Development</option>
              <option value="mernstack">MERN Stack</option>
              <option value="data-analyst">Data Analysis</option>
              <option value="devops">DevOps Engineering</option>
              <option value="mobile">Mobile Development</option>
            </select>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-bold text-gray-700 mb-2">How It Works:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>AI will ask you technical questions based on your chosen field</li>
              <li>Respond verbally or type your answers</li>
              <li>Stay visible on camera and maintain eye contact throughout the interview</li>
              <li>You'll receive detailed feedback after each answer</li>
              <li>The interview consists of 15 questions of increasing difficulty</li>
              <li><strong>Important:</strong> Looking away for more than 3 seconds will result in a warning</li>
              <li>You'll be disqualified after 3 warnings</li>
            </ul>
          </div>
          
          <button 
            onClick={startInterview} 
            disabled={!category}
            className={`w-full py-3 px-6 rounded-lg text-white font-bold shadow-lg transition-all transform hover:-translate-y-1 ${
              category ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Start Your Technical Interview
          </button>
        </div>
      ) : (
        <div className="w-full max-w-6xl">
          {/* Interview Progress Bar */}
          <div className="mb-4 bg-white p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Question {interviewProgress.currentQuestion} of {interviewProgress.totalQuestions}</span>
              <span className="font-medium">Average Score: {interviewProgress.averageScore}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${(interviewProgress.currentQuestion / interviewProgress.totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Attention Status */}
          <div className={`mb-4 p-3 rounded-xl shadow-md flex items-center justify-between ${
            warningCount === 0 ? 'bg-green-50' : 
            warningCount === 1 ? 'bg-yellow-50' :
            'bg-red-50'
          }`}>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                isUserVisible && !isUserLookingAway ? 'bg-green-500' : 'bg-red-500 animate-pulse'
              }`}></div>
              <span className={`text-sm ${
                isUserVisible && !isUserLookingAway ? 'text-green-700' : 'text-red-700'
              }`}>
                {!isUserVisible 
                  ? `Not Visible (${inactiveTimer}s)` 
                  : isUserLookingAway 
                    ? `Looking Away (${inactiveTimer}s)` 
                    : 'Attention OK'}
              </span>
            </div>
            <div className="flex items-center">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-5 h-5 mx-1 rounded-full flex items-center justify-center ${
                    i < warningCount ? 'bg-red-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {i < warningCount && '!'}
                </div>
              ))}
              <span className="text-sm ml-2">
                {warningCount}/3 Warnings
              </span>
            </div>
          </div>


          {/* Main Interview Interface */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Panel - Question */}
            <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-lg">
              <div className="relative">
                <div className="absolute -top-9 left-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-t-lg">
                  AI Interviewer
                </div>
                <h3 className="text-xl font-bold mb-4 text-blue-800">{question}</h3>
              </div>
              
              {currentScore !== null && (
                <div className={`mt-6 p-4 rounded-lg ${
                  currentScore >= 8 ? 'bg-green-50 border-l-4 border-green-500' : 
                  currentScore >= 5 ? 'bg-yellow-50 border-l-4 border-yellow-500' : 
                  'bg-red-50 border-l-4 border-red-500'
                }`}>
                  <h4 className="font-bold mb-2">Previous Answer Score: {currentScore}/10</h4>
                  <div className="text-sm text-gray-700">
                    {formatEvaluationText(lastEvaluation)}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Panel - Webcam & Answer */}
            <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-lg">
              <div className="relative">
                <div className="w-full h-60 bg-gray-900 rounded-lg overflow-hidden">
                  <Webcam 
                    ref={webcamRef} 
                    className="w-full h-full object-cover" 
                    mirrored={true}
                    audio={false}
                  />
                  <canvas 
                    ref={canvasRef} 
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
                {(!isUserVisible || isUserLookingAway) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg animate-pulse">
                      {!isUserVisible 
                        ? "Please face the camera" 
                        : "Please look at the screen"}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <div className="mb-2 flex justify-between items-center">
                  <label className="font-medium                   text-gray-700">Your Answer:</label>
                  <button 
                    onClick={startListening}
                    className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-4H3m15 0h3m-3-7a7 7 0 00-7-7m0 0a7 7 0 00-7 7m7-7v4m0-4h14m-14 0H3"></path>
                    </svg>
                    Speak Answer
                  </button>
                </div>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  rows="4"
                  placeholder="Type or speak your answer here..."
                />
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setAnswer("");
                    setCurrentScore(null);
                    setLastEvaluation("");
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={submitAnswer}
                  disabled={!answer.trim()}
                  className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors ${
                    !answer.trim() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>

          {/* Interview Completed Section */}
          {interviewCompleted && (
            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Interview Completed!</h2>
              <Link to='/ai-interview'>load more</Link>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Summary of Answers */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Your Answers:</h3>
                  <div className="space-y-4">
                    {answers.map((ans, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <p className="font-medium text-gray-700">Q: {ans.question}</p>
                        <p className="text-gray-600">A: {ans.answer}</p>
                        <div className={`mt-2 text-sm ${
                          ans.score >= 8 ? 'text-green-600' : 
                          ans.score >= 5 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          Score: {ans.score}/10
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          {formatEvaluationText(ans.evaluation)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Correct Answers */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Correct Answers:</h3>
                  <button
                    onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors mb-4"
                  >
                    {showCorrectAnswers ? "Hide Correct Answers" : "Show Correct Answers"}
                  </button>
                  {showCorrectAnswers && (
                    <div className="space-y-4">
                      {correctAnswers.map((ans, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <p className="font-medium text-gray-700">Q: {answers[index]?.question}</p>
                          <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: ans }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewApp;