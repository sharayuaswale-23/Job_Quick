import React from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Category = () => {
  const [narrators, setNarrators] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [salaryType, setSalaryType] = useState([]);
  const [employmentType, setEmploymentType] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const locations = ["New York", "San Francisco", "Los Angeles", "Chicago", "Houston"];
  const categories = ["Developer", "Designer", "Manager"];  // Example categories
  const salaryTypes = ["Monthly   ", "Weekly", "Daily", "Hourly"]; // Example salary types
  const employmentTypes = ["Full Time", "Part Time", "Freelance", "Internship"];
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"];
  const qualifications = ["Bachelor's", "Master's", "PhD"];

  useEffect(() => {
    fetch("https://jobqueck-1.onrender.com/api/narrators")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.narrators)) {
          setNarrators(data.narrators);
          setFilteredData(data.narrators);
        } else {
          console.error("API response is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
  };

  const handleFilter = () => {
    let filtered = narrators.filter((narrator) => {
      return (
        (search ? narrator.title.toLowerCase().includes(search.toLowerCase()) : true) &&
        (location ? narrator.location === location : true) &&
        (category ? narrator.category === category : true) &&
        (salaryType.length > 0
          ? salaryType.includes(narrator.salaryType)
          : true) &&
        (employmentType ? narrator.emptype === employmentType : true) &&
        (experience ? narrator.experience === experience : true) &&
        (qualification ? narrator.qualification === qualification : true)
      );
    });

    setFilteredData(filtered);
  };

  return (
    <>
      <Header />

      <div className="mt-20 w-full bg-cloudinary-500 p-12 py-12 px-14 flex flex-col items-left text-left">
        <h1 className="text-3xl font-bold mb-2">Job List</h1>
        <p className="text-gray-600 mb-6">
          We are a team come join us. We want you to apply and work with us.
        </p>
        <div className="bg-white shadow-md flex flex-col md:flex-row items-center w-full md:w-3/4 lg:w-3/4 p-4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center w-full rounded px-3 py-2">
            <span className="text-gray-500 pr-2">🔍</span>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Job Title"
              className="w-full outline-none"
            />
          </div>
          <div className="relative w-full">
            <div
              className="flex items-center rounded px-3 py-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="text-gray-500 pr-2">📍</span>
              <input
                type="text"
                placeholder="City"
                value={location}
                readOnly
                className="w-full outline-none cursor-pointer"
              />
              <span className="pl-2">▼</span>
            </div>
            {showDropdown && (
              <ul className="absolute bg-white w-full mt-1 shadow-md">
                {locations.map((loc, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setLocation(loc);
                      setShowDropdown(false);
                    }}
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="bg-green-800 text-white px-6 py-2 font-semibold"
            onClick={handleFilter}
          >
            Search
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 px-0 md:px-10">
        <div className="max-w-7xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-md md:sticky top-6 h-fit">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">Categories</h2>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-700">Salary Type</h2>
            <div className="space-y-2">
              {salaryTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-green-500"
                    onChange={(e) => {
                      const updatedSalaryTypes = e.target.checked
                        ? [...salaryType, type]
                        : salaryType.filter((item) => item !== type);
                      setSalaryType(updatedSalaryTypes);
                    }}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-700">Employment Type</h2>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setEmploymentType(e.target.value)}
            >
              <option value="">All Employment Types</option>
              {employmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-700">Experience</h2>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="">All Experience Levels</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-700">Qualification</h2>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setQualification(e.target.value)}
            >
              <option value="">All Qualifications</option>
              {qualifications.map((qual) => (
                <option key={qual} value={qual}>
                  {qual}
                </option>
              ))}
            </select>

            <button
              className="mt-6 w-full bg-green-500 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-green-600 transition"
              onClick={handleFilter}
            >
              <FaSearch /> <span>Search</span>
            </button>
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.length > 0 ? (
                filteredData.map((narrator, index) => (
                  <Link to="/jobdetail" key={index}>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                      <div className="flex items-center p-4">
                        <img
                          src={narrator.imageUrl}
                          alt={narrator.title}
                          className="w-16 h-16 rounded-full mr-4 border-2 border-gray-300"
                        />
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800">{narrator.designation}</h2>
                          <p className="text-sm text-gray-500">{narrator.location}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700"><strong>Emp type:</strong> {narrator.emptype}</p>
                        <p className="text-gray-700"><strong>Experience:</strong> {narrator.experience}</p>
                        <p className="text-gray-700"><strong>Category:</strong> {narrator.category}</p>
                        <p className="text-gray-700"><strong>Package:</strong> {narrator.package}</p>
                        <p className="text-gray-700"><strong>Company Name:</strong> {narrator.companyName}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">No narrators found. Please try a different search.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Category;