import React from "react";
import Image from "next/image";
import Link from "next/link";

const NewsItem = ({ title, description, url, urlToImage }) => {
  return (
    <div className="group relative h-[400px] w-[300px] cursor-pointer transition-all">
      <div className="h-full w-full">
        <Image src={urlToImage} width={300} height={400} className="h-[400px] w-auto object-cover" alt={title} />
        <div className="group-hover:hidden transition-all absolute bottom-0 bg-gradient-to-t from-primary to-transparent h-full w-full flex items-end text-[20px] p-[10px] font-semibold">{title}</div>
      </div>
      
      <div className="hidden group-hover:flex transition-all flex-col p-[10px] justify-center items-center bg-[rgba(0,0,0,0.95)] h-full w-full absolute top-0">
        <p className="text-[18px] font-medium mb-5 text-center">{description}</p>
        <Link className="bg-secondary text-primary font-semibold hover:bg-tertiary transition-all text-[15px] px-4 py-2" href={url} target="_blank">Read Article</Link>
      </div>
    </div>
  );
};

export default NewsItem;
