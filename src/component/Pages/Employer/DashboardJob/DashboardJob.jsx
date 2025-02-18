import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
    <p>No jobs found.</p>
  ) : (
    <div className="w-full max-w-lg">
    
      <div className="h-72 md:h-56 overflow-y-auto scrollbar-hide">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-50 p-2 py-4 rounded-lg flex justify-between shadow-md mb-4"
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