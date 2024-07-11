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
      setIsLoading(true);
      try {
        const response = await fetch("/api/tournaments");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error in fetchTournaments:", errorData);
          throw new Error(
            `Failed to fetch tournaments: ${response.status}. ${errorData.error} - ${errorData.details}`
          );
        }
        const data = await response.json();
        console.log("Fetched tournaments:", data);
        setTournaments(data.tournaments);
      } catch (err) {
        console.error("Error in fetchTournaments:", err);
        setError(err.message);
      } finally {
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
              key={tournament.id}
              href={`/tournaments/${tournament.id}`}
              className="hover:scale-105 transition-all"
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
  game,
  organizer,
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
          src={game.gameBannerPhoto || "/placeholder-tournament.jpg"}
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
              src={organizer.bannerPhoto || "/placeholder-organizer.jpg"}
              alt={organizer.orgName}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="ml-2 text-sm text-gray-300">
              {organizer.orgName}
            </span>
          </div>
          <div className="text-xs text-gray-300">Host</div>
        </div>
      </div>
    </div>
  );
}

// Example data for tournaments
// const tournamentsData = [
//   {
//     image:
//       "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
//     title: "KINGS ESPORTS PRO SCRIMS (12PM)",
//     date: "JUL 1, 2024",
//     time: "11:00 PM",
//     entryFee: 500,
//     mode: "Squad",
//     participants: "16/21",
//     host: {
//       image:
//         "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
//       name: "KINGS ESPORTS",
//     },
//   },
//   {
//     image:
//       "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
//     title: "KINGS ESPORTS PRO SCRIMS (12PM)",
//     date: "JUL 1, 2024",
//     time: "11:00 PM",
//     entryFee: 500,
//     mode: "Duo",
//     participants: "16/21",
//     host: {
//       image:
//         "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
//       name: "KINGS ESPORTS",
//     },
//   },
//   {
//     image:
//       "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
//     title: "KINGS ESPORTS PRO SCRIMS (12PM)",
//     date: "JUL 1, 2024",
//     time: "11:00 PM",
//     entryFee: 500,
//     mode: "Squad",
//     participants: "16/21",
//     host: {
//       image:
//         "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
//       name: "KINGS ESPORTS",
//     },
//   },
//   {
//     image:
//       "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
//     title: "KINGS ESPORTS PRO SCRIMS (12PM)",
//     date: "JUL 1, 2024",
//     time: "11:00 PM",
//     entryFee: 500,
//     mode: "Squad",
//     participants: "16/21",
//     host: {
//       image:
//         "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
//       name: "KINGS ESPORTS",
//     },
//   },
//   {
//     image:
//       "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
//     title: "KINGS ESPORTS PRO SCRIMS (12PM)",
//     date: "JUL 1, 2024",
//     time: "11:00 PM",
//     entryFee: 500,
//     mode: "Squad",
//     participants: "16/21",
//     status: "Completed",
//     host: {
//       image:
//         "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
//       name: "KINGS ESPORTS",
//     },
//   },
//   {
//     image:
//       "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
//     title: "KINGS ESPORTS PRO SCRIMS (12PM)",
//     date: "JUL 1, 2024",
//     time: "11:00 PM",
//     entryFee: 500,
//     mode: "Squad",
//     participants: "16/21",
//     host: {
//       image:
//         "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
//       name: "KINGS ESPORTS",
//     },
//   },
//   {
//     image:
//       "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
//     title: "KINGS ESPORTS PRO SCRIMS (12PM)",
//     date: "JUL 1, 2024",
//     time: "11:00 PM",
//     entryFee: 500,
//     mode: "Squad",
//     participants: "16/21",
//     status: "Live",
//     host: {
//       image:
//         "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
//       name: "KINGS ESPORTS",
//     },
//   },
//   {
//     image:
//       "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
//     title: "KINGS ESPORTS PRO SCRIMS (12PM)",
//     date: "JUL 1, 2024",
//     time: "11:00 PM",
//     entryFee: 500,
//     mode: "Solo",
//     participants: "16/21",
//     host: {
//       image:
//         "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
//       name: "KINGS ESPORTS",
//     },
//   },
// ].map((tournament, index) => ({
//   ...tournament,
//   id: index + 1,
//   status: tournament.status || "Open",
// }));
