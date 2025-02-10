import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const HosterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const loginApi = "https://jobquick.onrender.com/hostuser/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    const person = {
      email: email,
      password: password,
    };

    fetch(loginApi, {
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
        console.log("Login Response:", data);

        if (data.token && data._id) {
          Cookies.set("jwtToken", data.token, { expires: 1 });
          Cookies.set("userId", data._id, { expires: 1 });

          setSuccess("Login successful!");
          setError(null);
          navigate("/dashboard");
        } else {
          throw new Error("Token or ID not received");
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setError("Login failed. Please try again.");
        setSuccess(null);
      });
  };

  return (


    <div className="flex h-screen items-center justify-center bg-gray-100 p-4 relative overflow-hidden">

    <div className="absolute top-0 right-0 w-40 h-40 bg-red-400 rounded-bl-full opacity-40 md:opacity-100"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400 rounded-tr-full opacity-40 md:opacity-100"></div>

    <div className="flex w-full mt-6 max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg md:flex-row flex-col">
     
      <div className="flex w-full py-15 md:py-20 md:w-1/2 flex-col items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 p-8 text-white relative">
        <h2 className="text-3xl font-bold">Join us Today!</h2>
        <p className="mt-2 text-center">Unlock endless possibilities! Create your account to get started.</p>
        <Link to="/hostersignup" className="mt-6 rounded-full border-2 border-white px-6 py-2 font-semibold hover:bg-white hover:text-teal-500 transition-all">
         SIGN UP
        </Link>
      </div>

   
      <div className="w-full py-15 md:py-20 md:w-1/2 p-8 relative">
        <h2 className="text-3xl font-bold text-teal-500 text-center">Log in to your Account</h2>
        <p className="mt-4 text-center text-gray-500">Use your email for login:</p>
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <input
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="email"
             id="email"
             value={email}
             placeholder="Enter your mail address"
             onChange={(e) => setEmail(e.target.value)}
             required
          />
          <input
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="password"
             id="password"
             value={password}
             placeholder="Enter your password"
             onChange={(e) => setPassword(e.target.value)}
             required
          />
          <button type="submit" className="w-full rounded-lg bg-teal-500 p-3 text-white font-semibold hover:bg-teal-600 transition-all">
         LOGIN
          </button>
        </form>
        {error && <div className="text-red-500 text-sm mt-2 md:mt-6">{error}</div>}
        
      </div>
    </div>
  </div>


  );
};

export default HosterLogin;