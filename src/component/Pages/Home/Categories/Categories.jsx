import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IT from "../../../../assets/Images/IT&Networking.png";
import digitalmarketing from "../../../../assets/Images/digitalmarketing.png";
import datascience from "../../../../assets/Images/Datascience.webp";
import customerservice from "../../../../assets/Images/Customerservice.png";
import sales from "../../../../assets/Images/Sales&Marketing.png";
import HR from "../../../../assets/Images/Humanresource.webp";
import Manager from "../../../../assets/Images/manager.webp";
import account from "../../../../assets/Images/accounting.jpg";

const Categorie = [
  { id: 1, name: "IT & Networking", logo: IT },
  { id: 2, name: "Digital Marketing", logo: digitalmarketing },
  { id: 3, name: "Data Science", logo: datascience },
  { id: 4, name: "Customer Service", logo: customerservice },
  { id: 5, name: "Sales & Marketing", logo: sales },
  { id: 6, name: "Human Resource", logo: HR },
  { id: 7, name: "Project Manager", logo: Manager },
  { id: 8, name: "Accounting", logo: account }
];

const Categories = () => {

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/category?categories=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-semibold text-center mb-3">Browse talent by category</h1>
      <p className="text-center text-gray-600 mb-6">Get some inspirations from 1800+ skills</p>
      <div className="max-w-8xl mx-auto flex flex-wrap justify-center gap-4">
        {Categorie.map((category) => (
          <div
            onClick={() => handleCategoryClick(category.name)}
            key={category.id}
            className="bg-white shadow-md rounded-lg p-5 text-center hover:shadow-lg hover:cursor-pointer hover:scale-105 transition-transform duration-300 w-[260px]"
          >
            <img src={category.logo} alt={category.name} className="w-12 h-12 mx-auto mb-3" />
            <h2 className="text-lg font-medium text-gray-800">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
