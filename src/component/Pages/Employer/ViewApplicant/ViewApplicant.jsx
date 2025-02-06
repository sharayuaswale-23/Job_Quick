import React, { useEffect, useState } from 'react';
import { Mail, User, Briefcase, GraduationCap, MapPin, Star } from 'lucide-react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import Hostersidebar from '../Hostersidebar/Hostersidebar';

const ViewApplicant = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [shortlistedIds, setShortlistedIds] = useState([]);

  const toggleShortlist = (id) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  
  const token = Cookies.get("jwtToken");

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!token) {
        setError("Authentication required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://jobquick.onrender.com/applicants?jobId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applicants");
        }

        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          const applicantDetails = data
            .map((application) => application.applicantId)
            .filter((applicant) => applicant !== null && applicant !== undefined);

          setApplicants(applicantDetails);
        } else {
          setApplicants([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchApplicants();
    }
  }, [id, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-green-700">Loading applicants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <p className="text-2xl text-red-500 mb-4">
            {error}
          </p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Hostersidebar/>

    <div className="min-h-screen pt-20 lg:pt-4 lg:ml-64 bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-200 px-6 py-5 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <User className="w-8 h-8" />
              Job Applicants
            </h2>
          </div>

          <div className="p-6">
            {applicants.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-500">No applicants yet</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applicants.map((applicant) => {
                  const isExpanded = expandedId === applicant?._id;
                  const isShortlisted = shortlistedIds.includes(applicant?._id);

                  return (
                    <div
                      key={applicant?._id}
                      className={`bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 ${
                        isExpanded ? "h-auto" : "h-fit"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-3 rounded-full">
                            <User className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="w-full">
                            <p className="font-semibold text-gray-900 text-lg">
                              {applicant?.fullName || "N/A"}
                            </p>
                            <p className="text-sm text-gray-500 truncate max-w-full overflow-hidden whitespace-nowrap">
                              {applicant?.email || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-500">Skills</p>
                            <p className="font-medium text-gray-900">
                              {applicant?.skills?.join(", ") || "N/A"}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setExpandedId(isExpanded ? null : applicant?._id)
                          }
                          className="mt-4 text-green-600 font-semibold cursor-pointer"
                        >
                          {isExpanded ? "View Less" : "View More"}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 space-y-3">
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-green-600" />
                              <div>
                                <p className="text-xs text-gray-500">City</p>
                                <p className="font-medium text-gray-900">
                                  {applicant?.city || "N/A"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <GraduationCap className="w-5 h-5 text-green-600" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Education
                                </p>
                                <p className="font-medium text-gray-900">
                                  {applicant?.eduDegree
                                    ? `${applicant.eduDegree} - ${applicant.eduSpecialisation}`
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Briefcase className="w-5 h-5 text-green-600" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Experience
                                </p>
                                <p className="font-medium text-gray-900">
                                  {applicant?.expPosition
                                    ? `${applicant.expPosition} at ${applicant.expCompany}`
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Shortlist Button */}
                        <button
                          onClick={() => toggleShortlist(applicant?._id)}
                          className={`w-full mt-4 py-2 px-4 text-white font-semibold rounded-lg transition-all duration-300 ${
                            isShortlisted
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gray-400 hover:bg-gray-500"
                          }`}
                        >
                          {isShortlisted ? "Shortlisted" : "Shortlist"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default ViewApplicant;