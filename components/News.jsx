"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import dotenv from "dotenv";

const News = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [esportsNews, setEsportsNews] = useState([]);
  const [gamingNews, setGamingNews] = useState([]);
  const [tournamentNews, setTournamentNews] = useState([]);

  dotenv.config();

  useEffect(() => {
    const fetchNews = async (category, setter) => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${category}&from=2024-08-11&sortBy=publishedAt&language=en&apiKey=08573ce9567742189e61fdc2618a482b`
      );
      const articlesWithImages = response.data.articles.filter(article => article.urlToImage);
      setter(articlesWithImages);
    };

    fetchNews("Latest News", setLatestNews);
    fetchNews("Esports", setEsportsNews);
    fetchNews("Gaming News", setGamingNews);
    fetchNews("Tournaments", setTournamentNews);
  }, []);

  const renderNewsSlider = (title, articles) => (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-200">{title}</h2>
      <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide">
        {articles.map((article, index) => (
          <div key={index} className="flex-none w-72 h-72">
            <NewsItem
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-100">News Highlights</h1>
      {renderNewsSlider("Latest News", latestNews)}
      {renderNewsSlider("Esports", esportsNews)}
      {renderNewsSlider("Gaming News", gamingNews)}
      {renderNewsSlider("Tournaments", tournamentNews)}
    </div>
  );
};

export default News;