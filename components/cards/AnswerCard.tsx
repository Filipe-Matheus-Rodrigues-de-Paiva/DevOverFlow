import { calculateTimeElapsed, formatAndDivideNumber } from "@/lib/utils";
import Metric from "../shared/Metric";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteActions from "../shared/EditDeleteActions";

interface Props {
  _id: string;
  upvotes: number;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  question: {
    _id: string;
    title: string;
  };
  createdAt: Date;
}

export default function AnswerCard({
  _id,
  author,
  createdAt,
  upvotes,
  question,
}: Props) {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {calculateTimeElapsed(createdAt)}
          </span>

          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>

        {/* If signed in add edit delete actions */}
        <SignedIn>
          <EditDeleteActions type="answer" itemId={JSON.stringify(_id)} />
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` - ${calculateTimeElapsed(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyles="small-medium text-dark400_light700"
        />

        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(upvotes)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
}
