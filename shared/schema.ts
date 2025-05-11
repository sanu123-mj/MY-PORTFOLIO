import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  data: jsonb("data").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// Portfolio data schema
export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Project {
  name: string;
  description: string;
  tech: string;
  github: string;
  demo: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface PortfolioData {
  id?: number;
  personal: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  education: string;
  certifications: string[];
  experience: Experience[];
  contact: ContactInfo;
}

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
