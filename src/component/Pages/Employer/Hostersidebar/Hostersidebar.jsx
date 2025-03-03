import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Profile from "../../../../assets/Images/profile1.webp";
import {
  LogOut,
  User,
  Briefcase,
  FileText,
  Bookmark,
  Users,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hostersidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoster, setHoster] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

  const logout = ()=> {
     Cookies.remove("jwtToken");
     Cookies.remove("userId");
     navigate("/");
  }
  
    const HostId = Cookies.get("userId");
    const HostToken = Cookies.get("jwtToken");
    const hostProfileApi = `https://jobquick.onrender.com/hostuser/${HostId}`;
  
    useEffect(() => {
      const fetchHostProfile = async () => {
        try {
          const response = await fetch(hostProfileApi, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${HostToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          setHoster(data);
        } catch (error) {
          console.error("Error fetching host profile:", error);
          setError("Failed to load hoster details.");
        }
      };
  
      fetchHostProfile();
    }, [hostProfileApi, HostToken]);
  
    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      );
    }
  
    if (!hoster) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          {/* <p className="text-gray-600 text-lg">Loading hoster details...</p> */}
        </div>
      );
    }

  
  return (
 
    <div>
   
    <button
      className="lg:hidden fixed top-4 left-4 bg-green-500 text-white p-2 rounded-md shadow-lg z-50"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Menu className="w-6 h-6" />
    </button>
    
  
    <div
      className={`fixed bottom-0 inset-y-0 left-0 bg-white shadow-xl transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 z-40 w-64`}
    >
      <div className="p-6 flex flex-col min-h-screen border-r border-gray-200">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-md">
            <img
              src={Profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mt-4">{hoster.fullName || "Admin"}</h1>
          <p className="text-sm text-gray-500 mt-1">{hoster.phoneNumber}</p>
          <a href="" className="text-sm text-gray-500 mt-1">{hoster.email}</a>
        </div>

    
        <nav className="flex-1 space-y-2">
          {[{
            to: "/",
            icon: <Bookmark className="w-5 h-5" />,
            label: "Home"
          },{
            to: "/dashboard",
            icon: <Users className="w-5 h-5" />,
            label: "Dashboard"
          }, {
            to: "/hosterprofile",
            icon: <Users className="w-5 h-5" />,
            label: "My Profile"
          }, {
            to: "/myjob",
            icon: <Briefcase className="w-5 h-5" />,
            label: "My Jobs"
          }].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-green-600 hover:text-white transition-all"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>

          ))}

        </nav>

       
        <div className="fixed bottom-10">
          <button onClick={logout} className="flex items-center space-x-2 text-gray-600 hover:text-red-600 p-3">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Hostersidebar;