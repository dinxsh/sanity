"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { PacmanLoader } from "react-spinners";

const TournamentBracket = ({ matches, roundNames }) => {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (matches) {
      try {
        setLoading(true);
        organizeMatchesByRound(matches);
        setError(null);
      } catch (err) {
        setError("Failed to organize matches");
      } finally {
        setLoading(false);
      }
    }
  }, [matches]);

  const organizeMatchesByRound = (matches) => {
    const organizedRounds = matches.reduce((acc, match) => {
      const round = acc[match.round] || [];
      round.push(match);
      acc[match.round] = round;
      return acc;
    }, {});

    setRounds(Object.values(organizedRounds));
  };

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <PacmanLoader color="white" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-destructive py-10">{error}</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] p-6 flex justify-between items-start gap-8">
        <AnimatePresence>
          {rounds.map((round, roundIndex) => (
            <motion.div
              key={roundIndex}
              className="flex-1 space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: roundIndex * 0.1 }}
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: roundIndex * 0.1 }}
                className="text-lg font-semibold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                {roundNames[roundIndex]}
              </motion.h3>

              {round.map((match, matchIndex) => (
                <motion.div
                  key={matchIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: roundIndex * 0.1 + matchIndex * 0.05 }}
                >
                  <Card className="relative">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        {match.teams.map((team, teamIndex) => (
                          <div
                            key={teamIndex}
                            className={`flex justify-between items-center p-2 rounded ${
                              team.winner
                                ? "bg-primary/10 text-primary"
                                : "bg-accent/5"
                            }`}
                          >
                            <span className="font-medium">{team.name}</span>
                            <span className="text-sm">{team.score}</span>
                          </div>
                        ))}
                      </div>

                      {match.status && (
                        <div className="absolute -right-2 -top-2">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary">
                            {match.status}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TournamentBracket;
