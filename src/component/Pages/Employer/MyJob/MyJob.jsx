import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";
import { TbCategory } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import logo from "../../../../assets/Images/companylogo.jpg";

const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

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

    const apiUrl = `https://jobquick.onrender.com/job/createdby/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs. Status: ${response.status}, Message: ${result.message || "Unknown error"}`
        );
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

  const handleDeleteJob = async () => {
    if (!selectedJob) return;
    const token = Cookies.get("jwtToken");

    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    const deleteUrl = `https://jobquick.onrender.com/job/${selectedJob}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to delete job. Status: ${response.status}, Message: ${result.message || "Unknown error"}`);
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== selectedJob));
      setSelectedJob(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    // return <h1 className="text-center text-lg font-semibold">Loading...</h1>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h1 className="text-red-500 text-lg font-semibold">Error: {error}</h1>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-2 rounded mt-4 hover:bg-red-600 transition shadow-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Hostersidebar />

    
    <div className="min-h-screen pt-20 lg:pt-4 lg:ml-64 bg-gradient-to-br from-green-50 to-blue-50 py-12 px-2 sm:px-6 lg:px-8">
    
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-200 px-6 py-5 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              
              Posted Jobs
            </h2>
          </div>

          <div className="p-4 md:p-6">
            {jobs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-500">No jobs found</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job) => {
                  const isExpanded = expandedId === job?._id;

                  return (
                    <div
                      key={job?._id}
                      className={`bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-4 md:p-6 ${
                        isExpanded ? "h-auto" : "h-fit"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full">
                            <img src={logo} className="w-12 h-12" />
                          </div>
                          <div className="w-full">
                            <p className="font-semibold text-gray-900 text-lg">
                            
                            {job.companyName}
                            </p>
                            <p className="text-sm text-gray-500 truncate max-w-full overflow-hidden whitespace-nowrap">
                            {new Date(job.dateCreated).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium text-gray-900">
                           {job.title}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setExpandedId(isExpanded ? null : job?._id)
                          }
                          className="mt-4 text-green-600 font-semibold cursor-pointer"
                        >
                          {isExpanded ? "View Less" : "View More"}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                              <div className="flex items-center gap-3">
                                <BsPersonWorkspace className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="text-xs text-gray-500">Work Type</p>
                                  <p className="font-medium text-gray-900">{job.workType}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <FaUserClock className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="text-sm text-gray-500">Job Type</p>
                                  <p className="font-medium text-gray-900">{job.jobType}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <GiWallet className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="text-sm text-gray-500">Package</p>
                                  <p className="font-medium text-gray-900">
                                    ${job.minPackage} - ${job.maxPackage}
                                  </p>
                                </div>
                              </div>
                              
                          
                              <div className="flex items-center gap-3">
                                <IoLocationOutline className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="text-sm text-gray-500">Location</p>
                                  <p className="font-medium text-gray-900">{job.location}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <GrUserWorker className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="text-sm text-gray-500">Experience</p>
                                  <p className="font-medium text-gray-900">{job.experience}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <TbCategory className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="text-sm text-gray-500">Category</p>
                                  <p className="font-medium text-gray-900">{job.category?.title || "Uncategorized"}</p>
                                </div>
                              </div>
                            </div>

                        )}

                      
                        <div className="flex justify-between w-full mt-4 space-x-4">
                        <button onClick={() => handleViewApplicants(job._id)}
                          className="flex-1 h-10 border border-green-500 bg-transparent text-black rounded-lg text-base font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 hover:bg-green-400">
                          Applicants
                        </button>
                        <button onClick={() => setSelectedJob(job._id)}
                          className="flex-1 h-10 border border-red-500 text-black rounded-lg text-base font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 hover:bg-red-400">
                          Delete
                        </button>
                      </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-900">Are you sure you want to delete this job?</h2>
            <div className="mt-6 flex justify-center gap-6">
              <button
                onClick={handleDeleteJob}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedJob(null)}
                className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition shadow-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>


    </>
  );
};

export default MyJob;

