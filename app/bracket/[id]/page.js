"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Bracket from "../../../components/Brackets";

const BracketTemplate = () => {
  const { id } = useParams();
  const [bracket, setBracket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBracket = async () => {
      try {
        const response = await fetch(`/api/brackets/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching bracket");
        }
        const data = await response.json();
        setBracket(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBracket();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Destructure the bracket data once it's loaded
  const { tournamentName, format, participant } = bracket;

  return (
    <section className="px-5 xl:px-[10%] mt-[7.6875rem]">
      <header aria-labelledby="tournament_heading">
        <h2 className="font-black text-3xl" id="tournament_heading">
          {tournamentName}
        </h2>
        <p className="text-xl">
          {participant.length} Teams{" "}
          <span className="text-lg">
            {format === "single_elimination"
              ? "Single Elimination"
              : format === "double_elimination"
                ? "Double Elimination"
                : "Invalid Format"}
          </span>
        </p>
      </header>
      {/* The commented-out bracket grid is not needed for now */}
      <Bracket id={id} />
    </section>
  );
};

export default BracketTemplate;
