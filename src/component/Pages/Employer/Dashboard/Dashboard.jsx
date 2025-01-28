import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import myimg from "../../../../assets/Images/Profile.jpg";
import { Link } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";
import Header from "../../../common/header/Header";
import Footer from "../../../common/Footer/Footer";
import {
  Bell,
  Search,
  LogOut,
  Settings,
  User,
  Briefcase,
  MessageSquare,
  FileText,
  Bookmark,
  Users,
  Circle,
} from "lucide-react";

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
  return (
    <>
    <div className="flex min-h-screen bg-gray-100 mt-20">
    <Header/>
      {/* Sidebar */}
     
<Hostersidebar/>
      {/* Main Content */}
      <div className="flex-1 p-8 ">
      
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">
              Post a Job
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            {
              number: "07",
              label: "Posted Job",
              icon: <User className="w-6 h-6 text-green-600" />,
            },
            {
              number: "03",
              label: "Shortlisted",
              icon: <Bookmark className="w-6 h-6 text-green-600" />,
            },
            {
              number: "1.7k",
              label: "Application",
              icon: <Search className="w-6 h-6 text-green-600" />,
            },
            {
              number: "04",
              label: "Save Candidate",
              icon: <FileText className="w-6 h-6 text-green-600" />,
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stat.number}
                  </div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Jobs Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Job Views Chart */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Job Views</h2>
              <div className="flex space-x-4 mt-4">
                <div className="flex space-x-2">
                  {["1h", "Day", "Week", "Month", "Year"].map((period) => (
                    <button
                      key={period}
                      className={`px-4 py-2 rounded-lg ${
                        period === "Day"
                          ? "bg-green-700 text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Posted Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Posted Job
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Web & Mobile Prototype",
                  type: "Fulltime",
                  location: "Spain",
                  logo: "A",
                },
                {
                  title: "Document Writer",
                  type: "Part-time",
                  location: "Italy",
                  logo: "B",
                },
                {
                  title: "Outbound Call Service",
                  type: "Fulltime",
                  location: "USA",
                  logo: "C",
                },
                {
                  title: "Product Designer",
                  type: "Part-time",
                  location: "Dubai",
                  logo: "D",
                },
                {
                  title: "Marketing Specialist",
                  type: "Part-time",
                  location: "UK",
                  logo: "E",
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      {job.logo}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {job.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.type} · {job.location}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    •••
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
     
    </div>
    <Footer/>
    </>
  );
};

export default Dashboard;
