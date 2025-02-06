import React, { useState, useEffect } from "react";
import { Search, BriefcaseBusiness, MapPin, Clock, Wallet, Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import searchimg from "../../../assets/Images/Search.webp";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";

const JobFilters = ({ filters, onFilterChange, categories, isLoading, onApplyFilters }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      {/* Categories */}
      <div className="mb-6">
        <label className="text-xl font-bold text-gray-800 mb-2">Categories</label>
        <select
          value={filters.categories}
          onChange={(e) => onFilterChange("categories", e.target.value)}
          className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option value="IT & Networking">IT & Networking</option>
          <option value="Sales & Marketing">Sales & Marketing</option>
          <option value="Data Science">Data Science</option>
          <option value="Customer Service">Customer Service</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Human Resource">Human Resource</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Accounting">Accounting</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <label className="text-xl font-bold text-gray-800 mb-2">Experience Level</label>
        <select
          value={filters.experience}
          onChange={(e) => onFilterChange("experience", e.target.value)}
          className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Experience Levels</option>
          <option value="fresher">Fresher</option>
          <option value="1 to 3 years">1-3 years</option>
          <option value="3 to 5 years">3-5 years</option>
          <option value="more than 5 years">More than 5 years</option>
        </select>
      </div>

      {/* Job Type (Radio Buttons) */}
      <div className="mb-6">
        <label className="text-xl font-bold text-gray-800 mb-2">Job Type</label>
        <div className="flex flex-col space-y-2 mt-2">
          {["Full-Time", "Part-Time"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="jobType"
                value={type}
                checked={filters.jobType === type}
                onChange={(e) => onFilterChange("jobType", e.target.value)}
                className="h-4 w-4 text-blue-500 focus:ring-blue-300"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Work Type (Radio Buttons) */}
      <div className="mb-6">
        <label className="text-xl font-bold text-gray-800 mb-2">Work Type</label>
        <div className="flex flex-col space-y-2 mt-2">
          {["Remote", "OnSite", "Hybrid"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="workType"
                value={type}
                checked={filters.workType === type}
                onChange={(e) => onFilterChange("workType", e.target.value)}
                className="h-4 w-4 text-blue-500 focus:ring-blue-300"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={onApplyFilters}
        className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md font-medium hover:opacity-90 transition-opacity shadow-md"
      >
        Apply Filters
      </button>
    </div>
  );
};

const JobCard = ({ job }) => {
  return (
    <div className="w-full mx-auto border rounded-2xl p-6 flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow transform hover:scale-[1.02]">
      {/* Company Info */}
      <div className="flex flex-col md:flex-row md:items-center w-full mb-5">
        <img
          src={job.profileImg}
          alt={`${job.companyName} logo`}
          className="w-16 h-16 object-cover mb-4 md:mb-0 md:mr-4 rounded-full"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-semibold text-xl text-gray-800">{job.title}</h3>
          <p className="text-gray-600 font-medium">{job.companyName}</p>
          <span className="text-gray-500 text-sm">
            {new Date(job.dateCreated).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 mb-5 font-medium">
        <JobDetail icon={<BriefcaseBusiness />} label={job.category?.title || "Uncategorized"} />
        {/* <JobDetail icon={<Clock />} label={job.jobType} /> */}
        <JobDetail icon={<Wallet />} label={`$${job.minPackage} - $${job.maxPackage}`} />
        <JobDetail icon={<MapPin />} label={job.location} />
        <JobDetail icon={<BriefcaseBusiness />} label={job.experience} />
        <JobDetail icon={<BriefcaseBusiness />} label={job.workType} />
      </div>

      {/* View Job Button */}
      <button
        onClick={() => (window.location.href = `/job/${job._id}`)}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-md font-semibold hover:opacity-90 transition-opacity shadow-md"
      >
        View Job Details
      </button>
    </div>
  );
};

const JobDetail = ({ icon, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-blue-500">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6); // Number of jobs to display per page

  const [filters, setFilters] = useState({
    categories: "",
    title: "",
    jobType: "",
    workType: "",
    experience: "",
    limit: 100,
  });

  const [pendingFilters, setPendingFilters] = useState(filters);

  const JobToken = Cookies.get("userToken");
  const userId = Cookies.get("userNewId");

  const isAuthenticated = () => {
    return !!JobToken && !!userId;
  };

  const buildFilterUrl = () => {
    const queryParams = new URLSearchParams();
    Object.entries(pendingFilters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    return `https://jobquick.onrender.com/job/filter?${queryParams.toString()}`;
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      if (!isAuthenticated()) return;

      setIsLoading(true);
      try {
        const response = await fetch("https://jobquick.onrender.com/categories", {
          headers: {
            Authorization: `Bearer ${JobToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data.categories || data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [JobToken]);

  // Fetch jobs
  const fetchJobs = async () => {
    if (!isAuthenticated()) return;

    setIsLoading(true);
    try {
      const response = await fetch(buildFilterUrl(), {
        headers: {
          Authorization: `Bearer ${JobToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setJobListings(data.jobs || data.data || []);
      setTotalJobs(data.totalJobs || 0);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setPendingFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setFilters(pendingFilters);
    setCurrentPage(1); // Reset to the first page when filters are applied
    fetchJobs();
  };

  // Initial fetch
  useEffect(() => {
    fetchJobs();
  }, []);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />

      <div className="mt-24 mx-4 bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="w-full md:w-[65%] flex flex-col items-center md:items-start gap-3 p-2">
          <div className="w-full mb-4 flex flex-col justify-center items-center md:items-start">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h2>
            <p className="text-gray-700 text-md">Search for jobs by title to start your career journey.</p>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              value={pendingFilters.title}
              onChange={(e) => handleFilterChange("title", e.target.value)}
              placeholder="Job title"
              className="flex-1 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              onClick={handleApplyFilters}
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

      <div className="mx-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <div className="relative">
            <button
              className="lg:hidden bg-gradient-to-r from-pink-500 to-blue-500 text-white p-2 rounded-md fixed top-4 left-4 z-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div
              className={`fixed top-0 left-0 h-full overflow-y-auto bg-gray-50 shadow-lg p-4 transform transition-transform duration-300 z-40 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } lg:relative lg:translate-x-0 lg:w-64 flex-shrink-0`}
            >
              <JobFilters
                filters={pendingFilters}
                onFilterChange={handleFilterChange}
                categories={categories}
                isLoading={isLoading}
                onApplyFilters={handleApplyFilters}
              />
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1 rounded-lg bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="border rounded-lg p-4 animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">
                <p className="text-xl font-semibold mb-2">Error</p>
                <p>{error}</p>
              </div>
            ) : jobListings.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                <p className="text-xl font-semibold mb-2">No jobs found</p>
                <p className="text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6">
                  {currentJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-gray-700">
                    Page {currentPage} of {Math.ceil(jobListings.length / jobsPerPage)}
                  </span>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(jobListings.length / jobsPerPage)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Category;
