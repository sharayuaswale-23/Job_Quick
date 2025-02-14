import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BriefcaseBusiness, CalendarDays, Trophy } from "lucide-react";

const JobPosting = () => {
  const JobId = Cookies.get("userId");
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    profileImg: null,
    fullName: "",
    title: "",
    experience: "",
    minEducation: "",
    companyName: "",
    numOfEmployee: "",
    companyURL: "",
    companyEmail: "",
    phoneNo: "",
    jobType: "",
    jobDescription: "",
    workType: "",
    interviewType: "",
    companyDescription: "",
    minPackage: "",
    maxPackage: "",
    skills: [],
    noOfOpeaning: "",
    location: "",
    subcategories: [],
    categoryTitle: "",
    createdBy: JobId,
  });

  const JobToken = Cookies.get("jwtToken");
  const jobPostApi = "https://jobquick.onrender.com/job";
  const CategoryApi = "https://jobquick.onrender.com/categories";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(CategoryApi, {
          headers: {
            Authorization: `Bearer ${JobToken}`,
          },
        });

        let processedCategories = [];
        const data = response.data;
        console.log(data);

        if (data.categories) {
          processedCategories = data.categories;
        } else if (data.data) {
          processedCategories = data.data;
        } else if (Array.isArray(data)) {
          processedCategories = data;
        } else if (typeof data === "object") {
          processedCategories = Object.values(data);
        }

        setCategories(processedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (JobToken) {
      fetchCategories();
    }
  }, [JobToken]);

  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill],
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          setError("Please upload an image file");
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setError("File size should be less than 5MB");
          return;
        }

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setFormData((prev) => ({ ...prev, [name]: file }));
      }
      return;
    } else if (name === "skills") {
      setSkillInput(value);
    } else if (name === "categoryTitle") {
      // Find the selected category
      const selectedCategory = categories.find((cat) => cat.title === value);

      // Check if subcategories exist and are not empty
      const subcategories = selectedCategory?.subcategories || [];

      if (subcategories.length === 0) {
        setError("No subcategories available for this category");
      } else {
        setError(null);
      }

      setAvailableSubcategories(subcategories);

      // Reset form data for category-related fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        subcategories: "", // Reset subcategory selection
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (skillInput.trim()) {
        addSkill(skillInput);
        setSkillInput(""); // Clear input after adding
      }
    } else if (e.key === ",") {
      e.preventDefault();
      if (skillInput.trim()) {
        addSkill(skillInput);
        setSkillInput("");
      }
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const submitFormData = new FormData();

      // Append all form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (key === "skills") {
            // Convert skills array to a simple comma-separated string when sending to server
            const skillsString = formData[key].join(", ");
            submitFormData.append(key, skillsString);
          } else if (key === "profileImg") {
            if (formData[key] instanceof File) {
              submitFormData.append(key, formData[key]);
            }
          } else {
            submitFormData.append(key, formData[key]);
          }
        }
      });

      const response = await axios.post(jobPostApi, submitFormData, {
        headers: {
          Authorization: `Bearer ${JobToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      if (response.data) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setError(
        error.response?.data?.message || "Failed to post job. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const renderCompanyForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Company Logo
        </label>
        <div className="mt-1 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="file"
            name="profileImg"
            accept="image/*"
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-lg"
            />
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Provider Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Email
          </label>
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter company email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company URL
          </label>
          <input
            type="url"
            name="companyURL"
            value={formData.companyURL}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter company website"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Employees
          </label>
          <input
            type="number"
            name="numOfEmployee"
            value={formData.numOfEmployee}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter employee count"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Description
        </label>
        <textarea
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleInputChange}
          rows="5"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Describe your company"
        ></textarea>
      </div>

      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="w-1/2 bg-green-500 hover:bg-green-700 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Next
        </button>
      </div>
    </>
  );

  const renderJobDetailsForm = () => (
    <>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter job title"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Number of Openings
        </label>
        <input
          type="number"
          name="noOfOpeaning"
          value={formData.noOfOpeaning}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter number of positions"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          {isLoading ? (
            <div className="mt-1 block w-full h-10 bg-gray-100 animate-pulse rounded-md" />
          ) : error ? (
            <div className="mt-1 text-red-500 text-sm">{error}</div>
          ) : (
            <select
              name="categoryTitle"
              value={formData.categoryTitle}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {formData.categoryTitle && availableSubcategories.length > 0 && (
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Subcategory
            </label>
            <select
              name="subcategories"
              value={formData.subcategories}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Subcategory</option>
              {availableSubcategories.map((subcat, index) => (
                <option key={index} value={subcat.title}>
                  {subcat.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.categoryTitle && availableSubcategories.length === 0 && (
          <div className="flex-1">
            <div className="mt-6 text-sm text-red-500">
              No subcategories available for this category
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Job Type
        </label>
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part Time</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter job location"
        />
      </div>

      <div className="flex justify-between gap-2 md:gap-6">
        <button
          type="button"
          onClick={handlePrevious}
          className="w-1/2 bg-gray-300  text-gray-700 py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-1/2 bg-green-500 hover:bg-green-700 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Next
        </button>
      </div>
    </>
  );

  const renderRequirementsForm = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Package
          </label>
          <input
            type="text"
            name="minPackage"
            value={formData.minPackage}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter minimum package eg: 3LPA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Package
          </label>
          <input
            type="text"
            name="maxPackage"
            value={formData.maxPackage}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter maximum package eg: 5LPA"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Interview Type
          </label>
          <select
            name="interviewType"
            value={formData.interviewType}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Interview Type</option>
            <option value="Online">Online</option>
            <option value="Walk-In">Walk In</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select experience level</option>
            <option value="Fresher">Fresher</option>
            <option value="1 to 3 years">1 to 3 years</option>
            <option value="3 to 5 years">3 to 5 years</option>
            <option value="more than 5 years">more than 5 years</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Work Type
          </label>
          <select
            name="workType"
            value={formData.workType}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Work Type</option>
            <option value="Remote">Remote</option>
            <option value="OnSite">On-Site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Education
          </label>
          <input
            type="text"
            name="minEducation"
            value={formData.minEducation}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter minimum education required"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Required Skills
        </label>
        <div className="">
          <input
            type="text"
            name="skills"
            value={skillInput}
            onChange={handleInputChange}
            onKeyDown={handleSkillInputKeyDown}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Type a skill and press Enter or comma to add"
          />
          <div className="mt-2 text-xs text-gray-500">
            Press Enter or comma (,) to add a skill
          </div>
        </div>
        {formData.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-1 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Description
        </label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleInputChange}
          rows="5"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Describe the job responsibilities and requirements"
        ></textarea>
      </div>

      <div className="flex justify-between gap-2 md:gap-6">
        <button
          type="button"
          onClick={handlePrevious}
          className="w-1/2 bg-gray-300  text-gray-700 py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Previous
        </button>
        <button
          type="submit"
          className="w-1/2 bg-green-500 hover:bg-green-700 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Submit
        </button>
      </div>
    </>
  );
  return (
    <>
    <div className="min-h-screen flex justify-center p-4 md:p-10 bg-gradient-to-b from-green-100 to-green-200">
      <div className="hidden w-1/2 lg:flex flex-1 flex-col justify-center p-20 backdrop-blur">
          <div className="flex flex-col justify-center px-8 w-full text-black">
            <h2 className="text-3xl font-bold mb-4">🚀 Find the Right Talent, Faster!</h2>
            <p className="mb-4 text-teal-900">
              Join thousands of businesses that trust us for hiring top talent.
            </p>
            <div className="mb-4 flex items-center">
              <div className="bg-white rounded-full flex items-center justify-center w-10 h-10 mr-4">
                <BriefcaseBusiness className="text-teal-900" />
              </div>
              Post your job in minutes and connect with qualified candidates.
            </div>
            <div className="mb-4 flex items-center">
              <div className="bg-white rounded-full flex items-center justify-center w-10 h-10 mr-4">
                <CalendarDays className="text-teal-900" />
              </div>
              Effortless recruitment – because hiring should be easy, not stressful.
            </div>
            <div className="mb-4 flex items-center">
              <div className="bg-white rounded-full flex items-center justify-center w-10 h-10 mr-4">
                <Trophy className="text-teal-500" />
              </div>
              Your next great hire is just a click away.
            </div>
            <p className="mb-4 text-teal-900">
              "They say great businesses are built by great teams—let’s build yours today!"
            </p>
            <p className="text-lg font-bold mb-4">📢 Post your job now and start hiring the best!</p>
          </div>
        </div>

  
      
         <div className="md:p-6 p-2 w-full lg:w-1/2 bg-gray-100 rounded-lg shadow-md">
           <h2 className="text-4xl font-bold mb-6 text-center bg-green-700 bg-clip-text text-transparent">
             Post Job
           </h2>

           {isLoading && (
             <div className="min-h-screen flex items-center justify-center bg-gray-50">
               <div className="text-center">
                 <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white" />
                 {/* <p className="text-white text-2xl mt-4">Loading your jobs...</p> */}
               </div>
             </div>
           )}

           <form className="space-y-6 p-4" onSubmit={handlePostJob}>
             {step === 1 && renderCompanyForm()}
             {step === 2 && renderJobDetailsForm()}
             {step === 3 && renderRequirementsForm()}
           </form>
         </div>
       </div>
    </>
  );
};

export default JobPosting;
