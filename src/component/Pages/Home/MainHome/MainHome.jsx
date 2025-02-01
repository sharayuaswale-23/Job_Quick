import React from "react";
import Homeimg from "../../../../assets/Images/HomeImg.jpg";
import TextMarque from "../../../Animation/TextMarque/TextMarque";
import { useState } from "react";

const MainHome = () => {

  const [searchInput, setSearchInput] = useState(""); // Stores user input
  const [searchQuery, setSearchQuery] = useState(""); // Stores query after clicking search

  // Handle search button click
  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-br bg-gray-100 text-black mt-16">
     
        <div className="flex flex-col justify-center items-start text-left w-full md:w-1/2 p-8 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fadeInUp">
            Discover Your Dream Job.
          </h1>
          <p className="text-lg md:text-xl font-light animate-fadeInUp delay-1s">
            Join millions of job seekers and employers creating success stories every day.
          </p>

       
          <div className="flex w-full max-w-lg border border-gray-200 rounded-full overflow-hidden shadow-xl bg-white animate-fadeInUp delay-2s">
            <input
              type="text"
              placeholder="Search for designation..."
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full p-4 outline-none text-gray-700 placeholder-gray-400"
            />
            <button
            onClick={handleSearch} 
             className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300">
              Search
            </button>
          </div>

        
            <TextMarque/>
          
        </div>

  
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <img
            src={Homeimg}
            alt="Hero"
            className="w-full h-auto max-w-xl object-cover rounded-lg shadow-2xl animate-zoomIn"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-fadeInUp.delay-1s {
          animation-delay: 0.5s;
        }

        .animate-fadeInUp.delay-2s {
          animation-delay: 1s;
        }

        .animate-fadeInUp.delay-3s {
          animation-delay: 1.5s;
        }

        .animate-zoomIn {
          animation: zoomIn 1s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default MainHome;