"use client";

import NewsItems from "../../components/NewsItems";

export default function News() {
  return (
    <div className="flex flex-wrap gap-y-7 items-start justify-evenly w-full my-36">
      <NewsItems category="Gaming" />
    </div>
  );
}
