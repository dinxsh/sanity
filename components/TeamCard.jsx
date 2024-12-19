import { Gamepad2, Languages, Router, ShieldAlert, Users } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MdLeaderboard } from "react-icons/md";
import { Button } from "./ui/button";
import { Separator } from "../@/components/ui/separator";

const TeamCard = ({ team }) => {
  return (
    <div className="flex  flex-col gap-6 bg-[#0E1728] rounded-lg  p-6 mx-auto ">
      <div>
        <Image
          src={team.image || "/static-team-logo.png"}
          width={500}
          height={500}
          alt="team-img"
          className="rounded-lg w-full h-36"
        />
        <p className="text-2xl font-bold mt-2">{team.teamname}</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2 items-center text-gray-400">
          <Gamepad2 />
          <p>{team.game}</p>
        </div>

        <div className="flex gap-2 items-center text-gray-400">
          <ShieldAlert />
          <p>{team.role}</p>
        </div>

        <div className="flex gap-2 items-center text-gray-400">
          <MdLeaderboard />
          <p>{team.rank}</p>
        </div>

        <div className="flex gap-2 items-center text-gray-400">
          <Router />
          <p>{team.rank}</p>
        </div>
      </div>

      <Separator className="bg-gray-400" />

      <div className="flex justify-between flex-wrap">
        <div className="flex gap-2 items-center text-gray-400">
          <Users />
          <span className="block">{team.players.join(" , ")}</span>
        </div>

        <div className="flex gap-2 items-center text-gray-400">
          <Languages />
          <span className="block">{team.language}</span>
        </div>
      </div>

      <div>
        <Button className="w-full">Request to Join</Button>
      </div>
    </div>
  );
};

export default TeamCard;
