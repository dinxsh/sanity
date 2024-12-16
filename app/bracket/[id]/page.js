"use client"

import { useParams } from "next/navigation"
import Bracket from "../../../components/Brackets"

const BracketTemplate = () => {
    const numOfTeams = 13;
    const typeOfElimination = "Single";
    const nameOfTournament = "XYZ";
    const gridRows = numOfTeams % 2 === 0 ? numOfTeams : numOfTeams + 1;
    const params = useParams()
    const { id } = params

    return (
        <section className="px-5 xl:px-[10%] mt-[7.6875rem]">
            <header aria-labelledby="tournament_heading">
                <h2 className="font-black text-3xl" id="tournament_heading">
                    {nameOfTournament} Tournament
                </h2>
                <p className="text-xl">
                    {numOfTeams} Teams{" "}
                    <span className="text-lg">({typeOfElimination} Elimination)</span>
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
            <Bracket id={id} />
        </section>
    );
};

export default BracketTemplate;