import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Header from "../../../common/header/Header";
import Footer from "../../../common/Footer/Footer";
import atsscore from "../../../../assets/Images/atsscore.png";

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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white flex flex-col items-center justify-center text-gray-900 font-inter px-4 sm:px-6 md:px-8 py-10">
  <div className="w-full max-w-7xl pt-8 md:pt-16 flex flex-col items-center">
    {/* Enhanced Header with Animation and Visual Elements */}
    <header className="w-full text-center px-6 py-12 bg-gradient-to-r from-blue-300 to-blue-400 text-white relative overflow-hidden rounded-2xl shadow-lg mb-10">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full opacity-10 blur-3xl"></div>
      </div>
      <div className="relative z-10">
        <div className="inline-block mb-6 p-3 bg-white/20 backdrop-blur-sm rounded-full animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          ATS Resume Checker
        </h1>
        <div className="w-24 h-1 bg-white/40 mx-auto mb-6 rounded-full"></div>
        <p className="mt-4 text-blue-100 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Boost your job applications with AI-powered resume analysis and actionable recommendations.
        </p>
      </div>
    </header>

    {/* Improved Main Content with Card Effects */}
    <main className="w-full max-w-7xl px-4 sm:px-6 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
      {/* Upload Section with Glass Morphism Effect */}
      <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-500 w-full max-w-xl mx-auto transform hover:-translate-y-1 min-h-[520px] flex flex-col justify-between">
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Upload Your Resume</h2>
          <p className="text-center text-gray-500 text-sm mt-2">Supported formats: PDF. Max size: 5MB.</p>
        </div>
        
        <div
          {...getRootProps()}
          className="flex-1 border-2 border-dashed border-blue-200 rounded-2xl py-8 px-6 text-center hover:border-blue-500 transition-all duration-300 cursor-pointer bg-blue-50/50 hover:bg-blue-50 flex flex-col items-center justify-center mb-6"
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-800 mb-1">{file.name}</p>
              <p className="text-sm text-gray-500">Click or drag to replace</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mb-4 animate-pulse shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-800 mb-1">Drag & Drop your resume here</p>
              <p className="text-sm text-gray-500">or</p>
            </div>
          )}
          <label className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg font-semibold cursor-pointer transition transform hover:scale-105 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
            Choose a File
          </label>
        </div>

        <button
          onClick={handleUpload}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] flex items-center justify-center gap-2 font-bold text-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Upload & Analyze</span>
            </>
          )}
        </button>
      </section>

      {/* Results Section with Enhanced Visuals */}
      <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-500 w-full max-w-xl mx-auto transform hover:-translate-y-1 min-h-[520px] flex flex-col">
        {result !== null ? (
          <div className="space-y-6 flex-1 flex flex-col">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">Resume Analysis</h2>
            </div>
            
            {/* Enhanced Score Display with Glow Effect */}
            <div className="relative bg-gradient-to-br from-blue-300 to-blue-400 p-8 rounded-2xl text-center shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full opacity-20 blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-glow">
                    <p className="text-6xl font-extrabold text-white animate-pulse-slow">{result.score}</p>
                  </div>
                </div>
                <p className="text-white font-semibold mt-4 text-lg px-4">
                  {result.score >= 80 ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Fantastic! Your resume stands out! 🎉
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Good effort! A few tweaks can make it even better! 💡
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Enhanced Feedback Section with Improved Styling */}
            {result.feedback.length > 0 && (
              <div className="mt-4 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400 flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-bold text-yellow-700">Suggestions for Improvement</h3>
                </div>
                <div className="mt-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent scrollbar-hide scrollbar-rounded flex-1 max-h-64">
                {result.feedback.map((suggestion, index) => {
                  const formattedSuggestion = suggestion
  .replace(/(?:\*\*)(.*?)(?:\*\*)/g, "<strong class='text-yellow-900'>$1</strong>")
  .replace(/\*/g, "")
  // Add a new line before any bold header text that will have a bullet
  .replace(/<strong class='text-yellow-900'>(.*?)<\/strong>/g, "<br/><br/><strong class='text-yellow-900'>$1</strong>")
  // Format bullet points with bold headers (now already on new lines)
  .replace(/•\s*(.*?):/g, "• <strong>$1:</strong>")
  // Format numerical subpoints with bold headers but without displaying the numbers
  .replace(/(\d+)\.\s*(.*?):/g, "<br/><br/><strong>$2:</strong>")

  return (
    <div
      key={index}
      className="text-md text-yellow-800 mb-4 pb-3 border-b border-yellow-200 last:border-0 hover:bg-yellow-100/50 p-2 rounded-lg transition-colors"
    >
      {/* <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-300 text-yellow-800 font-bold text-sm mr-3 shadow-sm">{index + 1}</span> */}
      <span dangerouslySetInnerHTML={{ __html: formattedSuggestion }}></span>
    </div>
  );
})}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col flex-1 items-center justify-center text-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-8 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text mb-4">No Results Yet</h3>
            <p className="text-center text-gray-600 text-lg max-w-md leading-relaxed">
              Upload your resume to see its ATS compatibility score and get personalized improvement suggestions.
            </p>
            
            <div className="mt-8 flex items-center justify-center text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <p className="font-medium">Start by uploading your resume</p>
            </div>
          </div>
        )}
      </section>
    </main>

    {/* Enhanced Footer with Card Design */}
    <footer className="w-full max-w-3xl mt-16 mb-8 text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
      <div className="flex items-center justify-center mb-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mx-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <div className="h-px w-16 bg-gradient-to-r from-blue-300 via-transparent to-transparent"></div>
      </div>
      <p className="text-gray-600">© {new Date().getFullYear()} ATS Resume Checker. All rights reserved.</p>
      <p className="mt-2 text-blue-500 text-sm font-medium">Helping job seekers stand out with ATS-optimized resumes.</p>
    </footer>
  </div>
  
  {/* Background Elements */}
  <div className="fixed top-0 right-0 -z-10 opacity-40 blur-3xl overflow-hidden">
    <div className="w-[500px] h-[500px] rounded-full bg-blue-200/30 -translate-y-1/2 translate-x-1/3" />
  </div>
  <div className="fixed bottom-0 left-0 -z-10 opacity-40 blur-3xl overflow-hidden">
    <div className="w-[500px] h-[500px] rounded-full bg-indigo-200/30 translate-y-1/2 -translate-x-1/3" />
  </div>
</div>

      <Footer />
    </>
  );
};

export default ATS_Score;