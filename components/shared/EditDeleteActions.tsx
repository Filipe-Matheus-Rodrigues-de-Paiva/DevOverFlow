"use client";

import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { deleteAnswer } from "@/lib/actions/answer.actions";

export default function EditDeleteActions({
  type,
  itemId,
}: {
  type: string;
  itemId: string;
}) {
  const path = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async (itemId: string) => {
    if (type === "question") {
      await deleteQuestion({ questionId: JSON.parse(itemId), path });
    } else {
      await deleteAnswer({ answerId: JSON.parse(itemId), path });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && path.includes("/profile") && (
        <Image
          src={`/assets/icons/edit.svg`}
          alt="edit"
          width={14}
          height={14}
          className="cursor-pointer"
          onClick={handleEdit}
        />
      )}
      {path.includes("/profile") && (
        <Image
          src={`/assets/icons/trash.svg`}
          alt="delete"
          width={14}
          height={14}
          className="cursor-pointer"
          onClick={() => handleDelete(itemId)}
        />
      )}
    </div>
  );
}
