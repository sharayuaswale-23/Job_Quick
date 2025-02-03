import { Link } from "react-router-dom";
import notfoundimg from "../../../assets/Images/notfound.png";

export default function NotFound() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-white p-6">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={notfoundimg}
          alt="404 Not Found"
          className="max-w-xs md:max-w-md lg:max-w-lg"
        />
      </div>
      <div className="text-center md:text-left w-full md:w-1/2 p-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
