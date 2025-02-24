import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, MapPin, Clock } from 'lucide-react';
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";


const TopCompany = () => {
  
  const jobs = [
    {
      image:
        "https://media.wired.com/photos/5926aae5f3e2356fd800a0e8/master/pass/amazon-logo.jpg",
      title: "Amazon",
    },
    {
      image:
        "https://imageio.forbes.com/specials-images/imageserve/657299f9c6898fd9524d546c/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      title: "AMD",
    },
    {
      image:
        "https://images.yourstory.com/cs/2/220356402d6d11e9aa979329348d4c3e/Flipkart-1582211499554.jpg?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75",
      title: "Flipkart",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBIoIr2Y33v0IdprP2CEPnEU07j1IPUUyjnw&s",
      title: "Zomato",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG-mTOvpR2vZqrFGr65sUgVRPJhX5F7VBIBg&s",
      title: "Infosys",
    },
    {
      image:
        "https://worktheater.com/wp-content/uploads/2023/04/tcs-business-model.png.webp",
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

<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
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
                className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
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