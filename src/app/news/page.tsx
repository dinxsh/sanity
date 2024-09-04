"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function News() {
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getNews = async () => {
      const req = await fetch(
        "https://gnews.io/api/v4/search?q=gaming&lang=en&country=us&max=20&apikey=81a4b76d35bd5ea98535a29f90daa9fa"
      );
      const res: any = await req.json();
      setNews(res.articles);
    };
    getNews();
    setLoading(false);
  }, []);
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center w-screen my-24">
        <h1 className="text-[100px] font-semibold">NEWS</h1>
      <div className="flex flex-wrap gap-y-7 items-start justify-evenly w-full">
        {news.map((data, index) => (
          <Link key={index} href={data.url} target="_blank">
            <div
              className="relative h-auto w-[500px] group flex flex-col"
              onClick={() => {
                router.push(data.url);
              }}
            >
              <Image
                src={data.image}
                className="h-auto w-[500px] object-cover transition-all"
                height={400}
                width={500}
                alt={data.title}
              />
              <h1 className="absolute bottom-0 left-0 text-xl tracking-tight font-semibold z-[1] group-hover:underline transition-all p-3">
                {data.title}
              </h1>
              <div className="absolute top-0 left-0 w-full h-full group-hover:bg-gradient-to-t from-primary to-transparent group-hover:backdrop-blur transition-all"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
