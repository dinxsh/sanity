"use client";

import { useParams } from "next/navigation";
import Bracket from "../../../components/Brackets";

const BracketTemplate = () => {
  const params = useParams();
  const { id } = params;


  return (
    // <section className="px-5 xl:px-[10%] mt-[7.6875rem]">
    //   <header aria-labelledby="tournament_heading">
    //     <h2 className="font-black text-3xl" id="tournament_heading">
    //       {tournamentName}
    //     </h2>
    //     <p className="text-xl">
    //       {teams.length} Teams{" "}
    //       <span className="text-lg">({format === "single_elimination" ? "Single Elimination" : format === "double_elimination" ? "Double Elimination" : "Invalid Format"})</span>
    //     </p>
    //   </header>
    //   {/* <Bracket id={id} /> */}
    // </section>
    <section>
      wip
    </section>
  );
};

export default BracketTemplate;
