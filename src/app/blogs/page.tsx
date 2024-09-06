"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Blogs() {
  const [blogs, setBlogs] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      const res = await fetch("http://localhost:8000/api/blogs");
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
    setLoading(false);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h1 className="text-[100px] font-medium tracking-tight max-sm:text-[50px] max-sm:my-2">
        BLOGS
      </h1>
      <div className="flex w-screen flex-wrap gap-7 items-start justify-center px-10">
        {loading
          ? "Hang on tight while we fetch blogs..."
          : blogs.map((data: any, index: any) => (
              <Link href={`/blogs/${data.id}`} key={index}>
                <div className="group w-[350px] hover:bg-[#222]" key={index}>
                  <div className="w-full h-[250px] overflow-hidden">
                    <Image
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      src={data.image_url}
                      alt={data.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="px-4 py-8 flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">{data.id}. {data.name}</h2>
                    <p className="text-sm text-gray-500">
                      {data.description.substring(0, 100)} <Link href={`/blogs/${data.id}`} className="text-[#157eff] ml-1">Read More</Link>...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
