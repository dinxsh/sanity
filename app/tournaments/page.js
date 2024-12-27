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
                  className="flex gap-2"
                  arial-label="tournament-filter-btn"
                >
                  Filter
                  <ListFilter className="w-4 h-4 mb-0.5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-primary">
                {/* Game Filter - Updated to use gameId */}
                <div className="mb-4 p-2">
                  <label className="block text-sm font-medium mb-2">Game</label>
                  <select
                    name="gameId"
                    value={filters.gameId}
                    onChange={handleFilterChange}
                    className="w-full px-2 py-1 bg-primary border"
                  >
                    <option value="">All Games</option>
                    <option value="676d205ad9a2b1079a937312">Valorant</option>
                    <option value="676d205ad9a2b1079a937316">CS:GO</option>
                    <option value="676d205ad9a2b1079a937320">BGMI</option>
                    <option value="676d205ad9a2b1079a937317">Fortnite</option>
                  </select>
                </div>

                <div className="mb-4 p-2">
                  <label className="block text-sm font-medium mb-2">
                    Entry Fee
                  </label>
                  <select
                    name="entryFee"
                    value={filters.entryFee}
                    onChange={handleFilterChange}
                    className="w-full px-2 py-1 bg-primary border"
                  >
                    <option value="">All</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                <div className="mb-4 p-2">
                  <label className="block text-sm font-medium mb-2">Mode</label>
                  <select
                    name="mode"
                    value={filters.mode}
                    onChange={handleFilterChange}
                    className="w-full px-2 py-1 bg-primary border"
                  >
                    <option value="">All</option>
                    <option value="solo">Solo</option>
                    <option value="duo">Duo</option>
                    <option value="squad">Squad</option>
                  </select>
                </div>

                <div className="mb-4 p-2">
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full px-2 py-1 bg-primary border"
                  >
                    <option value="">All</option>
                    <option value="open">Open</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <DropdownMenuSeparator />

                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="w-full transition-colors"
                  arial-label="tournament-clear-filter-btn"
                >
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* tournament cards */}
        <TournamentSection filters={filters} />
      </div>
    </div>
  );
};

export default TournamentPage;
