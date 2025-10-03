# SmartPixel.uz - Comprehensive Design Guidelines

## Design Approach & Philosophy

**Selected Approach:** Hybrid (Reference + System)
- **Primary References:** Linear (for dashboard/admin), Notion (for content management), Stripe (for landing pages)
- **Supporting System:** Material Design principles for data-heavy interfaces
- **Justification:** This is a SaaS platform requiring both compelling marketing presence and powerful utility interfaces. The public-facing site needs visual appeal while the admin dashboard demands efficiency and clarity.

## Core Design Principles

1. **Professional Technology Brand** - Modern, trustworthy, capability-focused
2. **Automation-First Visual Language** - Convey intelligence and efficiency through design
3. **Bilingual Excellence** - Seamless Uzbek/English experience with proper typography
4. **Data Transparency** - Clear visualization of automated processes and analytics

## Color Palette

### Public-Facing Site (Marketing)
- **Primary Brand:** 220 85% 45% (Deep Tech Blue) - conveys trust and technology
- **Accent:** 280 70% 55% (Smart Purple) - represents AI and automation
- **Success State:** 145 70% 45% (Growth Green) - for metrics and success indicators
- **Neutral Base Dark:** 220 15% 12% (Deep backgrounds)
- **Neutral Base Light:** 220 10% 98% (Light backgrounds)

### Admin Dashboard
- **Background:** 220 12% 8% (Dark mode primary)
- **Surface:** 220 10% 12% (Card/panel backgrounds)
- **Border:** 220 8% 18% (Subtle separators)
- **Text Primary:** 220 5% 95%
- **Text Secondary:** 220 5% 65%
- **Interactive:** 220 85% 55% (Lighter blue for actions)
- **Warning:** 35 100% 60% (Automation alerts)

## Typography

**Font Families:**
- **Primary (Interface):** Inter (via Google Fonts) - clean, modern, excellent for data
- **Display (Marketing):** Space Grotesk (via Google Fonts) - distinctive, tech-forward

**Scale:**
- Hero Headlines: text-6xl lg:text-7xl font-bold
- Section Titles: text-4xl lg:text-5xl font-bold
- Subsections: text-2xl lg:text-3xl font-semibold
- Body Large: text-lg lg:text-xl
- Body: text-base
- Small/Meta: text-sm
- Dashboard Labels: text-xs uppercase tracking-wider

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 8, 12, 16, 20, 24, 32
- Consistent vertical rhythm: py-20 (desktop sections), py-12 (mobile sections)
- Component padding: p-6 to p-8 for cards
- Grid gaps: gap-8 for feature grids, gap-4 for dense data

**Container Strategy:**
- Marketing sections: max-w-7xl mx-auto px-6
- Content areas: max-w-6xl
- Text content: max-w-3xl
- Dashboard: Full-width with px-6 lg:px-8

## Component Library

### Public Site Components

**Navigation:**
- Fixed top navbar with backdrop blur
- Logo left, navigation center, CTA + language toggle right
- Mobile: Hamburger menu with slide-in panel

**Hero Section:**
- Full-width with gradient overlay (220 85% 45% to 280 70% 55%)
- Large headline + supporting text + dual CTA buttons
- Animated tech visualization or dashboard preview mockup
- Height: min-h-[85vh]

**Feature Showcases:**
- Three-column grid (lg:grid-cols-3) with icons, titles, descriptions
- Alternating two-column sections with screenshots/visuals
- Stats counter section: four-column (lg:grid-cols-4) with animated numbers

**Content Automation Section:**
- Visual workflow diagram showing: AI Generation → Scheduling → Multi-channel Publishing
- Use connecting lines/arrows with subtle animations
- Three-card display of output channels (Website, Telegram, Analytics)

**Social Proof:**
- Two-column testimonials (md:grid-cols-2) with avatars
- Company logos strip (grayscale with hover color)
- Live stats ticker showing "Content pieces generated today" type metrics

**Footer:**
- Four-column layout: Company info, Products, Resources, Contact
- Newsletter signup with inline form
- Social links and language selector
- Copyright and compliance links

### Admin Dashboard Components

**Sidebar Navigation:**
- Fixed left sidebar (w-64) with collapsible state
- Icon + label navigation items
- Nested menu support for content management
- User profile at bottom with settings access

**Dashboard Cards:**
- Consistent card design: bg-surface rounded-lg p-6 border border-border
- Header with title + action button
- Content area with appropriate data visualization
- Subtle hover shadow elevation

**Content Table:**
- Alternating row backgrounds for readability
- Column sorting indicators
- Row actions (Edit, Delete, Schedule) on hover
- Pagination at bottom
- Inline status badges (Published, Scheduled, Draft)

**Content Editor:**
- Split layout: Editor left (60%), Preview right (40%)
- Toolbar with formatting options at top
- Auto-save indicator
- Character/word count
- Scheduling panel with date/time picker

**Analytics Dashboard:**
- Grid of metric cards showing KPIs
- Line charts for content performance over time
- Bar charts for channel comparison
- Real-time activity feed

## Images

**Hero Section:**
- Large hero image showing an AI-powered dashboard interface or abstract tech visualization
- Placement: Background with gradient overlay
- Style: Modern, high-tech, slightly abstract
- Size: Full-width, 85vh height

**Feature Sections:**
- Dashboard screenshots showing the admin interface in action
- Placement: Right side of alternating feature rows
- Style: Browser window mockups with subtle shadow
- Animated content generation flow visualization

**Content Automation Workflow:**
- Diagram-style illustration showing AI → Content → Distribution pipeline
- Placement: Center of dedicated section
- Style: Clean, icon-based, connected with animated lines

**Testimonial Section:**
- Professional headshots for testimonials (circular crop)
- Placement: Top-left of each testimonial card
- Style: Color photo with subtle border

**Admin Dashboard:**
- No decorative images - focus on data visualization and functional UI
- Chart.js or similar for analytics
- Icon library: Heroicons for consistent iconography

## Animations

**Use Sparingly:**
- Fade-in on scroll for feature sections (intersection observer)
- Number counters animating up for stats
- Subtle hover lift on cards (translate-y-1)
- Smooth transitions on navigation state changes
- Loading skeletons for async content

**Avoid:**
- Parallax scrolling
- Excessive micro-interactions
- Distracting background animations

## Accessibility & Dark Mode

- Maintain dark mode throughout (both public site and dashboard)
- All form inputs with proper labels and focus states
- Sufficient color contrast (WCAG AAA where possible)
- Keyboard navigation support throughout
- Screen reader friendly alt text and ARIA labels

## Unique Design Elements

**Automation Indicator:**
- Pulsing dot indicator for "Currently generating content"
- Appears in header when automation is active
- Clicking shows automation queue modal

**Multi-language Toggle:**
- Prominent UZ/EN toggle in navigation
- Smooth content transition
- Maintains state across sessions

**Real-time Updates:**
- Toast notifications for completed automations
- Live content counter in dashboard
- WebSocket-powered activity feed

This design creates a professional, modern platform that emphasizes SmartPixel.uz's automation capabilities while maintaining usability and visual appeal across both marketing and utility interfaces.