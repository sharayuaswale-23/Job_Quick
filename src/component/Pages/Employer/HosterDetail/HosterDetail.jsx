import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import bgimg from "../../../../assets/Images/formimage.avif";

const HosterDetail = () => {
  const navigate = useNavigate();
  const [image, setimage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [city, setcity] = useState("");
  const [companyURL, setCompanyURL] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const HostId = Cookies.get("userId");
  const HostToken = Cookies.get("jwtToken");

  const hostDetailApi = `https://jobquick.onrender.com/hostuser/update/${HostId}`;

  const handleHostData = (e) => {
    e.preventDefault();
    console.log("city:", city);
    console.log("Company URL:", companyURL);
    console.log("Address:", address);
    console.log("PhoneNumber:", phoneNumber);
    console.log("FullName:", fullName);

    const details = {
      city: city,
      fullName: fullName,
      address: address,
      phoneNumber: phoneNumber,
      companyURL: companyURL,
      gender: gender,
      state: state,
      pincode: pincode,
      country: country,
      image: image,
    };

    fetch(hostDetailApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HostToken}`,
      },
      body: JSON.stringify(details),
    }).then((data) => {
      console.log(data);
    });
    navigate('/hosterprofile');
  };

  return (

    <div className="flex min-h-screen flex-col lg:flex-row">
    {/* Left Side - Background Image */}
    <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgimg})` }}></div>
    
    {/* Right Side - Content */}
    <div className="flex-1 flex justify-center items-center p-6 w-full">
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-black mb-6 text-center text-transparent bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
        Hoster Details
      </h2>
      <form className="space-y-6 p-4" onSubmit={handleHostData}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setimage(e.target.files)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-1 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-gradient-to-r from-green-600 to-green-800 file:text-white hover:file:opacity-90"
          />
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            onChange={(e) => setFullName(e.target.value)}
            name="fullName"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="number"
              placeholder="Enter your phone number"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company URL
            </label>
            <input
              type="url"
              onChange={(e) => setCompanyURL(e.target.value)}
              id="url"
              name="url"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your company URL"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City
            </label>
            <input
              type="text"
              onChange={(e) => setcity(e.target.value)}
              id="city"
              name="city"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your city"
            />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Address
            </label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              id="address"
              name="address"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your address"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="State"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              State
            </label>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              id="State"
              name="State"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your State"
            />
          </div>
        </div>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              PinCode
            </label>
            <input
              type="number"
              onChange={(e) => setPincode(e.target.value)}
              id="pincode"
              name="pincode"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your pincode"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="Country"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Country
            </label>
            <input
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              id="Country"
              name="Country"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your Country"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full font-semibold bg-gradient-to-r from-green-600 to-green-800 text-xl text-white py-3 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>

  );
};

export default HosterDetail;