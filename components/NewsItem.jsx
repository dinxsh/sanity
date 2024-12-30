import React from "react";
import Image from "next/image";
import Link from "next/link";

const NewsItem = ({ title, description, url, urlToImage }) => {
  return (
    <div className="flex flex-col justify-between border border-gray-700 rounded-lg shadow-md bg-gray-800 dark:border-gray-600 pb-4 cursor-pointer group relative transition-all">
      <div className="h-full w-full">
        <Image
          src={urlToImage}
          width={400}
          height={400}
          className="h-[400px] w-auto object-cover"
          alt={title}
        />
      </div>

      <div className="text-md font-bold text-white p-4 ">{title}</div>

      <div>
        <p className="text-sm text-gray-400 px-4">{description}</p>
      </div>

      <div className="hidden group-hover:flex transition-all flex-col p-[10px] justify-center items-center bg-[rgba(0,0,0,0.95)] h-full w-full absolute top-0">
        <Link
          className="bg-white text-black font-semibold hover:bg-tertiary transition-all text-[15px] px-4 py-2"
          href={url}
          target="_blank"
          aria-label="read-article"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
