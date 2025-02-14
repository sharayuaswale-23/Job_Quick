
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import HostSidebar from "../Hostersidebar/Hostersidebar";
import LineChart from "../LineChart/LineChart";
import { Plus, Loader2 } from "lucide-react";
import Dashboardjob from "../DashboardJob/DashboardJob";
import TotalApplicant from "../TotalApplicant/TotalApplicant";
import PieChart from "../PieChart/PieChart";

const HosterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

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
      const response = await fetch(
        `https://jobquick.onrender.com/job/createdby/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      console.log(result)

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch jobs");
      }

      setJobs(result.success && result.jobs ? result.jobs : []);
      setStats(result.statistics);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <HostSidebar />
      </div>

      {/* Main Content */}
      <div className="p-2 w-full lg:w-[83%] lg:ml-64 sm:p-5">
        <div className="w-full lg:max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row mt-16 lg:mt-2 items-center justify-between gap-4 rounded-xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-700 mb-6">
              Dashboard
            </h1>
            <Link to="/jobposting">
              <button className="bg-green-500 text-white rounded-lg font-semibold px-4 py-3 transition-all shadow-md">
               Post Job
              </button>
            </Link>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Stats & Graph */}
            <div className="lg:col-span-3 space-y-6">
              {/* Statistics Cards */}
                <TotalApplicant stats={stats} />

              {/* Line Chart */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <LineChart jobs={jobs} />
              </div>
            </div>

            {/* Right Column - Pie Chart & Jobs List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pie Chart */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <PieChart jobs={jobs} />
              </div>

              {/* Jobs List */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <Dashboardjob />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HosterDashboard;