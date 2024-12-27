"use client";

import { useState } from "react";
import TournamentSection from "../../components/TournamentSection";
import { ListFilter } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const TournamentPage = () => {
  const [filters, setFilters] = useState({
    entryFee: "",
    mode: "",
    status: "",
    gameId: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      entryFee: "",
      mode: "",
      status: "",
      gameId: "",
    });
  };

  return (
    <div className="px-[5%] xl:px-[12%] min-h-[70vh] transition-all">
      {/* Tournaments */}
      <div className="mt-20 flex flex-col">
        {/* title */}
        <div className="flex justify-between items-center pb-[20px] border-b-[1px] border-tertiary">
          <h1 className="text-4xl font-semibold">Tournaments</h1>

          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
                >
                  Filter
                  <ListFilter className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4">
                {[
                  {
                    label: "Game",
                    name: "gameId",
                    options: [
                      { value: "", label: "All Games" },
                      { value: "676d205ad9a2b1079a937312", label: "Valorant" },
                      { value: "676d205ad9a2b1079a937316", label: "CS:GO" },
                      { value: "676d205ad9a2b1079a937320", label: "BGMI" },
                      { value: "676d205ad9a2b1079a937317", label: "Fortnite" },
                    ],
                  },
                  {
                    label: "Entry Fee",
                    name: "entryFee",
                    options: [
                      { value: "", label: "All" },
                      { value: "free", label: "Free" },
                      { value: "paid", label: "Paid" },
                    ],
                  },
                  {
                    label: "Mode",
                    name: "mode",
                    options: [
                      { value: "", label: "All" },
                      { value: "solo", label: "Solo" },
                      { value: "duo", label: "Duo" },
                      { value: "squad", label: "Squad" },
                    ],
                  },
                  {
                    label: "Status",
                    name: "status",
                    options: [
                      { value: "", label: "All" },
                      { value: "open", label: "Open" },
                      { value: "live", label: "Live" },
                      { value: "completed", label: "Completed" },
                    ],
                  },
                ].map((filter) => (
                  <div key={filter.name} className="mb-4">
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      {filter.label}
                    </label>
                    <select
                      name={filter.name}
                      value={filters[filter.name]}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <DropdownMenuSeparator className="my-4 border-gray-700" />

                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 rounded-md transition-all"
                >
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TournamentSection filters={filters} />
      </div>
    </div>
  );
};

export default TournamentPage;
