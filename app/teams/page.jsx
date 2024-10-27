"use client";

import React from "react";
import FiltersSidebar from "../../components/FiltersSidebar";
import TeamCard from "../../components/TeamCard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams/get-teams");
        if (response.data.success) {
          setTeams(response.data.teams);
        } else {
          console.error("Failed to fetch teams:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const NavigateToCreateTeam = () => {
    router.push("/create/team");
  };

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
              <Button
                // variant="outline"
                className=""
                onClick={NavigateToCreateTeam}
              >
                Create Team
              </Button>
            </CardTitle>

            <div className="mb-4 flex flex-wrap gap-2 justify-between">
              <Button variant="outline" className="px-4 py-2 rounded text-sm">
                Request Raised
              </Button>
              <Button variant="outline" className="px-4 py-2 rounded text-sm">
                Request Sent
              </Button>
              <Button variant="outline" className="px-4 py-2 rounded text-sm">
                + New Request
              </Button>
            </div>
          </CardHeader>

          <CardContent className="min-h-80 lg:h-full border-t pt-5 transition-all">
            {teams.map((team, index) => (
              <TeamCard key={index} team={team} />
            ))}
          </CardContent>
        </Card>

        <FiltersSidebar className="" />
      </div>
    </div>
  );
};

export default TeamFinder;
