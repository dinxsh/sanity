import Image from 'next/image';
import React from 'react';
import capa from '../app/assets/pexels.jpeg';
import { Figma } from 'lucide-react';

const BlogOffer = () => {
  return (
    <div className="sm:flex flex-row items-center gap-4 px-8">
      <div className="flex-1">
        <Image
          src={capa}
          alt="image"
          width={500}
          height={500}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col h-[400px] gap-5">
        <h1 className="text-2xl font-bold">What we offer</h1>
        <div className="flex flex-row gap-3">
          <div className="pt-1">
            <Figma />
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
            <Figma />
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
            <Figma />
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
