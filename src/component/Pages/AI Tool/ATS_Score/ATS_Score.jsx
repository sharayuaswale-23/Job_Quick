import React, { useState } from "react";
import Header from "../../../common/header/Header";
import Footer from "../../../common/Footer/Footer";

function ATS_Score() {
  const [resumeText, setResumeText] = useState("");
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        setResumeText(text);
        analyzeResume(text);
      };
      reader.readAsText(file);
    }
  };

  const analyzeResume = (text) => {
    let currentScore = 70;
    const feedback = [];

    if (!text.toLowerCase().includes("work history")) {
      feedback.push("Your resume is missing a 'Work History' section.");
      currentScore -= 10;
    }
    if (!text.toLowerCase().includes("skills")) {
      feedback.push("Your resume is missing a 'Skills' section.");
      currentScore -= 10;
    }

    const wordCount = text.split(/\s+/).length;
    if (wordCount < 150) {
      feedback.push("Your resume is too short. Aim for at least 150 words.");
      currentScore -= 15;
    } else if (wordCount > 400) {
      feedback.push("Your resume is too long. Aim for a concise summary (under 400 words).");
      currentScore -= 5;
    }

    const overusedWords = ["responsible for", "team player", "detail-oriented"];
    overusedWords.forEach((word) => {
      if (text.toLowerCase().includes(word)) {
        feedback.push(`Avoid using generic phrases like '${word}'.`);
        currentScore -= 5;
      }
    });

    const randomAdjustment = Math.floor(Math.random() * 10) - 5;
    currentScore += randomAdjustment;

    currentScore = Math.max(0, Math.min(100, currentScore));

    setScore(currentScore);
    setSuggestions(feedback);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-indigo-100 flex flex-col items-center justify-start text-gray-900 font-sans">
        {/* Add padding to avoid overlap with fixed navbar */}
        <div className="pt-20 w-full">
          {/* Header Section */}
          <header className="w-full text-center px-6 py-12 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 opacity-70 animate-gradient-x"></div>
            <div className="relative z-10">
              <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
                ATS Resume Checker
              </h1>
              <p className="mt-4 text-lg md:text-xl leading-relaxed">
                Boost your resume with real-time insights and actionable recommendations.
              </p>
            </div>
          </header>

          {/* Main Content Section */}
          <main className="w-full max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Section: Upload */}
            <section className="bg-white rounded-3xl p-8 shadow-lg border border-gray-300 hover:shadow-xl transition-all">
              <h2 className="text-3xl font-semibold text-center text-indigo-700">
                Upload Your Resume
              </h2>
              <p className="text-center text-gray-500 text-sm mt-2">
                Supported formats: DOC, DOCX, PDF, HTML, TXT. Max size: 5MB.
              </p>
              <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg py-12 text-center hover:border-indigo-500 transition">
                <p className="text-lg font-medium text-gray-700">
                  Drag & Drop your resume here
                </p>
                <p className="text-gray-500 text-sm mt-2">or</p>
                <input
                  type="file"
                  accept=".txt,.html,.doc,.docx,.pdf"
                  className="hidden"
                  id="fileUpload"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="fileUpload"
                  className="mt-4 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full shadow-md hover:shadow-lg font-semibold cursor-pointer"
                >
                  Choose a File
                </label>
              </div>
            </section>

            {/* Right Section: Results */}
            <section className="bg-white rounded-3xl p-8 shadow-lg border border-gray-300 hover:shadow-xl transition-all">
              {score !== null ? (
                <>
                  {/* Display Score */}
                  <div className="mt-4 bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-xl text-center shadow-lg">
                    <p className="text-6xl font-extrabold text-white animate-bounce">{score}</p>
                    <p className="text-white font-semibold mt-2 text-lg">
                      {score >= 80
                        ? "Fantastic! Your resume stands out!"
                        : "Good effort! A few tweaks can make it even better."}
                    </p>
                  </div>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="mt-8 bg-yellow-50 p-6 rounded-xl shadow-md">
                      <h3 className="text-lg font-bold text-yellow-700">Suggestions for Improvement</h3>
                      <ul className="mt-4 list-disc ml-6 text-md text-yellow-800">
                        {suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center text-gray-600 text-md">
                  Upload your resume to see its score and improvement suggestions.
                </p>
              )}
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ATS_Score;
