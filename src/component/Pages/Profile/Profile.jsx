
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import ProfileImg from "../../../assets/Images/profileimg.jpeg";

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

      // Extract just the jobId details from each application
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
 

      {/* <div className="min-h-screen mt-20 flex flex-col lg:flex-row bg-gray-50 p-4 lg:p-6">
 
  <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center">
    <img
      src={seeker.profileImg || ProfileImg}
      alt="Profile"
      className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 rounded-full border-pink-300 shadow-lg"
    />
    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text mt-4">
      {seeker.fullName || "Admin"}
    </h1>
    <p className="text-gray-500 text-lg font-semibold mt-2 max-w-sm">
      {seeker.summary}
    </p>
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {seeker.skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold rounded-lg shadow-md text-lg"
        >
          {skill}
        </span>
      ))}
    </div>
    <Link to="/userdetails">
      <button className="mt-4 px-6 py-2 text-lg font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg shadow-md">
        Edit Profile
      </button>
    </Link>
  </div>


  <div className="w-full lg:w-2/3 p-6">
    <div className="bg-white shadow-xl rounded-2xl p-6 transition-all duration-300">
   
      <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-4">
        Personal Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div><p className="font-semibold text-gray-500">Gender:</p> <span className="text-xl font-semibold">{seeker.gender}</span></div>
        <div><p className="font-semibold text-gray-500">DOB:</p> <span className="text-xl font-semibold">{seeker.dateOfBirth}</span></div>
        <div><p className="font-semibold text-gray-500">Phone No.:</p> <span className="text-xl font-semibold">{seeker.phoneNumber}</span></div>
        <div><p className="font-semibold text-gray-500">Github Link:</p> <a className="text-xl font-semibold text-blue-600" href={seeker.projectUrl}>{seeker.projectUrl}</a></div>
      </div>

      <h2 className="mt-8 text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">Location</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        <div><p className="font-semibold text-gray-500">Address:</p> <span className="text-xl font-semibold">{seeker.address}</span></div>
        <div><p className="font-semibold text-gray-500">City:</p> <span className="text-xl font-semibold">{seeker.city}</span></div>
        <div><p className="font-semibold text-gray-500">State:</p> <span className="text-xl font-semibold">{seeker.state}</span></div>
        <div><p className="font-semibold text-gray-500">Country:</p> <span className="text-xl font-semibold">{seeker.country}</span></div>
        <div><p className="font-semibold text-gray-500">Pincode:</p> <span className="text-xl font-semibold">{seeker.pincode}</span></div>
      </div>

   
      <h2 className="mt-8 text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">Education</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        <div><p className="font-semibold text-gray-500">Degree:</p> <span className="text-xl font-semibold">{seeker.eduDegree}</span></div>
        <div><p className="font-semibold text-gray-500">University:</p> <span className="text-xl font-semibold">{seeker.eduInstitution}</span></div>
        <div><p className="font-semibold text-gray-500">Specialisation:</p> <span className="text-xl font-semibold">{seeker.eduSpecialisation}</span></div>
        <div><p className="font-semibold text-gray-500">Start Year:</p> <span className="text-xl font-semibold">{seeker.eduStartYear}</span></div>
        <div><p className="font-semibold text-gray-500">End Year:</p> <span className="text-xl font-semibold">{seeker.eduEndYear}</span></div>
      </div>

      <h2 className="mt-8 text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">Work Experience</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        <div><p className="font-semibold text-gray-500">Company:</p> <span className="text-xl font-semibold">{seeker.expCompany}</span></div>
        <div><p className="font-semibold text-gray-500">Position:</p> <span className="text-xl font-semibold">{seeker.expPosition}</span></div>
        <div><p className="font-semibold text-gray-500">Start Date:</p> <span className="text-xl font-semibold">{seeker.expStartYear}</span></div>
        <div><p className="font-semibold text-gray-500">End Date:</p> <span className="text-xl font-semibold">{seeker.expEndYear}</span></div>
      </div>


      <div className="mt-8">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                  Jobs you've applied to
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl mt-5">
                  {displayedJobs.map((job) => (
                    <div
                      key={job._id}
                      className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300"
                    >
                      <h2 className="text-xl mb-3 font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
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
                      <p className="text-gray-500 font-semibold">
                        <span className="font-bold text-black">Type:</span>{" "}
                        {job.jobType}
                      </p>
                      <p className="text-gray-500 font-semibold">
                        <span className="font-bold text-black">
                          Experience:
                        </span>{" "}
                        {job.experience}
                      </p>
                      <p className="text-gray-500 font-semibold">
                        <span className="font-bold text-black">Package:</span>{" "}
                        {job.minPackage} - {job.maxPackage}
                      </p>
                      <p className="text-gray-500 font-semibold">
                        <span className="font-bold text-black">Skills:</span>{" "}
                        {job.skills?.length > 0 ? job.skills.join(", ") : "N/A"}
                      </p>
                      <p className="text-gray-500 font-semibold">
                        <span className="font-bold text-black">Openings:</span>{" "}
                        {job.noOfOpeaning}
                      </p>
                    </div>
                  ))}
                </div>

                {jobs.length > visibleJobs && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleSeeMoreJobs}
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                    >
                      {showAllJobs ? "Show Less" : "See More Jobs"}
                    </button>
                  </div>
                )}
              </div>
           
    </div>
  </div>
</div> */}

<div className="min-h-screen mt-16 bg-gradient-to-br from-gray-50 to-gray-100 py-8">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-blue-200 to-blue-200" />
      <div className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="relative -mt-16 flex flex-col items-center sm:flex-row sm:items-end sm:space-x-8">
          <img
            src={seeker.profileImg}
            alt="Company Profile"
            className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-white"
          />
          <div className="sm:mt-0 text-center sm:text-left flex-1">
            <h1 className="text-4xl mb-4 mt-2 sm:mt-28 lg:mt-20 font-bold text-blue-900">
            {seeker.fullName}
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
              ["Gender", seeker.gender],
              ["Date of Birth",seeker.dateOfBirth],
              ["Phone Number", seeker. phoneNumber],
              ["Email ID", seeker.email],
              ["Project URL", seeker.projectUrl],

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
                summary}
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
              ["Degree", seeker.eduDegree],
              ["Institution Name",seeker.eduInstitution],
              ["Specialiazatin", seeker.eduSpecialisation],
              ["Start Year", seeker.eduStartYear],
              ["End Year", seeker.eduEndYear],

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
              ["Company Name", seeker.expCompany],
              ["Designation",seeker.expPosition],
              ["Start Date", seeker.expStartYear],
              ["End Date", seeker.expEndYear],

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




      
</>
     
  );
}


export default Profile;