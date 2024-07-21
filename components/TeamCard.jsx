// components/TeamCard.js
import React from 'react';

const TeamCard = ({ team }) => {
    return (
      <div className="p-4 bg-slate-800 text-white mb-4 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img 
              src={team.dp || 'https://via.placeholder.com/40'} 
              alt={`${team.name} logo`} 
              className="w-10 h-10 rounded-full mr-4" 
            />
            <h3 className="text-xl">{team.name}</h3>
          </div>
          <button className="bg-transparent border-2 border-blue-800 px-4 py-2 rounded">Request to join</button>
        </div>
        <div className="grid grid-cols-5 gap-x-4 mb-2">
          <div>
            <span className="text-yellow-500">Game:</span>
            <span className="block">{team.game}</span>
          </div>
          <div>
            <span className="text-yellow-500">Role:</span>
            <span className="block">{team.role}</span>
          </div>
          <div>
            <span className="text-yellow-500">Rank:</span>
            <span className="block">{team.rank}</span>
          </div>
          <div>
            <span className="text-yellow-500">Server:</span>
            <span className="block">{team.server}</span>
          </div>
          <div>
            <span className="text-yellow-500">Language:</span>
            <span className="block">{team.language}</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-yellow-500">Looking for:</span>
          <span className="block">{team.description}</span>
        </div>
      </div>
    );
  };

export default TeamCard;
