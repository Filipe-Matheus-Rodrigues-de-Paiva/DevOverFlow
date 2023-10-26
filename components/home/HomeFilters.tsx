"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { useState } from "react";

export default function HomeFilters() {
  const [active, setActive] = useState("newest");
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => setActive(item.value)}
          className={`body-medium rounded-lg px-6 py-3
          capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-slate-500 hover:text-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-orange-400 dark:hover:text-light-800"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}
