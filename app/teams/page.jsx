import React from 'react';
import FiltersSidebar from '../../components/FiltersSidebar';
import TeamCard from '../../components/TeamCard';

const teams = [
  {
    name: 'PLX Esports',
    game: 'BGMI',
    role: 'Scout, Support, Fragger',
    rank: 'Ace',
    server: 'India',
    language: 'English',
    description: 'Tamil Players Only For Our ESports Organizational',
  },
  {
    name: 'HMF - YouTube',
    game: 'Free Fire Max',
    role: 'IGL',
    rank: 'Diamond',
    server: 'India',
    language: 'Hindi',
    description: 'No Requirement',
  },
  {
    name: 'PLX Esports',
    game: 'BGMI',
    role: 'Scout, Support, Fragger',
    rank: 'Ace',
    server: 'India',
    language: 'English',
    description: 'Tamil Players Only For Our ESports Organizational',
  },
  {
    name: 'HMF - YouTube',
    game: 'Free Fire Max',
    role: 'IGL',
    rank: 'Diamond',
    server: 'India',
    language: 'Hindi',
    description: 'No Requirement',
  },
  {
    name: 'PLX Esports',
    game: 'BGMI',
    role: 'Scout, Support, Fragger',
    rank: 'Ace',
    server: 'India',
    language: 'English',
    description: 'Tamil Players Only For Our ESports Organizational',
  },
  {
    name: 'HMF - YouTube',
    game: 'Free Fire Max',
    role: 'IGL',
    rank: 'Diamond',
    server: 'India',
    language: 'Hindi',
    description: 'No Requirement',
  },
  {
    name: 'PLX Esports',
    game: 'BGMI',
    role: 'Scout, Support, Fragger',
    rank: 'Ace',
    server: 'India',
    language: 'English',
    description: 'Tamil Players Only For Our ESports Organizational',
  },
  {
    name: 'HMF - YouTube',
    game: 'Free Fire Max',
    role: 'IGL',
    rank: 'Diamond',
    server: 'India',
    language: 'Hindi',
    description: 'No Requirement',
  },
  {
    name: 'PLX Esports',
    game: 'BGMI',
    role: 'Scout, Support, Fragger',
    rank: 'Ace',
    server: 'India',
    language: 'English',
    description: 'Tamil Players Only For Our ESports Organizational',
  },
  {
    name: 'HMF - YouTube',
    game: 'Free Fire Max',
    role: 'IGL',
    rank: 'Diamond',
    server: 'India',
    language: 'Hindi',
    description: 'No Requirement',
  },
];

const TeamFinder = () => {
  return (
    <div className="p-4">
      <p className="text-2xl ml-4 mb-4 font-semibold tracking-wide">TEAM FINDER</p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 overflow-hidden mx-4">
        <FiltersSidebar className="rounded-lg mb-4 md:mb-0" />
        <div className="overflow-y-auto p-4 bg-gray-900 text-white col-span-1 md:col-span-4 rounded-lg">
          <div className="border-b-4 mb-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl">Find Team</h2>
            </div>
            <div className="mb-4 flex flex-wrap gap-2 justify-between">
              <button className="bg-indigo-400 px-4 py-2 rounded text-sm">Request Raised</button>
              <button className="bg-indigo-400 px-4 py-2 rounded text-sm">Request Sent</button>
              <button className="bg-indigo-400 px-4 py-2 rounded text-sm">+ New Request</button>
            </div>
          </div>
          {teams.map((team, index) => (
            <TeamCard key={index} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamFinder;
