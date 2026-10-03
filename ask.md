# Microtronic.biz New Website — Milestone Planning

> เว็บไซต์ขายซอฟต์แวร์/ฮาร์ดแวร์/บริการ IT แบบ Next.js Commerce (App Router)  
> เป้าหมาย: แทนที่ microtronic.biz เดิม ด้วย Modern Stack + E-commerce + Developer Portal

---

## 🎯 Business Objectives (จาก Day 1 Analysis)

| Objective | KPI | Target |
|-----------|-----|--------|
| **Direct Sales** | Orders/month, Revenue | ≥ 50 orders/mo, ≥ 500K THB/mo |
| **Lead Generation** | Contact forms, Quote requests | ≥ 100 leads/mo |
| **Brand Credibility** | Time on site, Return visitors | Avg session ≥ 3 min, 30% return rate |
| **Knowledge Hub** | Blog/Views, FAQ usage | ≥ 10K views/mo, FAQ deflection ≥ 40% |
| **Developer Acquisition** | Dev signups, API usage | ≥ 200 dev accounts, ≥ 1K API calls/day |

---

## 📦 Milestone Overview

| Milestone | Phase | Timeline | Status |
|-----------|-------|----------|--------|
| **M1** | Environment Setup & Planning | Week 1-2 | 🟡 In Progress |
| **M2** | Sitemap, Wireframes, UX/UI | Week 3-4 | ⏳ Planned |
| **M3** | Landing Page + Content Strategy | Week 5-6 | ⏳ Planned |
| **M4** | Core Pages (Shop, Services, Docs) | Week 7-10 | ⏳ Planned |
| **M5** | Features: Cart, Checkout, Auth, Payments | Week 11-14 | ⏳ Planned |
| **M6** | Internal Testing & Bug Fixing | Week 15 | ⏳ Planned |
| **M7** | UAT & Pre-Launch | Week 16 | ⏳ Planned |
| **M8** | Launch & Post-Launch Monitoring | Week 17+ | ⏳ Planned |

---

## 🔧 Milestone 1: Environment Setup & Initial Planning (Week 1-2)

### Deliverables
- [ ] **Team Setup**: Lead Dev (DarumaKlang), Designer, Content Writer, QA
- [ ] **Server/Hosting**: Ubuntu 24.04 + Docker on NUC7JY (Production), Optiplex (Staging)
- [ ] **Platform**: Next.js 16 + TypeScript 5 + Tailwind 4 + PostgreSQL (Neon)
- [ ] **Tooling**: Git (GitHub), Project Board, CI/CD (GitHub Actions), Docker Compose
- [ ] **Database**: PostgreSQL Schema (Products, Orders, Users, Content)
- [ ] **Preliminary Sitemap**: [Draft](/webStructure)
- [ ] **Goals & Audience**: Confirmed in [Day 1](/day1)

### Technical Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Framework** | Next.js 16 App Router | RSC, Streaming, Server Actions, SEO |
| **Database** | Neon PostgreSQL | Serverless, Branching, Auto-scaling |
| **Auth** | NextAuth v5 (Credentials + Google OAuth) | Enterprise SSO ready |
| **Payments** | PromptPay + Bank Transfer + Crypto (Web3) | Thai market + Dev-friendly |
| **CMS** | File-based (MDX) + Database (Products/Orders) | Simple content, Structured commerce |
| **Deployment** | Docker + Self-hosted (NUC7JY) | Cost control, Data sovereignty |

---

## 🎨 Milestone 2: Sitemap, Wireframes & UX/UI (Week 3-4)

### Sitemap (Final)
```
/                                    → Homepage (Hero, Featured, Stats, CTA)
/shop                                → Shop Index (Filters, Grid, Search)
/shop/licenses                       → Software Licenses (Google, Microsoft, Adobe)
/shop/licenses/[slug]                → License Detail (Pricing, Features, Buy)
/shop/hardware                       → Hardware Catalog (Servers, Network, Custom)
/shop/hardware/[slug]                → Hardware Detail (Specs, Price, Order)
/shop/services                       → IT Services (Consulting, DevOps, Managed)
/shop/services/[slug]                → Service Detail (Scope, Pricing, Contact)
/developers                          → Developer Portal
/developers/api-docs                 → API Reference (OpenAPI/Swagger)
/developers/tools                    → Free Tools (FX Rate, QR Generator, etc.)
/developers/community                → Forum/Discord/GitHub Links
/blog                                → Blog/News Index (Categories, Tags)
/blog/[category]                     → Category Listing
/blog/[slug]                         → Article Detail (MDX, SEO, Related)
/docs                                → Documentation (VitePress-style Sidebar)
/docs/quick-start                    → Quick Start Guide
/docs/license-guide                  → License Selection Guide
/docs/hardware-guide                 → Hardware Selection Guide
/docs/api                            → API Documentation
/about                               → About Us (Story, Team, Partners)
/about/portfolio                     → Case Studies / Portfolio
/contact                             → Contact Form + Info + Map
/auth/login                          → Login (NextAuth)
/auth/register                       → Register (Email Verification)
/cart                                → Shopping Cart
/checkout                            → Checkout (Multi-step)
/account                             → User Dashboard (Orders, Downloads, Licenses)
/admin                               → Admin Dashboard (RBAC Protected)
```

### Wireframes Required
- [ ] Homepage (Desktop/Mobile)
- [ ] Shop Index + Filters
- [ ] Product Detail (License/Hardware/Service variants)
- [ ] Cart + Checkout Flow (3 steps)
- [ ] Developer Portal Layout
- [ ] Blog/Article Layout
- [ ] Docs Sidebar Layout
- [ ] Admin Dashboard

### Brand Guidelines
- [ ] Colors: Primary (#1E3A8A), Secondary (#059669), Accent (#DC2626)
- [ ] Typography: Inter (UI) + JetBrains Mono (Code)
- [ ] Logo Variants: Full, Icon, Monochrome
- [ ] Tone: Professional, Technical, Developer-friendly, Trustworthy

---

## 🏠 Milestone 3: Landing Page & Content Strategy (Week 5-6)

### Landing Page Sections
1. **Hero**: "Software Licenses + Hardware + Open Source + Developer Support — One Partner"
2. **Trust Indicators**: Google/Microsoft/Adobe Partner Badges, Client Count, Uptime
3. **Product Categories**: 3 Cards (Licenses, Hardware, Services) → /shop
4. **Developer Portal Teaser**: "APIs, Tools, Community for Builders" → /developers
5. **Case Studies**: 3 Featured (SME, Enterprise, Startup)
6. **Content Hub**: Latest Articles + Guides
7. **CTA Bar**: "Get Quote" / "Start Building" / "Contact Sales"

### Content Strategy
| Content Type | Frequency | Owner | Distribution |
|--------------|-----------|-------|--------------|
| **Product Pages** | Per release | Product Team | SEO, Ads, Email |
| **Technical Guides** | 2/month | Dev Team | SEO, Dev Portal, Social |
| **Case Studies** | 1/quarter | Sales + Dev | Landing, Sales Deck |
| **Industry News** | Weekly | Marketing | Blog, Newsletter, LinkedIn |
| **FAQ/KB** | Continuous | Support | Site Search, Chatbot |

### Content Sourcing
- **Product Data**: Micro-Account DB (Services, Prices, Specs)
- **Technical Content**: DarumaKlang + Team (Dogfooding Micro-Account)
- **Case Studies**: Sales interviews → Dev writes
- **Images**: Custom photography (Hardware) + Partner assets (Logos)

---

## 🛍️ Milestone 4: Core Pages Development (Week 7-10)

### Shop Pages
| Page | Features | Components |
|------|----------|------------|
| `/shop` | Filter (Type, Brand, Price), Sort, Search, Grid/List Toggle | `ProductGrid`, `FilterSidebar`, `SearchBar` |
| `/shop/licenses` | Group by Vendor (Google/Microsoft/Adobe), Plan Comparison Table | `LicenseComparison`, `VendorTabs` |
| `/shop/licenses/[slug]` | Tier Selector (Monthly/Annual), Seat Calculator, Add to Cart | `TierSelector`, `SeatCalculator`, `LicenseFeatures` |
| `/shop/hardware` | Specs Filter (CPU, RAM, Storage, Form Factor), Condition Badge | `SpecsFilter`, `ConditionBadge` |
| `/shop/hardware/[slug]` | Configurator (RAM/Storage Upgrade), Warranty Options | `HardwareConfigurator`, `WarrantySelect` |
| `/shop/services` | Service Tiers (Basic/Pro/Enterprise), Scope Checklist | `ServiceTierCard`, `ScopeChecklist` |

### Developer Portal
- `/developers` — Dashboard with API Keys, Usage Stats, Quick Links
- `/developers/api-docs` — OpenAPI 3.1 + Scalar/Redoc UI, Auth Examples
- `/developers/tools` — FX Rate API, QR Generator, License Validator, JWT Decoder

### Content Pages
- `/blog` — Pagination, Categories, Tags, Reading Time, Author
- `/blog/[slug]` — MDX, Code Blocks (Shiki), TOC, Related Posts
- `/docs` — VitePress-style Sidebar, Search (Algolia/Local), Edit Link

---

## ⚙️ Milestone 5: Features & Backend Integration (Week 11-14)

### E-commerce Features
| Feature | Implementation | API/Integration |
|---------|---------------|-----------------|
| **Shopping Cart** | Server Actions + Cookie/DB Hybrid | `/api/cart/*` |
| **Checkout** | Multi-step (Info → Shipping → Payment → Confirm) | Server Actions + Webhooks |
| **Payments** | PromptPay QR, Bank Transfer (Manual Verify), Crypto (Web3) | PromptPay Lib, Blockchain Events |
| **Licenses Delivery** | Auto-generate License Keys, Email + Account Downloads | Background Job (node-cron) |
| **Hardware Orders** | Quote → Confirm → Ship → Track | Admin Order Management |
| **Subscriptions** | Recurring Billing (Google/MS/Adobe), Proration | Stripe-like Logic (Custom) |

### Authentication & RBAC
- **NextAuth v5**: Credentials (Email/Password) + Google OAuth (Workspace SSO)
- **Roles**: `superadmin`, `admin`, `sales`, `support`, `developer`, `customer`
- **Permissions**: Module/Action based (from Micro-Account RBAC Standard)
- **Session**: JWT + Database (Refresh Token Rotation)

### Backend & Integrations
- **Google Workspace API**: Provision Licenses, Manage Users, Billing Reports
- **Microsoft Graph**: License Assignment, Usage Analytics
- **Adobe Admin Console**: License Management (API Limited → Manual Fallback)
- **Email**: Resend (Transactional) + Google Workspace (Domain Email)
- **Analytics**: Vercel Analytics + Google Analytics 4 + Custom Events

### Performance & SEO
- **ISR/SSG**: Product pages (ISR 1hr), Blog (SSG), Homepage (ISR 10min)
- **Images**: `next/image` + Cloudinary/R2 (WebP/AVIF, Responsive)
- **Bundle**: Code Splitting, Dynamic Imports, `next/font` (Inter Variable)
- **SEO**: Metadata API, JSON-LD (Product, Organization, Breadcrumb), Sitemap.xml, Robots.txt

---

## 🧪 Milestone 6: Internal Testing & Bug Fixing (Week 15)

### Test Matrix
| Category | Scope | Tools |
|----------|-------|-------|
| **Unit** | Utils, Calculators, Validators, API Helpers | Vitest |
| **Integration** | Cart Flow, Checkout, Auth, License Generation | Playwright + Test DB |
| **E2E** | Critical User Journeys (Buy License, Order Hardware, Dev Signup) | Playwright |
| **Cross-Browser** | Chrome, Firefox, Safari, Edge (Desktop + Mobile) | Playwright |
| **Accessibility** | WCAG 2.1 AA (Color, Keyboard, Screen Reader) | axe-core + Manual |
| **Performance** | LCI < 2.5s, CLS < 0.1, TBT < 200ms | Lighthouse CI |
| **Security** | OWASP Top 10, Auth Bypass, XSS, CSRF | Custom + npm audit |

### Bug Triage
- **P0 (Blocker)**: Checkout broken, Auth failure, Data loss
- **P1 (Critical)**: Wrong pricing, License not delivered, Payment mismatch
- **P2 (Major)**: UI broken mobile, Slow query, SEO issue
- **P3 (Minor)**: Typo, Alignment, Non-critical UX

---

## ✅ Milestone 7: UAT & Pre-Launch (Week 16)

### UAT Scenarios (Internal Team)
- [ ] Sales: Create Quote → Convert to Order → Deliver License
- [ ] Support: Customer asks for License Key → Resend from Admin
- [ ] Accounting: Verify Revenue Recognition, Tax Invoice Generation
- [ ] DevOps: Deploy → Rollback → Health Check
- [ ] Marketing: Publish Blog → Check SEO → Social Preview

### Pre-Launch Checklist
- [ ] **DNS**: microtronic.biz → Production IP (Cloudflare Proxy)
- [ ] **SSL**: Cloudflare Full (Strict) + HSTS
- [ ] **Env Vars**: All Production Secrets in `.env.production` (Not in Repo)
- [ ] **Monitoring**: Uptime (UptimeRobot), Errors (Sentry), Logs (Loki/Grafana)
- [ ] **Backups**: DB Daily (Neon Branch), Code (GitHub), Media (R2/Drive)
- [ ] **Analytics**: GA4 + Custom Events + Enhanced Ecommerce
- [ ] **Search Console**: Sitemap Submitted, Indexing Verified
- [ ] **Email**: Domain Auth (DKIM/SPF/DMARC), Test Flows

---

## 🚀 Milestone 8: Launch & Post-Launch (Week 17+)

### Launch Day
- [ ] Deploy to Production (Blue/Green via Docker)
- [ ] Verify Critical Paths (Homepage → Shop → Checkout)
- [ ] Announce: Email List, LinkedIn, Facebook, LINE OA, Discord
- [ ] Monitor: Error Rate, Response Time, Conversion Funnel

### Post-Launch (First 30 Days)
| Week | Focus | Actions |
|------|-------|---------|
| 1 | Stability | Hotfix P0/P1, Monitor Logs, User Feedback |
| 2 | Optimization | Query Tuning, Cache Tuning, Image Optimization |
| 3 | Growth | SEO Content Push, Ad Campaigns, Affiliate Program |
| 4 | Retention | Email Sequences, License Renewal Reminders, NPS Survey |

### Ongoing
- **Monthly**: Security Updates, Dependency Updates, Performance Review
- **Quarterly**: Feature Planning, Architecture Review, Capacity Planning
- **Yearly**: Stack Evaluation, Major Version Upgrade, Disaster Recovery Test

---

## 📋 Dependencies & Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Google Provisioning API Limits** | License delivery delays | Batch + Queue + Manual Fallback |
| **FX Rate Volatility** | Hardware pricing inconsistency | Daily Rate Cache + Markup % (not fixed THB) |
| **Single Dev (DarumaKlang)** | Velocity bottleneck | Prioritize MVP, Defer Nice-to-have |
| **Self-hosted Infra** | Hardware failure | NUC7JY + Optiplex Redundancy, Daily Backups |
| **Thai Tax Compliance** | Legal penalties | Micro-Account Integration, RD-Ready |

---

## 🔗 Related Documents
- [Technical Planning](/web-development-planning) — Stack, Patterns, Conventions
- [Site Structure](/webStructure) — Routes, Components, File Structure
- [Security & Auth](/add-security_system) — RBAC, Middleware, API Protection
- [To-Do List](/To-do-List) — Actionable Tasks
- [Day 1 Context](/day1) — Business Analysis & Decisions

---

> **Owner**: DarumaKlang (Lead Dev)  
> **Stakeholders**: พี่ฆัง (CEO), ฌอน (Technical Advisor), ธาร (Review/QA)  
> **Last Updated**: 2026-09-26