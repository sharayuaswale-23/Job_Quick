import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <div>
            <h4 className="text-gray-100 font-semibold mb-3">About</h4>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Become Seller</li>
              <li>Jobs on Freeio</li>
              <li>Pricing</li>
              <li>Services Freeio</li>
              <li>Terms of Service</li>
            </ul>
          </div>

       
          <div>
            <h4 className="text-gray-100 font-semibold mb-3">Categories</h4>
            <ul className="space-y-2">
              <li>Design & Creative</li>
              <li>Development & IT</li>
              <li>Music & Audio</li>
              <li>Programming & Tech</li>
              <li>Digital Marketing</li>
              <li>Finance & Accounting</li>
              <li>Writing & Translation</li>
              <li>Trending</li>
              <li>Lifestyle</li>
            </ul>
          </div>

      
          <div>
            <h4 className="text-gray-100 font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              <li>Help & Support</li>
              <li>FAQ Freeio</li>
              <li>Contact Us</li>
              <li>Services</li>
              <li>Terms of Service</li>
            </ul>
          </div>

        
          <div>
            <h4 className="text-gray-100 font-semibold mb-3">Subscribe</h4>
            <div className="flex md:flex-col space-x-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:mb-3 bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">
                Send
              </button>
            </div>
            <div className="mt-4">
              <h4 className="text-gray-100 font-semibold mb-2">Apps</h4>
              <div className="space-y-2">
                <p>iOS App</p>
                <p>Android App</p>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-8 border-t border-gray-800 pt-4 text-center sm:text-left sm:flex sm:justify-between">
          <p>© Freeio. 2022 CreativeLayers. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex justify-center space-x-4">
          <p>Powered By: </p>
            <a href="#" className="text-gray-400 hover:text-white">
              <img src="https://static.ambitionbox.com/static/icons/social/youtube-logo.svg"/>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <img src="https://static.ambitionbox.com/static/icons/social/instagram-logo.svg"/>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <img src="https://static.ambitionbox.com/static/icons/social/linkedin-logo.svg"/>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <img src="https://static.ambitionbox.com/static/icons/social/fb-logo.svg"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;