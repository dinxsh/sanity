import { Button } from "../components/ui/button";
import React from "react";

const BlogBanner = () => {
  return (
    <div className="blogBanner min-h-[240px] w-full flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-r from-gray-900 to-gray-800">
      <h1 className="text-5xl font-black md:text-7xl mb-6 text-center leading-tight">
        Catch up on the latest {" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
          Sanity Esports
        </span>
      </h1>
    </div>
  );
};

export default BlogBanner;
