import React from "react";

const JobFilters = ({ filters, onFilterChange, categories, isLoading, onApplyFilters }) => {
  return (
    <div className="sticky top-0 border rounded-lg px-6 py-8 lg:px-4 lg:py-5 bg-white shadow-lg w-90">
      <div className="mb-6">
        <label className="text-xl font-semibold text-black mb-6">Categories</label>
        <select
          value={filters.categories}
          onChange={(e) => onFilterChange("categories", e.target.value)}
          className="mt-5 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        >
          <option value="">All Categories</option>
          <option value="IT & Networking">IT & Networking</option>
          <option value="Sales & Marketing">Sales & Marketing</option>
          <option value="Data Science">Data Science</option>
          <option value="Customer Service">Customer Service</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Human Resource">Human Resource</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Accounting">Accounting</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-6">
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

      <div className="mb-6">
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

      <div className="mb-6">
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