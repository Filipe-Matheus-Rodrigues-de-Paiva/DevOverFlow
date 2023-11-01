"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

export default function LocalSearchBar({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div
        className={`background-light800_darkgradient flex grow items-center gap-4 rounded-[10px] p-2 ${otherClasses}`}
      >
        {iconPosition === "left" && (
          <Image
            src={imgSrc}
            alt="search"
            height={24}
            width={24}
            className="cursor-pointer"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          className="paragraph-regular no-focus placeholder border-none bg-transparent shadow-none outline-none dark:text-white"
        />
      </div>
      <div>
        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </>
  );
}
