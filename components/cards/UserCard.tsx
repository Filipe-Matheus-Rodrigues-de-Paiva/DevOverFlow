import { IUser } from "@/app/(root)/community/page";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/rendertag/RenderTag";

interface UserCardProps {
  user: IUser;
}

export default async function UserCard({ user }: UserCardProps) {
  const tags = await getTopInteractedTags({ userId: user._id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="light-border w-full border-2 md:max-w-[270px]"
    >
      <div className="card-wrapper flex w-full flex-col items-center justify-center gap-3 rounded-[10px] p-9 sm:px-11">
        <Image
          src={user.picture}
          alt=""
          height={100}
          width={100}
          className="rounded-full"
        />
        <h3 className="h3-bold text-dark200_light900 line-clamp-1 dark:text-light-900">
          {user.username.charAt(0).toUpperCase() + user.username.substring(1)} |{" "}
          {user.name.charAt(0).toUpperCase() + user.name.substring(1)}
        </h3>
        <p className="text-light400_light500 body-regular">
          @{user.email.split("@")[0]}
        </p>
        <div className="flex gap-3">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
            ))
          ) : (
            <Badge>
              <span className="text-light400_light500 body-regular">
                No tags yet
              </span>
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
