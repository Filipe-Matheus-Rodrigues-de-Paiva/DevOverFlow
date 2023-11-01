"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.actions";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
  type: "Question" | "Answer";
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

export default function VotesMobile({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: Props) {
  const pathname = usePathname();

  const handleSave = async () => {
    await toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
    }

    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
    }
  };

  return (
    <div className="mb-5 flex justify-end gap-4 sm:hidden">
      <div className="flex items-center gap-1">
        <Image
          src={
            hasupVoted
              ? "/assets/icons/upvoted.svg"
              : "/assets/icons/upvote.svg"
          }
          alt="upvotes"
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={() => handleVote("upvote")}
        />
        <span className="background-light700_dark400 text-dark200_light900 h-fit rounded-sm px-2 py-1 text-xs dark:text-light-900">
          {formatAndDivideNumber(upvotes)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Image
          src={
            hasdownVoted
              ? "/assets/icons/downvoted.svg"
              : "/assets/icons/downvote.svg"
          }
          alt="downvote"
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={() => handleVote("downvote")}
        />
        <span className="background-light700_dark300 text-dark200_light900 h-fit px-2 py-1 text-xs dark:text-light-900">
          {formatAndDivideNumber(downvotes)}
        </span>
      </div>
      <Image
        src={
          hasSaved
            ? "/assets/icons/star-filled.svg"
            : "/assets/icons/star-red.svg"
        }
        alt="save"
        height={20}
        width={20}
        className="cursor-pointer"
        onClick={() => handleSave()}
      />
    </div>
  );
}
