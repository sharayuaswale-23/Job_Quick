import React, { useState } from "react";
import { FaTh, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-pink-50 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-4 md:px-10">
   
        <div className="flex items-center text-lg font-bold text-gray-800">
          <FaTh className="mr-2 text-xl" />
          Job Quick
        </div>

      
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 text-2xl"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

       
        <ul className="hidden md:flex items-center gap-6 text-gray-700">
          <li className="cursor-pointer hover:text-gray-900">Home</li>
          <li className="cursor-pointer hover:text-gray-900">Browse Jobs</li>
          <li className="cursor-pointer hover:text-gray-900">AI Builder</li>
          <li className="cursor-pointer hover:text-gray-900">Salary</li>
          <li className="cursor-pointer hover:text-gray-900">Career</li>
        </ul>

     
        <div className="hidden md:flex items-center gap-4">
          <button className="px-4 py-2 border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-100">
            Sign in
          </button>
          <button className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700">
            Log in
          </button>
        </div>
      </div>

   
      {isMenuOpen && (
        <div className="flex flex-col items-center px-6 py-4 space-y-4 text-gray-700 md:hidden">
          <ul className="space-y-4 text-center">
            <li className="cursor-pointer hover:text-gray-900">Home</li>
            <li className="cursor-pointer hover:text-gray-900">Browse Jobs</li>
            <li className="cursor-pointer hover:text-gray-900">AI Builder</li>
            <li className="cursor-pointer hover:text-gray-900">Salary</li>
            <li className="cursor-pointer hover:text-gray-900">Career</li>
          </ul>
          <button className="px-4 py-2 border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-100">
            Sign in
          </button>
          <button className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700">
            Log in
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
