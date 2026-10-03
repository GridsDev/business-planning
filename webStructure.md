# Site Structure — microtronic.biz (Next.js 16 App Router)

> โครงสร้างหน้าเว็บไซต์, Routes, และ File Structure ของเว็บไซต์ Commerce ของ Microtronic

---

## 🧭 Main Navigation (Header)

### โลโก้
- โลโก้เว็บไซต์ (Website Logo) — ซ้ายบนสุดของ Header, คลิกแล้วกลับหน้าแรก (`/`)
- แสดง "Microtronic" + tagline "Software · Hardware · Open Source"

### เมนูหลัก (Primary Navigation)
| เมนู | ลิงก์ | รายละเอียด |
|-------|-------|-----------|
| **หน้าแรก** | `/` | Hero, Categories, Case Studies, CTA |
| **ร้านค้า** | `/shop` | จุดรวมสินค้า/บริการทั้งหมด |
| ↳ ซอฟต์แวร์ลิขสิทธิ์ | `/shop/licenses` | Google Workspace, Microsoft 365, Adobe CC |
| ↳ ฮาร์ดแวร์ | `/shop/hardware` | Server, Network, Workstation, Custom Build |
| ↳ บริการ | `/shop/services` | Consulting, DevOps, Managed IT |
| **สำหรับนักพัฒนา** | `/developers` | API Docs, Free Tools, Community |
| **คู่มือ / เอกสาร** | `/docs` | Sidebar-based documentation (VitePress-style) |
| **บล็อก** | `/blog` | บทความเชิงเทคนิค, Case Study, ข่าวสาร |
| **เกี่ยวกับเรา** | `/about` | เรื่องราว, ทีมงาน, ผลงาน, Partner |
| **ติดต่อเรา** | `/contact` | ฟอร์ม, ข้อมูลติดต่อ, แผนที่ |

### ปุ่ม/ไอคอนสำคัญ (ด้านขวาของ Header)
| ปุ่ม | ลิงก์ | หมายเหตุ |
|------|-------|----------|
| **ค้นหา** | `/search` | เปิด Search Modal (Cmd+K) — ค้นข้าม License/Hardware/บทความ |
| **ตะกร้าสินค้า** | `/cart` | แสดงจำนวนสินค้าที่มีอยู่ (Badge) |
| **เข้าสู่ระบบ** | `/auth/login` | เปลี่ยนเป็นบัญชีเมื่อ Login แล้ว |
| **ภาษา** | — | TH / EN toggle (Phase 2) |
| **เข้าสู่ระบบ (Google)** | `/auth/login` | OAuth — สำหรับ Workspace Business ลูกค้า |

---

## 📄 Key Pages & Sub-Pages

### หน้าแรก (Homepage) — `/`

```
1. Announcement Bar
   - "ลูกค้าใหม่ใช้โค้ด WELCOME10 ลด 10%"
2. Hero Section
   - H1: "Software Licenses · Hardware · Open Source · Developer Support"
   - Sub: "คู่ค้า Google Workspace, Microsoft 365 และ Adobe สำหรับธุรกิจไทย — ครบทั้งซอฟต์แวร์ ฮาร์ดแวร์ และที่ปรึกษา IT"
   - CTA: [ดูแพ็กเกจซอฟต์แวร์] · [ขอใบเสนอราคา] · [สำหรับนักพัฒนา]
   - Stats: ลูกค้า 500+ · ปีก่อตั้ง 15+ · SLA 99.9% · รองรับ 24/7
3. Partner Logos Strip
   - Google Partner · Microsoft Partner · Adobe Reseller
4. Category Grid (4 หมวด)
   - ซอฟต์แวร์ลิขสิทธิ์ → /shop/licenses
   - ฮาร์ดแวร์ → /shop/hardware
   - บริการ IT → /shop/services
   - สำหรับนักพัฒนา → /developers
5. Featured Products (3-4 รายการ)
   - License แนะนำ · Hardware คุ้มค่า · Service ยอดนิยม
6. Why Microtronic (USP 4 ข้อ)
   - Hardware ต้นทุนต่ำ · Open Source · Developer Support · One-Stop IT
7. Case Studies (3 รายการ)
   - SME · Enterprise · Startup
8. Pricing Preview
   - "ดูราคาโปรโมชั่น Google Workspace" → /shop/licenses/google-workspace
9. Knowledge Hub (บทความล่าสุด 3 ชิ้น)
10. For Developers Teaser
   - "API, Tools, Community สำหรับคนสร้าง" → /developers
11. Testimonials (3-4 รายการ)
12. FAQ Accordion (5 คำถาม)
13. Final CTA
   - "พร้อมเริ่มต้นกับเรา?" → /contact · /shop
```

### หน้าร้านค้า (Shop Index) — `/shop`

```
1. Breadcrumb
2. Shop Header — Title + Description + Total Products
3. Filter Sidebar (Sticky, Desktop / Drawer, Mobile)
   - Type: License / Hardware / Service
   - Vendor: Google / Microsoft / Adobe
   - Category (nested)
   - Price Range (Slider)
   - Brand: Intel / AMD / Dell / HP / Lenovo
   - Condition: New / Refurbished / Used
   - Specs (Hardware): CPU, RAM, Storage, Form Factor
   - License Interval: Monthly / Annual
4. Sort Dropdown
   - Relevance · Price: Low→High · Price: High→Low · Newest · Popular
5. View Toggle (Grid / List)
6. Active Filters Chips (removable)
7. Product Grid / List
   - ProductCard: Image, Name, Vendor Badge, Price, Compare Checkbox, Add to Cart
8. Pagination
9. Empty State (เมื่อไม่มีผลลัพธ์) — พร้อม "ล้างตัวกรอง"
```

### หน้ารายละเอียดสินค้า (Product Detail) — `/shop/[type]/[slug]`

#### A. License Detail — `/shop/licenses/google-workspace-business-starter`

```
1. Breadcrumb: หน้าแรก / ร้านค้า / ซอฟต์แวร์ลิขสิทธิ์ / Google Workspace
2. Product Header
   - Vendor Badge (Google Partner)
   - H1: Google Workspace Business Starter
   - SKU, Rating (4.8/5 · 127 รีวิว), Stock Status
3. Layout: 2 Columns (Desktop) / Stacked (Mobile)
   ├── Left Column
   │   ├── Product Gallery (Screenshots, Feature Images)
   │   ├── What's Included (สิ่งที่ได้รับ)
   │   ├── Feature Comparison Table (vs Standard/Plus)
   │   ├── System Requirements
   │   └── Reviews (5 รายการ + เขียนรีวิว)
   └── Right Column (Sticky)
       ├── Tier Selector (Starter / Standard / Plus / Enterprise)
       ├── Seat Calculator
       │   ├── Input: จำนวนผู้ใช้ (1-300)
       │   ├── Interval Toggle: รายเดือน / รายปี (ลด 15%)
       │   ├── Price Breakdown (แยก VAT)
       │   └── Live Total
       ├── Delivery Time
       │   └── "พร้อมส่งภายใน 1-2 ชั่วโมง (เวลาทำการ)"
       ├── Add to Cart Button
       ├── Buy Now Button
       ├── Ask for Quote Button (จำนวนมาก)
       ├── Trust Badges (Secure Payment, Warranty, Support)
       └── Accordion: วิธีซื้อ · วิธีต่ออายุ · วิธียกเลิก · ช่องทางชำระเงิน
4. Related Products
   - ลิขสิทธิ์ตัวอื่นของ Google · Hardware ที่ใช้ร่วมกัน
5. Sticky Mobile CTA Bar
   - ราคา + [เพิ่มลงตะกร้า]
```

#### B. Hardware Detail — `/shop/hardware/dell-optiplex-7040-sff`

```
1. Breadcrumb
2. Product Header
   - Condition Badge (Refurbished / New)
   - H1: Dell Optiplex 7040 SFF
   - SKU, Stock (จำนวน), Rating
3. Layout: 2 Columns
   ├── Left Column
   │   ├── Image Gallery (Multi-angle, 360° View)
   │   ├── Specs Table (CPU, RAM, Storage, LAN, Display, Power)
   │   ├── Performance Benchmarks (เทียบรุ่นอื่น)
   │   ├── "เหมาะกับ" (Use Cases: ทำ Server, Docker Host, VM, POS)
   │   ├── What's in the Box
   │   ├── Warranty & Returns
   │   └── Reviews
   └── Right Column (Sticky)
       ├── Base Price
       ├── Configurator
       │   ├── RAM: 8GB (+2,400) / 16GB (+4,800) / 32GB (+8,400)
       │   ├── Storage: 256GB SSD / 512GB SSD / 1TB SSD / +2TB HDD
       │   ├── OS: None / Ubuntu Server / Proxmox / Windows Server
       │   └── Live Price Update
       ├── Quantity Selector
       ├── Shipping Info (กรุงเทพฯ ฟรี / ต่างจังหวัด คิดตามน้ำหนัก)
       ├── Add to Cart / Buy Now / [ขอใบเสนอราคา]
       └── Trust Badges
4. Compatible Products
   - RAM, SSD, Network Card ที่ใช้คู่ได้
5. Compare with Similar
```

#### C. Service Detail — `/shop/services/cloud-migration`

```
1. Breadcrumb
2. Service Header
   - H1: Cloud Migration & Modernization
   - Duration, Starting Price, Mode (On-site / Remote)
3. Overview
   - Description, What's Included, Who It's For
4. Service Tiers
   - Basic (ตรวจสอบ + แผน) / Pro (ย้ายจริง) / Enterprise (ย้ายทั้งระบบ)
5. Deliverables Checklist
6. Process (5 ขั้นตอน)
7. FAQ
8. Case Study (ลูกค้าที่เคยใช้บริการ)
9. CTA: [จองคุยปรึกษา] · [ขอใบเสนอราคา]
```

### หน้าตะกร้าสินค้า (Cart) — `/cart`

```
1. Page Header: ตะกร้าสินค้า (N รายการ)
2. Cart Items List
   ├── Item Card
   │   ├── Thumbnail
   │   ├── Name + Variant (เช่น 50 seats, รายปี)
   │   ├── Unit Price × Quantity
   │   ├── [แก้ไข] [ลบ]
   │   └── Line Total
   └── Stock Warning (สินค้าเหลือน้อย / ราคาเปลี่ยนแล้ว)
3. Order Summary (Sticky Aside)
   ├── ยอดรวมสินค้า
   ├── ส่วนลด (Coupon / ลูกค้าใหม่ WELCOME10)
   ├── ค่าจัดส่ง (คำนวณอัตโนมัติ)
   ├── VAT 7%
   ├── ยอดรวมทั้งสิ้น
   ├── [ชำระเงิน] Button
   └── [Continue Shopping]
4. Suggestions
   - "ลูกค้าซื้อพร้อมกันมักซื้อ:" (Cross-sell)
5. Empty Cart State
   - [เลือกดูซอฟต์แวร์] [เลือกดูฮาร์ดแวร์]
```

### หน้าชำระเงิน (Checkout) — `/checkout`

```
Progress Indicator: ① ข้อมูล ② การจัดส่ง ③ การชำระเงิน ④ ยืนยัน

Step 1: ข้อมูลผู้ซื้อ
├── ชื่อ-นามสกุล, บริษัท, เลขประจำตัวผู้เสียภาษี (ถ้าต้องใบกำกับ)
├── Email, เบอร์โทร
├── [บันทึกข้อมูลไว้] (บัญชี Member)
└── Validation ครบ (Zod)

Step 2: การจัดส่ง (เฉพาะ Hardware)
├── ที่อยู่จัดส่ง (ไทย / ต่างประเทศ)
├── วิธีจัดส่ง: จัดส่งรายวัน | ไปรษณีย์ EMS | ดึงที่สำนักงาน
├── ค่าจัดส่ง (คำนวณจริง)
├── หมายเหตุ: ซอฟต์แวร์ลิขสิทธิ์ = ส่งทางอีเมล (ไม่ต้องขั้นตอนนี้)
└── Back / Next

Step 3: การชำระเงิน
├── 💳 บัตรเครดิต/เดบิต
│   └── Redirect → Payment Gateway → Callback
├── 🏦 พร้อมเพย์ (PromptPay)
│   ├── แสดง QR Code (พร้อม Countdown 5 นาที)
│   └── [ตรวจสอบสถานะ] Auto-poll
├── 💵 โอนผ่านบัญชีธนาคาร
│   ├── แสดงเลขบัญชี + ชื่อผู้รับ
│   └── อัปโหลดสลิป + [แจ้งชำระแล้ว]
├── 🪙 Crypto (BTC/ETH/USDT)
│   ├── [เชื่อมต่อ Wallet] (MetaMask / WalletConnect)
│   ├── แสดง Address + Amount
│   └── Chain Event Listener → ยืนยันอัตโนมัติ
└── 💼 โอนเงินเข้าบัญชี / ขอใบเสนอราคา (B2B)
    └── สำหรับองค์กรขนาดใหญ่

Step 4: ยืนยันคำสั่งซื้อ
├── Order Summary (ย้อนกลับ)
├── Terms Checkbox
├── [ยืนยันการสั่งซื้อ] → สร้าง Order → Redirect
└── Progress → Redirect ตาม Payment Method

Success Page — /checkout/success?order=ORD-XXXX
├── ✅ สั่งซื้อสำเร็จ
├── Order Number, Total, Payment Method
├── (License) → "คีย์ใบอนุญาตถูกส่งไปยังอีเมลแล้ว"
├── (Hardware) → "ทีมงานจะติดต่อกลับภายใน 1 วันทำการ"
└── [ดูคำสั่งซื้อของฉัน] · [กลับหน้าแรก]
```

### หน้าบัญชีผู้ใช้ (My Account) — `/account/*`

| หน้า | Route | เนื้อหา |
|------|-------|--------|
| **ภาพรวม** | `/account` | Recent Orders, Downloads, License Status, Profile Snapshot |
| **ข้อมูลส่วนตัว** | `/account/profile` | ชื่อ, Email, เบอร์โทร, บริษัท, ที่อยู่, เปลี่ยนรหัสผ่าน |
| **คำสั่งซื้อ** | `/account/orders` | รายการออเดอร์ + สถานะ + Invoice Download |
| **รายละเอียดออเดอร์** | `/account/orders/[id]` | Items, Payments, License Keys, Shipping Tracking |
| **ซอฟต์แวร์ของฉัน** | `/account/licenses` | License Keys, วันหมดอายุ, [ต่ออายุ], [โอนสิทธิ์] |
| **สินค้าที่ซื้อ (Digital)** | `/account/downloads` | Download Links, Download History, Re-download |
| **ที่อยู่** | `/account/addresses` | Address Book (Default, Billing, Shipping) |
| **วิธีชำระเงิน** | `/account/payment-methods` | Saved Methods, Billing Info |
| **คูปอง** | `/account/coupons` | Available Coupons, Usage History |
| **การแจ้งเตือน** | `/account/notifications` | Email Notification Preferences, License Expiry Alerts |
| **ความปลอดภัย** | `/account/security` | เปลี่ยนรหัสผ่าน, 2FA (TOTP), Active Sessions, Revoke |
| **API Keys** | `/account/api-keys` | (สำหรับ Developer Tier) สร้าง/Revoke API Key |

### หน้าสำหรับนักพัฒนา (For Developers) — `/developers/*`

| หน้า | Route | เนื้อหา |
|------|-------|--------|
| **Portal Home** | `/developers` | Hero, API Overview, Quick Start, Rate Limits, Status |
| **API Documentation** | `/developers/api-docs` | OpenAPI 3.1 + Scalar UI, Sidebar ตาม Resource, Code Examples (cURL/JS/Python) |
| **Authentication** | `/developers/api-docs/authentication` | API Key, OAuth2, Scopes, Rate Limits |
| **Free Tools** | `/developers/tools` | FX Rate Converter, License Key Validator, QR Generator, VAT Calculator, Email Validation |
| **SDKs & Libraries** | `/developers/tools#sdks` | Official Client Libraries (Node/Python/Go), GitHub Links |
| **Webhooks** | `/developers/webhooks` | Event Types, Payload Schema, Retry Policy, Signature Verification |
| **Status & Changelog** | `/developers/status` | API Uptime, Incident History, Changelog |
| **Community** | `/developers/community` | Discord/GitHub/Forum Links, Contribution Guide |

#### API Endpoints (ตัวอย่าง)

```http
# Public
GET  /api/v1/products              # List products (filter, paginate)
GET  /api/v1/products/{id}         # Product detail
GET  /api/v1/licenses/validate     # Validate license key
GET  /api/v1/fx-rate               # USD/THB rate (cached 6h)
GET  /api/v1/vat-calc?amount=X     # VAT calculation (7%)

# Authenticated (API Key / Bearer Token)
GET    /api/v1/account/profile
GET    /api/v1/account/orders
POST   /api/v1/account/orders      # Create order
GET    /api/v1/account/licenses
POST   /api/v1/account/licenses/:key/activate
GET    /api/v1/account/licenses/:key/deactivate

# Webhooks (Outgoing)
POST   https://customer.com/webhooks/microtronic
# Events: order.created, order.paid, license.issued, license.expiring, subscription.renewed
```

### คู่มือ / เอกสาร (Documentation) — `/docs/*`

โครงสร้างคล้าย Solana Docs / VitePress (Sidebar + Search + Edit Link)

| หน้า | Route | เนื้อหา |
|------|-------|--------|
| **Docs Index** | `/docs` | Overview, Quick Start Cards, Category Overview |
| **Quick Start** | `/docs/quick-start` | เริ่มต้นใช้งานใน 5 นาที (ซื้อ License, เปิดใช้, ต่ออายุ) |
| **เลือกซอฟต์แวร์ให้เหมาะกับ** | `/docs/choose-license` | Comparison Matrix: Business vs Enterprise, แนะนำตามขนาดทีม |
| **เลือกฮาร์ดแวร์** | `/docs/choose-hardware` | Spec Guide, Use Case Matrix, Sizing Calculator |
| **จัดการผู้ใช้ (User Mgmt)** | `/docs/user-management` | เพิ่ม/ลบผู้ใช้, กลุ่ม, SSO, Sync Directory |
| **ความปลอดภัย** | `/docs/security` | 2FA, Access Control, Audit Log, Data Retention |
| **การชำระเงิน & ใบเสนอราคา** | `/docs/billing` | Payment Methods, VAT, Invoice, Payment Terms |
| **API Reference** | `/docs/api` | (ย่อยจาก /developers/api-docs) |
| **เทคนิค & Integration** | `/docs/integrations` | Google Workspace API, Microsoft Graph, Web3 |
| **Troubleshooting** | `/docs/troubleshooting` | Common Issues, Error Codes, Support Contact |
| **Changelog** | `/docs/changelog` | Product Updates, Deprecations |

### บล็อก / ข่าวสาร (Blog) — `/blog/*`

| หน้า | Route | เนื้อหา |
|------|-------|--------|
| **Blog Index** | `/blog` | Featured Post, Category Filter, Tag Cloud, Pagination, Search |
| **Category** | `/blog/category/[category]` | ไล่รายการตามหมวด |
| **Tag** | `/blog/tag/[tag]` | ไล่รายการตามแท็ก |
| **Article Detail** | `/blog/[slug]` | MDX, TOC, Code Blocks, Author, Date, Reading Time, Related, Share, Comments |
| **Author** | `/blog/author/[author]` | Author Profile + Posts |

**หมวดหมู่บล็อก:**
| Category | ตัวอย่างเนื้อหา | กลุ่มผู้อ่าน |
|----------|---------------|------------|
| **Google Workspace** | วิธีซื้อ, เปรียบเทียบแพ็กเกจ, เพิ่มผู้ใช้, SSO | ผู้ดูแลระบบ |
| **Microsoft 365** | Teams, SharePoint, Licensing | ผู้ดูแลระบบ |
| **Adobe** | Creative Cloud, Firefly, เปรียบเทียบกับ FOSS | ดีไซเนอร์ |
| **Hardware** | รีวิวเซิร์ฟเวอร์, วิธีเลือก CPU/RAM, Refurbished คุ้มไหม | ช่างเทคนิค, DevOps |
| **Open Source** | Linux, PostgreSQL, Docker, FOSS Alternatives | Dev, Sysadmin |
| **IT Security** | 2FA, Ransomware, Backup, Security Audit | IT Manager |
| **Web3 / Payment** | Crypto Payment, Wallet, Lightning Network | Dev, ช่างเทคนิค |
| **Case Study** | ผลงานลูกค้าจริง | ทุกกลุ่ม |

### เกี่ยวกับเรา (About) — `/about/*`

| หน้า | Route | เนื้อหา |
|------|-------|--------|
| **About Us** | `/about` | Company Overview, Mission, Vision, Values, Stats, Timeline |
| **Our Story** | `/about/our-story` | ก่อตั้ง, จุดพัฒนาการ, วิสัยทัศน์, ก้าวสำคัญ |
| **ทีมงาน** | `/about/team` | Team Members, Roles, Expertise, Photos |
| **Partner Status** | `/about/partners` | Google/Microsoft/Adobe Partner รายละเอียด, Certifications |
| **ผลงาน / Case Studies** | `/about/portfolio` | Project Gallery, Client Testimonials, Results/Metrics |
| **รับรองควณภาพ** | `/about/certifications` | ISO, Partner Levels, Awards |

### ติดต่อเรา (Contact) — `/contact`

```
1. Page Header: ติดต่อเรา
2. Contact Info Cards
   - ที่อยู่: 136/34 ถนนประดิพัทธ์ แขวงพญาไท เขตพญาไท กรุงเทพมหานคร 10400
   - โทรศัพท์, อีเมล, LINE OA, เวลาทำการ
3. Contact Form
   ├── ชื่อ, บริษัท, Email, โทรศัพท์
   ├── หัวข้อที่ต้องการติดต่อ (Dropdown: ขอใบเสนอราคา / สอบถามซอฟต์แวร์ / สอบถามฮาร์ดแวร์ / สอบถามบริการ / อื่นๆ)
   ├── รายละเอียด (Textarea)
   ├── ผนวกแนบไฟล์ (สำหรับ Requirement Spec)
   ├── [ยินยอมนโยบายความเป็นส่วนตัว]
   └── [ส่งข้อความ] → Success → Email Notification
4. Map (Google Maps Embed — 136/34 ถนนประดิพัทธ์)
5. Alternative Channels
   - LINE OA, Facebook Messenger, Discord, GitHub Issues
```

---

## 🌐 ฟังก์ชันพิเศษ (ทุกหน้า)

### 1. AI Chatbot
```
- ไอคอนลอยมุมขวาล่าง (มือถือ: ขวาล่าง / เดสก์ท็อป: ขวาล่าง)
- คลิกเปิด-ปิด Chat Panel (320×480px, Mobile: Full Screen Bottom Sheet)
- ความสามารถ:
  - ตอบคำถามเกี่ยวกับสินค้า (อ่านจาก DB)
  - แนะนำสินค้าตามความต้องการ ("ฉันมีทีม 50 คน")
  - ช่วยเลือกแพ็กเกจ License
  - เชื่อมต่อมายัง Contact Form / นัดหมาย
  - อ้างอิงเอกสารจาก /docs (RAG)
- Implementation: Vercel AI SDK + Streaming Response + Open WebUI fallback
- Context: จำบทสนทนา, Referrer URL, Cart Items
```

### 2. Web3 Wallet Integration
```
- ไอคอนกระเป๋าเงิน (Header + Footer)
- แสดงสถานะ: "Connect Wallet" / "0x1234…abcd (Connected)"
- คลิกเปิด Modal:
  ├── MetaMask (Injected Provider)
  ├── WalletConnect (QR)
  └── Coinbase Wallet
- เมื่อ Connect แล้ว:
  ├── แสดงยอดคงเหลือ (ถ้าเชื่อม LND → Lightning Balance)
  ├── แสดงประวัติธุรกรรม (ถ้าเคยซื้อด้วย Crypto)
  └── ปุ่ม "ชำระด้วย Crypto" ใน Checkout
- Security: ไม่เก็บ Private Key, ผู้ใช้ยืนยันใน Wallet เท่านั้น
- รองรับ: BTC (Lightning/Liquid), ETH, USDT (ERC-20/Polygon)
```

### 3. Search (Global)
```
- Cmd+K / Ctrl+K เปิด Search Modal
- Sources: Products, Blog, Docs, FAQs
- Provider: Meilisearch (Self-hosted on Optiplex 7040) + Algolia Fallback
- Typo-tolerant, Thai Language Support
- Results: Highlighted snippet, Type Badge, Keyboard Navigation
```

### 4. Sticky Elements
```
- Header: Sticky + Shrink on scroll
- Announcement Bar: Dismissible
- Product Detail: ราคา + Add to Cart (Mobile)
- Back to Top: แสดนเมื่อ scroll > 400px
- Compare Bar: เมื่อเลือกเปรียบเทียบสินค้า
```

---

## 📁 File Structure (Next.js 16 App Router)

```
microtronic-web/
├── src/
│   ├── app/
│   │   ├── (marketing)/                    # Route Group: หน้าการตลาด (Static)
│   │   │   ├── layout.tsx                  # Marketing Layout (Header/Footer มาตรฐาน)
│   │   │   ├── page.tsx                    # Homepage /
│   │   │   ├── about/
│   │   │   │   ├── page.tsx                # /about
│   │   │   │   ├── our-story/page.tsx
│   │   │   │   ├── team/page.tsx
│   │   │   │   ├── partners/page.tsx
│   │   │   │   └── portfolio/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── pricing/page.tsx            # (ถ้ามีหน้าเปรียบเทียบราคารวม)
│   │   │
│   │   ├── (shop)/                        # Route Group: ร้านค้า (ISR)
│   │   │   ├── layout.tsx                  # Shop Layout (Category Nav, Filter Sidebar)
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx                # /shop
│   │   │   │   ├── licenses/
│   │   │   │   │   ├── page.tsx            # /shop/licenses
│   │   │   │   │   └── [slug]/page.tsx     # /shop/licenses/[slug]
│   │   │   │   ├── hardware/
│   │   │   │   │   ├── page.tsx            # /shop/hardware
│   │   │   │   │   └── [slug]/page.tsx     # /shop/hardware/[slug]
│   │   │   │   └── services/
│   │   │   │       ├── page.tsx            # /shop/services
│   │   │   │       └── [slug]/page.tsx     # /shop/services/[slug]
│   │   │   └── cart/page.tsx               # /cart
│   │   │
│   │   ├── (checkout)/                     # Route Group: Checkout (Protected, No Cache)
│   │   │   ├── layout.tsx                  # Minimal Layout (no sidebar)
│   │   │   └── checkout/
│   │   │       ├── page.tsx                # /checkout (Multi-step, Client State)
│   │   │       ├── success/page.tsx
│   │   │       └── failed/page.tsx
│   │   │
│   │   ├── (account)/                      # Route Group: บัญชีผู้ใช้ (Protected)
│   │   │   ├── layout.tsx                  # Account Layout (Sidebar)
│   │   │   └── account/
│   │   │       ├── page.tsx                # /account (Dashboard)
│   │   │       ├── profile/page.tsx
│   │   │       ├── orders/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── licenses/page.tsx
│   │   │       ├── downloads/page.tsx
│   │   │       ├── addresses/page.tsx
│   │   │       ├── coupons/page.tsx
│   │   │       ├── notifications/page.tsx
│   │   │       ├── security/page.tsx
│   │   │       └── api-keys/page.tsx
│   │   │
│   │   ├── (auth)/                         # Route Group: Auth
│   │   │   ├── layout.tsx                  # Centered Card Layout
│   │   │   └── auth/
│   │   │       ├── login/page.tsx
│   │   │       ├── register/page.tsx
│   │   │       ├── forgot-password/page.tsx
│   │   │       ├── reset-password/page.tsx
│   │   │       └── verify-email/page.tsx
│   │   │
│   │   ├── developers/                     # Route Group: Developer Portal
│   │   │   ├── layout.tsx                  # Docs-style Sidebar Layout
│   │   │   ├── page.tsx                    # /developers
│   │   │   ├── api-docs/
│   │   │   │   ├── page.tsx                # /developers/api-docs
│   │   │   │   └── [section]/page.tsx
│   │   │   ├── tools/page.tsx
│   │   │   ├── webhooks/page.tsx
│   │   │   ├── status/page.tsx
│   │   │   └── community/page.tsx
│   │   │
│   │   ├── docs/                           # Route Group: Documentation (MDX)
│   │   │   ├── layout.tsx                  # Sidebar + TOC Layout
│   │   │   ├── page.tsx                    # /docs
│   │   │   └── [...slug]/page.tsx          # /docs/[...slug]
│   │   │
│   │   ├── blog/                           # Route Group: Blog (MDX)
│   │   │   ├── page.tsx                    # /blog
│   │   │   ├── category/[category]/page.tsx
│   │   │   ├── tag/[tag]/page.tsx
│   │   │   ├── author/[author]/page.tsx
│   │   │   └── [slug]/page.tsx              # /blog/[slug]
│   │   │
│   │   ├── admin/                          # Route Group: Admin (RBAC Protected)
│   │   │   ├── layout.tsx                  # Admin Layout (Sidebar + Topbar)
│   │   │   ├── page.tsx                    # /admin (Dashboard)
│   │   │   ├── products/
│   │   │   │   ├── page.tsx                # List
│   │   │   │   ├── new/page.tsx            # Create
│   │   │   │   └── [id]/edit/page.tsx      # Edit
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx                # List + Filter
│   │   │   │   └── [id]/page.tsx           # Detail + Refund/License Issue
│   │   │   ├── customers/page.tsx
│   │   │   ├── licenses/page.tsx           # Issue / Revoke / Transfer
│   │   │   ├── coupons/page.tsx
│   │   │   ├── content/
│   │   │   │   ├── blog/page.tsx           # Blog CRUD
│   │   │   │   └── docs/page.tsx           # Docs CRUD
│   │   │   ├── users/page.tsx              # User Management
│   │   │   ├── reports/
│   │   │   │   ├── revenue/page.tsx
│   │   │   │   ├── licenses/page.tsx
│   │   │   │   └── customers/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── audit-logs/page.tsx
│   │   │
│   │   ├── api/                            # Route Handlers (REST API)
│   │   │   ├── auth/[...nextauth]/route.ts  # NextAuth Handler
│   │   │   ├── v1/                         # Public/Authenticated API v1
│   │   │   │   ├── products/route.ts
│   │   │   │   ├── products/[id]/route.ts
│   │   │   │   ├── licenses/
│   │   │   │   │   ├── validate/route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   ├── fx-rate/route.ts
│   │   │   │   ├── vat-calc/route.ts
│   │   │   │   └── account/
│   │   │   │       ├── profile/route.ts
│   │   │   │       ├── orders/route.ts
│   │   │   │       ├── orders/[id]/route.ts
│   │   │   │       └── licenses/route.ts
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/route.ts         # Payment Gateway Webhook
│   │   │   │   ├── crypto/route.ts         # Blockchain Event Listener
│   │   │   │   └── google/route.ts          # Google Workspace Events
│   │   │   └── ai/chat/route.ts            # AI Chatbot (Streaming)
│   │   │
│   │   ├── layout.tsx                      # Root Layout (HTML, Providers, Global CSS)
│   │   ├── globals.css                     # Tailwind 4 + Design Tokens + Theme
│   │   ├── not-found.tsx                   # 404
│   │   ├── error.tsx                       # Error Boundary
│   │   ├── loading.tsx                     # Loading UI
│   │   ├── sitemap.ts                      # Auto Sitemap
│   │   ├── robots.ts                       # Robots.txt
│   │   ├── manifest.ts                     # PWA Manifest
│   │   └── opengraph-image.tsx             # Dynamic OG Image
│   │
│   ├── components/
│   │   ├── ui/                             # Design System Primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Radio.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Sheet.tsx                   # Drawer (Mobile Filter)
│   │   │   ├── Tabs.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── AnnouncementBar.tsx
│   │   │   ├── SearchModal.tsx             # Cmd+K
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── commerce/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── PriceDisplay.tsx
│   │   │   ├── SeatCalculator.tsx
│   │   │   ├── HardwareConfigurator.tsx
│   │   │   ├── FilterSidebar.tsx
│   │   │   ├── SortDropdown.tsx
│   │   │   ├── CompareBar.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   ├── LicenseKeyDisplay.tsx
│   │   │   └── TrustBadges.tsx
│   │   ├── checkout/
│   │   │   ├── CheckoutStepper.tsx
│   │   │   ├── StepContactInfo.tsx
│   │   │   ├── StepShipping.tsx
│   │   │   ├── StepPayment.tsx
│   │   │   ├── PaymentMethodPromptPay.tsx
│   │   │   ├── PaymentMethodBankTransfer.tsx
│   │   │   ├── PaymentMethodCrypto.tsx
│   │   │   ├── PaymentMethodCard.tsx
│   │   │   └── StepConfirm.tsx
│   │   ├── web3/
│   │   │   ├── WalletConnectButton.tsx
│   │   │   ├── WalletModal.tsx
│   │   │   ├── WalletProvider.tsx            # Wagmi/viem Context
│   │   │   └── LightningBalance.tsx
│   │   ├── ai/
│   │   │   ├── ChatWidget.tsx
│   │   │   ├── ChatPanel.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── ChatInput.tsx
│   │   ├── content/
│   │   │   ├── MDXComponents.tsx           # Custom MDX Renderers
│   │   │   ├── CodeBlock.tsx                # Shiki Syntax Highlight + Copy
│   │   │   ├── Callout.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   ├── Prose.tsx                    # Typography Wrapper
│   │   │   └── DocsSidebar.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── OAuthButtons.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   └── TwoFactorSetup.tsx
│   │   └── admin/
│   │       ├── AdminSidebar.tsx
│   │       ├── DataTable.tsx
│   │       ├── StatusBadge.tsx
│   │       ├── RevenueChart.tsx
│   │       ├── OrderStatusSelect.tsx
│   │       └── LicenseIssueModal.tsx
│   │
│   ├── lib/                                # Utilities & Business Logic
│   │   ├── auth/
│   │   │   ├── config.ts                    # NextAuth Config
│   │   │   ├── rbac.ts                      # Roles & Permissions
│   │   │   ├── permission-check.ts          # API Guard
│   │   │   └── session.ts                   # Session Helpers
│   │   ├── db/
│   │   │   ├── schema.ts                    # Drizzle Schema (ทั้งหมด)
│   │   │   ├── client.ts                    # Neon Client
│   │   │   └── queries/                     # Query Functions
│   │   │       ├── products.ts
│   │   │       ├── orders.ts
│   │   │       ├── licenses.ts
│   │   │       ├── users.ts
│   │   │       └── customers.ts
│   │   ├── pricing/
│   │   │   ├── engine.ts                    # Markup-based Pricing
│   │   │   ├── fx-rate.ts                   # BOT Rate (Cached)
│   │   │   └── vat.ts                       # VAT Calculation
│   │   ├── licenses/
│   │   │   ├── generator.ts                 # License Key Generation
│   │   │   ├── provisioner-google.ts        # Google Provisioning API
│   │   │   ├── provisioner-microsoft.ts     # Microsoft Graph
│   │   │   └── provisioner-adobe.ts         # Adobe Admin (Manual Fallback)
│   │   ├── payments/
│   │   │   ├── promptpay.ts                 # QR Generation
│   │   │   ├── bank-transfer.ts             # Slip Upload + Verify
│   │   │   ├── crypto.ts                    # Chain Listener
│   │   │   └── gateway.ts                   # Card Gateway Adapter
│   │   ├── web3/
│   │   │   ├── config.ts                    # Wagmi Config
│   │   │   ├── lnd.ts                       # LND API Client
│   │   │   └── chains.ts                    # BTC/ETH/USDT Config
│   │   ├── ai/
│   │   │   ├── chat.ts                      # Vercel AI SDK
│   │   │   ├── rag.ts                       # Docs Retrieval
│   │   │   └── tools.ts                     # Tool Definitions
│   │   ├── email/
│   │   │   ├── templates/                   # React Email
│   │   │   │   ├── OrderConfirmation.tsx
│   │   │   │   ├── LicenseKey.tsx
│   │   │   │   ├── Invoice.tsx
│   │   │   │   ├── PasswordReset.tsx
│   │   │   │   └── LicenseExpiring.tsx
│   │   │   └── send.ts
│   │   ├── integrations/
│   │   │   ├── google-workspace.ts         # Admin SDK
│   │   │   ├── microsoft-graph.ts
│   │   │   ├── google-drive.ts              # Backup (Google-First)
│   │   │   ├── google-sheets.ts             # Reports
│   │   │   └── google-calendar.ts           # Renewal Reminders
│   │   ├── search/
│   │   │   └── meilisearch.ts               # Search Client
│   │   ├── validation/
│   │   │   └── schemas.ts                  # Zod Schemas
│   │   └── utils/
│   │       ├── format.ts                    # Currency, Date, Number (TH locale)
│   │       ├── slugify.ts
│   │       ├── seo.ts                       # Metadata Builders
│   │       └── analytics.ts                 # Event Tracking
│   │
│   ├── content/                             # MDX Content (File-based)
│   │   ├── blog/
│   │   │   ├── 2026-09-google-workspace-pricing.mdx
│   │   │   ├── 2026-09-dell-optiplex-7040-review.mdx
│   │   │   └── ...
│   │   ├── docs/
│   │   │   ├── quick-start.mdx
│   │   │   ├── choose-license.mdx
│   │   │   ├── choose-hardware.mdx
│   │   │   ├── user-management.mdx
│   │   │   ├── security.mdx
│   │   │   ├── billing.mdx
│   │   │   ├── troubleshooting.mdx
│   │   │   └── changelog.mdx
│   │   └── legal/
│   │       ├── privacy-policy.mdx           # PDPA Thailand
│   │       ├── terms-of-service.mdx
│   │       └── refund-policy.mdx
│   │
│   ├── config/
│   │   ├── site.ts                          # Site Metadata, Nav, Social
│   │   ├── products.ts                      # Product Categories, Vendors
│   │   ├── pricing.ts                       # Markup Config, Tax Rates
│   │   └── features.ts                      # Feature Flags
│   │
│   ├── types/
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── license.ts
│   │   ├── user.ts
│   │   └── index.ts
│   │
│   ├── hooks/                               # React Hooks
│   │   ├── use-cart.ts
│   │   ├── use-wallet.ts
│   │   ├── use-media-query.ts
│   │   ├── use-debounce.ts
│   │   └── use-fx-rate.ts
│   │
│   ├── actions/                             # Server Actions ('use server')
│   │   ├── cart.ts
│   │   ├── checkout.ts
│   │   ├── license.ts
│   │   ├── account.ts
│   │   ├── admin/products.ts
│   │   ├── admin/orders.ts
│   │   └── newsletter.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css                      # Design Tokens
│   │
│   ├── i18n/                                # Internationalization (Phase 2)
│   │   ├── th.json
│   │   └── en.json
│   │
│   └── public/
│       ├── images/
│       │   ├── products/
│       │   ├── hardware/
│       │   ├── team/
│       │   ├── case-studies/
│       │   └── og/                          # OG Images
│       ├── icons/                           # PWA Icons
│       ├── fonts/                           # Self-hosted (fallback)
│       └── documents/                       # Tax Invoices, Terms
│
├── e2e/                                    # Playwright Tests
│   ├── auth.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── license-purchase.spec.ts
│   └── admin.spec.ts
├── public/
├── scripts/                                 # Utility & Cron Scripts
│   ├── seed.ts                              # Database Seed
│   ├── backup-to-drive.ts                   # Google-First Backup
│   ├── dashboard-to-sheets.ts
│   ├── license-renewal-reminders.ts
│   └── generate-og-image.tsx
├── drizzle/                                 # Migrations
│   ├── 0000_initial.sql
│   └── meta/
├── public/
├── middleware.ts                            # Auth Guard, Geo, Bot Protection
├── next.config.ts                           # Next.js Config
├── tailwind.config.ts                       # Tailwind Config (v4 ใช้ CSS-first)
├── tsconfig.json
├── pnpm-workspace.yaml
├── package.json
├── pnpm-lock.yaml
├── .env.example
├── .env.local                               # ⚠️ GIT-IGNORE (Secrets)
├── .eslintrc.json
├── playwright.config.ts
├── vitest.config.ts
├── Dockerfile                               # Multi-stage Build
├── docker-compose.yml                       # Local Dev Stack
├── docker-compose.prod.yml                  # Production (NUC7JY)
├── Caddyfile                                # Reverse Proxy + Auto-HTTPS
└── README.md
```

---

## 🗺️ Route Summary (สรุปทั้งหมด)

| Category | Routes | Count |
|----------|--------|-------|
| **Marketing** | `/`, `/about`, `/about/our-story`, `/about/team`, `/about/partners`, `/about/portfolio`, `/about/certifications`, `/contact` | 8 |
| **Shop** | `/shop`, `/shop/licenses`, `/shop/licenses/[slug]`, `/shop/hardware`, `/shop/hardware/[slug]`, `/shop/services`, `/shop/services/[slug]`, `/cart` | 8 |
| **Checkout** | `/checkout`, `/checkout/success`, `/checkout/failed` | 3 |
| **Account** | `/account`, `/account/profile`, `/account/orders`, `/account/orders/[id]`, `/account/licenses`, `/account/downloads`, `/account/addresses`, `/account/coupons`, `/account/notifications`, `/account/security`, `/account/api-keys` | 11 |
| **Auth** | `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/verify-email` | 5 |
| **Developers** | `/developers`, `/developers/api-docs`, `/developers/api-docs/[section]`, `/developers/tools`, `/developers/webhooks`, `/developers/status`, `/developers/community` | 7 |
| **Docs** | `/docs`, `/docs/[...slug]` | 2 (dynamic 10+ pages) |
| **Blog** | `/blog`, `/blog/category/[category]`, `/blog/tag/[tag]`, `/blog/author/[author]`, `/blog/[slug]` | 5 |
| **Admin** | `/admin`, `/admin/products`, `/admin/products/new`, `/admin/products/[id]/edit`, `/admin/orders`, `/admin/orders/[id]`, `/admin/customers`, `/admin/licenses`, `/admin/coupons`, `/admin/content/blog`, `/admin/content/docs`, `/admin/users`, `/admin/reports/revenue`, `/admin/reports/licenses`, `/admin/reports/customers`, `/admin/settings`, `/admin/audit-logs` | 17 |
| **API** | `/api/auth/*`, `/api/v1/*`, `/api/webhooks/*`, `/api/ai/chat` | ~15 |
| **Meta** | `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image` | 4 |
| **รวม** | | **~85 routes** |

---

## 🎨 Design System

### Colors
```css
/* Primary — Trust (Blue) */
--color-primary-50:  #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-200: #bfdbfe;
--color-primary-300: #93c5fd;
--color-primary-400: #60a5fa;
--color-primary-500: #3b82f6;
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;
--color-primary-800: #1e40af;
--color-primary-900: #1e3a8a;   /* Main */
--color-primary-950: #172554;

/* Secondary — Growth (Green) */
--color-secondary-500: #10b981;
--color-secondary-600: #059669;
--color-secondary-700: #047857;

/* Accent — Action (Red) */
--color-accent-500: #ef4444;
--color-accent-600: #dc2626;

/* Neutral */
--color-neutral-50:  #fafafa;
--color-neutral-100: #f5f5f5;
--color-neutral-200: #e5e5e5;
--color-neutral-300: #d4d4d4;
--color-neutral-400: #a3a3a3;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
--color-neutral-950: #0a0a0a;
```

### Typography
| Role | Font | Size | Weight |
|------|------|------|--------|
| **Display** | Inter Variable | 3.5rem → 2rem | 800 |
| **H1** | Inter Variable | 2.5rem → 2rem | 700 |
| **H2** | Inter Variable | 2rem → 1.5rem | 700 |
| **H3** | Inter Variable | 1.5rem → 1.25rem | 600 |
| **Body L** | Inter Variable | 1.125rem | 400 |
| **Body** | Inter Variable | 1rem | 400 |
| **Body S** | Inter Variable | 0.875rem | 400 |
| **Caption** | Inter Variable | 0.75rem | 400 |
| **Code** | JetBrains Mono | 0.875rem | 400 |
| **Price** | Inter Variable | 2rem | 800 |

### Spacing Scale
`0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24` (0.25rem base — Tailwind default)

### Radius
| Token | Value | Use |
|-------|-------|-----|
| `rounded-sm` | 0.375rem | Badge, Tag |
| `rounded-md` | 0.5rem | Button, Input |
| `rounded-lg` | 0.75rem | Card |
| `rounded-xl` | 1rem | Feature Box |
| `rounded-2xl` | 1.5rem | Hero Section |
| `rounded-full` | 9999px | Avatar, Pill |

### Breakpoints (Mobile-first)
| Name | Min Width | Target Device |
|------|-----------|---------------|
| `sm` | 640px | Large Phone |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large Desktop |

---

## 🔗 Related Documents
- [Technical Planning](/web-development-planning) — Architecture, Patterns, Conventions
- [Security & Auth](/add-security_system) — RBAC, Middleware, API Protection
- [Milestone Planning](/ask) — Timeline, Deliverables
- [Hardware Infrastructure](/hardware-infrastructure) — Deployment Targets
- [To-Do List](/To-do-List) — Implementation Tasks

---

> **Owner**: DarumaKlang (Lead Dev)  
> **Last Updated**: 2026-09-26