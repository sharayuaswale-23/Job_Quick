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
      {/* <div className="min-h-screen bg-gradient-to-br bg-gray-100 flex flex-col items-center justify-center pt-24 animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-10 text-center animate-bounceIn">
          Get in Touch with Us
        </h1>

        <div className="grid grid-cols-1 px-4 md:px-12 md:grid-cols-2 gap-12 w-full max-w-7xl">
         
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
      </div> */}

      {/* <div className="min-h-screen pt-28 flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-16 py-20">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
      
        <div className="hidden lg:flex bg-cover flex-col justify-center w-1/2 bg-black relative p-10 text-white" style={{backgroundImage:'url(https://www.pixelstalk.net/wp-content/uploads/2016/10/Download-Architecture-Photo.png)'}}>
        <div className="bg-black inset-0  bg-opacity-60 backdrop-blur-3xl"></div>
          <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
          <p className="text-sm text-white-300 mb-6">Reach us at our office or send us a message.</p>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold">Address</p>
              <p className="text-white-300">Ram Nagar, Nagpur</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Let's Talk</p>
              <p className="text-gray-400">+91 9999999999</p>
            </div>
            <div>
              <p className="text-lg font-semibold">General Support</p>
              <p className="text-gray-400">sharayuawale123@gmail.com</p>
            </div>
          </div>
        </div>

      
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Send Us A Message</h2>
          <form className="space-y-6">
          <input
          onChange={(e) => setName(e.target.value)}
          required
           type="text" placeholder="Name" 
           className="w-full border border-gray-300 outline-none rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />

            <input
             onChange={(e) => setEmail(e.target.value)}
             required 
             type="email" placeholder="Email Address" 
             className="w-full border border-gray-300 outline-none  rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />

            <input
            onChange={(e) => setNumber(e.target.value)}
            required
             type="number" placeholder="Phone Number" className="w-full border outline-none  border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />

            <textarea
             onChange={(e) => setMessage(e.target.value)}
             placeholder="Write us a message" className="w-full border border-gray-300 outline-none  rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-blue-500">
             </textarea>

            <button
             onClick={closeModal}
             className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300">
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

         
      </div> */}

    <div className="min-h-screen pt-28 flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-16 py-20">
  <div className="flex flex-col lg:flex-row w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
    
   
    <div 
      className="hidden lg:flex flex-col justify-center w-1/2 relative p-10 text-white"
      style={{ backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/2016/10/Download-Architecture-Photo.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
    
      <div className="absolute inset-0  bg-opacity-60 backdrop-blur-3xl"></div>

   
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-4 text-white">Contact Information</h2>
        <p className="text-lg text-gray-300 mb-6">Reach us at our office or send us a message.</p>
        <div className="space-y-6">
          <div>
            <p className="text-lg font-semibold text-white">📍 Address</p>
            <p className="text-gray-300">Ram Nagar, Nagpur</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">📞 Let's Talk</p>
            <p className="text-gray-300">+91 9999999999</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">📧 General Support</p>
            <p className="text-gray-300">sharayuaswale123@gmail.com</p>
          </div>
        </div>
      </div>
    </div>

  
    <div className="w-full lg:w-1/2 bg-white p-8 sm:p-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Send Us A Message</h2>
      <form className="space-y-6">
        <input 
        onChange={(e) => setName(e.target.value)}
        required
        type="text" placeholder="First Name" 
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />

        <input
         onChange={(e) => setEmail(e.target.value)}
         required 
         type="email" placeholder="Email Address" 
         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />

        <input
         onChange={(e) => setNumber(e.target.value)}
         required
         type="number" placeholder="Phone Number" 
         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />

        <textarea
        onChange={(e) => setMessage(e.target.value)}
         placeholder="Write us a message" 
         className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-blue-500">
         </textarea>

        <button
        onClick={closeModal}
         className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300">
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