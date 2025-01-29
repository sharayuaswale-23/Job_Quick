import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";
import Header from "../../../common/header/Header";
import Footer from "../../../common/Footer/Footer";
import { FiMenu } from "react-icons/fi";
import { Search, User, Bookmark, FileText } from "lucide-react";

const chartData = [
  { name: "Sun", views: 70 },
  { name: "Sat", views: 120 },
  { name: "Mon", views: 60 },
  { name: "Tue", views: 250 },
  { name: "Wed", views: 220 },
  { name: "Thu", views: 230 },
  { name: "Fri", views: 180 },
  { name: "Sat", views: 90 },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100 mt-20 relative ">
        {/* Mobile Sidebar Toggle */}
        <button
          className="md:hidden fixed top-5 left-5 bg-red-600 text-white p-2  z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>

        {/* Sidebar with animation */}
        <div
          className={`fixed pt-24 inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg lg:w-64 w-3/4 z-40 fixed`}
        >
          <Hostersidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative w-full md:w-64">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">
                Post a Job
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[{ number: "07", label: "Posted Job", icon: <User /> },
              { number: "03", label: "Shortlisted", icon: <Bookmark /> },
              { number: "1.7k", label: "Application", icon: <Search /> },
              { number: "04", label: "Saved Candidate", icon: <FileText /> }].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Job Views</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line type="monotone" dataKey="views" stroke="#16a34a" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Posted Jobs */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Posted Jobs</h2>
              <div className="space-y-4">
                {["Web & Mobile Prototype", "Document Writer", "Outbound Call Service", "Product Designer", "Marketing Specialist"].map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">{job.charAt(0)}</div>
                      <div>
                        <div className="font-medium text-gray-800">{job}</div>
                        <div className="text-sm text-gray-500">Full-time · Location</div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">•••</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;