import { Button } from "@/components/ui/button";
import Link from "next/link";
import LocalSearchBar from "@/components/shared/localsearchbar/LocalSearchBar";
import Filter from "@/components/shared/filter/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getQuestions } from "@/lib/actions/question.action";

export default async function Home() {
  const result = await getQuestions({});
  const questions = result.questions;

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <>
      <div className="relative flex h-24 flex-col sm:h-fit">
        <Link
          href={"/ask-question"}
          className="primary-gradient absolute right-0 w-36 rounded-lg text-light-900"
        >
          <Button className="w-full">Ask a Question</Button>
        </Link>
        <h1 className="h1-bold text-dark200_light900 absolute bottom-0 dark:text-light-900 sm:static">
          All questions
        </h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[17px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
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
      </div>
    </>
  );
}
