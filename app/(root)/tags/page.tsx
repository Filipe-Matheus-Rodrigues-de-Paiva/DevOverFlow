import TagCard from "@/components/cards/TagCard";
import Pagination from "@/components/shared/Pagination";
import Filter from "@/components/shared/filter/Filter";
import LocalSearchBar from "@/components/shared/localsearchbar/LocalSearchBar";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.actions";
import { SearchParamsProps } from "@/types";

export default async function Tags({ searchParams }: SearchParamsProps) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const results = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: Number(searchParams.page || 1),
    pageSize: 10,
  });

  const totalPages = results.totalPages;

  return (
    <div>
      <h1 className="h1-bold text-dark200_light900 dark:text-light-900">
        Tags
      </h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/tags"
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
        <TagCard tags={results.tags} />
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}
