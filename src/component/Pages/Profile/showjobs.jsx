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
          {jobs.map((job) => (
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
          ))}
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
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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