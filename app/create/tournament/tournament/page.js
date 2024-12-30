"use client";
import { useState } from "react";
import axios from "axios";
import { platforms, timezones } from "./data";
import { games } from "../../../games/data/index";

export default function Page() {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [participantType, setParticipantType] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [size, setSize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (
      !tournamentName ||
      !selectedPlatform ||
      !participantType ||
      !selectedTimezone ||
      !size
    ) {
      setErrorMessage("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    const formData = {
      tournamentName,
      selectedPlatform,
      participantType,
      selectedTimezone,
      size,
    };

    try {
      const response = await axios.post("/api/tournaments", formData);
      setSuccessMessage(response.data.message);
      setTournamentName("");
      setSelectedPlatform("");
      setParticipantType("");
      setSelectedTimezone("");
      setSize("");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTournamentName("");
    setSelectedPlatform("");
    setParticipantType("");
    setSelectedTimezone("");
    setSize("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className="px-[5%] xl:px-[18%] pt-20 pb-20 transition-all">
      <section>
        <h2 className="text-3xl font-semibold mb-10">Create New Tournament</h2>
      </section>
      <form onSubmit={handleSubmit}>
        <section>
          <div className="pt-10 pb-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="w-full lg:max-w-md mb-6 lg:mb-0">
                <div className="flex items-center mb-2">
                  <div className="text-lg font-medium">Tournament Name</div>
                  <div className="text-xs text-gray-500 ml-2">
                    (maximum 30 characters)
                  </div>
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength="30"
                  placeholder="Enter tournament name"
                  value={tournamentName}
                  onChange={(e) => setTournamentName(e.target.value)}
                />
              </div>
              <div className="box-content h-28 w-48 p-4 rounded-md border-4  border-blue-300 shadow-lg">
                <h3 className="text-blue-800 font-medium font-sans mb-2">
                  Need help?
                </h3>
                <p className="text-sm text-blue-700">
                  Check out our organizer Starter Guide
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Discipline</h3>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {games.map((game, index) => (
                <img
                  key={game.name}
                  src={game.image}
                  alt={`Game ${game.name + 1}`}
                  className="rounded-md shadow-md"
                />
              ))}
            </div>
            <div className="mt-6">
              <select
                name="discipline"
                id="discipline"
                className="w-full px-4 py-2 border rounded-md"
              >
                {games.map((game, index) => (
                  <option key={index} value={game.name}>
                    {game.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Platform</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {platforms.map((platform) => (
                  <button
                    type="button"
                    key={platform}
                    className={`p-4 rounded-md ${
                      selectedPlatform === platform
                        ? "bg-blue-600"
                        : "bg-slate-500 hover:bg-slate-600"
                    }`}
                    onClick={() => setSelectedPlatform(platform)}
                    arial-label="platform-btn"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-medium">Size</h4>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div>
                <h4 className="text-lg font-medium">Participants</h4>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="participantType"
                      value="players"
                      checked={participantType === "players"}
                      onChange={() => setParticipantType("players")}
                    />
                    <span className="ml-2">Players</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="participantType"
                      value="team"
                      checked={participantType === "team"}
                      onChange={() => setParticipantType("team")}
                    />
                    <span className="ml-2">Team</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs font-mono">
                Want to organize a big tournament with more than 128
                Participants? Check the plans on the pricing page.
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-medium">Timezone</h4>
              <select
                name="timezone"
                id="timezone"
                className="w-full px-4 py-2 border rounded-md"
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
              >
                {timezones.map((timezone, index) => (
                  <option key={index} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                type="submit"
                className={`px-6 py-2 rounded-md  ${isSubmitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"} transition-colors duration-300`}
                disabled={isSubmitting}
                arial-label="create-tournament-btn"
              >
                {isSubmitting ? "Creating..." : "Create Tournament"}
              </button>
              <button
                type="button"
                className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
                onClick={handleReset}
                arial-label="reset-btn"
              >
                Reset
              </button>
            </div>
            {successMessage && (
              <div className="mt-4 p-4 text-green-700 bg-green-100 rounded-md">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
                {errorMessage}
              </div>
            )}
          </div>
        </section>
      </form>
    </div>
  );
}
