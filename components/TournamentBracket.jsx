"use client";

import React, { useState, useEffect } from "react";
import { generateBracket } from "../lib/generateBracket";
import html2canvas from "html2canvas";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { Button } from "../@/components/ui/button";
import { Input } from "../@/components/ui/input";
import Image from "next/image";

const TournamentBracket = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentType, setTournamentType] = useState("single-elimination");
  const [participants, setParticipants] = useState("");
  const [bracket, setBracket] = useState([]);
  const [isSetup, setIsSetup] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatImages = {
    "single-elimination": "/single-elimination.png",
    "double-elimination": "/double-elimination.png",
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/tournaments");
        if (!response.ok) {
          throw new Error("Failed to fetch tournaments");
        }
        const data = await response.json();
        setTournaments(data.tournaments);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const handleAddParticipant = () => {
    setParticipants([...participants, ""]);
  };

  const handleRemoveParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const handleParticipantChange = (index, value) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTournament) {
      alert("Please select a tournament.");
      return;
    }
    const participantsArray = participants.split("\n");
    const validParticipants = participantsArray.filter((p) => p.trim() !== "");
    if (validParticipants.length < 2) {
      alert("Please enter at least 2 participants.");
      return;
    }
    // Here you would typically set up the bracket based on the inputs
    setBracket(generateBracket(validParticipants));
    setIsSetup(true);
  };

  const handleWinner = (roundIndex, matchIndex, winner) => {
    const newBracket = [...bracket];
    newBracket[roundIndex][matchIndex].winner = winner;

    if (roundIndex + 1 < newBracket.length) {
      const nextMatchIndex = Math.floor(matchIndex / 2);
      const isFirstMatch = matchIndex % 2 === 0;
      if (isFirstMatch) {
        newBracket[roundIndex + 1][nextMatchIndex].player1 = winner;
      } else {
        newBracket[roundIndex + 1][nextMatchIndex].player2 = winner;
      }
    }

    setBracket(newBracket);
  };

  const saveBracketAsImage = async () => {
    setIsSaving(true);
    try {
      const bracketElement = document.getElementById("tournament-bracket");
      const canvas = await html2canvas(bracketElement);
      const imageData = canvas.toDataURL("image/png");
      await saveBracketToDatabase(imageData);
      alert("Bracket saved successfully!");
    } catch (error) {
      console.error("Error saving bracket:", error);
      alert("Failed to save bracket. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const saveBracketToDatabase = async (imageData) => {
    try {
      const response = await fetch("/api/brackets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tournamentId: selectedTournament,
          bracketName: tournamentName,
          bracketImage: imageData,
          bracketData: JSON.stringify(bracket),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save bracket");
      }

      const data = await response.json();
      console.log("Save response:", data);
    } catch (error) {
      console.error("Error saving to database:", error);
      throw error;
    }
  };

  if (!isSetup) {
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {" "}
          <h1 className="text-3xl font-bold mb-8 text-center">
            Tournament Bracket Generator
          </h1>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Tournament Format
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(formatImages).map(([format, imageSrc]) => (
                <Card
                  key={format}
                  className={`relative cursor-pointer transition-all duration-300 overflow-hidden ${
                    tournamentType === format ? "ring-2 ring-purple-500" : ""
                  }`}
                  onClick={() => setTournamentType(format)}
                >
                  <Image
                    src={imageSrc}
                    alt={format.replace("-", " ")}
                    width={200}
                    height={150}
                    layout="responsive"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-bold capitalize text-center px-2">
                      {format.replace("-", " ")}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="participants"
                className="block text-lg font-semibold mb-2"
              >
                Participants (One per line, ordered by seed from best to worst)
              </label>
              <textarea
                id="participants"
                rows={5}
                className="w-full px-3 py-2 text-gray-200 border rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="Enter participants here"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="randomize-seeds"
                className="rounded text-purple-600"
              />
              <label htmlFor="randomize-seeds" className="text-sm">
                Randomize seeds
              </label>
            </div>

            <div>
              <label
                htmlFor="tournament-select"
                className="block text-lg font-semibold mb-2"
              >
                Select Tournament
              </label>
              <select
                id="tournament-select"
                className="w-full px-3 py-2 text-gray-200 border rounded-lg focus:outline-none focus:border-purple-500"
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
              >
                <option value="">Select a tournament</option>
                {tournaments.map((tournament) => (
                  <option key={tournament._id} value={tournament._id}>
                    {tournament.tournamentName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="tournament-name"
                className="block text-lg font-semibold mb-2"
              >
                Bracket Name
              </label>
              <Input
                id="tournament-name"
                placeholder="Enter the bracket name"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full">
              CREATE BRACKET
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 xl:px-40 overflow-x-auto transition-all">
      <h2 className="text-2xl font-bold mb-10 capitalize">{tournamentName}</h2>

      <div id="tournament-bracket" className="flex space-x-16 relative">
        {bracket.map((round, roundIndex) => {
          const totalTeams = bracket[0].length * 2;
          const getSpacing = () => {
            if (totalTeams === 4) return 100;
            if (totalTeams === 8) return 100;
            if (totalTeams === 16) return 120;
            return 60;
          };
          const spacing = getSpacing();

          return (
            <div
              key={roundIndex}
              className="flex flex-col min-w-[250px] relative"
              style={{ marginTop: `${roundIndex * spacing}px` }}
            >
              <h3 className="text-xl font-bold mb-6">Round {roundIndex + 1}</h3>

              {round.map((match, matchIndex) => (
                <div
                  key={matchIndex}
                  className="relative"
                  style={{
                    marginBottom:
                      roundIndex === 0
                        ? "16px"
                        : `${16 + roundIndex * spacing}px`,
                  }}
                >
                  <div className="rounded-lg p-4 shadow-lg border">
                    <div
                      className={`p-3 mb-2 cursor-pointer rounded transition-colors duration-200 ${
                        match.winner === match.player1
                          ? "text-white font-semibold border bg-purple-600 hover:bg-purple-700 transition-all"
                          : "border bg-foreground/10 hover:bg-foreground/15 transition-all"
                      }`}
                      onClick={() =>
                        handleWinner(roundIndex, matchIndex, match.player1)
                      }
                    >
                      {match.player1 || "TBD"}
                    </div>

                    <div
                      className={`p-3 cursor-pointer rounded transition-colors duration-200 ${
                        match.winner === match.player2
                          ? "text-white font-semibold border bg-purple-600 hover:bg-purple-700 transition-all"
                          : "border bg-foreground/10 hover:bg-foreground/15 transition-all"
                      }`}
                      onClick={() =>
                        handleWinner(roundIndex, matchIndex, match.player2)
                      }
                    >
                      {match.player2 || "TBD"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <button
        onClick={saveBracketAsImage}
        disabled={isSaving}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 disabled:bg-gray-400"
      >
        {isSaving ? "Saving..." : "Save Bracket"}
      </button>
    </div>
  );
};

export default TournamentBracket;
