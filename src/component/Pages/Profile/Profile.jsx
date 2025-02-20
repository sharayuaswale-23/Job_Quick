
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import ProfileImg from "../../../assets/Images/profileimg.png";
import {FaTimes, FaCheck, FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ShowJobs from "./showjobs";


const Profile = () => {
  const resumeRef = useRef(null); 
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
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const marginLeft = 20;
      let yOffset = 20;
  
      const colors = {
        primary: [34, 49, 63],
        accent: [48, 213, 200],
        text: {
          dark: [40, 40, 40],
          light: [255, 255, 255],
        },
        background: {
          section: [245, 245, 245],
        },
      };
  
      pdf.setFillColor(...colors.primary);
      pdf.rect(0, 0, pageWidth, 50, "F");
      pdf.setFont("times", "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(...colors.text.light);
      pdf.text(seeker.fullName || "N/A", pageWidth / 2, 30, { align: "center" });
  
      pdf.setFontSize(11);
      pdf.text(
        `${seeker.email} | ${seeker.phoneNumber} | ${seeker.projectUrl || "N/A"}`,
        pageWidth / 2,
        40,
        { align: "center" }
      );
  
      yOffset = 60;
  
      const drawSectionTitle = (title) => {
        pdf.setFont("times", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(...colors.primary);
        pdf.text(title.toUpperCase(), marginLeft, yOffset);
        pdf.setLineWidth(0.7);
        pdf.line(marginLeft, yOffset + 3, 120, yOffset + 3);
        yOffset += 15;
      };
  
      const drawProfessionalSection = (title, items, formatter) => {
        drawSectionTitle(title);
        items.forEach((item, index) => {
          pdf.setFillColor(...(index % 2 === 0 ? colors.background.section : [255, 255, 255]));
          pdf.rect(marginLeft, yOffset - 2, pageWidth - 40, 12, "F");
          pdf.setFont("times", "bold");
          pdf.setFontSize(11);
          pdf.setTextColor(...colors.text.dark);
          pdf.text("•", marginLeft + 2, yOffset + 6);
          pdf.text(formatter(item), marginLeft + 10, yOffset + 6);
          yOffset += 12;
        });
        yOffset += 10;
      };
  
      pdf.setFont("times", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(...colors.text.dark);
      drawSectionTitle("Summary");
      pdf.text(pdf.splitTextToSize(seeker.summary || "No summary provided", pageWidth - 40), marginLeft, yOffset);
      yOffset += 30;
  
      drawProfessionalSection("Education", [seeker], (edu) =>
        `${edu.eduInstitution} - ${edu.eduDegree} in ${edu.eduSpecialisation} (${edu.eduStartYear} - ${edu.eduEndYear})`
      );
  
      drawProfessionalSection("Experience", [seeker], (exp) =>
        `${exp.expCompany} | ${exp.expPosition} (${exp.expStartYear} - ${exp.expEndYear})`
      );
  
      drawSectionTitle("Skills");
      if (seeker.skills && seeker.skills.length) {
        let xPos = marginLeft;
        let yPos = yOffset;
        seeker.skills.forEach((skill, index) => {
          pdf.setFillColor(...colors.accent);
          pdf.roundedRect(xPos, yPos, 40, 8, 2, 2, "F");
          pdf.setTextColor(...colors.text.light);
          pdf.setFontSize(9);
          pdf.text(skill, xPos + 20, yPos + 6, { align: "center" });
          xPos += 45;
          if (xPos + 40 > pageWidth - marginLeft) {
            xPos = marginLeft;
            yPos += 12;
          }
        });
        yOffset = yPos + 20;
      } else {
        pdf.text("N/A", marginLeft, yOffset);
        yOffset += 10;
      }
  
      pdf.setFont("times", "italic");
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: "center" });
  
      pdf.save(`${seeker.fullName}_Resume.pdf`);
    });
  };
  
  

  return (
    <>
      <Header />
 
      <div className="min-h-screen mt-16 bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8" ref={resumeRef}>
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-6 text-white">
            <h1 className="text-4xl md:text-5xl text-center font-extrabold mb-2">Profile</h1>
            <p className="text-center text-gray-100">Your Professional Journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 p-4 md:p-6">
            {/* Left Column */}
            <div className="md:col-span-3 space-y-8">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img 
                      src={ProfileImg} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full shadow-lg border-4 border-white ring-2 ring-blue-500 transform transition-all duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="text-center mt-6 space-y-2">
                    <h1 className="text-2xl font-bold text-gray-800">{seeker.fullName || "Admin"}</h1>
                    <p className="text-gray-600">{seeker.email || "N/A"}</p>
                    
                    <div className="flex flex-col gap-2 mt-4">
                      <Link to="/userdetails">
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2">
                          <FaEdit className="w-4 h-4" /> Edit Profile
                        </button>
                      </Link>
                      <button 
                        onClick={downloadPDF} 
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaDownload className="w-4 h-4" /> Download Resume
                      </button>
                      <button 
                        onClick={() => setIsModalOpen(true)} 
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaTrash className="w-4 h-4" /> Delete Account
                      </button>
                     
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                  Summary
                </h2>
                <p className="text-gray-600 leading-relaxed">{seeker.summary || "N/A"}</p>
              </div>

              {/* Skills Section */}
              <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {seeker.skills?.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-200 hover:shadow-md"
                    >
                      {skill}
                    </span>
                  )) || "N/A"}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-7 space-y-8">
              {/* Personal Details */}
              <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    ["Gender", seeker.gender || "N/A"],
                    ["Date of Birth", seeker.dateOfBirth || "N/A"],
                    ["Phone", seeker.phoneNumber || "N/A"],
                    ["Email", seeker.email || "N/A"],
                    ["Project URL", seeker.projectUrl || "N/A"]
                  ].map(([label, value], index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">{label}</p>
                      <p className="text-gray-800 font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Details */}
              <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                  Educational Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    ["Degree", seeker.eduDegree],
                    ["University", seeker.eduInstitution],
                    ["Specialisation", seeker.eduSpecialisation],
                    ["Start Year", seeker.eduStartYear],
                    ["End Year", seeker.eduEndYear],
                  ].map(([label, value], index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">{label}</p>
                      <p className="text-gray-800 font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                  Experience
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    ["Company Name", seeker.expCompany],
                    ["Position", seeker.expPosition],
                    ["Start Date", seeker.expStartYear],
                    ["End Date", seeker.expEndYear],
                  ].map(([label, value], index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">{label}</p>
                      <p className="text-gray-800 font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applied Jobs Section */}
           
              <ShowJobs/>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full m-4 transform transition-all duration-300 scale-100 hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Delete Account</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDeleteProfile}
                className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaCheck className="w-4 h-4" /> Yes, Delete
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaTimes className="w-4 h-4" /> Cancel
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