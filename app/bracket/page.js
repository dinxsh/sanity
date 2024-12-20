import TournamentBracket from "../../components/TournamentBracket";
import React from "react"
import BracketList from "../../components/BracketList";
import { buttonVariants } from "../../components/ui/button"
import Link from "next/link";

const BracketPage = () => {
  return (
    <div className="min-h-[70vh] px-7">
      <TournamentBracket />
      <BracketList />
    </div>
  );
};

export default BracketPage;
