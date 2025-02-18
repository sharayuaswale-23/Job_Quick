import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  MapPin,Briefcase, GraduationCap,
  Star, Phone,
} from "lucide-react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import Hostersidebar from "../Hostersidebar/Hostersidebar";

const ViewApplicant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("all"); 

  const token = Cookies.get("jwtToken");

  const fetchApplicants = async (mode) => {
    if (!token) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    try {
      const url = `https://jobquick.onrender.com/applicants?jobId=${id}${
        mode === "shortlisted" ? "&shortListed=true" : ""
      }`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applicants");
      }

      const data = await response.json();
      console.log(data);
      setApplicants(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchApplicants(viewMode);
    }
  }, [id, token, viewMode]);

  const handleViewProfile = (application) => {
    navigate(`/applicant/${application._id}`, { state: { application } });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          {/* <p className="text-lg text-gray-600">Loading applicants...</p> */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <p className="text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 w-62 lg:w-80 h-screen">
        <Hostersidebar />
      </div>

      <div className="ml-62 pt-20 lg:pt-20 lg:ml-64 flex-1 min-h-screen bg-gray-100 p-4 lg:p-8">
  <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-4 lg:p-6">
    

    <div className="flex flex-col sm:flex-row items-center justify-between pb-5 border-b">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-green-600" /> Job Applications
      </h2>
    </div>

 
    <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-4">
      <button
        className={`px-6 py-2 text-lg font-semibold rounded-lg transition-all shadow-sm ${
          viewMode === "all"
            ? "bg-green-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        onClick={() => setViewMode("all")}
      >
        Job Applicants
        {viewMode === "all" && (
          <span className="left-1/2 -bottom-1 transform -translate-x-1/2 w-3/4 bg-green-600 rounded-full"></span>
        )}
      </button>

      <button
        className={`px-6 py-2 text-lg font-semibold rounded-lg transition-all shadow-sm ${
          viewMode === "shortlisted"
            ? "bg-green-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        onClick={() => setViewMode("shortlisted")}
      >
        Shortlisted
        {viewMode === "shortlisted" && (
          <span className="left-1/2 -bottom-1 transform -translate-x-1/2 w-3/4 bg-green-600 rounded-full"></span>
        )}
      </button>
    </div>

    <div className="mt-6">
      {applicants.length === 0 ? (
        <p className="text-center text-gray-600">
          {viewMode === "shortlisted"
            ? "No shortlisted applicants yet."
            : "No applicants yet."}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applicants.map((application) => (
            <div
              key={application._id}
              className="bg-gray-50 border rounded-lg p-4 lg:p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
             
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <User className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {application?.applicantId?.fullName || "N/A"}
                    </h3>
                   
                  </div>
                </div>

              
                <div>
                  {application.shortListed ? (
                    <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-sm font-semibold">
                      ✅ Shortlisted
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
                      🔄 Under Review
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5" />
                  <span>{application?.applicantId?.phoneNumber || "N/A"}</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5" />
                  <span>{application?.applicantId?.city || "N/A"}</span>
                </div>

            
                <div className="flex items-center gap-4">
                  <GraduationCap className="w-5 h-5" />
                  <span>{application?.applicantId?.eduDegree || "N/A"}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Briefcase className="w-5 h-5" />
                  <span>{application?.applicantId?.expPosition || "N/A"}</span>
                </div>
             
            
                <div className="col-span-1 sm:col-span-2 flex items-start gap-4 rounded-lg">
                  <Mail className="w-5 h-5 mt-1" />
                    <p className="text-sm text-gray-500">
                      {application?.applicantId?.email || "N/A"}
                    </p>
                </div>
                <div className="col-span-1 sm:col-span-2 flex items-start gap-4 pb-4 rounded-lg">
                  <Star className="w-5 h-5 mt-1" />
                  <div>
                    <p className="text-sm mb-4 font-semibold text-gray-600">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {application?.applicantId?.skills?.length > 0 ? (
                        application.applicantId.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleViewProfile(application)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>

    </div>
  );
};

export default ViewApplicant;