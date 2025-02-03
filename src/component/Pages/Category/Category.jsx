import React, { useState, useEffect } from "react";
import { Heart, MapPin, Briefcase, Search } from "lucide-react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../component/common/header/Header";
import Footer from "../../../component/common/Footer/Footer";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

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
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Job title, skills, or company"
            className="flex-1 p-3 border rounded-lg"
          />
          <button onClick={handleSearch} className="bg-green-700 text-white p-3 rounded-lg flex items-center gap-2 shadow-md hover:bg-green-800">
            <Search size={18} /> Search
          </button>
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
              <p className="text-center">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : jobListings.length === 0 ? (
              <p className="text-center text-gray-500">No jobs found</p>
            ) : (
              <div className="space-y-6">
                {jobListings.map((job) => (
                  <div key={job._id} className="flex items-center p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow relative">
                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full mr-4">
                      <img src={job.companyLogo || "default-logo.png"} alt="Company Logo" className="w-10 h-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-500 text-sm">{job.companyName}</p>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin size={16} className="mr-1" /> {job.location}
                        <Briefcase size={16} className="ml-4 mr-1" /> {job.jobType}
                      </div>
                      <p className="text-blue-500 font-semibold mt-1">${job.minPackage} - ${job.maxPackage} / week</p>
                    </div>
                    <button className="absolute right-5 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart size={24} />
                    </button>
                  </div>
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