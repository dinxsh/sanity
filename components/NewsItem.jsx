import React from "react";

const NewsItem = ({ title, description, url, urlToImage }) => {
  return (
    <div className="w-72 h-72 p-4">
      <div className="bg-black rounded-xl border border-indigo-700 h-full flex flex-col overflow-hidden">
        <div className="relative h-1/2">
          <img
            src={urlToImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-12"></div>
        </div>
        <div className="p-4 flex flex-col justify-between flex-grow">
          <h3 className="text-lg font-bold mb-2 text-neon-green hover:text-white transition-colors duration-300 line-clamp-2">
            <a href={url}>{title}</a>
          </h3>
          <p className="text-gray-300 text-sm mb-2 line-clamp-2">
            {description}
          </p>
          <a 
            href={url} 
            className="text-white text-sm hover:text-neon-green transition-colors duration-300"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;