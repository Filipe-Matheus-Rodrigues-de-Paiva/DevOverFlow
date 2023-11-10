import ParseHTML from "./ParseHTML";
import Image from "next/image";
import { calculateTimeElapsed } from "@/lib/utils";
import Link from "next/link";
import { IAnswer, IQuestion } from "@/app/(root)/question/[id]/page";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface Props {
  answers: IAnswer[];
  question: IQuestion;
  mongoUser: any;
  totalPages: any;
}

export default function AllAnswers({
  answers,
  question,
  mongoUser,
  totalPages,
}: Props) {
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
                  src={answer.author.picture}
                  alt="profile picture"
                  height={20}
                  width={20}
                  className="rounded-full"
                />
                <h3 className="body-medium md:h3-bold text-dark200_light900 dark:text-light-900">
                  {answer.author.name}
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

      <Pagination totalPages={totalPages} />
    </div>
  );
}
