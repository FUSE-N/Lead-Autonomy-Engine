import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { runMissionWorkflow } from "./agent_orchestrator";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  // Client routes
  app.get("/api/clients", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const clients = await storage.getClients();
    res.json(clients);
  });

  app.post("/api/clients", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const client = await storage.createClient(req.body);
    res.status(201).json(client);
  });

  // Interaction routes
  app.get("/api/interactions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const clientId = req.query.clientId as string | undefined;
    const interactions = await storage.getInteractions(clientId);
    res.json(interactions);
  });

  app.post("/api/interactions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const interaction = await storage.createInteraction({
      ...req.body,
      userId: req.user!.id,
    });
    res.status(201).json(interaction);
  });

  // Mission routes
  app.post("/api/missions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const mission = await storage.createMission({
      userId: req.user!.id,
      prompt: req.body.prompt,
      status: "pending",
    });

    // Trigger async workflow
    runMissionWorkflow(mission.id).catch(err => console.error("Workflow failed:", err));

    res.status(201).json(mission);
  });

  app.get("/api/missions/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const mission = await storage.getMission(req.params.id);
    if (!mission) return res.sendStatus(404);
    res.json(mission);
  });

  app.get("/api/missions/:id/logs", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const logs = await storage.getAgentLogs(req.params.id);
    res.json(logs);
  });

  return httpServer;
}
