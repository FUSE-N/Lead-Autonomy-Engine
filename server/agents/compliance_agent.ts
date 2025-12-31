import { getStructuredResult } from "../openai";
import { storage } from "../storage";

export const complianceAgent = {
    name: "Compliance Agent",

    async run(missionId: string, contentData: any) {
        const systemPrompt = `
      You are the Brand, Safety & Compliance Agent.
      Check the generated content for brand voice consistency, safety, and platform policy violations.
      
      Response must be JSON:
      {
        "approved": boolean,
        "feedback": string,
        "risks": string[]
      }
    `;

        const prompt = `Content: ${JSON.stringify(contentData)}`;

        try {
            const result = await getStructuredResult<any>(prompt, systemPrompt);

            await storage.updateMissionMetadata(missionId, { compliance: result });
            await storage.createAgentLog({
                missionId,
                agentName: this.name,
                message: result.approved ? "Compliance check passed." : "Compliance check failed. Revision required.",
                type: result.approved ? "success" : "warning",
                data: result
            });

            return result;
        } catch (error: any) {
            await storage.createAgentLog({
                missionId,
                agentName: this.name,
                message: `Compliance review failed: ${error.message}`,
                type: "error"
            });
            throw error;
        }
    }
};
