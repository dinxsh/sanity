"use client";
import TournamentBracket from "../../components/TournamentBracket";
import React from "react";
import BracketList from "../../components/BracketList";
import { Button, buttonVariants } from "../../components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BracketPage = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="px-[5%] xl:px-[12%] min-h-[70vh] transition-all">
      <div className="mt-20 flex flex-row justify-between border-b pb-[10px]">
        <h2 className="text-2xl font-bold mb-4">Existing Brackets</h2>
        <Button
          className={`ml-auto ${buttonVariants({ variant: "default" })}`}
          disabled={session.status !== "authenticated"}
          onClick={() => router.push("/bracket/create")}
          aria-label="bracket-create-redirect"
        >
          Create a bracket
        </Button>
      </div>
      <BracketList />
    </div>
  );
};

export default BracketPage;
