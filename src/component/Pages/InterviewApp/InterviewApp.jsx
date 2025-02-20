import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const InterviewApp = () => {
  const [category, setCategory] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [warningCount, setWarningCount] = useState(0);
  const webcamRef = useRef(null);
  const visibilityTimeoutRef = useRef(null);
  const [isUserVisible, setIsUserVisible] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const invisibleStartTimeRef = useRef(null);

  useEffect(() => {
    if (isInterviewStarted) {
      const interval = setInterval(checkUserVisibility, 1000);
      return () => clearInterval(interval);
    }
  }, [isInterviewStarted]);

  // Initialize speech synthesis voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const startInterview = async () => {
    if (!category) {
      alert("Please select a category");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/interview/start", { category });
      setSessionId(response.data.sessionId);
      setIsInterviewStarted(true);
      fetchNextQuestion(response.data.sessionId);
    } catch (error) {
      console.error("Error starting interview:", error);
    }
  };

  const fetchNextQuestion = async (id) => {
    try {
      const response = await axios.post("http://localhost:5000/api/interview/question", { sessionId: id });
      if (response.data.completed) {
        setInterviewCompleted(true);
        alert("Interview completed! Check your results.");
        fetchCorrectAnswers(id);
      } else {
        // Clean question by removing backticks
        const cleanedQuestion = response.data.question.replace(/`/g, '');
        setQuestion(cleanedQuestion);
        speakQuestion(cleanedQuestion);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const speakQuestion = (text) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // Find a female voice - try multiple common female voice identifiers
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
      // If no female voice found, try to use a voice with higher pitch
      speech.pitch = 1.2; // Slightly higher pitch
    }
    
    speech.rate = 0.9; // Slightly slower for better clarity
    window.speechSynthesis.speak(speech);
  };

  const fetchCorrectAnswers = async (id) => {
    try {
      const response = await axios.post("http://localhost:5000/api/interview/correct-answers", { sessionId: id });
      setCorrectAnswers(response.data.answers);
    } catch (error) {
      console.error("Error fetching correct answers:", error);
    }
  };

  const checkUserVisibility = () => {
    const videoElement = webcamRef.current?.video;
    if (!videoElement) return;
    
    // Here you would implement actual face detection
    // For this example, we're using a simulation
    // In a real app, you might use a library like face-api.js
    const isVisible = Math.random() > 0.2; // Simulate visibility check
    
    if (!isVisible) {
      // User not visible - start tracking time if not already tracking
      if (!invisibleStartTimeRef.current) {
        invisibleStartTimeRef.current = Date.now();
      } else {
        // Check if user has been invisible for at least 5 seconds
        const invisibleDuration = Date.now() - invisibleStartTimeRef.current;
        
        if (invisibleDuration >= 5000 && !visibilityTimeoutRef.current) {
          // Only set a warning timeout if one isn't already active
          visibilityTimeoutRef.current = setTimeout(() => {
            setWarningCount((prev) => {
              const newCount = prev + 1;
              if (newCount >= 3) {
                alert("You have been disqualified due to excessive distractions.");
                setIsInterviewStarted(false);
                setInterviewCompleted(true);
              } else {
                alert(`Warning! Please focus on the camera. Warnings left: ${3 - newCount}`);
              }
              return newCount;
            });
            // Reset the visibility timeout reference after warning
            visibilityTimeoutRef.current = null;
          }, 0); // Immediate warning after 5 seconds has passed
        }
      }
    } else {
      // User is visible again - reset tracking
      invisibleStartTimeRef.current = null;
      
      // Clear any pending warning timeouts
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
        visibilityTimeoutRef.current = null;
      }
    }
    
    setIsUserVisible(isVisible);
  };

  const startListening = () => {
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
    try {
      const response = await axios.post("http://localhost:5000/api/interview/answer", { 
        sessionId, 
        answer 
      });
      setAnswers((prev) => [...prev, { question, answer, score: response.data.score }]);
      setAnswer("");
      fetchNextQuestion(sessionId);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {!isInterviewStarted ? (
        <div className="p-6 bg-white shadow-lg rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Select Your Interview Category</h2>
          <select 
            onChange={(e) => setCategory(e.target.value)} 
            className="p-2 border rounded mt-2 mb-4 w-full max-w-md"
          >
            <option value="">Select Category</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
            <option value="mernstack">MERN Stack</option>
            <option value="data-analyst">Data Analyst</option>
          </select>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors"
            onClick={startInterview}
          >
            Start Interview
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white p-6 shadow-lg rounded-xl">
          <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-6 border-b-2 md:border-b-0 md:border-r-2 border-gray-200">
            <div className={`mb-4 p-4 rounded-lg ${isUserVisible ? 'bg-green-100' : 'bg-red-100'}`}>
              <h3 className="text-sm font-medium text-gray-500">
                {isUserVisible ? 'You are visible' : 'Please face the camera'}
              </h3>
              <p className="text-xs text-gray-400">
                Warnings: {warningCount}/3
              </p>
            </div>
            <h4 className="text-xl font-bold text-center text-blue-500">{question}</h4>
          </div>
          <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-6">
            <Webcam 
              ref={webcamRef} 
              className="w-60 h-60 rounded-xl mb-4 border-2 border-gray-300" 
              mirrored={true}
              audio={false}
            />
            <textarea 
              className="w-full p-2 mt-2 border rounded min-h-32 focus:ring-2 focus:ring-blue-300 focus:border-blue-300" 
              value={answer} 
              onChange={(e) => setAnswer(e.target.value)} 
              placeholder="Type your answer here..." 
            />
            <div className="flex space-x-4 mt-4 w-full justify-center">
              <button 
                onClick={startListening} 
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors flex items-center"
              >
                <span className="mr-2">🎤</span> Speak Answer
              </button>
              <button 
                onClick={submitAnswer} 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center"
              >
                <span className="mr-2">✓</span> Submit Answer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {interviewCompleted && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl text-center w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Interview Results</h2>
          
          <div className="mb-4">
            <p className="text-lg font-medium">Total Questions: {answers.length}</p>
            <p className="text-lg font-medium">
              Average Score: {
                answers.length > 0 
                  ? (answers.reduce((sum, ans) => sum + ans.score, 0) / answers.length).toFixed(1) 
                  : 'N/A'
              }
            </p>
          </div>
          
          <button 
            onClick={() => setShowAllQuestions(!showAllQuestions)} 
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors"
          >
            {showAllQuestions ? "Hide All Questions" : "Show All Questions"}
          </button>
          
          {showAllQuestions && (
            <div className="mt-4">
              {answers.map((ans, index) => (
                <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50 text-left">
                  <h4 className="text-xl font-bold text-blue-500">Question {index + 1}: {ans.question}</h4>
                  <div className="mt-2">
                    <p className="font-medium text-gray-700">Your Answer:</p>
                    <p className="text-gray-600 italic mt-1 p-2 bg-white rounded border">{ans.answer}</p>
                  </div>
                  <div className="mt-3 flex items-center">
                    <span className="font-medium text-gray-700 mr-2">Score:</span>
                    <span className={`font-bold ${
                      ans.score >= 8 ? 'text-green-500' : 
                      ans.score >= 5 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {ans.score}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewApp;
