'use client'

import React from 'react';
import FiltersSidebar from '../../components/FiltersSidebar';
import TeamCard from '../../components/TeamCard';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';


const TeamFinder = () => {

  const router = useRouter();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('/api/teams/get-teams');
        if (response.data.success) {
          setTeams(response.data.teams);
        } else {
          console.error('Failed to fetch teams:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);


  const NavigateToCreateTeam = () => {
    router.push('/create-team');
  };


  return (
    <div className="md:p-4 md:mx-14 mx-7">
      <p className="text-2xl ml-4 mb-4 font-semibold tracking-wide">TEAM FINDER</p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 overflow-hidden mx-4">
        <FiltersSidebar className="rounded-lg mb-20px" />
        <div className="overflow-y-auto p-4 bg-gray-900 text-white col-span-1 md:col-span-4 rounded-lg">
          <div className="border-b-4 m mb-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl">Find Team</h2>
              <button className="bg-orange-500 px-4 py-2 rounded" onClick={NavigateToCreateTeam}>Create Team</button>
            </div>
            <div className="mb-4 flex flex-wrap gap-2 justify-between">
              <button className="bg-indigo-600 px-4 py-2 rounded text-sm">Request Raised</button>
              <button className="bg-indigo-600 px-4 py-2 rounded text-sm">Request Sent</button>
              <button className="bg-indigo-600 px-4 py-2 rounded text-sm">+ New Request</button>
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
