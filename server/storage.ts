import { type User, type InsertUser, type Content, type InsertContent, type Settings, type InsertSettings, type Portfolio, type InsertPortfolio, users, content, settings, portfolio } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPgSimple from "connect-pg-simple";
import { db, pool } from "./db";
import { eq, and, lte } from "drizzle-orm";

const PgSession = connectPgSimple(session);

export interface IStorage {
  sessionStore: session.Store;

  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Content methods
  getAllContent(): Promise<Content[]>;
  getContent(id: string): Promise<Content | undefined>;
  getContentByStatus(status: string): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: string, content: Partial<InsertContent>): Promise<Content | undefined>;
  deleteContent(id: string): Promise<boolean>;
  getScheduledContent(): Promise<Content[]>;
  publishContent(id: string): Promise<Content | undefined>;

  // Portfolio methods
  getAllPortfolio(): Promise<Portfolio[]>;
  getPortfolio(id: string): Promise<Portfolio | undefined>;
  getPublishedPortfolio(): Promise<Portfolio[]>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(id: string, portfolio: Partial<InsertPortfolio>): Promise<Portfolio | undefined>;
  deletePortfolio(id: string): Promise<boolean>;

  // Settings methods
  getSetting(key: string): Promise<Settings | undefined>;
  getAllSettings(): Promise<Settings[]>;
  updateSetting(key: string, value: string): Promise<Settings>;

  // Stats methods
  getStats(): Promise<{
    totalContent: number;
    publishedContent: number;
    scheduledContent: number;
    draftContent: number;
  }>;
}

export class DbStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PgSession({
      pool,
      createTableIfMissing: true,
    });
    
    this.initializeDefaultSettings();
  }

  private async initializeDefaultSettings() {
    const defaultSettings = [
      { key: 'telegram_bot_token', value: '' },
      { key: 'telegram_channel_id', value: '' },
      { key: 'openai_model', value: 'gpt-4o-mini' },
      { key: 'default_category', value: 'Texnologiya' },
    ];

    for (const setting of defaultSettings) {
      const existing = await this.getSetting(setting.key);
      if (!existing) {
        await db.insert(settings).values({
          key: setting.key,
          value: setting.value,
        });
      }
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllContent(): Promise<Content[]> {
    return await db.select().from(content).orderBy(content.createdAt);
  }

  async getContent(id: string): Promise<Content | undefined> {
    const result = await db.select().from(content).where(eq(content.id, id));
    return result[0];
  }

  async getContentByStatus(status: string): Promise<Content[]> {
    return await db.select().from(content).where(eq(content.status, status)).orderBy(content.createdAt);
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const result = await db.insert(content).values(insertContent).returning();
    return result[0];
  }

  async updateContent(id: string, updates: Partial<InsertContent>): Promise<Content | undefined> {
    const result = await db.update(content)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(content.id, id))
      .returning();
    return result[0];
  }

  async deleteContent(id: string): Promise<boolean> {
    const result = await db.delete(content).where(eq(content.id, id)).returning();
    return result.length > 0;
  }

  async getScheduledContent(): Promise<Content[]> {
    const now = new Date();
    return await db.select()
      .from(content)
      .where(
        and(
          eq(content.status, 'scheduled'),
          lte(content.scheduledFor, now)
        )
      );
  }

  async publishContent(id: string): Promise<Content | undefined> {
    const result = await db.update(content)
      .set({ 
        status: 'published',
        publishedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(content.id, id))
      .returning();
    return result[0];
  }

  async getAllPortfolio(): Promise<Portfolio[]> {
    return await db.select().from(portfolio).orderBy(portfolio.order, portfolio.createdAt);
  }

  async getPortfolio(id: string): Promise<Portfolio | undefined> {
    const result = await db.select().from(portfolio).where(eq(portfolio.id, id));
    return result[0];
  }

  async getPublishedPortfolio(): Promise<Portfolio[]> {
    return await db.select()
      .from(portfolio)
      .where(eq(portfolio.status, 'published'))
      .orderBy(portfolio.order, portfolio.createdAt);
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const result = await db.insert(portfolio).values(insertPortfolio).returning();
    return result[0];
  }

  async updatePortfolio(id: string, updates: Partial<InsertPortfolio>): Promise<Portfolio | undefined> {
    const result = await db.update(portfolio)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(portfolio.id, id))
      .returning();
    return result[0];
  }

  async deletePortfolio(id: string): Promise<boolean> {
    const result = await db.delete(portfolio).where(eq(portfolio.id, id)).returning();
    return result.length > 0;
  }

  async getSetting(key: string): Promise<Settings | undefined> {
    const result = await db.select().from(settings).where(eq(settings.key, key));
    return result[0];
  }

  async getAllSettings(): Promise<Settings[]> {
    return await db.select().from(settings);
  }

  async updateSetting(key: string, value: string): Promise<Settings> {
    const existing = await this.getSetting(key);
    
    if (existing) {
      const result = await db.update(settings)
        .set({ value, updatedAt: new Date() })
        .where(eq(settings.key, key))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(settings)
        .values({ key, value })
        .returning();
      return result[0];
    }
  }

  async getStats(): Promise<{
    totalContent: number;
    publishedContent: number;
    scheduledContent: number;
    draftContent: number;
  }> {
    const all = await db.select().from(content);
    return {
      totalContent: all.length,
      publishedContent: all.filter(c => c.status === 'published').length,
      scheduledContent: all.filter(c => c.status === 'scheduled').length,
      draftContent: all.filter(c => c.status === 'draft').length,
    };
  }
}

export const storage = new DbStorage();
