import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import bgimg from "../../../../assets/Images/formimage.avif";
import { useEffect } from "react";

const HosterDetail = () => {
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
        const response = await axios.get(getHostDetailApi, {
          headers: { Authorization: `Bearer ${HostToken}` },
        });
        
        setFormData(prevData => ({
          ...prevData,
          fullName: response.data.fullName || "",
          city: response.data.city || "",
          companyURL: response.data.companyURL || "",
          address: response.data.address || "",
          pincode: response.data.pincode || "",
          state: response.data.state || "",
          country: response.data.country || "",
          gender: response.data.gender || "",
          phoneNumber: response.data.phoneNumber || ""
        }));
        
        setLoading(false);
      } catch (error) {
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
    return <p className="text-center mt-5 text-5xl text-pink-500 font-semibold">Loading...</p>;
  }


  return (

    <div className="flex min-h-screen w-full flex-col md:flex-row">
   
    {/* Right Side - Content */}
    <div className="flex-1 my-8 flex justify-center items-center p-6 w-full">

    <div className="h-screen flex items-center justify-center">
  <div className="mx-auto py-4 p-4 bg-gray-50 rounded-lg shadow-md w-full max-w-4xl h-full flex flex-col justify-center">
    <h2 className="text-3xl font-bold text-black mb-2 text-center text-transparent bg-green-600 hover:bg-green-800 bg-clip-text">
      Hoster Details
    </h2>
    <form className="space-y-4 flex flex-col justify-center h-full" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Profile Image</label>
        <input type="file"
            name="image"
            accept="image/*"
            onChange={handleChange} className="block w-full border border-gray-300 rounded-lg shadow-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-green-600 file:text-white hover:file:opacity-90" />
      </div>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} name="fullName" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your full name" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


        <div>
            <label className="">
              Gender
            </label>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">Company URL</label>
          <input type="url"  name="companyURL"
              value={formData.companyURL}
              onChange={handleChange} id="url"  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your company URL" />
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
     <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1545184180-25d471fe75eb?q=80&w=1861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}></div>
    
    </div>

  );
};

export default HosterDetail;