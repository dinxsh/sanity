"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function CreateTournamentPage() {
  const [formData, setFormData] = useState({
    tournamentName: "",
    gameType: "Squad",
    gameId: "",
    platform: "PC",
    size: 5,
    participants: "Players",
    timezone: "UTC-11:00",
  });

  return (
    <div className="px-[5%] xl:px-[12%] py-20 transition-all">
      {/* heading */}
      <div className="text-3xl font-semibold">Create New Tournament</div>

      {/* form */}
      <form className="mt-10 px-10">
        <div>
          <Label className="text-lg">Tournament name</Label>
          <Input
            type="text"
            name="tournamentName"
            maxLength="30"
            required
            className="w-72 mt-2"
          />
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <Label className="text-lg font-medium">Discipline</Label>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select a game" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Games</SelectLabel>
                <SelectItem value="ea-fc-24">EA FC 24</SelectItem>
                <SelectItem value="league-of-legends">
                  League of Legends
                </SelectItem>
                <SelectItem value="valorant">Valorant</SelectItem>
                <SelectItem value="fortnite">Fortnite</SelectItem>
                <SelectItem value="rocket-league">Rocket League</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-10">
          <Label className="text-lg font-medium">Platform</Label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {[
              "PC",
              "Playstation 4",
              "Playstation 5",
              "Xbox One",
              "Xbox Series",
              "Mobile",
              "Switch",
            ].map((platform) => (
              <button
                key={platform}
                type="button"
                className={`p-2 border rounded-md ${formData.platform === platform ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                onClick={() => setFormData({ ...formData, platform })}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-20">
          <div className="">
            <Label className="text-lg font-medium">Size</Label>
            <Input type="number" name="size" className="mt-2 w-fit" required />
          </div>

          <div>
            <Label className="text-lg font-medium">Participants</Label>
            <div className="mt-4">
              <Label className="inline-flex items-center">
                <input
                  type="radio"
                  name="participants"
                  value="Players"
                  className="form-radio"
                />
                <span className="ml-2 text-base">Players</span>
              </Label>
              <Label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="participants"
                  value="Teams"
                  className="form-radio rounded-full"
                />
                <span className="ml-2 text-base">Teams</span>
              </Label>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <Button type="submit" size="lg" className="text-lg">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
