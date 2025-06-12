"use client";

import { ResultsView } from "@/components/app/results-view";
import { SearchView } from "@/components/app/search-view";
import { useAppStore } from "@/state/app-store";

export default function App() {
  const query = useAppStore((state) => state.query);

  return (
    <main className="grid place-items-center min-h-screen">
      {!query && <SearchView />}
      {query && <ResultsView />}
    </main>
  );
}
