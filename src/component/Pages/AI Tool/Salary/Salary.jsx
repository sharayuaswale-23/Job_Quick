
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

    <header className="w-full text-center mt-20 py-8 bg-gradient-to-b from-blue-50 to-blue-100 text-black relative overflow-hidden">     
            <div className="relative z-10">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 text-black bg-clip-text text-transparent mb-6">
                Salary Calculator
              </h1>
              <p className="mt-4 text-gray-900 text-lg md:text-xl leading-relaxed">
              "Know your worth, calculate your earnings! Get accurate salary insights based on your skills, experience, and industry trends."
              </p>
            </div>
          </header>
  

    <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen py-6">
  <main className="container mx-auto px-4 md:px-8 py-8">
 


    <div className="bg-white shadow-xl mb-20 rounded-lg p-8 md:max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 text-black bg-clip-text text-transparent mb-6 text-center">Salary Calculator</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-600">Company Name</label>
          <input 
            type="text"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-gray-600">Designation</label>
          <input 
            type="text"
            placeholder="Enter designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="ctc" className="block text-sm font-medium text-gray-600">Previous CTC (₹)</label>
          <input 
            type="number"
            placeholder="Enter previous annual CTC"
            value={previousCTC}
            onChange={(e) => setPreviousCTC(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-600">Experience (in years)</label>
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
            className="bg-gradient-to-r from-blue-400 to-blue-700 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Calculate Expected Salary
          </button>
        </div>

      </form>

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

    <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
      FAQs on JobQuick Salary Calculator
    </h1>

    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">What is Salary and its components?</h2>
        <p className="text-gray-600 mt-2">
          Salary is a fixed amount of money or compensation paid to an employee by an employer in return for work performed. It is usually paid at the end of each month.
        </p>
        <p className="text-gray-600 mt-2">
          The salary components vary with different employers. Below is a list of the most common salary components.
        </p>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-800">Basic Salary:</h3>
        <p className="text-gray-600 mt-1">
          It is a fixed base part of an individual’s compensation package. Basic Salary is taxable & usually 35–50% of the total gross salary. However, it is usually determined by taking an employee’s designation, experience & industry of work into account.
        </p>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-800">House Rent Allowance (HRA):</h3>
        <p className="text-gray-600 mt-1">
          It is a monetary benefit given to employees by companies for expenses related to rented accommodation. It is a fully taxable component if you do not stay in rented property.
        </p>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-800">Leave Travel Allowance (LTA):</h3>
        <p className="text-gray-600 mt-1">
          It is a type of allowance which is provided by the employer to his employee who is travelling on leave from work to cover his travel expenses. LTA is an important component of the salary of the employee as it is eligible for income tax exemption as per the Income Tax Act, 1961.
        </p>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-800">Special Allowance:</h3>
        <p className="text-gray-600 mt-1">
          Special allowance is a fixed amount that is given to employees over and above the basic salary in order to meet certain requirements. It is a fully taxable component of your salary.
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