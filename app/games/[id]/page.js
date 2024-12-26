"use client";

import Image from "next/image";
import { games } from "../data/index";
import { useState } from "react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import TournamentSection from "../../../components/TournamentSection";
import { ListFilter } from "lucide-react";
import { Button } from "../../../@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

export default function GamePage({ params }) {
  const [isFavourite, setIsFavourite] = useState(false);

  const slug = params.id;

  const game = games[slug - 1];

  const handleClick = () => {
    setIsFavourite(!isFavourite);
  };

  const [filters, setFilters] = useState({
    entryFee: "",
    mode: "",
    status: "",
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
    });
  };

  return (
    <div className="mt-20 px-[5%] md:px-[7%] xl:px-[12%]">
      {/* Banner */}
      <div className="">
        <Image
          src={game.banner}
          alt={game.name}
          layout="responsi"
          width={1500}
          height={500}
          className="rounded-lg"
        />
      </div>

      {/* Title */}
      <div className="mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-semibold transition-all">
            {game.name}
          </h1>
          <Button
            className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 font-medium text- text-white bg-indigo-500 hover:bg-indigo-600 rounded-md active:scale-90 transition-all"
            onClick={handleClick}
            arial-label="fav-btn"
          >
            Favourite
            {isFavourite ? (
              <HeartFilledIcon className="md:w-4 md:h-4 transition-all" />
            ) : (
              <HeartIcon className="md:w-4 md:h-4 transition-all" />
            )}
          </Button>
        </div>

        {/* Desc */}
        <div className="mt-5">
          <p>{game.description}</p>
        </div>
      </div>

      {/* Tournaments */}
      <div className="mt-20 flex flex-col">
        {/* title */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-xl md:text-2xl font-semibold uppercase transition-all">
            Tournaments
          </h1>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex gap-2"
                  arial-label="filter-btn"
                >
                  Filter
                  <ListFilter className="w-4 h-4 mb-0.5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <div className="mb-4 p-2">
                  <label className="block text-sm font-medium mb-2">
                    Entry Fee
                  </label>
                  <select
                    name="entryFee"
                    value={filters.entryFee}
                    onChange={handleFilterChange}
                    className="w-full rounded px-2 py-1 bg-background border"
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
                    className="w-full rounded px-2 py-1 bg-background border"
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
                    className="w-full rounded px-2 py-1 bg-background border"
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
                  className="w-full rounded transition-colors"
                  arial-label="clear-filter-btn"
                >
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* tournament cards */}
        <TournamentSection />
      </div>
    </div>
  );
}
