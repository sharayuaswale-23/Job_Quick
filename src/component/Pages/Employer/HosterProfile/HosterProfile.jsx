import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Profile from "../../../../assets/Images/profile1.webp";
import { Link, useNavigate } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";
import { FaUserEdit, FaTrashAlt, FaTimes, FaCheck } from "react-icons/fa";

const HosterProfile = () => {
  const [hoster, setHoster] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const HostId = Cookies.get("userId");
  const HostToken = Cookies.get("jwtToken");
  const hostProfileApi = `https://jobquick.onrender.com/hostuser/${HostId}`;
  const deleteProfile = `https://jobquick.onrender.com/hostuser/delete/${HostId}`;

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

  const handleDeleteProfile = async (HostId) => {
    console.log("Attempting to delete profile with ID:", HostId);
    try {
      const response = await fetch(deleteProfile, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${HostToken}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Delete API Response:", result);
      if (response.ok) {
        Cookies.remove("jwtToken");
        Cookies.remove("userId");
        navigate("/");
      }

      if (!response.ok) {
        throw new Error(
          `Failed to delete profile. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      console.log("Profile deleted successfully");
    } catch (error) {
      console.error("Delete profile Error:", error);
      setError(error.message);
    }
  };

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
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative">
    
        <div className=" inset-y-0 left-0 shadow-lg z-40">
          <Hostersidebar />
        </div>

           {!hoster ? (
            <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white" />
              </div>
            </div>
            </>

           ):(
            <>
            <div className="flex-1 mt-8 lg:mt-1 p-2 md:p-8 lg:ml-64 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
  <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-green-600 to-green-900 text-black bg-clip-text text-transparent mb-8">
    Profile
  </h1>

  <div className="max-w-5xl mx-auto w-full bg-white shadow-xl rounded-3xl pb-4 p-2 md:p-8 border border-gray-200">
    <div className="h-auto w-full sm:h-48 lg:h-40 text-green-900 flex flex-col sm:flex-row items-center justify-between py-4 sm:py-0">
      <div className="flex flex-col sm:flex-row items-center w-full space-y-4 sm:space-y-0">
        <img src={Profile} alt="Profile" className="w-28 h-16 sm:w-32 sm:h-24 lg:w-44 lg:h-28 rounded-full" />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-bold drop-shadow-md">{hoster.fullName || "Admin"}</h1>
          <p className="font-medium text-gray-700 mt-1">{hoster.email || "N/A"}</p>
          <Link to="/hosterdetail">
            <button className="text-blue-700 hover:text-blue-900 font-semibold mt-2 underline transition-all duration-200">
              Edit Profile
            </button>
          </Link>
          <div className="sm:hidden mt-3">
            <button onClick={() => setIsModalOpen(true)} className="text-red-700 hover:text-red-900 font-semibold mt-2 underline transition-all duration-200">
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <div className="hidden w-full justify-center md:justify-end sm:flex">
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-3 bg-red-600 text-white hover:bg-red-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
          Delete Account
        </button>
      </div>
    </div>

    <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md border mt-8">
      <h2 className="text-xl font-extrabold text-gray-800 mb-3">Additional Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[{ label: "Gender", value: hoster.gender || "N/A" },
          { label: "Email", value: hoster.email || "N/A" },
          { label: "Phone Number", value: hoster.phoneNumber || "N/A" },
          { label: "Company Url", value: hoster.companyURL || "N/A" }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500 font-semibold">{item.label}</p>
            <p className="text-lg font-medium text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md border mt-8">
      <h2 className="text-xl font-extrabold text-gray-800 mb-3">Location Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[{ label: "City", value: hoster.city || "N/A" },
          { label: "State", value: hoster.state || "N/A" },
          { label: "Address", value: hoster.address || "N/A" },
          { label: "Pincode", value: hoster.pincode || "N/A" }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500 font-semibold">{item.label}</p>
            <p className="text-lg font-medium text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

  {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full transform transition-all scale-100 hover:scale-105">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Are you sure you want to delete your account?</h2>
        <p className="text-gray-500 text-sm mb-6">This action cannot be undone and will permanently remove your profile.</p>
        <div className="flex justify-between">
          <button onClick={handleDeleteProfile} className="px-5 py-2 bg-red-500 text-white font-medium rounded-lg flex items-center gap-2 hover:bg-red-700 transition-all duration-200">
            <FaCheck className="w-5 h-5" /> Yes, Delete
          </button>
          <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg flex items-center gap-2 hover:bg-gray-400 transition-all duration-200">
            <FaTimes className="w-5 h-5" /> Cancel
          </button>
        </div>
      </div>
    </div>
  )}
       </div>
            </>

           )}
    
      


      </div>
    </>
  );
};

export default HosterProfile;
