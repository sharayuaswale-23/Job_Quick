import React from "react";
import { Link } from "react-router-dom";

const Categorie = [
  { id: 1, name: "IT & Networking",  logo: "💻" },
  { id: 2, name: "Digital Marketing", logo: "🎨" },
  { id: 3, name: "Data Science", logo: "📣" },
  { id: 4, name: "Customer Service",  logo: "📝" },
  { id: 5, name: "Sales & Marketing",  logo: "🎵" },
  { id: 6, name: "Human Resource", logo: "🎬" },
  { id: 7, name: "Project Manager", logo: "🔧" },
  { id: 8, name: "Accounting", logo: "📊" },
];



const Categories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100  py-10 px-4">
      <h1 className="text-3xl font-semibold text-center mb-4">Browse talent by category</h1>
      <p className="text-center text-gray-600 mb-8">Get some inspirations from 1800+ skills</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {Categorie.map((category) => (
          <Link to="/category"
            key={category.id}
            className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">{category.logo}</div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
