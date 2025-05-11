import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertPortfolioSchema, 
  insertSkillSchema, 
  insertProjectSchema, 
  insertExperienceSchema,
  insertEducationSchema,
  insertCertificationSchema
} from "@shared/schema";
import { log } from "./vite";
import { z } from "zod";

// Utility to validate data with Zod schema
const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedError = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      throw new Error(`Validation error: ${formattedError}`);
    }
    throw error;
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // User Routes
  app.post('/api/users', async (req: Request, res: Response) => {
    try {
      const userData = validateData(insertUserSchema, req.body);
      const user = await storage.createUser(userData);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      log(`Error creating user: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.get('/api/users/:id', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.json({ success: true, data: userWithoutPassword });
    } catch (error) {
      log(`Error fetching user: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  app.patch('/api/users/:id', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const userData = req.body;
      
      // Don't allow password updates through this endpoint
      if (userData.password) {
        delete userData.password;
      }
      
      const updatedUser = await storage.updateUser(userId, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      // Don't return password
      const { password, ...userWithoutPassword } = updatedUser;
      res.json({ success: true, data: userWithoutPassword });
    } catch (error) {
      log(`Error updating user: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  // Portfolio Routes
  app.get('/api/portfolios', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Valid userId query parameter is required' });
      }
      
      const portfolios = await storage.getPortfolios(userId);
      res.json({ success: true, data: portfolios });
    } catch (error) {
      log(`Error fetching portfolios: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  app.post('/api/portfolios', async (req: Request, res: Response) => {
    try {
      const portfolioData = validateData(insertPortfolioSchema, req.body);
      const portfolio = await storage.createPortfolio(portfolioData);
      res.status(201).json({ success: true, data: portfolio });
    } catch (error) {
      log(`Error creating portfolio: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.get('/api/portfolios/:id', async (req: Request, res: Response) => {
    try {
      const portfolioId = parseInt(req.params.id);
      const portfolio = await storage.getPortfolio(portfolioId);
      
      if (!portfolio) {
        return res.status(404).json({ success: false, message: 'Portfolio not found' });
      }
      
      res.json({ success: true, data: portfolio });
    } catch (error) {
      log(`Error fetching portfolio: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  app.patch('/api/portfolios/:id', async (req: Request, res: Response) => {
    try {
      const portfolioId = parseInt(req.params.id);
      const portfolioData = req.body;
      const updatedPortfolio = await storage.updatePortfolio(portfolioId, portfolioData);
      
      if (!updatedPortfolio) {
        return res.status(404).json({ success: false, message: 'Portfolio not found' });
      }
      
      res.json({ success: true, data: updatedPortfolio });
    } catch (error) {
      log(`Error updating portfolio: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.delete('/api/portfolios/:id', async (req: Request, res: Response) => {
    try {
      const portfolioId = parseInt(req.params.id);
      const deleted = await storage.deletePortfolio(portfolioId);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Portfolio not found or could not be deleted' });
      }
      
      res.json({ success: true, message: 'Portfolio deleted successfully' });
    } catch (error) {
      log(`Error deleting portfolio: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  // Legacy Portfolio API (for backward compatibility)
  app.post('/api/portfolio', async (req, res) => {
    try {
      const portfolioData = req.body;
      const savedPortfolio = await storage.savePortfolio(portfolioData);
      res.json({ success: true, data: savedPortfolio });
    } catch (error) {
      log(`Error saving legacy portfolio: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  app.get('/api/portfolio/:id', async (req, res) => {
    try {
      const portfolioId = parseInt(req.params.id);
      const portfolio = await storage.getPortfolio(portfolioId);
      
      if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
      
      res.json(portfolio);
    } catch (error) {
      log(`Error fetching legacy portfolio: ${error}`, 'api-error');
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Skills Routes
  app.get('/api/skills', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Valid userId query parameter is required' });
      }
      
      const skills = await storage.getSkills(userId);
      res.json({ success: true, data: skills });
    } catch (error) {
      log(`Error fetching skills: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  app.post('/api/skills', async (req: Request, res: Response) => {
    try {
      const skillData = validateData(insertSkillSchema, req.body);
      const skill = await storage.createSkill(skillData);
      res.status(201).json({ success: true, data: skill });
    } catch (error) {
      log(`Error creating skill: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.patch('/api/skills/:id', async (req: Request, res: Response) => {
    try {
      const skillId = parseInt(req.params.id);
      const skillData = req.body;
      const updatedSkill = await storage.updateSkill(skillId, skillData);
      
      if (!updatedSkill) {
        return res.status(404).json({ success: false, message: 'Skill not found' });
      }
      
      res.json({ success: true, data: updatedSkill });
    } catch (error) {
      log(`Error updating skill: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.delete('/api/skills/:id', async (req: Request, res: Response) => {
    try {
      const skillId = parseInt(req.params.id);
      const deleted = await storage.deleteSkill(skillId);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Skill not found or could not be deleted' });
      }
      
      res.json({ success: true, message: 'Skill deleted successfully' });
    } catch (error) {
      log(`Error deleting skill: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  // Projects Routes
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      const featured = req.query.featured === 'true';
      
      if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Valid userId query parameter is required' });
      }
      
      let projects;
      if (featured) {
        projects = await storage.getFeaturedProjects(userId);
      } else {
        projects = await storage.getProjects(userId);
      }
      
      res.json({ success: true, data: projects });
    } catch (error) {
      log(`Error fetching projects: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  app.post('/api/projects', async (req: Request, res: Response) => {
    try {
      const projectData = validateData(insertProjectSchema, req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json({ success: true, data: project });
    } catch (error) {
      log(`Error creating project: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.patch('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      const projectData = req.body;
      const updatedProject = await storage.updateProject(projectId, projectData);
      
      if (!updatedProject) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      
      res.json({ success: true, data: updatedProject });
    } catch (error) {
      log(`Error updating project: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.delete('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      const deleted = await storage.deleteProject(projectId);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Project not found or could not be deleted' });
      }
      
      res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
      log(`Error deleting project: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  // Experiences Routes
  app.get('/api/experiences', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Valid userId query parameter is required' });
      }
      
      const experiences = await storage.getExperiences(userId);
      res.json({ success: true, data: experiences });
    } catch (error) {
      log(`Error fetching experiences: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  app.post('/api/experiences', async (req: Request, res: Response) => {
    try {
      const experienceData = validateData(insertExperienceSchema, req.body);
      const experience = await storage.createExperience(experienceData);
      res.status(201).json({ success: true, data: experience });
    } catch (error) {
      log(`Error creating experience: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.patch('/api/experiences/:id', async (req: Request, res: Response) => {
    try {
      const experienceId = parseInt(req.params.id);
      const experienceData = req.body;
      const updatedExperience = await storage.updateExperience(experienceId, experienceData);
      
      if (!updatedExperience) {
        return res.status(404).json({ success: false, message: 'Experience not found' });
      }
      
      res.json({ success: true, data: updatedExperience });
    } catch (error) {
      log(`Error updating experience: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.delete('/api/experiences/:id', async (req: Request, res: Response) => {
    try {
      const experienceId = parseInt(req.params.id);
      const deleted = await storage.deleteExperience(experienceId);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Experience not found or could not be deleted' });
      }
      
      res.json({ success: true, message: 'Experience deleted successfully' });
    } catch (error) {
      log(`Error deleting experience: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  // Education Routes
  app.get('/api/educations', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Valid userId query parameter is required' });
      }
      
      const educations = await storage.getEducations(userId);
      res.json({ success: true, data: educations });
    } catch (error) {
      log(`Error fetching educations: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  app.post('/api/educations', async (req: Request, res: Response) => {
    try {
      const educationData = validateData(insertEducationSchema, req.body);
      const education = await storage.createEducation(educationData);
      res.status(201).json({ success: true, data: education });
    } catch (error) {
      log(`Error creating education: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.patch('/api/educations/:id', async (req: Request, res: Response) => {
    try {
      const educationId = parseInt(req.params.id);
      const educationData = req.body;
      const updatedEducation = await storage.updateEducation(educationId, educationData);
      
      if (!updatedEducation) {
        return res.status(404).json({ success: false, message: 'Education not found' });
      }
      
      res.json({ success: true, data: updatedEducation });
    } catch (error) {
      log(`Error updating education: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.delete('/api/educations/:id', async (req: Request, res: Response) => {
    try {
      const educationId = parseInt(req.params.id);
      const deleted = await storage.deleteEducation(educationId);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Education not found or could not be deleted' });
      }
      
      res.json({ success: true, message: 'Education deleted successfully' });
    } catch (error) {
      log(`Error deleting education: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  // Certification Routes
  app.get('/api/certifications', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Valid userId query parameter is required' });
      }
      
      const certifications = await storage.getCertifications(userId);
      res.json({ success: true, data: certifications });
    } catch (error) {
      log(`Error fetching certifications: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  app.post('/api/certifications', async (req: Request, res: Response) => {
    try {
      const certificationData = validateData(insertCertificationSchema, req.body);
      const certification = await storage.createCertification(certificationData);
      res.status(201).json({ success: true, data: certification });
    } catch (error) {
      log(`Error creating certification: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.patch('/api/certifications/:id', async (req: Request, res: Response) => {
    try {
      const certificationId = parseInt(req.params.id);
      const certificationData = req.body;
      const updatedCertification = await storage.updateCertification(certificationId, certificationData);
      
      if (!updatedCertification) {
        return res.status(404).json({ success: false, message: 'Certification not found' });
      }
      
      res.json({ success: true, data: updatedCertification });
    } catch (error) {
      log(`Error updating certification: ${error}`, 'api-error');
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  });

  app.delete('/api/certifications/:id', async (req: Request, res: Response) => {
    try {
      const certificationId = parseInt(req.params.id);
      const deleted = await storage.deleteCertification(certificationId);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Certification not found or could not be deleted' });
      }
      
      res.json({ success: true, message: 'Certification deleted successfully' });
    } catch (error) {
      log(`Error deleting certification: ${error}`, 'api-error');
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
