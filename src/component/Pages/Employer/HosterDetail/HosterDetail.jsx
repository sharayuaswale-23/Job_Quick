import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import girl1 from "../../../../assets/Images/girl1.jpg";
import girl2 from "../../../../assets/Images/girl2.jpg";
import girl3 from "../../../../assets/Images/girl3.avif";
import { Camera } from 'lucide-react';

const HosterDetail = () => {

  const images = [
   girl1,
   girl2,
   girl3,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

 
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
  
        const data = await response.json(); 
        console.log("Fetched Data:", data); 
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
          image: data.image || null, 
        });
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching host details:", error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchHostDetails();
  }, [HostId, HostToken]);

  
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
    // return <p className="text-center mt-5 text-5xl text-green-500 font-semibold">Loading...</p>;
  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 lg:p-8">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 rounded-2xl overflow-hidden bg-white shadow-xl">
      
      {/* Form Section */}
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Hoster Details
            </h1>
            <p className="text-gray-500">Please fill in your information below</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-green-500 transition-colors">
                  <Camera className="w-8 h-8 text-gray-400 group-hover:text-green-500 transition-colors" />
                </div>
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                />
                {/* <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-sm text-gray-500">
                  Upload Photo
                </div> */}
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                 type="text" id="fullName" value={formData.fullName} onChange={handleChange} name="fullName"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1"  name="gender"
              value={formData.gender}
              onChange={handleChange}>Gender</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white">
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                 type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company URL</label>
                  <input 
                   type="url"
              id="companyURL"
              name="companyURL"
              value={formData.companyURL}
              onChange={handleChange} 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter company URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    type="text" value={formData.city}
                    onChange={handleChange} id="city" name="city" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter city"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input 
                 type="text" value={formData.address}
              onChange={handleChange} id="address" name="address"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input 
                 type="text" value={formData.state}
              onChange={handleChange} id="state" name="state"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input 
                    type="number" value={formData.pincode}
              onChange={handleChange} id="pincode" name="pincode"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input 
                  type="text" value={formData.country}
              onChange={handleChange} id="country" name="country"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter country"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit Details
            </button>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{
  backgroundImage: `url(${images[currentImageIndex]})`,
}} />
    </div>
  </div>




  );
};

export default HosterDetail;