"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Bracket from "../../../components/Brackets";
import NewBracket from "../../../components/NewBracket";

const BracketTemplate = () => {
  const [bracket, setBracket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBracket = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/brackets/" + id);
        if (!response.ok) {
          throw new Error("Failed to fetch brackets");
        }
        const data = await response.json();
        setBracket(data);
      } catch (error) {
        console.error("Error fetching brackets:", error);
        setError("Failed to load brackets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBracket();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Destructure the bracket data once it's loaded
  const { tournamentName, format, participant, round } = bracket;
  console.log(bracket);

  return (
    <section className="px-5 xl:px-[10%] mt-[7.6875rem] ">
      <header aria-labelledby="tournament_heading flex flex-col gap-5">
        <h2 className="font-black text-3xl" id="tournament_heading">
          {tournamentName}
        </h2>
        <p className="text-xl">{participant.length} Teams </p>
        <span className="text-xl text-gray-400">
          {format === "single_elimination"
            ? "Single Elimination"
            : format === "double_elimination"
              ? "Double Elimination"
              : "Invalid Format"}
        </span>
      </header>
      {/* The commented-out bracket grid is not needed for now */}
      {/* <Bracket id={id} /> */}
      <NewBracket participant={participant} />
    </section>
  );
};

export default BracketTemplate;
