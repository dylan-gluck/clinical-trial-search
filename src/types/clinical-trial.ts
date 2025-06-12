export interface ClinicalTrial {
  protocolSection: ProtocolSection;
  derivedSection?: DerivedSection;
  hasResults?: boolean;
}

export interface ProtocolSection {
  identificationModule: IdentificationModule;
  statusModule?: StatusModule;
  sponsorCollaboratorsModule?: SponsorCollaboratorsModule;
  oversightModule?: OversightModule;
  descriptionModule?: DescriptionModule;
  conditionsModule?: ConditionsModule;
  designModule?: DesignModule;
  armsInterventionsModule?: ArmsInterventionsModule;
  outcomesModule?: OutcomesModule;
  eligibilityModule?: EligibilityModule;
  contactsLocationsModule?: ContactsLocationsModule;
}

export interface IdentificationModule {
  nctId: string;
  orgStudyIdInfo?: OrgStudyIdInfo;
  organization?: Organization;
  briefTitle?: string;
  officialTitle?: string;
}

export interface OrgStudyIdInfo {
  id?: string;
}

export interface Organization {
  fullName?: string;
  class?: string;
}

export interface StatusModule {
  statusVerifiedDate?: string;
  overallStatus?: string;
  expandedAccessInfo?: ExpandedAccessInfo;
  startDateStruct?: StartDateStruct;
  primaryCompletionDateStruct?: PrimaryCompletionDateStruct;
  completionDateStruct?: CompletionDateStruct;
  studyFirstSubmitDate?: string;
  studyFirstSubmitQcDate?: string;
  studyFirstPostDateStruct?: StudyFirstPostDateStruct;
  lastUpdateSubmitDate?: string;
  lastUpdatePostDateStruct?: LastUpdatePostDateStruct;
}

export interface ExpandedAccessInfo {
  hasExpandedAccess?: boolean;
}

export interface StartDateStruct {
  date?: string;
  type?: string;
}

export interface PrimaryCompletionDateStruct {
  date?: string;
  type?: string;
}

export interface CompletionDateStruct {
  date?: string;
  type?: string;
}

export interface StudyFirstPostDateStruct {
  date?: string;
  type?: string;
}

export interface LastUpdatePostDateStruct {
  date?: string;
  type?: string;
}

export interface SponsorCollaboratorsModule {
  responsibleParty?: ResponsibleParty;
  leadSponsor?: LeadSponsor;
}

export interface ResponsibleParty {
  type?: string;
}

export interface LeadSponsor {
  name?: string;
  class?: string;
}

export interface OversightModule {
  isFdaRegulatedDrug?: boolean;
  isFdaRegulatedDevice?: boolean;
}

export interface DescriptionModule {
  briefSummary?: string;
  detailedDescription?: string;
}

export interface ConditionsModule {
  conditions?: string[];
}

export interface DesignModule {
  studyType?: string;
  phases?: string[];
  designInfo?: DesignInfo;
  enrollmentInfo?: EnrollmentInfo;
}

export interface DesignInfo {
  allocation?: string;
  interventionModel?: string;
  primaryPurpose?: string;
  maskingInfo?: MaskingInfo;
}

export interface MaskingInfo {
  masking?: string;
  whoMasked?: string[];
}

export interface EnrollmentInfo {
  count?: number;
  type?: string;
}

export interface ArmsInterventionsModule {
  armGroups?: ArmGroup[];
  interventions?: Intervention[];
}

export interface ArmGroup {
  label?: string;
  type?: string;
  description?: string;
  interventionNames?: string[];
}

export interface Intervention {
  type?: string;
  name?: string;
  description?: string;
  armGroupLabels?: string[];
}

export interface OutcomesModule {
  primaryOutcomes?: PrimaryOutcome[];
}

export interface PrimaryOutcome {
  measure?: string;
  description?: string;
  timeFrame?: string;
}

export interface EligibilityModule {
  eligibilityCriteria?: string;
  healthyVolunteers?: boolean;
  sex?: string;
  minimumAge?: string;
  maximumAge?: string;
  stdAges?: string[];
}

export interface ContactsLocationsModule {
  centralContacts?: CentralContact[];
  overallOfficials?: OverallOfficial[];
  locations?: Location[];
}

export interface CentralContact {
  name?: string;
  role?: string;
  phone?: string;
  email?: string;
}

export interface OverallOfficial {
  name?: string;
  affiliation?: string;
  role?: string;
}

export interface Location {
  facility?: string;
  city?: string;
  state?: string;
  country?: string;
  contacts?: Contact[];
  geoPoint?: GeoPoint;
}

export interface Contact {
  name?: string;
  role?: string;
}

export interface GeoPoint {
  lat?: number;
  lon?: number;
}

export interface DerivedSection {
  miscInfoModule?: MiscInfoModule;
  conditionBrowseModule?: ConditionBrowseModule;
}

export interface MiscInfoModule {
  versionHolder?: string;
}

export interface ConditionBrowseModule {
  meshes?: Mesh[];
  ancestors?: Ancestor[];
  browseLeaves?: BrowseLefe[];
  browseBranches?: BrowseBranch[];
}

export interface Mesh {
  id?: string;
  term?: string;
}

export interface Ancestor {
  id?: string;
  term?: string;
}

export interface BrowseLefe {
  id?: string;
  name?: string;
  asFound?: string;
  relevance?: string;
}

export interface BrowseBranch {
  abbrev?: string;
  name?: string;
}