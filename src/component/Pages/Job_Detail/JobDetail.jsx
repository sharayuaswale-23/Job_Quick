import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BriefcaseBusiness,
  Clock,
  Wallet,
  MapPin,
  Calendar,
  Mail,
  Globe,
  PhoneCall,
  Users,
  Building,
} from "lucide-react";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Images/companylogo.jpg";

const JobDetail = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const jobToken = Cookies.get("userToken");
  const userId = Cookies.get("userNewId");
  const jobDetailsAPI = `https://jobquick.onrender.com/job/${id}`;
  const jobApplyAPI = `https://jobquick.onrender.com/applicants`;
  const userProfileApi = `https://jobquick.onrender.com/seekuser/${userId}`;
  const checkApplicationAPI = `https://jobquick.onrender.com/applicants/check/${id}/${userId}`;


  const checkApplicationStatus = async () => {
    try {
      const response = await axios.get(checkApplicationAPI, {
        headers: {
          Authorization: `Bearer ${jobToken}`,
        },
      });
      
      if (response.data && response.data.hasApplied) {
        setHasApplied(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking application status:", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // First check if user has already applied
        await checkApplicationStatus();

        // Then fetch job details
        const response = await axios.get(jobDetailsAPI, {
          headers: {
            Authorization: `Bearer ${jobToken}`,
          },
        });

        if (response.data) {
          setJobData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [id, jobToken]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(userProfileApi, {
          headers: {
            Authorization: `Bearer ${jobToken}`,
          },
        });

        if (response.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load seeker details.");
      }
    };

    fetchUserProfile();
  }, [userProfileApi, jobToken]);

  const isProfileComplete = () => {
    if (!profile) return false;
    
    const requiredFields = ['fullName', 'city', 'phoneNumber', 'gender'];
    const missingFields = requiredFields.filter(field => !profile[field]);
    
    if (missingFields.length > 0) {
      const formattedFields = missingFields.map(field => 
        field.replace(/([A-Z])/g, ' $1').toLowerCase()
      ).join(', ');
      setModalMessage(`Please complete your profile. Missing fields: ${formattedFields}`);
      return false;
    }
    return true;
  };

  const handleApplynow = async () => {
    if (!isProfileComplete()) {
      setShowProfileModal(true);
      return;
    }
  
    try {
      setIsLoading(true);
      const response = await axios.post(
        jobApplyAPI,
        {
          jobId: id,
          applicantId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${jobToken}`,
          },
        }
      );
  
      if (response.data) {
        setHasApplied(true);
        setShowSuccessModal(true);
        
        // Store the application status in localStorage
        localStorage.setItem(`job-${id}-applied`, 'true');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setHasApplied(true);
        localStorage.setItem(`job-${id}-applied`, 'true');
      } else {
        console.error("Error applying for job:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const hasAppliedLocally = localStorage.getItem(`job-${id}-applied`) === 'true';
    if (hasAppliedLocally) {
      setHasApplied(true);
    }
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!jobData || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading job details...</p>
      </div>
    );
  }
  const KeyMetric = ({ icon: Icon, label, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="font-medium text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen mt-20 bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
       
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 relative">
            <div className="p-6 sm:p-8">
        
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
              {/* <button
                      onClick={handleApplynow}
                      disabled={hasApplied}
                      className={`px-8 py-3 ${
                        hasApplied
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-400 to-blue-700 text-white hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                      } rounded-xl font-semibold shadow-lg`}
                    >
                      {hasApplied ? "Applied" : "Apply Now"}
                    </button> */}
                    <button
                    onClick={handleApplynow}
                    disabled={hasApplied || isLoading}
                    className={`px-8 py-3 rounded-xl font-semibold shadow-lg ${
                      hasApplied
                        ? "bg-gray-400 cursor-not-allowed opacity-75"
                        : isLoading
                        ? "bg-gray-300 cursor-wait"
                        : "bg-gradient-to-r from-pink-500 to-blue-500 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white"
                    }`}
                  >
                    {hasApplied ? "Applied" : isLoading ? "Processing..." : "Apply Now"}
                  </button>
              </div>

              <div className="flex items-start gap-6">
                <img
                  src={Logo}
                  alt={jobData?.companyName}
                  className="w-24 h-24 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {jobData?.title}
                  </h1>
                  <p className="text-xl text-blue-600 font-semibold mb-4">
                    {jobData?.companyName}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <KeyMetric
                      icon={Wallet}
                      label="Salary Range"
                      value={
                        jobData?.minPackage
                          ? `${jobData.minPackage} - ${jobData.maxPackage}`
                          : "Not disclosed"
                      }
                    />
                    <KeyMetric
                      icon={MapPin}
                      label="Location"
                      value={jobData?.location || "Not specified"}
                    />
                    <KeyMetric
                      icon={Clock}
                      label="Job Type"
                      value={jobData?.jobType || "Not specified"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
            <div className="lg:col-span-2 space-y-6">
       
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {jobData?.jobDescription}
                </p>
              </div>

         
           
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Requirements
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Education
                    </h3>
                    <p className="text-gray-600">
                      {jobData?.minEducation || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Experience
                    </h3>
                    <p className="text-gray-600">
                      {jobData?.experience || "Not specified"}
                    </p>
                  </div>
                  {jobData?.skills && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {jobData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
         
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Company Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Number of employees
                      </p>
                      <p className="font-medium text-gray-900">
                        {jobData?.numOfEmployee || "Not specified"} employees
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={jobData?.companyURL}
                        className="font-medium text-blue-700  hover:text-blue-700 hover:underline"
                      >
                        {jobData?.companyURL || "Not available"}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-blue-900">
                        {jobData?.companyEmail || "Not available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">
                        {jobData?.phoneNo || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Additional Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Application Deadline
                      </p>
                      <p className="font-medium text-gray-900">
                        {jobData?.applicationDeadline || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Number of Openings
                      </p>
                      <p className="font-medium text-gray-900">
                        {jobData?.noOfOpeaning || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Work Type</p>
                      <p className="font-medium text-gray-900">
                        {jobData?.workType || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl mt-4 shadow-md overflow-hidden mb-6 relative">
          <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Company Description
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {jobData?.companyDescription}
                </p>
                </div>
          </div>
        </div>
      </div>
      {showProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-600">Incomplete Profile</h2>
            <p className="text-gray-700">{modalMessage}</p>
            <div className="mt-6 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setShowProfileModal(false)}
              >
                Close
              </button>
              <Link
                to="/profile"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Complete Profile
              </Link>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Application submitted successfully!</h2>
            <p>Thank you for applying for this job. We will review your application and get back to you soon.</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default JobDetail;