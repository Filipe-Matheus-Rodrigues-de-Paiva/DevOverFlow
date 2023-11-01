import QuestionForm from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function EditQuestion({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  const question = await getQuestionById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <QuestionForm
          mongoUserId={mongoUser._id}
          type="edit"
          question={JSON.stringify(question)}
        />
      </div>
    </>
  );
}
