"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FiltersSidebar from "../../components/FiltersSidebar";
import TeamCard from "../../components/TeamCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";
import { Button } from "../../@/components/ui/button";
import { PacmanLoader } from "react-spinners";
import { Plus, PlusCircle } from "lucide-react";

const TeamFinder = () => {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]); // For filtered display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ game: "", role: "", language: "" }); // Filters state

  // Fetch teams from the backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams/get-teams");
        if (response.data.success) {
          setTeams(response.data.teams);
          setFilteredTeams(response.data.teams); // Initialize filtered teams
        } else if (response.status === 401) {
          router.push("/auth/login");
        } else {
          throw new Error(response.data.message || "Failed to fetch teams.");
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError("Unable to fetch teams. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [router]);

  // Apply filters to the team list
  useEffect(() => {
    const applyFilters = () => {
      const filtered = teams.filter((team) => {
        return (
          (!filters.game || team.game === filters.game) &&
          (!filters.role || team.role === filters.role) &&
          (!filters.language || team.language === filters.language)
        );
      });
      setFilteredTeams(filtered);
    };

    applyFilters();
  }, [filters, teams]);

  // Reset filters
  const handleResetFilters = () => {
    setFilters({ game: "", role: "", language: "" });
  };

  function handleTeamSearch(searchText) {
    const trimmedString = searchText.toLowerCase().trim();
    if (trimmedString === "") return setFilteredTeams(teams);

    const filteredArray = teams.filter((e) =>
      e.teamname.toLowerCase().includes(trimmedString)
    );

    setFilteredTeams(filteredArray);
  }
  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <PacmanLoader color="white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className=" w-11/12 max-w-7xl mx-auto">
      <div className="flex gap-4 mb-4 ">
        <input
          className=" outline-none py-2 px-4 rounded-md bg-[#222124] text-sm w-4/5 "
          onChange={(e) => handleTeamSearch(e.target.value)}
          placeholder="Search team "
        />
        <Button
          onClick={() => router.push("/create/team")}
          className="w-1/5 flex gap-2 items-center"
        >
          <PlusCircle className="size-4" />
          <p>Create Team</p>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3 lg:w-1/4">
          <FiltersSidebar
            filters={filters}
            setFilters={setFilters}
            onReset={handleResetFilters}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-12 mx-auto  ">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team, index) => (
              <TeamCard key={index} team={team} />
            ))
          ) : (
            <p>No teams found. Try creating one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamFinder;
{
  /* <div className="max-w-7xl mx-auto">
<div className="flex gap-4 mb-4 ">
  <input
    className=" outline-none py-2 px-4 rounded-md bg-[#222124] text-sm w-4/5 "
    onChange={(e) => handleTeamSearch(e.target.value)}
    placeholder="Search team "
  />
  <Button onClick={() => router.push("/create/team")} className="w-1/5">
    Create Team
  </Button>
</div>

<div className="flex flex-col  md:flex-row mx-auto ">
  <div className="max-h-[100vh] pt-5 transition-all overflow-y-scroll flex flex-col gap-12  no-scrollbar transition-all border-0 w-3/4">
    {filteredTeams.length > 0 ? (
      filteredTeams.map((team, index) => (
        <TeamCard key={index} team={team} />
      ))
    ) : (
      <p>No teams found. Try creating one!</p>
    )}
  </div>

  <div className=" mx-auto border-2 w-1/4">
    <FiltersSidebar
      filters={filters}
      setFilters={setFilters}
      onReset={handleResetFilters}
    />
  </div>
</div>
</div> */
}
