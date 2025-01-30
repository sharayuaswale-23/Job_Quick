import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";
import Header from "../../../common/header/Header";
import Footer from "../../../common/Footer/Footer";

const HosterProfile = () => {
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
    <>

   <Header />
    <div className="flex min-h-screen bg-gray-100 mt-20 relative">
     {/* Sidebar */}
     <div className=" inset-y-0 left-0 shadow-lg z-40">
          <Hostersidebar />
        </div>

      <div className="flex-1 mt-10 lg:mt-2 p-4 md:p-8 lg:ml-56 ">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
              <img
                src={hoster.profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              {hoster.fullName}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">City</p>
              <p className="text-lg font-medium text-gray-800">{hoster.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">State</p>
              <p className="text-lg font-medium text-gray-800">{hoster.state}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-lg font-medium text-gray-800">{hoster.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-lg font-medium text-gray-800">{hoster.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Company URL</p>
              <a
                href={hoster.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                {hoster.companyUrl}
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              <p className="text-lg font-medium text-gray-800">{hoster.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pincode</p>
              <p className="text-lg font-medium text-gray-800">{hoster.pincode}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              to="/hosterdetail"
              className="w-full md:w-auto text-center font-semibold bg-green-700 text-white hover:bg-green-800 transition-colors  text-xl py-3 px-6 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

    

     
    </div>
    <div className="lg:ml-52">
     <Footer />
     </div>
    </>
  );
};

export default HosterProfile;