'use client';
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
import { useSearchParams } from 'next/navigation';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  id?: string;
};

export function PaginationComponent({
  currentPage,
  totalPages,
  id,
}: PaginationProps) {
  // If there's only one page or no pages, don't render anything

  const baseUrl = id || '';
  const searchParams = useSearchParams();

  const getHref = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber?.toString() || '1');
    return `${baseUrl}?${params.toString()}`;
  };

  const renderPageLinks = () => {
    const pages = [];
    if (totalPages <= 5) {
      // Show all pages if total pages is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={getHref(i)}
              isActive={i === currentPage}
              className={cn(
                i === currentPage ? '' : 'text-gray-500 hover:text-black',
              )}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      // Show dynamic range with first, last, and current page + neighbors
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages, currentPage + 1);

      // Always show first page
      if (start > 1) {
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink
              href={getHref(1)}
              className="text-gray-500 hover:text-black"
            >
              1
            </PaginationLink>
          </PaginationItem>,
        );
        if (start > 2) {
          pages.push(
            <PaginationItem key="start-ellipsis">
              <span className="px-4">...</span>
            </PaginationItem>,
          );
        }
      }

      // Show current range
      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={getHref(i)}
              isActive={i === currentPage}
              className={cn(
                i === currentPage ? '' : 'text-gray-500 hover:text-black',
              )}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      // Always show last page
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push(
            <PaginationItem key="end-ellipsis">
              <span className="px-4">...</span>
            </PaginationItem>,
          );
        }
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href={getHref(totalPages)}
              className="text-gray-500 hover:text-black"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    return pages;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="my-10">
      <PaginationContent>
        {/* First Page */}
        <PaginationItem>
          <PaginationLink
            href={getHref(1)}
            aria-disabled={isFirstPage}
            onClick={(e) => isFirstPage && e.preventDefault()}
            className={cn(
              'text-gray-500 hover:text-black',
              isFirstPage && 'pointer-events-none opacity-50',
            )}
          >
            <ChevronsLeft />
          </PaginationLink>
        </PaginationItem>

        {/* Previous Page */}
        <PaginationItem>
          <PaginationLink
            href={getHref(currentPage - 1)}
            aria-disabled={isFirstPage}
            onClick={(e) => isFirstPage && e.preventDefault()}
            className={cn(
              'text-gray-500 hover:text-black',
              isFirstPage && 'pointer-events-none opacity-50',
            )}
          >
            <ChevronLeft />
          </PaginationLink>
        </PaginationItem>

        {/* Page Numbers */}
        {renderPageLinks()}

        {/* Next Page */}
        <PaginationItem>
          <PaginationLink
            href={getHref(currentPage + 1)}
            aria-disabled={isLastPage}
            onClick={(e) => isLastPage && e.preventDefault()}
            className={cn(
              'text-gray-500 hover:text-black',
              isLastPage && 'pointer-events-none opacity-50',
            )}
          >
            <ChevronRight />
          </PaginationLink>
        </PaginationItem>

        {/* Last Page */}
        <PaginationItem>
          <PaginationLink
            href={getHref(totalPages)}
            aria-disabled={isLastPage}
            onClick={(e) => isLastPage && e.preventDefault()}
            className={cn(
              'text-gray-500 hover:text-black',
              isLastPage && 'pointer-events-none opacity-50',
            )}
          >
            <ChevronsRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
