import React from "react";

const BlogBanner = () => {
  return (
    <div className="min-h-[240px] w-full flex flex-col justify-center items-center px-4 mt-10 pb-10">
      <h1 className="text-5xl font-black md:text-7xl mb-6 text-center leading-tight">
        Catch up on the latest <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
          Sanity Esports
        </span>
      </h1>
    </div>
  );
};

export default BlogBanner;
