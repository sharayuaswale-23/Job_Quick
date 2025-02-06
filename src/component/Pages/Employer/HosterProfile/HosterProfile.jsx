import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";
import Hosterheader from "../Hosterheader/Hosterheader";
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

   {/* <Hosterheader /> */}
    <div className="flex min-h-screen bg-gray-100 relative">
     {/* Sidebar */}
     <div className=" inset-y-0 left-0 shadow-lg z-40">
          <Hostersidebar />
        </div>

    
      <div className="flex-1 mt-8 lg:mt-4 p-4 md:p-10 lg:ml-96 bg-gray-100 min-h-screen">
      <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-600 to-green-900 text-black bg-clip-text text-transparent mb-10">My Profile</h1>
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-3xl p-8 border border-gray-200">
    
        <div className="flex flex-col items-center mb-8">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-green-500 shadow-lg">
            <img
              src={hoster.profileImg || "https://tse3.mm.bing.net/th?id=OIP.tlqnziQxJqVPudFX75jFpgAAAA&pid=Api&P=0&h=180"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-5 capitalize">
          {hoster.fullName}
          </h1>
          <p className="text-lg text-gray-600">{hoster.city}, {hoster.state}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-300 pt-6">
          {[
            { label: "City", value: hoster.city },
            { label: "State", value: hoster.state },
            { label: "Address", value: hoster.address },
            { label: "Phone Number", value: hoster.phoneNumber},
            { label: "Pincode", value: hoster.pincode },
            { label: "Gender", value: hoster.gender },
            { label: "Company Url", value: hoster.companyUrl },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 font-semibold">{item.label}</p>
              <p className="text-lg font-medium text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/hosterdetail"
            className="w-full md:w-auto text-center font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors text-lg py-3 px-8 rounded-lg shadow-md"
          >
            Edit Profile
          </Link>
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

export default HosterProfile;