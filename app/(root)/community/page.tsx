import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/filter/Filter";
import LocalSearchBar from "@/components/shared/localsearchbar/LocalSearchBar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";

export interface IUser {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  reputation: number;
  saved: [];
  joinedAt: Date;
  __v: number;
}

export default async function Community() {
  const users: IUser[] = await getAllUsers();

  return (
    <div>
      <h1 className="h1-bold text-dark200_light900 dark:text-light-900">
        All Users
      </h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[17px]"
          containerClasses="max-md:flex"
        />
      </div>
      <div className="mt-10 flex w-full flex-wrap gap-6">
        {users.length > 0
          ? users.map((user) => <UserCard key={user._id} user={user} />)
          : null}
      </div>

      {/* Pagination */}
    </div>
  );
}
