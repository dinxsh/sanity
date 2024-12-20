"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "../lib/utils/index";

const Filter = ({ filters, otherClasses, containerClasses }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramsFilter = searchParams.get("filter");

  const handleUpdateParams = (value) => {
    if (value !== "none") {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value,
      });
      router.push(newUrl, { scroll: false });
    } else {
      router.push("/games");
    }
  };

  return (
    <div className={`relative  ${containerClasses} border-zinc-200/20`}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramsFilter || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular background-light850_dark100 text-dark100_light900 min-w-16 border-none px-5   sm:w-full`}
        >
          <div className=" flex-1 text-nowrap text-left px-2">
            <SelectValue placeholder="Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark100_light900 small-regular border-none bg-light-1 dark:bg-dark-2  ">
          <SelectGroup className="rounded-xl flex flex-col gap-1">
            {filters.map((filter) => {
              return (
                <SelectItem
                  key={filter.value}
                  value={filter.value}
                  className="cursor-pointer focus:bg-light-2 dark:focus:bg-dark-4 px-2 rounded-xl border border-zinc-600/20 bg-zinc-800/40 hover:bg-black hover:border-zinc-200/50"
                >
                  {filter.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
