export function generateBracket(teams) {
  // Check if teams is an array and has at least 2 teams
  if (!Array.isArray(teams) || teams.length < 2) {
    console.error("Invalid teams data:", teams);
    return [];
  }

  // Implement bracket generation logic here
  // This is a simplified version for single elimination
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
  const rounds = Math.ceil(Math.log2(teams.length));
  const bracket = [];

  for (let i = 0; i < rounds; i++) {
    const roundMatches = [];
    const matchesInRound = Math.pow(2, rounds - i - 1);
    for (let j = 0; j < matchesInRound; j++) {
      if (i === 0) {
        roundMatches.push({
          player1: shuffledTeams[j * 2] || "BYE",
          player2: shuffledTeams[j * 2 + 1] || "BYE",
          winner: null,
        });
      } else {
        roundMatches.push({ player1: null, player2: null, winner: null });
      }
    }
    bracket.push(roundMatches);
  }

  return bracket;
}
