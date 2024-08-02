"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  if (isLoading) return <div>Loading tournaments...</div>;
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

    if (filters.entryFee && filters.entryFee !== entryFee) return false;
    if (filters.mode && filters.mode.toUpperCase() !== tournament.gameType)
      return false;
    if (filters.status && filters.status !== status.toLowerCase()) return false;
    return true;
  });

  function getStatus(dates) {
    const now = new Date();
    const startDate = new Date(dates.started);
    const endDate = new Date(dates.ended);

    if (now < startDate) return "Open";
    if (now >= startDate && now <= endDate) return "Live";
    return "Completed";
  }

  return (
    <div className="mt-20 pb-20 flex items-center justify-center">
      {filteredTournaments.length === 0 ? (
        <div>No tournaments match the current filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 transition-all">
          {filteredTournaments.map((tournament) => (
            <Link
              key={tournament._id}
              href={`/tournaments/${tournament._id}`}
              className="hover:scale-105 transition-all"
              prefetch={true} // prefetch the tournament page
            >
              <TournamentCard {...tournament} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
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
  const getStatus = () => {
    const now = new Date();
    const startDate = new Date(tournamentDates.started);
    const endDate = new Date(tournamentDates.ended);

    if (now < startDate) return "Open";
    if (now >= startDate && now <= endDate) return "Live";
    return "Completed";
  };

  const status = getStatus();
  const entryFee =
    prize && prize.length > 0
      ? prize[0].amount === 0
        ? "Free"
        : "Paid"
      : "N/A";

  return (
    <div className="bg-gray-800 text-white rounded-xl overflow-hidden shadow-lg w-72 m-4 p-2">
      <div className="relative">
        <span className="bg-blue-600 text-xs px-2 py-0.5 absolute bottom-0">
          {gameType}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-full absolute top-1 right-1 ${
            status === "Open"
              ? "bg-green-600"
              : status === "Live"
                ? "bg-yellow-600"
                : "bg-red-600"
          }`}
        >
          {status}
        </span>
        <Image
          src={
            (gameId && gameId.gameBannerPhoto) || "/placeholder-tournament.jpg"
          }
          alt={tournamentName}
          width={500}
          height={200}
          className="object-cover rounded-xl"
        />
      </div>

      <div className="p-2 mt-2 grid grid-cols-1">
        <p className="text-xs text-gray-400 mt-1">
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
