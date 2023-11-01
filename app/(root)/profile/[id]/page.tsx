import {
  getUserAnswers,
  getUserById,
  getUserQuestions,
} from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import Stats from "@/components/profile/Stats";
import UserInfo from "@/components/profile/UserInfo";
import Tab from "@/components/profile/Tabs";
import RenderTag from "@/components/shared/rendertag/RenderTag";

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

const popularTags = [
  { _id: "1", name: "javascript", totalQuestions: 5 },
  { _id: "2", name: "react", totalQuestions: 5 },
  { _id: "3", name: "next", totalQuestions: 5 },
  { _id: "4", name: "vue", totalQuestions: 2 },
  { _id: "5", name: "redux", totalQuestions: 10 },
];

export default async function ProfilePage({ params, searchParams }: URLProps) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const user = await getUserById({ userId: params.id });

  const answersResults = await getUserAnswers({
    userId: user.id,
    page: 1,
    pageSize: 10,
  });
  // @ts-ignore
  const answers: IAnswer[] = answersResults.answers;
  const questionsResults = await getUserQuestions({
    userId: user.id,
    page: 1,
    pageSize: 10,
  });
  // @ts-ignore
  const questions: IQuestion[] = questionsResults.questions;

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
      <div className="flex-between relative mt-10">
        <Tab questions={questions} answers={answers} />
        <div className="absolute right-0 top-0 hidden gap-5 px-6 xl:flex xl:w-80 xl:flex-col">
          <h3 className="h3-bold text-dark-100 dark:text-light-900">
            Top Tags
          </h3>
          <ul className="flex flex-col gap-4 pt-5">
            {popularTags.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
