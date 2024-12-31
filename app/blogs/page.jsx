import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { client, urlFor } from "../../lib/sanity";
import Image from "next/image";
import BlogBanner from "../../components/BlogBanner";
import BlogOffer from "../../components/BlogOffer";

export const revalidate = 30;

const getData = async () => {
  const query = `
    *[_type=='blog'] | order(createdAt desc){
      title, 
      smallDescription,
      titleImage,
      "currentSlug":slug.current,
      createdAt,
      tags
    }`;
  const data = await client.fetch(query);
  return data;
};

const page = async () => {
  const data = await getData();
  return (
    <div className="px-5 xl:px-[10%] flex flex-col mt-5 gap-7 transition-all">
      <BlogBanner />

      <BlogOffer />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8">
        {data.map((item, idx) => {
          return (
            <Card
              key={idx}
              className="flex flex-col justify-between border border-gray-700 rounded-lg shadow-md bg-gray-800 dark:border-gray-600"
            >
              <CardHeader>
                <Image
                  src={urlFor(item.titleImage).url()}
                  alt="title"
                  width={300}
                  height={200}
                  className="object-cover rounded-t-lg h-[200px] w-full"
                />
              </CardHeader>
              <CardContent className="flex flex-col justify-between p-4 h-[260px]">
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-xl font-bold text-white line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-400 line-clamp-3">
                    {item.smallDescription}
                  </CardDescription>
                  <p className="text-xs text-gray-500">
                    Published: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {item.tags &&
                      item.tags.slice(0, 3).map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    {item.tags && item.tags.length > 3 && (
                      <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  arial-label="read-more-btn"
                >
                  <Link
                    href={`/blogs/${item.currentSlug}`}
                    aria-label="read-more"
                  >
                    Read More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default page;
