import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface NewsProps {
  category: string;
}

export default function NewsItems({ category }: NewsProps) {
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getNews = async () => {
      // const req = await fetch(
      //   `https://gnews.io/api/v4/search?q=${category}&lang=en&country=us&max=20&apikey=${process.env.NEXT_PUBLIC_GNEWS_API_KEY}`
      const req = await fetch("http://localhost:8000/api/news");
      const res: any = await req.json();
      setNews(res.articles);
    };
    getNews();
    setLoading(false);
  }, []);
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="uppercase text-[100px] font-medium tracking-tight max-sm:text-[50px] max-sm:my-2">
        {category} NEWS
      </h1>
      {loading ? (
        <p className="h-[60vh] w-full flex justify-center items-center">Hang on tight while we fetch the latest news...</p>
      ) : (
        <span className="flex flex-wrap max-w-[1600px] gap-7 justify-start w-full max-2xl:justify-center">
          {news.map((data, index) => (
            <Link key={index} href={data.url} target="_blank">
              <div
                className="relative h-auto w-[500px] group flex flex-col overflow-hidden max-md:w-[450px]"
                onClick={() => {
                  router.push(data.url);
                }}
              >
                <Image
                  src={data.image}
                  className="h-auto w-[500px] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all"
                  height={400}
                  width={500}
                  alt={data.title}
                />
                <h1 className="absolute bottom-0 left-0 text-xl tracking-tight font-semibold z-[1] group-hover:underline transition-all p-3">
                  {data.title}
                </h1>
                <div className="absolute top-0 left-0 w-full h-full group-hover:bg-gradient-to-t from-primary to-transparent transition-all"></div>
              </div>
            </Link>
          ))}
        </span>
      )}
    </div>
  );
}
