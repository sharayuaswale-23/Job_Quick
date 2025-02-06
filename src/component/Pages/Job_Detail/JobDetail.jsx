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

const JobDetail = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const jobToken = Cookies.get("userToken");
  const userId = Cookies.get("userNewId");
  const jobDetailsAPI = `https://jobquick.onrender.com/job/${id}`;
  const jobApplyAPI = `https://jobquick.onrender.com/applicants`;

  useEffect(() => {
    const fetchAllJobDetails = async () => {
      try {
        const response = await fetch(jobDetailsAPI, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jobToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setJobData(data);
      } catch (error) {
        console.error("Error fetching host jobs:", error);
        setError("Failed to load hoster job details.");
      }
    };

    fetchAllJobDetails();
  }, [id]);

  const handleApplynow = async () => {
    try {
      const response = await axios.post(
        jobApplyAPI,
        {
          jobId: id,
          applicantId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jobToken}`,
          },
        }
      );

      if (response && response.data) {
        console.log(response.data);
        if (hasApplied) {
          setShowModal(true);
          return;
        }
        setShowSuccessModal(true);
        setHasApplied(true);
      } else {
        console.error("Error applying for job: No response data");
        setShowModal(true);
      }
    } catch (error) {
      console.error(
        "Error applying for job:",
        error.response?.data || error.message
      );
      setShowModal(true);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading hoster job details...</p>
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
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 relative">
            <div className="p-6 sm:p-8">
              {/* Apply Button Positioned at Top Right */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
              <button
                      onClick={handleApplynow}
                      disabled={hasApplied}
                      className={`px-8 py-3 ${
                        hasApplied
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-400 to-blue-700 text-white hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                      } rounded-xl font-semibold shadow-lg`}
                    >
                      {hasApplied ? "Applied" : "Apply Now"}
                    </button>
              </div>

              <div className="flex items-start gap-6">
                <img
                  src="https://www.pngkey.com/png/full/191-1911374_company-building-png-office-building-png.png"
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
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Description */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {jobData?.jobDescription}
                </p>
              </div>

         
              {/* Requirements */}
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
              {/* Company Info */}
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

              {/* Job Details */}
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">You have already applied</h2>
            <p>You have already submitted your application for this job.</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
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