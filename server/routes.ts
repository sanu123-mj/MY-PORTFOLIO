import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Portfolio API routes
  app.post('/api/portfolio', async (req, res) => {
    try {
      const portfolioData = req.body;
      const savedPortfolio = await storage.savePortfolio(portfolioData);
      res.json({ success: true, data: savedPortfolio });
    } catch (error) {
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
      res.status(500).json({ message: (error as Error).message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
