import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUserTie,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";

const ShowJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    showJobs(currentPage);
  }, []); // Load first page on mount

  const showJobs = async (page) => {
    const userId = Cookies.get("userNewId");
    const userToken = Cookies.get("userToken");

    const userJobs = `https://jobquick.onrender.com/applicants?applicantId=${userId}&page=${page}&limit=2`;
    setIsLoading(true);

    try {
      const response = await fetch(userJobs, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      // Extract job details and update pagination state
      if (result.success && Array.isArray(result.applicants)) {
        const jobDetails = result.applicants.map((application) => application.jobId);
        
        // Append new jobs to existing ones if loading more
        if (page > 1) {
          setJobs((prevJobs) => [...prevJobs, ...jobDetails]);
        } else {
          setJobs(jobDetails);
        }
        
        // Update pagination state
        setHasNextPage(result.pagination.hasNextPage);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    showJobs(nextPage);
  };

  return (
    <>
      
      <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
          Jobs you've applied to
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-gray-50 p-4 rounded-lg transform transition-all duration-300 hover:shadow-md hover:scale-102"
            >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {job.title}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                        <span className="font-medium">Company:</span> {job.companyName}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Location:</span> {job.location}
                      </p>
            </div>
          ))):(
            <div className="col-span-full flex flex-col items-center justify-center py-10 bg-gray-50 rounded-lg">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-12 w-12 text-gray-400 mb-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-700 mb-1">No Applications Yet</h3>
      <p className="text-gray-500 text-center">You haven't applied to any jobs yet. Start your job search today!</p>
    </div>
          )}
        </div>

        {hasNextPage && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
            >
              <span className="relative z-10 inline-block transition-transform duration-300">
                {isLoading ? "Loading..." : "Load More Jobs"}
              </span>
   
            </button>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center mt-4">
            Error: {error}
          </div>
        )}
      </div>
    </>
  );
};

export default ShowJobs;