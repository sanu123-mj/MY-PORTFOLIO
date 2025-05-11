import { 
  users, type User, type InsertUser,
  portfolios, projects, skills, experiences, educations, certifications,
  type Portfolio, type InsertPortfolio,
  type LegacyPortfolioData,
  type InsertSkillData, type InsertProjectData, type InsertExperienceData,
  type InsertEducation, type InsertCertification,
  type SkillData, type ProjectData, type ExperienceData, 
  type Education, type Certification
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import { log } from "./vite";

// Storage interface with all needed CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  
  // Portfolio operations
  getPortfolios(userId: number): Promise<Portfolio[]>;
  getPortfolio(id: number): Promise<Portfolio | undefined>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(id: number, portfolioData: Partial<InsertPortfolio>): Promise<Portfolio | undefined>;
  deletePortfolio(id: number): Promise<boolean>;
  
  // Legacy portfolio support
  savePortfolio(portfolioData: LegacyPortfolioData): Promise<LegacyPortfolioData>;
  
  // Skills operations
  getSkills(userId: number): Promise<SkillData[]>;
  createSkill(skill: InsertSkillData): Promise<SkillData>;
  updateSkill(id: number, skillData: Partial<InsertSkillData>): Promise<SkillData | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Projects operations
  getProjects(userId: number): Promise<ProjectData[]>;
  getFeaturedProjects(userId: number): Promise<ProjectData[]>;
  createProject(project: InsertProjectData): Promise<ProjectData>;
  updateProject(id: number, projectData: Partial<InsertProjectData>): Promise<ProjectData | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Experiences operations
  getExperiences(userId: number): Promise<ExperienceData[]>;
  createExperience(experience: InsertExperienceData): Promise<ExperienceData>;
  updateExperience(id: number, experienceData: Partial<InsertExperienceData>): Promise<ExperienceData | undefined>;
  deleteExperience(id: number): Promise<boolean>;
  
  // Education operations
  getEducations(userId: number): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;
  updateEducation(id: number, educationData: Partial<InsertEducation>): Promise<Education | undefined>;
  deleteEducation(id: number): Promise<boolean>;
  
  // Certification operations
  getCertifications(userId: number): Promise<Certification[]>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  updateCertification(id: number, certificationData: Partial<InsertCertification>): Promise<Certification | undefined>;
  deleteCertification(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      log(`Error getting user: ${error}`, 'db-error');
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      log(`Error getting user by username: ${error}`, 'db-error');
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      log(`Error creating user: ${error}`, 'db-error');
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set(userData)
        .where(eq(users.id, id))
        .returning();
      return updatedUser;
    } catch (error) {
      log(`Error updating user: ${error}`, 'db-error');
      return undefined;
    }
  }

  // Portfolio operations
  async getPortfolios(userId: number): Promise<Portfolio[]> {
    try {
      return await db
        .select()
        .from(portfolios)
        .where(eq(portfolios.userId, userId))
        .orderBy(desc(portfolios.updatedAt));
    } catch (error) {
      log(`Error getting portfolios: ${error}`, 'db-error');
      return [];
    }
  }

  async getPortfolio(id: number): Promise<Portfolio | undefined> {
    try {
      const [portfolio] = await db
        .select()
        .from(portfolios)
        .where(eq(portfolios.id, id));
      return portfolio;
    } catch (error) {
      log(`Error getting portfolio: ${error}`, 'db-error');
      return undefined;
    }
  }

  async createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio> {
    try {
      const [newPortfolio] = await db
        .insert(portfolios)
        .values(portfolio)
        .returning();
      return newPortfolio;
    } catch (error) {
      log(`Error creating portfolio: ${error}`, 'db-error');
      throw new Error(`Failed to create portfolio: ${error}`);
    }
  }

  async updatePortfolio(id: number, portfolioData: Partial<InsertPortfolio>): Promise<Portfolio | undefined> {
    try {
      const [updatedPortfolio] = await db
        .update(portfolios)
        .set(portfolioData)
        .where(eq(portfolios.id, id))
        .returning();
      return updatedPortfolio;
    } catch (error) {
      log(`Error updating portfolio: ${error}`, 'db-error');
      return undefined;
    }
  }

  async deletePortfolio(id: number): Promise<boolean> {
    try {
      const [deletedPortfolio] = await db
        .delete(portfolios)
        .where(eq(portfolios.id, id))
        .returning();
      return !!deletedPortfolio;
    } catch (error) {
      log(`Error deleting portfolio: ${error}`, 'db-error');
      return false;
    }
  }

  // Legacy portfolio support - converts to the new format
  async savePortfolio(portfolioData: LegacyPortfolioData): Promise<LegacyPortfolioData> {
    try {
      // For backward compatibility - we're just returning the data for now
      // In a real implementation, we would convert and save to our new format
      return portfolioData;
    } catch (error) {
      log(`Error saving legacy portfolio: ${error}`, 'db-error');
      throw new Error(`Failed to save legacy portfolio: ${error}`);
    }
  }

  // Skills operations
  async getSkills(userId: number): Promise<SkillData[]> {
    try {
      return await db
        .select()
        .from(skills)
        .where(eq(skills.userId, userId));
    } catch (error) {
      log(`Error getting skills: ${error}`, 'db-error');
      return [];
    }
  }

  async createSkill(skill: InsertSkillData): Promise<SkillData> {
    try {
      const [newSkill] = await db
        .insert(skills)
        .values(skill)
        .returning();
      return newSkill;
    } catch (error) {
      log(`Error creating skill: ${error}`, 'db-error');
      throw new Error(`Failed to create skill: ${error}`);
    }
  }

  async updateSkill(id: number, skillData: Partial<InsertSkillData>): Promise<SkillData | undefined> {
    try {
      const [updatedSkill] = await db
        .update(skills)
        .set(skillData)
        .where(eq(skills.id, id))
        .returning();
      return updatedSkill;
    } catch (error) {
      log(`Error updating skill: ${error}`, 'db-error');
      return undefined;
    }
  }

  async deleteSkill(id: number): Promise<boolean> {
    try {
      const [deletedSkill] = await db
        .delete(skills)
        .where(eq(skills.id, id))
        .returning();
      return !!deletedSkill;
    } catch (error) {
      log(`Error deleting skill: ${error}`, 'db-error');
      return false;
    }
  }

  // Projects operations
  async getProjects(userId: number): Promise<ProjectData[]> {
    try {
      return await db
        .select()
        .from(projects)
        .where(eq(projects.userId, userId));
    } catch (error) {
      log(`Error getting projects: ${error}`, 'db-error');
      return [];
    }
  }

  async getFeaturedProjects(userId: number): Promise<ProjectData[]> {
    try {
      return await db
        .select()
        .from(projects)
        .where(and(
          eq(projects.userId, userId),
          eq(projects.isFeatured, true)
        ));
    } catch (error) {
      log(`Error getting featured projects: ${error}`, 'db-error');
      return [];
    }
  }

  async createProject(project: InsertProjectData): Promise<ProjectData> {
    try {
      const [newProject] = await db
        .insert(projects)
        .values(project)
        .returning();
      return newProject;
    } catch (error) {
      log(`Error creating project: ${error}`, 'db-error');
      throw new Error(`Failed to create project: ${error}`);
    }
  }

  async updateProject(id: number, projectData: Partial<InsertProjectData>): Promise<ProjectData | undefined> {
    try {
      const [updatedProject] = await db
        .update(projects)
        .set(projectData)
        .where(eq(projects.id, id))
        .returning();
      return updatedProject;
    } catch (error) {
      log(`Error updating project: ${error}`, 'db-error');
      return undefined;
    }
  }

  async deleteProject(id: number): Promise<boolean> {
    try {
      const [deletedProject] = await db
        .delete(projects)
        .where(eq(projects.id, id))
        .returning();
      return !!deletedProject;
    } catch (error) {
      log(`Error deleting project: ${error}`, 'db-error');
      return false;
    }
  }

  // Experiences operations
  async getExperiences(userId: number): Promise<ExperienceData[]> {
    try {
      return await db
        .select()
        .from(experiences)
        .where(eq(experiences.userId, userId));
    } catch (error) {
      log(`Error getting experiences: ${error}`, 'db-error');
      return [];
    }
  }

  async createExperience(experience: InsertExperienceData): Promise<ExperienceData> {
    try {
      const [newExperience] = await db
        .insert(experiences)
        .values(experience)
        .returning();
      return newExperience;
    } catch (error) {
      log(`Error creating experience: ${error}`, 'db-error');
      throw new Error(`Failed to create experience: ${error}`);
    }
  }

  async updateExperience(id: number, experienceData: Partial<InsertExperienceData>): Promise<ExperienceData | undefined> {
    try {
      const [updatedExperience] = await db
        .update(experiences)
        .set(experienceData)
        .where(eq(experiences.id, id))
        .returning();
      return updatedExperience;
    } catch (error) {
      log(`Error updating experience: ${error}`, 'db-error');
      return undefined;
    }
  }

  async deleteExperience(id: number): Promise<boolean> {
    try {
      const [deletedExperience] = await db
        .delete(experiences)
        .where(eq(experiences.id, id))
        .returning();
      return !!deletedExperience;
    } catch (error) {
      log(`Error deleting experience: ${error}`, 'db-error');
      return false;
    }
  }

  // Education operations
  async getEducations(userId: number): Promise<Education[]> {
    try {
      return await db
        .select()
        .from(educations)
        .where(eq(educations.userId, userId));
    } catch (error) {
      log(`Error getting educations: ${error}`, 'db-error');
      return [];
    }
  }

  async createEducation(education: InsertEducation): Promise<Education> {
    try {
      const [newEducation] = await db
        .insert(educations)
        .values(education)
        .returning();
      return newEducation;
    } catch (error) {
      log(`Error creating education: ${error}`, 'db-error');
      throw new Error(`Failed to create education: ${error}`);
    }
  }

  async updateEducation(id: number, educationData: Partial<InsertEducation>): Promise<Education | undefined> {
    try {
      const [updatedEducation] = await db
        .update(educations)
        .set(educationData)
        .where(eq(educations.id, id))
        .returning();
      return updatedEducation;
    } catch (error) {
      log(`Error updating education: ${error}`, 'db-error');
      return undefined;
    }
  }

  async deleteEducation(id: number): Promise<boolean> {
    try {
      const [deletedEducation] = await db
        .delete(educations)
        .where(eq(educations.id, id))
        .returning();
      return !!deletedEducation;
    } catch (error) {
      log(`Error deleting education: ${error}`, 'db-error');
      return false;
    }
  }

  // Certification operations
  async getCertifications(userId: number): Promise<Certification[]> {
    try {
      return await db
        .select()
        .from(certifications)
        .where(eq(certifications.userId, userId));
    } catch (error) {
      log(`Error getting certifications: ${error}`, 'db-error');
      return [];
    }
  }

  async createCertification(certification: InsertCertification): Promise<Certification> {
    try {
      const [newCertification] = await db
        .insert(certifications)
        .values(certification)
        .returning();
      return newCertification;
    } catch (error) {
      log(`Error creating certification: ${error}`, 'db-error');
      throw new Error(`Failed to create certification: ${error}`);
    }
  }

  async updateCertification(id: number, certificationData: Partial<InsertCertification>): Promise<Certification | undefined> {
    try {
      const [updatedCertification] = await db
        .update(certifications)
        .set(certificationData)
        .where(eq(certifications.id, id))
        .returning();
      return updatedCertification;
    } catch (error) {
      log(`Error updating certification: ${error}`, 'db-error');
      return undefined;
    }
  }

  async deleteCertification(id: number): Promise<boolean> {
    try {
      const [deletedCertification] = await db
        .delete(certifications)
        .where(eq(certifications.id, id))
        .returning();
      return !!deletedCertification;
    } catch (error) {
      log(`Error deleting certification: ${error}`, 'db-error');
      return false;
    }
  }
}

// Use the DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
