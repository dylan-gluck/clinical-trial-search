"use client";

import { SearchInput } from "@/components/ui/search-input";
import { useAppStore } from "@/state/app-store";
import trialsService from "@/services/trials-service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "../ui/badge";

export const ResultsView = () => {
  const results = useAppStore((state) => state.results);
  const currentPage = useAppStore((state) => state.currentPage);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const totalPages = useAppStore((state) => state.totalPages);
  const totalResults = useAppStore((state) => state.totalResults);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    const query = useAppStore.getState().query;
    const result = trialsService.getTrialSummaries({
      query,
      page,
      limit: 20,
    });
    useAppStore.getState().setResults(result.summaries);
    useAppStore.getState().setTotalPages(result.totalPages);
    useAppStore.getState().setTotalResults(result.total);
  }

  function generatePaginationItems() {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={1 === currentPage}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              isActive={totalPages === currentPage}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    return items;
  }

  return (
    <section className="grid grid-cols-1 min-h-screen p-10">
      <div className="grid grid-rows-[auto 1fr] p-4 gap-4 flex-1 min-h-screen">
        <SearchInput resetPagination={true} />
        <div className="grid grid-cols-1 grid-rows-[auto 1fr auto] space-y-4 p-4 rounded-sm border border-border">
          {totalResults > 0 && (
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * 20 + 1}-
              {Math.min(currentPage * 20, totalResults)} of {totalResults}{" "}
              results
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead className="min-w-md">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="min-w-md">Conditions</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Phases</TableHead>
                <TableHead>Enrollment Count</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Lead Sponsor</TableHead>
                <TableHead className="min-w-md">Locations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.nctId}>
                  <TableCell>
                    <Badge variant="outline">{result.nctId}</Badge>
                  </TableCell>
                  <TableCell className="min-w-md whitespace-normal">
                    {result.briefTitle}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{result.overallStatus}</Badge>
                  </TableCell>
                  <TableCell className="min-w-md whitespace-normal">
                    {result.conditions.join(", ")}
                  </TableCell>
                  <TableCell>{result.studyType}</TableCell>
                  <TableCell>
                    {result.phases ? result.phases.join(", ") : ""}
                  </TableCell>
                  <TableCell>{result.enrollmentCount}</TableCell>
                  <TableCell>{result.startDate}</TableCell>
                  <TableCell>{result.leadSponsor}</TableCell>
                  <TableCell className="min-w-md whitespace-normal">
                    {result.locations.join(", ")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={
                      currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {generatePaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </section>
  );
};
