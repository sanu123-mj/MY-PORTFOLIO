import { pgTable, text, serial, integer, varchar, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name"),
  bio: text("bio"),
  location: text("location"),
  phone: text("phone"),
  github: text("github"),
  linkedin: text("linkedin"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Portfolio model
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  isPublic: boolean("is_public").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Portfolio sections for customizing layout
export const portfolioSections = pgTable("portfolio_sections", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").references(() => portfolios.id).notNull(),
  sectionType: text("section_type").notNull(), // 'skills', 'projects', 'experience', etc.
  title: text("title").notNull(),
  orderIndex: integer("order_index").notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
  settings: jsonb("settings"), // For custom section settings
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Skill model
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  level: integer("level").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Project model
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  technologies: jsonb("technologies").notNull(), // Array of tech stack
  githubUrl: text("github_url"),
  demoUrl: text("demo_url"),
  image: text("image"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Experience model
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isCurrent: boolean("is_current").default(false).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Education model
export const educations = pgTable("educations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  fieldOfStudy: text("field_of_study"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isCurrent: boolean("is_current").default(false).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Certification model
export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  issueDate: text("issue_date"),
  category: text("category"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Legacy portfolio data schema - these interfaces are used for backward compatibility
export interface LegacyPersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
}

export interface LegacySkillData {
  name: string;
  level: number;
}

export interface LegacyProjectData {
  name: string;
  description: string;
  tech: string;
  github: string;
  demo: string;
}

export interface LegacyExperienceData {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface LegacyContactInfo {
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface LegacyPortfolioData {
  id?: number;
  personal: LegacyPersonalInfo;
  skills: LegacySkillData[];
  projects: LegacyProjectData[];
  education: string;
  certifications: string[];
  experience: LegacyExperienceData[];
  contact: LegacyContactInfo;
}

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  portfolios: many(portfolios),
  skills: many(skills),
  projects: many(projects),
  experiences: many(experiences),
  educations: many(educations),
  certifications: many(certifications),
}));

export const portfoliosRelations = relations(portfolios, ({ one, many }) => ({
  user: one(users, {
    fields: [portfolios.userId],
    references: [users.id],
  }),
  portfolioSections: many(portfolioSections),
}));

export const portfolioSectionsRelations = relations(portfolioSections, ({ one }) => ({
  portfolio: one(portfolios, {
    fields: [portfolioSections.portfolioId],
    references: [portfolios.id],
  }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  user: one(users, {
    fields: [skills.userId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export const experiencesRelations = relations(experiences, ({ one }) => ({
  user: one(users, {
    fields: [experiences.userId],
    references: [users.id],
  }),
}));

export const educationsRelations = relations(educations, ({ one }) => ({
  user: one(users, {
    fields: [educations.userId],
    references: [users.id],
  }),
}));

export const certificationsRelations = relations(certifications, ({ one }) => ({
  user: one(users, {
    fields: [certifications.userId],
    references: [users.id],
  }),
}));

// Insert schemas for database models
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertPortfolioSchema = createInsertSchema(portfolios).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertPortfolioSectionSchema = createInsertSchema(portfolioSections).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertEducationSchema = createInsertSchema(educations).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertCertificationSchema = createInsertSchema(certifications).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Type inferences
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolios.$inferSelect;

export type InsertPortfolioSection = z.infer<typeof insertPortfolioSectionSchema>;
export type PortfolioSection = typeof portfolioSections.$inferSelect;

export type InsertSkillData = z.infer<typeof insertSkillSchema>;
export type SkillData = typeof skills.$inferSelect;

export type InsertProjectData = z.infer<typeof insertProjectSchema>;
export type ProjectData = typeof projects.$inferSelect;

export type InsertExperienceData = z.infer<typeof insertExperienceSchema>;
export type ExperienceData = typeof experiences.$inferSelect;

export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type Education = typeof educations.$inferSelect;

export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type Certification = typeof certifications.$inferSelect;