import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "tailwindcss/tailwind.css";
import { CgProfile } from "react-icons/cg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   return (
//     <div
//       className={`bg-white h-full fixed top-0 left-0 shadow-lg p-5 transition-all duration-300 ease-in-out transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } md:translate-x-0 md:w-64 z-20`}
//     >
//       <button
//         className="md:hidden bg-green-500 text-white px-3 py-2 rounded-lg absolute top-5 right-5"
//         onClick={toggleSidebar}
//       >
//         Close
//       </button>
//       <div className="flex items-center mb-8">
//         <img
//           src="https://via.placeholder.com/40"
//           alt="User Profile"
//           className="rounded-full h-10 w-10"
//         />
//         <span className="ml-3 font-semibold text-lg">Sharayu Aswale</span>
//       </div>
//       <ul className="space-y-4">
//         {[
//           "Dashboard",
//           "My Profile",
//           "My Jobs",
//           "Messages",
//           "Submit Job",
//           "Save Candidate",
//         ].map((item, index) => (
//           <li
//             key={index}
//             className="text-gray-700 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
//           >
//             {item}
//           </li>
//         ))}
//       </ul>
//       <div className="mt-8">
//         <div className="bg-gray-200 h-2 w-full rounded-full overflow-hidden">
//           <div className="bg-green-500 h-2 w-3/4"></div>
//         </div>
//         <p className="text-gray-500 text-sm mt-2">87% Profile Complete</p>
//       </div>
//       <button className="mt-4 text-red-500 hover:text-red-700">Logout</button>
//     </div>
//   );
// };

// const DashboardStats = () => {
//   const stats = [
//     { count: "07", label: "Posted Job", icon: "https://via.placeholder.com/24" },
//     { count: "03", label: "Shortlisted", icon: "https://via.placeholder.com/24" },
//     { count: "1.7k", label: "Application", icon: "https://via.placeholder.com/24" },
//     { count: "04", label: "Save Candidate", icon: "https://via.placeholder.com/24" },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//       {stats.map((stat, index) => (
//         <div
//           key={index}
//           className="bg-white p-5 shadow-lg rounded-lg text-center hover:shadow-2xl transition-shadow"
//         >
//           <img src={stat.icon} alt={stat.label} className="mx-auto mb-3" />
//           <h3 className="text-lg font-semibold">{stat.count}</h3>
//           <p className="text-gray-500">{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// const JobViewsChart = () => {
//   const data = {
//     labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//     datasets: [
//       {
//         label: "Job Views",
//         data: [50, 200, 300, 150, 100, 250, 180],
//         borderColor: "#10B981",
//         backgroundColor: "rgba(16, 185, 129, 0.2)",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <div className="bg-white p-5 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
//       <h3 className="text-lg font-semibold mb-4">Job Views</h3>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// const PostedJobs = () => {
//   const jobs = [
//     {
//       title: "Web & Mobile Prototype",
//       type: "Fulltime",
//       location: "Spain",
//       logo: "https://via.placeholder.com/24",
//     },
//     {
//       title: "Document Writer",
//       type: "Part-time",
//       location: "Italy",
//       logo: "https://via.placeholder.com/24",
//     },
//     {
//       title: "Outbound Call Service",
//       type: "Fulltime",
//       location: "USA",
//       logo: "https://via.placeholder.com/24",
//     },
//     {
//       title: "Product Designer",
//       type: "Part-time",
//       location: "Dubai",
//       logo: "https://via.placeholder.com/24",
//     },
//     {
//       title: "Marketing Specialist",
//       type: "Part-time",
//       location: "UK",
//       logo: "https://via.placeholder.com/24",
//     },
//   ];

//   return (
//     <div className="bg-white p-5 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
//       <h3 className="text-lg font-semibold mb-4">Posted Job</h3>
//       <ul>
//         {jobs.map((job, index) => (
//           <li key={index} className="mb-3">
//             <div className="flex justify-between items-center">
//               <img src={job.logo} alt={job.title} className="h-6 w-6 mr-3" />
//               <span>{job.title}</span>
//               <span className="text-gray-500 text-sm">
//                 {job.type} - {job.location}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex">
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <div className="md:ml-64 w-full p-6 bg-gray-100 min-h-screen">
//         <nav className="bg-white p-4 shadow-lg rounded-lg mb-6 flex justify-between items-center sticky top-0 z-10">
//           <button
//             className="md:hidden bg-green-500 text-white px-3 py-2 rounded-lg"
//             onClick={toggleSidebar}
//           >
//             Menu
//           </button>
//           <h1 className="text-lg font-semibold">Dashboard</h1>
//           <input
//             type="text"
//             placeholder="Search here..."
//             className="border p-2 rounded-lg w-1/3 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
//             Post a Job
//           </button>
//         </nav>
//         <DashboardStats />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <JobViewsChart />
//           <PostedJobs />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

const PostedJobs = () => {
    const jobs = [
      {
        title: "Web & Mobile Prototype",
        type: "Fulltime",
        location: "Spain",
        logo: "https://via.placeholder.com/24",
      },
      {
        title: "Document Writer",
        type: "Part-time",
        location: "Italy",
        logo: "https://via.placeholder.com/24",
      },
      {
        title: "Outbound Call Service",
        type: "Fulltime",
        location: "USA",
        logo: "https://via.placeholder.com/24",
      },
      {
        title: "Product Designer",
        type: "Part-time",
        location: "Dubai",
        logo: "https://via.placeholder.com/24",
      },
      {
        title: "Marketing Specialist",
        type: "Part-time",
        location: "UK",
        logo: "https://via.placeholder.com/24",
      },
    ];
  
    return (
      <div className="bg-white p-5 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
        <h3 className="text-lg font-semibold mb-4">Posted Job</h3>
        <ul>
          {jobs.map((job, index) => (
            <li key={index} className="mb-3">
              <div className="flex justify-between items-center">
                <img src={job.logo} alt={job.title} className="h-6 w-6 mr-3" />
                <span>{job.title}</span>
                <span className="text-gray-500 text-sm">
                  {job.type} - {job.location}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

const JobViewsChart = () => {
    const data = {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Job Views",
          data: [50, 200, 300, 150, 100, 250, 180],
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    return (
      <div className="bg-white p-5 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
        <h3 className="text-lg font-semibold mb-4">Job Views</h3>
        <Line data={data} options={options} />
      </div>
    );
  };

const DashboardStats = () => {
    const stats = [
      { count: "07", label: "Posted Job", icon: "https://via.placeholder.com/24" },
      { count: "03", label: "Shortlisted", icon: "https://via.placeholder.com/24" },
      { count: "1.7k", label: "Application", icon: "https://via.placeholder.com/24" },
      { count: "04", label: "Save Candidate", icon: "https://via.placeholder.com/24" },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 shadow-lg rounded-lg text-center hover:shadow-2xl transition-shadow"
          >
            <img src={stat.icon} alt={stat.label} className="mx-auto mb-3" />
            <h3 className="text-lg font-semibold">{stat.count}</h3>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    );
  };

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
      <div
        className={`bg-white h-full fixed top-0 left-0 shadow-lg p-5 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 z-20`}
      >
        <button
          className="md:hidden bg-green-500 text-white px-3 py-2 rounded-lg absolute top-5 right-5"
          onClick={toggleSidebar}
        >
          Close
        </button>
        <div className="flex items-center mb-8">
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="rounded-full h-10 w-10"
          />
          <span className="ml-3 font-semibold text-lg">Sharayu Aswale</span>
        </div>
        <ul className="space-y-4">
          {[
            "Dashboard",
            "My Profile",
            "My Jobs",
            "Messages",
            "Submit Job",
            "Save Candidate",
          ].map((item, index) => (
            <li
              key={index}
              className="text-gray-700 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <div className="bg-gray-200 h-2 w-full rounded-full overflow-hidden">
            <div className="bg-green-500 h-2 w-3/4"></div>
          </div>
          <p className="text-gray-500 text-sm mt-2">87% Profile Complete</p>
        </div>
        <button className="mt-4 text-red-500 hover:text-red-700">Logout</button>
      </div>
    );
  };

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="md:ml-64 w-full p-6 bg-gray-100 min-h-screen">
          <nav className="bg-white p-4 shadow-lg rounded-lg mb-6 flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search here..."
                className="border p-2 rounded-lg w-1/3 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Post a Job
              </button>
            </div>
          </nav>
          <DashboardStats />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <JobViewsChart />
            <PostedJobs />
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  