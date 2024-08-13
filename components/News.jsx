"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import dotenv from "dotenv";

const News = () => {
  const [articles, setArticles] = useState([]);

  dotenv.config();

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get('https://newsapi.org/v2/everything?q=Gaming+Esports&from=2024-08-11&sortBy=publishedAt&language=en&apiKey=08573ce9567742189e61fdc2618a482b');
      setArticles(response.data.articles);
    };
    getArticles();
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"> 
      {articles.map((article) => {
        return (
          <NewsItem
            title={article.title}
            description={article.description}
            url={article.url}
            urlToImage={article.urlToImage}
           
          />
        );
      })}
    </div>
  );
};

export default News;
