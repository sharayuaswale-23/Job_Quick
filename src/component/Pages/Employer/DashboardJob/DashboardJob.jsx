import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BriefcaseIcon, PlusCircle } from 'lucide-react';
import { Link } from "react-router-dom";

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
    <div className="col-span-full h-48 w-full">
      <div className="h-full w-full flex flex-col items-center justify-center gap-2 lg:gap-6 p-2 md:p-4">
        {/* Icon and Title Section */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <BriefcaseIcon className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No Jobs Posted Yet
          </h3>
        </div>

        {/* Description and CTA Section */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-600 text-center text-sm lg:max-w-md">
            Create your first job posting to start attracting qualified candidates
          </p>
          
          <Link 
            to="/jobposting" 
            className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            Post Job
          </Link>
        </div>
      </div>
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