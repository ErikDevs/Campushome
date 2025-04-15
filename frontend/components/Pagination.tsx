import Category from "@/components/Category";
import Listing from "@/components/Listing";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Productspagination = () => {
  return (
    <div className="w-full mx-auto px-6 max-w-7xl">
      <div className="flex mt-10 gap-3">
        <div className="flex flex-1">
          <aside className="hidden md:flex">
            <Category />
          </aside>
        </div>
        <div className="flex justify-self-start w-full">
          <Listing />
        </div>
      </div>
      <div className="border max-w-md mx-auto w-full my-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="/products" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Productspagination;
