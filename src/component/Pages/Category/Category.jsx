import React, { useState, useEffect } from "react";
import { Heart, MapPin, Briefcase, Search } from "lucide-react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../component/common/header/Header";
import Footer from "../../../component/common/Footer/Footer";
import searchimg from "../../../assets/Images/Search.webp";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState({});

  // Toggle favorite status
  const handleFavoriteToggle = (jobId) => {
    setFavorites((prev) => ({
      ...prev,
      [jobId]: !prev[jobId], // Toggle favorite status
    }));
  };

  const BASE_URL = "https://jobquick.onrender.com";
  const JobToken = Cookies.get("userToken") || "";

  const [filters, setFilters] = useState({
    selectedCategories: [],
    title: new URLSearchParams(location.search).get("title") || "",
    jobType: "",
    workType: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      title: new URLSearchParams(location.search).get("title") || "",
    }));
  }, [location.search]);

  useEffect(() => {
    fetchData("categories", setCategories);
  }, []);

  useEffect(() => {
    fetchData("job/filter", setJobListings, filters);
  }, [filters]);

  const fetchData = async (endpoint, setter, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${BASE_URL}/${endpoint}?${queryParams}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${JobToken}` },
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setter(data.jobs || data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setFilters((prev) => {
      const updatedCategories = prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter((id) => id !== categoryId)
        : [...prev.selectedCategories, categoryId];
      return { ...prev, selectedCategories: updatedCategories, page: 1 };
    });
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleSearch = () => {
    navigate(`?title=${searchInput}`);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen mt-20 bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">


        <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6 mb-6 w-full">
 
  <div className="w-full md:w-[65%] flex flex-col items-center md:items-start gap-3 p-2">
  
    <div className="w-full mb-4 flex flex-col justify-center items-center md:items-start">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h2>
      <p className="text-gray-700 text-md">Search for jobs by title to start your career journey.</p>
    </div>

 
    <div className="w-full flex flex-col md:flex-row items-center gap-4">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Job title"
        className="flex-1 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-800"
      >
        <Search size={20} /> Search
      </button>
    </div>
  </div>


  <div className="w-[35%] hidden md:flex justify-center p-2 rounded-lg">
    <img src={searchimg} alt="Job Search Illustration" className="max-w-full h-auto" />
  </div>
</div>



        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                    className="w-4 h-4"
                  />
                  <span>{category.title}</span>
                </label>
              ))}
            </div>
          </div>



    <div className="md:col-span-3">
  {loading ? (
    <p className="text-center text-lg text-gray-600">Loading...</p>
  ) : error ? (
    <p className="text-center text-red-500 font-semibold">{error}</p>
  ) : jobListings.length === 0 ? (
    <p className="text-center text-gray-500 text-lg">No jobs found</p>
  ) : (
    <div className="space-y-6">
      {jobListings.map((job) => (
        <Link to={`/job/${job._id}`}
          key={job._id}
          className="flex flex-row p-6 bg-white rounded-xl border border-gray-300 shadow-md gap-4 sm:gap-6 
                    hover:bg-gray-50 hover:shadow-lg transition-all w-full"
        >
          {/* Company Logo - Stays Centered on Small Screens */}
          <div className="w-16 h-16 bg-gray-100 flex items-start justify-start rounded-full border border-gray-300 mx-auto sm:mx-0">
            <img
              src={job.companyLogo || "default-logo.png"}
              alt="Company Logo"
              className="w-12 h-12 object-contain rounded-full"
            />
          </div>

          {/* Job Details */}
          <div className="flex-1 text-left">
            <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
            <p className="text-gray-600 text-sm">{job.companyName}</p>

            {/* Location & Job Type */}
            <div className="flex flex-col md:flex-row justify-start text-gray-600 text-sm mt-2 gap-2">
              <span className="flex items-center">
                <MapPin size={18} className="mr-1 text-blue-600" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Briefcase size={18} className="mr-1 text-green-600" />
                {job.jobType}
              </span>
            </div>

            {/* Salary */}
            <p className="text-blue-600 font-semibold mt-2 text-sm">
              {job.minPackage} - {job.maxPackage}
            </p>
          </div>

     
          <div className="flex justify-end">
           <div>
           <button
              className={`py-2 px-2 rounded-full ${
                favorites[job._id] ? "bg-red-500 text-white" : ""
              }`}
              onClick={() => handleFavoriteToggle(job._id)}
            >
              <Heart size={20} />
            </button>
           </div>
          </div>
        </Link>
      ))}
    </div>
  )}
</div>


        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Category;