"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { games } from "../../games/data";
import Image from "next/image";
import { Input } from "../../../@/components/ui/input";
import { Button } from "../../../components/ui/button";

export default function SelectGamesPage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [username, setUsername] = useState("");

  const inputRef = useRef(null);

  const router = useRouter();

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setUsername("");
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();

    router.push("/onboarding/completeprofile");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSelectedGame(null);
        setUsername("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-[5%] xl:px-[12%] pt-10 pb-20 transition-all">
      <div className="text-4xl font-semibold mb-10 ">Games</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 transition-all">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative h-64 overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-all"
            onClick={() => handleGameSelect(game)}
          >
            <Image
              src={game.image}
              alt={game.name}
              fill
              className={`w-full h-48 object-cover transition-all duration-300 ${
                selectedGame?.id === game.id ? "blur-sm" : ""
              }`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {selectedGame?.id === game.id ? (
                <form
                  ref={inputRef}
                  onSubmit={handleUsernameSubmit}
                  className="w-full p-4"
                >
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={`Enter username`}
                    className="w-full p-2 border rounded mb-2 bg-white bg-opacity-50 text-sm text-black placeholder:text-black"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full px-4 py-2 rounded"
                    arial-label="onboarding-selectgame-btn"
                  >
                    Submit
                  </Button>
                </form>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
