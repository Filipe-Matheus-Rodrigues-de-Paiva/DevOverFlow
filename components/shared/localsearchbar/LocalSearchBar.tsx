"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";

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
  return (
    <div
      className={`background-light800_darkgradient flex grow items-center gap-4 rounded-[10px] p-4 ${otherClasses}`}
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
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder border-none bg-transparent shadow-none outline-none dark:text-white"
      />
    </div>
  );
}
