import { type User, type InsertUser, type Content, type InsertContent, type Settings, type InsertSettings } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contentItems: Map<string, Content>;
  private settings: Map<string, Settings>;

  constructor() {
    this.users = new Map();
    this.contentItems = new Map();
    this.settings = new Map();
    
    this.initializeDefaultSettings();
  }

  private initializeDefaultSettings() {
    const defaultSettings = [
      { key: 'telegram_bot_token', value: '' },
      { key: 'telegram_channel_id', value: '' },
      { key: 'openai_model', value: 'gpt-4o-mini' },
      { key: 'default_category', value: 'Texnologiya' },
    ];

    defaultSettings.forEach(setting => {
      const id = randomUUID();
      this.settings.set(setting.key, {
        id,
        key: setting.key,
        value: setting.value,
        updatedAt: new Date(),
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllContent(): Promise<Content[]> {
    return Array.from(this.contentItems.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getContent(id: string): Promise<Content | undefined> {
    return this.contentItems.get(id);
  }

  async getContentByStatus(status: string): Promise<Content[]> {
    return Array.from(this.contentItems.values())
      .filter(content => content.status === status)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const id = randomUUID();
    const now = new Date();
    const content: Content = {
      id,
      title: insertContent.title,
      body: insertContent.body,
      category: insertContent.category ?? null,
      status: insertContent.status ?? 'draft',
      publishedAt: insertContent.status === 'published' ? now : null,
      scheduledFor: insertContent.scheduledFor ?? null,
      publishToWebsite: insertContent.publishToWebsite ?? true,
      publishToTelegram: insertContent.publishToTelegram ?? false,
      telegramMessageId: null,
      createdAt: now,
      updatedAt: now,
    };
    this.contentItems.set(id, content);
    return content;
  }

  async updateContent(id: string, updates: Partial<InsertContent>): Promise<Content | undefined> {
    const content = this.contentItems.get(id);
    if (!content) return undefined;

    const updatedContent: Content = {
      ...content,
      ...updates,
      updatedAt: new Date(),
    };

    this.contentItems.set(id, updatedContent);
    return updatedContent;
  }

  async deleteContent(id: string): Promise<boolean> {
    return this.contentItems.delete(id);
  }

  async getScheduledContent(): Promise<Content[]> {
    const now = new Date();
    return Array.from(this.contentItems.values())
      .filter(content => 
        content.status === 'scheduled' && 
        content.scheduledFor && 
        new Date(content.scheduledFor) <= now
      );
  }

  async publishContent(id: string): Promise<Content | undefined> {
    const content = this.contentItems.get(id);
    if (!content) return undefined;

    const publishedContent: Content = {
      ...content,
      status: 'published',
      publishedAt: new Date(),
      updatedAt: new Date(),
    };

    this.contentItems.set(id, publishedContent);
    return publishedContent;
  }

  async getSetting(key: string): Promise<Settings | undefined> {
    return this.settings.get(key);
  }

  async getAllSettings(): Promise<Settings[]> {
    return Array.from(this.settings.values());
  }

  async updateSetting(key: string, value: string): Promise<Settings> {
    const existing = this.settings.get(key);
    const setting: Settings = {
      id: existing?.id || randomUUID(),
      key,
      value,
      updatedAt: new Date(),
    };
    this.settings.set(key, setting);
    return setting;
  }

  async getStats(): Promise<{
    totalContent: number;
    publishedContent: number;
    scheduledContent: number;
    draftContent: number;
  }> {
    const all = Array.from(this.contentItems.values());
    return {
      totalContent: all.length,
      publishedContent: all.filter(c => c.status === 'published').length,
      scheduledContent: all.filter(c => c.status === 'scheduled').length,
      draftContent: all.filter(c => c.status === 'draft').length,
    };
  }
}

export const storage = new MemStorage();
