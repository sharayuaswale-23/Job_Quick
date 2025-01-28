import React, { useState } from "react";
import { FaPhone, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const api = "https://jobqueck-1.onrender.com/api/contactus";
    const options = { name, email, Number, message };

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });

      const data = await response.json();
      if (response.ok) {
        setModalMessage("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setNumber("");
        setMessage("");
      } else {
        setModalMessage(data.message || "Failed to send the message. Please try again.");
      }
    } catch (error) {
      setModalMessage("An error occurred. Please try again later.");
    } finally {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header />

      {/* Page Content */}
      <div className="min-h-screen bg-gradient-to-br bg-gray-100 flex flex-col items-center justify-center pt-24 animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-10 text-center animate-bounceIn">
          Get in Touch with Us
        </h1>

        <div className="grid grid-cols-1 px-4 md:px-12 md:grid-cols-2 gap-12 w-full max-w-7xl">
          {/* Contact Details */}
          <div className="flex flex-col gap-10 p-8 bg-white rounded-3xl shadow-2xl transform transition-transform duration-700 hover:scale-105 animate-slideInLeft">
            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
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

            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl text-green-500 animate-bounce">
                <FaCommentDots />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Chat with Us</h3>
                <p className="text-gray-600">Chat between (10 AM to 7 PM IST, Mon to Sun)</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl text-red-500 animate-wiggle">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Walk In</h3>
                <p className="text-gray-600">Walk into the nearest branch</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 bg-white rounded-3xl shadow-2xl transform transition-transform duration-700 hover:scale-105 animate-slideInRight">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">We'll get in touch with you</h2>
            <p className="text-gray-600 mb-6">
              The information will only be used to reach out to you for related services.
            </p>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <input value={name}
                type="text"
                placeholder="Name"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input 
                type="email"
                placeholder="Email"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Mobile"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" value={Number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-bold text-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm text-center">
              <p className="text-lg font-semibold mb-4">{modalMessage}</p>
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        )}

        <div className="w-full h-[450px] mt-10 overflow-hidden shadow-lg">
          <iframe
            title="Google Map Location"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.2079855033585!2d79.05346007343789!3d21.144119683809947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c05d75e3bae1%3A0x5094d1a9292b665a!2sRam%20Nagar%2C%20Nagpur%2C%20Maharashtra%20440010!5e0!3m2!1sen!2sin!4v1738052911196!5m2!1sen!2sin"
           width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

         
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;