"use client";

import React, { useState } from "react";
import { Button } from "../@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../@/components/ui/select";
import { Input } from "../@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaArrowLeftLong } from "react-icons/fa6";

const bracketSchema = z.object({
  tournament_name: z.string().min(1),
  format: z.enum(["single_elimination", "double_elimination"]),
  consolationFinal: z.boolean().default(false),
  grandFinalType: z.enum(["simple", "double"]),
});

const teamSchema = z.object({
  teams: z.array(z.string().min(1)).min(4, "At least 4 teams are required"),
});

export default function BracketForm() {
  const router = useRouter();
  const [bracketCreated, setBracketCreated] = useState(false);
  const [bracketInfo, setBracketInfo] = useState(null);

  const bracketForm = useForm({
    resolver: zodResolver(bracketSchema),
    defaultValues: {
      tournament_name: "",
      format: "single_elimination",
      consolationFinal: false,
      grandFinalType: "simple",
    },
  });

  const teamForm = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teams: ["", "", "", ""],
    },
  });

  async function onBracketSubmit(values) {
    console.log("Bracket Info:", values);
    setBracketInfo(values);
    setBracketCreated(true);
  }

  async function onTeamSubmit(values) {
    if (values.teams.length % 2 !== 0) {
      toast.error("Please enter an even number of teams");
      return;
    }

    const res = await fetch("/api/brackets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...bracketInfo, ...values }),
    });

    if (!res.ok) {
      toast.error("Verfy the data and try again");
      return;
    }

    toast.success("Bracket created successfully");

    router.push("/bracket");
    return;
  }

  return (
    <div className="bg-card border p-6 rounded-md max-w-[80%] mx-auto">
      <div className="text-center flex items-center justify-center border-b pb-4 mb-4">
        <Button
          variant="ghost"
          onClick={() => {
            router.push("/bracket");
          }}
          className="mr-auto"
        >
          <FaArrowLeftLong className="size-5" />
        </Button>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight absolute left-1/2 transform -translate-x-1/2">
          Create Bracket
        </h2>
      </div>
      {!bracketCreated ? (
        <Form {...bracketForm}>
          <form
            onSubmit={bracketForm.handleSubmit(onBracketSubmit)}
            className="grid grid-cols-2 gap-8"
          >
            <FormField
              control={bracketForm.control}
              name="tournament_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Tournament Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Tournament Name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={bracketForm.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Format</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single_elimination">
                        Single Elimination
                      </SelectItem>
                      <SelectItem value="double_elimination">
                        Double Elimination
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={bracketForm.control}
              name="consolationFinal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Consolation Final</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Consolation Final" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={bracketForm.control}
              name="grandFinalType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Grand Final Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Grand Final Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <Button type="submit" arial-label="create-bracket-btn">
                Create Bracket
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...teamForm}>
          <form
            onSubmit={teamForm.handleSubmit(onTeamSubmit)}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-4">Enter Team Names</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please enter at least 4 team names.
            </p>
            {teamForm.watch("teams").map((_, index) => (
              <FormField
                key={index}
                control={teamForm.control}
                name={`teams.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Team {index + 1}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={`Team ${index + 1} Name`}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                teamForm.setValue("teams", [...teamForm.watch("teams"), ""])
              }
              arial-label="add-another-team-btn"
            >
              Add Another Team
            </Button>
            <div>
              <Button
                type="submit"
                disabled={teamForm.formState.isSubmitting}
                arial-label="submit-team-btn"
              >
                Submit Teams
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
