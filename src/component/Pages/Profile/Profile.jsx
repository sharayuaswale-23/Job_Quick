
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import ProfileImg from "../../../assets/Images/profileimg.png";
import { FaUserEdit, FaTrashAlt, FaTimes, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [seeker, setSeeker] = useState(null);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = Cookies.get("userNewId");
  const userToken = Cookies.get("userToken");
  const userProfileApi = `https://jobquick.onrender.com/seekuser/${userId}`;
  const userJobs = `https://jobquick.onrender.com/applicants?applicantId=${userId}`;
  const deleteProfile = `https://jobquick.onrender.com/seekuser/delete/${userId}`;

  const navigate = useNavigate();

  const showJobs = async () => {
    try {
      const response = await fetch(userJobs, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

  
      if (Array.isArray(result)) {
        const jobDetails = result.map((application) => application.jobId);
        setJobs(jobDetails);
      } else {
        setJobs([]);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(userProfileApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSeeker(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching host profile:", error);
        setError("Failed to load seeker details.");
      }
    };

    fetchUserProfile();
    showJobs();
  }, [userProfileApi, userToken]);

  const handleDeleteProfile = async (userId) => {
    console.log("Attempting to delete profile with ID:", userId);
    try {
      const response = await fetch(deleteProfile, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Delete API Response:", result);
      if (response.ok) {
        Cookies.remove("userToken");
        Cookies.remove("userNewId");
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


  const handleSeeMoreJobs = () => {
    setShowAllJobs(!showAllJobs);
  };

  const displayedJobs = showAllJobs ? jobs : jobs.slice(0, visibleJobs);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-500">
        <p className="text-red-600 text-5xl">{error}</p>
      </div>
    );
  }

  if (!seeker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {/* <p className="text-center mt-5 text-5xl text-blue-500 font-semibold">
          Loading...
        </p> */}
      </div>
    );
  }

  return (
    <>
      <Header />
 

      <div className="min-h-screen mt-16 bg-gradient-to-br from-blue-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden py-4">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 ml-16 mt-4">Profile</h1>
          {/* Header */}
    <div className="h-auto w-full sm:h-48 lg:h-40 text-blue-900 flex flex-col sm:flex-row items-center px-6 sm:px-12 justify-between py-6 sm:py-0">
    
  {/* Profile Info */}
  <div className="flex flex-col sm:flex-row items-center w-full space-y-4 sm:space-y-0 sm:space-x-8">
    <img src={ProfileImg} alt="Profile" className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full" />
    <div className="text-center sm:text-left">
      <h1 className="text-2xl sm:text-4xl font-bold drop-shadow-md">{seeker.fullName || "Admin"}</h1>
      <p className="font-medium text-gray-700 mt-1">{seeker.email || "N/A"}</p>
      <Link to="/userdetails">
        <button className="text-blue-700 hover:text-blue-900 font-semibold mt-2 underline transition-all duration-200">
          Edit Profile
        </button>
      </Link>

      {/* Delete Button - Only below Edit Profile on small screens */}
      <div className="sm:hidden mt-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full px-2 py-2 bg-red-600 text-white hover:bg-red-700  rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Delete Account
        </button>
      </div>
    </div>
  </div>

  {/* Delete Button - Stays in row layout for larger screens */}
  <div className="hidden w-full justify-center md:justify-end sm:flex">
    <button
      onClick={() => setIsModalOpen(true)}
      className="px-4 py-3 bg-red-600 text-white hover:bg-red-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
    >
      Delete Account
    </button>
  </div>
</div>



          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
              {/* Summary */}
              <section className="bg-gray-100 rounded-xl p-6 shadow-md">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Summary</h2>
                <p className="text-gray-700 leading-relaxed">{seeker.summary || "N/A"}</p>
              </section>

              {/* Personal & Educational Details Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <section className="flex flex-wrap gap-6">
                  <h2 className="text-3xl font-bold text-blue-900 mb-4 w-full">Personal Details</h2>
                  {[["Gender", seeker.gender || "N/A"], ["Date of Birth", seeker.dateOfBirth || "N/A"], ["Phone Number", seeker.phoneNumber || "N/A"], ["Email ID", seeker.email || "N/A"], ["Project URL", seeker.projectUrl || "N/A"]].map(([label, value], index) => (
                    <div key={index} className="flex-1 min-w-[200px] bg-gray-100 rounded-xl p-4 shadow-sm">
                      <p className="text-gray-600 text-sm">{label}</p>
                      <p className="font-semibold text-gray-900 mt-1">{value}</p>
                    </div>
                  ))}
                </section>

                <section className="flex flex-wrap gap-6">
                  <h2 className="text-3xl font-bold text-blue-900 mb-4 w-full">Educational Details</h2>
                  {[["Degree", seeker.eduDegree || "N/A"], ["Specialization", seeker.eduSpecialisation || "N/A"], ["Start Year", seeker.eduStartYear || "N/A"], ["End Year", seeker.eduEndYear || "N/A"], ["Institution Name", seeker.eduInstitution || "N/A"]].map(([label, value], index) => (
                    <div key={index} className="flex-1 min-w-[200px] bg-gray-100 rounded-xl p-4 shadow-sm">
                      <p className="text-gray-600 text-sm">{label}</p>
                      <p className="font-semibold text-gray-900 mt-1">{value}</p>
                    </div>
                  ))}
                </section>
              </div>

                            {/* Experience */}
                            <section>
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {["Company Name", "Designation", "Start Date", "End Date"].map((field, index) => (
                    <div key={index} className="bg-gray-100 rounded-xl p-4">
                      <p className="text-gray-600 text-sm">{field}</p>
                      <p className="font-semibold text-gray-900 mt-1">{seeker[field.toLowerCase().replace(/ /g, "")] || "N/A"}</p>
                    </div>
                  ))}
                </div>
              </section>

                {/* Skills */}
                <section>
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {seeker.skills?.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg text-md font-medium">
                      {skill}
                    </span>
                  )) || "N/A"}
                </div>
              </section>

              {/* Jobs Applied */}
              <section>
                <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center sm:text-left">Jobs You've Applied To</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedJobs.map((job) => (
                    <div key={job._id} className="border p-6 rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                      <h2 className="text-xl font-bold text-blue-900 mb-2">{job.title}</h2>
                      <p className="text-gray-500 font-semibold">
                        <span className="font-bold text-black">Company:</span> {job.companyName}
                      </p>
                      <p className="text-gray-500 font-semibold">
                        <span className="font-bold text-black">Location:</span> {job.location}
                      </p>
                    </div>
                  ))}
                </div>
                {jobs.length > visibleJobs && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleSeeMoreJobs}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg transform hover:-translate-y-1"
                    >
                      {showAllJobs ? "Show Less" : "See More Jobs"}
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full transform transition-all scale-100 hover:scale-105">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Are you sure you want to delete your account?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              This action cannot be undone and will permanently remove your profile.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteProfile}
                className="px-5 py-2 bg-red-500 text-white font-medium rounded-lg flex items-center gap-2 hover:bg-red-700 transition-all duration-200"
              >
                <FaCheck className="w-5 h-5" /> Yes, Delete
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg flex items-center gap-2 hover:bg-gray-400 transition-all duration-200"
              >
                <FaTimes className="w-5 h-5" /> Cancel
              </button>
            </div>
          </div>
        </div>
        
        )}
    </div>



<Footer/>
      
</>
     
  );
}


export default Profile;