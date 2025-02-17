import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import searchimg from "../../../assets/Images/Search.webp";
import JobFilters from "./Filter";
import JobCard from "./JobCard";

const Category = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTitle = queryParams.get("title") || "";
  const initialCategory = queryParams.get("categories") || "";

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyNames, setCompanyNames] = useState([])
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const totalPages = Math.ceil(jobListings.length / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);

  const [filters, setFilters] = useState({
    categories: initialCategory,
    title: initialTitle,
    jobType: "",
    workType: "",
    experience: "",
    companyName :"",
    subcategories: "", // Subcategories filter
    limit: 100,
  });

  const [searchInput, setSearchInput] = useState(initialTitle);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");


    
  const topCompanies = [
    "TCS", "Infosys", "Wipro", 
    "Google", "Microsoft", "Amazon","GrowthHub Inc." 
  ];

  const JobToken = Cookies.get("userToken");
  const userId = Cookies.get("userNewId");

  const isAuthenticated = () => {
    return !!JobToken && !!userId;
  };

  const buildFilterUrl = () => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
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
          headers: { Authorization: `Bearer ${JobToken}` },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setCategories(data.categories || data.data || []);
        console.log(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, [JobToken]);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchJobs();
    }
  }, [filters]); 

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
      console.log(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    const selectedCat = categories.find((cat) => cat._id === categoryId);
    setSelectedCategory(selectedCat);
    setSelectedSubcategory("");
    handleFilterChange("categories", selectedCat.title);
    handleFilterChange("subcategories", ""); // Reset subcategory filter
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    handleFilterChange("subcategories", subcategory); // Update subcategory filter
  };
  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
    setFilters((prev) => ({ ...prev, companyName: company }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      title: searchInput,
    }));


 
  };

  return (
    <>
      <Header />
      <div className="mt-24 mx-4 bg-gradient-to-b from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="w-full md:w-[65%] flex flex-col items-center md:items-start gap-3 p-2">
          <div className="w-full mb-4 flex flex-col justify-center items-center md:items-start">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h2>
            <p className="text-gray-700 text-md">Search for jobs by title to start your career journey.</p>
          </div>

          <form className="w-full flex flex-col md:flex-row items-center gap-4" onSubmit={handleSearch}>
  <div className="w-full flex flex-col sm:flex-row gap-4 bg-white rounded-lg p-2">
    <input
      type="text"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      placeholder="Job title"
      className="flex-1 p-3 border-r sm:border-r border-gray-200 outline-none w-full"
    />
    <select
      className="p-3 border-none outline-none rounded-lg w-full sm:w-auto"
      value={selectedCompany}
      onChange={(e) => handleCompanyChange(e.target.value)}
    >
      <option value="">Select Company</option>
      {topCompanies.map((company) => (
        <option key={company} value={company}>{company}</option>
      ))}
      {companyNames.map((company) => (
        <option key={company} value={company}>{company}</option>
      ))}
    </select>
  </div>
  <button 
    type="submit" 
    className="w-full md:w-auto bg-blue-700 text-white px-5 py-3 rounded-lg flex justify-center items-center gap-2 shadow-md hover:bg-blue-800 transition-colors"
  >
    <Search size={20} /> Search
  </button>
</form>
        </div>

        <div className="w-[35%] hidden md:flex justify-center p-2 rounded-lg">
          <img src={searchimg} alt="Job Search Illustration" className="max-w-full h-auto" />
        </div>
      </div>

      <div className="min-h-screen bg-gray">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col">
            <div className="flex gap-4">
              <div className="mb-11">
                <button
                  className="p-1 m-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg lg:hidden flex items-center gap-2 shadow-md hover:opacity-90 transition-all fixed top-20 left-4 z-30"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <>
                      <X size={20} opacity={0.2} color="black" />
                    </>
                  ) : (
                    <>
                      <Filter size={20} /> Filter
                    </>
                  )}
                </button>

                <div
                  className={`fixed top-16 md:20 lg:top-0 left-0 h-full w-80 lg:m-4 transition-transform duration-300 ease-in-out transform rounded-lg border bg-white shadow-lg 
                  ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                  lg:relative lg:translate-x-0 lg:w-90 lg:flex-shrink-0 z-20`}
                >
                  <JobFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    categories={categories}
                    isLoading={isLoading}
                    selectedCategory={selectedCategory}
                    selectedSubcategory={selectedSubcategory}
                    handleCategoryChange={handleCategoryChange}
                    handleSubcategoryChange={handleSubcategoryChange}
                  />
                </div>

                {isOpen && (
                  <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsOpen(false)}
                  ></div>
                )}
              </div>

              <div className="flex-1 px-4 sm:px-6 lg:px-8 mb-6">
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
                  <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold mb-2">Error</p>
                    <p>{error}</p>
                  </div>
                ) : jobListings.length === 0 ? (
                  <div className="text-gray-500 text-center py-2">
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
      <Footer />
    </>
  );
};

export default Category;