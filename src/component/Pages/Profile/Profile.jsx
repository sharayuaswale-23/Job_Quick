// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Header from "../../common/header/Header";
// import Footer from "../../common/Footer/Footer";

// const Profile = () => {
//   const [userData, setUserData] = useState(() => {
//     const savedData = localStorage.getItem("userProfile");
//     return savedData ? JSON.parse(savedData) : null;
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     designation: "",
//     age: "",
//     email: "",
//     address: "",
//     phone: "",
//     skills: "",
//     experience: "",
//     activities: "",
//     photo: "",
//   });

//   useEffect(() => {
//     if (userData) {
//       setFormData(userData);
//     }
//   }, [userData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData({ ...formData, photo: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setUserData(formData);
//     localStorage.setItem("userProfile", JSON.stringify(formData));
//     setIsEditing(false);
//   };

//   return (
//     <>
//       <Header />
//       <div className="mt-20 min-h-screen bg-gradient-to-b from-blue-400 to-indigo-100 flex items-center justify-center p-4">
//         <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-6xl">
//           {!isEditing ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex flex-col lg:flex-row items-center lg:items-start gap-12"
//             >
//               {/* Profile Section */}
//               <div className="w-full lg:w-1/3 text-center">
//                 <div className="relative">
//                   <img
//                     src={
//                       formData.photo ||
//                       "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
//                     }
//                     alt="Profile"
//                     className="w-40 h-40 mx-auto rounded-full shadow-xl border-4 border-indigo-500"
//                   />
                 
//                 </div>
//                 <h2 className="text-2xl font-extrabold mt-4 text-gray-800">
//                   {formData.name || "Your Name"}
//                 </h2>
//                 <p className="text-gray-600 font-medium">
//                   {formData.designation || "Your Designation"}
//                 </p>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="mt-6 px-8 py-3 bg-indigo-500 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-600 transition-all"
//                 >
//                   Edit Profile
//                 </button>
//               </div>

//               {/* Details Section */}
//               <div className="w-full lg:w-2/3">
//                 {/* Personal Details */}
//                 <div className="mb-8">
//                   <h3 className="text-lg font-semibold text-indigo-700 mb-4">
//                     Personal Details
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     {[
//                       { label: "Age", value: formData.age || "Not Provided" },
//                       { label: "Email", value: formData.email || "Not Provided" },
//                       { label: "Address", value: formData.address || "Not Provided" },
//                       { label: "Phone", value: formData.phone || "Not Provided" },
//                     ].map((item) => (
//                       <div key={item.label} className="flex flex-col">
//                         <p className="text-gray-500 text-sm">{item.label}:</p>
//                         <p className="text-gray-900 font-semibold">{item.value}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Skills */}
//                 <div className="mb-8">
//                   <h3 className="text-lg font-semibold text-indigo-700 mb-4">Skills</h3>
//                   <p className="text-gray-800 text-sm">
//                     {formData.skills || "Not Provided"}
//                   </p>
//                 </div>

//                 {/* Work Experience */}
//                 <div className="mb-8">
//                   <h3 className="text-lg font-semibold text-indigo-700 mb-4">
//                     Work Experience
//                   </h3>
//                   <p className="text-gray-800 text-sm">
//                     {formData.experience || "Not Provided"}
//                   </p>
//                 </div>

//                 {/* Last Activities */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-indigo-700 mb-4">
//                     Last Activities
//                   </h3>
//                   <p className="text-gray-800 text-sm">
//                     {formData.activities || "Not Provided"}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.form
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               onSubmit={handleSubmit}
//               className="space-y-8"
//             >
//               {/* Form Inputs */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//                 {[
//                   { label: "Name", name: "name", type: "text" },
//                   { label: "Designation", name: "designation", type: "text" },
//                   { label: "Age", name: "age", type: "text" },
//                   { label: "Email", name: "email", type: "email" },
//                   { label: "Address", name: "address", type: "text" },
//                   { label: "Phone", name: "phone", type: "text" },
//                 ].map((input) => (
//                   <div key={input.name} className="flex flex-col">
//                     <label className="font-semibold text-sm text-gray-600">
//                       {input.label}
//                     </label>
//                     <input
//                       type={input.type}
//                       name={input.name}
//                       value={formData[input.name]}
//                       onChange={handleInputChange}
//                       className="border rounded-lg p-3 focus:ring focus:ring-indigo-300"
//                     />
//                   </div>
//                 ))}
//                 <div className="flex flex-col">
//                   <label className="font-semibold text-sm text-gray-600">Photo</label>
//                   <input
//                     type="file"
//                     onChange={handlePhotoChange}
//                     className="border rounded-lg p-3 focus:ring focus:ring-indigo-300"
//                   />
//                 </div>
//               </div>

//               {/* Text Areas */}
//               {[
//                 { label: "Skills", name: "skills" },
//                 { label: "Work Experience", name: "experience" },
//                 { label: "Last Activities", name: "activities" },
//               ].map((textarea) => (
//                 <div key={textarea.name} className="flex flex-col">
//                   <label className="font-semibold text-sm text-gray-600">
//                     {textarea.label}
//                   </label>
//                   <textarea
//                     name={textarea.name}
//                     value={formData[textarea.name]}
//                     onChange={handleInputChange}
//                     className="border rounded-lg p-3 h-24 focus:ring focus:ring-indigo-300"
//                   />
//                 </div>
//               ))}

//               <button
//                 type="submit"
//                 className="w-full px-6 py-3 bg-indigo-500 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-600 transition-all"
//               >
//                 Save Profile
//               </button>
//             </motion.form>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Profile;



import React, { useState } from "react";
import { motion } from "framer-motion";
import Myimg from "../../../assets/Images/Profile.jpg";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import { IoIosArrowDown } from "react-icons/io";

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
                   Edit Profile
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
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
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
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
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
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
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


