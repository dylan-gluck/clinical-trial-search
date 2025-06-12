import trials from "@/data/trials.json";
import { ClinicalTrial } from "@/types/clinical-trial";

export interface DB {
  trials: ClinicalTrial[];
  getTrials(query: string, page: number, limit: number): ClinicalTrial[];
  getTrialById(id: string): ClinicalTrial | undefined;
}

class Database implements DB {
  trials: ClinicalTrial[];

  constructor() {
    this.trials = trials;
  }

  getTrials(query: string, page: number, limit: number): ClinicalTrial[] {
    const startIndex = (page - 1) * limit;

    // No query
    if (!query || query.trim() === "") {
      return this.trials.slice(startIndex, startIndex + limit);
    }

    // Basic text search
    //
    const filteredTrials = this.trials.filter((trial) => {
      const searchText = query.toLowerCase();
      const briefTitle =
        trial.protocolSection.identificationModule.briefTitle?.toLowerCase() ||
        "";
      const officialTitle =
        trial.protocolSection.identificationModule.officialTitle?.toLowerCase() ||
        "";
      const conditions =
        trial.protocolSection.conditionsModule?.conditions
          ?.join(" ")
          .toLowerCase() || "";
      const briefSummary =
        trial.protocolSection.descriptionModule?.briefSummary?.toLowerCase() ||
        "";

      return (
        briefTitle.includes(searchText) ||
        officialTitle.includes(searchText) ||
        conditions.includes(searchText) ||
        briefSummary.includes(searchText)
      );
    });

    return filteredTrials.slice(startIndex, startIndex + limit);
  }

  getTrialById(id: string): ClinicalTrial | undefined {
    return this.trials.find(
      (trial) => trial.protocolSection.identificationModule.nctId === id,
    );
  }
}

const db = new Database();
export default db;
