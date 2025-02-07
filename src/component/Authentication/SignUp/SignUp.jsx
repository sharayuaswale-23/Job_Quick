import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { setIsAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();

  const signupApi = "https://jobquick.onrender.com/seekuser/signup";

  const handleSignup = (e) => {
    e.preventDefault();
    const person = { email, password };

    fetch(signupApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsAuthorized(true);
        setSuccess("Signup successful!");
        navigate("/login");
        setError(null);
      })
      .catch((error) => {
        setError("Signup failed. Please try again.");
        setSuccess(null);
      });
  };

  return (
  
  //    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
  //   <motion.div 
  //     initial={{ opacity: 0, scale: 0.9 }} 
  //     animate={{ opacity: 1, scale: 1 }} 
  //     transition={{ duration: 0.5 }}
  //     className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2"
  //   >
  //     {/* Left Section */}
  //     <div className="hidden md:flex items-center justify-center bg-blue-100 p-8 w-full">
  //         <motion.div 
  //           initial={{ x: -50, opacity: 0 }} 
  //           animate={{ x: 0, opacity: 1 }} 
  //           transition={{ duration: 0.6 }}
  //           className="relative w-full h-96 flex items-center justify-center"
  //         >
  //           {/* <div className="absolute w-full h-80 bg-blue-500 rounded-xl"></div> */}
  //           <img src="https://cdni.iconscout.com/illustration/premium/thumb/boy-coding-on-laptop-8202501-6578006.png" alt="illustration" className="relative w-full h-80 object-cover" />
  //         </motion.div>
  //       </div>

  //     {/* Right Section */}
  //     <div className="flex flex-col justify-center p-8">
  //       <div className="flex justify-center mb-6">
  //         <img src="https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-1024.png" alt="avatar" className="w-16 h-16 rounded-full" />
  //       </div>
  //       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">CREATE ACCOUNT</h2> 
  //       <form className="space-y-6" onSubmit={handleSignup}>
  //        {error && <p className="text-red-500 text-sm">{error}</p>}
  //        {success && <p className="text-green-500 text-sm">{success}</p>}
  //       <div className="space-y-4">
  //         <div className="flex items-center border-b-2 py-2">
  //           <FaUser className="text-gray-500 mr-2" />
  //           <input
  //              type="email"
  //              placeholder="Email Address"
  //              onChange={(e) => setEmail(e.target.value)}
  //              required
  //             className="w-full focus:outline-none"
  //           />
  //         </div>
  //         <div className="flex items-center border-b-2 py-2">
  //           <FaLock className="text-gray-500 mr-2" />
  //           <input
  //              type="password"
  //              placeholder="Password"
  //              onChange={(e) => setPassword(e.target.value)}
  //              required
  //             className="w-full focus:outline-none"
  //           />
  //         </div>
  //       </div>
  //       <button type="submit" className=" w-full bg-blue-500 text-white py-2 mt-8 rounded-lg hover:bg-blue-600 transition duration-300">
  //         SIGN UP
  //       </button>
  //       </form>
  //       <p className="text-center text-sm text-gray-600 mt-6">
  //        Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Login</Link>
  //      </p>
  //     </div>
  //   </motion.div>
  // </div>

  <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }} 
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2"
  >
    {/* Left Section */}
    <div className="hidden md:flex items-center justify-center bg-blue-200 p-8 w-full">
      <motion.div 
        initial={{ x: -50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.6 }}
        className="relative w-full h-96 flex items-center justify-center"
      >
        <img 
          src="https://cdni.iconscout.com/illustration/premium/thumb/boy-coding-on-laptop-8202501-6578006.png" 
          alt="illustration" 
          className="relative w-full h-80 object-cover drop-shadow-lg"
        />
      </motion.div>
    </div>

    {/* Right Section */}
    <div className="flex flex-col justify-center p-8">
      <div className="flex justify-center mb-6">
        <img 
          src="https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-1024.png" 
          alt="avatar" 
          className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-md"
        />
      </div>
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">CREATE ACCOUNT</h2> 
      <form className="space-y-6" onSubmit={handleSignup}>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

        <div className="space-y-4">
          <div className="flex items-center border-b-2 border-blue-400 py-2">
            <FaUser className="text-blue-600 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full focus:outline-none bg-transparent placeholder-gray-500 text-gray-800 focus:border-b-2 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center border-b-2 border-blue-400 py-2">
            <FaLock className="text-blue-600 mr-2" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full focus:outline-none bg-transparent placeholder-gray-500 text-gray-800 focus:border-b-2 focus:border-blue-500"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 mt-8 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
        >
          SIGN UP
        </button>
      </form>

      <p className="text-center text-sm text-gray-700 mt-6">
        Already have an account? 
        <Link to="/login" className="text-blue-300 font-semibold hover:underline ml-1">
          Login
        </Link>
      </p>
    </div>
  </motion.div>
</div>

  );
};

export default Signup;
