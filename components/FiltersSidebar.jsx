// components/FiltersSidebar.js
import React from 'react';

const FiltersSidebar = () => {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg">
        <h2 className="text-xl mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block mb-2">Game</label>
          <select className="w-full p-2 bg-gray-700 text-white">
            <option>Select</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Role</label>
          <select className="w-full p-2 bg-gray-700 text-white">
            <option>Select role</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Language</label>
          <select className="w-full p-2 bg-gray-700 text-white">
            <option>Select Language</option>
          </select>
        </div>
        <button className="w-full mt-5 p-2 bg-indigo-400 text-white rounded-md">Apply</button>
      </div>
    );
  };

export default FiltersSidebar;
