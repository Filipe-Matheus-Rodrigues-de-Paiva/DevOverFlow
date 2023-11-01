import Image from "next/image";
import Link from "next/link";
import RenderTag from "../rendertag/RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getHotTags } from "@/lib/actions/tag.actions";

export default async function RightSideBar() {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getHotTags();

  return (
    <div className="dark:dark-gradient custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col items-center gap-10 overflow-y-auto border-l pb-5 pt-32 shadow-2xl dark:border-light-400 max-xl:hidden">
      <div className="w-full px-6">
        <h3 className="h3-bold text-dark200_light900 dark:text-light-900">
          Top questions
        </h3>
        <ul className="flex flex-col gap-5 pt-5">
          {hotQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
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
              totalQuestions={tag.questions}
              showCount
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
