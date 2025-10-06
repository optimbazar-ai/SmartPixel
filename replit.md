# SmartPixel.uz - AI-Powered Content Automation Platform

## Overview

SmartPixel.uz is a SaaS platform for automated content generation and multi-channel distribution. The platform enables users to create AI-powered content, schedule publications, and automatically distribute to both their website and Telegram channels. It features a bilingual (Uzbek/English) interface with a modern marketing site and a comprehensive admin dashboard for content management.

The application is designed as a full-stack TypeScript solution with a React frontend, Express backend, and PostgreSQL database, emphasizing automation-first workflows and seamless multi-channel publishing.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### October 2025
- **PWA Support Added**: Progressive Web App manifest, service worker, and install prompt implemented
- **Render Deployment**: Configured for deployment to Render.com with render.yaml
- **Security**: Admin credentials secured, deployment guide updated

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe UI development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- Shadcn UI component library built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens

**Design System:**
- Hybrid approach combining Linear (dashboard), Notion (content management), and Stripe (landing pages) design patterns
- Material Design principles for data-heavy interfaces
- Custom color palette with dark mode support
- Typography: Inter for interface, Space Grotesk for marketing headlines
- Bilingual support (Uzbek/English) as a core feature

**Application Structure:**
- Public marketing site with hero, features, workflow, testimonials, pricing, and CTA sections
- Admin dashboard with sidebar navigation for content management, AI generation, scheduling, statistics, and settings
- Component-based architecture with reusable UI primitives
- Separation of concerns between marketing pages and admin functionality

### Backend Architecture

**Technology Stack:**
- Node.js with Express for the HTTP server
- TypeScript throughout for type safety
- Drizzle ORM for database operations
- Neon serverless PostgreSQL for database
- OpenAI API integration for AI content generation
- Node-cron for automated task scheduling

**API Design:**
- RESTful endpoints for content CRUD operations
- Separate routes for settings management and statistics
- Session-based authentication using connect-pg-simple
- Middleware for request logging and error handling

**Core Services:**
- Content management service with draft/published/scheduled states
- AI content generation service using OpenAI GPT models
- Automated scheduler that runs every minute to check for scheduled content
- Telegram Bot API integration for multi-channel publishing
- In-memory storage abstraction with database implementation path

**Automation System:**
- Cron-based scheduler checking for pending publications every minute
- Automatic content publishing when scheduled time is reached
- Dual-channel distribution: website and Telegram (configurable per content item)
- Error handling and logging for failed publications

### Data Storage

**Current Storage: In-Memory (Development)**
**Future: PostgreSQL (Neon Serverless) for Production**

**Schema Design:**

1. **Users Table**
   - Authentication and user management
   - Username/password credentials

2. **Content Table**
   - Title, body, and category fields
   - Status tracking (draft, scheduled, published)
   - Scheduling timestamps (scheduledFor, publishedAt)
   - Multi-channel flags (publishToWebsite, publishToTelegram)
   - Telegram message ID tracking for published content
   - Audit timestamps (createdAt, updatedAt)

3. **Settings Table**
   - Key-value configuration storage
   - Telegram bot token and channel ID
   - System-wide configuration options

4. **Content Stats Table**
   - Performance metrics per content item
   - Views, shares, and likes tracking
   - Foreign key relationship to content table with cascade delete

**ORM Strategy:**
- Drizzle ORM for type-safe database queries
- Drizzle-Zod for runtime validation schemas
- Migration support via drizzle-kit
- Connection pooling through @neondatabase/serverless

### External Dependencies

**AI Services:**
- OpenAI API for content generation
- GPT models for intelligent text creation
- API key configuration required for AI features

**Messaging Platform:**
- Telegram Bot API for channel publishing
- Bot token and channel ID stored in settings
- Automatic message posting with error handling

**Third-Party Libraries:**
- Radix UI primitives for accessible components
- React Hook Form with Zod resolvers for form validation
- date-fns for date manipulation
- class-variance-authority for component variants
- Lucide React for consistent iconography

**Development Tools:**
- Replit-specific plugins for development experience
- Vite plugins for error overlay and dev banners
- ESBuild for production server bundling
- PostCSS with Autoprefixer for CSS processing

**Session Management:**
- MemoryStore for development (in-memory sessions)
- connect-pg-simple ready for PostgreSQL-backed sessions in production
- Cookie-based session handling

**Deployment:**
- Configured for Render.com deployment via render.yaml
- PWA-ready with manifest.json and service worker
- Environment-based configuration (.env.example provided)
- Build command: `npm install && npm run build`
- Start command: `npm start`
- See DEPLOYMENT.md for detailed instructions