import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Search, User, Bookmark, FileText ,LogOut} from "lucide-react";

const TotalShortlisted = () => {
  const [totalShortlisted, setTotalApplicants] = useState(0);
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

      setTotalApplicants(result.statistics?.totalShortlisted || 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
     
      {loading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (

        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center transform hover:scale-105 transition duration-300">
          <div>
            <div className="text-3xl font-bold text-gray-900">{totalShortlisted.toLocaleString()}</div>
            <div className="text-gray-600">Shortlisted</div>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <Bookmark />
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalShortlisted;