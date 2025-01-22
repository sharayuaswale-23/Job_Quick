import React from "react";
import RuleImg from "../../../../assets/Images/ruleimg.jpg";

const Rules = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-[#F9F6F1] p-8 md:p-16">
    
      <div className="w-full md:w-1/2">
        <img
          src={RuleImg}
          alt="Woman working on a laptop"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

   
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        A Whole World of Career Opportunities at Your Fingertips
        </h2>

        <div className="space-y-6">
      
          <div className="flex items-start">
            <div className="text-green-600 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7 21a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
              Verified Job Listings
              </h3>
              <p className="text-gray-600">
              Browse jobs from verified employers, complete with detailed descriptions and company profiles.
              </p>
            </div>
          </div>

     
          <div className="flex items-start">
            <div className="text-green-600 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a4 4 0 10-8 0v2m-2 0a6 6 0 0112 0v2a2 2 0 002 2h-1a2 2 0 00-2 2v4H8v-4a2 2 0 00-2-2H5a2 2 0 002-2V9z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
              No Cost to Apply
              </h3>
              <p className="text-gray-600">
              Create your profile and apply to as many job postings as you like—absolutely free.
              </p>
            </div>
          </div>

       
          <div className="flex items-start">
            <div className="text-green-600 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2s-3 1.343-3 3 1.343 3 3 3zm0 14c4.418 0 8-3.582 8-8a7.953 7.953 0 00-.88-3.793A4.992 4.992 0 0012 10a4.992 4.992 0 00-7.12 4.207A7.953 7.953 0 004 18c0 4.418 3.582 8 8 8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
              Safe and Secure
              </h3>
              <p className="text-gray-600">
              Your personal information is protected with advanced security measures, ensuring a safe job search experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;