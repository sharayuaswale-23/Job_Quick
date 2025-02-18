import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";

const Applicant = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("jwtToken");

  useEffect(() => {
    const fetchApplicant = async () => {
      if (!token) {
        setError("Authentication required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://jobquick.onrender.com/applicants/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applicant");
        }

        const data = await response.json();
        console.log("API Response:", data);
        setApplication(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchApplicant();
  }, [id, token]);

  const handleShorlisted = async () => {
    if (!application) return;
    const shortListedApi = `https://jobquick.onrender.com/applicants/shortlisted/${id}`;
    const updatedStatus = !application.shortListed;

    try {
      const response = await fetch(shortListedApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shortListed: updatedStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update shortlist status");
      }

      setApplication((prev) => ({ ...prev, shortListed: updatedStatus }));
    } catch (error) {
      console.error("Error updating shortlist status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          {/* <p className="text-xl text-green-700">Loading applicant details...</p> */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <p className="text-2xl text-red-500 mb-4">{error}</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!application || !application.applicantId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500">No applicant found</p>
        </div>
      </div>
    );
  }

  const applicant = application.applicantId;
  const job = application.jobId;

  return (
  <>
  <Hostersidebar/>
  <div className="min-h-screen pt-20 lg:pt-6 lg:ml-64 bg-gray-50 py-12 px-2 sm:px-4 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
    
      <div className="bg-gradient-to-r from-green-600 to-green-800 px-4 md:px-6 py-5 w-full flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
  <div>
    <h2 className="text-3xl mb-4 font-bold text-white">Applicant Details</h2>
    <p
      className={`font-semibold mt-1 text-lg ${
        application.shortListed ? "text-green-300" : "text-gray-200"
      }`}
    >
      {application.shortListed ? "✅ Shortlisted" : "⏳ Under Review"}
    </p>
  </div>
  <button
    onClick={handleShorlisted}
    className={`mt-4 sm:mt-0 px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out ${
      application.shortListed
        ? "bg-gray-300 text-black hover:bg-gray-400" 
        : "bg-white text-black hover:bg-green-950 hover:text-white" 
    }`}
  >
    {application.shortListed ? "Shortlisted" : "Shortlist"}
  </button>
</div>
      <div className="p-2 md:p-6">
        <div className="p-2 md:p-6">
         
          <div className="mb-8 bg-gray-50 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Applied Job Details</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-700">Company Name</p>
                <p className="font-semibold">{job?.companyName || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-700">Company Email</p>
                <p className="font-semibold">{job?.companyEmail || "N/A"}</p>
              </div>
              {job?.companyURL && (
                <div>
                  <p className="text-gray-700">Company Website</p>
                  <a href={job.companyURL} target="_blank" rel="noopener noreferrer" className="text-black-600 hover:underline">
                    {job.companyURL}
                  </a>
                </div>
              )}
            </div>
          </div>

      
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 gap-6">
        
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Personal Information</h3>
                <p className="font-semibold">{applicant.fullName || "N/A"}</p>
                <p className="text-gray-700">{applicant.email || "N/A"}</p>
                <p className="text-gray-700">{applicant.phoneNumber || "N/A"}</p>
                <p className="text-gray-700">{applicant.gender || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Address</h3>
                <p className="font-semibold">{applicant.address || "N/A"}</p>
                <p className="font-semibold">{applicant.city || "N/A"}</p>
                <p className="font-semibold">{applicant.state || "N/A"}</p>
                <p className="font-semibold">{applicant.country || "N/A"}</p>
              </div>
            </div>

   
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Summary</h3>
                <p className="text-gray-700">{applicant.summary || "No summary provided"}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Education</h3>
                <p className="font-semibold">{applicant.eduDegree || "N/A"}</p>
                <p className="text-gray-700">{applicant.eduInstitution || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Experience</h3>
                <p className="font-semibold">{applicant.expPosition || "N/A"}</p>
                <p className="text-gray-700">{applicant.expCompany || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 p-6 grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(applicant.skills) && applicant.skills.length > 0 ? (
                      applicant.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-green-200 text-green-800 rounded-full">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-600">No skills listed</p>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Links</h3>
                  {applicant.projectUrl ? (
                    <a href={applicant.projectUrl} target="_blank" rel="noopener noreferrer" className="text-black-600 hover:underline">
                      {applicant.projectUrl}
                    </a>
                  ) : (
                    <p className="text-black-600">No project URL provided</p>
                  )}
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>

);
};

export default Applicant;