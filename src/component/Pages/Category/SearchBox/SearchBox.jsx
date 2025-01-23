import React from "react";
import Searchimg from "../../../../assets/Images/Search.webp";
const SearchBox = () => {
    return(
        <div className="bg-rose-100 min-h-[300px] flex flex-col md:flex-row items-center justify-center pt-16 md:pt-20">
 
            <div className="w-full md:w-7/12 text-center px-2 md:px-6 md:text-left mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Job List</h1>
            <p className="text-gray-600 mt-2">
            We are a team come join us. We want you to apply and work with us.
            </p>
            <div className="w-full bg-white shadow-lg rounded-lg flex items-center overflow-hidden mt-6 border border-gray-300">
            <div className="flex items-center px-4 w-full">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16l4-4m0 0l4-4m-4 4H4m16 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1"
            />
            </svg>
            <input
            type="text"
            placeholder="Search for jobs, titles, or skills"
            className="w-full py-3 px-2 text-gray-700 focus:outline-none focus:ring-1 "
            />
            </div>
            <button className="bg-green-600 text-white px-6 py-3 font-semibold hover:bg-green-700 flex items-center justify-center">
            Search
            </button>
            </div>
            </div>



            {/* Image Section */}
            <div className="hidden md:block md:w-5/12">
            <img
                src={Searchimg}
                alt="Illustration"
                className="w-full h-auto"
            />
            </div>
            </div>
    )
}
export default SearchBox;
