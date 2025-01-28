import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { setIsAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginApi = "https://e-commerce-api-1f9s.onrender.com/user/login";

  const handleLogin = async (e) => {
    e.preventDefault();

    const person = { email, password };

    fetch(loginApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Login failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("authToken", data.token); // Store token in localStorage
        setIsAuthorized(true); // Update authorization status
        setSuccess("Login successful!");
        setError(null);
        navigate("/"); // Redirect to home page
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(null);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-500 to-gray-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
            <img
              src="https://t3.ftcdn.net/jpg/05/45/72/84/360_F_545728418_CAHP3iWIHQSyhiQijlHxoLvS8yRAm2sE.jpg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <h2 className="text-lg font-semibold text-gray-700">Login to your account</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              E-mail Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            New to Job Quick? <Link to="/signup" className="text-blue-500 underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

