"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";
import NewsItem from "./NewsItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const News = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [esportsNews, setEsportsNews] = useState([]);
  const [gamingNews, setGamingNews] = useState([]);
  const [tournamentNews, setTournamentNews] = useState([]);

  axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

  useEffect(() => {
    const fetchNews = async (category, setter) => {
      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=${category}&lang=en&country=us&max=10&apikey=81a4b76d35bd5ea98535a29f90daa9fa`,
        );
        const articlesWithImages = response.data.articles.filter(
          (article) => article.image,
        );
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
      const scrollAmount = direction === "left" ? -300 : 300;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const renderNewsSlider = (title, articles, category) => (
    <div className="mb-16 mt-2">
      <div className="uppercase text-white text-center text-2xl md:text-3xl h-fit font-semibold ">
        {title}
      </div>

      <div>
        <div
          ref={sliderRefs[category]}
          className="grid grid-cols-1 p-2 m-2 md:grid-cols-2 md:p-1 md:m-1 "
        >
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex flex-col  justify-between border border-gray-700 shadow-md border-b-0 bg-gray-800 dark:border-gray-600 my-10 mx-5  "
            >
              <div className="">
                <NewsItem
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  urlToImage={article.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container px-2 h-fit ">
      {renderNewsSlider("Latest News", latestNews, "latestNews")}
      {renderNewsSlider("Esports", esportsNews, "esportsNews")}
      {renderNewsSlider("Gaming News", gamingNews, "gamingNews")}
    </div>
  );
};

export default News;
