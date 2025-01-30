import React, { useState } from "react";
import HeroSl from "../../../assets/Images/HomeImg.jpg";
import HeroS2 from "../../../assets/Images/ruleimg.jpg";
import HeroS3 from "../../../assets/Images/Profile.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Header from "../../common/header/Header"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import userimg from "../../../assets/Images/userdetailimg.webp";
import Footer from "../../common/Footer/Footer";

const UserDetails = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [image, setimage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [city, setcity] = useState("");
  const [workExperience, setworkExperience] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const SeekId = Cookies.get("userId");
  const SeekToken = Cookies.get("jwtToken");

  const seekDetailApi = `https://jobquick.onrender.com/seekuser/update/${SeekId}`;

  const handleSeekData = (e) => {
    e.preventDefault();
    console.log("city:", city);
    console.log("workExperience:", workExperience);
    console.log("Address:", address);
    console.log("PhoneNumber:", phoneNumber);
    console.log("FullName:", fullName);

    const details = {
      city: city,
      fullName: fullName,
      address: address,
      phoneNumber: phoneNumber,
      workExperience: workExperience,
      gender: gender,
      state: state,
      pincode: pincode,
      country: country,
      image: image,
    };

    fetch(seekDetailApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SeekToken}`,
      },
      body: JSON.stringify(details),
    }).then((data) => {
      console.log(data);
    });
    navigate("/profile");
  };

  const handleNext = () => {
    setStep(step + 1);
  };
  
  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col mt-10 lg:flex-row justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-16 py-10">
        {/* Left Side - Image */}
        {/* <div className="w-full  lg:w-1/2 flex justify-center lg:justify-end mb-6 lg:mb-0">
          <img
            src={userimg} // Replace with actual image URL
            alt="Profile Preview"
            className="w-50 h-50 md:w-full md:h-full object-cover"
          />
        </div> */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-6 lg:mb-0">
  <img
    src={userimg} // Replace with actual image URL
    alt="Profile Preview"
    className="w-40 h-40 sm:w-64 sm:h-48 md:w-60 md:h-60 lg:w-full lg:h-full object-cover"
  />
</div>

          <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg max-w-lg sm:p-6 p-4">
            <form onSubmit={handleSeekData}>
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text mb-6">
                    User Details
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Profile Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setimage(e.target.files)}
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-1 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-gradient-to-r from-blue-400 to-blue-700 file:text-white hover:file:opacity-90"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setFullName(e.target.value)}
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                    <div className="flex-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="number"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        id="number"
                        name="number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                    <div className="flex-1">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="" disabled selected>
                          Select your gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-blue-400 to-blue-700 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Next
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text mb-6">
                    User Location
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setAddress(e.target.value)}
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
                        onChange={(e) => setcity(e.target.value)}
                        placeholder="Enter your city"
                        className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PinCode
                      </label>
                      <input
                        type="number"
                        onChange={(e) => setPincode(e.target.value)}
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
                      onChange={(e) => setCountry(e.target.value)}
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
                      onChange={(e) => setState(e.target.value)}
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
                      className=" bg-gradient-to-r from-blue-400 to-blue-700 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <>
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text mb-6">
                      User Education & Skills
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your education"
                        className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills
                      </label>
                      <input
                        type="text"
                        id="skills"
                        name="skills"
                        placeholder="Enter your skills"
                        className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work workExperience
                      </label>
                      <input
                        type="text"
                        id="workExperience"
                        name="workExperience"
                        onChange={(e) => setworkExperience(e.target.value)}
                        placeholder="Enter your work workExperience"
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
                        type="submit"
                        className=" bg-gradient-to-r from-blue-400 to-blue-700 text-white py-33 px-5 rounded-lg shadow-md hover:opacity-90"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
     
      </div> 

      <Footer/>


    </>
  );
};

export default UserDetails;