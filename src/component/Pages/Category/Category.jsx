import React from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import SearchBox from "./SearchBox/SearchBox";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <>
      <Header />

      <SearchBox />

      <div className="min-h-screen bg-gray-100 px-0 md:px-10">
  <div className="max-w-7xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
    {/* Sidebar Filters */}
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-md md:sticky top-6 h-fit">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">Categories</h2>
      <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
        <option>Categories</option>
      </select>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-700">Salary Type</h2>
      <div className="space-y-2">
        {["Monthly", "Weekly", "Daily", "Hourly"].map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-green-500" />
            <span>{type}</span>
          </label>
        ))}
      </div>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-700">Price</h2>
      <input
        type="range"
        className="w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-700">Employment Type</h2>
      <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
        <option>Full Time</option>
        <option>Part Time</option>
        <option>Freelance</option>
        <option>Internship</option>
      </select>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-700">Experience</h2>
      <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
        <option>Entry Level</option>
        <option>Mid Level</option>
        <option>Senior Level</option>
      </select>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-700">Qualification</h2>
      <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
        <option>Bachelor's</option>
        <option>Master's</option>
        <option>PhD</option>
      </select>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-700">Location</h2>
      <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
        <option>Location</option>
      </select>

      <button className="mt-6 w-full bg-green-500 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-green-600 transition">
        <FaSearch /> <span>Search</span>
      </button>
    </div>

    {/* Job Listings */}
    <div className="md:col-span-3 space-y-6">
      {[...Array(15)].map((_, i) => (
        <Link to="/jobdetail">
        <div
          key={i}
          className="bg-white p-6 m-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-lg transition"
        >
        
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <img
              src="https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer2.jpg"
              alt="Company Logo"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-md md:text-lg font-semibold text-gray-800">
                Senior Staff Nurse
              </h3>
              <p className="text-gray-600 text-sm">Upwork</p>
              <p className="text-gray-600 text-sm">
                $50 - $100 / week | Full Time | New York
              </p>
            </div>
          </div>
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <FaHeart className="text-red-500" />
          </button>
          
        </div>
        </Link>
      ))}
    </div>
  </div>
</div>

      <Footer />
    </>
  );
};

export default Category;
