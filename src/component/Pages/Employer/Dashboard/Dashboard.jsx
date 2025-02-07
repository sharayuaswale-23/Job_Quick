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
import TotalApplicant from "../TotalApplicant/TotalApplicant";


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
        <div className="flex flex-col md:flex-row lg:flex-row mt-16 lg:mt-2 justify-between items-center lg:mb-6 mb-10">
          <div><h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-600 to-green-900 text-black bg-clip-text text-transparent mb-6">Dashboard</h1></div>
         <div>
         <Link to="/jobposting" className="bg-green-600 text-white px-4 py-4 rounded-lg hover:bg-green-800 transition-all shadow-md">
            Post a Job
          </Link>
         </div>
        </div>

        {/* Stats Grid */}
       
        <TotalApplicant/>
     

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