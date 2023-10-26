import Image from "next/image";
import Link from "next/link";
import RenderTag from "../rendertag/RenderTag";

const hotQuestions = [
  { _id: "1", title: "How do I use express as a custom server in NextJS?" },
  { _id: "2", title: "Cascading Deletes in SQLAlchemy?" },
  { _id: "3", title: "How to Perfectly Center a Div with Tailwind CSS?" },
  {
    _id: "4",
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  { _id: "5", title: "Redux Toolkit Not Updating State as Expected" },
];

const popularTags = [
  { _id: "1", name: "javascript", totalQuestions: 5 },
  { _id: "2", name: "react", totalQuestions: 5 },
  { _id: "3", name: "next", totalQuestions: 5 },
  { _id: "4", name: "vue", totalQuestions: 2 },
  { _id: "5", name: "redux", totalQuestions: 10 },
];

export default function RightSideBar() {
  return (
    <div className="dark:dark-gradient custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col items-center gap-10 overflow-y-auto border-l pb-5 pt-32 shadow-2xl dark:border-light-400 max-xl:hidden">
      <div className="w-full px-6">
        <h3 className="h3-bold text-dark200_light900 dark:text-light-900">
          Top questions
        </h3>
        <ul className="flex flex-col gap-5 pt-5">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </ul>
      </div>
      <div className="w-full px-6">
        <h3 className="h3-bold text-dark-100 dark:text-light-900">
          Popular Tags
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
  );
}
