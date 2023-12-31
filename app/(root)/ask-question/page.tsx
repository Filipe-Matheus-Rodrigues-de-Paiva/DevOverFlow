import QuestionCreate from "@/components/forms/QuestionCreate";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function AskQuestion() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionCreate
          mongoUserId={JSON.stringify(mongoUser._id)}
          type="create"
        />
      </div>
    </div>
  );
}
