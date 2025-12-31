import { getStructuredResult } from "../openai";
import { storage } from "../storage";

export const intentAgent = {
    name: "Intent Agent",

    async run(missionId: string, prompt: string) {
        const systemPrompt = `
      You are the Intent Parsing & Control Agent for an autonomous marketing platform.
      Extract intent, platforms, objectives, and posting frequency from the user prompt.
      Detect compliance constraints and calculate a confidence score (0-1).
      
      Response must be JSON:
      {
        "intent": string,
        "platforms": string[],
        "objectives": string[],
        "posting_frequency": string,
        "compliance_constraints": object,
        "confidence_score": number
      }
    `;

        try {
            const result = await getStructuredResult<any>(prompt, systemPrompt);

            await storage.updateMissionMetadata(missionId, { intent: result });
            await storage.createAgentLog({
                missionId,
                agentName: this.name,
                message: `Extracted intent: ${result.intent}. Confidence: ${result.confidence_score}`,
                type: result.confidence_score > 0.7 ? "success" : "warning",
                data: result
            });

            return result;
        } catch (error: any) {
            await storage.createAgentLog({
                missionId,
                agentName: this.name,
                message: `Failed to parse intent: ${error.message}`,
                type: "error"
            });
            throw error;
        }
    }
};
