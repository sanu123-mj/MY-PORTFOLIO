import { users, type User, type InsertUser } from "@shared/schema";
import { PortfolioData } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  savePortfolio(portfolioData: PortfolioData): Promise<PortfolioData>;
  getPortfolio(id: number): Promise<PortfolioData | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolios: Map<number, PortfolioData>;
  currentUserId: number;
  currentPortfolioId: number;

  constructor() {
    this.users = new Map();
    this.portfolios = new Map();
    this.currentUserId = 1;
    this.currentPortfolioId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async savePortfolio(portfolioData: PortfolioData): Promise<PortfolioData> {
    const id = this.currentPortfolioId++;
    const portfolio = { ...portfolioData, id };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }

  async getPortfolio(id: number): Promise<PortfolioData | undefined> {
    return this.portfolios.get(id);
  }
}

export const storage = new MemStorage();
