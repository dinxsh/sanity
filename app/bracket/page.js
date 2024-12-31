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
    <div className="min-h-[70vh] px-7">
      <div className="border-b pb-4 px-4 flex justify-end">
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
