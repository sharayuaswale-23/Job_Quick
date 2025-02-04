import React from "react";
import Marquee from "react-fast-marquee";

const AboutMarque = () => {
  const feedbacks = [
    {
      logo: "https://randomuser.me/api/portraits/women/50.jpg",
      name: "Emily J.",
      handle: "Product Manager",
      feedback:
        "I landed a fantastic opportunity thanks to this platform! The process was seamless, and I felt valued as a candidate.",
    },
    {
      logo: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "Michael B.",
      handle: "Data Scientist",
      feedback:
        "This site connected me with top recruiters! I highly recommend it for anyone seeking great job opportunities.",
    },
    {
      logo: "https://randomuser.me/api/portraits/women/60.jpg",
      name: "Sophia L.",
      handle: "UX Designer",
      feedback:
        "The design and functionality of this platform are amazing. It made my job search effortless and efficient!",
    },
    {
      logo: "https://randomuser.me/api/portraits/men/30.jpg",
      name: "David W.",
      handle: "Software Engineer",
      feedback:
        "I've never seen such a well-organized job portal. The UI is fantastic, and the experience was smooth.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 py-14 px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800">Testimonials</h2>
        <p className="text-gray-600 mt-2 text-lg">See what our users have to say.</p>
      </div>

      {/* Marquee Container */}
      <Marquee pauseOnHover={true} gradient={false} speed={50} className="mb-6 w-full">
        {feedbacks.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-6 p-6 bg-white shadow-xl rounded-2xl w-80 md:w-auto transform transition-all duration-300 hover:shadow-2xl"
          >
            <img
              className="rounded-full w-16 h-16 border-4 border-indigo-500 shadow-md"
              src={item.logo}
              alt={item.name}
            />
            <h3 className="font-semibold text-gray-800 mt-4 text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.handle}</p>
            <p className="mt-3 text-gray-700 text-center italic">"{item.feedback}"</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default AboutMarque;
