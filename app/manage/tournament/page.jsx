"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const [tournaments, setTournaments] = useState([]);
  const [newParticipantName, setNewParticipantName] = useState("");
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const [tournamentDetails, setTournamentDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [stageName, setStageName] = useState(""); // Added missing state for stage name

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const response = await axios.get("/api/tournaments");
        setTournaments(response.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    }
    fetchTournaments();
  }, []);

  useEffect(() => {
    if (selectedTournamentId) {
      fetchTournamentDetails(selectedTournamentId);
    }
  }, [selectedTournamentId]);

  const fetchTournamentDetails = async (tournamentId) => {
    try {
      const response = await axios.get(`/api/tournaments/${tournamentId}`);
      setTournamentDetails(response.data);
    } catch (error) {
      console.error("Error fetching tournament details:", error);
    }
  };

  const addParticipant = async () => {
    if (!selectedTournamentId || !newParticipantName) return;

    try {
      setLoading(true);
      const response = await axios.post("/api/participants", {
        tournamentId: selectedTournamentId,
        participantName: newParticipantName,
      });

      console.log("Participant added:", response.data.participant);
      setNewParticipantName("");
      fetchTournamentDetails(selectedTournamentId); // Refresh details
    } catch (error) {
      console.error("Error adding participant:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStage = async () => {
    if (!selectedTournamentId || !stageName) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `/api/tournaments/${selectedTournamentId}/structure`,
        {
          structureData: { name: stageName }, // Send the new stage data
        },
      );

      console.log("Stage created:", response.data.tournament);
      setStageName(""); // Clear input after success
      fetchTournamentDetails(selectedTournamentId); // Refresh details
    } catch (error) {
      console.error("Error creating stage:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableRegistration = async () => {
    if (!selectedTournamentId) return;

    try {
      const response = await axios.put(
        `/api/tournaments/${selectedTournamentId}`,
        {
          registrationData: {
            enabled: true,
          },
        },
      );

      console.log("Registration enabled:", response.data.tournament);
      fetchTournamentDetails(selectedTournamentId); // Refresh details
    } catch (error) {
      console.error("Error enabling registration:", error);
    }
  };

  return (
    <div className="px-[5%] xl:px-[18%] pt-20 pb-20 transition-all">
      <div className="p-4">
        <h1 className="text-2xl font-sans">Manage Tournaments</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="box-content p-8 bg-white rounded-md border-2 border-slate-700 shadow-lg"
          >
            <div className="flex flex-row justify-between items-center mb-4">
              <div className="text-black">{tournament.tournamentName}</div>
              <div
                className={`bg-${
                  tournament.status === "Draft" ? "orange" : "green"
                }-500 rounded-sm p-1 text-white`}
              >
                {tournament.status}
              </div>
            </div>
            <div className="text-slate-700 text-xs mb-4">
              {tournament.platform}
            </div>
            <div className="flex flex-row justify-between items-center text-sm mb-4">
              <div className="text-black">SETUP</div>
              <div className="text-slate-700">PENDING</div>
              <div className="text-slate-700">RUNNING</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-blue-300 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>
            <div className="flex align-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              <p className="text-black text-xs">
                You should now enable the registration or manually add
                participants. You could also create the tournament structure.
              </p>
            </div>
          </div>
        ))}
        <div className="box-content p-8 bg-white rounded-md border-2 border-slate-700 shadow-lg">
          <div className="flex flex-row justify-between items-center mb-4">
            <div className="text-black text-xl font-sans">Participants</div>
            <div
              className="text-green-500 text-xl font-sans cursor-pointer"
              onClick={addParticipant}
            >
              +ADD
            </div>
          </div>
          <div className="text-slate-600 text-sm text-center mb-4">
            You can manually create participants, especially if you do not use
            the registration. You may configure the check-in either way.
          </div>
          <div className="flex flex-col items-center">
            <select
              className="mb-2 border-2 border-slate-700 rounded-md"
              onChange={(e) => setSelectedTournamentId(e.target.value)}
              value={selectedTournamentId}
            >
              <option value="">Select Tournament</option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.tournamentName}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="mb-2 border-2 border-slate-700 rounded-md p-2"
              placeholder="Participant Name"
              value={newParticipantName}
              onChange={(e) => setNewParticipantName(e.target.value)}
            />
            <button
              className="p-3 bg-green-400 rounded-md text-white"
              onClick={addParticipant}
              disabled={loading}
              arial-label="add-participant-btn"
            >
              {loading ? "Adding..." : "+Add Participant"}
            </button>
          </div>
          <div className="text-blue-500 text-center cursor-pointer">
            Configure check-in
          </div>
        </div>
        <div className="box-content p-8 bg-white rounded-md border-2 border-slate-700 shadow-lg">
          <div className="text-black text-xl font-sans mb-4">Structure</div>
          <div className="text-center text-slate-500 text-sm mb-4">
            The tournament does not have any stage yet. You should create the
            first stage and may use our Structure Guide if you are not sure of
            which stage to create.
          </div>
          <div className="flex flex-col items-center">
            <input
              type="text"
              className="mb-2 border-2 border-slate-700 rounded-md p-2"
              placeholder="Stage Name"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
            />
            <button
              className="p-3 bg-green-400 rounded-md text-white"
              onClick={handleCreateStage}
              disabled={loading}
              arial-label="create-new-stage-btn"
            >
              {loading ? "Creating..." : "+Create new stage"}
            </button>
          </div>
        </div>
        <div className="box-content p-8 bg-white rounded-md border-2 border-slate-700 shadow-lg">
          <div className="text-black text-xl font-sans mb-4">Registrations</div>
          <div className="text-slate-500 text-sm mb-4">
            Enable the registration to have participants register to the
            tournament. They will enjoy all the participants features the
            platform offers: check-in, matches list, results report, and more.
          </div>
          <div className="flex justify-center">
            <button
              className="p-3 bg-blue-400 rounded-md text-white"
              onClick={handleEnableRegistration}
              disabled={loading}
              arial-label="enable-registration-btn"
            >
              {loading ? "Enabling..." : "Enable Registration"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
