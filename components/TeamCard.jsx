import React from "react";

const TeamCard = ({ team }) => {
  return (
    <div className="p-4 bg-slate-800 text-white mb-4 rounded-md">
      <div className="border-b-4 border-b-stone-600">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <img
              src={team.image || "https://via.placeholder.com/40"}
              alt={`${team.name} logo`}
              className="w-10 h-10 rounded-full mr-4"
            />
            <h3 className="text-xl">{team.teamname}</h3>
          </div>
          <button className="bg-transparent border-2 border-blue-800 px-4 py-2 rounded hidden md:block">
            Request to join
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-x-4 my-5">
        <div className="my-2">
          <span className="text-yellow-500">Game</span>
          <span className="block">{team.game}</span>
        </div>
        <div className="my-2">
          <span className="text-yellow-500">Role</span>
          <span className="block">{team.role}</span>
        </div>
        <div className="my-2">
          <span className="text-yellow-500">Rank</span>
          <span className="block">{team.rank}</span>
        </div>
        <div className="my-2">
          <span className="text-yellow-500">Server</span>
          <span className="block">{team.server}</span>
        </div>
        <div className="my-2">
          <span className="text-yellow-500">Language</span>
          <span className="block">{team.language}</span>
        </div>
        <div className="my-2">
          <span className="text-yellow-500">Participants</span>
          <span className="block">{team.participantCount}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 my-5">
        <div className="my-2">
          <span className="text-yellow-500">Players</span>
          <span className="block">{team.players.join(", ")}</span>
        </div>
        <div className="my-2">
          <span className="text-yellow-500">Looking for</span>
          <span className="block">{team.requests}</span>
        </div>
      </div>
      <div className="flex justify-center md:hidden">
        <button className="bg-transparent border-2 border-blue-800 px-4 py-2 rounded">
          Request to join
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
