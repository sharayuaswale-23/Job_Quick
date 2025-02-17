import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import mockgirl from "../../../assets/Images/mockgirl.avif";
import { BookOpen, Brain, ChevronDown } from 'lucide-react';

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

    <div className="min-h-screen mt-20 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row h-full items-center">
          {/* Left Side - Image */}
          <div className="hidden h-full w-full lg:w-1/2 lg:flex items-center justify-center">
            <div className="relative w-full h-full max-w-md">
              <img 
                src={mockgirl}
                alt="Exam Illustration" 
                className="w-full h-full object-contain rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-lg"></div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full h-full lg:w-1/2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              {/* Header Section */}
              <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 text-blue-600" />
          </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Practice Assessment
                </h1>
                <p className="text-lg text-gray-600">
                  Test your knowledge with our comprehensive mock tests
                </p>
              </div>

              <div className="space-y-6">
                {/* Test Parameters Header */}
                <div className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-6">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span>Select Your Test Parameters</span>
                </div>

               {/* Category Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Choose Category
                  </label>
                  <div className="relative">
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10"
                      onChange={(e) => {
                        const category = categories.find(cat => cat._id === e.target.value);
                        setSelectedCategory(category);
                        setSelectedSubcategory(null); // Reset subcategory when category changes
                      }}
                      value={selectedCategory?._id || ""}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
                  </div>
                </div>

                {/* Subcategory Selection */}
                {selectedCategory && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Choose Subcategory
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10"
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        value={selectedSubcategory || ""}
                      >
                        <option value="">Select a subcategory</option>
                        {selectedCategory.subcategories.map((sub, index) => (
                          <option key={index} value={sub.title}>
                            {sub.title}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
                    </div>
                  </div>
                )}

                {/* Start Button */}
                {selectedSubcategory && (
                  <button 
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                    onClick={handleStartTest}
                  >
                    Start Assessment
                    <Brain className="h-5 w-5" />
                  </button>
                )}
       
                {/* Information Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Test Format</h3>
                    <p className="text-sm text-blue-600">
                      60 seconds • 15 questions • Instant results
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Success Rate</h3>
                    <p className="text-sm text-green-600">
                      90% of users improve their scores
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        <Footer/>
       </>
    );
};

export default AiMockTest;