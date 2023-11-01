import AnswerForm from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import VotesMobile from "@/components/shared/VotesMobile";
import Votes from "@/components/shared/Votes";
import Filter from "@/components/shared/filter/Filter";
import RenderTag from "@/components/shared/rendertag/RenderTag";
import { QuestionFilters } from "@/constants/filters";
import { getAllAnswers } from "@/lib/actions/answer.actions";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { calculateTimeElapsed, formatAndDivideNumber } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

interface IAuthor {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  reputation: number;
  saved: string[];
  joinedAt: string;
  __v: number;
}

interface ITag {
  _id: string;
  __v: number;
  createdOn: Date;
  followers: string[];
  name: string;
  questions: string[];
}

export interface IAnswer {
  _id: string;
  author: IAuthor;
  question: string;
  content: string;
  upvotes: string[];
  downvotes: string[];
  createdAt: Date;
  __v: number;
}

export interface IQuestion {
  _id: string;
  title: string;
  content: string;
  tags: ITag[];
  views: number;
  upvotes: string[];
  downvotes: string[];
  author: IAuthor;
  answers: string[];
  createdAt: Date;
  __v: number;
}

export default async function QuestionDetails({
  params,
}: {
  params: { id: string };
}) {
  const question: IQuestion = await getQuestionById({ questionId: params.id });
  const result = await getAllAnswers({ questionId: params.id });
  // @ts-ignore
  const answers: IAnswer[] = result.answers;
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      {/* Voting - mobile */}
      <VotesMobile
        type="Question"
        itemId={JSON.stringify(question._id)}
        userId={JSON.stringify(mongoUser._id)}
        upvotes={question.upvotes.length}
        hasupVoted={question.upvotes.includes(mongoUser._id)}
        downvotes={question.downvotes.length}
        hasdownVoted={question.downvotes.includes(mongoUser._id)}
        hasSaved={mongoUser?.saved.includes(question._id)}
      />

      {/* Author info and voting Desktop */}
      <div className="flex justify-between">
        {/* author info */}
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
            <h3 className="h3-bold text-dark200_light900 dark:text-light-900">
              {question.author.username.charAt(0).toUpperCase() +
                question.author.username.substring(1)}{" "}
              |{" "}
              {question.author.name.charAt(0).toUpperCase() +
                question.author.name.substring(1)}
            </h3>
          </Link>
        </div>

        {/* Voting - desktop */}
        <Votes
          type="Question"
          itemId={JSON.stringify(question._id)}
          userId={JSON.stringify(mongoUser._id)}
          upvotes={question.upvotes.length}
          hasupVoted={question.upvotes.includes(mongoUser._id)}
          downvotes={question.downvotes.length}
          hasdownVoted={question.downvotes.includes(mongoUser._id)}
          hasSaved={mongoUser?.saved.includes(question._id)}
        />
      </div>

      {/* Question title */}
      <div className="mt-5">
        <h2 className="h2-bold text-dark200_light900 dark:text-light-900">
          {question.title}
        </h2>
      </div>

      {/* Metrics */}
      <div className="mt-5 flex flex-col justify-start gap-2 sm:flex-row sm:gap-8">
        <div className="flex gap-2">
          <Image
            src="/assets/icons/clock.svg"
            alt="views"
            height={16}
            width={16}
          />
          <p className="small-medium text-dark200_light900 dark:text-light-900">
            {calculateTimeElapsed(question.createdAt)}
          </p>
        </div>

        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(question.upvotes.length)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      {/* Editor and Parsed Code */}
      <ParseHTML data={question.content} />

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-3">
        {question.tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      {/* Answers */}
      <div className="flex-between mt-5 items-center">
        <h3 className="primary-text-gradient">
          {question.answers.length} Answers
        </h3>
        <Filter filters={QuestionFilters} containerClasses="max-md:flex" />
      </div>
      <AllAnswers answers={answers} question={question} mongoUser={mongoUser} />

      {/* Answer Form */}
      <div className="mt-10 flex flex-col gap-5">
        <div className="flex-between flex-col gap-5 sm:flex-row sm:items-center sm:gap-2">
          <p className="paragraph-semibold text-dark200_light900 dark:text-light-900">
            Write your answer here
          </p>
          <div className="btn background-light800_dark400 flex gap-2 rounded p-2 text-primary-500">
            <Image
              src={"/assets/icons/stars.svg"}
              alt="stars"
              width={15}
              height={15}
            />
            <button>Generate AI answer</button>
          </div>
        </div>
        <AnswerForm
          authorId={JSON.stringify(mongoUser._id)}
          questionId={JSON.stringify(question._id)}
        />
      </div>
    </>
  );
}
