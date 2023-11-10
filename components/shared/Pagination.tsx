"use client";

import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (Number(page) === 1 && Number(page) === totalPages) return null;

  return (
    <div className={`mt-10 flex w-full items-center justify-center gap-2`}>
      <Button
        disabled={Number(page) === 1}
        className="btn-secondary text-light-900"
        onClick={() => handleNavigation("prev")}
      >
        Prev
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{Number(page)}</p>
      </div>
      <Button
        disabled={Number(page) === totalPages}
        className="btn-secondary text-light-900"
        onClick={() => handleNavigation("next")}
      >
        Next
      </Button>
    </div>
  );
}
