import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import loginimg from "../../../assets/Images/loginimg.webp";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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
        Cookies.set("userToken", data.token, { expires: 1 });
        Cookies.set("userNewId", data.userId, { expires: 1 });
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
   

  <div className="flex items-center justify-center min-h-screen bg-white p-4">
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }} 
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2"
  >

    <div className="hidden md:flex items-center justify-center bg-blue-100 p-8 w-full">
      <motion.div 
        initial={{ x: -50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.6 }}
        className="relative w-full h-96 flex items-center justify-center"
      >
        <img 
          src={loginimg}
          alt="illustration" 
          className="relative w-full h-80 object-cover  drop-shadow-xl"
        />
      </motion.div>
    </div>

  
    <div className="flex flex-col justify-center p-8">
      <div className="flex justify-center mb-6">
        <img 
          src="https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-1024.png" 
          alt="avatar" 
          className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-md"
        />
      </div>
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">WELCOME</h2> 
      <form className="space-y-6" onSubmit={handleLogin}>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

        <div className="space-y-4">
          <div className="flex items-center border-b-2 border-blue-400 py-2">
            <FaUser className="text-blue-600 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full focus:outline-none bg-transparent placeholder-gray-500 text-gray-800 focus:border-b-2 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center border-b-2 border-blue-400 py-2">
            <FaLock className="text-blue-600 mr-2" />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pr-10 focus:outline-none bg-transparent placeholder-gray-500 text-gray-800 focus:border-b-2 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 mt-8 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
        >
          LOGIN
        </button>
      </form>

      <p className="text-center text-sm text-gray-700 mt-6">
        Don't have an account? 
        <Link to="/signup" className="text-blue-300 font-semibold hover:underline ml-1">
          Sign Up
        </Link>
      </p>
    </div>
  </motion.div>
</div>

  );
};

export default Login;