import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Images/companylogo.jpg";
import { BsArrowRight } from "react-icons/bs";

const JobCard = ({ job }) => {
  return (

    <div className="w-full bg-white rounded-xl shadow-lg border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:shadow-xl transition-shadow duration-300">
      
  
    <div className="flex items-start w-full md:w-3/4">
  
      <img
        src={logo}
        alt="Company Logo"
        className="w-14 h-14 rounded-full object-cover shadow-md"
      />

    
      <div className="ml-5 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start w-full">
          
     
          <div>
            <h3 className="text-xl font-bold text-gray-900">{job.title.toUpperCase()}</h3>
            <p className="text-gray-500 text-sm">{job.companyName}</p>
          </div>

         
        <div className="text-sm text-gray-700 mt-4 lg:mt-0 mb-3">
          <p className="flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            <span className="font-semibold">Salary:</span> <span className="ml-1">{job.minPackage} - {job.maxPackage}</span>
          </p>
          <p className="flex items-center mt-1">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            <span className="font-semibold">Date:</span> <span className="ml-1">{new Date(job.dateCreated).toLocaleDateString()}</span>
          </p>
        </div>
        </div>

     


        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-4 mt-1 py-1 text-sm bg-yellow-100 text-yellow-700 font-medium rounded-full shadow-sm">{job.jobType}</span>
          <span className="px-4 mt-1 py-1 text-sm bg-purple-100 text-purple-700 font-medium rounded-full shadow-sm">{job.location}</span>
          <span className="px-4 mt-1 py-1 text-sm bg-teal-100 text-teal-700 font-medium rounded-full shadow-sm">{job.experience}</span>
        </div>
      </div>
    </div>


    <div className="flex flex-col items-end w-full md:w-auto">
      
      <Link to={`/job/${job._id}`}>
      <button className="mt-3 flex items-center text-blue-600 font-semibold hover:text-blue-800 transition duration-300">
        Apply Now <BsArrowRight className="ml-2 text-lg" />
      </button>
      </Link>
    </div>

  </div>
  );
};

export default JobCard;