import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/localsearchbar/LocalSearchBar";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";

export default async function TagDetails({ params, searchParams }: URLProps) {
  const tagQuestions = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: Number(searchParams.page) || 1,
    pageSize: 10,
  });

  const questions = tagQuestions.questions;
  const totalPages = tagQuestions.totalPages;

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <>
      <h1 className="h1-bold text-dark200_light900 absolute bottom-0 dark:text-light-900 sm:static">
        {tagQuestions.tagTitle}
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tag questions..."
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length ? (
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
            title="No questions found for the tag"
            description="😔 Oops! It seems there are no questions related to [Tag Name] at the moment. Don't let that discourage you! Be the first to start a discussion about this tag by asking a question. 🚀"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
}
