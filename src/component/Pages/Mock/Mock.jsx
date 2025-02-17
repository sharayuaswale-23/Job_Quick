import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import exam from "../../../assets/Images/exam1.webp";

const AiMockTest = () => {
    const CategoryApi = "https://jobquick.onrender.com/categories";
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = Cookies.get("userToken");
                const response = await fetch(CategoryApi, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleStartTest = () => {
        if (selectedCategory && selectedSubcategory) {
            navigate(`/questions/${selectedCategory.title}/${selectedSubcategory}`);
        }
    };

    return (
       <>
         <Header/>

         <div className="mt-20 bg-gray-50 px-6 py-4 lg:py-8 md:px-16">
  <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white border border-gray-200 rounded-lg shadow-lg">
    {/* Left Section */}
    <div className="md:w-1/2 min-h-screen w-full h-full text-center bg-white md:text-center flex flex-col items-center justify-center py-4 px-4 md:py-8 md:px-6">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4 text-center md:text-left">Online Examination</h1>
      <p className="text-lg text-gray-600 italic mb-6 text-center md:text-left">“Success is where preparation and opportunity meet.”</p>
      <div className="bg-gray-50 p-8 w-full md:w-3/4 lg:w-2/3 max-w-md flex flex-col items-center shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Select Your Test</h2>
        
        <select
          className="w-full p-3 border rounded-lg mb-4 focus:ring-4 focus:ring-blue-400 transition-all hover:shadow-md"
          onChange={(e) =>
            setSelectedCategory(categories.find(cat => cat._id === e.target.value))
          }
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.title}</option>
          ))}
        </select>
        
        {selectedCategory && (
          <select
            className="w-full p-3 border rounded-lg mb-4 focus:ring-4 focus:ring-blue-400 transition-all hover:shadow-md"
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">Select Subcategory</option>
            {selectedCategory.subcategories.map((sub, index) => (
              <option key={index} value={sub.title}>{sub.title}</option>
            ))}
          </select>
        )}
        
        {selectedSubcategory && (
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={handleStartTest}
          >
            Start Test
          </button>
        )}
      </div>
    </div>
    
    {/* Right Section - Hidden on smaller devices */}
    <div className="hidden md:flex md:w-1/2 min-h-screen items-center justify-center relative">
      <div className="bg-white w-full max-w-md relative">
        <img src={exam} alt="Exam Illustration" className="w-full" />
      </div>
    </div>
  </div>
</div>

        <Footer/>
       </>
    );
};

export default AiMockTest;