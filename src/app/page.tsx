"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { ResultsView } from "@/components/app/results-view";
import { SearchView } from "@/components/app/search-view";
import { useAppStore } from "@/state/app-store";
import { SelectedTrialsTool } from "@/components/assistant-ui/selected-trials-tool";

export default function App() {
  const query = useAppStore((state) => state.query);

  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SelectedTrialsTool />
      <main className="grid place-items-center min-h-screen">
        {!query && <SearchView />}
        {query && <ResultsView />}
      </main>
    </AssistantRuntimeProvider>
  );
}
