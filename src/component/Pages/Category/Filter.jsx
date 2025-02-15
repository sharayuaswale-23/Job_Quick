import React from "react";

const JobFilters = ({
  filters,
  onFilterChange,
  categories,
  isLoading,
  selectedCategory,
  selectedSubcategory,
  handleCategoryChange,
  handleSubcategoryChange,
}) => {
  return (
    <div className="sticky top-0 border rounded-lg pl-16 pt-4 px-6 lg:px-4 lg:py-5 bg-white shadow-lg w-90">
      <div className="mb-4 lg:mb-6">
        <label className="text-xl font-semibold text-black mb-6">Categories</label>
        <select
          value={selectedCategory ? selectedCategory._id : ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="mt-5 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && selectedCategory.subcategories && (
        <div className="mb-4 lg:mb-6">
          <label className="text-xl font-semibold text-black mb-6">Subcategories</label>
          <select
            value={selectedSubcategory}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            className="mt-5 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          >
            <option value="">All Subcategories</option>
            {selectedCategory.subcategories.map((subcategory) => (
              <option key={subcategory.title} value={subcategory.title}>
                {subcategory.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4 lg:mb-6">
        <label className="text-xl font-semibold text-black mb-6">Experience Level</label>
        <select
          value={filters.experience}
          onChange={(e) => onFilterChange("experience", e.target.value)}
          className="mt-5 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        >
          <option value="">All Experience Levels</option>
          <option value="fresher">Fresher</option>
          <option value="1 to 3 years">1-3 years</option>
          <option value="3 to 5 years">3-5 years</option>
          <option value="more than 5 years">More than 5 years</option>
        </select>
      </div>

      <div className="mb-4 lg:mb-6">
        <label className="text-xl font-semibold text-black mb-6">Job Type</label>
        <div className="mt-5 flex flex-col space-y-3">
          {["Full-Time", "Part-Time"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="jobType"
                value={type}
                checked={filters.jobType === type}
                onChange={(e) => onFilterChange("jobType", e.target.value)}
                className="form-radio text-pink-500"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4 lg:mb-6">
        <label className="text-xl font-semibold text-black mb-6">Work Type</label>
        <div className="mt-5 flex flex-col space-y-3">
          {["Remote", "OnSite", "Hybrid"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="workType"
                value={type}
                checked={filters.workType === type}
                onChange={(e) => onFilterChange("workType", e.target.value)}
                className="form-radio text-pink-500"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobFilters;