"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import { Input } from "../../../@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { teamSchema } from "../../../model/Schema/teamSchema";
import { useToast } from "../../../@/components/ui/use-toast";

export default function CreateTeamForm() {
  const [teamname, setTeamname] = useState("");
  const [game, setGame] = useState("");
  const [role, setRole] = useState("");
  const [rank, setRank] = useState("");
  const [server, setServer] = useState("");
  const [language, setLanguage] = useState("");
  const [players, setPlayers] = useState("");
  // const [requests, setRequests] = useState("");
  const [participantCount, setParticipantCount] = useState("");

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamname: "",
      game: "",
      role: "",
      rank: "",
      server: "",
      language: "",
      players: "",
      // requests: "",
      participantCount: "",
    },
    shouldFocusError: false,
  });

  const { reset } = form;

  const onSubmit = async (data) => {
    try {
      if (
        teamname !== "" &&
        game !== "" &&
        role !== "" &&
        rank !== "" &&
        server !== "" &&
        language !== "" &&
        players !== "" &&
        // requests !== "" &&
        participantCount !== ""
      ) {
        // const playersArray = players.split(",").map((player) => player.trim());
        const dataWithPlayersArray = {
          ...data    
        };

        const response = await axios.post(
          "/api/teams/create-team",
          dataWithPlayersArray
        );

        toast({
          title: "Success",
          description: response.data.message,
        });

        reset();
        setTeamname("");
        setGame("");
        setRole("");
        setRank("");
        setServer("");
        setLanguage("");
        setPlayers("");
        // setRequests("");
        setParticipantCount("");
      }
    } catch (error) {
      console.error("Error during create-team:", error);
      toast({
        title: "Team Creation Failed",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-3/4 p-8 space-y-8 rounded-lg shadow-md border">
        <div className="text-center">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Create Team
          </h2>
          <p className="mt-2 mb-4 text-sm">
            Create your team and start competing
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of your team"
                        {...field}
                        value={teamname}
                        onChange={(e) => {
                          field.onChange(e);
                          setTeamname(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="game"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Game you play"
                        {...field}
                        value={game}
                        onChange={(e) => {
                          field.onChange(e);
                          setGame(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Role in the game"
                        {...field}
                        value={role}
                        onChange={(e) => {
                          field.onChange(e);
                          setRole(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rank</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your rank"
                        {...field}
                        value={rank}
                        onChange={(e) => {
                          field.onChange(e);
                          setRank(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="server"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Preferred server"
                        {...field}
                        value={server}
                        onChange={(e) => {
                          field.onChange(e);
                          setServer(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Language you speak"
                        {...field}
                        value={language}
                        onChange={(e) => {
                          field.onChange(e);
                          setLanguage(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="players"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Players</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="player_1 , player_2 , ..."
                        {...field}
                        value={players}
                        onChange={(e) => {
                          field.onChange(e);
                          setPlayers(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="requests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requests</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Special requests"
                        {...field}
                        value={requests}
                        onChange={(e) => {
                          field.onChange(e);
                          setRequests(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="participantCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Participants</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Number of participants"
                        {...field}
                        value={participantCount}
                        onChange={(e) => {
                          field.onChange(e);
                          setParticipantCount(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
