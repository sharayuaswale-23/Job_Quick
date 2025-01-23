import React, { useState } from "react";
import { FaTh, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null); 
    } else {
      setActiveDropdown(dropdownName); 
    }
  };

  return (
    <nav className="bg-pink-50 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-4 md:px-10">
     
        <div className="flex items-center text-lg font-bold text-gray-800">
          <Link to="/"><FaTh className="mr-2 text-xl"/> </Link>
          <Link to="/">Job Quick</Link>
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
          <li className="cursor-pointer hover:text-gray-900">
            <Link to="/">Home</Link>
          </li>

         
          <li className="relative group cursor-pointer">
            {/* <div
              onClick={() => toggleDropdown("categories")}
              className="flex items-center gap-1 hover:text-gray-900"
            >
             Categories <FaChevronDown />
            </div>
            {activeDropdown === "categories" && (
              <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/">Development & IT</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/">Digital Marketing</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/">Finance & Accounting</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/">Design & Creative</Link>
                </li>
              </ul>
            )} */}
            <Link to="/category">Category</Link>
          </li>

       
          <li className="relative group cursor-pointer">
            <div
              onClick={() => toggleDropdown("aiBuilder")}
              className="flex items-center gap-1 hover:text-gray-900"
            >
              AI Tools <FaChevronDown />
            </div>
            {activeDropdown === "aiBuilder" && (
              <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/resumebuilder">Resume Builder</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/atsscore">ATS Score</Link>
                </li>
              </ul>
            )}
          </li>
         

          <li className="cursor-pointer hover:text-gray-900">
          <Link to="/salary">Salary</Link></li>
          <li className="cursor-pointer hover:text-gray-900">
          <Link to="/">Career</Link></li>
          <li className="cursor-pointer hover:text-gray-900">
          <Link to="/contact">Contact Us</Link>
          </li>
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
            <li className="cursor-pointer hover:text-gray-900">
              <Link to="/">Home</Link>
            </li>

          
            <li className="cursor-pointer hover:text-gray-900">
              {/* <div
                onClick={() => toggleDropdown("categories")}
                className="flex items-center justify-center gap-1"
              >
                Categories <FaChevronDown />
              </div>
              {activeDropdown === "categories" && (
                <ul className="mt-2 bg-white shadow-lg rounded-lg text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="/development-it">Development & IT</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="/digital-marketing">Digital Marketing</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="/finance-accounting">Finance & Accounting</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="/design-creative">Design & Creative</a>
                  </li>
                </ul>
              )} */}
              <Link to="/category">Categories</Link>
            </li>

          
            <li className="cursor-pointer hover:text-gray-900">
              <div
                onClick={() => toggleDropdown("aiBuilder")}
                className="flex items-center justify-center gap-1"
              >
                AI Tool <FaChevronDown />
              </div>
              {activeDropdown === "aiBuilder" && (
                <ul className="mt-2 bg-white shadow-lg rounded-lg text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="/resumebuilder">Resume Builder</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="/atsscore">ATS Score</a>
                  </li>
                </ul>
              )}
            </li>

            <li className="cursor-pointer hover:text-gray-900">
              <Link to="/salary">Salary</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-900">
              <Link to="/">Career</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-900">
            <Link to="/contact">Contact Us</Link>
            </li>
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
