import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Header from "../../../common/header/Header";
import Footer from "../../../common/Footer/Footer";

const ATS_Score = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async () => {
    if (!file) return alert("Please upload a resume!");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("https://ats-score-uv74.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Ensure feedback is always an array
      setResult({
        ...response.data,
        feedback: Array.isArray(response.data.feedback) ? response.data.feedback : [response.data.feedback],
      });
    } catch (error) {
      alert("Error analyzing resume!");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-900 font-inter px-4 sm:px-6 md:px-8">
  <div className="w-full max-w-7xl pt-20 flex flex-col items-center">
    <header className="w-full text-center px-6 py-12 bg-gradient-to-b from-blue-50 to-blue-100 text-black relative overflow-hidden rounded-lg shadow-md">
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 text-black bg-clip-text text-transparent mb-6">
          ATS Resume Checker
        </h1>
        <p className="mt-4 text-gray-900 text-base sm:text-lg md:text-xl leading-relaxed">
          Boost your resume with real-time insights and actionable recommendations.
        </p>
      </div>
    </header>

    <main className="w-full max-w-7xl px-4 sm:px-6 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
  
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-300 hover:shadow-xl transition-all w-full max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-indigo-700">Upload Your Resume</h2>
        <p className="text-center text-gray-500 text-sm mt-2">Supported formats: PDF. Max size: 5MB.</p>
        <div
          {...getRootProps()}
          className="mt-6 border-2 border-dashed border-gray-300 rounded-lg py-10 text-center hover:border-indigo-500 transition cursor-pointer"
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-lg font-medium text-gray-700">{file.name}</p>
          ) : (
            <p className="text-lg font-medium text-gray-700">Drag & Drop your resume here</p>
          )}
          <p className="text-gray-500 text-sm mt-2">or</p>
          <label className="mt-4 inline-block bg-gradient-to-r from-blue-400 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg font-semibold cursor-pointer">
            Choose a File
          </label>
        </div>
        <button
          onClick={handleUpload}
          className="mt-6 w-full px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </section>

     
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-300 hover:shadow-xl transition-all w-full max-w-xl mx-auto">
        {result !== null ? (
          <>
           
            <div className="mt-4 bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-xl text-center shadow-lg">
              <p className="text-5xl sm:text-6xl font-extrabold text-white animate-bounce">{result.score}</p>
              <p className="text-white font-semibold mt-2 text-base sm:text-lg">
                {result.score >= 80
                  ? "Fantastic! Your resume stands out!"
                  : "Good effort! A few tweaks can make it even better."}
              </p>
            </div>

    
            {result.feedback.length > 0 && (
              <div className="mt-6 bg-yellow-50 p-6 rounded-xl shadow-md max-h-48 overflow-y-auto border-l-4 border-yellow-500 scrollbar-hide">
                <h3 className="text-lg font-bold text-yellow-700">Suggestions for Improvement</h3>
                <div className="mt-4">
                  {result.feedback.map((suggestion, index) => {
                    // Extract key points
                    const formattedSuggestion = suggestion
                      .replace(/(?:\*\*)(.*?)(?:\*\*)/g, "<strong>$1</strong>") // Replace **bold** with <strong>
                      .replace(/\*/g, ""); // Remove stray asterisks

                    return (
                      <p
                        key={index}
                        className="text-md text-yellow-800 mb-2"
                        dangerouslySetInnerHTML={{ __html: formattedSuggestion }}
                      ></p>
                    );
                  })}
                </div>
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
};

export default ATS_Score;