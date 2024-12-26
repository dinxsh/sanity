import React from "react";
import { Button } from "../@/components/ui/button";

const FiltersSidebar = ({ filters, setFilters, onReset }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-4 rounded-lg col-span-1 lg:col-span-3 h-fit border border-neutral-700 shadow transition-all">
      <form>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">Filters</div>
          <Button
            variant="outline"
            type="button"
            className="transition-all"
            onClick={onReset}
            arial-label="reset-btn"
          >
            Reset
          </Button>
        </div>

        {/* Game Filter */}
        <div className="mb-4">
          <label className="block mb-2">Game</label>
          <select
            name="game"
            value={filters.game}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-background  border"
          >
            <option className="text-black" value="" disabled>
              Select Game
            </option>
            <option className="text-black">BGMI</option>
            <option className="text-black">Free Fire Max</option>
            <option className="text-black">Valorant</option>
            <option className="text-black">COD Mobile</option>
            <option className="text-black">Pokemon Unite</option>
            <option className="text-black">Clash of Clans</option>
            <option className="text-black">Cricket</option>
          </select>
        </div>

        {/* Role Filter */}
        <div className="mb-4">
          <label className="block mb-2">Role</label>
          <select
            name="role"
            value={filters.role}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-background border"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option className="text-black">Leader</option>
            <option className="text-black">Member</option>
            <option className="text-black">Support</option>
          </select>
        </div>

        {/* Language Filter */}
        <div className="mb-4">
          <label className="block mb-2">Language</label>
          <select
            name="language"
            value={filters.language}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-background border"
          >
            <option className="text-black" value="" disabled>
              Select Language
            </option>
            <option className="text-black">English</option>
            <option className="text-black">Hindi</option>
          </select>
        </div>

        <Button type="button" className="w-full mt-5" arial-label="apply-btn">
          Apply
        </Button>
      </form>
    </div>
  );
};

export default FiltersSidebar;
