"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import GlobalFilters from "../filter/GlobalFilters";
import { globalSearch } from "@/lib/actions/general.action";

export default function GlobalResults() {
  const searchParams = useSearchParams();

  const global = searchParams.get("global");
  const type = searchParams.get("type");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        const res = await globalSearch({ query: global, type });

        setResult(JSON.parse(res));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="absolute z-50 mt-3 w-full rounded-lg bg-light-800 shadow-sm dark:bg-[#212734]">
      <div className="flex items-center gap-5 p-5">
        <p className="text-dark400_light900 body-medium">Type:</p>
        <GlobalFilters />
      </div>
      <div className="my-2 h-[1px] bg-light-700/50 dark:bg-dark-500/50"></div>
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>

        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />
            <p className="text-dark400_light900 body-regular">
              Browsing the entire database...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {result.length > 0 ? (
              result.map((item: any, index) => (
                <Link
                  key={item.type + item.id + index}
                  href={renderLink(item.type, item.id)}
                  className="flex w-full cursor-pointer items-center gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                >
                  <Image
                    src={"/assets/icons/tag.svg"}
                    alt="Tag"
                    width={18}
                    height={18}
                  />
                  <div className="flex flex-col">
                    <h3 className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-light400_light500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-3">
                  Oops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
