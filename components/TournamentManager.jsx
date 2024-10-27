"use client";

import React, { useState } from "react";
import TournamentSetup from "./TournamentSetup";
import TournamentBracket from "./TournamentBracket";

const TournamentManager = () => {
  const [tournamentInfo, setTournamentInfo] = useState(null);

  const handleSetupComplete = (info) => {
    setTournamentInfo(info);
  };

  return (
    <div className="container mx-auto p-4">
      {!tournamentInfo ? (
        <TournamentSetup onSetupComplete={handleSetupComplete} />
      ) : (
        <TournamentBracket tournamentInfo={tournamentInfo} />
      )}
    </div>
  );
};

export default TournamentManager;
