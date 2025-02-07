import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Profile from "../../../../assets/Images/profile1.webp";
import { Link } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";

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
      <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative">
        {/* Sidebar */}
        <div className=" inset-y-0 left-0 shadow-lg z-40">
          <Hostersidebar />
        </div>

        {/* Main Profile Section */}
        <div className="flex-1 mt-8 lg:mt-1 p-4 md:p-10 lg:ml-64 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
          <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-600 to-green-900 text-black bg-clip-text text-transparent mb-8">
            My Profile
          </h1>

          {/* Profile Container */}
          <div className="max-w-5xl mx-auto w-full bg-white shadow-xl rounded-3xl p-8 border border-gray-200">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
                <img
                  src={Profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Details */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-gray-900 capitalize">
                  {hoster.fullName}
                </h1>
                <div className="mt-3">
                  <Link
                    to="/hosterdetail"
                    className="inline-block mt-2 text-white bg-green-600 hover:bg-green-700 transition-colors text-lg py-2 px-6 rounded-lg shadow-md font-semibold"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            
              {/* Other Details */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Additional Information
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "Gender", value: hoster.gender },
                    { label: "Email", value: hoster.email || "N/A" },
                    { label: "Phone Number", value: hoster.phoneNumber || "N/A" },
                    { label: "Company Url", value: hoster.companyURL || "N/A" },
                  ].map((item, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-500 font-semibold">
                        {item.label}
                      </p>
                      <p className="text-lg font-medium text-gray-800">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Location Details */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Location Details
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "City", value: hoster.city },
                    { label: "State", value: hoster.state },
                    { label: "Address", value: hoster.address },
                    { label: "Pincode", value: hoster.pincode },
                  ].map((item, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-500 font-semibold">
                        {item.label}
                      </p>
                      <p className="text-lg font-medium text-gray-800">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HosterProfile;
