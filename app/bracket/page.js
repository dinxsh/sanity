import TournamentBracket from "../../components/TournamentBracket";
import React from "react"
import BracketList from "../../components/BracketList";
import { buttonVariants } from "../../components/ui/button"
import Link from "next/link";

const BracketPage = () => {
<<<<<<< HEAD
  return (
    <div className="min-h-[70vh] px-7">
      <TournamentBracket />
      <BracketList />
    </div>
  );
=======
    return (
        <div className="min-h-[70vh] px-7">
            <div className="border-b pb-4 px-4 flex">
                <Link href="/bracket/create" className={`ml-auto ${buttonVariants({ variant: "default" })}`}>
                    Create a bracket
                </Link>
            </div>
            <BracketList />
        </div>
    );
>>>>>>> b418101d01fe295be81b7e9ac6f6e768af6ec6b3
};

export default BracketPage;
