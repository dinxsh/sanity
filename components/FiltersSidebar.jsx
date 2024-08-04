import React from "react";

const FiltersSidebar = () => {
  return (
    <div class="bg-gray-800 p-4 rounded-lg "> 
    <form>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-white">Filters</h2>
        <button class="bg-gray-800 hover:bg-gray-600 text-white font md:py-2 md:px-4 rounded">
        <input type="reset" value="Reset" className="cursor-pointer" />
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Game</label>
        <select className="w-full p-2 rounded-md bg-gray-600 text-white"  > 
          <option selected>Select Game</option>
          <option className="text-sm">BGMI</option>
          <option className="text-sm">Free Fire Max</option>
          <option className="text-sm">Valorant</option>
          <option className="text-sm">COD Mobile</option>
          <option className="text-sm">Pokemon Unite</option>
          <option className="text-sm">Clash of Clans</option>
          <option className="text-sm">Cricket</option>
          <option className="text-sm">NEW STATE Mobile</option>
          <option className="text-sm">GTA V</option>
          <option className="text-sm">League of Legends PC</option>
          <option className="text-sm">FIFA 22</option>
          <option className="text-sm">Brawl Stars</option>
          <option className="text-sm">Apex Legends Mobile</option>
          <option className="text-sm">Clash Royale</option>
          <option className="text-sm">Mobile Legends Bang Bang</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Role</label>
        <select className="w-full p-2 rounded-md bg-gray-600 text-white">
          <option>Select role</option>
          <option>Select role</option>
          <option>Select role</option>
          <option>Select role</option>
          <option>Select role</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Language</label>
        <select className="w-full p-2 rounded-md bg-gray-600 text-white">
          <option selected>Select Language</option>
          <option >English</option>
          <option >Hindi</option>
        </select>
      </div>
      <button className="w-full mt-5 p-2 bg-indigo-600 text-white rounded-md">
        Apply
      </button>
      </form>
    </div>
  );
};

export default FiltersSidebar;
