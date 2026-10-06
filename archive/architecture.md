# Architecture — ระบบ Micro-Account (ต้นแบบของ MBSuite)

> สรุปจาก `Micro-Account/docs/ARCHITECTURE.md` + ตรวจสอบกับ `package.json` จริง
> ⚠️ จุดที่เอกสารต้นทางขัดแย้งกับโค้ด ระบุไว้ด้านล่าง

> 📌 **ความสัมพันธ์กับสินค้า** (ยืนยันจากพี่ฆัง 2026-09-26)
> เอกสารนี้อธิบาย **Micro-Account** ซึ่งเป็น **ต้นแบบ (prototype) ของ MBSuite** — สินค้าหลักที่ขาย
> ส่วน **MBSuite** เองอยู่ที่ `01-PRODUCTS-BUSINESS/Micro-Business-Suite` (`micro-business-suite` v0.1.0)
> 🚫 สถาปัตยกรรมของ MBSuite ยังไม่ได้ตรวจในเอกสารนี้ — ดู [Product Catalog](/product-catalog#42-mbsuite--สินค้าหลักที่ขาย)
>
> สินค้าอีก 2 ชิ้นที่ยืนยันแล้ว: **Vessuyan App** (Next.js 16 + Upstash + Vercel cron) · **THOTH CMS** (ยังไม่มีโค้ดในเครื่องนี้)

---

## 📐 Stack

### ตามเอกสาร (`docs/ARCHITECTURE.md`)
| ชั้น | เทคโนโลยี |
|-----|-----------|
| App | Next.js (App Router) + TypeScript |
| Database | PostgreSQL (Neon) |
| Auth | NextAuth credentials |

### ตามโค้ดจริง (`package.json`) — เป็นแหล่งที่เชื่อถือได้สูงกว่า
| ชั้น | แพ็กเกจ | เวอร์ชัน |
|-----|--------|----------|
| Framework | `next` | `^16.2.1` |
| UI | `react` / `react-dom` | `^19.2.4` |
| ภาษา | `typescript` | `^5` |
| Styling | `tailwindcss`, `@tailwindcss/postcss` | `^4.2.2` |
| UI utilities | `lucide-react`, `framer-motion`, `clsx`, `tailwind-merge` | — |
| DB driver | `@vercel/postgres`, `pg` | `^0.10.0`, `^8.20.0` |
| Auth | `@react-oauth/google`, `jose`, `bcryptjs` | — |
| PDF/Excel | `jspdf`, `jspdf-autotable`, `exceljs` | — |
| Barcode | `qrcode.react`, `react-barcode` | — |
| Scheduler | `node-cron` | `^4.2.1` |
| Google | `googleapis` | `^171.4.0` |
| Misc | `axios`, `dotenv`, `node-fetch` | — |

### ⚠️ ข้อขัดแย้งที่ต้องแก้ในเอกสารต้นทาง
| หัวข้อ | เอกสารเขียนว่า | โค้ดจริงเป็น | สถานะ |
|--------|--------------|------------|--------|
| **Database** | PostgreSQL (Neon) | `@vercel/postgres` + `pg` | 🚫 ต้องยืนยันว่าตัวไหนคือตัวจริง แล้วแก้ `ARCHITECTURE.md` |
| **Auth** | NextAuth credentials | `@react-oauth/google` + `jose` + `bcryptjs` (**ไม่มี next-auth**) | 🚫 ต้องแก้ `ARCHITECTURE.md` |

> **บันทึกการตัดสินใจ**: ควรเพิ่มรายการนี้ใน `docs/DECISIONS.md` ของโปรเจกต์ Micro-Account

---

## 🧩 โมดูลหลัก (Core Modules)

| โมดูล | ขอบเขต |
|-------|--------|
| **Sales** | ใบเสนอราคา (quotations) · ใบแจ้งหนี้ (invoices) · การรับเงิน (payments) |
| **Purchase** | ค่าใช้จ่าย (expenses) · ใบสำคัญจ่าย (vouchers) |
| **Accounting** | รายการสมุดรายวัน (journal entries) + ผังบัญชี (chart of accounts) |
| **Access control** | RBAC ผ่าน groups / group_permissions / user_groups |
| **Settings / integrations** | ข้อมูลบริษัท + Google integration |

> **หมายเหตุ**: README ระบุว่า "โมดูลเปิดปิดได้" — กลไกเปิด/ปิดโมดูลควรอธิบายเพิ่มในเอกสารนี้เมื่อมีการยืนยัน

---

## 🔄 Canonical Data Flow

```
1. สร้างเอกสารธุรกิจ (business document)
   → invoice | expense | payment_voucher | payment
              ↓
2. สร้างรายการบัญชีใน journal_entries
   (debit_account_id / credit_account_id / amount)
              ↓
3. รายงาน / Dashboard อ่านจาก journal ที่ normalize แล้ว
              ↓
4. บังคับสิทธิ์ด้วย RBAC
   (groups → group_permissions → user_groups)
```

> **หลักการ**: Double-entry **บังคับ** สำหรับทุกเหตุการณ์ทางธุรกิจ — เอกสารธุรกิจต้องสร้าง journal เสมอ

---

## 🔐 Access Standard

| หัวข้อ | ค่า |
|--------|-----|
| **Role baseline** | `superadmin` · `admin` · `user` |
| **Permission model** | module/action ผ่าน RBAC |
| **Helper standard** | `lib/core-standards.ts` |
| **Master guardrail** | `CORE_RULES.md` |

### Actions ที่รองรับ
`create` · `read` · `update` · `delete` · `export` · `manage`

### Helper ที่ต้องใช้
- `normalizeRole()` — ทำให้ค่า role เป็น canonical (lowercase)
- `canAccessAdmin()` — ตรวจขอบเขต admin

> รายละเอียดเต็ม: `Micro-Account/docs/RBAC_STANDARD.md` · [Business Rules](/business-rules)

---

## 💱 แหล่งข้อมูลเรต FX

**Endpoint**: `GET /api/fx-rate`

| หัวข้อ | ค่า |
|--------|-----|
| **สิ่งที่คืน** | เรต USD/THB ล่าสุด + series 30 วัน + trend (low/high/%change) |
| **แหล่งข้อมูล** | Bank of Thailand reference rate ผ่าน `https://api.frankfurter.dev/v2?providers=BOT` |
| **Cache (server-side)** | ล่าสุด 6 ชม. · series 24 ชม. (in-memory Map) |
| **ใช้ที่ไหน** | หน้าสร้าง Invoice "FX Mode" — prefill `fxRate` และเฝ้าดูการเคลื่อนไหวของสกุลเงินก่อนออกบิล Dominick |

> **กฎ**: ต้องใช้เรตจริงวันออกบิล + เก็บที่มาไว้ — **ห้ามเดา** (กฎ #1)

---

## 🛡️ Stability Rules (กฎเสถียรภาพ)

| กฎ | ความหมาย |
|----|---------|
| **Preserve historical accounting evidence** | หลักฐานทางบัญชีย้อนหลังต้องถูกเก็บไว้เสมอ |
| **Backward compatibility required** | การเปลี่ยนแปลงต้องไม่ทำให้ของเดิมพัง |
| **No destructive schema operations in production** | ห้าม DROP TABLE / สร้างตารางใหม่เพื่อแก้ column mismatch |

> **ห้ามทำ** (`OPERATION_RUNBOOK.md`): `DROP TABLE` · สร้างตารางใหม่เพื่อแก้ schema · mass destructive delete ใน production

---

## 🧪 การทดสอบ & Governance

| คำสั่ง | หน้าที่ |
|-------|-------|
| `npm test` | `node --test tests/**/*.test.mjs` |
| `npm run check:knowledge` | ตรวจความสอดคล้องเอกสารกับโค้ด (`scripts/verify-knowledge-sync.mjs`) |
| `npm run check:consistency` | ตรวจสอบสม่ำเสมอรายสัปดาห์ (`scripts/weekly-consistency-audit.mjs`) |
| `npm run lint` | ESLint |
| `npm run tax:update` | งานอัปเดตภาษีตามรอบเวลา |
| `npm run ai:audit` | งาน AI Audit |

**CI enforcement**:
- `.github/workflows/knowledge-guard.yml`
- `.github/workflows/*` (PR/weekly)
- `tests/governance-guards.test.mjs`
- `.github/pull_request_template.md`

---

## 🔗 Related Documents
- [Business Rules](/business-rules) — กฎบัญชี/ภาษี
- [Operations Runbook](/archive/operations-runbook) — ขั้นตอน deploy/กู้คืน
- [Decisions Log](/decisions-log) — การตัดสินใจ
- [Company Profile](/company-profile)

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **แหล่งอ้างอิง**: `Micro-Account/docs/ARCHITECTURE.md`, `RBAC_STANDARD.md`, `KNOWLEDGE_PACK.md`, `package.json`