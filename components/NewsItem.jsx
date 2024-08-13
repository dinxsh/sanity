import React from "react";

const NewsItem = ({ title, description, url, urlToImage }) => {
  return (
    <div className="flex-1 p-6 md:p-10 z-10 overflow-auto">
      <div className=" flex bg-black rounded-2xl border border-solid border-indigo-700 ">
        <div className=" p-10 z-10 overflow-hidden">
          <div className="min-h-96 ">
            <div className="relative h-64">
              <img
                src={urlToImage}
                alt={urlToImage}
                className="w-full h-full rounded-sm object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
            </div>
            <h3 className="text-2xl cursor-pointer font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300 line-clamp-3">
              <a href={url}>{title}</a>
            </h3>
            <p className="text-gray-300 mb-6 text-base line-clamp-4">
              {description}
            </p>
            <a href={url} className="inline-flex items-center justify-center  text-white py-2" >Read Full Article</a>
          </div>
        </div>
      </div>
    </div>
  );
};


export default NewsItem;
