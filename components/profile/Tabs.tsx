import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import NoResult from "../shared/NoResult";
import AnswerCard from "../cards/AnswerCard";
import QuestionCard from "../cards/QuestionCard";

interface IAuthor {
  _id: string;
  clerkId: string;
  name: string;
  picture: string;
}

interface IQuestion {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  views: number;
  upvotes: string[];
  downvotes: string[];
  author: IAuthor;
  answers: object[];
  createdAt: Date;
  __v: number;
}

interface IAnswer {
  _id: string;
  author: IAuthor;
  question: {
    _id: string;
    title: string;
  };
  content: string;
  upvotes: string[];
  downvotes: string[];
  createdAt: Date;
  __v: number;
}

interface Props {
  questions: IQuestion[];
  answers: IAnswer[];
}

export default function Tab({ questions, answers }: Props) {
  return (
    <Tabs defaultValue="top-posts" className="max-w-[400px]">
      <TabsList className="background-light800_dark400 min-h-[42px] p-1">
        <TabsTrigger value="top-posts" className="tab">
          Top Posts
        </TabsTrigger>
        <TabsTrigger value="answers" className="tab">
          Answers
        </TabsTrigger>
      </TabsList>
      <TabsContent value="top-posts" className="mt-4 flex flex-col gap-5">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </TabsContent>
      <TabsContent value="answers" className="flex flex-col gap-5">
        {answers.length > 0 ? (
          answers.map((answer) => (
            <AnswerCard
              key={answer._id}
              _id={answer._id}
              author={answer.author}
              upvotes={answer.upvotes.length}
              createdAt={answer.createdAt}
              question={answer.question}
            />
          ))
        ) : (
          <NoResult
            title="There is no answer to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
