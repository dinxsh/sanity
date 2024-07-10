"use client";

import Image from "next/image";
import { games } from "../data/index";
import { useState } from "react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import TournamentSection from "../../../components/TournamentSection";
import { ListFilter } from "lucide-react";

export default function GamePage({ params }) {
  const [isFavourite, setIsFavourite] = useState(false);

  const slug = params.id;

  const game = games[slug - 1];

  const handleClick = () => {
    setIsFavourite(!isFavourite);
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
        <div className="flex justify-between">
          <h1 className="text-3xl md:text-4xl font-semibold transition-all">
            {game.name}
          </h1>
          <button
            className="flex items-center gap-2 px-4 py-1 md:px-6 md:py-2 text-white text-sm md:text-lg font-medium bg-sky-600 hover:bg-sky-700 rounded-md transition-all"
            onClick={handleClick}
          >
            Favourite
            {isFavourite ? (
              <HeartFilledIcon className="md:w-5 md:h-5 transition-all" />
            ) : (
              <HeartIcon className="md:w-5 md:h-5 transition-all" />
            )}
          </button>
        </div>

        {/* Desc */}
        <div className="mt-5">
          <p>{game.description}</p>
        </div>
      </div>

      {/* Tournaments */}
      <div className="mt-20 flex flex-col">
        {/* title */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold uppercase transition-all">
            Tournaments
          </h1>
          <div className="relative">
            <button className="px-3 py-1 md:px-4 md:py-2 flex items-center gap-2 rounded-lg border border-gray-500 hover:bg-gray-800 transition-all">
              Filter
              <ListFilter className="w-4 h-4 mb-0.5" />
            </button>
            {/* Filter dropdown logic */}
          </div>
        </div>

        {/* tournament cards */}
        <TournamentSection />
      </div>
    </div>
  );
}
