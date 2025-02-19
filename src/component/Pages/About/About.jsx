import React from "react";
import Businesswoman from "../../../assets/Images/HomeImg.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css"; 
import AboutMarque from "../../Animation/AboutMarque/AboutMarque";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import girl1 from "../../../assets/Images/girl1.jpg";
import girl2 from "../../../assets/Images/girl2.jpg";
import girl3 from "../../../assets/Images/girl3.avif";
import contactimg from "../../../assets/Images/aboutimg.avif";
import { ArrowRight } from 'lucide-react';


const About = () => {

  const navigate = useNavigate();

    const images = [
        girl1,
        girl2,
       girl3,
      ];
      
        const [currentImage, setCurrentImage] = useState(0);
      
        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
          }, 3000); 
      
          return () => clearInterval(interval);
        }, []);

         const handleEmployerClick = () => {
            const userToken = Cookies.get("jwtToken");
            const userNewId = Cookies.get("userId");
            
            if (userToken && userNewId) {
              navigate("/dashboard");
            } else {
              navigate("/hosterlogin");
            }
          };

          const features = [
            {
              title: "Proven Career Growth",
              desc: "Gain access to top opportunities that align with your expertise and ambitions.",
            },
            {
              title: "Perfect Job Matching",
              desc: "Get connected with employers looking for professionals like you.",
            },
            {
              title: "Remote, Hybrid, and Flexible Jobs",
              desc: "Find jobs that fit your work style, whether remote, hybrid, or on-site.",
            },
            {
              title: "Career Support & Skill Development",
              desc: "Enhance your skills with expert guidance, resume tips, and career resources to stay ahead.",
            }
          ];
    
  return (
    <>
    <Header/>

      {/* Part 1  */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 mt-20 p-4 md:p-8"style={{
            backgroundImage:
              `url(${contactimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12" >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Join the World's Best Marketplace for Job Seekers
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connect with top employers worldwide and find the perfect job that matches your skills and experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>



{/* Part 2  */}

<div className="bg-gradient-to-b from-gray-50 to-gray-100 w-full flex flex-col justify-center items-center py-8 md:py-12 overflow-hidden">
  <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
      
      {/* Image Column */}
      <div className="relative w-full h-full flex justify-center items-center order-2 md:order-1">
        <div className="absolute -z-10 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-70 animate-pulse"></div>
        
        {/* Main Image */}
        <div className="relative w-full max-w-sm">
          <div className="w-96 h-96 sm:w-80 sm:h-80 overflow-hidden rounded-2xl shadow-2xl transform rotate-2 transition-all duration-500 hover:rotate-0 hover:scale-105">
            <img
              src={images[currentImage]}
              alt="Freelancer"
              className="w-full h-full object-cover transition-all duration-700 ease-in-out hover:scale-110"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-600 rounded-lg shadow-lg -z-10"></div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full shadow-lg -z-10"></div>
          
          {/* Navigation Dots */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentImage === index ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Content Column */}
      <div className="px-2 sm:px-6 lg:px-2 flex flex-col order-1 md:order-2">
        <div className="relative">
          <h2 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Trusted by Top 
            <span className="relative inline-block ml-2">
              <span className="relative z-10 text-indigo-600">Employers</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-indigo-100" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q30,5 50,10 Q70,15 100,10 L100,20 Q70,20 50,20 Q30,20 0,20 Z" fill="currentColor"/>
              </svg>
            </span>
          </h2>
          
          <p className="text-gray-600 mt-6 text-lg leading-relaxed max-w-xl">
            We help job seekers showcase their expertise and experience to meet the demands of top employers worldwide.
          </p>
        </div>
        
        {/* Achievements Section */}
        <div className="mt-4 mb-6 space-y-5">
          {[
            {
              title: "Bachelor's Degree",
              description: "Minimum qualification required by 95% of employers"
            },
            {
              title: "Over 15 Years of Experience",
              description: "Our platform has connected professionals since 2009"
            },
            {
              title: "12 Award-winning Educational Achievements",
              description: "Recognized excellence in career advancement programs"
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <button 
          onClick={handleEmployerClick} 
          className="mt-4 group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-indigo-200 transition-all duration-300 overflow-hidden w-full sm:w-auto"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          <span className="relative flex items-center">
            See More
            <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
        </button>
        
        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-start gap-4">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span>4.9/5 rating</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <span>Verified platform</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span>10K+ employers</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  
    {/* Part 3  */}
      
<AboutMarque/>


{/* Part 4  */}
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
       
        <div className="px-8 py-8 lg:px-6 lg:py-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find the talent needed to{" "}
            <span className="text-orange-500">grow your business</span>.
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Advertise your jobs to millions of monthly users and access a
            database of over <span className="font-semibold">15.8 million CVs</span>.
          </p>
          <button onClick={handleEmployerClick} className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold text-lg rounded-lg hover:bg-green-700 transition-all shadow-md">
         Find Talent →
          </button>
        </div>

      
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
