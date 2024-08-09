"use client";

import React, { useState, useEffect } from "react";
import { generateBracket } from "../lib/generateBracket";
import html2canvas from "html2canvas";

const TournamentBracket = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentType, setTournamentType] = useState("single");
  const [participants, setParticipants] = useState(["", ""]);
  const [bracket, setBracket] = useState([]);
  const [isSetup, setIsSetup] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    const validParticipants = participants.filter((p) => p.trim() !== "");
    if (validParticipants.length < 2) {
      alert("Please enter at least 2 participants.");
      return;
    }
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
      <div className="w-full max-w-2xl mx-auto p-8 border rounded-lg shadow">
        <h2 className="mb-5 text-2xl font-medium tracking-tight text-center">
          Tournament Setup
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-10">
          {isLoading ? (
            <p>Loading tournaments...</p>
          ) : (
            <div className="grid">
              <label className="font-medium">Select Tournament</label>
              <select
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
                className="w-full mt-2 px-3 py-2 bg-background rounded-md border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                required
              >
                <option value="">Select a tournament</option>
                {tournaments.map((tournament) => (
                  <option key={tournament._id} value={tournament._id}>
                    {tournament.tournamentName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid">
            <label className="font-medium">Tournament Name</label>
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              required
            />
          </div>

          <div className="grid">
            <label className="font-medium">Tournament Type</label>
            <select
              value={tournamentType}
              onChange={(e) => setTournamentType(e.target.value)}
              className="w-full mt-2 px-3 py-2 bg-background rounded-md border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            >
              <option value="single">Single Elimination</option>
              <option value="double">Double Elimination</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Participants</label>

            <div className="">
              {participants.map((participant, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={participant}
                    onChange={(e) =>
                      handleParticipantChange(index, e.target.value)
                    }
                    className="w-10 md:w-full flex-grow px-3 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={`Participant ${index + 1}`}
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveParticipant(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600 transition-all duration-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddParticipant}
              className="w-full mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
            >
              Add Participant
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
          >
            Create Tournament
          </button>
        </form>
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

// "use client";

// import React, { useState } from "react";
// import { generateBracket } from "../lib/generateBracket";

// const TournamentBracket = () => {
//   const [tournamentName, setTournamentName] = useState("");
//   const [tournamentType, setTournamentType] = useState("single");
//   const [participants, setParticipants] = useState(["", ""]);
//   const [bracket, setBracket] = useState([]);
//   const [isSetup, setIsSetup] = useState(false);

//   const handleAddParticipant = () => {
//     setParticipants([...participants, ""]);
//   };

//   const handleRemoveParticipant = (index) => {
//     const newParticipants = participants.filter((_, i) => i !== index);
//     setParticipants(newParticipants);
//   };

//   const handleParticipantChange = (index, value) => {
//     const newParticipants = [...participants];
//     newParticipants[index] = value;
//     setParticipants(newParticipants);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validParticipants = participants.filter((p) => p.trim() !== "");
//     if (validParticipants.length < 2) {
//       alert("Please enter at least 2 participants.");
//       return;
//     }
//     setBracket(generateBracket(validParticipants));
//     setIsSetup(true);
//   };

//   const handleWinner = (roundIndex, matchIndex, winner) => {
//     const newBracket = [...bracket];
//     newBracket[roundIndex][matchIndex].winner = winner;

//     if (roundIndex + 1 < newBracket.length) {
//       const nextMatchIndex = Math.floor(matchIndex / 2);
//       const isFirstMatch = matchIndex % 2 === 0;
//       if (isFirstMatch) {
//         newBracket[roundIndex + 1][nextMatchIndex].player1 = winner;
//       } else {
//         newBracket[roundIndex + 1][nextMatchIndex].player2 = winner;
//       }
//     }

//     setBracket(newBracket);
//   };

//   if (!isSetup) {
//     return (
//       <div className="w-full max-w-2xl mx-auto p-8 border rounded-lg shadow">
//         <h2 className="mb-5 text-2xl font-medium tracking-tight text-center">
//           Tournament Setup
//         </h2>

//         <form onSubmit={handleSubmit} className="grid gap-10">
//           <div className="grid">
//             <label className="font-medium">Tournament Name</label>
//             <input
//               type="text"
//               value={tournamentName}
//               onChange={(e) => setTournamentName(e.target.value)}
//               className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               required
//             />
//           </div>

//           <div className="grid">
//             <label className="font-medium">Tournament Type</label>
//             <select
//               value={tournamentType}
//               onChange={(e) => setTournamentType(e.target.value)}
//               className="w-full mt-2 px-3 py-2 bg-background rounded-md border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//             >
//               <option value="single">Single Elimination</option>
//               <option value="double">Double Elimination</option>
//             </select>
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="font-medium">Participants</label>

//             <div className="">
//               {participants.map((participant, index) => (
//                 <div key={index} className="flex mb-2">
//                   <input
//                     type="text"
//                     value={participant}
//                     onChange={(e) =>
//                       handleParticipantChange(index, e.target.value)
//                     }
//                     className="w-10 md:w-full flex-grow px-3 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     placeholder={`Participant ${index + 1}`}
//                   />

//                   <button
//                     type="button"
//                     onClick={() => handleRemoveParticipant(index)}
//                     className="px-4 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600 transition-all duration-300"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <button
//               type="button"
//               onClick={handleAddParticipant}
//               className="w-full mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
//             >
//               Add Participant
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
//           >
//             Create Tournament
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="px-5 xl:px-40 overflow-x-auto transition-all">
//       <h2 className="text-2xl font-bold mb-10 capitalize">{tournamentName}</h2>

//       <div className="flex space-x-16 relative">
//         {bracket.map((round, roundIndex) => {
//           // Calculate the total number of teams based on the first round
//           const totalTeams = bracket[0].length * 2;

//           // Adjust spacing based on number of teams
//           const getSpacing = () => {
//             if (totalTeams === 4) return 100;
//             if (totalTeams === 8) return 100;
//             if (totalTeams === 16) return 120;
//             return 60; // Default for other cases
//           };

//           const spacing = getSpacing();

//           return (
//             <div
//               key={roundIndex}
//               className="flex flex-col min-w-[250px] relative"
//               style={{ marginTop: `${roundIndex * spacing}px` }}
//             >
//               <h3 className="text-xl font-bold mb-6 ">
//                 Round {roundIndex + 1}
//               </h3>

//               {round.map((match, matchIndex) => (
//                 <div
//                   key={matchIndex}
//                   className="relative"
//                   style={{
//                     marginBottom:
//                       roundIndex === 0
//                         ? "16px"
//                         : `${16 + roundIndex * spacing}px`,
//                   }}
//                 >
//                   <div className="rounded-lg p-4 shadow-lg border">
//                     <div
//                       className={`p-3 mb-2 cursor-pointer rounded transition-colors duration-200 ${
//                         match.winner === match.player1
//                           ? "text-white font-semibold border bg-purple-600 hover:bg-purple-700 transition-all"
//                           : "border bg-foreground/10 hover:bg-foreground/15 transition-all"
//                       }`}
//                       onClick={() =>
//                         handleWinner(roundIndex, matchIndex, match.player1)
//                       }
//                     >
//                       {match.player1 || "TBD"}
//                     </div>

//                     <div
//                       className={`p-3 cursor-pointer rounded transition-colors duration-200 ${
//                         match.winner === match.player2
//                           ? "text-white font-semibold border bg-purple-600 hover:bg-purple-700 transition-all"
//                           : "border bg-foreground/10 hover:bg-foreground/15 transition-all"
//                       }`}
//                       onClick={() =>
//                         handleWinner(roundIndex, matchIndex, match.player2)
//                       }
//                     >
//                       {match.player2 || "TBD"}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default TournamentBracket;

/**
 * return (
    <div className="p-6 bg-gray-900 text-gray-100 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">
        {tournamentName}
      </h2>
      <div className="flex space-x-16 relative">
        {bracket.map((round, roundIndex) => (
          <div
            key={roundIndex}
            className="flex flex-col justify-around min-w-[250px] relative"
          >
            <h3 className="text-xl font-bold mb-6 text-purple-400">
              Round {roundIndex + 1}
            </h3>
            {round.map((match, matchIndex) => (
              <div key={matchIndex} className="mb-8 relative">
                <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700">
                  <div
                    className={`p-3 mb-2 cursor-pointer rounded transition-colors duration-200 ${
                      match.winner === match.player1
                        ? "bg-purple-600 font-bold"
                        : "bg-gray-700 hover:bg-gray-600"
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
                        ? "bg-purple-600 font-bold"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    onClick={() =>
                      handleWinner(roundIndex, matchIndex, match.player2)
                    }
                  >
                    {match.player2 || "TBD"}
                  </div>
                </div>
                {roundIndex < bracket.length - 1 && (
                  <>
                    <div className="absolute top-1/2 -right-8 w-8 h-px bg-purple-400"></div>
                    {matchIndex % 2 === 0 && (
                      <div className="absolute top-1/2 -right-8 w-px h-16 bg-purple-400"></div>
                    )}
                    {matchIndex % 2 === 1 && (
                      <div className="absolute bottom-1/2 -right-8 w-px h-16 bg-purple-400"></div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
 */
