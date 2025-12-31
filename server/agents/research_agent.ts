import { getStructuredResult } from "../openai";
import { storage } from "../storage";

export const researchAgent = {
    name: "Research Agent",

    async run(missionId: string, intentData: any) {
        const systemPrompt = `
      You are the Market & Trend Research Agent.
      Based on the provided intent and platforms, generate a trend and market research report.
      Include trending hashtags, viral formats, and competitor keywords.
      
      Response must be JSON:
      {
        "trending_hashtags": string[],
        "viral_formats": string[],
        "competitor_keywords": string[],
        "date": string
      }
    `;

        const prompt = `Intent: ${intentData.intent}\nPlatforms: ${intentData.platforms.join(", ")}`;

        try {
            const result = await getStructuredResult<any>(prompt, systemPrompt);

            await storage.updateMissionMetadata(missionId, { research: result });
            await storage.createAgentLog({
                missionId,
                agentName: this.name,
                message: "Market research complete. Identified key trends and formats.",
                type: "success",
                data: result
            });

            return result;
        } catch (error: any) {
            await storage.createAgentLog({
                missionId,
                agentName: this.name,
                message: `Research failed: ${error.message}`,
                type: "error"
            });
            throw error;
        }
    }
};
