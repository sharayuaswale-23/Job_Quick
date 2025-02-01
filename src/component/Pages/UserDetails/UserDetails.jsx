// import React, { useState } from "react";
// import HeroSl from "../../../assets/Images/HomeImg.jpg";
// import HeroS2 from "../../../assets/Images/ruleimg.jpg";
// import HeroS3 from "../../../assets/Images/Profile.jpg";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import Header from "../../common/header/Header"
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import userimg from "../../../assets/Images/userdetailimg.webp";
// import Footer from "../../common/Footer/Footer";

// const UserDetails = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [image, setimage] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [city, setcity] = useState("");
//   const [workExperience, setworkExperience] = useState("");
//   const [address, setAddress] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [gender, setGender] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const SeekId = Cookies.get("userId");
//   const SeekToken = Cookies.get("jwtToken");

//   const seekDetailApi = `https://jobquick.onrender.com/seekuser/update/${SeekId}`;

//   const handleSeekData = (e) => {
//     e.preventDefault();
//     console.log("city:", city);
//     console.log("workExperience:", workExperience);
//     console.log("Address:", address);
//     console.log("PhoneNumber:", phoneNumber);
//     console.log("FullName:", fullName);

//     const details = {
//       city: city,
//       fullName: fullName,
//       address: address,
//       phoneNumber: phoneNumber,
//       workExperience: workExperience,
//       gender: gender,
//       state: state,
//       pincode: pincode,
//       country: country,
//       image: image,
//     };

//     fetch(seekDetailApi, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${SeekToken}`,
//       },
//       body: JSON.stringify(details),
//     }).then((data) => {
//       console.log(data);
//     });
//     navigate("/profile");
//   };

//   const handleNext = () => {
//     setStep(step + 1);
//   };
  
//   const handlePrevious = () => {
//     setStep(step - 1);
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col mt-10 md:flex-row justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-16 py-10">
//         {/* Left Side - Image */}
//         <div className="hidden md:block w-full  lg:w-1/2 justify-center lg:justify-end mb-6 lg:mb-0">
//           <img
//             src={userimg} // Replace with actual image URL
//             alt="Profile Preview"
//             className="w-50 h-50 md:w-full md:h-full object-cover"
//           />
//         </div> 
  


//           <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg max-w-lg sm:p-6 p-4">
//             <form onSubmit={handleSeekData}>
//               {step === 1 && (
//                 <div className="space-y-6">
//                   <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text mb-6">
//                     User Details
//                   </h2>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Upload Profile Image
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setimage(e.target.files)}
//                       className="block w-full border border-gray-300 rounded-lg shadow-sm py-1 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-gradient-to-r from-blue-400 to-blue-700 file:text-white hover:file:opacity-90"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       onChange={(e) => setFullName(e.target.value)}
//                       className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       placeholder="Enter your full name"
//                     />
//                   </div>

//                   <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
//                     <div className="flex-1">
//                       <label
//                         htmlFor="email"
//                         className="block text-sm font-medium text-gray-700 mb-2"
//                       >
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         placeholder="Enter your email"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label
//                         htmlFor="number"
//                         className="block text-sm font-medium text-gray-700 mb-2"
//                       >
//                         Phone Number
//                       </label>
//                       <input
//                         type="number"
//                         id="number"
//                         name="number"
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         placeholder="Enter your phone number"
//                         className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
//                     <div className="flex-1">
//                       <label
//                         htmlFor="date"
//                         className="block text-sm font-medium text-gray-700 mb-2"
//                       >
//                         Date of Birth
//                       </label>
//                       <input
//                         type="date"
//                         id="date"
//                         name="date"
//                         className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Gender
//                       </label>
//                       <select
//                         value={gender}
//                         onChange={(e) => setGender(e.target.value)}
//                         className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       >
//                         <option value="" disabled selected>
//                           Select your gender
//                         </option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={handleNext}
//                     className="w-full bg-gradient-to-r from-blue-400 to-blue-700 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}

//               {step === 2 && (
//                 <div className="space-y-6">
//                 <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text mb-6">
//                     User Location
//                   </h2>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       onChange={(e) => setAddress(e.target.value)}
//                       placeholder="Enter your Address"
//                       className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     />
//                   </div>
//                   <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         onChange={(e) => setcity(e.target.value)}
//                         placeholder="Enter your city"
//                         className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         PinCode
//                       </label>
//                       <input
//                         type="number"
//                         onChange={(e) => setPincode(e.target.value)}
//                         placeholder="Enter your pincode"
//                         className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Country
//                     </label>
//                     <input
//                       type="text"
//                       onChange={(e) => setCountry(e.target.value)}
//                       placeholder="Enter your country"
//                       className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     />
//                   </div>

//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       State
//                     </label>
//                     <input
//                       type="text"
//                       onChange={(e) => setState(e.target.value)}
//                       placeholder="Enter your state"
//                       className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     />
//                   </div>

//                   <div className="flex justify-between">
//                     <button
//                       type="button"
//                       onClick={handlePrevious}
//                       className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
//                     >
//                       Previous
//                     </button>

//                     <button
//                       type="button"
//                       onClick={handleNext}
//                       className=" bg-gradient-to-r from-blue-400 to-blue-700 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {step === 3 && (
//                 <>
//                   <div className="space-y-6">
//                     <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text mb-6">
//                       User Education & Skills
//                     </h2>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Education
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="Enter your education"
//                         className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Skills
//                       </label>
//                       <input
//                         type="text"
//                         id="skills"
//                         name="skills"
//                         placeholder="Enter your skills"
//                         className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Work workExperience
//                       </label>
//                       <input
//                         type="text"
//                         id="workExperience"
//                         name="workExperience"
//                         onChange={(e) => setworkExperience(e.target.value)}
//                         placeholder="Enter your work workExperience"
//                         className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       />
//                     </div>
//                     <div className="flex justify-between">
//                       <button
//                         type="button"
//                         onClick={handlePrevious}
//                         className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
//                       >
//                         Previous
//                       </button>

//                       <button
//                         type="submit"
//                         className=" bg-gradient-to-r from-blue-400 to-blue-700 text-white py-33 px-5 rounded-lg shadow-md hover:opacity-90"
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </form>
//           </div>
     
//       </div> 

//       <Footer/>


//     </>
//   );
// };

// export default UserDetails;

import React, { useState, useEffect } from "react";
import HeroSl from "../../../assets/Images/backgroundimage.jpg";
import HeroS2 from "../../../assets/Images/backgroundimage.jpg";
import HeroS3 from "../../../assets/Images/backgroundimage.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Header from "../../common/header/Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userimg from "../../../assets/Images/userdetailimg.webp";

const UserDetails = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    fullName: "",
    city: "",
    workExperience: {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
    },
    address: "",
    pincode: "",
    state: "",
    country: "",
    gender: "",
    phoneNumber: "",
    dateOfBirth: "",
    skills: [],
    education: {
      degree: "",
      institution: "",
      specialisation: "",
      startYear: "",
      endYear: "",
    },
  });

  const SeekId = Cookies.get("userNewId");
  const SeekToken = Cookies.get("userToken");
  const SeekApi = `https://jobquick.onrender.com/seekuser/update/${SeekId}`;
  const userDetailApi = `https://jobquick.onrender.com/seekuser/${SeekId}`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(userDetailApi, {
          headers: { Authorization: `Bearer ${SeekToken}` },
        });
        
        const userData = response.data;
        setFormData(prevData => ({
          ...prevData,
          fullName: userData.fullName || "",
          city: userData.city || "",
          dateOfBirth: userData.dateOfBirth || "",
          address: userData.address || "",
          pincode: userData.pincode || "",
          state: userData.state || "",
          country: userData.country || "",
          gender: userData.gender || "",
          phoneNumber: userData.phoneNumber || "",
          skills: userData.skills || [],
          workExperience: {
            company: userData.company || "",
            position: userData.position || "",
            startDate: userData.startDate || "",
            endDate: userData.endDate || "",
          },
          education: {
            degree: userData.degree || "",
            institution: userData.institution || "",
            specialisation: userData.specialisation || "",
            startYear: userData.startYear || "",
            endYear: userData.endYear || "",
          },
          image: userData.image || null
        }));
        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [SeekId, SeekToken, userDetailApi]);

  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill]
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        // Check file type
        if (!file.type.startsWith("image/")) {
          setError("Please upload an image file");
          return;
        }
        // Check file size (e.g., 5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          setError("File size should be less than 5MB");
          return;
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setFormData((prev) => ({ ...prev, [name]: file }));
      }
      return;
    }

    else if (name === "skills") {
      setSkillInput(value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (skillInput.trim()) {
        addSkill(skillInput);
        setSkillInput(''); // Clear input after adding
      }
    } else if (e.key === ',' || e.key === ' ') {
      e.preventDefault();
      if (skillInput.trim()) {
        addSkill(skillInput);
        setSkillInput('');
      }
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSeekData = async (e) => {
    e.preventDefault();

    const submitFormData = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        if (typeof formData[key] === 'object' && !(formData[key] instanceof File)) {
          submitFormData.append(key, JSON.stringify(formData[key]));
        } else {
          submitFormData.append(key, formData[key]);
        }
      }
    });

    try {
      const response = await axios.put(SeekApi, submitFormData, {
        headers: { 
          Authorization: `Bearer ${SeekToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Success:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred");
    }
  };

  if (loading) {
    return <p className="text-center mt-5 text-5xl text-green-700 font-semibold">Loading...</p>;
  }

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };
  const renderuserDetailForm = () => (
    <>
      <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-transparent bg-green-700  bg-clip-text mb-6">
          User Details
        </h2>
      <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Company Logo
        </label>
        <div className="mt-1 flex items-center space-x-4">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-lg"
            />
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="w-full bg-green-500 hover:bg-green-700 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </>
  );

  const renderuserAddressForm = () => (
    <>
      <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-transparent bg-green-700  bg-clip-text mb-6">
          User Address
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your Address"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter your city"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PinCode
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Enter your pincode"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Enter your country"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="Enter your state"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-green-500 hover:bg-green-700 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );

  const renderuserEducationForm = () => (
    <>
      <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-transparent bg-green-700  bg-clip-text mb-6">
          User Education
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Degree
          </label>
          <input
            type="text"
            name="education.degree"
            value={formData.education.degree}
            onChange={handleInputChange}
            placeholder="Enter the degree"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University
          </label>
          <input
            type="text"
            name="education.institution"
            value={formData.education.institution}
            onChange={handleInputChange}
            placeholder="Enter the name of your university"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialisation
          </label>
          <input
            type="text"
            name="education.specialisation"
            value={formData.education.specialisation}
            onChange={handleInputChange}
            placeholder="Enter the field"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Year
            </label>
            <input
              type="date"
              name="education.startYear"
              value={formData.education.startYear}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ending Year
            </label>
            <input
              type="date"
              name="education.endYear"
              value={formData.education.endYear}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-green-500 hover:bg-green-700 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  )

  const renderuserExperienceForm = () => (
    <>
      <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-transparent bg-green-700  bg-clip-text mb-6">
          User Work Experience and Skills
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="workExperience.company"
            value={formData.workExperience.company}
            onChange={handleInputChange}
            placeholder="Enter the company name"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <input
            type="text"
            name="workExperience.position"
            value={formData.workExperience.position}
            onChange={handleInputChange}
            placeholder="Enter the position you have been working"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="workExperience.startDate"
              value={formData.workExperience.startDate}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="workExperience.endDate"
              value={formData.workExperience.endDate}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
        <label className="block text-sm font-medium text-gray-700">
          Required Skills
        </label>
        <div className="relative">
          <input
            type="text"
            name="skills"
            value={skillInput}
            onChange={handleInputChange}
            onKeyDown={handleSkillInputKeyDown}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Type a skill and press Enter or comma to add"
          />
          <div className="mt-2 text-xs text-gray-500">
            Press Enter or comma (,) to add a skill
          </div>
        </div>
        {formData.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-1 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Previous
          </button>

          <button
            type="submit"
            onClick={handleSeekData}
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Header />
      <div className="flex flex-col mt-10 md:flex-row justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-16 py-10">
         {/* Left Side - Image */}
         <div className="hidden md:block w-full  lg:w-1/2 justify-center lg:justify-end mb-6 lg:mb-0">
          <img
            src={userimg} // Replace with actual image URL
            alt="Profile Preview"
            className="w-50 h-50 md:w-full md:h-full object-cover"
          />
        </div> 

        <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg max-w-lg sm:p-6 p-4">
            <form onSubmit={handleSeekData}>
              {step === 1 && renderuserDetailForm()}
              {step === 2 && renderuserAddressForm()}
              {step === 3 && renderuserEducationForm()}
              {step === 4 && renderuserExperienceForm()}
            </form>
        </div>
      </div>
    </>
  );
};

export default UserDetails;