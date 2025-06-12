"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/state/app-store";
import trialsService from "@/services/trials-service";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  resetPagination?: boolean;
}

export const SearchInput = ({
  className = "",
  placeholder = "Search clinical trials...",
  resetPagination = false,
}: SearchInputProps) => {
  const query = useAppStore((state) => state.query);
  const setQuery = useAppStore((state) => state.setQuery);
  const setResults = useAppStore((state) => state.setResults);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const setTotalPages = useAppStore((state) => state.setTotalPages);
  const setTotalResults = useAppStore((state) => state.setTotalResults);
  const [inputQuery, setInputQuery] = useState(query);

  const handleSearch = () => {
    setQuery(inputQuery);
    const page = resetPagination ? 1 : useAppStore.getState().currentPage;
    const result = trialsService.getTrialSummaries({
      query: inputQuery,
      page,
      limit: 20,
    });
    
    setResults(result.summaries);
    
    if (resetPagination) {
      setCurrentPage(result.page);
      setTotalPages(result.totalPages);
      setTotalResults(result.total);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Input
        name="search"
        placeholder={placeholder}
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <Button type="button" variant="outline" onClick={handleSearch}>
        <Search />
      </Button>
    </div>
  );
};