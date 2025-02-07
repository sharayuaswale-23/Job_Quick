import React, { useState, useEffect } from "react";
import {Search, Menu, X} from "lucide-react";
import { TbCategory } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserClock } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import searchimg from "../../../assets/Images/Search.webp";
import logo from "../../../assets/Images/companylogo.jpg"



const JobFilters = ({filters, onFilterChange, categories, isLoading, onApplyFilters}) => {

  return (
    
    <div className="sticky top-0 border rounded-lg px-3 py-4  bg-white shadow-lg w-90">
    
      
      <div className="mb-6">
        <label className="text-xl text-black mb-6">
          Categories
        </label>
        <select
          value={filters.categories}
          onChange={(e) => onFilterChange("categories", e.target.value)}
          className="mt-5 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
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


      <div className="mb-6">
        <label className="text-xl text-black mb-6">
          Experience Level
        </label>
        <select
          value={filters.experience}
          onChange={(e) => onFilterChange("experience", e.target.value)}
          className="mt-5 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        >
          <option value="">All Experience Levels</option>
          <option value="fresher">Fresher</option>
          <option value="1 to 3 years">1-3 years</option>
          <option value="3 to 5 years">3-5 years</option>
          <option value="more than 5 years">More than 5 years</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="text-xl text-black mb-6">
          Job Type
        </label>
        <div className="mt-5 flex flex-col space-y-3">
          {["Full-Time", "Part-Time"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="jobType"
                value={type}
                checked={filters.jobType === type}
                onChange={(e) => onFilterChange("jobType", e.target.value)}
                className="form-radio text-pink-500"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xl text-black mb-6">
          Work Type
        </label>
        <div className="mt-5 flex flex-col space-y-3">
          {["Remote", "OnSite", "Hybrid"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="workType"
                value={type}
                checked={filters.workType === type}
                onChange={(e) => onFilterChange("workType", e.target.value)}
                className="form-radio text-pink-500"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={onApplyFilters}
        className="w-full h-12 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-md font-medium hover:opacity-90 transition-opacity"
      >
        Apply Filters
      </button>
    </div>
  
  );
};

const JobCard = ({ job }) => {

  return (

    <div className="border rounded-lg p-6 flex flex-col justify-between items-start hover:shadow-lg transition-shadow bg-white">
      
      <div className="flex w-full mb-4">
        <img
          src={logo}
          alt={`${job.companyName} logo`}
          className="w-24 h-24 rounded-lg object-cover mr-4"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">
            {job.title}
          </h3>
          <p className="text-gray-500 font-semibold mb-1">{job.companyName}</p>
          <span className="text-gray-500 font-semibold">
            {new Date(job.dateCreated).toLocaleDateString()}
          </span>
        </div>
      </div>
 
       <div className="bg-white w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
    
        <div>
          <div className="flex items-center mb-3">
            <TbCategory className="w-6 h-6 text-blue-500 mr-3" />
            <span className="text-gray-700 font-semibold">   {job.category?.title || "Uncategorized"}</span>
          </div>
          <div className="flex items-center mb-3">
            <FaUserClock className="w-6 h-6 text-blue-500 mr-3" />
            <span className="text-gray-700 font-semibold">{job.jobType}</span>
          </div>
          <div className="flex items-center mb-3">
            <GiWallet className="w-6 h-6 text-blue-500 mr-3" />
            <span className="text-gray-700 font-semibold">${job.minPackage} - ${job.maxPackage}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <IoLocationOutline className="w-6 h-6 text-blue-500 mr-3" />
            <span className="text-gray-700 font-semibold">{job.location}</span>
          </div>
          <div className="flex items-center mb-3">
            <GrUserWorker className="w-6 h-6 text-blue-500 mr-3" />
            <span className="text-gray-700 font-semibold">{job.experience}</span>
          </div>
          <div className="flex items-center mb-3">
            <BsPersonWorkspace className="w-6 h-6 text-blue-500 mr-3" />
            <span className="text-gray-700 font-semibold">{job.workType}</span>
          </div>
        </div>
      </div>
       </div>


      <Link to={`/job/${job._id}`} className="block w-full">
          <button
            className="mt-4 w-60 h-10 bg-blue-500  text-white rounded-lg text-base font-semibold shadow-md  hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400  sm:h-12 md:h-14 lg:h-12">
              View Job Details
          </button>
      </Link>

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
  const jobsPerPage = 5;
  const totalPages = Math.ceil(jobListings.length / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);
  
  
  const [filters, setFilters] = useState({
    categories: "",
    title: "",
    jobType: "",
    workType: "",
    experience: "",
    limit: 100
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
    setPendingFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    setFilters(pendingFilters);
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);


  return (

    <>
    <Header/>
     
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

    <div className="min-h-screen bg-gray">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">

          <div className="flex gap-6">

            <div>

              <button
                className="p-2  bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-lg lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                Filter
              </button>

              <div
                className={`fixed top-14 lg:top-0 left-0 h-full w-80 p-4 transition-transform duration-300 ease-in-out transform 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:relative lg:translate-x-0 lg:w-90 lg:flex-shrink-0`}
              >
                <JobFilters
                  filters={pendingFilters}
                  onFilterChange={handleFilterChange}
                  categories={categories}
                  isLoading={isLoading}
                  onApplyFilters={handleApplyFilters}
                />
              </div>

              {isOpen && (
                <div

                className="lg:hidden fixed top-4 right-4 p-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg hover:opacity-90 transition-all"
                ></div>
              )}
            </div>


            <div className="flex-1 px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
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
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
                          {currentJobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                          ))}
                        </div>
                        <div className="flex justify-between mt-6 space-x-4">
                          <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                          >
                            Previous
                          </button>
                          <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
                          <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                          >
                            Next
                          </button>
                        </div>
                      </>
                    )}
              </div>
          </div>

        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Category;