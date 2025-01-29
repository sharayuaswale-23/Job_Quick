import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import { Link } from "react-router-dom";

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
        navigate("/");
        setError(null);
      })
      .catch((error) => {
        setError("Signup failed. Please try again.");
        setSuccess(null);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden border border-gray-300">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 bg-indigo-300 text-white">
          <h2 className="text-3xl font-bold mb-4">Join Us!</h2>
          <p className="text-lg text-center">Create an account to get started.</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt="Signup Illustration"
            className="w-52 mt-6"
          />
        </div>
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h1>
          <form className="space-y-6" onSubmit={handleSignup}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg shadow-sm hover:border-indigo-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg shadow-sm hover:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 text-lg font-semibold transition duration-300 shadow-md"
            >
              SIGN UP
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

