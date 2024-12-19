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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading teams...</p>
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
    <div className="mt-20 px-5 md:px-10 xl:px-[12%] min-h-[70vh] transition-all">
      <h1 className="text-3xl ml-4 mb-14 font-semibold tracking-tight">
        Team Finder
      </h1>

      <div className="mx-5 p-2 grid gap-5 grid-cols-1 lg:grid-cols-10 overflow-hidden transition-all">
        <Card className="mt-5 lg:mt-0 lg:ml-5 col-span-1 lg:col-span-7 transition-all">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="flex items-center justify-between">
              <h2 className="text-2xl">Find Team</h2>
              <Button onClick={() => router.push("/create/team")}>
                Create Team
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="min-h-80 lg:h-full border-t pt-5 transition-all">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team, index) => (
                <TeamCard key={index} team={team} />
              ))
            ) : (
              <p>No teams found. Try creating one!</p>
            )}
          </CardContent>
        </Card>

        <FiltersSidebar
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
        />
      </div>
    </div>
  );
};

export default TeamFinder;
