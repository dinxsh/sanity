"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const BracketList = () => {
  const [brackets, setBrackets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrackets = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/brackets");
        if (!response.ok) {
          throw new Error("Failed to fetch brackets");
        }
        const data = await response.json();
        setBrackets(data);
      } catch (error) {
        console.error("Error fetching brackets:", error);
        setError("Failed to load brackets. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrackets();
  }, []);

  if (isLoading) return <div className="pt-3">Loading brackets...</div>;
  if (error) return <div className="pt-3">Error: {error}</div>;

  return (
    <div className="mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Existing Brackets</h2>
      {brackets.length === 0 ? (
        <p>No brackets found...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brackets.map((bracket) => (
            <Link
              href={`/bracket/${bracket._id}`}
              key={bracket._id}
              aria-label="bracket-id-page"
            >
              <div className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                {bracket.bracketImage && (
                  <div className="relative w-full h-40 mb-2">
                    <Image
                      src={bracket.bracketImage}
                      alt={`Thumbnail for ${bracket.bracketName}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">
                  {bracket.tournamentName}
                </h3>

                <p className="text-gray-600">
                  Created: {new Date(bracket.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BracketList;
