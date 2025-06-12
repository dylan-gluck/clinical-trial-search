import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";
import { z } from "zod";
import trialsService from "@/services/trials-service";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    toolCallStreaming: true,
    system,
    tools: {
      ...frontendTools(tools),
      searchTrials: {
        description: "Search clinical trials with optional query, pagination parameters",
        parameters: z.object({
          query: z.string().optional().describe("Search query to filter trials by title, condition, or description"),
          page: z.number().optional().default(1).describe("Page number for pagination (starts at 1)"),
          limit: z.number().optional().default(20).describe("Number of trials per page (max 100)")
        }),
        execute: async ({ query, page, limit }) => {
          const result = trialsService.searchTrials({ query, page, limit });
          return {
            trials: result.trials,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages
          };
        }
      },
      getTrialById: {
        description: "Get detailed information about a specific clinical trial by NCT ID",
        parameters: z.object({
          nctId: z.string().describe("The NCT ID of the clinical trial (e.g., NCT12345678)")
        }),
        execute: async ({ nctId }) => {
          const trial = trialsService.getTrialById(nctId);
          if (!trial) {
            throw new Error(`Trial with NCT ID ${nctId} not found`);
          }
          return trial;
        }
      }
    },
  });

  return result.toDataStreamResponse();
}
