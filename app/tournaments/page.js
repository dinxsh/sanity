"use client";

import { useState } from "react";
import TournamentSection from "@/components/TournamentSection";
import { ListFilter } from "lucide-react";

const TournamentPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        entryFee: "",
        mode: "",
        status: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            entryFee: "",
            mode: "",
            status: "",
        });
    };

    return (
        <div className="px-[5%] xl:px-[12%]">
            {/* Tournaments */}
            <div className="mt-20 flex flex-col">
                {/* title */}
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-semibold mb-10 ">
                        Tournaments
                    </h1>
                    <div className="relative">
                        <button
                            className="px-3 py-1 md:px-4 md:py-2 flex items-center gap-2 rounded-lg border border-gray-500 hover:bg-gray-800 transition-all"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            Filter
                            <ListFilter className="w-4 h-4 mb-0.5" />
                        </button>
                        {isFilterOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl z-10">
                                <div className="p-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Entry Fee</label>
                                        <select
                                            name="entryFee"
                                            value={filters.entryFee}
                                            onChange={handleFilterChange}
                                            className="w-full bg-gray-700 text-white rounded px-2 py-1"
                                        >
                                            <option value="">All</option>
                                            <option value="free">Free</option>
                                            <option value="paid">Paid</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Mode</label>
                                        <select
                                            name="mode"
                                            value={filters.mode}
                                            onChange={handleFilterChange}
                                            className="w-full bg-gray-700 text-white rounded px-2 py-1"
                                        >
                                            <option value="">All</option>
                                            <option value="solo">Solo</option>
                                            <option value="duo">Duo</option>
                                            <option value="squad">Squad</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                        <select
                                            name="status"
                                            value={filters.status}
                                            onChange={handleFilterChange}
                                            className="w-full bg-gray-700 text-white rounded px-2 py-1"
                                        >
                                            <option value="">All</option>
                                            <option value="open">Open</option>
                                            <option value="live">Live</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={clearFilters}
                                        className="w-full bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* tournament cards */}
                <TournamentSection filters={filters} />
            </div>
        </div>
    );
};

export default TournamentPage;