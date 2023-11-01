import LocalSearchBar from "@/components/shared/localsearchbar/LocalSearchBar";
import Filter from "@/components/shared/filter/Filter";
import { QuestionFilters } from "@/constants/filters";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getAllSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

export default async function Collection() {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getAllSavedQuestions({ clerkId: userId });

  const questions = result.questions;

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <>
      <h1 className="h1-bold text-dark200_light900 absolute bottom-0 dark:text-light-900 sm:static">
        Saved Questions
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for your saved questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[17px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => (
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
            title="No Saved Questions Found"
            description="It appears that there are no saved questions in your collection at the moment 😔.Start exploring and saving questions that pique your interest 🌟"
            link="/"
            linkTitle="Explore Questions"
          />
        )}
      </div>
    </>
  );
}
