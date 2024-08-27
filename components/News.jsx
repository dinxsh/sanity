"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const News = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [esportsNews, setEsportsNews] = useState([]);
  const [gamingNews, setGamingNews] = useState([]);

  useEffect(() => {
    const fetchNews = async (category, setter) => {
      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=${category}&lang=en&country=us&max=10&apikey=81a4b76d35bd5ea98535a29f90daa9fa`
        );
        const articlesWithImages = response.data.articles.filter(article => article.image);
        setter(articlesWithImages);
      } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
      }
    };

    fetchNews("Gaming", setLatestNews);
    fetchNews("Esports", setEsportsNews);
    fetchNews("Gaming News", setGamingNews);
  }, []);

  const sliderRefs = {
    latestNews: useRef(null),
    esportsNews: useRef(null),
    gamingNews: useRef(null),
    tournamentNews: useRef(null),
  };

  const scroll = (category, direction) => {
    const slider = sliderRefs[category].current;
    if (slider) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderNewsSlider = (title, articles, category) => (
    <div className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-indigo-300 border-b-2 border-indigo-500 pb-2">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll(category, 'left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full z-10 hover:bg-indigo-700 transition-colors duration-300"
        >
          <FaChevronLeft />
        </button>
        <div ref={sliderRefs[category]} className="flex overflow-x-hidden space-x-6 pb-8">
          {articles.map((article, index) => (
            <div key={index} className="flex-none w-80 h-96">
              <NewsItem
                title={article.title}
                description={article.description}
                url={article.url}
                urlToImage={article.image}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll(category, 'right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full z-10 hover:bg-indigo-700 transition-colors duration-300"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-8 py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <h1 className="text-6xl font-bold mb-16 text-center text-indigo-200 animate-pulse">News Highlights</h1>
      {renderNewsSlider("Latest News", latestNews, "latestNews")}
      {renderNewsSlider("Esports", esportsNews, "esportsNews")}
      {renderNewsSlider("Gaming News", gamingNews, "gamingNews")}
    </div>
  );
};

export default News;