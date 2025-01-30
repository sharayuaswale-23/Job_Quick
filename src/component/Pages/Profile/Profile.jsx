


import React, { useState } from "react";
import { motion } from "framer-motion";
import Myimg from "../../../assets/Images/Profile.jpg";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isAccomplishmentsOpen, setIsAccomplishmentsOpen] = useState(false);
  const [isCertificationOpen, setIsCertificationOpen] = useState(false);

  return (
    <>
    <Header />
    <div className="min-h-screen mt-20 bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Main Content */}
        <div className="p-6  lg:flex lg:space-x-6">
          {/* Left Section */}
          <div className="lg:w-1/3 flex flex-col items-center lg:items-center lg:justify-start text-center">
            <img
              src={Myimg}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full border-4 border-indigo-500"
            />
            <div className="p-6 text-indigo-500 text-center">
              <h1 className="text-2xl font-bold">Sharayu Aswale</h1>
              <p className="text-sm">Frontend Developer</p>
              <button 
                   onClick={() => setIsEditing(true)}
                   className="mt-4 px-8 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-600 transition-all"
                 >
                   <Link to="/userdetails">Edit Profile</Link>
                 </button>
            </div>
            <p className="text-gray-600 mt-4">
              Full stack product designer with hands-on experience in solving problems for clients ranging from Real Estate, Hospitality, Rentals, and more.
            </p>
            <div className="mt-4 items-center mb-4">
              <h3 className="text-indigo-500 font-semibold mb-2 text-center">Skills</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {["UI Design", "UX", "Adobe XD", "Wireframing", "User Research"].map((skill) => (
                  <span
                    key={skill}
                    className="bg-indigo-100 text-indigo-600 text-sm px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-2/3">
          <div className="bg-gray-50 mb-6 rounded-lg shadow max-w-4xl w-full p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
          <div>
            <p className="font-semibold">AGE</p>
            <p>23 years</p>
          </div>
          <div>
            <p className="font-semibold">YEARS OF EXPERIENCE</p>
            <p>Fresher</p>
          </div>
          <div>
            <p className="font-semibold">PHONE</p>
            <p>+91 9999999999</p>
          </div>

          <div>
            <p className="font-semibold">CTC</p>
            {/* <p>12.5 Lac</p> */}
          </div>
          <div>
            <p className="font-semibold">LOCATION</p>
            <p>Nagpur, Maharshtra</p>
          </div>
          <div>
            <p className="font-semibold">EMAIL</p>
            <p>sharayuaswale123@gmail.com</p>
          </div>
        </div>
      </div>

            {/* Experience */}
            <div className="mb-6">
              <h3 className="text-indigo-500 font-semibold mb-4">Experience</h3>
              <div className="space-y-4">
                {[
                  {
                    company: "Infosys",
                    role: "Product & UI/UX Designer",
                    duration: "Apr 2018 - Present",
                    location: "Pune, India",
                  },
                  {
                    company: "Pixel Studio",
                    role: "UI/UX Designer",
                    duration: "Oct 2016 - Jul 2017",
                    location: "Bengaluru, India",
                  },
                  {
                    company: "Ramotion Studio",
                    role: "Web Designer",
                    duration: "Apr 2015 - Jul 2016",
                    location: "Bengaluru, India",
                  },
                ].map((exp, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-800">{exp.company}</h4>
                    <p className="text-sm text-gray-600">{exp.role}</p>
                    <p className="text-xs text-gray-500">
                      {exp.duration} | {exp.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
              <button
                onClick={() => setIsEducationOpen(!isEducationOpen)}
                className="w-full"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-indigo-500">Education</p>
                  <p><IoIosArrowDown /></p>
                </div>
              </button>
              {isEducationOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2"
                >
                 <div className="space-y-4">
                {[
                  {
                    Degree: "Btech",
                    Branch: "CSE",
                    Year: "2023",
                    College: "Priaydarshani college of Engineering Nagpur",
                  },
                  {
                    Degree: "Mtech",
                    Branch: "CSE",
                    Year: "2025",
                    College: "Priaydarshani college of Engineering Nagpur",
                  },
                ].map((exp, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-800">{exp.College}</h4>
                    <p className="text-sm text-gray-600">{exp.Degree}</p>
                    <p className="text-xs text-gray-500">
                      {exp.Branch} | {exp.Year}
                    </p>
                  </div>
                ))}
              </div>
                </motion.div>
              )}
            </div>

            {/* Accomplishments */}
            <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
              <button
                onClick={() => setIsAccomplishmentsOpen(!isAccomplishmentsOpen)}
                className="w-full"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-indigo-500">Accomplishments</p>
                  <p><IoIosArrowDown /></p>
                </div>
              </button>
              {isAccomplishmentsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2"
                >
                  <div className="space-y-4">
                {[
                  {
                    Project: "Redesign of major e-commerce platform",
                  },
                  {
                    Project: "Redesign of Hospital Management System",
                  },
                ].map((exp, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-800">{exp.Project}</h4>
                  </div>
                ))}
              </div>
                </motion.div>
              )}
            </div>

            {/* Certification */}
            <div className=" bg-gray-50 p-4 rounded-lg shadow">
              <button
                onClick={() => setIsCertificationOpen(!isCertificationOpen)}
                className="w-full"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-indigo-500">Certification</p>
                  <p><IoIosArrowDown /></p>
                </div>
              </button>
              {isCertificationOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2"
                >
                 <div className="space-y-4">
                {[
                  {
                    Certificate: "Certified UX Designer - ABC Institute",
                    Issued: "2021",
                  },
                  {
                    Certificate: "Certified Backend Developer - ABC Institute",
                    Issued: "2023",
                  },
                ].map((exp, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-800">{exp.Certificate}</h4>
                    <p className="text-sm text-gray-600">{exp.Issued}</p>
                  </div>
                ))}
              </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
    <Footer />
    </>

  );
};

export default Profile;


