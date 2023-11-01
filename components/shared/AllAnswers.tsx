import React from "react";
import ParseHTML from "./ParseHTML";
import Image from "next/image";
import { calculateTimeElapsed } from "@/lib/utils";
import Link from "next/link";
import { IAnswer, IQuestion } from "@/app/(root)/question/[id]/page";
import Votes from "./Votes";

interface Props {
  answers: IAnswer[];
  question: IQuestion;
  mongoUser: any;
}

export default function AllAnswers({ answers, question, mongoUser }: Props) {
  return (
    <div className="mt-5">
      {answers.map((answer) => (
        <div key={answer._id}>
          <div className="flex justify-between">
            <div>
              <Link
                href={`/profile/${question.author.clerkId}`}
                className="flex items-center gap-2"
              >
                <Image
                  src={question.author.picture}
                  alt="profile picture"
                  height={20}
                  width={20}
                  className="rounded-full"
                />
                <h3 className="body-medium md:h3-bold text-dark200_light900 dark:text-light-900">
                  {question.author.username.charAt(0).toUpperCase() +
                    question.author.username.substring(1)}{" "}
                  |{" "}
                  {question.author.name.charAt(0).toUpperCase() +
                    question.author.name.substring(1)}
                </h3>
                <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                  • {calculateTimeElapsed(answer.createdAt)}
                </p>
              </Link>
            </div>
            {/* Voting - desktop */}
            <Votes
              type="Answer"
              itemId={JSON.stringify(answer._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={answer.upvotes.length}
              hasupVoted={answer.upvotes.includes(mongoUser._id)}
              downvotes={answer.downvotes.length}
              hasdownVoted={answer.downvotes.includes(mongoUser._id)}
            />
          </div>
          <ParseHTML data={answer.content} />
          <div className="mb-7 mt-10 h-1 border-t-2 border-light-400"></div>
        </div>
      ))}
    </div>
  );
}
