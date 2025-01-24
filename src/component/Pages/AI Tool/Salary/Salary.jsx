
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
      const multiplier = exp > 5 ? 1.3 : exp > 2 ? 1.3 : 1.1; // Mock multiplier logic
      const calculatedSalary = (ctc * multiplier).toFixed(2);
      setExpectedSalary(`₹${calculatedSalary}`);
    } else {
      alert("Please fill out all fields to calculate salary.");
    }
  };

  return (
    <>
    <Header />
    <div className="bg-gradient-to-r px-8 from-blue-50 pt-6 to-purple-50 min-h-screen">
      <main className="container mx-auto px-4 py-20">
        <div className="bg-white shadow-lg mb-20 rounded-lg p-6 md:max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Salary Calculator</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-600">Company Name</label>
              <input 
                type="text"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-600">Designation</label>
              <input 
                type="text"
                placeholder="Enter designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="ctc" className="block text-sm font-medium text-gray-600">Previous CTC (₹)</label>
              <input 
                type="number"
                placeholder="Enter previous annual CTC"
                value={previousCTC}
                onChange={(e) => setPreviousCTC(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-600">Experience (in years)</label>
              <input 
                type="number"
                placeholder="Enter years of experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-1 md:col-span-2 text-center">
              <button 
                type="button"
                onClick={calculateSalary}
                className="bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-medium shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                Calculate Expected Salary
              </button>
            </div>

          </form>

          {expectedSalary && (
            <div className="mt-6 p-6 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 rounded-lg shadow-xl text-center">
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


    <h1 class="text-2xl font-bold mb text-blue-700 mb-6">
      FAQs on AmbitionBox Salary Calculator
    </h1>

    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-gray-800">
          What is Salary and its components?
        </h2>
        <p class="text-gray-600 mt-2">
          Salary is a fixed amount of money or compensation paid to an employee by an employer in return for work performed. It is usually paid at the end of each month.
        </p>
        <p class="text-gray-600 mt-2">
          The salary components vary with different employers. Below is a list of the most common salary components.
        </p>
      </div>

      <div>
        <h3 class="text-md font-semibold text-gray-800">Basic Salary:</h3>
        <p class="text-gray-600 mt-1">
          It is a fixed base part of an individual’s compensation package. Basic Salary is taxable & usually 35–50% of the total gross salary. However, it is usually determined by taking an employee’s designation, experience & industry of work into account.
        </p>
      </div>

      <div>
        <h3 class="text-md font-semibold text-gray-800">House Rent Allowance (HRA):</h3>
        <p class="text-gray-600 mt-1">
          It is a monetary benefit given to employees by companies for expenses related to rented accommodation. It is a fully taxable component if you do not stay in rented property.
        </p>
      </div>

      <div>
        <h3 class="text-md font-semibold text-gray-800">Leave Travel Allowance (LTA):</h3>
        <p class="text-gray-600 mt-1">
          It is a type of allowance which is provided by the employer to his employee who is travelling on leave from work to cover his travel expenses. LTA is an important component of the salary of the employee as it is eligible for income tax exemption as per the Income Tax Act, 1961.
        </p>
      </div>

      <div>
        <h3 class="text-md font-semibold text-gray-800">Special Allowance:</h3>
        <p class="text-gray-600 mt-1">
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