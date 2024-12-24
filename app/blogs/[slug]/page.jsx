import { client, urlFor } from "../../../lib/sanity";
import Image from "next/image";
import React from "react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 30;

const getData = async (slug) => {
  const query = `
    *[_type=='blog' && slug.current =='${slug}']{
        "currentSlug":slug.current,
          title,
          content,
          titleImage
      }[0]`;
  const data = await client.fetch(query);
  if (!data) {
    throw new Error("Blog post not found");
  }
  return data;
};

const components = {
  types: {
    image: ({ value }) => {
      return (
        <Image
          src={urlFor(value).url()}
          alt={value.alt || "blog image"}
          width={600}
          height={600}
          className="object-cover border rounded-lg"
        />
      );
    },
  },
};

const page = async ({ params }) => {
  const data = await getData(params.slug);
  if (!data) {
    return <div>Blog post not found.</div>;
  }
  return (
    <div className="flex flex-col items-center gap-7">
      <h1 className="relative flex flex-row items-center">
        <Link
          href="/blog"
          className="absolute mt-2 left-[-128px]"
          aria-label="blog-redirect"
        >
          <ArrowLeft />
        </Link>
        <span className="block mt-2 text-3xl font-bold leading-8 tracking-tight text-center sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt="blog image"
        width={800}
        height={500}
        priority
        className="object-cover border rounded-lg"
      />
      <div className="mt-3 prose prose-xl prose-blue dark:prose-invert prose-li:marker:text-primary">
        <PortableText value={data.content} components={components} />
      </div>
    </div>
  );
};

export default page;
