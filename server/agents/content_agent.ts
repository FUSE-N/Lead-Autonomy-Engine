import { getStructuredResult } from "../openai";
import { storage } from "../storage";

export const contentAgent = {
    name: "Content Agent",

    async run(missionId: string, strategyData: any, intentData: any) {
        const systemPrompt = `
      You are the Content Generation & Repurposing Agent.
      Generate platform-specific posts, captions, and hooks based on the campaign strategy.
      Tailor the tone and format to each persona and platform.
      
      Response must be JSON array of assets:
      [
        {
          "platform": string,
          "content_type": string,
          "text": string,
          "hashtags": string[],
          "cta": string
        }
      ]
    `;

        const prompt = `Intent: ${intentData.intent}\nStrategy: ${JSON.stringify(strategyData)}`;

        try {
            const result = await getStructuredResult<any[]>(prompt, systemPrompt);

            await storage.updateMissionMetadata(missionId, { content: result });
            await storage.createAgentLog({
                missionId,
                agentName: this.name,
                message: "Content generation complete. Platform-specific assets created.",
                type: "success",
                data: result
            });

            return result;
        } catch (error: any) {
            await storage.createAgentLog({
                missionId,
                agentName: this.name,
                message: `Content generation failed: ${error.message}`,
                type: "error"
            });
            throw error;
        }
    }
};
