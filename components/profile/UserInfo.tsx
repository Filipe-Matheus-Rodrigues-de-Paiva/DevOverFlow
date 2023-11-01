import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { getMonth, getYear } from "date-fns";

interface Props {
  user: any;
  months: any;
}

export default function UserInfo({ user, months }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Link href="/profile/edit" className="self-end sm:hidden">
        <Button className="btn-secondary light-border h-9 min-h-[46px] min-w-[175px] px-4 py-3 dark:text-white">
          Edit Profile
        </Button>
      </Link>

      <div className="relative flex w-full flex-col gap-6 lg:flex-row">
        <Image
          src={user.picture}
          alt={user.name}
          width={140}
          height={140}
          className="rounded-full"
        />

        <div className="flex flex-col gap-0.5">
          <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
          <p className="paragraph-regular text-dark200_light800">
            @{user.username}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {user.portfolioWebsite && (
              <div className="flex gap-1">
                <Image
                  src={"/assets/icons/link.svg"}
                  alt="link"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />

                <p className="paragraph-medium text-accent-blue">
                  <Link href={user.portfolioWebsite} className="cursor-pointer">
                    Portfolio
                  </Link>
                </p>
              </div>
            )}
            {user.location && (
              <div className="flex gap-1">
                <Image
                  src={"/assets/icons/location.svg"}
                  alt="location"
                  width={20}
                  height={20}
                />

                <p className="paragraph-regular text-dark200_light800">
                  {user.location}
                </p>
              </div>
            )}
            <div className="flex gap-1">
              <Image
                src={"/assets/icons/calendar.svg"}
                alt="calendar"
                width={20}
                height={20}
              />

              <p className="paragraph-regular text-dark200_light800">
                Entrou em {months[getMonth(user.joinedAt)]} de{" "}
                {getYear(user.joinedAt)}
              </p>
            </div>
          </div>
          {user.bio && (
            <p className="paragraph-regular text-dark400_light800 mt-8">
              {user.bio}
            </p>
          )}
        </div>

        <Link
          href="/profile/edit"
          className="absolute right-0 top-0 hidden self-end sm:block"
        >
          <Button className="btn-secondary light-border h-9 min-h-[46px] min-w-[175px] px-4 py-3 dark:text-white">
            Edit Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
