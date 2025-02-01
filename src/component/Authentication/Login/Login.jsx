import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import Cookies from "js-cookie";

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

      if (data.token && data._id) {
        Cookies.set("userToken", data.token, { expires: 8 });
        Cookies.set("userNewId", data._id, { expires: 8 });
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden border border-gray-300">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 bg-blue-300 text-white">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg text-center">Login in to continue.</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt="Login Illustration"
            className="w-52 mt-6"
          />
        </div>
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Log In</h1>
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg shadow-sm hover:border-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg shadow-sm hover:border-blue-500"
              />
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-lg font-semibold transition duration-300 shadow-md"
            >
              LOGIN
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;