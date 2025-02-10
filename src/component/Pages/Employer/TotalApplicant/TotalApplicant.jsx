import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { IoSearch } from "react-icons/io5";
import { Search, User, Bookmark, FileText ,LogOut} from "lucide-react";

const TotalApplicant = () => {
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [totalJobs, setJobTotalApplicants] = useState(0);
  const [totalShortlisted, setTotalJobApplicants] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("jwtToken");

    if (!userId || !token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://jobquick.onrender.com/job/createdby/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch statistics");
      }

      setTotalApplicants(result.statistics?.totalApplicants || 0);
      setJobTotalApplicants(result.statistics?.totalJobs || 0);
      setTotalJobApplicants(result.statistics?.totalShortlisted || 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      
      { error ? (
        <p className="text-red-500">{error}</p>
      ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center transform hover:scale-105 transition duration-300">
          <div>
            <div className="text-3xl font-bold text-gray-900">{totalApplicants.toLocaleString()}</div>
            <div className="text-gray-600">Applications</div>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <Search />
          </div>
        </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center transform hover:scale-105 transition duration-300">
                          <div>
                            <div className="text-3xl font-bold text-gray-900">{totalJobs.toLocaleString()}</div>
                            <div className="text-gray-600">TotalJobs</div>
                          </div>
                          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                            <User />
                          </div>
                        </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center transform hover:scale-105 transition duration-300">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{totalShortlisted.toLocaleString()}</div>
                      <div className="text-gray-600">Shortlisted</div>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                      <Bookmark />
                    </div>
                  </div>
    </div>

      )}
    </div>
  );
};

export default TotalApplicant;