"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PacmanLoader } from "react-spinners";
export default function TournamentSection({ filters }) {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const response = await fetch("/api/tournaments");
        if (!response.ok) {
          throw new Error("Failed to fetch tournaments");
        }
        const data = await response.json();
        setTournaments(data.tournaments);
        setIsLoading(false);
      } catch (err) {
        console.error("Error in fetchTournaments:", err);
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchTournaments();
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <PacmanLoader color="white" />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  // Apply filters
  const filteredTournaments = tournaments.filter((tournament) => {
    const status = getStatus(tournament.tournamentDates);
    const entryFee =
      tournament.prize && tournament.prize.length > 0
        ? tournament.prize[0].amount === 0
          ? "free"
          : "paid"
        : "";

    if (filters?.entryFee && filters.entryFee !== entryFee) return false;
    if (filters?.mode && filters.mode.toUpperCase() !== tournament.gameType)
      return false;
    if (filters?.status && filters.status !== status.toLowerCase())
      return false;
    if (filters?.gameId && filters.gameId !== tournament.gameId?._id)
      return false;

    return true;
  });

  return (
    <div className="mt-16 pb-20 flex">
      {filteredTournaments.length === 0 ? (
        <div className="h-full w-full flex justify-center items-center">
          No tournaments match the current filters.
        </div>
      ) : (
        <div className="flex flex-wrap gap-10">
          {filteredTournaments.map((tournament) => (
            <Link
              key={tournament._id}
              href={`/tournaments/${tournament._id}`}
              className=""
              prefetch={true}
              aria-label="tournament-redirect-btn"
            >
              <TournamentCard {...tournament} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function getStatus(dates) {
  const now = new Date();
  const startDate = new Date(dates.started);
  const endDate = new Date(dates.ended);

  if (now < startDate) return "Open";
  if (now >= startDate && now <= endDate) return "Live";
  return "Completed";
}

function TournamentCard({
  tournamentName,
  tournamentDates,
  gameType,
  prize,
  slots,
  registeredNumber,
  gameId,
  organizerId,
}) {
  const status = getStatus(tournamentDates);
  const entryFee =
    prize && prize.length > 0
      ? prize[0].amount === 0
        ? "Free"
        : "Paid"
      : "N/A";

  return (
    <div className="bg-quinary group relative text-xs text-secondary overflow-hidden w-[288px]">
      <div className="relative overflow-hidden">
        <span className="bg-[#16a9ff] px-2 py-1 text-xs absolute bottom-0 left-0 z-[2]">
          {gameType}
        </span>
        <span
          className={`text-xs px-2 py-1 absolute top-0 right-0 font-medium z-[2] ${
            status === "Open"
              ? "bg-[#0ec00e]"
              : status === "Live"
                ? "bg-[yellow]"
                : "bg-[red]"
          }`}
        >
          {status}
        </span>
        <div className="absolute top-0 w-full h-full bg-gradient-to-t from-primary to-[transparent] z-[1]"></div>
        <Image
          src={
            (gameId && gameId.gameBannerPhoto) || "/placeholder-tournament.jpg"
          }
          alt={tournamentName}
          width={500}
          height={200}
          className="object-cover h-[250px] w-auto group-hover:scale-[1.1] transition-all"
        />
      </div>

      <div className="p-4 mt-2 grid grid-cols-1">
        <p className="text-xs text-gray-400 mt-1 text-tertiary">
          {new Date(tournamentDates.started).toLocaleDateString()}
        </p>
        <h2 className="mt-2 text-sm font-semibold">{tournamentName}</h2>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
          <span>💰 {entryFee}</span>
          <span>🛡️ {gameType}</span>
          <span>
            👥 {registeredNumber}/{slots}
          </span>
        </div>
        <div className="mt-4 p-2 flex items-center justify-between text-sm bg-gray-700 rounded">
          <div className="flex items-center">
            <Image
              src={
                (organizerId && organizerId.bannerPhoto) ||
                "/placeholder-organizer.jpg"
              }
              alt={organizerId ? organizerId.orgName : "Organizer"}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="ml-2 text-sm text-gray-300">
              {organizerId ? organizerId.orgName : "Unknown Organizer"}
            </span>
          </div>
          <div className="text-xs text-gray-300">Host</div>
        </div>
      </div>
    </div>
  );
}
