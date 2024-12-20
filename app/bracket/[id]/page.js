"use client";

import { useParams } from "next/navigation";
import Bracket from "../../../components/Brackets";

const BracketTemplate = async () => {
  const params = useParams();
  const { id } = params;

  const bracket = await fetch(`/api/brackets/${id}`);

  if (!bracket.ok) {
    return <div>Error fetching bracket</div>;
  }

  const { tournamentName, format, consolationFinal, grandFinalType, teams } = await bracket.json();

  return (
    <section className="px-5 xl:px-[10%] mt-[7.6875rem]">
      <header aria-labelledby="tournament_heading">
        <h2 className="font-black text-3xl" id="tournament_heading">
          {tournamentName}
        </h2>
        <p className="text-xl">
          {teams.length} Teams{" "}
          <span className="text-lg">({format === "single_elimination" ? "Single Elimination" : format === "double_elimination" ? "Double Elimination" : "Invalid Format"})</span>
        </p>
      </header>
      {/* <div className="mt-20 bg-white/5 p-5 rounded-xl">
        <div
          className="grid gap-y-4 gap-x-[4.5rem]"
          style={{
            gridTemplateRows: `repeat(${gridRows}, 3.75rem)`,
            gridAutoColumns: "auto",
          }}
        >
          {numOfTeams % 2 !=== 0 && <article style={{
            gridRowStart: (numOfTeams / 2) + 1,
            gridRowEnd: (numOfTeams / 2) + 2,
            gridColumnStart 
          }}></article>}
          {Array.from({ length: Math.floor(numOfTeams / 2) }).map((_, i) => (
            <article className="row-span-2 rounded-2xl overflow-clip" key={i}>
              <div></div>
              <div></div>
            </article>
          ))}
        </div>
      </div> */}
      {/* <Bracket id={id} /> */}
    </section>
  );
};

export default BracketTemplate;
