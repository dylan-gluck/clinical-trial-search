import db from "@/lib/db";
import { ClinicalTrial } from "@/types/clinical-trial";

export interface TrialsSearchParams {
  query?: string;
  page?: number;
  limit?: number;
}

export interface TrialsSearchResult {
  trials: ClinicalTrial[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TrialSummary {
  nctId: string;
  briefTitle: string;
  officialTitle: string;
  overallStatus: string;
  conditions: string[];
  studyType: string;
  phases?: string[];
  enrollmentCount?: number;
  startDate?: string;
  leadSponsor: string;
  locations: string[];
}

class TrialsService {
  /**
   * Search trials with pagination
   */
  searchTrials(params: TrialsSearchParams = {}): TrialsSearchResult {
    const { query = "", page = 1, limit = 20 } = params;
    
    // Validate parameters
    const validatedPage = Math.max(1, page);
    const validatedLimit = Math.min(Math.max(1, limit), 100); // Cap at 100

    // Get all matching trials for total count
    const allMatchingTrials = db.getTrials(query, 1, db.trials.length);
    const total = allMatchingTrials.length;
    
    // Get paginated results
    const trials = db.getTrials(query, validatedPage, validatedLimit);
    const totalPages = Math.ceil(total / validatedLimit);

    return {
      trials,
      total,
      page: validatedPage,
      limit: validatedLimit,
      totalPages,
    };
  }

  /**
   * Get trial by NCT ID
   */
  getTrialById(nctId: string): ClinicalTrial | null {
    if (!nctId || typeof nctId !== 'string') {
      return null;
    }
    
    return db.getTrialById(nctId) || null;
  }

  /**
   * Get trial summaries for display in lists
   */
  getTrialSummaries(params: TrialsSearchParams = {}): {
    summaries: TrialSummary[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } {
    const result = this.searchTrials(params);
    
    const summaries: TrialSummary[] = result.trials.map(trial => ({
      nctId: trial.protocolSection.identificationModule.nctId,
      briefTitle: trial.protocolSection.identificationModule.briefTitle,
      officialTitle: trial.protocolSection.identificationModule.officialTitle,
      overallStatus: trial.protocolSection.statusModule.overallStatus,
      conditions: trial.protocolSection.conditionsModule?.conditions || [],
      studyType: trial.protocolSection.designModule.studyType,
      phases: trial.protocolSection.designModule.phases,
      enrollmentCount: trial.protocolSection.designModule.enrollmentInfo?.count,
      startDate: trial.protocolSection.statusModule.startDateStruct?.date,
      leadSponsor: trial.protocolSection.sponsorCollaboratorsModule.leadSponsor.name,
      locations: this.extractLocationStrings(trial),
    }));

    return {
      summaries,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  /**
   * Get unique conditions for filtering
   */
  getUniqueConditions(): string[] {
    const conditionsSet = new Set<string>();
    
    db.trials.forEach(trial => {
      const conditions = trial.protocolSection.conditionsModule?.conditions || [];
      conditions.forEach(condition => conditionsSet.add(condition));
    });
    
    return Array.from(conditionsSet).sort();
  }

  /**
   * Get unique study phases for filtering
   */
  getUniquePhases(): string[] {
    const phasesSet = new Set<string>();
    
    db.trials.forEach(trial => {
      const phases = trial.protocolSection.designModule.phases || [];
      phases.forEach(phase => phasesSet.add(phase));
    });
    
    return Array.from(phasesSet).sort();
  }

  /**
   * Get unique study statuses for filtering
   */
  getUniqueStatuses(): string[] {
    const statusesSet = new Set<string>();
    
    db.trials.forEach(trial => {
      statusesSet.add(trial.protocolSection.statusModule.overallStatus);
    });
    
    return Array.from(statusesSet).sort();
  }

  /**
   * Extract location strings from trial data
   */
  private extractLocationStrings(trial: ClinicalTrial): string[] {
    const locations = trial.protocolSection.contactsLocationsModule?.locations || [];
    return locations.map(location => {
      const parts = [location.city, location.state, location.country].filter(Boolean);
      return parts.join(", ");
    });
  }
}

const trialsService = new TrialsService();
export default trialsService;