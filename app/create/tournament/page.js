"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { platforms, timezones } from "./tournament/data";
import { Button } from "../../../@/components/ui/button";

export default function Page() {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [participantType, setParticipantType] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [size, setSize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [games, setGames] = useState([]);

  // Add new state variables for additional fields
  const [tournamentFormat, setTournamentFormat] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [tournamentStartDate, setTournamentStartDate] = useState("");
  const [tournamentEndDate, setTournamentEndDate] = useState("");
  const [maxTeamMembers, setMaxTeamMembers] = useState("");
  const [minTeamMembers, setMinTeamMembers] = useState("");
  const [maxTeams, setMaxTeams] = useState("");
  const [minTeams, setMinTeams] = useState("");
  const [tournamentVisibility, setTournamentVisibility] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const [prizeConfig, setPrizeConfig] = useState([]);
  const [rules, setRules] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [gameParameter, setGameParameter] = useState("");
  const [parameterPoints, setParameterPoints] = useState("");
  const [roundType, setRoundType] = useState("");
  const [numberOfMatches, setNumberOfMatches] = useState("");
  const [qualifyingTeamsPerGroup, setQualifyingTeamsPerGroup] = useState("1");
  const [wildcardPlayers, setWildcardPlayers] = useState("");
  const [teamsPerGroup, setTeamsPerGroup] = useState("");
  const [roundName, setRoundName] = useState("");
  const [tournamentIcon, setTournamentIcon] = useState(null);
  const [tournamentBanner, setTournamentBanner] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("/api/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error while fetching game data: ", error);
      }
    };
    fetchGames();
  }, []);

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

  const validateImageFile = (file) => {
    return file && file.type.startsWith("image/") && file.size > 0;
  };

  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (validateImageFile(file)) {
      const objectURL = URL.createObjectURL(file);
      setTournamentIcon(objectURL);
    } else {
      alert("Please select a valid image file");
    }
  };

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (validateImageFile(file)) {
      const objectURL = URL.createObjectURL(file);
      setTournamentBanner(objectURL);
    } else {
      alert("Please select a valid image file");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold mb-8">Create New Tournament</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <label htmlFor="icon-upload" className="block">
              <div className="h-40 bg-foreground/5 flex flex-col items-center justify-center cursor-pointer rounded-lg relative overflow-hidden">
                {tournamentIcon ? (
                  <img
                    src={tournamentIcon}
                    alt="Tournament Icon"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span className="text-3xl mb-2 text-foreground/80">+</span>
                    <span className="text-sm text-foreground/80">
                      Add Tournament Icon
                    </span>
                  </>
                )}
              </div>
            </label>
            <input
              id="icon-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleIconUpload}
            />
          </div>
          <div className="md:col-span-3">
            <label htmlFor="banner-upload" className="block">
              <div className="h-40 bg-foreground/5 flex flex-col items-center justify-center cursor-pointer rounded-lg relative overflow-hidden">
                {tournamentBanner ? (
                  <img
                    src={tournamentBanner}
                    alt="Tournament Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span className="text-3xl mb-2 text-foreground/80">+</span>
                    <span className="text-sm text-foreground/80">
                      Add Tournament Banner
                    </span>
                  </>
                )}
              </div>
            </label>
            <input
              id="banner-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerUpload}
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-2">Game Name</label>
            <select
              className="w-full bg-foreground/5 p-2 rounded border text-sm"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="">Select Game</option>
              {games.map((game, index) => (
                <option key={index} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Tournament Title</label>
            <input
              type="text"
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="Enter Tournament Title"
            />
          </div>

          <div>
            <label className="block mb-2">Tournament Format</label>
            <select
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={tournamentFormat}
              onChange={(e) => setTournamentFormat(e.target.value)}
            >
              <option value="">Select Tournament Format</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Registration End Date</label>
            <input
              type="date"
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={registrationEndDate}
              onChange={(e) => setRegistrationEndDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Tournament Start Date</label>
            <input
              type="date"
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={tournamentStartDate}
              onChange={(e) => setTournamentStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Tournament End Date</label>
            <input
              type="date"
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={tournamentEndDate}
              onChange={(e) => setTournamentEndDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Max Members in a Team</label>
            <input
              type="number"
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={maxTeamMembers}
              onChange={(e) => setMaxTeamMembers(e.target.value)}
              placeholder="Maximum Number of Team Members"
            />
          </div>

          <div>
            <label className="block mb-2">Min Members in a Team</label>
            <input
              type="number"
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={minTeamMembers}
              onChange={(e) => setMinTeamMembers(e.target.value)}
              placeholder="Minimum Number of Team Members"
            />
          </div>

          <div>
            <label className="block mb-2">Max Number of Teams</label>
            <input
              type="number"
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={maxTeams}
              onChange={(e) => setMaxTeams(e.target.value)}
              placeholder="Enter Maximum Number of Teams"
            />
          </div>

          <div>
            <label className="block mb-2">Min Number of Teams</label>
            <input
              type="number"
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={minTeams}
              onChange={(e) => setMinTeams(e.target.value)}
              placeholder="Enter Minimum Number of Teams"
            />
          </div>

          <div>
            <label className="block mb-2">Tournament Visibility</label>
            <select
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={tournamentVisibility}
              onChange={(e) => setTournamentVisibility(e.target.value)}
            >
              <option value="">Select Tournament Visibility</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Invite Code</label>
            <input
              type="text"
              className="w-full bg-foreground/5 p-2 text-sm rounded border"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Enter Invite Code"
            />
          </div>
        </form>

        {/* Prize Configuration */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Prize Configuration{" "}
            <span className="text-foreground/50 text-sm">ⓘ</span>
          </h3>
          <Button arial-label="add-prize-btn" className="px-4 py-2 rounded">
            Add Prize
          </Button>
        </div>

        {/* Rules */}
        <div className="mt-8 flex flex-col">
          <h3 className="text-xl font-semibold mb-4">
            Rules <span className="text-foreground/50 text-sm">ⓘ</span>
          </h3>
          <input
            type="text"
            className="w-fit bg-foreground/5 p-2 rounded mb-2 text-sm"
            placeholder="Enter Rule"
          />
          <Button
            arial-label="add-rule-btn"
            className="px-4 py-2 rounded w-fit"
          >
            Add Rule
          </Button>
        </div>

        {/* Sponsors */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Sponsors</h3>
          <Button arial-label="add-sponsor-btn" className=" px-4 py-2 rounded">
            Add Sponsor
          </Button>
        </div>

        {/* Game Configuration */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Game Configuration{" "}
            <span className="text-foreground/50 text-sm">ⓘ</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Game Parameter</label>
              <select
                className="w-full bg-foreground/5 p-2 text-sm rounded"
                value={gameParameter}
                onChange={(e) => setGameParameter(e.target.value)}
              >
                <option value="">Select Game Parameter</option>
                {/* Add game parameter options */}
              </select>
            </div>
            <div>
              <label className="block mb-2">Parameter Points</label>
              <input
                type="text"
                className="w-full bg-foreground/5 p-2 text-sm rounded"
                value={parameterPoints}
                onChange={(e) => setParameterPoints(e.target.value)}
                placeholder="Enter Parameter Points"
              />
            </div>
          </div>
          <Button arial-label="add-game-config-btn" className="mt-4 px-4 py-2">
            Add Game Config
          </Button>
        </div>

        {/* Tournament Configuration */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Tournament Configuration
          </h3>
          <h4 className="text-lg font-medium mb-2">Round 1</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Round Type</label>
              <select
                className="w-full bg-foreground/5 p-2 text-sm rounded"
                value={roundType}
                onChange={(e) => setRoundType(e.target.value)}
              >
                <option value="">Select Round Type</option>
                {/* Add round type options */}
              </select>
            </div>
            <div>
              <label className="block mb-2">Number of Matches</label>
              <input
                type="number"
                className="w-full bg-foreground/5 p-2 text-sm rounded"
                value={numberOfMatches}
                onChange={(e) => setNumberOfMatches(e.target.value)}
                placeholder="Enter Number of Matches"
              />
            </div>
            <div>
              <label className="block mb-2">
                Number of Qualifying Teams Per Group
              </label>
              <input
                type="number"
                className="w-full bg-foreground/5 p-2 text-sm rounded"
                value={qualifyingTeamsPerGroup}
                onChange={(e) => setQualifyingTeamsPerGroup(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2">
                Number of wildcard (optional)
              </label>
              <input
                type="number"
                className="w-full bg-foreground/5 p-2 text-sm rounded"
                value={wildcardPlayers}
                onChange={(e) => setWildcardPlayers(e.target.value)}
                placeholder="Enter Number of wildcard players"
              />
            </div>
            <div>
              <label className="block mb-2">
                Number of Teams Per Group (Optional)
              </label>
              <input
                type="number"
                className="w-full bg-foreground/5 p-2 text-sm rounded"
                value={teamsPerGroup}
                onChange={(e) => setTeamsPerGroup(e.target.value)}
                placeholder="Enter Number of Teams Per Group"
              />
            </div>
            <div>
              <label className="block mb-2">Round Name</label>
              <input
                type="text"
                className="w-full bg-foreground/5 p-2 text-sm rounded"
                value={roundName}
                onChange={(e) => setRoundName(e.target.value)}
                placeholder="Enter Round Name"
              />
            </div>
          </div>
          <Button
            arial-label="add-tournament-config-btn"
            className="mt-4 px-4 py-2 rounded"
          >
            Add Tournament Config
          </Button>
        </div>

        {/* Create Tournament Button */}
        <div className="mt-8">
          <button
            type="submit"
            className={`mt-10 px-6 py-2 rounded-md font-semibold text-white ${isSubmitting ? "bg-blue-500" : "bg-blue-600 hover:bg-blue-700"} transition-colors duration-300`}
            disabled={isSubmitting}
            arial-label="team-create-btn"
          >
            {isSubmitting ? "Creating..." : "Create Tournament"}
          </button>
        </div>

        {/* Success and Error Messages */}
        {successMessage && (
          <div className="mt-4 p-4 text-green-400 bg-green-900 rounded-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-4 text-red-400 bg-red-900 rounded-md">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
