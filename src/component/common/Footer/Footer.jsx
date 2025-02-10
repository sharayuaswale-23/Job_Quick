import { Link } from "react-router-dom";
import { FaTh} from "react-icons/fa";
import youtube from "../../../assets/Images/youtube-logo.svg";
import facebook from "../../../assets/Images/fb-logo.svg";
import linkedin from "../../../assets/Images/linkedin-logo.svg";
import instagram from "../../../assets/Images/instagram-logo.svg";

const Footer = () => {

  const sendbtn = ()=> {
    alert("Send");
  }
  return (
    <footer className="bg-gray-900 text-white pt-10 py-6 px-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      
        <div>
          <h4 className="font-bold text-lg mb-4">
            <div className="flex items-center text-lg font-bold text-white">
                      <Link to="/">
                        <FaTh className="mr-2 text-xl" />
                      </Link>
                      <Link to="/">Job Quick</Link>
                    </div>
          </h4>
            <p>A Job Portal is an online platform that connects job seekers with employers. It allows users to search for jobs, while employers can post job listings. </p>
        </div>

    
        <div>
          <h4 className="font-bold text-lg mb-4">Address</h4>
          <p>Ram Nagar, Nagpur,  Maharashtra- 431214 </p>
        </div>

       
        <div>
          <h4 className="font-bold text-lg mb-4">Support</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/category" className="hover:underline">My Jobs</Link></li>
            <li><Link to="/" className="hover:underline">Terms of Service</Link></li>
          </ul>
        </div>

    
        <div>
          <h4 className="font-bold text-lg mb-4">Subscribe</h4>
          <form onSubmit={sendbtn} className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="email" required
              placeholder="Your email address"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none w-1/2 md:w-full"
            />
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-1/3 md:w-auto">
              Send
            </button>
          </form>
        </div>
      </div>


      <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="text-center md:text-left mb-4 md:mb-0">
          © JobQuick. 2025 All rights reserved.
        </p>
        <div className="flex space-x-4">
          <p href="#">Follow Us:</p>
          <Link className="text-gray-400 hover:text-white">
              <img src={youtube}/>
            </Link>
            <Link className="text-gray-400 hover:text-white">
              <img src={facebook}/>
            </Link>
            <Link className="text-gray-400 hover:text-white">
              <img src={linkedin}/>
            </Link>
            <Link  className="text-gray-400 hover:text-white">
              <img src={instagram}/>
            </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
