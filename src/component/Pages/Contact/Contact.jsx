import React, { useState } from "react";
import { FaPhone, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const api = "https://jobqueck-1.onrender.com/api/contactus";
  //   const options = { name, email, Number, message };

  //   try {
  //     const response = await fetch(api, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(options),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       setModalMessage("Your message has been sent successfully!");
  //       setName("");
  //       setEmail("");
  //       setNumber("");
  //       setMessage("");
  //     } else {
  //       setModalMessage(data.message || "Failed to send the message. Please try again.");
  //     }
  //   } catch (error) {
  //     setModalMessage("An error occurred. Please try again later.");
  //   } finally {
  //     setIsModalVisible(true);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ name, email, number, message });
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header />

    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-16 py-20">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden bg-white">
        {/* Left Side - Contact Info */}
        <div
          className="hidden lg:flex flex-col justify-center w-1/2 relative p-12 text-white"
          style={{
            backgroundImage:
              "url(https://media.istockphoto.com/id/1817139946/photo/wall-of-building-modern-architecture-with-metal-elements-building-with-transparent-ceiling.jpg?s=1024x1024&w=is&k=20&c=ZkrbWqVAUhzROo1k1Z19gWsRMRhwqd8l5k_9NGy8ykA=)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-extrabold">Contact Information</h2>
            <p className="text-lg text-gray-200">Reach us at our office or send us a message.</p>
            <div className="space-y-4">
              <p className="text-lg font-semibold">📍 Address: <span className="text-gray-300">Ram Nagar, Nagpur</span></p>
              <p className="text-lg font-semibold">📞 Let's Talk: <span className="text-gray-300">+91 9999999999</span></p>
              <p className="text-lg font-semibold">📧 Email: <span className="text-gray-300">sharayuaswale123@gmail.com</span></p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl text-center font-bold bg-gradient-to-r from-blue-600 to-blue-900 text-black bg-clip-text text-transparent mb-6">Send Us A Message</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 outline-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 outline-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              className="w-full border border-gray-300 outline-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Write us a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full border border-gray-300 outline-none rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-blue-700 text-white py-3 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>


<div className="w-full h-[450px] overflow-hidden shadow-lg">
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


      <Footer />
    </>
  );
};

export default ContactPage;