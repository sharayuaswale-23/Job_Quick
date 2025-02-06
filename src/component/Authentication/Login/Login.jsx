import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { setIsAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginApi = "https://jobquick.onrender.com/seekuser/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch(loginApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.token && data.userId) {
        Cookies.set("userToken", data.token, { expires: 8 });
        Cookies.set("userNewId", data.userId, { expires: 8 });
        setIsAuthorized(true);
        setSuccess("Login successful!");
        navigate("/");
      } else {
        throw new Error("Token or ID not received");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
   

    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2"
    >
      {/* Left Section */}
      <div className="hidden md:flex items-center justify-center bg-blue-100 p-8 w-full">
          <motion.div 
            initial={{ x: -50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.6 }}
            className="relative w-full h-96 flex items-center justify-center"
          >
            {/* <div className="absolute w-full h-80 bg-blue-500 rounded-xl"></div> */}
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/boy-coding-on-laptop-8202501-6578006.png" alt="illustration" className="relative w-full h-80 object-cover" />
          </motion.div>
        </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center p-8">
        <div className="flex justify-center mb-6">
          <img src="https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-1024.png" alt="avatar" className="w-16 h-16 rounded-full" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">WELCOME</h2> <form className="space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
        <div className="space-y-4">
          <div className="flex items-center border-b-2 py-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center border-b-2 py-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <button type="submit" className=" w-full bg-blue-500 text-white py-2 mt-8 rounded-lg hover:bg-blue-600 transition duration-300">
          LOGIN
        </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
             Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</Link>
           </p>
      </div>
    </motion.div>
  </div>
  );
};

export default Login;