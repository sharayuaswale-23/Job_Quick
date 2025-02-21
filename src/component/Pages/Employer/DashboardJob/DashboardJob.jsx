import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { XCircle } from 'lucide-react';

const Dashboardjob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [expanded, setExpanded] = useState(false);

  const toggleJobs = () => {
    if (expanded) {
      setVisibleJobs(3);
    } else {
      setVisibleJobs(jobs.length);
    }
    setExpanded(!expanded);
  };


  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("jwtToken");

    if (!userId || !token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://jobquick.onrender.com/job/createdby/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch jobs");
      }

      setJobs(result.success && result.jobs ? result.jobs : []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleViewApplicants = async (jobId) => {
    navigate(`/job/${jobId}/applicants`);
  };
  return (
<>
<div className="flex w-full flex-col items-center rounded-lg bg-white p-4">
  <h2 className="text-2xl font-bold text-green-700 p-2 mb-4">Posted Jobs</h2>

  { jobs.length === 0 ? (
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
      <h3 className="text-lg font-medium text-gray-700 mb-1">No Jobs Posted Yet</h3>
      <p className="text-gray-500 text-center">You haven't posted any job listings yet. Create your first job posting to start attracting qualified candidates.</p>
    </div>
  ) : (
    <div className="w-full  lg:max-w-lg">
    
      <div className="h-96 lg:h-48 w-full overflow-y-auto scrollbar-hide">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-50 w-full p-2 py-4 rounded-lg flex justify-between shadow-md mb-4"
          >
            <div className="flex">
              <div className="w-12 h-12 bg-gray-300 text-gray-700 font-semibold flex items-center justify-center rounded-lg text-xl uppercase">
                {job.title.charAt(0)}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">{job.title}</h3>
                <p className="text-gray-500">
                  • {job.jobType} &nbsp;• {job.location}
                </p>
              </div>
            </div>
            <AiOutlineUser
              onClick={() => handleViewApplicants(job._id)}
              className="text-gray-500 text-xl cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  )}
</div>
</>



  );
};

export default Dashboardjob;