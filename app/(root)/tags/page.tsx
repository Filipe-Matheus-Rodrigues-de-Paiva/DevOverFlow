import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/filter/Filter";
import LocalSearchBar from "@/components/shared/localsearchbar/LocalSearchBar";
import { TagFilters } from "@/constants/filters";

export default async function Tags() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return (
    <div>
      <h1 className="h1-bold text-dark200_light900 dark:text-light-900">
        Tags
      </h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tag name..."
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[17px]"
          containerClasses="max-md:flex"
        />
      </div>
      <div className="mt-12 flex w-full flex-wrap gap-6">
        <TagCard />
      </div>

      {/* Pagination */}
    </div>
  );
}
