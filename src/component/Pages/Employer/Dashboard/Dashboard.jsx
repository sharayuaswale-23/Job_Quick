import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Dashboardjob from "../DashboardJob/DashboardJob";
import TotalApplicant from "../TotalApplicant/TotalApplicant";


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
    
        <Hostersidebar />
      
  
      <div className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
    
        <div className="flex flex-col md:flex-row lg:flex-row mt-16 lg:mt-2 justify-between items-center lg:mb-6 mb-10">
          <div><h1 className="text-5xl text-center font-extrabold text-green-700 mb-6">Dashboard</h1></div>
         <div>
         <Link to="/jobposting" className="bg-green-500 text-white rounded-lg font-semibold px-4 py-3 transition-all shadow-md">
            Post a Job
          </Link>
         </div>
        </div>

      
       
        <TotalApplicant/>
     
        <Dashboardjob/>
      </div>
    </div>
    </>
  );
};

export default Dashboard;