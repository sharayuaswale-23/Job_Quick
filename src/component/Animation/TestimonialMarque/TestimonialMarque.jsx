import React from "react";
import Marquee from "react-fast-marquee";

const TestimonialMarque = () => {
  const feedbacks = [
    {
      name: "John",
      handle: "@john",
      feedback: "I'm at a loss for words. This is amazing. I love it.",
      gradient: "bg-gradient-to-r from-green-400 to-blue-500",
    },
    {
      name: "Jane",
      handle: "@jane",
      feedback: "I'm at a loss for words. This is amazing. I love it.",
      gradient: "bg-gradient-to-r from-pink-500 to-yellow-500",
    },
    {
      name: "Jack",
      handle: "@jack",
      feedback: "I've never seen anything like this before. It's amazing.",
      gradient: "bg-gradient-to-r from-yellow-400 to-green-500",
    },
    {
      name: "Jenny",
      handle: "@jenny",
      feedback: "I'm at a loss for words. This is amazing. I love it.",
      gradient: "bg-gradient-to-r from-red-400 to-yellow-500",
    },
    {
      name: "James",
      handle: "@james",
      feedback: "I'm at a loss for words. This is amazing. I love it.",
      gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
     
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          What People Are Saying
        </h2>
        <p className="text-gray-600 mt-2">
          Hear from our users about their experiences.
        </p>
      </div>

  
      <Marquee pauseOnHover={true} gradient={false} speed={30} direction="right" className="mb-6">
        {feedbacks.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-4 p-4 bg-white shadow-lg rounded-xl w-64 md:w-72"
          >
            <div
              className={`w-12 h-12 rounded-full ${item.gradient} flex items-center justify-center`}
            >
              <span className="text-white font-bold text-lg">
                {item.name[0]}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mt-4">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.handle}</p>
            <p className="mt-2 text-gray-600 text-center">{item.feedback}</p>
          </div>
        ))}
      </Marquee>

  
      <Marquee pauseOnHover={true} gradient={false} speed={30} direction="left">
        {feedbacks.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-4 p-4 bg-white shadow-lg rounded-xl w-64 md:w-72"
          >
            <div
              className={`w-12 h-12 rounded-full ${item.gradient} flex items-center justify-center`}
            >
              <span className="text-white font-bold text-lg">
                {item.name[0]}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mt-4">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.handle}</p>
            <p className="mt-2 text-gray-600 text-center">{item.feedback}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TestimonialMarque;
