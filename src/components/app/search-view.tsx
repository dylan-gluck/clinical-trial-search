"use client";

import { SearchInput } from "@/components/ui/search-input";

export const SearchView = () => {
  return (
    <section className="container mx-auto max-w-xl text-center space-y-2 mb-40">
      <h1 className="font-bold text-2xl">Clinical Trials Search</h1>
      <p className="text-sm text-muted-foreground">
        Search for clinical trials by keyword then add to agent context for
        Q&amp;A
      </p>
      <SearchInput className="mt-6" resetPagination={true} />
    </section>
  );
};
