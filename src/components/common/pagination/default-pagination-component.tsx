import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function DefaultPaginationComponent({
  currentPage,
  totalPages,
}: PaginationProps) {
  // console.log(totalPages);
  const renderPageLinks = () => {
    const pages = [];
    if (totalPages === 1) {
      return pages.push(
        <PaginationItem>
          <PaginationLink isActive={false} href={`?page=1`}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    if (totalPages === 2) {
      for (
        let i = currentPage;
        i <= Math.min(totalPages, currentPage + 1);
        i++
      ) {
        pages.push(
          <PaginationItem
            key={i}
            className={cn(
              i === currentPage ? '' : 'text-gray-500 hover:text-black',
            )}
          >
            <PaginationLink href={`?page=${i}`} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      for (
        let i = currentPage;
        i <= Math.min(totalPages, currentPage + 2);
        i++
      ) {
        pages.push(
          <PaginationItem
            key={i}
            className={cn(
              i === currentPage ? '' : 'text-gray-500 hover:text-black',
            )}
          >
            <PaginationLink href={`?page=${i}`} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    return pages;
  };

  return (
    <Pagination className="my-10">
      <PaginationContent>
        {/* Double Chevron Left (Go to First Page) */}
        <PaginationItem className="text-gray-500 hover:text-black">
          <PaginationLink href={`?page=1`}>
            <ChevronsLeft />
          </PaginationLink>
        </PaginationItem>

        {/* Chevron Left (Go to Previous Page) */}
        <PaginationItem>
          <PaginationLink href={`?page=${Math.max(1, currentPage - 1)}`}>
            <ChevronLeft />
          </PaginationLink>
        </PaginationItem>

        {/* Current Page and Next 3 Pages */}
        {renderPageLinks()}

        {/* Chevron Right (Go to Next Page) */}
        <PaginationItem>
          <PaginationLink
            href={`?page=${Math.min(totalPages, currentPage + 1)}`}
          >
            <ChevronRight />
          </PaginationLink>
        </PaginationItem>

        {/* Double Chevron Right (Go to Last Page) */}
        <PaginationItem>
          <PaginationLink
            href={`?page=${totalPages}`}
            className="text-gray-500 hover:text-black"
          >
            <ChevronsRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
