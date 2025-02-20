import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const Table = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasRealData, setHasRealData] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    totalItems: 0,
    totalPages: 1,
  });

  const HostId = Cookies.get("userId");
  const HostToken = Cookies.get("jwtToken");

  const sampleApplications = [
    {
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      company: "TechCorp",
      position: "Frontend Developer",
      type: "Full-time",
      contact: "+1 (555) 000-0000",
      status: "Shortlisted",
      applicantName: "John Smith",
      logo: "blue",
    },
    {
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      company: "DataSystems",
      position: "Data Analyst",
      type: "Remote",
      contact: "+1 (555) 000-0001",
      status: "Under Review",
      applicantName: "Emma Wilson",
      logo: "purple",
    },
    {
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      company: "DesignHub",
      position: "UI/UX Designer",
      type: "Part-time",
      contact: "+1 (555) 000-0002",
      status: "Shortlisted",
      applicantName: "Michael Brown",
      logo: "emerald",
    },
  ];

  const fetchApplications = async (page = 1) => {
    setLoading(true);
    try {
      const shortlisted =
        statusFilter === "shortlisted"
          ? true
          : statusFilter === "underReview"
          ? false
          : "";

      const dashboardTableApi = `https://jobquick.onrender.com/job/table/${HostId}?page=${page}${
        statusFilter !== "all" ? `&shortlisted=${shortlisted}` : ""
      }`;

      const response = await fetch(dashboardTableApi, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${HostToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("table", data);

      if (
        data.success &&
        Array.isArray(data.applicants) &&
        data.applicants.length > 0
      ) {
        const formattedApplications = data.applicants.map((app) => ({
          date: new Date(app.dateApplied).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          company: app.jobId.companyName,
          position: app.jobId.title,
          type: app.jobId.jobType,
          contact: app.applicantId.phoneNumber,
          status: app.shortListed ? "Shortlisted" : "Under Review",
          applicantName: app.applicantId.fullName,
          logo: [
            "blue",
            "purple",
            "indigo",
            "emerald",
            "amber",
            "teal",
            "rose",
            "cyan",
          ][Math.floor(Math.random() * 8)],
        }));

        setApplications(formattedApplications);
        setPagination(data.pagination);
        setHasRealData(true);
      } else {
        setApplications(sampleApplications);
        setHasRealData(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setApplications(sampleApplications);
      setHasRealData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(1);
  }, [statusFilter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "Pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const LogoIcon = ({ color, company }) => {
    const getLogoColor = (color) => {
      const colors = {
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        indigo: "bg-indigo-500",
        emerald: "bg-emerald-500",
        amber: "bg-amber-500",
        teal: "bg-teal-500",
        rose: "bg-rose-500",
        cyan: "bg-cyan-500",
      };
      return colors[color] || "bg-gray-500";
    };

    return (
      <div
        className={`w-10 h-10 rounded-xl ${getLogoColor(
          color
        )} flex items-center justify-center shadow-sm`}
      >
        <span className="text-white font-semibold text-lg">
          {company.charAt(0)}
        </span>
      </div>
    );
  };

  const handlePageChange = (newPage) => {
    fetchApplications(newPage);
  };

  const PaginationControls = () => (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            pagination.hasPrevPage
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            pagination.hasNextPage
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pagination.currentPage - 1) * 10 + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(pagination.currentPage * 10, pagination.totalItems)}
            </span>{" "}
            of <span className="font-medium">{pagination.totalItems}</span>{" "}
            results
          </p>
        </div>
        {/* <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !pagination.hasPrevPage && "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {[...Array(pagination.totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`relative inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pagination.currentPage === idx + 1
                    ? "bg-green-500 text-white shadow-sm"
                    : "bg-white border border-green-200 text-green-800 hover:bg-green-50 focus:ring-2 focus:ring-green-300 focus:outline-none"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !pagination.hasNextPage && "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div> */}
        <div className="flex items-center justify-center space-x-2 py-4">
      <nav className="flex items-center space-x-1" aria-label="Pagination">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className={`
            relative inline-flex items-center px-3 py-2 text-sm font-medium
            rounded-lg transition-all duration-200 ease-in-out
            ${!pagination.hasPrevPage 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200"}
          `}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {[...Array(pagination.totalPages)].map((_, idx) => {
            const pageNumber = idx + 1;
            const isCurrentPage = pagination.currentPage === pageNumber;

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`
                  relative inline-flex items-center justify-center
                  min-w-[2rem] h-8 text-sm font-medium
                  rounded-full transition-all duration-200 ease-in-out
                  ${isCurrentPage
                    ? "bg-green-500 text-white shadow-md transform scale-105"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-green-50 hover:text-green-600 hover:border-green-200"}
                `}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className={`
            relative inline-flex items-center px-3 py-2 text-sm font-medium
            rounded-lg transition-all duration-200 ease-in-out
            ${!pagination.hasNextPage
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200"}
          `}
        >
        <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
      </div>
    </div>
  );

  const filteredApplications = applications.filter(
    (app) =>
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-gray-600">
            Loading applications...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Job Applications
              </h2>
              {!hasRealData && (
                <p className="text-sm text-gray-500 mt-1">
                  Sample data shown. Your actual applications will appear here
                  once you receive them.
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Applications</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="underReview">Pending</option>
              </select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-sm border border-green-100">
          <table className="w-full">
            <thead>
              <tr className="bg-green-100/80">
                {[
                  "Sr. No.",
                  "Date",
                  "Company",
                  "Applicant",
                  "Position",
                  "Job Type",
                  "Contact",
                  "Status",
                ].map((header) => (
                  <th key={header} className="text-left py-4 px-4 font-medium text-green-800">
                      {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app, index) => (
                <tr key={index} className={`border-b ${
                  index % 2 === 0 
                    ? 'bg-white hover:bg-green-100/30' 
                    : 'bg-green-50/40 hover:bg-green-100/30'
                }`}>
                <td className="py-4 px-4 text-gray-700">
                {(pagination.currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                  {new Date(app.date).toLocaleDateString()}, {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900">
                          {app.company}
                        </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {app.applicantName}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {app.position}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {app.type}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {app.contact}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                        app.status = app.status === "Under Review" ? "Pending" : app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No applications found matching your search.
              </p>
            </div>
          )}
        </div>

        {hasRealData && <PaginationControls />}
      </div>
    </div>
  );
};

export default Table;