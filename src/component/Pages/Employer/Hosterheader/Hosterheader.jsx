import React from "react";
import { Link } from "react-router-dom";

const Hosterheader = ()=> {
    return(
        <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-blue-600">
          Job Quick
        </a>

        {/* Search Bar & Post Button */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              className="border rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <Search className="absolute left-3 top-2.5 text-gray-400" size={18} /> */}
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
            Post Job
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <input
            type="text"
            placeholder="Search jobs..."
            className="border rounded-md w-full px-3 py-2"
          />
          <button className="bg-blue-600 text-white w-full px-4 py-2 rounded-md">
            Post Job
          </button>
        </div>
      )}
    </nav>
    )
}

export default Hosterheader;