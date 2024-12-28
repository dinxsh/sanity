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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../@/components/ui/tabs";
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
          console.log(response.data.teams);
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
      e.teamname.toLowerCase().includes(trimmedString),
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
    <Tabs defaultValue="team_finder" className="w-full">
      <TabsList className="grid w-[400px] mx-auto grid-cols-2 border border-zinc-200/20">
        <TabsTrigger
          className="data-[state=active]:bg-white data-[state=active]:text-black"
          value="team_finder"
        >
          Team Finder
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-white data-[state=active]:text-black"
          value="my_teams"
        >
          My Teams
        </TabsTrigger>
      </TabsList>
      <TabsContent value="team_finder" className="">
        <div className="px-5 md:px-10 xl:px-[12%] min-h-[70vh] transition-all">
          <h1 className="text-3xl ml-4 mb-14 font-semibold tracking-tight">
            Team Finder
          </h1>
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
                arial-label="create-team-btn"
              >
                <PlusCircle className="size-4" />
                <p>Create Team</p>
              </Button>
            </div>
          </div>

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
      </TabsContent>
      <TabsContent value="my_teams">
        <div className="px-5 md:px-10 xl:px-[12%] min-h-[70vh] transition-all">
          <h1 className="text-3xl ml-4 mb-14 font-semibold tracking-tight">
            My Teams
          </h1>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TeamFinder;
