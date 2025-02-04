import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";

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
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-6">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800">My Jobs</h1>
          {jobs.length === 0 ? (
            <h1 className="text-xl font-semibold text-center text-gray-600">No jobs found.</h1>
          ) : (
            <div className="flex w-full justify-center flex-wrap gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition transform hover:-translate-y-2 w-80 flex flex-col"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                  <p className="text-gray-600"><strong>Company:</strong> {job.companyName}</p>
                  <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
                  <p className="text-gray-600"><strong>Type:</strong> {job.jobType}</p>
                  <p className="text-gray-600"><strong>Skills:</strong> {job.skills?.length > 0 ? job.skills.join(", ") : "N/A"}</p>
                  <p className="text-gray-600"><strong>Openings:</strong> {job.noOfOpeaning}</p>
                  <button
                    onClick={() => setSelectedJob(job._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition shadow-md"
                  >
                    Delete Job
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedJob && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 text-center">
              <h2 className="text-lg font-semibold text-gray-800">Are you sure you want to delete this job?</h2>
              <div className="mt-6 flex justify-center gap-6">
                <button
                  onClick={handleDeleteJob}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition shadow-md"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition shadow-md"
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