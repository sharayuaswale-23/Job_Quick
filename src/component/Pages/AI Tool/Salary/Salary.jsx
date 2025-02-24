
import React, { useState } from "react";
import Header from "../../../common/header/Header";
import Footer from "../../../common/Footer/Footer";

const Salary = () => {
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [previousCTC, setPreviousCTC] = useState("");
  const [experience, setExperience] = useState("");
  const [expectedSalary, setExpectedSalary] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateSalary = () => {
    
    if (company && designation && previousCTC && experience) {
      const ctc = parseFloat(previousCTC);
      const exp = parseInt(experience);
      const multiplier = exp > 5 ? 2 : exp > 2 ? 1.9 : 1.3; 
      const calculatedSalary = (ctc * multiplier).toFixed(2);
      setExpectedSalary(`₹${calculatedSalary}`);
      setIsCalculating(true);
    } else {
      alert("Please fill out all fields to calculate salary.");
    }
  };

  return (
    <>
    <Header />

    <div className="min-h-screen pt-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      {/* Header Section */}
      <header className="relative w-full text-center pt-20 pb-4 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text mb-6 animate-fade-in">
          Salary Calculator
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed">
          Know your worth, calculate your earnings! Get accurate salary insights based on your CTC, experience, and industry trends.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 md:p-10 shadow-2xl max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Fields */}
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-blue-600">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur"
                    placeholder="Enter company name"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-blue-600">
                    Previous CTC (₹)
                  </label>
                  <input
                    type="number"
                    value={previousCTC}
                    onChange={(e) => setPreviousCTC(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur"
                    placeholder="Enter previous annual CTC"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-blue-600">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur"
                    placeholder="Enter designation"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-blue-600">
                    Experience (in years)
                  </label>
                  <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur"
                    placeholder="Enter years of experience"
                  />
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center pt-6">
              <button
                type="button"
                onClick={calculateSalary}
                disabled={isCalculating}
                className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
              >
                {isCalculating ? (
                  <span className="inline-block animate-spin mr-2">↻</span>
                ) : null}
                {isCalculating ? 'Calculated...' : 'Calculate Expected Salary'}
              </button>
            </div>
          </form>

          {/* Result Section */}
          {expectedSalary && (
            <div className="mt-10 animate-fade-in">
              <div className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 p-1 rounded-2xl shadow-lg">
                <div className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 rounded-xl p-6 text-center">
                  <h3 className="text-2xl font-bold text-black">
                    Your Expected Salary
                  </h3>
                  <p className="text-4xl font-bold mt-4 text-gray-800">
                    {expectedSalary}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Based on your experience and current market trends
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600 italic">
              "Success comes to those who are too busy to be looking for it." 
            </p>
          </div>
        </div>
      </main>
    </div>



    <Footer />
    </>
  );
};

export default Salary;