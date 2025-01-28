import React, { useState, useEffect } from "react";
import { FaTh, FaBars, FaTimes, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAiDropdownOpen, setIsAiDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleAiDropdown = () => {
    setIsAiDropdownOpen(!isAiDropdownOpen);
  };

    const handleLogout = () => {
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
      setIsAuthorized(false); // Ensure global logout
      navigate("/");
    };

  return (
    <nav className="bg-pink-50 fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="flex items-center justify-between px-4 py-5 md:px-10">
        {/* Logo */}
        <div className="flex items-center text-lg font-bold text-black">
          <Link to="/">
            <FaTh className="mr-2 text-xl" />
          </Link>
          <Link to="/">Job Quick</Link>
        </div>

        {/* Hamburger Menu (Mobile) */}



<div className="flex justify-center items-center space-x-3">
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black mt-1 text-2xl"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {!isAuthenticated ? (
            <>
            
            </>
          ) : (
            <>
         
          <div className="relative lg:hidden">
              <FaUserCircle
                onClick={toggleDropdown}
                className="text-2xl text-black cursor-pointer"
              />
             
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to="/Profile">Profile</Link>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
            </>
          )}
          </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-black">
          <li className="cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/category">Category</Link>
          </li>
          <li className="relative group cursor-pointer">
            <div
              onClick={toggleAiDropdown}
              className="flex items-center gap-1"
            >
              AI Tools <FaChevronDown />
            </div>
            {isAiDropdownOpen && (
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
          <li className="cursor-pointer">
            <Link to="/salary">Salary</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="relative hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <button className="px-4 py-2 border border-white text-black rounded-lg hover:bg-gray-100">
                <Link to="/dashboard">For Employer</Link>
              </button>
              <button className="px-4 py-2 text-black bg-white rounded-lg hover:bg-gray-100">
                <Link to="/login">Log in</Link>
              </button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 text-black bg-white rounded-lg hover:bg-gray-100">
                <Link to="/Dashboard">For Employer</Link>
              </button>
              <div className="relative">
                <FaUserCircle
                  onClick={toggleDropdown}
                  className="text-3xl text-black cursor-pointer"
                />
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col items-center px-6 py-4 space-y-4 text-black md:hidden bg-pink-50">
          <ul className="space-y-4 text-center">
            <li className="cursor-pointer ">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/category">Category</Link>
            </li>
            <li className="cursor-pointer">
              <div
                onClick={toggleAiDropdown}
                className="flex items-center justify-center gap-1"
              >
                AI Tools <FaChevronDown />
              </div>
              {isAiDropdownOpen && (
                <ul className="mt-2 bg-white shadow-lg rounded-lg text-gray-700">
                  <li className="px-4 py-2">
                    <Link to="/resumebuilder">Resume Builder</Link>
                  </li>
                  <li className="px-4 py-2">
                    <Link to="/atsscore">ATS Score</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="cursor-pointer">
              <Link to="/salary">Salary</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/contact">Contact Us</Link>
            </li>
            {!isAuthenticated ? (
            <>
              <div className="flex flex-col items-center gap-4">
              <button className="px-4 py-2 border border-white text-black rounded-lg hover:bg-gray-100">
                <Link to="/Dashboard">For Employer</Link>
              </button>
              <button className="px-4 py-2 text-black bg-white rounded-lg hover:bg-gray-100">
                <Link to="/login">Log in</Link>
              </button>
              </div>
            </>
          ) : (
            <>
            <button className="px-4 py-2 text-black bg-white rounded-lg hover:bg-gray-100">
            <Link to="/Dashboard">For Employer</Link>
              </button>
            </>
          )}
          </ul>
         
        </div>
      )}
    </nav>
  );
};

export default Header;