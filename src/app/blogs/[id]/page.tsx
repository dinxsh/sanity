"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBlog = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
    const data = await res.json();
    setBlog(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="relative flex flex-col items-center justify-center my-32 gap-7">
      {loading ? (
        <div>Hang tight content is loading...</div>
      ) : (
        <div className="flex flex-col items-start justify-center w-[40vw] gap-7">
          <Link
            className="w-full text-left text-md font-medium tracking-tight text-[#157eff]"
            href="/blogs"
          >
            Go Back
          </Link>
          <div className="w-full h-[400px] overflow-hidden">
            <Image
              className="object-contain w-full h-full"
              src={blog.image_url}
              alt={blog.name}
              width={500}
              height={500}
            />
          </div>
          <h1 className="text-[50px] font-medium tracking-tight leading-tight max-sm:text-[30px]">
            {blog.name}
          </h1>
          <p className="text-[20px] tracking-tight max-sm:text-[15px]">
            {blog.description}
          </p>

          <div className="text-[#157eff] text-md flex justify-around w-full pt-5">
            {parseInt(params.id) > 1 && (
              <Link href={`/blogs/${parseInt(params.id) - 1}`}>&lt; Prev</Link>
            )}
            {parseInt(params.id) < 10 && (
              <Link href={`/blogs/${parseInt(params.id) + 1}`}>Next &gt;</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
