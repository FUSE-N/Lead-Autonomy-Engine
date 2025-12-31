import { storage } from "./storage";
import { intentAgent } from "./agents/intent_agent";
import { researchAgent } from "./agents/research_agent";
import { strategyAgent } from "./agents/strategy_agent";
import { contentAgent } from "./agents/content_agent";
import { complianceAgent } from "./agents/compliance_agent";

export async function runMissionWorkflow(missionId: string) {
    const mission = await storage.getMission(missionId);
    if (!mission) return;

    try {
        await storage.updateMissionStatus(missionId, "running");

        // Step 1: Trigger (Already done via table insert)
        await storage.createAgentLog({
            missionId,
            agentName: "Orchestrator",
            message: "Mission loop started.",
            type: "info"
        });

        // Step 2: Intent Parsing & Control Agent
        const intentResult = await intentAgent.run(missionId, mission.prompt);

        if (intentResult.confidence_score < 0.7) {
            await storage.updateMissionStatus(missionId, "waiting_clarification");
            return;
        }

        // Step 3: Market & Trend Research
        const researchResult = await researchAgent.run(missionId, intentResult);

        // Step 4/5: Strategy & Persona Mapping
        const strategyResult = await strategyAgent.run(missionId, researchResult, intentResult);

        // Step 6/7: Content Generation
        const contentResult = await contentAgent.run(missionId, strategyResult, intentResult);

        // Step 8: Brand, Safety & Compliance
        const complianceResult = await complianceAgent.run(missionId, contentResult);

        if (!complianceResult.approved) {
            await storage.updateMissionStatus(missionId, "failed");
            return;
        }

        // Step 9: Publishing & Scheduling (Placeholder for now)
        await storage.createAgentLog({
            missionId,
            agentName: "Publishing Module",
            message: "Scheduling posts across Meta, X, and LinkedIn...",
            type: "info"
        });

        // Step 10/11: Engagement & Response (Placeholder - requires webhooks/polling)
        // Step 12/13: Analytics & Learning (Placeholder)

        await storage.updateMissionStatus(missionId, "completed");

    } catch (error: any) {
        console.error(`Mission ${missionId} failed:`, error);
        await storage.createAgentLog({
            missionId,
            agentName: "Orchestrator",
            message: `Workflow error: ${error.message}`,
            type: "error"
        });
        await storage.updateMissionStatus(missionId, "failed");
    }
}
