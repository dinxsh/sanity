import TournamentBracket from "../../components/TournamentBracket";
import React from "react";
import BracketList from "../../components/BracketList";
import { buttonVariants } from "../../components/ui/button";
import Link from "next/link";

const BracketPage = () => {
  return (
    <div className="min-h-[70vh] px-7">
      <div className="border-b pb-4 px-4 flex">
        <Link
          href="/bracket/create"
          className={`ml-auto ${buttonVariants({ variant: "default" })}`}
          aria-label="bracket-create-redirect"
        >
          Create a bracket
        </Link>
      </div>
      <BracketList />
    </div>
  );
};

export default BracketPage;
