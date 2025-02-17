import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { RefreshCcw, Clock, ArrowLeft } from "lucide-react";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";

const QuestionComponent = () => {
  const navigate = useNavigate();
  const { category, subcategory } = useParams();
  const QuestionApi = "https://jobquick.onrender.com/mocktest/generate";
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [category, subcategory]);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsTimerRunning(false);
            calculateScore();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const handleGoBack = () => {
    navigate("/mocktest"); // Navigate back to mocktest page
  };

  const resetQuiz = async () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(null);
    setShowResults(false);
    setTimeLeft(360);
    setIsTimerRunning(false);
    await fetchQuestions();
  };

  const fetchQuestions = async () => {
    try {
      const token = Cookies.get("userToken");
      const response = await fetch(QuestionApi, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, subcategory }),
      });
      const data = await response.json();

      if (data.success && Array.isArray(data.questions)) {
        processQuestionsData(data.questions);
        startTimer(); // Start timer when questions are loaded
      } else {
        setError("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions");
    }
  };

  const processQuestionsData = (rawQuestions) => {
    try {
      const processed = [];
      let currentQuestion = null;
      let options = [];

      rawQuestions.forEach((item) => {
        // Skip level headers
        if (item.startsWith("**")) return;

        // If it's a question
        if (item.startsWith("Q:")) {
          // If we have a previous question complete, add it
          if (currentQuestion && options.length > 0) {
            processed.push(currentQuestion);
          }

          // Start new question
          currentQuestion = {
            question: item.substring(2).trim(),
            options: [],
            correctAnswer: "",
          };
          options = [];
        }
        // If it's an option
        else if (item.match(/^[A-D]\)/)) {
          const letter = item[0].toLowerCase();
          const text = item.substring(2).trim();
          options.push({ letter, text });

          if (currentQuestion) {
            currentQuestion.options = options;
          }
        }
        // If it's the correct answer
        else if (item.startsWith("Correct:")) {
          const correctAnswer = item.split(":")[1].trim().toLowerCase();
          if (currentQuestion) {
            currentQuestion.correctAnswer = correctAnswer;
          }
        }
      });

      // Add the last question if exists
      if (currentQuestion && options.length > 0) {
        processed.push(currentQuestion);
      }

      console.log("Processed questions:", processed);
      setQuestions(processed);
    } catch (error) {
      console.error("Error processing questions:", error);
      setError("Error processing questions data");
    }
  };

  const handleAnswerSelection = (answer) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const percentage = (correctAnswers / questions.length) * 100;
    setScore(percentage.toFixed(2));
    setShowResults(true);
  };

  if (error) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-6">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <>
         <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
    <button
      onClick={handleGoBack}
      className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
    >
      <ArrowLeft size={16} />
      Go Back
    </button>
    <button
      onClick={resetQuiz}
      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
    >
      <RefreshCcw size={16} />
      Reset Quiz
    </button>
  </div>
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-gray-900">Test Results</h1>
    <p className="text-lg text-gray-600 mt-2">Here are your results. See how well you did and review your answers!</p>
  </div>

  <div className="mb-8 mx-auto max-w-4xl flex flex-col md:flex-row justify-evenly space-y-4 md:space-y-0 md:space-x-8">
    <div className="text-center md:text-center text-lg font-medium text-gray-900 bg-green-100 p-4 rounded-lg flex flex-col items-center md:items-start">
      <span>Your Score</span>
      <span className="text-green-500 font-semibold">{score}%</span>
    </div>
    <div className="text-center md:text-center text-lg font-medium text-gray-700 bg-gray-200 p-4 rounded-lg flex flex-col items-center md:items-end">
      <span>Time Taken</span>
      <span>{formatTime(1800 - timeLeft)}</span>
    </div>
  </div>

  <div className="space-y-6">
    {questions.map((question, index) => (
      <div
        key={index}
        className="border border-gray-300 p-6 rounded-lg hover:shadow-xl transition-all duration-300"
      >
        <p className="font-semibold text-xl text-gray-800">
          {index + 1}. {question.question}
        </p>
        <div className="mt-4 space-y-3">
          {question.options.map((option) => (
            <div
              key={option.letter}
              className={`p-4 rounded-lg cursor-pointer ${
                option.letter === question.correctAnswer
                  ? "bg-green-200 border-green-500"
                  : option.letter === userAnswers[index]
                  ? "bg-red-200 border-red-500"
                  : "bg-gray-50"
              } hover:bg-gray-100 transition-all duration-300`}
            >
              {option.letter.toUpperCase()}) {option.text}
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {userAnswers[index] !== question.correctAnswer && (
            <p className="text-red-600">
              Your answer: {userAnswers[index]?.toUpperCase()}){" "}
              {question.options.find(
                (opt) => opt.letter === userAnswers[index]
              )?.text}
            </p>
          )}
          <p className="text-green-600">
            Correct answer: {question.correctAnswer.toUpperCase()}){" "}
            {question.options.find(
              (opt) => opt.letter === question.correctAnswer
            )?.text}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

{/* Add a motivational quote section */}
<div className="bg-blue-50 p-6 mt-12 rounded-lg shadow-md text-center">
  <blockquote className="text-2xl font-semibold text-gray-800 mb-4">"Success is the sum of small efforts, repeated day in and day out."</blockquote>
  <p className="text-lg text-gray-600">Keep practicing and you'll achieve even greater results next time!</p>
</div>


      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
   <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl">
        {currentQuestion ? (
          <div className="space-y-6">
           
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Question Number Section */}
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">
              {currentQuestionIndex + 1}
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-blue-600 font-medium">Question</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-800">
                  {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Timer */}
          <div className={`flex items-center px-4 py-2 rounded-lg 
            ${timeLeft < 10 
              ? "bg-red-50 text-red-600" 
              : "bg-gray-50 text-gray-600"}`
          }>
            <Clock className={`h-5 w-5 mr-2 
              ${timeLeft < 10 ? "animate-pulse" : ""}`} 
            />
            <span className="font-mono font-medium">
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Answer Status */}
          <div className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium
            transition-all duration-300 
            ${userAnswers[currentQuestionIndex]
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-amber-50 text-amber-600 border border-amber-200"
            }`}
          >
            <div className={`w-2 h-2 rounded-full 
              ${userAnswers[currentQuestionIndex]
                ? "bg-green-500"
                : "bg-amber-500"
              }`} 
            />
            <span className="text-sm">
              {userAnswers[currentQuestionIndex] ? "Answered" : "Not answered"}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-full bg-gray-100 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${Math.round((currentQuestionIndex + 1) / questions.length * 100)}%` 
          }}
        />
      </div>
    </div>

            {/* Question */}
            <div className="space-y-6">
              <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                {currentQuestion.question}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option.letter}
                    className={`block relative p-4 rounded-xl cursor-pointer transition-all duration-200
                      ${userAnswers[currentQuestionIndex] === option.letter
                        ? "bg-blue-50 border-2 border-blue-500 shadow-sm"
                        : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 flex items-center justify-center rounded-full border-2 mr-3
                        ${userAnswers[currentQuestionIndex] === option.letter
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-400"
                        }`}
                      >
                        {userAnswers[currentQuestionIndex] === option.letter && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={option.letter}
                        checked={userAnswers[currentQuestionIndex] === option.letter}
                        onChange={() => handleAnswerSelection(option.letter)}
                        className="sr-only"
                      />
                      <span className="text-base sm:text-lg text-gray-700">
                        {option.letter.toUpperCase()}) {option.text}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 
                  ${currentQuestionIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                  }`}
              >
                ← Previous
              </button>

              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={calculateScore}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg text-base font-medium 
                    hover:bg-green-600 transition-all duration-200 shadow-md"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg text-base font-medium 
                    hover:bg-blue-600 transition-all duration-200 shadow-md"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600 font-medium">Loading questions...</p>
            </div>
          </div>
        )}
      </div>
    </div>

    </>
  );
};

export default QuestionComponent;