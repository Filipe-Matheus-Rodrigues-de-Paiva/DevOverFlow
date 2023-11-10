import Link from "next/link";
import NoResult from "../shared/NoResult";

interface ITag {
  _id: string;
  name: string;
  followers: string[];
  questions: string[];
  createdOn: Date;
  __v: number;
}

interface Tag {
  tags: ITag[];
}

export default async function TagCard({ tags }: Tag) {
  return (
    <>
      {tags.length > 0 &&
        tags.map((tag) => (
          <Link
            href={`/tags/${tag._id}`}
            className="w-full rounded border border-slate-500 md:max-w-[270px]"
            key={tag._id}
          >
            <div className="card-wrapper flex w-full flex-col items-center justify-center gap-3 rounded-[10px] p-9 sm:px-11">
              <span className="h3-bold text-dark400_light700 background-light800_dark400 rounded px-4 py-1">
                {tag.name}
              </span>
              <p className="paragraph-regular text-dark400_light700 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                optio voluptate enim nisi molestias
              </p>
              <p className="small-medium text-dark400_light500 mt-3.5">
                <span className="body-semibold primary-text-gradient mr-2.5">
                  {tag.questions.length}+
                </span>{" "}
                Questions
              </p>
            </div>
          </Link>
        ))}
      {tags.length === 0 && (
        <NoResult
          title="No Tags Found"
          description="It looks like there are no tags found."
          link="/ask-question"
          linkTitle="Ask a question"
        />
      )}
    </>
  );
}
