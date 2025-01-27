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

// import React from "react";
// import { motion } from "framer-motion";

// const Profile = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-400 to-indigo-100 flex flex-col">
//       {/* Navbar */}
//       <nav className="fixed top-0 w-full bg-white shadow-md z-50">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <h1 className="text-lg font-bold text-indigo-600">Profile Dashboard</h1>
//           <button className="px-4 py-2 bg-indigo-500 text-white rounded-full shadow hover:bg-indigo-600 transition">
//             Share Profile
//           </button>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 pt-20 pb-10">
//         <div className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col lg:flex-row gap-8">
//           {/* Left Section */}
//           <div className="lg:w-1/3 text-center">
//             <img
//               src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
//               alt="Profile"
//               className="w-40 h-40 mx-auto rounded-full shadow-lg border-4 border-indigo-500"
//             />
//             <h2 className="text-2xl font-extrabold mt-4 text-gray-800">Sharayu Aswale</h2>
//             <p className="text-gray-600 font-medium">Frontend Developer</p>
//             <p className="mt-4 text-sm text-gray-700">
//               Full stack product designer with hands-on experience in solving
//               problems for clients ranging from Real Estate, Hospitality, IT
//               Services, and more. A user-centered approach to design.
//             </p>
//             <div className="flex justify-center mt-6 gap-4">
//               <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">
//                 Download Resume
//               </button>
//               <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition">
//                 Send Email
//               </button>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="lg:w-2/3">
//             {/* Basic Information */}
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold text-indigo-700 mb-4">Basic Information</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {[{ label: "Age", value: "23 years" },
//                   { label: "CTC", value: "12.5 Lac" },
//                   { label: "Location", value: "Nagpur, Maharashtra" },
//                   { label: "Phone", value: "+91 8329866144 " },
//                   { label: "Email", value: "sharayuaswale123@gmail.com" }].map((info, index) => (
//                   <div key={index} className="flex flex-col">
//                     <p className="text-gray-500 text-sm">{info.label}</p>
//                     <p className="text-gray-900 font-semibold">{info.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Experience */}
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold text-indigo-700 mb-4">Experience</h3>
//               {["Infosys - Product & UI/UX Designer (2018 - Present)",
//                 "Pixel Studio - UI/UX Designer (2016 - 2018)",
//                 "Ramotion Studio - Web Designer (2015 - 2016)"].map((exp, index) => (
//                 <p key={index} className="text-gray-800 text-sm mb-2">{exp}</p>
//               ))}
//             </div>

//             {/* Skills */}
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold text-indigo-700 mb-4">Skills</h3>
//               <div className="flex flex-wrap gap-2">
//                 {["UI/UX Design", "Wireframing", "Adobe XD", "User Research", "Mobile Apps", "Information Architecture"].map((skill, index) => (
//                   <span
//                     key={index}
//                     className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Notes */}
//             <div>
//               <h3 className="text-lg font-semibold text-indigo-700 mb-4">Add Notes</h3>
//               <textarea
//                 placeholder="Add notes for future reference"
//                 className="w-full h-24 border rounded-lg p-3 focus:ring focus:ring-indigo-300"
//               ></textarea>
//               <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">
//                 Add Note
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import { motion } from "framer-motion";
import Myimg from "../../../assets/Images/Profile.jpg";

const Profile = () => {
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isAccomplishmentsOpen, setIsAccomplishmentsOpen] = useState(false);
  const [isCertificationOpen, setIsCertificationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-indigo-500 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Sharayu Aswale</h1>
          <p className="text-sm">Frontend Developer</p>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:flex lg:space-x-6">
          {/* Left Section */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <img
              src={Myimg}
              alt="Profile"
              className="w-32 h-32 mx-auto lg:mx-0 rounded-full border-4 border-indigo-500"
            />
            <p className="text-gray-600 mt-4">
              Full stack product designer with hands-on experience in solving problems for clients ranging from Real Estate, Hospitality, Rentals, and more.
            </p>
            <div className="mt-4">
              <h3 className="text-indigo-500 font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
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
            <div className="mb-6">
              <button
                onClick={() => setIsEducationOpen(!isEducationOpen)}
                className="w-full text-left font-semibold text-indigo-500 mb-2"
              >
                Education
              </button>
              {isEducationOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-50 p-4 rounded-lg shadow"
                >
                  <p className="text-gray-600">Bachelors in Design - XYZ University</p>
                  <p className="text-gray-500 text-sm">2012 - 2016</p>
                </motion.div>
              )}
            </div>

            {/* Accomplishments */}
            <div className="mb-6">
              <button
                onClick={() => setIsAccomplishmentsOpen(!isAccomplishmentsOpen)}
                className="w-full text-left font-semibold text-indigo-500 mb-2"
              >
                Accomplishments
              </button>
              {isAccomplishmentsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-50 p-4 rounded-lg shadow"
                >
                  <ul className="list-disc pl-6">
                    <li className="text-gray-600">Redesign of major e-commerce platform</li>
                    <li className="text-gray-600">Awarded "Best UI Designer" in 2020</li>
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Certification */}
            <div className="mb-6">
              <button
                onClick={() => setIsCertificationOpen(!isCertificationOpen)}
                className="w-full text-left font-semibold text-indigo-500 mb-2"
              >
                Certification
              </button>
              {isCertificationOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-50 p-4 rounded-lg shadow"
                >
                  <p className="text-gray-600">Certified UX Designer - ABC Institute</p>
                  <p className="text-gray-500 text-sm">Issued: 2021</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

