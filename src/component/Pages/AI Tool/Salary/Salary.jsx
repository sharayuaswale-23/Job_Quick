
import React, { useState } from "react";
import Header from "../../../common/header/Header";
import Footer from "../../../common/Footer/Footer";
// import { FaRegMoneyBillAlt } from "react-icons/fa"; // Adding an icon for the salary section

const Salary = () => {
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [previousCTC, setPreviousCTC] = useState("");
  const [experience, setExperience] = useState("");
  const [expectedSalary, setExpectedSalary] = useState(null);

  const calculateSalary = () => {
    // Mock calculation logic
    if (company && designation && previousCTC && experience) {
      const ctc = parseFloat(previousCTC);
      const exp = parseInt(experience);
      const multiplier = exp > 5 ? 2 : exp > 2 ? 1.9 : 1.3; // Mock multiplier logic
      const calculatedSalary = (ctc * multiplier).toFixed(2);
      setExpectedSalary(`₹${calculatedSalary}`);
    } else {
      alert("Please fill out all fields to calculate salary.");
    }
  };

  return (
    <>
    <Header />

    <header className="w-full text-center mt-20 py-12 bg-gradient-to-b from-blue-50 to-blue-100 text-black relative overflow-hidden">
  <div className="relative z-10">
    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-900 text-transparent bg-clip-text mb-6">
      Salary Calculator
    </h1>
    <p className="mt-4 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
      "Know your worth, calculate your earnings! Get accurate salary insights based on your CTC, experience, and industry trends."
    </p>
  </div>
</header>

<div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen py-6">
  <main className="container mx-auto px-4 md:px-8 py-8">
    {/* Salary Calculator Form */}
    <div className="bg-white shadow-xl mb-20 rounded-lg p-8 md:max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-900 text-transparent bg-clip-text mb-6 text-center">
        Salary Calculator
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Fields */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-600 mb-2">Company Name</label>
          <input 
            type="text"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-gray-600 mb-2">Designation</label>
          <input 
            type="text"
            placeholder="Enter designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="ctc" className="block text-sm font-medium text-gray-600 mb-2">Previous CTC (₹)</label>
          <input 
            type="number"
            placeholder="Enter previous annual CTC"
            value={previousCTC}
            onChange={(e) => setPreviousCTC(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-600 mb-2">Experience (in years)</label>
          <input 
            type="number"
            placeholder="Enter years of experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2 text-center">
          <button 
            type="button"
            onClick={calculateSalary}
            className="bg-gradient-to-r from-blue-400 to-blue-700 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Calculate Expected Salary
          </button>
        </div>

      </form>

      {/* Salary Output */}
      {expectedSalary && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 rounded-lg shadow-xl text-center">
          <h3 className="text-2xl font-semibold text-white">Your Expected Salary</h3>
          <div className="mt-3 flex justify-center items-center space-x-3 text-white">
            <p className="text-3xl font-bold">{expectedSalary}</p>
          </div>
        </div>
      )}

      <p className="text-center text-gray-600 mt-6 text-sm italic">
        "Success comes to those who are too busy to be looking for it." – 
      </p>
    </div>

  </main>
</div>



    <Footer />
    </>
  );
};

export default Salary;