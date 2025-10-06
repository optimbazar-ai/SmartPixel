import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContentSchema, insertPortfolioSchema } from "@shared/schema";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

let gemini: GoogleGenAI | null = null;

if (process.env.GEMINI_API_KEY) {
  gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Content routes
  app.get("/api/content", async (_req, res) => {
    try {
      const content = await storage.getAllContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.get("/api/content/:id", async (req, res) => {
    try {
      const content = await storage.getContent(req.params.id);
      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.post("/api/content", async (req, res) => {
    try {
      const validated = insertContentSchema.parse(req.body);
      const content = await storage.createContent(validated);
      res.json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create content" });
    }
  });

  app.patch("/api/content/:id", async (req, res) => {
    try {
      const content = await storage.updateContent(req.params.id, req.body);
      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to update content" });
    }
  });

  app.delete("/api/content/:id", async (req, res) => {
    try {
      const success = await storage.deleteContent(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Content not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete content" });
    }
  });

  app.post("/api/content/:id/publish", async (req, res) => {
    try {
      const content = await storage.publishContent(req.params.id);
      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }

      // Publish to Telegram if enabled
      if (content.publishToTelegram) {
        try {
          await publishToTelegram(content);
        } catch (error) {
          console.error("Failed to publish to Telegram:", error);
        }
      }

      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to publish content" });
    }
  });

  // AI Generation routes
  app.post("/api/ai/generate", async (req, res) => {
    try {
      if (!gemini) {
        return res.status(503).json({ 
          error: "AI generation is not available. Please configure GEMINI_API_KEY." 
        });
      }

      const { topic, category, language = 'uz', template = 'blog' } = req.body;

      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      const prompts = {
        blog: `Quyidagi mavzu bo'yicha professional blog maqolasi yozing (${language === 'uz' ? "O'zbek tilida" : "Ingliz tilida"}): ${topic}. 

Maqola quyidagi formatda bo'lishi kerak:
- Qiziqarli sarlavha
- Kirish qismi
- 3-4 ta asosiy bo'lim
- Xulosa
- Foydali maslahatlar

Maqola SEO-optimallashtirilgan, o'quvchilarga foydali va qiziqarli bo'lishi kerak.`,
        
        social: `Quyidagi mavzu bo'yicha ijtimoiy tarmoqlar uchun post yozing (${language === 'uz' ? "O'zbek tilida" : "Ingliz tilida"}): ${topic}

Post qisqa, qiziqarli va e'tiborni jalb qiluvchi bo'lishi kerak. Emoji ishlatishingiz mumkin.`,
        
        news: `Quyidagi mavzu bo'yicha yangilik maqolasi yozing (${language === 'uz' ? "O'zbek tilida" : "Ingliz tilida"}): ${topic}

Maqola:
- Aniq va ravshan
- Faktlarga asoslangan
- Professional uslubda
- 200-300 so'zdan iborat bo'lishi kerak`,
      };

      const systemPrompt = `Siz professional kontent yozuvchisiz. Yuqori sifatli, qiziqarli va foydali kontent yaratasiz.`;
      const userPrompt = prompts[template as keyof typeof prompts] || prompts.blog;

      const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash-exp",
        config: {
          systemInstruction: systemPrompt,
        },
        contents: userPrompt,
      });

      const generatedContent = response.text || "";
      
      // Extract title from the first line or first heading
      const lines = generatedContent.split('\n').filter(line => line.trim());
      const title = lines[0]?.replace(/^#+\s*/, '').trim() || topic;
      const body = generatedContent;

      res.json({ title, body, category });
    } catch (error) {
      console.error("AI Generation error:", error);
      res.status(500).json({ error: "Failed to generate content with AI" });
    }
  });

  // Settings routes
  app.get("/api/settings", async (_req, res) => {
    try {
      const settings = await storage.getAllSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.put("/api/settings/:key", async (req, res) => {
    try {
      const { value } = req.body;
      const setting = await storage.updateSetting(req.params.key, value);
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to update setting" });
    }
  });

  // Portfolio routes
  app.get("/api/portfolio", async (_req, res) => {
    try {
      const portfolio = await storage.getAllPortfolio();
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio" });
    }
  });

  app.get("/api/portfolio/published", async (_req, res) => {
    try {
      const portfolio = await storage.getPublishedPortfolio();
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch published portfolio" });
    }
  });

  app.get("/api/portfolio/:id", async (req, res) => {
    try {
      const portfolio = await storage.getPortfolio(req.params.id);
      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio" });
    }
  });

  app.post("/api/portfolio", async (req, res) => {
    try {
      const validated = insertPortfolioSchema.parse(req.body);
      const portfolio = await storage.createPortfolio(validated);
      res.json(portfolio);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create portfolio" });
    }
  });

  app.patch("/api/portfolio/:id", async (req, res) => {
    try {
      const portfolio = await storage.updatePortfolio(req.params.id, req.body);
      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ error: "Failed to update portfolio" });
    }
  });

  app.delete("/api/portfolio/:id", async (req, res) => {
    try {
      const success = await storage.deletePortfolio(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Portfolio not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete portfolio" });
    }
  });

  // Stats routes
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Scheduled content check (this would normally be called by a cron job)
  app.post("/api/scheduler/check", async (_req, res) => {
    try {
      const scheduledContent = await storage.getScheduledContent();
      
      for (const content of scheduledContent) {
        await storage.publishContent(content.id);
        
        if (content.publishToTelegram) {
          try {
            await publishToTelegram(content);
          } catch (error) {
            console.error(`Failed to publish content ${content.id} to Telegram:`, error);
          }
        }
      }

      res.json({ published: scheduledContent.length });
    } catch (error) {
      res.status(500).json({ error: "Failed to check scheduled content" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

async function publishToTelegram(content: any) {
  const botToken = await storage.getSetting('telegram_bot_token');
  const channelId = await storage.getSetting('telegram_channel_id');

  if (!botToken?.value || !channelId?.value) {
    throw new Error("Telegram settings not configured");
  }

  const message = `*${content.title}*\n\n${content.body}`;
  
  const response = await fetch(`https://api.telegram.org/bot${botToken.value}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: channelId.value,
      text: message,
      parse_mode: 'Markdown',
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
