const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h4 className="font-bold text-lg mb-4">About</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Become Seller</a></li>
            <li><a href="#" className="hover:underline">Jobs on Freeio</a></li>
            <li><a href="#" className="hover:underline">Pricing</a></li>
            <li><a href="#" className="hover:underline">Services Freeio</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h4 className="font-bold text-lg mb-4">Categories</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Design & Creative</a></li>
            <li><a href="#" className="hover:underline">Development & IT</a></li>
            <li><a href="#" className="hover:underline">Music & Audio</a></li>
            <li><a href="#" className="hover:underline">Programming & Tech</a></li>
            <li><a href="#" className="hover:underline">Digital Marketing</a></li>
            <li><a href="#" className="hover:underline">Finance & Accounting</a></li>
            <li><a href="#" className="hover:underline">Writing & Translation</a></li>
            <li><a href="#" className="hover:underline">Trending</a></li>
            <li><a href="#" className="hover:underline">Lifestyle</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="font-bold text-lg mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Help & Support</a></li>
            <li><a href="#" className="hover:underline">FAQ Freeio</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Subscribe and Apps Section */}
        <div>
          <h4 className="font-bold text-lg mb-4">Subscribe</h4>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none w-1/2 md:w-full"
            />
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-1/3 md:w-auto">
              Send
            </button>
          </div>
          <h4 className="font-bold text-lg mt-6">Apps</h4>
          <ul className="space-y-2">
            <li><a href="#" className="flex items-center hover:underline">iOS App</a></li>
            <li><a href="#" className="flex items-center hover:underline">Android App</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="text-center md:text-left mb-4 md:mb-0">
          © Freeio. 2022 CreativeLayers. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <p href="#">Follow Us:</p>
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
    </footer>
  );
};

export default Footer;
