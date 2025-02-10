import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HosterDetail = () => {

  const images = [
    "https://images.unsplash.com/photo-1587614295506-f03c0e6f5b44?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdpcmwlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1587614382231-d1590f0039e7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    "https://img.freepik.com/free-photo/woman-working-laptop-with-focus-minimal-background_24972-2968.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Set the interval to change images every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  const [formData, setFormData] = useState({
    image: null,
    fullName: "",
    city: "",
    companyURL: "",
    address: "",
    pincode: "",
    state: "",
    country: "",
    gender: "",
    phoneNumber: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const HostId = Cookies.get("userId");
  const HostToken = Cookies.get("jwtToken");

  const hostDetailApi = `https://jobquick.onrender.com/hostuser/update/${HostId}`;
  const getHostDetailApi = `https://jobquick.onrender.com/hostuser/${HostId}`;

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const response = await fetch(getHostDetailApi, {
          headers: { Authorization: `Bearer ${HostToken}` },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json(); // Fetch the response as JSON
        console.log("Fetched Data:", data); // Debugging log to check API response
  
        setFormData({
          fullName: data.fullName || "",
          city: data.city || "",
          companyURL: data.companyURL || "",
          address: data.address || "",
          pincode: data.pincode || "",
          state: data.state || "",
          country: data.country || "",
          gender: data.gender || "",
          phoneNumber: data.phoneNumber || "",
          image: data.image || null, // Ensure image is properly set
        });
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching host details:", error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchHostDetails();
  }, [HostId, HostToken]); // Ensure it fetches when ID or Token changes

  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitFormData = new FormData();
    
    // Append all form fields to FormData
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        submitFormData.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(hostDetailApi, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${HostToken}`,
        },
        body: submitFormData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      navigate("/hosterprofile");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-5 text-5xl text-green-500 font-semibold">Loading...</p>;
  }


  return (

<div className="flex min-h-screen p-4 lg:p-16 rounded-lg bg-white w-full flex-col md:flex-row">
{/* Right Side - Content */}
<div className="flex-1 flex rounded-l-lg bg-gray-100 justify-center items-center p-2 lg:p-4 w-full">
  <div className="h-full flex my-6 items-center justify-center">
    <div className="mx-auto py-10 p-2 md:p-4 rounded-lg w-full md:max-w-4xl h-full flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-black text-center text-transparent bg-green-600 hover:bg-green-800 bg-clip-text">
        Hoster Details
      </h2>
      <form className="space-y-4 flex flex-col justify-center h-full" onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Profile Image</label>
          <input type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-green-600 file:text-white hover:file:opacity-90" />
        </div>

        {/* Input Fields for Name, Gender, Phone */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} name="fullName" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your full name" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Other Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label htmlFor="companyURL" className="block text-sm font-medium text-gray-700">Company URL</label>
            <input type="url"
              id="companyURL"
              name="companyURL"
              value={formData.companyURL}
              onChange={handleChange} className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your company URL" />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" value={formData.city}
              onChange={handleChange} id="city" name="city" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your city" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" value={formData.address}
              onChange={handleChange} id="address" name="address" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your address" />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input type="text" value={formData.state}
              onChange={handleChange} id="state" name="state" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your state" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">PinCode</label>
            <input type="number" value={formData.pincode}
              onChange={handleChange} id="pincode" name="pincode" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your pincode" />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" value={formData.country}
              onChange={handleChange} id="country" name="country" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your country" />
          </div>
        </div>

        <button type="submit" className="w-full font-semibold bg-green-600 hover:bg-green-800 text-lg text-white rounded-md  focus:outline-none focus:ring-2 py-1 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
      </form>
    </div>
  </div>
</div>

{/* Left Side - Background Image */}
<div className="hidden md:block w-1/2 bg-cover bg-center rounded-r-lg transition-all duration-1000" style={{
  backgroundImage: `url(${images[currentImageIndex]})`,
}}></div>
</div>




  );
};

export default HosterDetail;