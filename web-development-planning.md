# Microtronic.biz — Technical Development Planning

> Next.js 16 (App Router) Commerce Site — Architecture, Patterns, Conventions  
> Based on Micro-Business-Suite (MBSuite) patterns — เชิงระบบภาษีไทย/บัญชีมากกว่า Micro-Account

---

## 📦 สินค้าที่ต้องขายบนเว็บ (ยืนยันแล้ว 3 ชิ้น)

> ✅ ยืนยันจากพี่ฆัง เมื่อ 2026-09-26 — ดู [Product Catalog](/product-catalog#4-software-ของเรา--สินค้าที่มีอยู่ตอนนี้)

| # | สินค้า | ประเภท | หน้าที่ต้องทำ | สถานะข้อมูลขาย |
|---|-------|--------|--------------|-----------------|
| 1 | **MBSuite** | Software (accounting/tax) | หน้า product + pricing + demo/trial | 🚫 ยังไม่มีราคา/แพ็กเกจ |
| 2 | **Vessuyan App** | App (fortune content) | หน้า product + เชื่อม LINE OA | 🚫 ยังไม่มีราคา/โดเมนสาธารณะ |
| 3 | **THOTH CMS** | Software (website CMS) | หน้า product + pricing | 🚫 ยังไม่มีราคา/สเปกจริง |

> ⚠️ **หน้า Products บน `microtronic.dev`** ปัจจุบันอ่านจาก `data/products.json` ซึ่งมี 10 รายการ
> ✅ **ตอบแล้ว 2026-09-26** — พี่ฆัง: *"ยังทำอยู่ครับ อยู่ในแผน"* → **ไม่ตัดรายการทิ้ง** เก็บเป็น Roadmap
> ✅ **`micro-account-platform` = MBSuite** (พี่ฆังยืนยันว่าเป็นตัวที่บริษัทใช้จริง) → แก้ชื่อได้เลย
> 🚫 ที่ยังขาด: **Vessuyan App** ยังไม่มีในไฟล์นี้ → งานรอบหลัง (ฌอนทำ)
> → ดู [Product Catalog ข้อ 4.6](/product-catalog#46-roadmap--โครงการที่ยังอยู่ระหว่างการพัฒนา)

---

## 🏗️ Architecture Principles

| Principle | Application |
|-----------|-------------|
| **Server-First** | Default to RSC, use Client Components only when needed (interactivity, browser APIs) |
| **Type Safety** | End-to-end TypeScript: Database → API → Components (Zod + Drizzle/Prisma) |
| **Google-First** | Use Google Workspace APIs (Drive, Sheets, Calendar, Admin) before 3rd party |
| **Data Integrity** | PostgreSQL Constraints + Application Validation (never trust client) |
| **Observability** | Structured Logging (Pino), Metrics (Prometheus), Traces (OpenTelemetry) |
| **Security by Default** | CSP, HSTS, COOP/COEP, Rate Limiting, Input Sanitization |

---

## 📦 Tech Stack (Locked)

| Category | Technology | Version | Notes |
|----------|------------|---------|-------|
| **Framework** | Next.js | 16.x (App Router) | RSC, Server Actions, Streaming |
| **Language** | TypeScript | 5.x | Strict Mode, Path Aliases |
| **Runtime** | React | 19.x | Compiler (when stable) |
| **Styling** | Tailwind CSS | 4.x | CSS-first, OKLCH, Container Queries |
| **Database** | PostgreSQL | 16+ (Neon) | Serverless, Branching, PgBouncer |
| **ORM** | Drizzle ORM | Latest | Type-safe, Lightweight, SQL-like |
| **Auth** | NextAuth.js | v5 (Beta) | Credentials + OAuth, Edge Compatible |
| **Validation** | Zod | 3.x | Schema → Types Inference |
| **UI Components** | Custom + Radix UI | - | Headless, Accessible |
| **Icons** | Lucide React | Latest | Tree-shakeable |
| **Forms** | React Hook Form + Zod Resolver | - | Performant, Type-safe |
| **Payments** | Custom (PromptPay, Bank, Crypto) | - | No Stripe dependency |
| **Email** | Resend | - | React Email Templates |
| **Images** | Next/Image + Cloudflare R2 | - | S3-compatible, Global CDN |
| **Search** | Meilisearch (Self-hosted) | - | Fast, Typo-tolerant |
| **Analytics** | Vercel Analytics + GA4 + Custom | - | Privacy-friendly |
| **Monitoring** | Sentry + Loki + Grafana | - | Errors, Logs, Metrics |
| **CI/CD** | GitHub Actions | - | Lint, Typecheck, Test, Build, Deploy |
| **Container** | Docker + Docker Compose | - | Multi-stage, Non-root |
| **Reverse Proxy** | Caddy | - | Auto-HTTPS, Config via Caddyfile |

---

## 🗄️ Database Schema (Core Tables)

```sql
-- Users & Auth
users (id, email, password_hash, name, role, email_verified, created_at)
accounts (id, user_id, provider, provider_account_id, tokens)
sessions (id, user_id, expires_at, token)

-- Products & Catalog
categories (id, slug, name, description, parent_id, sort_order)
products (id, sku, slug, name, description, category_id, type, status, metadata_json)
product_variants (id, product_id, sku, name, price_usd, price_thb, stock, attributes_json)
prices (id, product_variant_id, currency, amount, interval, markup_pct, effective_from)

-- Commerce
carts (id, user_id, session_id, expires_at)
cart_items (id, cart_id, product_variant_id, quantity, unit_price, metadata_json)
orders (id, order_number, user_id, status, subtotal, tax_total, shipping_total, total, currency, fx_rate, payment_method, paid_at, created_at)
order_items (id, order_id, product_variant_id, quantity, unit_price, total, metadata_json)
payments (id, order_id, method, provider, provider_id, amount, currency, status, raw_response_json, created_at)
licenses (id, order_item_id, license_key, status, activated_at, expires_at, metadata_json)

-- Content
posts (id, slug, title, excerpt, content_mdx, category_id, author_id, status, published_at, seo_json)
categories (id, slug, name, description, type) -- blog, docs, help
docs_pages (id, slug, title, content_mdx, sidebar_group, sort_order, version)

-- System
audit_logs (id, user_id, action, entity_type, entity_id, old_values_json, new_values_json, ip, user_agent, created_at)
settings (key, value_json, description, is_public)
webhooks (id, url, events, secret, active, last_triggered_at)
```

---

## 🔐 Authentication & Authorization (NextAuth v5)

### Providers
```typescript
// lib/auth/config.ts
providers: [
  CredentialsProvider({
    name: 'credentials',
    credentials: { email: {}, password: {} },
    authorize: async (credentials) => { /* verify against users table */ }
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: { params: { scope: 'openid email profile', hd: 'microtronic.co.th' } }
  })
]
```

### RBAC Model (from Micro-Account)
```typescript
// lib/auth/rbac.ts
type Role = 'superadmin' | 'admin' | 'sales' | 'support' | 'developer' | 'customer'

const permissions: Record<Role, string[]> = {
  superadmin: ['*'],
  admin: ['users:*', 'products:*', 'orders:*', 'content:*', 'settings:read'],
  sales: ['products:read', 'orders:read', 'orders:write', 'customers:*', 'quotes:*'],
  support: ['orders:read', 'customers:read', 'licenses:read', 'licenses:write'],
  developer: ['api:*', 'docs:read', 'tools:*'],
  customer: ['profile:*', 'orders:read', 'licenses:read', 'cart:*', 'checkout:*']
}

// Middleware: app/(auth)/middleware.ts
// API: lib/auth/permission-check.ts
```

### Session Strategy
- **JWT** for stateless auth (Edge compatible)
- **Database Sessions** for revocation + audit (Superadmin actions)
- **Refresh Token Rotation** (30d access, 90d refresh)
- **Middleware Protection**: `/admin/*`, `/account/*`, `/api/admin/*`, `/checkout/*`

---

## 🛒 Commerce Patterns

### Server Actions (Preferred)
```typescript
// app/(shop)/actions/cart.ts
'use server'

export async function addToCart(variantId: string, quantity: number) {
  const session = await auth()
  const cart = await getOrCreateCart(session?.user?.id)
  await db.insert(cartItems).values({ cartId: cart.id, variantId, quantity })
  revalidatePath('/cart')
  return { success: true }
}
```

### Cart Implementation
- **Authenticated**: Database `carts` + `cart_items`
- **Guest**: Signed Cookie (JWT) + Sync on Login
- **Persistence**: 30 days (cookie) / 90 days (DB)

### Checkout Flow (Server Actions)
```typescript
// Step 1: Contact Info → Step 2: Shipping → Step 3: Payment → Step 4: Confirm
// Each step: validate → save to order (draft) → next step
// Final: create order, reserve stock, initiate payment, send confirmation
```

### License Key Generation
```typescript
// lib/licenses/generator.ts
export function generateLicenseKey(productId: string): string {
  const prefix = productId.slice(0, 4).toUpperCase()
  const random = crypto.randomBytes(16).toString('hex').toUpperCase()
  const checksum = createHash('sha256').update(prefix + random).digest('hex').slice(0, 4)
  return `${prefix}-${random.slice(0, 4)}-${random.slice(4, 8)}-${random.slice(8, 12)}-${checksum}`
}
```

---

## 💰 Pricing Engine (Markup-based, FX-aware)

```typescript
// lib/pricing/engine.ts
interface PriceInput {
  baseCostUsd: number
  markupPct: number  // e.g., 25 for 25%
  fxRate: number     // THB per USD (from BOT API)
  quantity: number
}

export function calculatePrice({ baseCostUsd, markupPct, fxRate, quantity }: PriceInput) {
  const unitCostThb = baseCostUsd * fxRate
  const unitPriceThb = unitCostThb * (1 + markupPct / 100)
  const subtotal = unitPriceThb * quantity
  const vat = subtotal * 0.07
  const total = subtotal + vat
  return { unitCostThb, unitPriceThb, subtotal, vat, total, fxRate }
}

// FX Rate: Cached 6h (Latest), 24h (Series) — from Frankfurter.dev (BOT Provider)
```

---

## 🎨 Frontend Patterns

### Component Structure
```
components/
├── ui/              # Primitive (Button, Input, Card, Table, Modal, Toast)
├── commerce/        # ProductCard, PriceDisplay, CartDrawer, CheckoutSteps
├── layout/          # Header, Footer, Sidebar, Breadcrumb, AnnouncementBar
├── forms/           # FormField, Select, Checkbox, Radio, FileUpload
├── content/         # MDXComponents, CodeBlock, Callout, TableOfContents
├── auth/            # LoginForm, RegisterForm, PasswordReset, OAuthButtons
└── admin/           # DataTable, UserBadge, RoleSelect, AuditLogViewer
```

### RSC + Client Boundary
```tsx
// Server Component (Default)
export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug) // DB Query
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <ProductGallery images={product.images} /> {/* Client */}
      <ProductInfo product={product} />         {/* Server */}
      <AddToCartForm productId={product.id} />  {/* Client */}
    </div>
  )
}

// Client Component (Interactive)
'use client'
export function AddToCartForm({ productId }: { productId: string }) {
  const [qty, setQty] = useState(1)
  const { mutate } = useMutation(addToCart)
  return <form onSubmit={() => mutate({ variantId: productId, quantity: qty })}>...</form>
}
```

### Styling Conventions
- **Tailwind 4**: `@import "tailwindcss";` + CSS Variables for Theming
- **Design Tokens**: `colors.css.ts` → CSS Custom Properties
- **Dark Mode**: `class` strategy + `next-themes` (localStorage + OS preference)
- **Responsive**: Mobile-first, Breakpoints: `sm:640`, `md:768`, `lg:1024`, `xl:1280`, `2xl:1536`

---

## 📝 Content Management (MDX + Database)

### Blog/Articles (File-based MDX)
```
content/blog/
├── 2026-09-google-workspace-pricing-update.mdx
├── 2026-09-choosing-right-server-hardware.mdx
└── 2026-09-open-source-alternatives-adobe.mdx
```

```typescript
// lib/content/blog.ts
export async function getPosts() {
  const files = await glob('content/blog/*.mdx')
  return Promise.all(files.map(parseMDX))
}
```

### Documentation (Database + Sidebar Config)
```typescript
// lib/content/docs.ts
export const docsSidebar = [
  { group: 'Getting Started', pages: ['quick-start', 'license-guide', 'hardware-guide'] },
  { group: 'Licenses', pages: ['google-workspace', 'microsoft-365', 'adobe-cc'] },
  { group: 'Hardware', pages: ['server-selection', 'network-design', 'rack-setup'] },
  { group: 'API', pages: ['authentication', 'rate-limits', 'webhooks', 'sdks'] },
  { group: 'Integrations', pages: ['google-workspace', 'microsoft-graph', 'web3-payments'] }
]
```

---

## 🔍 SEO & Metadata

### Metadata API (Per Route)
```typescript
// app/shop/licenses/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug)
  return {
    title: `${product.name} | Microtronic`,
    description: product.excerpt,
    openGraph: {
      type: 'product',
      price: { amount: product.priceThb, currency: 'THB' },
      images: [{ url: product.ogImage, width: 1200, height: 630 }]
    },
    twitter: { card: 'summary_large_image' },
    other: { 'product:sku': product.sku }
  }
}
```

### JSON-LD Structured Data
- **Organization**: Name, Logo, Contact, SameAs (Social)
- **Product**: SKU, Name, Description, Brand, Offers (Price, Availability, Currency)
- **BreadcrumbList**: All Pages
- **Article**: Headline, Author, DatePublished, DateModified, Image
- **FAQPage**: Help Center Pages

---

## ⚡ Performance Budget

| Metric | Target | Measurement |
|--------|--------|-------------|
| **LCP** | < 2.5s | Lighthouse (Mobile 4G) |
| **CLS** | < 0.1 | Lighthouse |
| **TBT** | < 200ms | Lighthouse |
| **FCP** | < 1.8s | Lighthouse |
| **TTFB** | < 600ms | Vercel/Server Logs |
| **Bundle (JS)** | < 150KB (gz) | `next build` + `next-bundle-analyzer` |
| **Images** | WebP/AVIF, < 100KB each | `next/image` Audit |

### Optimization Checklist
- [ ] `next/font` Variable (Inter) — Preload, Subset
- [ ] `next/image` — All Images, Priority Above Fold
- [ ] Route Groups — Separate Layouts (Marketing vs App vs Admin)
- [ ] Streaming — `Suspense` Boundaries for Slow Data
- [ ] ISR — Product Pages (1hr), Blog (Build Time)
- [ ] Edge Middleware — Auth, Geo, Bot Protection
- [ ] R2/CDN — Static Assets, Images, Fonts

---

## 🔒 Security Checklist

| Area | Implementation |
|------|----------------|
| **Headers** | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| **Auth** | Argon2id Hashing, Rate Limit (5/min/login), Account Lockout, 2FA (TOTP) |
| **API** | Zod Validation All Inputs, Rate Limit (100/min/IP), CORS Restricted |
| **Database** | Parameterized Queries (Drizzle), RLS for Multi-tenant (Future), Encrypted Columns (PII) |
| **Payments** | Idempotency Keys, Webhook Signature Verification, No Card Data Storage |
| **Crypto** | Server-side Signing Only, User Signs in Wallet, Never Handle Private Keys |
| **Dependencies** | `npm audit` CI, `pnpm audit --prod`, Renovate Bot Weekly |
| **Secrets** | `.env.local` Only, Vercel/Production Env Vars, No Secrets in Code/Logs |

---

## 🧪 Testing Strategy

| Layer | Tool | Coverage Target |
|-------|------|-----------------|
| **Unit** | Vitest | 80% (Utils, Calculators, Validators) |
| **Integration** | Vitest + Testcontainers | 70% (DB, API Routes, Server Actions) |
| **E2E** | Playwright | 100% Critical Paths (Auth, Cart, Checkout, License Delivery) |
| **Visual** | Playwright + Pixelmatch | Key Pages (Home, Product, Checkout) |
| **Accessibility** | axe-core + Playwright | WCAG 2.1 AA |
| **Performance** | Lighthouse CI | Budget Pass on PR |

---

## 🚀 Deployment Pipeline

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]
  pull_request:

jobs:
  lint-typecheck-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm test:e2e

  build:
    needs: lint-typecheck-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with: { name: nextjs-build, path: .next/ }

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
      - run: docker build -t microtronic/web:staging .
      - run: docker push ghcr.io/microtronic/web:staging
      - run: ssh deploy@staging.microtronic.biz 'docker compose pull && docker compose up -d'

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: docker tag ghcr.io/microtronic/web:staging ghcr.io/microtronic/web:latest
      - run: docker push ghcr.io/microtronic/web:latest
      - run: ssh deploy@microtronic.biz 'docker compose pull && docker compose up -d'
```

---

## 📚 Related Documents
- [Site Structure](/webStructure) — Routes, File Structure, Components
- [Security & Auth](/add-security_system) — Detailed Auth, RBAC, Middleware
- [Milestone Planning](/ask) — Timeline, Deliverables
- [Micro-Account Architecture](/architecture) — Internal System Patterns
- [Day 1 Business Context](/day1) — Decisions & Rationale

---

> **Owner**: DarumaKlang  
> **Reviewers**: ฌอน, ธาร  
> **Last Updated**: 2026-09-26