import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull().default("lead"), // e.g., lead, prospect, customer
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const interactions = pgTable("interactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  clientId: varchar("client_id").references(() => clients.id).notNull(),
  notes: text("notes").notNull(),
  type: text("type").notNull(), // e.g., email, call, meeting
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const missions = pgTable("missions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  prompt: text("prompt").notNull(),
  status: text("status").notNull().default("pending"), // pending, running, completed, failed
  metadata: jsonb("metadata").$type<any>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const agentLogs = pgTable("agent_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  missionId: varchar("mission_id").references(() => missions.id).notNull(),
  agentName: text("agent_name").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull().default("info"), // info, warning, error, success
  data: jsonb("data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const missionSteps = pgTable("mission_steps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  missionId: varchar("mission_id").references(() => missions.id).notNull(),
  label: text("label").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

export const insertInteractionSchema = createInsertSchema(interactions).omit({
  id: true,
  timestamp: true,
});

export const insertMissionSchema = createInsertSchema(missions).omit({
  id: true,
  createdAt: true,
});

export const insertAgentLogSchema = createInsertSchema(agentLogs).omit({
  id: true,
  createdAt: true,
});

export const insertMissionStepSchema = createInsertSchema(missionSteps).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

export type InsertInteraction = z.infer<typeof insertInteractionSchema>;
export type Interaction = typeof interactions.$inferSelect;

export type InsertMission = z.infer<typeof insertMissionSchema>;
export type Mission = typeof missions.$inferSelect;

export type InsertAgentLog = z.infer<typeof insertAgentLogSchema>;
export type AgentLog = typeof agentLogs.$inferSelect;

export type InsertMissionStep = z.infer<typeof insertMissionStepSchema>;
export type MissionStep = typeof missionSteps.$inferSelect;
