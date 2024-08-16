import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { Button } from "../@/components/ui/button";

const TeamListItem = ({ team, onSendRequest, hasRequested }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{team.teamname}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Game: {team.game}</p>
        <p>Role: {team.role}</p>
        <p>Rank: {team.rank}</p>
        <p>Server: {team.server}</p>
        <p>Language: {team.language}</p>
        <p>Players: {team.players.join(", ")}</p>
        <Button onClick={onSendRequest} disabled={hasRequested}>
          {hasRequested ? "Request Sent" : "Send Request"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamListItem;
