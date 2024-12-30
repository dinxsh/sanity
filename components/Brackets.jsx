"use client";

import { useEffect } from "react";
import "brackets-viewer/dist/brackets-viewer.min.js";
import "brackets-viewer/dist/brackets-viewer.min.css";
import "./styles/bracket.css";

async function render(id) {
  //refer to Template.md file to spin up this path.
  const data = await fetch(`/api/brackets/${id}`).then((res) => res.json());

  if (typeof window !== "undefined") {
    window.bracketsViewer.setParticipantImages(
      data.participant.map((participant) => ({
        participantId: participant.id,
        imageUrl: "https://github.githubassets.com/pinned-octocat.svg",
      })),
    );

    window.bracketsViewer.render(
      {
        stages: data.stage,
        matches: data.match,
        matchGames: data.match_game,
        participants: data.participant,
      },
      { clear: true },
      {
        participantOriginPlacement: "before",
        separatedChildCountLabel: true,
        showSlotsOrigin: true,
        showLowerBracketSlotsOrigin: true,
        highlightParticipantOnHover: true,
      },
    );
  }
}

function Bracket({ id }) {
  useEffect(() => {
    render(id);
  });

  return (
    <>
      <div className="brackets-viewer custom"></div>
    </>
  );
}

export default Bracket;
