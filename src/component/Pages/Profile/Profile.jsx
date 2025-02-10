
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import ProfileImg from "../../../assets/Images/profile1.webp";

const Profile = () => {
  const [seeker, setSeeker] = useState(null);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState(3);

  const userId = Cookies.get("userNewId");
  const userToken = Cookies.get("userToken");
  const userProfileApi = `https://jobquick.onrender.com/seekuser/${userId}`;
  const userJobs = `https://jobquick.onrender.com/applicants?applicantId=${userId}`;

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
        <p className="text-center mt-5 text-5xl text-blue-500 font-semibold">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
 

<div className="min-h-screen mt-16 bg-gradient-to-br from-gray-50 to-gray-100 py-8">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-blue-200 to-blue-200" />
      <div className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="relative -mt-16 flex flex-col items-center sm:flex-row sm:items-end sm:space-x-8">
          <img
            src={ProfileImg}
            alt="Company Profile"
            className="w-40 h-32 rounded-2xl border-4 border-white shadow-xl bg-white"
          />
          <div className="sm:mt-0 text-center sm:text-left flex-1">
            <h1 className="text-4xl mb-4 mt-2 sm:mt-28 lg:mt-20 font-bold text-blue-900">
            {seeker.fullName || "Admin"}
            </h1>
            <div className="mt-6 sm:mt-0">
           <Link to="/userdetails">
           <button
              className={`px-8 py-3  bg-gradient-to-r from-blue-400 to-blue-700 text-white hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200
              } rounded-xl font-semibold shadow-lg`}
            > Edit Profile
            </button>
           </Link>
          </div>
          </div>
         
        </div>
      </div>
    </div>

    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 text-black bg-clip-text text-transparent mb-6">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["Gender", seeker.gender || "N/A"],
              ["Date of Birth",seeker.dateOfBirth || "N/A"],
              ["Phone Number", seeker. phoneNumber  || "N/A"],
              ["Email ID", seeker.email || "N/A"],
              ["Project URL", seeker.projectUrl || "N/A"],

            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {value}
                </p>
              </div>
              
            ))}
          </div>
          <div className="bg-gray-50 mt-3 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                Summary
              </h3>
              <p className="text-gray-700 leading-relaxed">
              {seeker.
                summary || "N/A"}
              </p>
            </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent mb-6">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {seeker.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-4 bg-gradient-to-r from-blue-500/30 to-blue-500/30 text-blue-900 rounded-lg text-md font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 text-black bg-clip-text text-transparent mb-6">
          Educational Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["Degree", seeker.eduDegree || "N/A"],
              ["Institution Name",seeker.eduInstitution || "N/A"],
              ["Specialiazatin", seeker.eduSpecialisation || "N/A"],
              ["Start Year", seeker.eduStartYear || "N/A"],
              ["End Year", seeker.eduEndYear || "N/A"],

            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {value}
                </p>
              </div>
              
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 text-black bg-clip-text text-transparent mb-6">
          Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["Company Name", seeker.expCompany || "N/A"],
              ["Designation",seeker.expPosition || "N/A"],
              ["Start Date", seeker.expStartYear || "N/A"],
              ["End Date", seeker.expEndYear || "N/A"],

            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {value}
                </p>
              </div>
              
            ))}
          </div>
        </section>

        <div className="mt-8">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text">
                  Jobs you've applied to
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-5">
                  {displayedJobs.map((job) => (
                    <div
                      key={job._id}
                      className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300"
                    >
                      <h2 className="text-xl mb-3 font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text">
                        {job.title}
                      </h2>
                      <p className="text-gray-500 font-semibold">
                        <span className="font-bold text-black">Company:</span>{" "}
                        {job.companyName}
                      </p>
                      <p className="text-gray-500 font-semibold">
                        <span className="font-bold text-black">Location:</span>{" "}
                        {job.location}
                      </p>
                    
                    </div>
                  ))}
                </div>

                {jobs.length > visibleJobs && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleSeeMoreJobs}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                    >
                      {showAllJobs ? "Show Less" : "See More Jobs"}
                    </button>
                  </div>
                )}
              </div>

      </div>
    </div>

  </div>
</div>
</div> 



<Footer/>
      
</>
     
  );
}


export default Profile;