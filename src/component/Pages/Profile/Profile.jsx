
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import ProfileImg from "../../../assets/Images/profileimg.png";
import { FaUserEdit, FaTrashAlt, FaTimes, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const Profile = () => {
  const resumeDownloadRef = useRef(null);
  const resumeRef = useRef(null); // Ref for capturing the resume
  const [seeker, setSeeker] = useState(null);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState(2);
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

  const downloadPDF = () => {
    const resumeElement = resumeRef.current;
    if (!resumeElement) return;
  
    html2canvas(resumeElement, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.setFont("helvetica");
  
      let yOffset = 10;
      const marginLeft = 10;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const lineSpacing = 7;
  
      // Header with Background
      pdf.setFillColor(33, 37, 41);
      pdf.rect(0, yOffset, pageWidth, 20, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.text(seeker.fullName || "N/A", pageWidth / 2, yOffset + 13, { align: "center" });
      yOffset += 25;
  
      // Summary Section
      pdf.setTextColor(33, 37, 41);
      pdf.setFontSize(14);
      pdf.text("Summary", marginLeft, yOffset);
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(seeker.summary || "N/A", marginLeft, (yOffset += lineSpacing + 5));
  
      // Personal Information (Email & Phone)
      yOffset += 10;
      pdf.setFontSize(14);
      pdf.setTextColor(33, 37, 41);
      pdf.text("Contact Information", marginLeft, yOffset);
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Email: ${seeker.email || "N/A"}`, marginLeft, (yOffset += lineSpacing + 5));
      pdf.text(`Phone: ${seeker.phoneNumber || "N/A"}`, pageWidth / 2, yOffset);
  
      // Project URL
      pdf.text(`Project URL: ${seeker.projectUrl || "N/A"}`, marginLeft, (yOffset += lineSpacing + 5));
  
      // Education Section
      yOffset += 10;
      pdf.setFontSize(14);
      pdf.setTextColor(33, 37, 41);
      pdf.text("Education", marginLeft, yOffset);
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Degree: ${seeker.eduDegree || "N/A"}`, marginLeft, (yOffset += lineSpacing + 5));
      pdf.text(`Specialization: ${seeker.eduSpecialisation || "N/A"}`, pageWidth / 2, yOffset);
      pdf.text(`Start Year: ${seeker.eduStartYear || "N/A"}`, marginLeft, (yOffset += lineSpacing + 5));
      pdf.text(`End Year: ${seeker.eduEndYear || "N/A"}`, pageWidth / 2, yOffset);
      pdf.text(`Institution: ${seeker.eduInstitution || "N/A"}`, marginLeft, (yOffset += lineSpacing + 5));
  
      // Experience Section
      yOffset += 10;
      pdf.setFontSize(14);
      pdf.setTextColor(33, 37, 41);
      pdf.text("Experience", marginLeft, yOffset);
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Company: ${seeker.companyName || "N/A"}`, marginLeft, (yOffset += lineSpacing + 5));
      pdf.text(`Designation: ${seeker.designation || "N/A"}`, pageWidth / 2, yOffset);
      pdf.text(`Start Date: ${seeker.startDate || "N/A"}`, marginLeft, (yOffset += lineSpacing + 5));
      pdf.text(`End Date: ${seeker.endDate || "N/A"}`, pageWidth / 2, yOffset);
  
      // Skills Section with background boxes
      yOffset += 10;
      pdf.setFontSize(14);
      pdf.setTextColor(33, 37, 41);
      pdf.text("Skills", marginLeft, yOffset);
      yOffset += lineSpacing;
  
      if (seeker.skills && seeker.skills.length) {
        let xPos = marginLeft;
        let yPos = yOffset;
        seeker.skills.forEach((skill, index) => {
          pdf.setFillColor(240, 240, 240);
          pdf.roundedRect(xPos, yPos, 30, 8, 2, 2, "F");
          pdf.setTextColor(0, 0, 0);
          pdf.text(skill, xPos + 3, yPos + 6);
  
          xPos += 35;
          if (xPos + 30 > pageWidth - marginLeft) {
            xPos = marginLeft;
            yPos += 12;
          }
        });
      } else {
        pdf.text("N/A", marginLeft, yOffset);
      }
  
      pdf.save("Resume.pdf");
    });
  };
  
  

  return (
    <>
      <Header />
 
      <div className="min-h-screen mt-16 bg-gradient-to-br from-blue-50 to-gray-100 py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-10" ref={resumeRef}>
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl py-6">
      <h1 className="text-5xl text-center font-extrabold text-blue-900 mb-6">Profile</h1>
      
  
      <div className="grid grid-cols-1 md:grid-cols-10 gap-12 px-4 py-8">
        
      
        <div className="md:col-span-3 space-y-8 flex flex-col items-center p-4">
       
          <div className="flex flex-col items-center">
            <img src={ProfileImg} alt="Profile" className="w-28 h-28 lg:w-32 lg:h-32 rounded-full shadow-md border-4 border-black" />
            <div className="text-center mt-5">
              <h1 className="text-3xl font-bold drop-shadow-md text-blue-900">{seeker.fullName || "Admin"}</h1>
              <p className="font-medium text-gray-600 mt-2">{seeker.email || "N/A"}</p>
             <div className="flex flex-col">
             <Link to="/userdetails">
                <button className="text-blue-700 hover:text-blue-900 font-semibold mt-3 underline transition-all duration-300">Edit Profile</button>
              </Link>
              <Link>
                <button  onClick={() => setIsModalOpen(true)} className="text-red-700 hover:text-red-900 font-semibold mt-3 underline transition-all duration-300">Delete Account</button>
              </Link>
              <Link >
                <button  onClick={downloadPDF} className="text-green-700 hover:text-green-900 font-semibold mt-3 underline transition-all duration-300">Download Resume</button>
              </Link>
              
             </div>
            </div>
          </div>
          
        
          <section className="bg-white rounded-xl p-6 shadow-md w-full border border-gray-200">
            <h2 className="text-xl lg:text-3xl font-bold text-blue-900 mb-4">Summary</h2>
            <p className="text-gray-700 leading-relaxed">{seeker.summary || "N/A"}</p>
          </section>
          
        
          <section className="w-full">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {seeker.skills?.map((skill, index) => (
                <span key={index} className="px-5 py-2 bg-blue-200 text-blue-900 rounded-lg text-md font-medium shadow-sm">
                  {skill}
                </span>
              )) || "N/A"}
            </div>
          </section>
        </div>

   
        <div className="md:col-span-7 space-y-8">
       
          <div className="grid grid-cols-1 gap-8">

        <section className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {[
              ["Gender", seeker.gender || "N/A"], 
              ["Date of Birth", seeker.dateOfBirth || "N/A"], 
              ["Phone", seeker.phoneNumber || "N/A"], 
              ["Email", seeker.email || "N/A"], 
              ["Project URL", seeker.projectUrl || "N/A"]
            ].map(([label, value], index) => (
              <p key={index} className="text-gray-700 mb-2"><strong>{label}:</strong> {value}</p>
            ))}
          </div>
        </section>


        <section className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Educational Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {[
              ["Degree", seeker.eduDegree || "N/A"], 
              ["Specialization", seeker.eduSpecialisation || "N/A"], 
              ["Start Year", seeker.eduStartYear || "N/A"], 
              ["End Year", seeker.eduEndYear || "N/A"], 
              ["Institution", seeker.eduInstitution || "N/A"]
            ].map(([label, value], index) => (
              <p key={index} className="text-gray-700 mb-2"><strong>{label}:</strong> {value}</p>
            ))}
          </div>
        </section>
      </div>


      <section className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mt-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {[
            ["Company", seeker.companyName || "N/A"], 
            ["Designation", seeker.designation || "N/A"], 
            ["Start Date", seeker.startDate || "N/A"], 
            ["End Date", seeker.endDate || "N/A"]
          ].map(([label, value], index) => (
            <p key={index} className="text-gray-700 mb-2"><strong>{label}:</strong> {value}</p>
          ))}
        </div>
      </section>  
          <section>
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center sm:text-left">Jobs You've Applied To</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {displayedJobs.map((job) => (
                <div key={job._id} className="border mb-2 p-6 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                  <h2 className="text-xl font-bold text-blue-900 mb-2">{job.title}</h2>
                  <p className="text-gray-500 font-semibold mb-2">
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
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg transform hover:-translate-y-1">
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