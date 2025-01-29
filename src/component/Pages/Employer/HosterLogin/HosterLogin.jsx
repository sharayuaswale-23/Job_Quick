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
    // <div className="flex flex-col-reverse lg:flex-row items-center justify-around min-h-screen p-5 md:p-10 bg-gray-100">
    //   <div className="w-full max-w-lg bg-white p-6 md:p-10 rounded-lg shadow-lg">
    //     <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
    //       Welcome to Job Quick
    //     </h2>
    //     <p className="mt-2 text-center text-gray-600">Login to your account</p>
    //     <form onSubmit={handleLogin} className="mt-6 space-y-5">
    //       <div>
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium text-gray-700"
    //         >
    //           Email Address
    //         </label>
    //         <input
    //           type="email"
    //           id="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //           className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
    //           placeholder="Enter your email"
    //         />
    //       </div>

    //       <div>
    //         <label
    //           htmlFor="password"
    //           className="block text-sm font-medium text-gray-700"
    //         >
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //           className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
    //           placeholder="Enter your password"
    //         />
    //       </div>

    //       <button
    //         type="submit"
    //         className="w-full px-4 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow-lg transition duration-300"
    //       >
    //         Login
    //       </button>
    //       {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    //       {success && (
    //         <div className="text-green-500 text-sm mt-2">{success}</div>
    //       )}
    //     </form>

    //     <div className="mt-6 text-center">
    //       <p className="text-gray-600">
    //         Don’t have an account?{" "}
    //         <Link to="/hostersignup" className="text-indigo-500 hover:underline">
    //           Sign Up
    //         </Link>
    //       </p>
    //     </div>
    //   </div>

    //   <div className="w-full max-w-md lg:max-w-lg mb-8 lg:mb-0 flex justify-center">
    //     <img
    //       src="https://epaylater.in/assets/images/help.svg"
    //       alt="Login Illustration"
    //       className="w-full h-auto rounded-lg"
    //     />
    //   </div>
    // </div>


    <div className="flex h-screen items-center justify-center bg-gray-100 p-4 relative overflow-hidden">
    {/* Background Circles */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-red-400 rounded-bl-full opacity-40 md:opacity-100"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400 rounded-tr-full opacity-40 md:opacity-100"></div>

    <div className="flex w-full mt-6 max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg md:flex-row flex-col">
      {/* Left Section */}
      <div className="flex w-full py-15 md:py-20 md:w-1/2 flex-col items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 p-8 text-white relative">
        <h2 className="text-3xl font-bold">Join us Today!</h2>
        <p className="mt-2 text-center">Unlock endless possibilities! Create your account to get started.</p>
        <Link to="/hostersignup" className="mt-6 rounded-full border-2 border-white px-6 py-2 font-semibold hover:bg-white hover:text-teal-500 transition-all">
         SIGN UP
        </Link>
      </div>

      {/* Right Section */}
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


