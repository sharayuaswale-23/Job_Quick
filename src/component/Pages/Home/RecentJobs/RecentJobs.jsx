import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../../../assets/Images/companylogo.jpg";

const RecentJobs = (job) => {

  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (jobTitle) => {
    setSearchInput(jobTitle); // Update the search input state
    navigate(`/category?title=${encodeURIComponent(jobTitle)}`);
  };


  const jobs = [
    {
      title: "DEVOPS ENGINEER",
      company: "DevOps Edge Solutions",
      location: "Seattle, USA",
      proposals: "Apply",
      posted: "2 days ago",
      logo: logo,
    },
    {
      title: "DATA SCIENTIST",
      company: "Microsoft",
      location: "Redmond, WA, USA",
      proposals: "Apply",
      posted: "5 days ago",
      logo: logo,
    },
    {
      title: "CLOUD SOLUTIONS ARCHITECT",
      company: "Meta",
      location: "Menlo Park, CA, USA",
      proposals: "Apply",
      posted: "1 week ago",
      logo: logo,
    },
    {
      title: "CYBERSECURITY ENGINEER",
      company: "Amazon",
      location: "Seattle, WA, USA",
      proposals: "Apply",
      posted: "3 days ago",
      logo: logo,
    },
    {
      title: "CLOUD ENGINEER",
      company: "TCS",
      location: "Mumbai",
      proposals: "Apply",
      posted: "4 days ago",
      logo: logo,
    },
    {
      title: "TAX ANALYST",
      company: "TaxMaster Consultants",
      location: "New Delhi",
      proposals: "Apply",
      posted: "2 weeks ago",
      logo: logo,
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Recent Job Listings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
        {jobs.map((job, index) => (
          <div
          to="/category"
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl relative"
          >
      
            <div className="absolute top-[-25px] left-6 w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center">
              <img
                src={job.logo}
                alt={`${job.company} Logo`}
                className="w-full h-full rounded-full object-contain"
              />
            </div>
          
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{job.company}</p>
              <p className="text-gray-400 text-sm mt-1 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {job.location}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">{job.posted}</span>
                <span className="text-sm bg-green-100 text-green-600 px-4 py-2 rounded-full">
                 <button onClick={() => handleSearch(job.company)}>{job.proposals}</button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
