import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";
import Hosterheader from "../Hosterheader/Hosterheader";
import Footer from "../../../common/Footer/Footer";
import { Search, User, Bookmark, FileText ,LogOut} from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

  const logout = ()=> {
     Cookies.remove("jwtToken");
     Cookies.remove("userId");
     navigate("/");
  }
  return (
    <>
      {/* <Hosterheader /> */}
      <div className="flex min-h-screen bg-gray-100 relative">
        {/* Sidebar */}
        <div className=" inset-y-0 left-0 shadow-lg z-40">
          <Hostersidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 mt-10 lg:mt-2 p-4 md:p-8 lg:ml-56 ">
          {/* Header */}
          <div className="flex  flex-row justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 p-3">
              
              <span>Home</span>
              <LogOut className="w-5 h-5" />
            </Link> */}

              <Link to="/jobposting" className="bg-green-600 text-white px-1 md:px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">
                          Post a Job
                        </Link>
           
              
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { number: "07", label: "Posted Job", icon: <User /> },
              { number: "03", label: "Shortlisted", icon: <Bookmark /> },
              { number: "1.7k", label: "Application", icon: <Search /> },
              { number: "04", label: "Saved Candidate", icon: <FileText /> },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center"
              >
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
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Posted Jobs</h2>
              <div className="space-y-4">
                {[
                  "Web & Mobile Prototype",
                  "Document Writer",
                  "Outbound Call Service",
                  "Product Designer",
                  "Marketing Specialist",
                ].map((job, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        {job.charAt(0)}
                      </div>
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
     {/* <div className="lg:ml-52">
     <Footer />
     </div> */}
    </>
  );
};

export default Dashboard;