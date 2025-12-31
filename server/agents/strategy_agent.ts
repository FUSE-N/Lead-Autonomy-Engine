import { getStructuredResult } from "../openai";
import { storage } from "../storage";

export const strategyAgent = {
    name: "Strategy Agent",

    async run(missionId: string, researchData: any, intentData: any) {
        const systemPrompt = `
      You are the Social Campaign Strategy Agent.
      Based on the intent and research, define targeting (personas) and a content calendar.
      Include posting times and engagement KPIs.
      
      Response must be JSON:
      {
        "personas": string[],
        "content_calendar": Array<{date: string, platform: string, content_type: string}>,
        "posting_times": object,
        "kpis": object
      }
    `;

        const prompt = `Intent: ${intentData.intent}\nResearch: ${JSON.stringify(researchData)}`;

        try {
            const result = await getStructuredResult<any>(prompt, systemPrompt);

            await storage.updateMissionMetadata(missionId, { strategy: result });
            await storage.createAgentLog({
                missionId,
                agentName: this.name,
                message: "Campaign strategy formulated. Targeting and schedule defined.",
                type: "success",
                data: result
            });

            return result;
        } catch (error: any) {
            await storage.createAgentLog({
                missionId,
                agentName: this.name,
                message: `Strategy failed: ${error.message}`,
                type: "error"
            });
            throw error;
        }
    }
};
