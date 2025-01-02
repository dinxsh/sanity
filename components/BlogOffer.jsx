import Image from "next/image";
import React from "react";
import capa from "../app/assets/pexels.jpeg";
import { Dice1, Dice2, Dice3 } from "lucide-react";

const BlogOffer = () => {
  return (
    <div className="lg:flex flex-row items-center justify-center gap-4 px-10 mb-10 lg:mb-20 mx-auto transition-all">
      <div className="flex">
        <Image
          src={capa}
          alt="image"
          width={500}
          height={500}
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col items-start justify-center h-[400px] gap-5 lg:ml-10">
        <h1 className="mb-10 text-2xl font-bold text-indigo-500">
          What we offer
        </h1>

        <div className="flex flex-row gap-3">
          <div className="pt-1">
            <Dice1 />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold">Latest News</span>
            <p className="text-sm text-gray-400">
              Stay updated with the latest happening in the esports world.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="pt-1">
            <Dice2 />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold">Expert blogs</span>
            <p className="text-sm text-gray-400">
              Read insights and analyses from industry experts.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="pt-1">
            <Dice3 />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold">Community Engagement</span>
            <p className="text-sm text-gray-400">
              Join a community of like-minded people esports enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogOffer;
