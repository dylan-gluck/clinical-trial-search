import { TrialSummary } from "@/services/trials-service";
import { ClinicalTrial } from "@/types/clinical-trial";
import { create } from "zustand";

interface AppState {
  query: string;
  setQuery: (query: string) => void;
  results: TrialSummary[];
  setResults: (results: TrialSummary[]) => void;
  selected: ClinicalTrial[];
  selectTrial: (trial: ClinicalTrial) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  totalResults: number;
  setTotalResults: (total: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  query: "",
  setQuery: (query: string) => set({ query }),
  results: [],
  setResults: (results: TrialSummary[]) => set({ results }),
  selected: [],
  selectTrial: (trial: ClinicalTrial) =>
    set((state) => ({ selected: [...state.selected, trial] })),
  currentPage: 1,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  totalPages: 0,
  setTotalPages: (pages: number) => set({ totalPages: pages }),
  totalResults: 0,
  setTotalResults: (total: number) => set({ totalResults: total }),
}));
