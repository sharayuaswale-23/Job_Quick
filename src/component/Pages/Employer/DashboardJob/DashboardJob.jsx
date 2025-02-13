import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import LineChart from "../LineChart/LineChart";
import PieChart from "../PieChart/PieChart";

const Dashboardjob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [visibleJobs, setVisibleJobs] = useState(6);
  const [expanded, setExpanded] = useState(false);

  const toggleJobs = () => {
    if (expanded) {
      setVisibleJobs(6);
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

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Graph  */}
    <div className="col-span-2 max-h-auto bg-white p-6 rounded-lg shadow-lg">
    <LineChart jobs = {jobs}/>
  </div>
 
 {/* Jobs  */}
 <div className="flex w-full flex-col items-center rounded-lg bg-white p-2">
  <h2 className="text-2xl font-bold text-green-700 p-2 mb-4">Posted Jobs</h2>

  {loading ? (
    <p>Loading jobs...</p>
  ) : jobs.length === 0 ? (
    <p>No jobs found.</p>
  ) : (
    <div className="w-full max-w-lg">
    
      <div className="h-[680px] overflow-y-auto scrollbar-hide">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-50 p-2 py-4 rounded-lg flex justify-between shadow-md mb-4 transition-all duration-300"
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

<div className="col-span-2 max-h-auto bg-white p-6 rounded-lg shadow-lg">
<PieChart jobs = {jobs}/>
  </div>



</div>

  );
};

export default Dashboardjob;