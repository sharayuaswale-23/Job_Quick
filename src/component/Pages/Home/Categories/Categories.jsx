import React from "react";

const Categorie = [
  { id: 1, name: "Development & IT", services: 8, logo: "💻" },
  { id: 2, name: "Design & Creative", services: 8, logo: "🎨" },
  { id: 3, name: "Digital Marketing", services: 1, logo: "📣" },
  { id: 4, name: "Writing & Translation", services: 1, logo: "📝" },
  { id: 5, name: "Music & Audio", services: 0, logo: "🎵" },
  { id: 6, name: "Video & Animation", services: 0, logo: "🎬" },
  { id: 7, name: "Programming & Tech", services: 1, logo: "🔧" },
  { id: 8, name: "Finance & Accounting", services: 4, logo: "📊" },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100  py-10 px-4">
      <h1 className="text-3xl font-semibold text-center mb-4">Browse talent by category</h1>
      <p className="text-center text-gray-600 mb-8">Get some inspirations from 1800+ skills</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {Categorie.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">{category.logo}</div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">{category.name}</h2>
            <p className="text-gray-500">{category.services} Services</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;