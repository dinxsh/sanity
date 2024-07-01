"use client";

import Image from "next/image";
import { games } from "../page";
import { useState } from "react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import TournamentSection from "@/components/TournamentSection";
import { ListFilter } from "lucide-react";

export default function GamePage({ params }) {
  const [isFavourite, setIsFavourite] = useState(false);

  const slug = params.id;

  const game = games[slug - 1];

  const handleClick = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <div className="pt-10 px-[15%]">
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
          <h1 className="text-4xl font-semibold">{game.name}</h1>
          <button
            className="flex items-center gap-2 px-6 py-2 text-lg font-medium bg-sky-600 hover:bg-sky-700 rounded-md transition-all"
            onClick={handleClick}
          >
            Favourite
            {isFavourite ? (
              <HeartFilledIcon className="w-5 h-5" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Desc */}
        <div className="mt-5">
          <p>{game.description}</p>
        </div>
      </div>

      {/* Tournaments */}
      <div className="mt-20">
        {/* title */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold uppercase">Tournaments</h1>
          <div className="relative">
            <button className="px-4 py-2 flex items-center gap-2 rounded-lg border border-gray-500 hover:bg-gray-800 transition-all">
              Filter
              <ListFilter />
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
