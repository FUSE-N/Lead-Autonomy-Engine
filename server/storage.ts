import { users, clients, interactions, missions, agentLogs, missionSteps, type User, type InsertUser, type Client, type InsertClient, type Interaction, type InsertInteraction, type Mission, type InsertMission, type AgentLog, type InsertAgentLog, type MissionStep, type InsertMissionStep } from "@shared/schema";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  sessionStore: session.Store;

  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Client methods
  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;

  // Interaction methods
  getInteractions(clientId?: string): Promise<Interaction[]>;
  createInteraction(interaction: InsertInteraction): Promise<Interaction>;

  // Mission methods
  createMission(mission: InsertMission): Promise<Mission>;
  getMission(id: string): Promise<Mission | undefined>;
  getMissionsByUser(userId: string): Promise<Mission[]>;
  updateMissionStatus(id: string, status: string): Promise<void>;
  updateMissionMetadata(id: string, metadata: any): Promise<void>;

  // Agent Log methods
  createAgentLog(log: InsertAgentLog): Promise<AgentLog>;
  getAgentLogs(missionId: string): Promise<AgentLog[]>;

  // Mission Step methods
  createMissionStep(step: InsertMissionStep): Promise<MissionStep>;
  getMissionSteps(missionId: string): Promise<MissionStep[]>;
  updateMissionStepStatus(id: string, status: string, description?: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // User implementations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Client implementations
  async getClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }

  async getClient(id: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client;
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db.insert(clients).values(insertClient).returning();
    return client;
  }

  // Interaction implementations
  async getInteractions(clientId?: string): Promise<Interaction[]> {
    if (clientId) {
      return await db.select().from(interactions).where(eq(interactions.clientId, clientId));
    }
    return await db.select().from(interactions);
  }

  async createInteraction(insertInteraction: InsertInteraction): Promise<Interaction> {
    const [interaction] = await db.insert(interactions).values(insertInteraction).returning();
    return interaction;
  }

  // Mission implementations
  async createMission(insertMission: InsertMission): Promise<Mission> {
    const [mission] = await db.insert(missions).values(insertMission).returning();
    return mission;
  }

  async getMission(id: string): Promise<Mission | undefined> {
    const [mission] = await db.select().from(missions).where(eq(missions.id, id));
    return mission;
  }

  async getMissionsByUser(userId: string): Promise<Mission[]> {
    return await db.select().from(missions).where(eq(missions.userId, userId));
  }

  async updateMissionStatus(id: string, status: string): Promise<void> {
    await db.update(missions).set({ status }).where(eq(missions.id, id));
  }

  async updateMissionMetadata(id: string, metadata: any): Promise<void> {
    const [mission] = await db.select().from(missions).where(eq(missions.id, id));
    const currentMetadata = mission?.metadata || {};
    await db.update(missions)
      .set({ metadata: { ...currentMetadata, ...metadata } })
      .where(eq(missions.id, id));
  }

  // Agent Log implementations
  async createAgentLog(insertLog: InsertAgentLog): Promise<AgentLog> {
    const [log] = await db.insert(agentLogs).values(insertLog).returning();
    return log;
  }

  async getAgentLogs(missionId: string): Promise<AgentLog[]> {
    return await db.select().from(agentLogs).where(eq(agentLogs.missionId, missionId));
  }

  // Mission Step implementations
  async createMissionStep(insertStep: InsertMissionStep): Promise<MissionStep> {
    const [step] = await db.insert(missionSteps).values(insertStep).returning();
    return step;
  }

  async getMissionSteps(missionId: string): Promise<MissionStep[]> {
    return await db.select().from(missionSteps).where(eq(missionSteps.missionId, missionId));
  }

  async updateMissionStepStatus(id: string, status: string, description?: string): Promise<void> {
    const update: any = { status };
    if (description) update.description = description;
    await db.update(missionSteps).set(update).where(eq(missionSteps.id, id));
  }
}

export const storage = new DatabaseStorage();
