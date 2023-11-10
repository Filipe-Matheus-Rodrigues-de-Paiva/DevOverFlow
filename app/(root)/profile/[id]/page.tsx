import {
  getUserAnswers,
  getUserById,
  getUserQuestions,
} from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import Stats from "@/components/profile/Stats";
import UserInfo from "@/components/profile/UserInfo";
import Tab from "@/components/profile/Tabs";

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

export default async function ProfilePage({ params, searchParams }: URLProps) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const user = await getUserById({ userId: params.id });

  const answersResults = await getUserAnswers({
    userId: user.id,
    page: Number(searchParams.page) || 1,
    pageSize: 10,
  });
  // @ts-ignore
  const answers: IAnswer[] = answersResults.answers;
  const totalPagesAnswers = answersResults.totalPages;

  const questionsResults = await getUserQuestions({
    userId: user.id,
    page: Number(searchParams.page) || 1,
    pageSize: 10,
  });
  // @ts-ignore
  const questions: IQuestion[] = questionsResults.questions;
  const totalPagesQuestions = questionsResults.totalPages;

  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  return (
    <>
      <UserInfo months={months} user={user} />
      <Stats
        questionsResults={questionsResults.totalQuestions}
        answersResults={answersResults.totalAnswers}
      />
      <div className="relative mt-10 flex flex-col">
        <Tab
          questions={questions}
          answers={answers}
          totalPagesQuestions={totalPagesQuestions}
          totalPagesAnswers={totalPagesAnswers}
        />
      </div>
    </>
  );
}
