import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl flex flex-wrap overflow-hidden">
       

        <div className="w-full lg:w-1/3 bg-gradient-to-b from-blue-500 to-blue-400 text-white p-8 text-center">
          <div className="relative">
            <img
              src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" 
              alt="Profile"
              className="w-36 h-36 mx-auto rounded-full shadow-lg border-4 border-white"
            />
            <span className="absolute bottom-2 right-16 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
          </div>
          <h1 className="text-2xl font-bold mt-6">Akash Gaydhane</h1>
          <p className="text-sm font-semibold mt-2">Front End developer|| Backend fullstack</p>
          <p className="text-white/90 mt-4 leading-6">
            Passionate fullstack dev dedicated to crafting intuitive digital experiences. Creating visually stunning
            interfaces and websites with a focus on user-centric and user demand .
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['Prototyping', 'Wireframing', 'UX', 'Interaction Design', 'UI', 'Typography'].map(skill => (
              <span
                key={skill}
                className="px-4 py-1 bg-white/20 text-sm rounded-full hover:bg-white hover:text-blue-500 transition"
              >
                {skill}
              </span>
            ))}
          </div>
          <button className="mt-6 px-6 py-2 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition">
            Edit Profile
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-2/3 p-8">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Age', value: '24 years' },
              { label: 'Email', value: 'akash@gmail.com' },
              { label: 'Address', value: 'Nagpur , India' },
              { label: 'Phone', value: '414 - 234 - 3457' },
            ].map(info => (
              <div key={info.label}>
                <p className="text-gray-500">{info.label}:</p>
                <p className="text-gray-800 font-medium">{info.value}</p>
              </div>
            ))}
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-blue-600 mb-4">Work Experience</h2>
            <div className="space-y-6">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg shadow-sm">
                <h3 className="text-blue-700 font-semibold">Lead Fullstack developer</h3>
                <p className="text-sm text-blue-600">Udaous Foundation || bharat digital | nagpur city, MH</p>
                <p className="text-sm text-gray-600">2018 - Present</p>
                <p className="mt-2 text-gray-700">
                a collection of technologies that help developers build robust and scalable web applications using JavaScript. 
                </p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg shadow-sm">
                <h3 className="text-blue-700 font-semibold">Senior Fulldtsck developer</h3>
                <p className="text-sm text-blue-600"> Google ||</p>
                <p className="text-sm text-gray-600">2020 - 2021</p>
                <p className="mt-2 text-gray-700">
               capability:
                Developers can work on both the front-end user interface (with React) and the back-end server logic (with Node.js and Express) using the same language. 
                </p>
              </div>
            </div>
          </div>

          {/* Last Activities */}
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-4">Last Activities</h2>
            <div className="space-y-4">
              {[
                'Uploaded a new project titled “ElegantEats: Food Delivery App Redesign” to my portfolio.',
                'Received 20 likes on the project within the first hour of posting.',
                'John Doe commented on the project, praising the sleek design and intuitive user interface.',
                'Alex Brown messaged me with questions about the design inspiration behind the project.',
                'Jane Taylor bookmarked the project for future reference, expressing interest in the menu navigation.',
                'Sarah Smith shared the project with her network, highlighting the innovative checkout process.',
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <img
                    src="https://img.freepik.com/premium-vector/colorful-hexagon-it-technology-logo_139161-589.jpg?semt=ais_hybrid" // Replace with actual avatar URL
                    alt="Activity Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;