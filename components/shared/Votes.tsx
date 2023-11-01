"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.actions";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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

export default function Votes({
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

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
    });
  });

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

      // TODO: Add toast

      return;
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

      // TODO: Add toast
    }
  };

  return (
    <div className="hidden gap-3 sm:flex">
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
        <span className="subtle-medium background-light700_dark400 text-dark200_light900 h-fit rounded-sm px-2 py-1 text-xs dark:text-light-900">
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
          alt="views"
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={() => handleVote("downvote")}
        />
        <span className="subtle-medium background-light700_dark400 text-dark200_light900 h-fit rounded-sm px-2 py-1 text-xs dark:text-light-900">
          {formatAndDivideNumber(downvotes)}
        </span>
      </div>
      {type === "Question" && (
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
      )}
    </div>
  );
}
