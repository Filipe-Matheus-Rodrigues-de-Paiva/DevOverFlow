import EditProfileForm from "@/components/forms/EditProfile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function EditProfile() {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <EditProfileForm mongoUser={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
}
