import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import BlogBanner from '../../components/BlogBanner';
import BlogOffer from '../../components/BlogOffer';

export const revalidate = 30;

const getData = async () => {
  const querry = `
    *[_type=='blog'] | order(_createdAt desc){
      title, smallDescription,
        titleImage,
        "currentSlug":slug.current
    }`;
  const data = await client.fetch(querry);
  return data;
};

const page = async () => {
  const data = await getData();
  return (
    <div className="flex flex-col mt-5 gap-7">
      <BlogBanner />
      <BlogOffer />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 px-7">
        {data.map((item, idx) => {
          return (
            <Card key={idx} className="flex flex-row border-none">
              <CardHeader>
                <Image
                  src={urlFor(item.titleImage).url()}
                  alt="title"
                  width={200}
                  height={200}
                  className="object-cover rounded-t-lg h-[200px] w-full"
                />
              </CardHeader>
              <CardContent className="flex flex-col justify-between py-4">
                <div className="flex flex-col gap-3">
                  <CardTitle className="text-2xl font-bold">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-3 dark:text-gray-300">
                    {item.smallDescription}
                  </CardDescription>
                </div>
                <Button asChild className="">
                  <Link href={`/blog/${item.currentSlug}`}>Read More</Link>
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
