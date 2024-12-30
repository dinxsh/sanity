import React from "react";
import { fetchTeamById } from "../../../actions/teams/teams.action";
import Image from "next/image";
import { Check, X } from "lucide-react";

const TeamDetails = async ({ params }: any) => {
  const id = params.id;

  const team = await fetchTeamById(id);

  return (
    <div className="w-full max-w-5xl mx-auto h-full  p-10 ">
      <div className="relative w-full items-start gap-2 flex">
        <div className="max-h-[600px] w-1/2 max-sm:max-h-[400px] size-full overflow-auto border rounded-sm border-zinc-200/20 font-mono p-5 flex flex-col gap-5 ">
          <p className="text-xl">Requests</p>
          <div className="w-full h-[90%]I flex flex-col gap-2 overflow-auto">
            {[
              "tron",
              "hype",
              "mortal",
              "anon",
              "idk",
              "bot",
              "scythe",
              "shadow",
              "hype",
              "mortal",
              "anon",
              "idk",
            ].map((req, idx) => (
              <div
                key={idx}
                className="border border-zinc-200/20 backdrop-blur-lg backdrop-saturate-200 bg-zinc-800/20 w-full rounded-lg px-3 py-2 flex justify-between items-center"
              >
                <p>{req}</p>
                <div className=" flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="border border-zinc-200/20 rounded-full p-1"
                  >
                    <X className="text-red-600 size-5" />
                  </button>
                  <button
                    type="button"
                    className="border border-zinc-200/20 rounded-full p-1"
                  >
                    <Check className="text-green-600 size-5" />{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="w-full p-10 h-full flex items-center justify-center gap-2 mx-auto border md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3  rounded-sm  border-zinc-200/20">
            <Image
              src={team.image || "https://via.placeholder.com/40"}
              alt=""
              width={100}
              height={100}
              className="size-20 rounded-full"
            />
            <p className="text-5xl font-bold underline underline-offset-4 uppercase">
              {team.teamname}
            </p>
          </div>
          <div className="md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2 h-full w-full border font-mono rounded-sm  flex flex-col justify-center p-5 border-zinc-200/20">
            <p className="text-xl">
              Leader: <b>Anon</b>
              {/* Put this field in team model if needed */}
            </p>
            <p className="text-xl capitalize">
              Game: <b>{team.game}</b>
            </p>
          </div>
          <div className="md:row-start-3 md:col-start-1 size-full border rounded-sm  p-5 font-mono flex flex-col justify-center border-zinc-200/20">
            <p className="text-lg capitalize ">Role: {team.role}</p>
            <p className="text-lg capitalize ">Rank: {team.rank}</p>
            <p className="text-lg capitalize ">Server: {team.server}</p>
            <p className="text-lg capitalize ">Language: {team.language}</p>
          </div>

          <div className="md:row-start-3 md:col-start-2 size-full border rounded-sm font-mono p-5 flex gap-2 border-zinc-200/20 ">
            <p>Players:</p>
            {team.players.map((p: any) => (
              <p key={p}>{p.username}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
