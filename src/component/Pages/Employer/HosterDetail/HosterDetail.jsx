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

    <div className="flex min-h-screen h-screen fixed w-full flex-col md:flex-row">
   
    {/* Right Side - Content */}
    <div className="flex-1 my-8 flex justify-center items-center p-6 w-full">

    <div className="h-screen flex items-center justify-center">
  <div className="mx-auto py-4 p-4 bg-gray-50 rounded-lg shadow-md w-full max-w-4xl h-full flex flex-col justify-center">
    <h2 className="text-3xl font-bold text-black mb-2 text-center text-transparent bg-green-600 hover:bg-green-800 bg-clip-text">
      Hoster Details
    </h2>
    <form className="space-y-4 flex flex-col justify-center h-full" onSubmit={handleHostData}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Profile Image</label>
        <input type="file" accept="image/*" onChange={(e) => setimage(e.target.files)} className="block w-full border border-gray-300 rounded-lg shadow-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-green-600 file:text-white hover:file:opacity-90" />
      </div>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" id="fullName" onChange={(e) => setFullName(e.target.value)} name="fullName" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your full name" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option value="" disabled selected>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="number" id="number" onChange={(e) => setPhoneNumber(e.target.value)} name="number" placeholder="Enter your phone number" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">Company URL</label>
          <input type="url" onChange={(e) => setCompanyURL(e.target.value)} id="url" name="url" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your company URL" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" onChange={(e) => setcity(e.target.value)} id="city" name="city" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your city" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" onChange={(e) => setAddress(e.target.value)} id="address" name="address" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your address" />
        </div>
        <div>
          <label htmlFor="State" className="block text-sm font-medium text-gray-700">State</label>
          <input type="text" onChange={(e) => setState(e.target.value)} id="State" name="State" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your State" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">PinCode</label>
          <input type="number" onChange={(e) => setPincode(e.target.value)} id="pincode" name="pincode" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your pincode" />
        </div>
        <div>
          <label htmlFor="Country" className="block text-sm font-medium text-gray-700">Country</label>
          <input type="text" onChange={(e) => setCountry(e.target.value)} id="Country" name="Country" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your Country" />
        </div>
      </div>
      <button type="submit" className="w-full font-semibold bg-green-600 hover:bg-green-800 text-lg text-white rounded-md  focus:outline-none focus:ring-2 py-1 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
    </form>
  </div>
</div>

    </div>

     {/* Left Side - Background Image */}
     <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1545184180-25d471fe75eb?q=80&w=1861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}></div>
    
    </div>

  );
};

export default HosterDetail;