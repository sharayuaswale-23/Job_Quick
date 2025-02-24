import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import amazon from "../../../../assets/Images/amazon.webp";
import AMD from "../../../../assets/Images/AMD.webp";
import Flipkart from "../../../../assets/Images/Flipkart.avif";
import Zomato from "../../../../assets/Images/zomato.png";
import Infosys from "../../../../assets/Images/Infosys.png";
import TCS from "../../../../assets/Images/TCS.webp";
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";


const TopCompany = () => {
  
  const jobs = [
    {
      image:amazon,
      title: "Amazon",
    },
    {
      image:AMD,
      title: "AMD",
    },
    {
      image:Flipkart,
      title: "Flipkart",
    },
    {
      image:Zomato,
      title: "Zomato",
    },
    {
      image:Infosys,
      title: "Infosys",
    },
    {
      image:TCS,
      title: "TCS",
    },
  ];


    const [searchInput, setSearchInput] = useState("");
      const navigate = useNavigate();

    const handleSearch = (companyName) => {
        setSearchInput(companyName); // Update the search input state
        navigate(`/category?title=${encodeURIComponent(companyName)}`);
      };


 

  return (

    <>

<div className="min-h-screen bg-gray-50 p-6">
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto text-center">          
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 mb-8">             
      <Briefcase className="w-4 h-4 text-black mr-2" />             
      <span className="text-black font-medium">Over 1000+ jobs available</span>           
      </div>                      
      <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold mb-6 text-black">
      Find Companies That Deserve You!</h1>                      
      <p className="text-lg md:text-xl text-black max-w-2xl mx-auto mb-12">
      Discover opportunities that match your skills and aspirations
      </p>         
      </div>  

      {/* Job Cards Carousel */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="relative"
        >
          {jobs.map((job, index) => (
            <SwiperSlide key={index}>
              <div 
                className="group relative overflow-hidden rounded-xl border-gray-50 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                onClick={() => handleTitleClick(job.title)}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="p-6 flex justify-between">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    {job.title}
                  </h3>
                  
                  <button
                    onClick={(e) => {
                      handleSearch(job.title);
                    }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500"
                  >
                    Apply Now
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev absolute left-0 top-1/2 z-10 text-black">
            <ChevronLeft className="h-6 w-6 text-gray-900" />
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 z-10 text-black">
            <ChevronRight className="h-6 w-6 text-gray-900" />
          </button>
        </Swiper>
      </div>
    </div>
    </>
  );
};

export default TopCompany;