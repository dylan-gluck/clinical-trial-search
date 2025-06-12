"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAppStore } from "@/state/app-store";
import trialsService from "@/services/trials-service";
import { useState } from "react";

export const SearchView = () => {
  const setQuery = useAppStore((state) => state.setQuery);
  const setResults = useAppStore((state) => state.setResults);
  const [inputQuery, setInputQuery] = useState("");

  function handleSearch() {
    setQuery(inputQuery);
    const result = trialsService.getTrialSummaries({ query: inputQuery });
    setResults(result.summaries);
  }

  return (
    <section className="container mx-auto max-w-xl text-center space-y-2 mb-40">
      <h1 className="font-bold text-2xl">Clinical Trials Search</h1>
      <p className="text-sm text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
        tortor ligula. In viverra egestas vestibulum. Maecenas et nibh a tellus
        volutpat mattis a quis neque.
      </p>
      <div className="flex items-center gap-1 mt-6">
        <Input
          name="search"
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
    </section>
  );
};
