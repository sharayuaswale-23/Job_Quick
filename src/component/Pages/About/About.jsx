import React from "react";
import Businesswoman from "../../../assets/Images/HomeImg.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import AboutMarque from "../../Animation/AboutMarque/AboutMarque";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";

const About = () => {

  

    const images = [
        "https://images.unsplash.com/photo-1587614295506-f03c0e6f5b44?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdpcmwlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1587614382231-d1590f0039e7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
        "https://img.freepik.com/free-photo/woman-working-laptop-with-focus-minimal-background_24972-2968.jpg",
      ];
      
        const [currentImage, setCurrentImage] = useState(0);
      
        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
          }, 3000); // Change image every 3 seconds
      
          return () => clearInterval(interval);
        }, []);
    
  return (
    <>
    <Header/>

    {/* Part 1  */}
      
<AboutMarque/>

{/* Part 2  */}

<div className=" bg-gray-100 flex flex-col justify-center items-center py-20">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Section - Image Carousel */}
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="w-96 h-96 overflow-hidden rounded-xl">
            <img
              src={images[currentImage]}
              alt="Freelancer"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />
          </div>
        </div>

        {/* Right Section - Trusted by Employers */}
        <div className="px-10 lg:px-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trusted by Top <span className="text-indigo-600">Employers</span>
          </h2>
          <p className="text-gray-600 mt-4">
            We help job seekers showcase their expertise and experience to meet the demands of top employers.
          </p>

          <div className="mt-6 mb-10 space-y-4">
            {[
              "Bachelor's Degree",
              "Over 15 Years of Experience",
              "12 Award-winning Educational Achievements",
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">✔️</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <Link to="/hosterlogin" className="mt-4 px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold text-lg rounded-lg hover:bg-green-600 shadow-md transition-all">
            See More →
          </Link>
        </div>
      </div>
    </div>

    {/* Part 3  */}
 <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 md:px-12">
      {/* Hero Section */}
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
        Join the World's Best Marketplace for Job Seekers
        </h1>
        <p className="text-lg text-gray-600 mt-4">
        Connect with top employers worldwide and find the perfect job that matches your skills and experience.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold text-indigo-600">
            ✅ Proven Career Growth
          </h2>
          <p className="text-gray-600 mt-2">
          Gain access to top opportunities that align with your expertise and ambitions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold text-indigo-600">
            ✅ Perfect Job Matching
          </h2>
          <p className="text-gray-600 mt-2">
          Get connected with employers looking for professionals like you.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold text-indigo-600">
            ✅ Remote, Hybrid, and Flexible Jobs
          </h2>
          <p className="text-gray-600 mt-2">
          Find jobs that fit your work style, whether remote, hybrid, or on-site.
          </p>
        </div>
      </div>

   

      {/* Call to Action */}
      <div className="mt-12">
        <Link to="/category" className="px-10 py-6 bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold text-lg rounded-full hover:bg-green-600 shadow-md transition-all">
          Get Started →
        </Link>
      </div>
    </div>

{/* Part 4  */}
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="px-8 py-8 lg:px-6 lg:py-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find the talent needed to{" "}
            <span className="text-orange-500">grow your business</span>.
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Advertise your jobs to millions of monthly users and access a
            database of over <span className="font-semibold">15.8 million CVs</span>.
          </p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold text-lg rounded-lg hover:bg-green-700 transition-all shadow-md">
           <Link to="/hosterlogin"> Find Talent →</Link>
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="relative flex justify-end">
          <img
            src={Businesswoman}
            alt="Businesswoman"
            className="w-full h-full rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default About;
