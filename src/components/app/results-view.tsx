"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAppStore } from "@/state/app-store";
import trialsService from "@/services/trials-service";
import { useState } from "react";
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

export const ResultsView = () => {
  const results = useAppStore((state) => state.results);
  const query = useAppStore((state) => state.query);
  const setQuery = useAppStore((state) => state.setQuery);
  const setResults = useAppStore((state) => state.setResults);
  const currentPage = useAppStore((state) => state.currentPage);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const totalPages = useAppStore((state) => state.totalPages);
  const setTotalPages = useAppStore((state) => state.setTotalPages);
  const totalResults = useAppStore((state) => state.totalResults);
  const setTotalResults = useAppStore((state) => state.setTotalResults);
  const [inputQuery, setInputQuery] = useState(query);

  function handleSearch(page: number = 1) {
    setQuery(inputQuery);
    const result = trialsService.getTrialSummaries({ 
      query: inputQuery, 
      page,
      limit: 20 
    });
    setResults(result.summaries);
    setCurrentPage(result.page);
    setTotalPages(result.totalPages);
    setTotalResults(result.total);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    handleSearch(page);
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
          </PaginationItem>
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
        </PaginationItem>
      );
      
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
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
          </PaginationItem>
        );
      }
      
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
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
          </PaginationItem>
        );
      }
    }
    
    return items;
  }

  return (
    <section className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col px-4 gap-4">
        <div className="flex items-center gap-1 mt-6">
          <Input
            name="search"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(1);
              }
            }}
          />
          <Button type="button" variant="outline" onClick={() => handleSearch(1)}>
            <Search />
          </Button>
        </div>
        <div className="flex flex-col space-y-4 p-4 rounded-sm border border-border">
          {totalResults > 0 && (
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * 20) + 1}-{Math.min(currentPage * 20, totalResults)} of {totalResults} results
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Conditions</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Phases</TableHead>
                <TableHead>Enrollment Count</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Lead Sponsor</TableHead>
                <TableHead>Locations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.nctId}>
                  <TableCell>{result.nctId}</TableCell>
                  <TableCell>{result.briefTitle}</TableCell>
                  <TableCell>{result.overallStatus}</TableCell>
                  <TableCell>{result.conditions.join(", ")}</TableCell>
                  <TableCell>{result.studyType}</TableCell>
                  <TableCell>
                    {result.phases ? result.phases.join(", ") : ""}
                  </TableCell>
                  <TableCell>{result.enrollmentCount}</TableCell>
                  <TableCell>{result.startDate}</TableCell>
                  <TableCell>{result.leadSponsor}</TableCell>
                  <TableCell>{result.locations.join(", ")}</TableCell>
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
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
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
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
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
