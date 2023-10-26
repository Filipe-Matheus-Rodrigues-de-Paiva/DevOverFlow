"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function LeftSideBar() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  return (
    <div className="dark:dark-gradient sticky left-0 top-0 flex h-screen w-72 flex-col items-center justify-between overflow-y-auto pb-3 pt-20 shadow-2xl max-lg:w-24 max-sm:hidden">
      <ul className="mt-10 flex w-10/12 flex-col gap-2 max-lg:w-fit">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              key={link.imgURL}
              href={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4 max-lg:w-fit`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </ul>
      <SignedOut>
        <div className="flex w-10/12 flex-col gap-3 max-lg:w-fit">
          <Link href={"/sign-in"}>
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none max-lg:w-fit">
              <Image
                src={"/assets/icons/account.svg"}
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log in
              </span>
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none max-lg:w-fit">
              <Image
                src={"/assets/icons/sign-up.svg"}
                alt="sign-up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Signup</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        <Button
          onClick={() => signOut()}
          className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-10/12 rounded-lg border px-4 py-3 shadow-none max-lg:w-fit"
        >
          <Image
            src={"/assets/icons/arrow-left.svg"}
            alt="sign-out"
            width={20}
            height={20}
            className="invert-colors lg:hidden"
          />
          <span className="max-lg:hidden">Sign out</span>
        </Button>
      </SignedIn>
    </div>
  );
}
