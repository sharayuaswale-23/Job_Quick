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
import aboutimg from "../../../assets/Images/aboutimg.avif";

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
    
  return (
    <>
    <Header/>

      {/* Part 1  */}
      <div className="mt-20 bg-cover bg-center min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-12" style={{backgroundImage:`url(${aboutimg})`}}>

  <div className="max-w-6xl w-full text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 drop-shadow-lg">
      Join the World's Best Marketplace for Job Seekers
    </h1>
    <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
      Connect with top employers worldwide and find the perfect job that matches your skills and experience.
    </p>
  </div>


  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl">
    {[{
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
    ].map((feature, index) => (
      <div
        key={index}
        className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-indigo-700 flex items-center">
          ✅ {feature.title}
        </h2>
        <p className="text-gray-600 mt-2">{feature.desc}</p>
      </div>
    ))}
  </div>


  <div className="mt-12">
    <Link
      to="/category"
      className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-blue-700 text-white font-semibold text-lg rounded-full shadow-md hover:scale-105 transform transition-all"
    >
      Get Started →
    </Link>
  </div>
</div>



{/* Part 2  */}

<div className=" bg-gray-50 w-full  flex flex-col justify-center items-center py-20">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        
      
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="w-80 h-80 overflow-hidden rounded-xl">
            <img
              src={images[currentImage]}
              alt="Freelancer"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />
          </div>
        </div>

     
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

          <button onClick={handleEmployerClick} className="mt-4 px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold text-lg rounded-lg hover:bg-green-600 shadow-md transition-all">
            See More →
          </button>
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
