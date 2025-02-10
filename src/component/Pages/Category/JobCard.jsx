import React from "react";
import { Link } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserClock } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import logo from "../../../assets/Images/companylogo.jpg";

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between items-start hover:shadow-lg transition-shadow bg-white w-full">
      <div className="flex flex-col sm:flex-row w-full mb-4">
        <img
          src={logo}
          alt={`${job.companyName} logo`}
          className="w-full sm:w-24 h-auto rounded-lg object-cover mb-4 sm:mb-0 sm:mr-4"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{job.title.toUpperCase()}</h3>
          <p className="text-gray-500 font-semibold mb-1">{job.companyName}</p>
          <span className="text-gray-500 font-semibold">
            {new Date(job.dateCreated).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="bg-white w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <div className="flex items-center mb-3">
              <FaUserClock className="w-6 h-6 text-blue-500 mr-3" />
              <span className="text-gray-700 font-semibold">{job.jobType}</span>
            </div>
            <div className="flex items-center mb-3">
              <GiWallet className="w-6 h-6 text-blue-500 mr-3" />
              <span className="text-gray-700 font-semibold">${job.minPackage} - ${job.maxPackage}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-3">
              <IoLocationOutline className="w-6 h-6 text-blue-500 mr-3" />
              <span className="text-gray-700 font-semibold">{job.location.toUpperCase()}</span>
            </div>
            <div className="flex items-center mb-3">
              <GrUserWorker className="w-6 h-6 text-blue-500 mr-3" />
              <span className="text-gray-700 font-semibold">{job.experience}</span>
            </div>
          </div>
        </div>
      </div>

      <Link to={`/job/${job._id}`} className="block w-full">
        <button className="mt-4 px-2 py-2 p-2 bg-blue-500 text-white rounded-lg text-base font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
          View Job Details
        </button>
      </Link>
    </div>
  );
};

export default JobCard;