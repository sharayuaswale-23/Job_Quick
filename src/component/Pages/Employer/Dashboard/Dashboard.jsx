import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";
import Hosterheader from "../Hosterheader/Hosterheader";
import Footer from "../../../common/Footer/Footer";
import { Search, User, Bookmark, FileText ,LogOut} from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Dashboardjob from "../DashboardJob/DashboardJob";


// const chartData = [
//   { name: "Sun", views: 70 },
//   { name: "Sat", views: 120 },
//   { name: "Mon", views: 60 },
//   { name: "Tue", views: 250 },
//   { name: "Wed", views: 220 },
//   { name: "Thu", views: 230 },
//   { name: "Fri", views: 180 },
//   { name: "Sat", views: 90 },
// ];

const chartData = [
  { name: "Jan", views: 400 },
  { name: "Feb", views: 600 },
  { name: "Mar", views: 800 },
  { name: "Apr", views: 1200 },
  { name: "May", views: 1500 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = ()=> {
     Cookies.remove("jwtToken");
     Cookies.remove("userId");
     navigate("/");
  }
  return (
    <>

    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Sidebar */}
        <Hostersidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row lg:flex-row mt-16 lg:mt-2 justify-between items-center mb-6">
          <div><h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-600 to-green-900 text-black bg-clip-text text-transparent mb-6">Dashboard</h1></div>
         <div>
         <Link to="/jobposting" className="bg-green-600 text-white px-4 py-4 rounded-lg hover:bg-green-800 transition-all shadow-md">
            Post a Job
          </Link>
         </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[{ number: "07", label: "Posted Job", icon: <User /> },
            { number: "03", label: "Shortlisted", icon: <Bookmark /> },
            { number: "1.7k", label: "Applications", icon: <Search /> },
            { number: "04", label: "Saved Candidates", icon: <FileText /> },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center transform hover:scale-105 transition duration-300">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Posted Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Views</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="views" stroke="#16a34a" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
         
          <Dashboardjob/>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;