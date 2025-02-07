import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const HosterSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
  
    const signupApi = "https://jobquick.onrender.com/hostuser/signup";
  
    const handleSignup = (e) => {
      e.preventDefault();
      console.log("Email:", email);
      console.log("Password:", password);
  
      const person = {
        email: email,
        password:password
      }
  
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
          console.log("Signup Response:", data);
          setSuccess("Signup successful!");
          setError(null);
          console.log(data);
          navigate('/hosterlogin')
        })
        .catch((error) => {
          console.error("Signup Error:", error);
          setError("Signup failed. Please try again.");
          setSuccess(null);
        });
    }

    return (
        // <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-pink-100 to-blue-100 sm:px-6 lg:px-8">
        //   <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
    
        //     <div className="hidden w-full md:block md:w-1/2">
        //       <img
        //         src={SignUpImg}
        //         alt="Signup"
        //         className="object-cover w-auto h-full"
        //       />
        //     </div>
    
        //     <div className="w-full p-6 space-y-6 md:w-1/2 sm:p-8">
        //       <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent sm:text-3xl">
        //         Create an Account
        //       </h2>
        //       <p className="text-sm text-center text-gray-600 sm:text-base">
        //         Join us to unlock exciting features!
        //       </p>
    
        //       <form onSubmit={handleSignup} className="space-y-5">
        //         <div>
        //           <label
        //             htmlFor="email"
        //             className="block text-sm font-medium text-gray-700"
        //           >
        //             Email Address
        //           </label>
        //           <input
        //             type="email"
        //             id="email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             required
        //             placeholder="Enter your email"
        //             className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        //           />
        //         </div>
    
        //         <div>
        //           <label
        //             htmlFor="password"
        //             className="block text-sm font-medium text-gray-700"
        //           >
        //             Password
        //           </label>
        //           <input
        //             type="password"
        //             id="password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             required
        //             placeholder="Enter your password"
        //             className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        //           />
        //         </div>
    
        //         <button
        //           type="submit"
        //           className="w-full px-4 py-3 font-medium text-white bg-purple-600 rounded-md shadow hover:bg-purple-700 focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50"
        //         >
        //           Sign Up
        //         </button>
    
        //         {error && (
        //           <div className="p-3 text-sm text-center text-red-600 bg-red-100 rounded">
        //             {error}
        //           </div>
        //         )}
        //         {success && (
        //           <div className="p-3 text-sm text-center text-green-600 bg-green-100 rounded">
        //             {success}
        //           </div>
        //         )}
        //       </form>
    
        //       <p className="text-sm text-center text-gray-600 sm:text-base">
        //         Already have an account?{" "}
        //         <Link to={"/hosterlogin"} className="text-indigo-500 hover:underline">
        //           Log In
        //         </Link>
        //       </p>
        //     </div>
        //   </div>
        // </div>


      //   <div className="flex h-screen items-center justify-center bg-gray-100 p-4 relative overflow-hidden">
      // {/* Background Circles */}
      // <div className="absolute top-0 right-0 w-40 h-40 bg-red-400 rounded-bl-full opacity-40 md:opacity-100"></div>
      // <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400 rounded-tr-full opacity-40 md:opacity-100"></div>

      // <div className="flex w-full mt-6 max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg md:flex-row flex-col">
        
      //    {/* Right Section */}
      //    <div className="w-full py-15 md:py-20 md:w-1/2 p-8 relative">
      //     <h2 className="text-3xl font-bold text-teal-500 text-center">Create Account</h2>
      //     <p className="mt-4 text-center text-gray-500">Use your email for registratin:</p>
      //     <form onSubmit={handleSignup}  className="mt-4 space-y-4">
      //       <input
      //         className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
      //         type="email"
      //         id="email"
      //         value={email}
      //         onChange={(e) => setEmail(e.target.value)}
      //         required
      //       />
      //       <input
      //         className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
      //         type="password"
      //         id="password"
      //         value={password}
      //         onChange={(e) => setPassword(e.target.value)}
      //         required
      //       />
      //       <button className="w-full rounded-lg bg-teal-500 p-3 text-white font-semibold hover:bg-teal-600 transition-all">
      //         SIGN UP
      //       </button>
      //     </form>
      //       {error && (
      //        <div className="p-3 mt-6 text-sm text-center text-red-600 bg-red-100 rounded">
      //        {error}
      //        </div>
      //        )}
      //       {success && (
      //       <div className="p-3 mt-6 text-sm text-center text-green-600 bg-green-100 rounded">
      //         {success}
      //       </div>
      //       )}
      //   </div>

      //   {/* Left Section */}
      //   <div className="flex w-full py-15 md:py-20 md:w-1/2 flex-col items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 p-8 text-white relative">
      //     <h2 className="text-3xl font-bold">Welcome Back!</h2>
      //     <p className="mt-2 text-center">To keep connected with us please login with your info</p>
      //     <Link to="/hosterlogin" className="mt-6 rounded-full border-2 border-white px-6 py-2 font-semibold hover:bg-white hover:text-teal-500 transition-all">
      //       LOGIN
      //     </Link>
      //   </div>

       
      // </div>
      //    </div>

      <div className="flex h-screen items-center justify-center bg-gray-100 p-4 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-400 rounded-bl-full opacity-40 md:opacity-100"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400 rounded-tr-full opacity-40 md:opacity-100"></div>
    
      <div className="flex w-full mt-6 max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg md:flex-row flex-col-reverse">
        {/* Right Section - Placed at the top on small screens */}
        <div className="w-full py-15 md:py-20 md:w-1/2 p-8 relative">
          <h2 className="text-3xl font-bold text-teal-500 text-center">Create Account</h2>
          <p className="mt-4 text-center text-gray-500">Use your email for registration:</p>
          <form onSubmit={handleSignup} className="mt-4 space-y-4">
            <input
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="email"
              id="email"
              value={email}
              placeholder='Enter your mail address'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="password"
              id="password"
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="w-full rounded-lg bg-teal-500 p-3 text-white font-semibold hover:bg-teal-600 transition-all">
              SIGN UP
            </button>
          </form>
          {error && (
            <div className="p-3 mt-6 text-sm text-center text-red-600 bg-red-100 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 mt-6 text-sm text-center text-green-600 bg-green-100 rounded">
              {success}
            </div>
          )}
        </div>
    
        {/* Left Section - Placed at the bottom on small screens */}
        <div className="flex w-full py-15 md:py-20 md:w-1/2 flex-col items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 p-8 text-white relative">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="mt-2 text-center">To keep connected with us please login with your info</p>
          <Link to="/hosterlogin" className="mt-6 rounded-full border-2 border-white px-6 py-2 font-semibold hover:bg-white hover:text-teal-500 transition-all">
            LOGIN
          </Link>
        </div>
      </div>
    </div>


      );
    };
    

export default HosterSignup
