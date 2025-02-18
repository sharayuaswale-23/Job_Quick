import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";

const Table = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const HostId = Cookies.get("userId");
  const HostToken = Cookies.get("jwtToken");
  const dashboardTableApi = `https://jobquick.onrender.com/job/table/${HostId}`;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(dashboardTableApi, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${HostToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        console.log(data);
        
        // Extract and transform the applicants data
        if (data.success && Array.isArray(data.applicants)) {
          const formattedApplications = data.applicants.map(app => ({
            date: new Date(app.dateApplied).toLocaleString(),
            company: app.jobId.companyName,
            position: app.jobId.title,
            type: app.jobId.jobType, // You might want to get this from the API if available
            contact: app.applicantId.phoneNumber,
            status: app.shortListed ? 'Shortlisted' : 'Pending',
            applicantName: app.applicantId.fullName,
            // Assign a random color for the logo since it's not in the API data
            logo: ['blue', 'purple', 'darkblue', 'green', 'yellow', 'teal', 'lime', 'pink'][
              Math.floor(Math.random() * 8)
            ]
          }));
          
          setApplications(formattedApplications);
        } else {
          setApplications([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [dashboardTableApi, HostToken]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-gray-100 text-gray-600';
      case 'shortlisted':
        return 'bg-green-200 text-black';
      case 'on hold':
        return 'bg-teal-100 text-teal-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const LogoIcon = ({ color }) => {
    const getLogoColor = (color) => {
      const colors = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        darkblue: 'bg-indigo-700',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        teal: 'bg-teal-500',
        lime: 'bg-lime-500',
        pink: 'bg-pink-500'
      };
      return colors[color] || 'bg-gray-500';
    };

    return (
      <div className={`w-10 h-10 rounded-lg ${getLogoColor(color)} flex items-center justify-center`}>
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 flex justify-center items-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 flex justify-center items-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 flex justify-center items-center">
        <div className="text-gray-600">No applications found</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-green-50/20">
 <div className="overflow-x-auto rounded-lg shadow-sm border border-green-100">
  <table className="w-full">
    <thead>
      <tr className="bg-green-100/80">
        <th className="text-left py-4 px-4 font-medium text-green-800">Sr.No.</th>
        <th className="text-left py-4 px-4 font-medium text-green-800">Date Applied</th>
        <th className="text-left py-4 px-4 font-medium text-green-800">Company</th>
        <th className="text-left py-4 px-4 font-medium text-green-800">Applicant</th>
        <th className="text-left py-4 px-4 font-medium text-green-800">Position</th>
        <th className="text-left py-4 px-4 font-medium text-green-800">Job Type</th>
        <th className="text-left py-4 px-4 font-medium text-green-800">Contact</th>
        <th className="text-left py-4 px-4 font-medium text-green-800">Status</th>
      </tr>
    </thead>
    <tbody>
      {applications
        .slice((currentPage - 1) * 7, currentPage * 7)
        .map((app, index) => (
        <tr key={index} className={`border-b border-green-100 ${index % 2 === 0 ? 'bg-white' : 'bg-green-50/20'} hover:bg-green-100/30`}>
          <td className="py-4 px-4 text-gray-700 font-medium">{(currentPage - 1) * 7 + index + 1}</td>
          <td className="py-4 px-4 text-gray-700">
          {new Date(app.date).toLocaleDateString()}, {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </td>
          <td className="py-4 px-4">
            <div className="flex items-center gap-3">
              {/* <LogoIcon color={app.logo} /> */}
              <span className="font-medium text-gray-900">{app.company || 'N/A'}</span>
            </div>
          </td>
          <td className="py-4 px-4 text-gray-700">{app.applicantName || 'N/A'}</td>
          <td className="py-4 px-4 text-gray-700">{app.position || 'N/A'}</td>
          <td className="py-4 px-4 text-gray-700">{app.type || 'N/A'}</td>
          <td className="py-4 px-4 text-gray-700">{app.contact || 'N/A'}</td>
          <td className="py-4 px-4">
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(app.status)}`}>
              {app.status || 'N/A'}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  <div className="mt-4 flex justify-between items-center">
    <span className="text-sm text-gray-500">
    Showing {Math.min(applications.slice((currentPage - 1) * 7, currentPage * 7).length)} of {applications.length} applications
    </span>
    <div className="flex items-center space-x-1.5">
      <button
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className={`relative inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          currentPage === 1
            ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
            : 'text-gray-600 bg-white border border-green-200 hover:bg-green-50 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-400 focus:outline-none'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Prev</span>
      </button>
      
      <div className="flex items-center space-x-1">
        {[...Array(Math.ceil(applications.length / 7))].map((_, i) => {
          // Show first page, last page, current page, and pages around current
          if (
            i === 0 ||
            i === Math.ceil(applications.length / 7) - 1 ||
            (i >= currentPage - 2 && i <= currentPage)
          ) {
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === i + 1
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'bg-white border border-green-200 text-green-800 hover:bg-green-50 focus:ring-2 focus:ring-green-300 focus:outline-none'
                }`}
              >
                {i + 1}
              </button>
            );
          } else if (i === currentPage + 1 || i === 1) {
            // Show ellipsis
            return (
              <span
                key={i}
                className="flex items-center justify-center w-6 h-8 text-gray-500"
              >
                ...
              </span>
            );
          }
          return null;
        })}
      </div>
      
      <button
        onClick={() => setCurrentPage(p => Math.min(Math.ceil(applications.length / 7), p + 1))}
        disabled={currentPage === Math.ceil(applications.length / 7)}
        className={`relative inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          currentPage === Math.ceil(applications.length / 7)
            ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
            : 'text-gray-600 bg-white border border-green-200 hover:bg-green-50 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-400 focus:outline-none'
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</div>
  );
};

export default Table;