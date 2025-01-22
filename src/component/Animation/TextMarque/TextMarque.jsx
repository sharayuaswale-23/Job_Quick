import React from "react";
import Marquee from "react-fast-marquee";

const TextMarque = () => {
  return (
    <div className="w-full py-6 bg-gray-100">
      <Marquee gradient={false} speed={30}>
        {["Designer", "Developer", "Web", "iOS", "Android", "Marketing", "Manager"].map(
          (item, index) => (
            <div key={index} className="mx-2 sm:mx-4">
              <button
                className="px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 transition-all"
              >
                {item}
              </button>
            </div>
          )
        )}
      </Marquee>
    </div>
  );
};

export default TextMarque;
