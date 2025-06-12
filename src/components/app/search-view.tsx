"use client";

import { SearchInput } from "@/components/ui/search-input";

export const SearchView = () => {

  return (
    <section className="container mx-auto max-w-xl text-center space-y-2 mb-40">
      <h1 className="font-bold text-2xl">Clinical Trials Search</h1>
      <p className="text-sm text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
        tortor ligula. In viverra egestas vestibulum. Maecenas et nibh a tellus
        volutpat mattis a quis neque.
      </p>
      <SearchInput className="mt-6" resetPagination={true} />
    </section>
  );
};
