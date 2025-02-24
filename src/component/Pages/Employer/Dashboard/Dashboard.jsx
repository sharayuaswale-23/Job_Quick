
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import HostSidebar from "../Hostersidebar/Hostersidebar";
import LineChart from "../LineChart/LineChart";
import { Plus, Loader2 } from "lucide-react";
import Dashboardjob from "../DashboardJob/DashboardJob";
import TotalApplicant from "../TotalApplicant/TotalApplicant";
import PieChart from "../PieChart/PieChart";
import Table from "../Table/Table";

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

  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <div className="w-1/4 h-screen fixed top-0 left-0">
          <HostSidebar />
        </div>
        <div className="w-full lg:pl-60 transition-all duration-300 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <div className="w-1/4 h-screen fixed top-0 left-0">
          <HostSidebar />
        </div>
        <div className="w-full lg:pl-60 transition-all duration-300 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
    {/* Sidebar - Hidden on mobile, visible on larger screens */}
    <div className="w-1/4 h-screen fixed top-0 left-0">
      <HostSidebar />
    </div>
  
    {/* Main Content */}
    <div className="w-full lg:pl-60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 lg:mt-2 sm:mt-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-700">
            Dashboard
          </h1>
          <Link to="/jobposting">
            <button className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg font-semibold px-4 py-3 transition-all shadow-md hover:shadow-lg">
              Post Job
            </button>
          </Link>
        </div>

        <div>
              <TotalApplicant stats={stats} />
            </div>
  
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
         {/* Statistics Cards */}
        
          {/* Left Column - Stats & Graph */}
          <div className="w-full lg:w-[55%] space-y-6">
            
            {/* Line Chart */}
            <div>
                <LineChart jobs={jobs} />
            </div>
          </div>
  
          {/* Right Column - Pie Chart & Jobs List */}
          <div className="w-full lg:w-[45%] space-y-6">
           {/* Jobs List */}
           <div>
              <Dashboardjob />
            </div>
            {/* Pie Chart */}
            <div className="overflow-x-scroll scrollbar-hide">          
                <PieChart jobs={jobs} />
              </div>
          </div>
        </div>
  
        {/* Table Section */}
        <div>
            <Table />
        </div>
      </div>
    </div>
  </div>
  );
};

export default HosterDashboard;