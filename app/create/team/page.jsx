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
import axios from "axios";
import { teamSchema } from "../../../model/Schema/teamSchema";
import { useToast } from "../../../@/hooks/use-toast";

export default function CreateTeamForm() {
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
    },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post("/api/teams/create-team", formData);

      toast({
        title: "Success",
        description: response.data.message,
      });

      form.reset();
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
                name="teamname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of your team" {...field} />
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
                      <Input placeholder="Game you play" {...field} />
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
                      <Input placeholder="Role in the game" {...field} />
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
                      <Input placeholder="Your rank" {...field} />
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
                      <Input placeholder="Preferred server" {...field} />
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
                      <Input placeholder="Language you speak" {...field} />
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
                        placeholder="player1, player2, player3..."
                        {...field}
                        helperText="Enter player names separated by commas"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" aria-label="team-create-btn">
                Create Team
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
