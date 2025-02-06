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
import { Link } from "react-router-dom";
import logo from "../../../../assets/Images/companylogo.jpg";
import ComImg from "../../../../assets/Images/infosys-logo-transparent-free-png.webp";

const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
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
    return <h1 className="text-center text-lg font-semibold">Loading...</h1>;
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

      <div className="min-h-screen lg:ml-64 flex flex-col items-center bg-gradient-to-br from-green-50 to-blue-50 p-8 sm:p-12">
      <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-600 to-green-900 text-black bg-clip-text text-transparent mb-6">My Jobs</h1>
      {jobs.length === 0 ? (
        <h1 className="text-2xl font-semibold text-gray-700">No jobs found.</h1>
      ) : (
        <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
          {jobs.map((job) => (
       

            <div key={job._id} className="border rounded-lg p-6 flex flex-col justify-between items-start hover:shadow-lg transition-shadow bg-white">
      
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
            <BsPersonWorkspace className="w-6 h-6 text-green-500 mr-3" />
            <span className="text-gray-700 font-semibold">{job.workType}</span>
          </div>
          <div className="flex items-center mb-3">
            <FaUserClock className="w-6 h-6 text-green-500 mr-3" />
            <span className="text-gray-700 font-semibold">{job.jobType}</span>
          </div>
          <div className="flex items-center mb-3">
            <GiWallet className="w-6 h-6 text-green-500 mr-3" />
            <span className="text-gray-700 font-semibold">${job.minPackage} - ${job.maxPackage}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <IoLocationOutline className="w-6 h-6 text-green-500 mr-3" />
            <span className="text-gray-700 font-semibold">{job.location}</span>
          </div>
          <div className="flex items-center mb-3">
            <GrUserWorker className="w-6 h-6 text-green-500 mr-3" />
            <span className="text-gray-700 font-semibold">{job.experience}</span>
          </div>
          <div className="flex items-center mb-3">
            <TbCategory className="w-6 h-6 text-green-500 mr-3" />
            <span className="text-gray-700 font-semibold">   {job.category?.title || "Uncategorized"}</span>
          </div>
        </div>
      </div>
       </div>

       <div className="flex justify-between w-full mt-4 space-x-4">
                <button onClick={() => handleViewApplicants(job._id)}
                  className="flex-1 h-10 bg-green-500 text-white rounded-lg text-base font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-green-400">
                  View Applicant
                </button>
                <button onClick={() => setSelectedJob(job._id)}
                  className="flex-1 h-10 bg-red-500 text-white rounded-lg text-base font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-red-400">
                  Delete
                </button>
              </div>
     

    </div>

          ))}
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

    </>
  );
};

export default MyJob;