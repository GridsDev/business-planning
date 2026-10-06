# Company Profile — บริษัท ไมโครทรอนิกส์ (ไทยแลนด์) จำกัด

> โปรไฟล์บริษัท — รวบรวมจากเอกสารต้นทางที่ตรวจสอบแล้วเท่านั้น
> ทุกข้อมูลมีเครื่องหมายกำกับสถานะความน่าเชื่อถือ เพื่อไม่ให้มีการอ้างสิ่งที่ยังไม่มีหลักฐาน

---

## 🔖 สัญลักษณ์ความน่าเชื่อถือ

| เครื่องหมาย | ความหมาย |
|-----------|----------|
| ✅ | **ยืนยันแล้ว** — มีหลักฐานในไฟล์ต้นทาง/ระบบจริง (ระบุแหล่ง) |
| ⚠️ | **ยังไม่ยืนยัน** — มีการอ้างต่อมา แต่ไม่มีหลักฐานยืนยัน → ห้ามใช้อ้างลูกค้า |
| 🚫 | **ไม่มีข้อมูล** — ยังไม่เคยบันทึกไว้ → ต้องเก็บข้อมูลก่อน |

> **หลักการ**: กฎ #1 (ห้ามเดา) — เอกสารนี้ห้ามมีตัวเลข/ชื่อ/สถานะใดที่ไม่มีแหล่งอ้างอิงชัดเจน

---

## 🏢 ข้อมูลบริษัท

| รายการ | ข้นอยู่ | ค่า | แหล่ง |
|--------|--------|-----|------|
| **ชื่อ (อังกฤษ)** | ✅ | MICROTRONIC (THAILAND) | `Micro-Account/README.md`, `docs/BUSINESS_CONTEXT.md` |
| **ที่ตั้งสำนักงาน** | 🚫 | — | ยังไม่มีข้อมูลในเอกสารต้นทาง |
| **เลขทะเบียนนิติบุคคล** | 🚫 | — | ยังไม่มีข้อมูล |
| **วัตถุประสงค์ในทะเบียน** | 🚫 | — | ยังไม่มีข้อมูล (ห้ามเดา — ให้ดึงจากหนังสือรับรอง/DBD) |
| **โทรศัพท์** | 🚫 | — | ยังไม่มีข้อมูล (ไฟล์ `COMPLETE_MANUAL.md` ที่มีเบอร์เป็นตัวอย่าง ไม่ใช่ของจริง) |
| **อีเมล** | 🚫 | — | ยังไม่มีข้อมูล (`support@microtronic.dev` ในคู่มือเป็นค่าตัวอย่าง) |
| **เว็บไซต์** | ⚠️ | microtronic.biz | ยังไม่พบในเอกสารต้นทาง — ต้องยืนยันว่ามีโดเมนจริงและใครเป็นเจ้าของ |
| **LINE OA** | ✅ | HoraHackLife | `~/.config/opencode/AGENTS.md` |
| **เว็บบอร์ดนักพัฒนา** | ✅ | Discourse บน Optiplex 7040 (port 30000) | `Optiplex7040.md` |

---

## 🔍 จุดที่ต้องยืนยัน (สำคัญ — อย่าเพิ่งเขียนลงเว็บ)

> รายการนี้คือ **คำถามเปิด** ที่ต้องถามพี่ฆังก่อนนำข้อมูลไปใช้ต่อ

| # | คำถาม | ทำไมต้องรู้ |
|---|--------|----------|
| 1 | ~~บริษัทที่ใช้ Micro-Account คือ Microtronic เอง หรือบริษัทตัวกลางอีกแห่ง?~~ → ✅ **ตอบแล้ว 2026-09-26** | **Micro-Account เป็นโปรแกรมบัญชีของบริษัท Microtronic เอง** และเป็นต้นแบบของ MBSuite (ดู [Products](/product-catalog)) — ข้อนี้ทำให้ `BUSINESS_CONTEXT.md` ที่เรียกผู้ใช้ระบบว่า "ตัวกลาง" หมายถึง **บทบาทในการซื้อ-ขายต่อโซลูชันซอฟต์แวร์ของ Noventiq** ไม่ใช่ว่าเป็นคนละบริษัท |
| 2 | บริษัทมี **Google Partner / Microsoft Partner / Adobe Reseller** จริงหรือไม่? | เอกสารยืนยันเฉพาะว่า **Noventiq** เป็นซัพพลายเออร์ (Supplier) — ยังไม่ยืนยันสถานะ Partner แต่ละเจ้า |
| 3 | สัญญากับ Noventiq เป็น **Reseller หรือ Agent**? | มีผลต่อการรับรู้รายได้ (Agent vs Principal) และภาษี |
| 4 | ที่อยู่/เลขทะเบียน/โทรศัพท์/เว็บไซต์ คืออะไร? | จำเป็นสำหรับหน้า "ติดต่อเรา" และเอกสารเสนอราคา |
| — | ~~NUC7JY IP / สเปก~~ | 🚫 **ยกเลิก 2026-09-26** — พี่ฆังสั่งไม่ต้องยืนยัน เป็นเรื่องของ Lightning/IoT stack นอกขอบเขตเอกสารชุดนี้ |

---

## 🤝 โมเดลธุรกิจ (Intermediary / Agent Model)

✅ **ยืนยันแล้ว** — `Micro-Account/docs/BUSINESS_CONTEXT.md`

```
ซัพพลายเออร์ (เช่น Noventiq)
   │  ① รับใบเสนอราคา (QT)
   ▼
[ บริษัทตัวกลาง / ผู้ใช้ระบบ Micro-Account ]
   │  ② ออก QT ในนามตัวเอง + Markup
   ▼
ลูกค้า B2B (เช่น MICROTRONIC (THAILAND), Dominick)
   │
   ③ ได้ Invoice จากซัพพลายเออร์ → บันทึกเป็น Expense (ต้นทุน)
   ④ ออก Invoice ให้ลูกค้า → บันทึกเป็น Revenue (รายได้)
```

- **ลักษณะรายได้**: รายได้จากการให้บริการประสานงานและสิทธิ์การใช้งาน (Service/Agent Fee)
- **บุคคลสำคัญ** (`BUSINESS_CONTEXT.md`):
  - **Grids Jivapong** — เจ้าของระบบ / ผู้ประสานงานหลัก
  - **คุณ Teechada (จาก Noventiq)** — คู่ค้าหลักฝั่งซอฟต์แวร์ *(หมายเหตุ: ต้นฉบับเขียน "Adaptive/Adobe" — น่าจะพิมพ์ผิด ต้องยืนยันว่าเป็น Microsoft หรือ Adobe หรือทั้งคู่)*
  - **DarumaKlang** — Lead Developer ของโปรเจกต์ (`AGENTS.md`)

---

## 💎 จุดขายที่ยืนยันได้จากระบบจริง

| ข้อเด่น | หลักฐาน | สถานะ |
|--------|--------|--------|
| **ราคาคงที่เป็น % ไม่ใช่ตัวเลข THB** | `DECISIONS.md` 2026-09-21 — markup 25% บนต้นทุน USD | ✅ มีการตัดสินใจแล้ว |
| **คิดราคาจากต้นทุนจริงในวันออกบิล** | ตรวจ PDF ด้วย pdf-tools ก่อนบันทึกทุกครั้ง | ✅ บังคับใช้จริงแล้ว |
| **ระบบบัญชี+ภาษีในตัว** | `Micro-Account` — Next.js, PostgreSQL, RBAC, ภ.พ.30/36, WHT, Payroll | ✅ มี source code + tests |
| **คู่ค้าซัพพลายเออร์ชั้นนำ** | Noventiq (A/P รหัส 2110) | ✅ |
| **ระบบ AI ช่วยตรวจภาษี/ตรวจความผิดปกติ** | `npm run ai:audit`, `npm run tax:update` | ✅ มี jobs จริงใน `package.json` |
| **ใช้สิทธิ์ Google Workspace ให้คุ้มค่า** | GWS Business Plus 1 seat ฿1,000/เดือน + Drive 5TB | ✅ มีกฎ Google-First ใน `DECISIONS.md` |
| **ความเชี่ยวชาญด้าน Lightning/Bitcoin Node** | NUC7JY (Full Node) + Optiplex 7040 (LND) + Discourse | ✅ มีโครงสร้างจริง |
| **IoT / Automation** | Mosquitto + Node-RED + Prometheus/Grafana (เดินหน้าทำ) | ✅ บันทึกใน `To-do-List.md` (เดิม) |
| จำนวนลูกค้า/อายุกิจการ/รางวัล/การรับรอง | — | 🚫 ไม่มีข้อมูล |

---

## 📊 ลูกค้าที่มีข้อมูลยืนยัน

### Dominick — ลูกค้ารายหลักรายเดียวที่มีข้อมูลครบ

✅ ยืนยันแล้ว — `Micro-Account/docs/OPERATION_RUNBOOK.md` + `DECISIONS.md`

| รายการ | ค่า |
|--------|-----|
| **ชื่อลูกค้า** | บริษัท ดอมนิค (ประเทศไทย) จำกัด |
| **contact_id** | 1 |
| **ผู้ติดต่อ** | Somsak@dhrlt.com *(เก็บใน `OPERATION_RUNBOOK.md` — ควรจำกัดการเผยแพร่)* |
| **บริการ** | Google Workspace Business Starter |
| **จำนวนสิทธิ์** | 137 seats |
| **ต้นทุน/เดือน** | **USD 843.92** (ตรวจจาก PDF แล้ว) |
| **รอบบิล** | ทุกเดือน ภายในวันที่ **1–2** |
| **รูปแบบราคา (ต.ค. 2026 เป็นต้นไป)** | `843.92 × 1.25 × เรตวันออกบิล` |

#### ประวัติใบแจ้งหนี้ (จากระบบ)
| Invoice | เดือน | ยอดก่อน VAT | VAT | สถานะ |
|---------|-------|------------|-----|--------|
| INV028 | พ.ค. 2026 | 34,935 | 2,445.45 | paid |
| INV031 | ก.ค. 2026 | 34,935 | 2,445.45 | paid (ออก 6/7) |
| INV032 | ส.ค. 2026 | 34,935 | 2,445.45 | paid (ออก 4/8) |
| INV033 | ก.ย. 2026 | 34,935 | 2,445.45 | paid (ออก 1/9, ครบ 16/9) |
| INV030 | มิ.ย. 2026 | 4,200 | 294 | รายการแยกต่างหาก |

> ⚠️ ต.ค. 2026 เป็นงวดแรกที่ใช้ **markup 25%** — ยอดจริงขึ้นกับยอดเรียกเก็บของ Google เดือนนั้น + เรตวันออกบิล (**ห้ามใช้ยอดเก่าลอยๆ**)

### MICROTRONIC (THAILAND) — ไม่ใช่ลูกค้าของตัวเอง

> ✅ **ยืนยันจากพี่ฆัง เมื่อ 2026-09-26**: Micro-Account เป็น**โปรแกรมบัญชีของบริษัท Microtronic เอง**

| ประเด็น | ข้อสรุป |
|--------|---------|
| บริษัทเจ้าของ/ผู้ใช้ระบบ | **Microtronic (Thailand)** |
| บริษัทตัวกลาง (Intermediary) เป็นคนละบริษัทหรือไม่ | ❌ **ไม่มี** — ไม่ใช่คนละบริษัท |
| A/R รหัส 1121 = MICROTRONIC (THAILAND) ใน `BUSINESS_CONTEXT.md` | 🚫 **ยังไม่ยืนยัน** — พี่ฆังยืนยันเฉพาะว่าเจ้าของระบบคือ Microtronic แต่ยังไม่ได้ยืนยันว่า A/R 1121 เป็น persona/ตัวอย่าง หรือข้อมูลจริง |
| ลูกค้าจริงที่มีข้อมูลในระบบ | **Dominick** — contact_id 1 (ดูหัวข้อด้านบน) |

> 📌 **"ตัวกลาง (Intermediary)" ใน `BUSINESS_CONTEXT.md` ยังไม่ทราบความหมายจริง**
> 🚫 **ห้ามตีความเอง** — ยืนยันแล้วว่า Microtronic เป็นเจ้าของ Micro-Account
> แต่ยังไม่ได้ยืนยันว่าคำว่า "Intermediary" หมายถึงบทบาทซื้อ-ขายต่อโซลูชันของ Noventiq หรืออย่างอื่น
> → ดู [โมเดลธุรกิจ](#-โมเดลธุรกิจ-intermediary--agent-model) (ต้องรอคำยืนยัน)

---

## 🏗️ ระบบภายใน — Micro-Account

✅ ยืนยันจาก `Micro-Account/README.md` + `package.json` + `docs/`

ระบบบริหารบัญชีและภาษีอัตโนมัติ ใช้งานจริงในธุรกิจ (Dogfooding)

### โมดูลหลัก (จาก `ARCHITECTURE.md`)
| โมดูล | เนื้อหา |
|-------|--------|
| **Sales** | ใบเสนอราคา (quotations), ใบแจ้งหนี้ (invoices), การรับเงิน (payments) |
| **Purchase** | ค่าใช้จ่าย (expenses), ใบสำคัญจ่าย (vouchers) |
| **Accounting** | รายการสมุดรายวัน (journal entries) + ผังบัญชี (COA) |
| **Access control** | RBAC: groups / group_permissions / user_groups |
| **Settings / integrations** | ข้อมูลบริษัท + Google integration |

### ฟีเจอร์เพิ่มเติม (จาก `README.md` + scripts ใน `package.json`)
| ฟีเจอร์ | หลักฐาน |
|--------|-------|
| รอบบิลอัตโนมัติ (Recurring Billing) | ✅ README |
| โมดูลเปิด/ปิดได้ | ✅ README |
| เชื่อมต่อระบบ Google (คลาวด์/รายงานอัตโนมัติ) | ✅ README |
| อัปเดตข้อมูลภาษีตามรอบเวลา | ✅ `npm run tax:update` |
| AI Audit ตรวจความผิดปกติ | ✅ `npm run ai:audit` |
| PDF / Excel generation | ✅ `jspdf`, `jspdf-autotable`, `exceljs` |
| QR / Barcode | ✅ `qrcode.react`, `react-barcode` |
| เรียกเก็บบิลอัตโนมัติ | ✅ `node-cron` |
| เข้าถึง Google API | ✅ `googleapis` |
| เข้าสู่ระบบผ่าน Google OAuth | ✅ `@react-oauth/google`, `jose`, `bcryptjs` |
| AI Chat / ผู้ช่วยถาม-ตอบ | ⚠️ มีในโครงการแต่ยังไม่ได้ยืนยันว่าเปิดใช้จริง |

### Tech Stack (ตรวจจาก `package.json` จริง)
| ชั้น | เทคโนโลยี | เวอร์ชัน |
|-----|-----------|----------|
| Framework | Next.js (App Router) | `^16.2.1` |
| UI | React / React DOM | `^19.2.4` |
| ภาษา | TypeScript | `^5` |
| CSS | Tailwind CSS | `^4.2.2` |
| UI library | lucide-react, framer-motion, clsx, tailwind-merge | — |
| ฐานข้อมูล | `@vercel/postgres` + `pg` | `^0.10.0` / `^8.20.0` |
| Auth | `@react-oauth/google`, `jose`, `bcryptjs` | — |
| PDF/Excel | `jspdf`, `jspdf-autotable`, `exceljs` | — |
| Jobs | `node-cron` | `^4.2.1` |
| Google | `googleapis` | `^171.4.0` |
| Tests | `node --test` | — |

> ⚠️ **ข้อขัดแย้งที่ต้องแก้ในเอกสารต้นทาง**:
> - `docs/ARCHITECTURE.md` เขียนว่า DB = **Neon** แต่ `package.json` ติดตั้ง **@vercel/postgres** → ต้องยืนยันว่าใช้ตัวไหนจริง
> - `docs/ARCHITECTURE.md` เขียนว่า Auth = **NextAuth** แต่ `package.json` **ไม่มี next-auth** → ใช้ Google OAuth + jose จริง → ต้องแก้เอกสาร

> รายละเอียด: [Architecture](/archive/architecture) · [Business Rules](/business-rules) · [Operations Runbook](/archive/operations-runbook) · [Decisions Log](/decisions-log)

---

## 🖥️ ฮาร์ดแวร์ & โครงสร้างพื้นฐาน

| เครื่อง | บทบาท | หลักฐาน | สถานะ |
|--------|-------|--------|--------|
| **Dell Optiplex 7040** (192.168.1.202) | LND Node · PostgreSQL + PgAdmin · Discourse (พอร์ต 30000) · Node.js API Server | ✅ `Optiplex7040.md` | ✅ ยืนยัน |
| **NUC7JY** | Bitcoin Full Node (เชื่อมกับ LND) | ⚠️ มีการอ้างถึงแต่ไม่มีสเปก/IP | 🚫 ต้องเก็บข้อมูลจริง |
| Docker Network | `local-Network-Dev` (เชื่อม LND, PostgreSQL, PgAdmin, Discourse, API) | ✅ `Optiplex7040.md` | ✅ ยืนยัน |
| OS | Ubuntu 24.04 | ⚠️ `day2-summary.md` ระบุว่าผู้ใช้ทำงานบน Ubuntu 24.04 | ⚠️ ยืนยันเครื่องต่อเครื่อง |

> รายละเอียด: [Hardware Infrastructure](/archive/hardware-infrastructure) · [NUC7JY](/archive/NUC7JY) · [Optiplex 7040](/archive/Optiplex7040)

---

## ☁️ Google Workspace Business Plus

✅ ยืนยันแล้ว — `Micro-Account/docs/GWS_APPS_INVENTORY.md` (จัดทำ 2026-09-21)

| รายการ | ค่า |
|--------|-----|
| แพ็กเกจ | Business Plus |
| ราคา | **฿1,000/เดือน (1 seat)** |
| Cloud Storage | 5TB (ใช้ไป 7.8% ณ 2026-09-21) |
| จำนวนแอพในสิทธิ์ | 32 รายการ (จัดกลุ่ม 6 หมวด) |
| OAuth scopes ที่มีแล้ว | `drive`, `spreadsheets`, `drive.file`, `calendar`, `admin.directory.*.readonly`, `apps.licensing`, `apps.order` |

### งานที่ทำแล้ว / กำลังทำ (ณ 2026-09-21)
| งาน | สถานะ |
|------|-------|
| Auto-backup DB รายวัน → `Backup-Auto` ใน Drive (cron 02:00) | ✅ เสร็จ |
| Calendar เตือนภาษี (วันที่ 15/20 ของเดือน) | ✅ เสร็จ |
| Sheets Dashboard ภาษี | 🔧 รอ enable Sheets API |
| จัดระเบียบ My Drive | 🔧 เสนอแผนให้พี่ก่อนย้าย |
| Gmail / Vault / Contacts-Groups | ⛔ ยกเลิก (พี่สั่ง 2026-09-21) |

> รายละเอียด: [Google Workspace Usage](/google-workspace-usage) · [Automation Scripts](/gws-automation)

---

## 💰 กลยุทธ์ราคา (สรุป)

✅ **ยืนยันแล้ว** — `DECISIONS.md` 2026-09-21

- **หลักการ**: `ราคา = ต้นทุน USD × (1 + markup%) × เรต THB/USD ของวันออกบิล`
- **markup 25%** เริ่ม ต.ค. 2026
- **เหตุผล**: fix ราคา THB เดิม (34,935) ทำให้ markup ลดลง 24.5% → 20.4% และขาดทุนที่เรต ~41.4/USD
- **เป้าหมาย**: รายได้สุทธิ ≥ 10,000 THB/เดือน → ต้องมี **ลูกค้าอย่างน้อย 2 ราย** (ปัจจุบันมี 1 ราย = รายได้สุทธิ 6,254.38/เดือน)

> รายละเอียด: [Pricing Strategy](/pricing-strategy)

---

## 📈 บัญชีผู้ใช้มาตรฐาน (COA)

✅ ยืนยันแล้ว — `docs/BUSINESS_CONTEXT.md` + `docs/BUSINESS_RULES.md`

| รหัส | ชื่อบัญชี | ประเภท |
|-----|----------|--------|
| 1121 | ลูกหนี้ — MICROTRONIC | สินทรัพย์ |
| 1141 | ภาษีซื้อ | สินทรัพย์ |
| 2110 | เจ้าหนี้ — Noventiq | หนี้สิน |
| 2121 | ภาษีขาย | หนี้สิน |
| 2130 | ภาษีหัก ณ ที่จ่ายค้างจ่าย | หนี้สิน |
| 4110 | รายได้จากการขายและบริการ | รายได้ |
| 5110 | ต้นทุนค่าสิทธิ์/บริการ | ต้นทุน |

> **หลักการบัญชี**: Double-entry **บังคับ** ทุกเหตุการณ์ทางธุรกิจ (Dr/Cr ผ่าน `debit_account_id` / `credit_account_id` / `amount`)

---

## 👨‍💻 ทีมงาน & ครอบครัว AI

### ทีมงาน
| คน | บทบาท | แหล่ง |
|----|--------|------|
| **พี่ฆัง** | Founder / ผู้ตัดสินใจสูงสุด / อนุมัตินโยบาย | `AGENTS.md` |
| **Grids Jivapong** | เจ้าของระบบ / ผู้ประสานงานหลัก Micro-Account | `BUSINESS_CONTEXT.md` |
| **DarumaKlang** | Lead Developer | `AGENTS.md` |

> ⚠️ **ต้องยืนยัน** ความสัมพันธ์ระหว่าง "พี่ฆัง" กับ "Grids Jivapong" ว่าเป็นคนเดียวกันหรือคนละคน

### ครอบครัว AI Agent (6 ตน) — ✅ ยืนยันจาก `AGENTS.md`
| ลำดับ | ชื่อ | เดิม | บทบาท |
|--------|------|------|--------|
| 1 | **ฌอน** | opencode | คู่หู / ผู้คุมสูงสุด / ที่ปรึกษาหลัก |
| 2 | **ธาร** | Copilot | ความต่อเนื่อง / Backup / ตรวจสอบคุณภาพ |
| 3 | **Kiro** | kiro | Production + UI |
| 4 | **อัล (Al)** | antigravity | Python script / งานระบบ |
| 5 | **Trae** | trae | ผู้ช่วยสายเร็ว / งานเร่งด่วน |
| 6 | **ฟ้า** | opencode (sv) | ดูแลระบบ / เซิร์ฟเวอร์ |

**หลักการทำงาน (ต้องยึดทุกครั้ง):**
1. **ความจริงก่อนเสมอ** — ห้ามเดา ต้องมีหลักฐานตรวจสอบได้
2. **ห้ามเก็บ/พิมพ์ secret** — เก็บที่ `.env.local` เท่านั้น
3. **งานสำคัญผ่านการตรวจสอบ** — Trae/อัล → ธารตรวจ
4. **กฎ Google-First** — ใช้สิทธิ์ Google Workspace ที่มีอยู่ก่อนซื้อของใหม่
5. **ผู้นำคือผู้เดียวที่สั่ง** — กระทำการมีผลต้องขออนุมัติ

---

## 🔗 Related Documents
- [Product Catalog](/product-catalog) — สินค้าและบริการ (มีส่วนที่ยังต้องยืนยัน)
- [Pricing Strategy](/pricing-strategy) — โมเดลราคา markup 25%
- [Competitor Analysis](/competitor-analysis) — วิเคราะห์คู่แข่ง
- [Hardware Infrastructure](/archive/hardware-infrastructure) — เครื่องและระบบ
- [Google Workspace Usage](/google-workspace-usage) — แอปในสิทธิ์
- [Operations Runbook](/archive/operations-runbook) — ขั้นตอนทำงาน/กู้คืน
- [Business Rules](/business-rules) — กฎบัญชี/ภาษี
- [Decisions Log](/decisions-log) — บันทึกการตัดสินใจ

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **หลักการจัดทำ**: ระบุแหล่งอ้างอิงทุกข้อ · แยกสิ่งที่ยืนยันแล้วออกจากสิ่งที่ต้องยืนยัน · ไม่เติมข้อมูลที่ไม่มีในเอกสารต้นทาง