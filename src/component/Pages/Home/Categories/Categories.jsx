import React from "react";
import { Link } from "react-router-dom";

const Categorie = [
  { id: 1, name: "IT & Networking", logo: "💻" },
  { id: 2, name: "Digital Marketing", logo: "🎨" },
  { id: 3, name: "Data Science", logo: "📣" },
  { id: 4, name: "Customer Service", logo: "📝" },
  { id: 5, name: "Sales & Marketing", logo: "🎵" },
  { id: 6, name: "Human Resource", logo: "🎬" },
  { id: 7, name: "Project Manager", logo: "🔧" },
  { id: 8, name: "Accounting", logo: "📊" }
];

const Categories = () => {
  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-semibold text-center mb-3">Browse talent by category</h1>
      <p className="text-center text-gray-600 mb-6">Get some inspirations from 1800+ skills</p>
      <div className="max-w-8xl mx-auto flex flex-wrap justify-center gap-4">
        {Categorie.map((category) => (
          <Link
            to="/category"
            key={category.id}
            className="bg-white shadow-md rounded-lg p-5 text-center hover:shadow-lg hover:scale-105 transition-transform duration-300 w-[260px]"
          >
            <div className="text-4xl mb-3">{category.logo}</div>
            <h2 className="text-lg font-medium text-gray-800">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
