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
                setBracket(data);
            } catch (error) {
                console.error('Error fetching bracket:', error);
                setError(error.message);
            }
        };

        if (id) {
            fetchBracket();
        }
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!bracket) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">{bracket.bracketName}</h1>
            {bracket.bracketImage ? (
                <img src={bracket.bracketImage} alt="Tournament Bracket" className="max-w-full h-auto" />
            ) : (
                <p>No bracket image available</p>
            )}
        </div>
    );
};

export default BracketDisplay;