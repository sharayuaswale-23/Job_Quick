import React from "react";
import { Link } from "react-router-dom";
import { FaTh} from "react-icons/fa";
import {Search} from "lucide-react";

const Hosterheader = ()=> {
    return(
      <nav className="bg-pink-50 fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="flex items-center justify-between px-4 py-5 md:px-10">
        {/* Logo */}
        <div className="flex items-center text-sm md:text-lg font-bold text-black">
          <Link to="/">
            <FaTh className="mr-2 text-xl" />
          </Link>
          <Link to="/">Job Quick</Link>
        </div>

        {/* Search Bar and Post Button */}
        <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-1 h-2 sm:w-3 md:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                className="md:pl-10 pl-4 md:pr-4 pr-2 py-2 md:w-64 w-32 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <Link to="/jobposting" className="bg-gradient-to-r from-green-600 to-green-800 text-white px-1 md:px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">
              Post a Job
            </Link>
          </div>
      </div>
    </nav>
    )
}

export default Hosterheader;