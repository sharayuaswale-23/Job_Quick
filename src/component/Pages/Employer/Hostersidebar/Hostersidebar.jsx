import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  LogOut,
  User,
  Briefcase,
  MessageSquare,
  FileText,
  Bookmark,
  Users,
} from "lucide-react";

function Hostersidebar() {
  const [hoster, setHoster] = useState(null);
  const [error, setError] = useState(null);

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
        <p className="text-gray-600 text-lg">Loading hoster details...</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white p-6 flex flex-col shadow-sm">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-md">
          <img
            src={hoster.profileImage || "https://tse3.mm.bing.net/th?id=OIP.tlqnziQxJqVPudFX75jFpgAAAA&pid=Api&P=0&h=180"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mt-4">
          {hoster.fullName}
        </h1>
        <p className="text-sm text-gray-600 mt-1">{hoster.phoneNumber}</p>
        <a
          href={hoster.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline mt-1"
        >
          {hoster.companyUrl}
        </a>
         <div className="mt-2 flex justify-center">
                    <Link
                      to="/hosterdetail"
                      className="w-full md:w-auto text-center font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-xl text-white py-2 px-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Edit Profile
                    </Link>
                  </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <div className="space-y-1">
          <button className="flex w-full items-center space-x-3 p-3 hover:bg-green-700 hover:text-white text-gray-600 rounded-lg">
            <Users className="w-5 h-5" />
            <Link to="/dashboard">Dashboard</Link>
          </button>
          <button className="flex w-full items-center space-x-3 p-3 hover:bg-green-700 hover:text-white text-gray-600 rounded-lg cursor-pointer">
            <Briefcase className="w-5 h-5" />
            <Link to="/hosterprofile">Profile</Link>
          </button>


          <button className="flex w-full items-center space-x-3 p-3 hover:bg-green-700 hover:text-white text-gray-600 rounded-lg cursor-pointer">
            <Briefcase className="w-5 h-5" />
            <Link>My Jobs</Link>
          </button>

          <button className="flex w-full items-center space-x-3 p-3 hover:bg-green-700 hover:text-white text-gray-600 rounded-lg cursor-pointer">
            <FileText className="w-5 h-5" />
            <Link>Submit Job</Link>
          </button>

          <button className="flex w-full items-center space-x-3 p-3 hover:bg-green-700 hover:text-white text-gray-600 rounded-lg cursor-pointer">
            <Bookmark className="w-5 h-5" />
            <Link>Save Candidate</Link>
          </button>
        </div>
      </nav>

      {/* Logout Section */}
      <div className="mt-auto">
        <div className="flex items-center space-x-2 text-gray-600 cursor-pointer">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Hostersidebar;
