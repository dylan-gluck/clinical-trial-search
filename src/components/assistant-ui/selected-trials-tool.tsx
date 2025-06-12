"use client";

import { makeAssistantTool, tool } from "@assistant-ui/react";
import { z } from "zod";
import { useAppStore } from "@/state/app-store";

export const SelectedTrialsTool = () => {
  // Define tool
  const newTool = tool({
    description:
      "Read the currently selected clinical trials from the app state",
    parameters: z.object({}),
    execute: async () => {
      const selected = useAppStore.getState().selected;
      return {
        selectedTrials: selected.map((trial) => ({
          nctId: trial.protocolSection.identificationModule.nctId,
          briefTitle: trial.protocolSection.identificationModule.briefTitle,
          officialTitle:
            trial.protocolSection.identificationModule.officialTitle,
          overallStatus: trial.protocolSection.statusModule?.overallStatus,
          conditions: trial.protocolSection.conditionsModule?.conditions || [],
          studyType: trial.protocolSection.designModule?.studyType,
          phases: trial.protocolSection.designModule?.phases,
          enrollmentCount:
            trial.protocolSection.designModule?.enrollmentInfo?.count,
          startDate: trial.protocolSection.statusModule?.startDateStruct?.date,
          leadSponsor:
            trial.protocolSection.sponsorCollaboratorsModule?.leadSponsor?.name,
        })),
        count: selected.length,
      };
    },
  });

  // Create a tool component
  const NewTool = makeAssistantTool({
    toolName: "selected_trials",
    ...newTool,
  });

  return <NewTool />;
};
