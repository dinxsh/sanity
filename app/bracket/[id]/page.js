'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const BracketDisplay = () => {
    const [bracket, setBracket] = useState(null);
    const [error, setError] = useState(null);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const fetchBracket = async () => {
            try {
                console.log('Fetching bracket with id:', id);
                const response = await fetch(`/api/brackets/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch bracket: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Received bracket data:', data);
                setBracket(JSON.parse(data.bracketData));
            } catch (error) {
                console.error('Error fetching bracket:', error);
                setError(error.message);
            }
        };

        if (id) {
            fetchBracket();
        }
    }, [id]);

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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!bracket) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-5 xl:px-40 overflow-x-auto transition-all">
            <h1 className="text-3xl font-bold mb-10">{bracket.bracketName}</h1>

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
                            <h3 className="text-xl font-bold mb-6">
                                Round {roundIndex + 1}
                            </h3>

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
                                            className={`p-3 mb-2 cursor-pointer rounded transition-colors duration-200 ${match.winner === match.player1
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
                                            className={`p-3 cursor-pointer rounded transition-colors duration-200 ${match.winner === match.player2
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
        </div>
    );
};

export default BracketDisplay;