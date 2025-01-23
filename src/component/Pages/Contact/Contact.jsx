import React from "react";
import { FaPhone, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";

const ContactPage = () => {
  return (
    <>
        <Header />
  

      {/* Page Content */}
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex flex-col items-center justify-center px-4 py-10 pt-24 animate-fadeIn">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-10 text-center animate-bounceIn">
          Get in Touch with Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl">
          {/* Contact Details */}
          <div className="flex flex-col gap-10 p-8 bg-white rounded-3xl shadow-2xl transform transition-transform duration-700 hover:scale-105 animate-slideInLeft">
            {/* Contact Option 1 */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow ">
              <div className="text-5xl text-blue-500 animate-pulseSlow">
                <FaPhone />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Talk to Us</h3>
                <p className="text-gray-600">
                  Call Us Toll-Free: <strong>1800-102-5557</strong>
                </p>
                <p className="text-gray-600">(9:00 AM to 9:00 PM IST)</p>
              </div>
            </div>

            {/* Contact Option 2 */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-zoomIn">
              <div className="text-5xl text-green-500 animate-bounce">
                <FaCommentDots />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Chat with Us</h3>
                <p className="text-gray-600">
                  Chat between (10 AM to 7 PM IST, Mon to Sun)
                </p>
              </div>
            </div>

            {/* Contact Option 3 */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-zoomOut">
              <div className="text-5xl text-red-500 animate-wiggle">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Walk In</h3>
                <p className="text-gray-600">Walk into the nearest branch</p>
              </div>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="p-10 bg-white rounded-3xl shadow-2xl transform transition-transform duration-700 hover:scale-105 animate-slideInRight">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fadeIn">
              We'll get in touch with you
            </h2>
            <p className="text-gray-600 mb-6 animate-zoomIn">
              The information will only be used to reach out to you for related services.
            </p>
            <form className="flex flex-col gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounceIn"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounceIn"
                required
              />
              <input
                type="tel"
                placeholder="Mobile"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounceIn"
                required
              />
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounceIn"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-bold text-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-600"
              >
                Call Me Back
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-[450px] mt-10 rounded-lg overflow-hidden shadow-lg">
      <iframe
        title="Google Map Location"
        src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d119090.96691046697!2d79.04094567126575!3d21.128797808777016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bd4c742b8355b1d%3A0x14a5864727eef499!2sArc%20Technologies%20And%20Institutions%2C%20Gurudev%20Nagar%20Main%20Road%2C%20beside%20HPCL%20Gurudeo%20Petrol%20Pump%2C%20Chota%20Tajbag%2C%20Nandanvan%2C%20Nagpur%2C%20Maharashtra!3m2!1d21.1286576!2d79.12334919999999!5e0!3m2!1sen!2sin!4v1725872988478!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ContactPage;
