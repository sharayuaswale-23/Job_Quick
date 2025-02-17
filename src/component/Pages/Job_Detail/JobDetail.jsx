import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  const checkApplicationAPI = `https://jobquick.onrender.com/applicants/check/<span class="math-inline">\{id\}/</span>{userId}`;

  const checkApplicationStatus = async () => {
    try {
      const response = await axios.get(checkApplicationAPI, {
        headers: { Authorization: `Bearer ${jobToken}` },
      });
      return !!(response.data && response.data.hasApplied);
    } catch (error) {
      console.error("Error checking application status:", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        await checkApplicationStatus();
        const response = await axios.get(jobDetailsAPI, {
          headers: { Authorization: `Bearer ${jobToken}` },
        });
        setJobData(response.data);
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
          headers: { Authorization: `Bearer ${jobToken}` },
        });
        setProfile(response.data);
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
      const formattedFields = missingFields.map(field => field.replace(/([A-Z])/g, ' $1').toLowerCase()).join(', ');
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

    setIsLoading(true);
    try {
      const response = await axios.post(jobApplyAPI, { jobId: id, applicantId: userId }, {
        headers: { Authorization: `Bearer ${jobToken}` },
      });
      setHasApplied(true);
      setShowSuccessModal(true);
      localStorage.setItem(`job-${id}-applied`, 'true');
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
    if (localStorage.getItem(`job-${id}-applied`) === 'true') {
      setHasApplied(true);
    }
  }, [id]);


  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p className="text-red-600 text-lg">{error}</p></div>;
  }

  if (!jobData || isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p className="text-gray-600 text-lg">Loading job details...</p></div>;
  }

  const JobDetailSection = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );

  const KeyMetric = ({ icon: Icon, label, value }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-indigo-500" />
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="font-medium text-gray-900">{value || "Not specified"}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r bg-gray-200 py-8 px-4 sm:px-6 lg:px-8 mt-14">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
            <div className="px-6 py-8 sm:px-10 sm:py-12 flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                {/* Image Section */}
                <img
                  src={Logo} // Ensure jobData.imageUrl contains a valid image URL
                  alt={Logo}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                />

                {/* Text Section */}
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{jobData.title}</h1>
                  <p className="text-xl text-indigo-500 font-semibold">{jobData.companyName}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleApplynow}
                  disabled={hasApplied || isLoading}
                  className={`px-8 py-3 rounded-xl font-semibold shadow-lg ${
                    hasApplied
                      ? "bg-gray-400 cursor-not-allowed opacity-75"
                      : isLoading
                      ? "bg-gray-300 cursor-wait"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {hasApplied ? "Applied" : isLoading ? "Processing..." : "Apply Now"}
                </button>
              </div>
            </div>
            <div className="px-6 pb-8 sm:px-10 sm:pb-12">
            <div className="grid grid-cols-1  md:grid-cols-3 gap-6">

                <KeyMetric icon={Wallet} label="Salary" value={`${jobData.minPackage} - ${jobData.maxPackage}`} />
                <KeyMetric icon={MapPin} label="Location" value={jobData.location} />
                <KeyMetric icon={Clock} label="Job Type" value={jobData.jobType} />
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
            <div className="lg:col-span-2 space-y-8">
       
            
  
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


         

   
          <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {jobData?.jobDescription}
                </p>
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