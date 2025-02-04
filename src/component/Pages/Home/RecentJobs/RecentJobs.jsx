import React from "react";
import { Link } from "react-router-dom";

const RecentJobs = () => {
  const jobs = [
    {
      title: "Frontend Developer for SaaS Platform",
      company: "TechFlow Inc.",
      location: "San Francisco",
      proposals: 12,
      posted: "2 days ago",
      logo: "https://cdn.sanity.io/images/kts928pd/production/a195406f1cbf3510e8901abf512267d4a80d2230-359x359.png/50x50.png?text=TF", // Placeholder logo
    },
    {
      title: "Content Writer for Education Blog",
      company: "LearnPro",
      location: "Austin",
      proposals: 8,
      posted: "5 days ago",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLwuJW06_xXMPjlF4qPsUxtqMK8LIg5d3hJg&s/50x50.png?text=LP",
    },
    {
      title: "Mobile App Developer",
      company: "InnovateApps",
      location: "New York",
      proposals: 15,
      posted: "1 week ago",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZqNcVwL0dWavEY5UGQ_xui6JuTFoYvcplA&s/50x50.png?text=IA",
    },
    {
      title: "Backend Developer for E-commerce",
      company: "ShopVerse",
      location: "Seattle",
      proposals: 10,
      posted: "3 days ago",
      logo: "https://img.atom.com/story_images/visual_images/1658305987-shopverse.png?class=show/50x50.png?text=SV",
    },
    {
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "Los Angeles",
      proposals: 5,
      posted: "4 days ago",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkIyPudzM_ekLP7rtAnIcLUr16-BDYk5HqGQ&s/50x50.png?text=DS",
    },
    {
      title: "Cloud Engineer",
      company: "CloudGenics",
      location: "Miami",
      proposals: 7,
      posted: "2 weeks ago",
      logo:"https://cdn.sanity.io/images/kts928pd/production/a195406f1cbf3510e8901abf512267d4a80d2230-359x359.png/50x50.png?text=TF",
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Recent Job Listings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
        {jobs.map((job, index) => (
          <Link
          to="/category"
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl relative"
          >
      
            <div className="absolute top-[-25px] left-6 w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center">
              <img
                src={job.logo}
                alt={`${job.company} Logo`}
                className="w-10 h-10 object-contain"
              />
            </div>
          
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{job.company}</p>
              <p className="text-gray-400 text-sm mt-1 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {job.location}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">{job.posted}</span>
                <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">
                  {job.proposals} Proposals
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
