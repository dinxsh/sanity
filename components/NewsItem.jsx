import React from "react";

const NewsItem = ({ title, description, url, urlToImage }) => {
  return (
    <div className="w-72 h-96 p-2 transition-transform duration-300 hover:scale-105">
      <div className="bg-gray-900 rounded-xl border border-indigo-600 h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative h-2/5">
          <img
            src={urlToImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        </div>
        <div className="p-4 flex flex-col justify-between flex-grow">
          <h3 className="text-lg font-bold mb-2 text-indigo-400 hover:text-white transition-colors duration-300 line-clamp-3">
            <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
          </h3>
          <p className="text-gray-300 text-sm mb-3 line-clamp-4">
            {description}
          </p>
          <a 
            href={url} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 text-sm font-semibold hover:text-white transition-colors duration-300 flex items-center mt-auto"
          >
            Read Full Article
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;