"use client";

import React from "react";
import FiltersSidebar from "../../components/FiltersSidebar";
import TeamListItem from "../../components/TeamListItem";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);

    if (status === "authenticated") {
      console.log("User is authenticated");
      console.log("User ID:", session?.user?._id);
      console.log("Username:", session?.user?.username);
    } else if (status === "loading") {
      console.log("Session is loading");
    } else {
      console.log("User is not authenticated");
    }

    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams/get-teams");
        console.log("Fetched teams:", response.data);
        if (response.data.success) {
          setTeams(response.data.teams);
        } else {
          console.error("Failed to fetch teams:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    if (status === "authenticated") {
      fetchTeams();
    }
  }, [status]);

  const NavigateToCreateTeam = () => {
    router.push("/create/team");
  };

  const sendRequest = async (teamId) => {
    if (!session || !session.user._id) {
      alert("You must be logged in to send a request");
      return;
    }

    try {
      const response = await axios.post("/api/teams/send-request", {
        teamId,
        userId: session.user._id,
      });
      if (response.data.success) {
        alert("Request sent successfully");
        // Update the local state to reflect the change
        setTeams(
          teams.map((team) =>
            team._id === teamId
              ? { ...team, requests: [...team.requests, session.user._id] }
              : team
          )
        );
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to view teams and send requests.</div>;
  }

  return (
    <div className="mt-20 px-10 xl:px-[12%] min-h-[70vh]">
      <h1 className="text-3xl ml-4 mb-14 font-semibold tracking-tight">
        Team Finder
      </h1>

      <div className="mx-5 p-2 grid grid-cols-1 lg:grid-cols-10 overflow-hidden">
        <FiltersSidebar className="" />

        <Card className="mt-5 lg:mt-0 lg:ml-5 col-span-1 lg:col-span-7">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="flex items-center justify-between">
              <h2 className="text-2xl">Find Team</h2>
              <Button className="" onClick={NavigateToCreateTeam}>
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

          <CardContent className="min-h-80 lg:h-full border-t">
            {teams.map((team, index) => (
              <TeamListItem
                key={index}
                team={team}
                onSendRequest={() => sendRequest(team._id)}
                hasRequested={team.requests.includes(session.user._id)}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamFinder;
