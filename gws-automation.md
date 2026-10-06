# Automation Scripts — งานอัตโนมัติที่ทำงานอยู่

> สรุปงานอัตโนมัติที่มีหลักฐานว่าตั้งค่าไว้จริง
> แหล่งอ้างอิง: `GWS_APPS_INVENTORY.md` (สถานะ) + `package.json` (สคริปต์ที่มีจริง)

---

## ⚠️ ก่อนอ่าน

> 🚫 **ยังไม่มีข้อมูลตำแหน่งไฟล์และเนื้อหาโค้ดของ automation scripts ในเอกสารต้นทาง**
> หน้านี้บันทึกเฉพาะ: (1) งานที่ยืนยันว่าตั้งค่าแล้ว และ (2) สคริปต์ที่ยืนยันว่ามีอยู่จริงใน `package.json`
> ห้ามเดาตำแหน่งไฟล์/ตารางเวลาเพิ่มเติม — ต้องเปิดโค้ดจริงเพื่อยืนยัน

---

## ✅ งานที่ตั้งค่าแล้ว (ยืนยันจาก `GWS_APPS_INVENTORY.md`)

### 1. Auto-backup ฐานข้อมูล → Google Drive

| หัวข้อ | ค่า |
|--------|-----|
| **งาน** | สำรองฐานข้อมูลอัตโนมัติ |
| **ปลายทาง** | Google Drive โฟลเดอร์ `Backup-Auto` |
| **เวลา** | **02:00 ทุกวัน** |
| **สถานะ** | ✅ เสร็จ (ณ 2026-09-21) |

> 💡 **ทำไมสำคัญ**: `OPERATION_RUNBOOK.md` ระบุว่า "Confirm latest backup exists" เป็นข้อ 1 ของ Pre-Change Checklist → งานนี้คือหัวใจของการ deploy ที่ปลอดภัย

### 2. Calendar เตือนภาษี

| หัวข้อ | ค่า |
|--------|-----|
| **งาน** | สร้างกิจกรรมเตือนความจำ |
| **วันที่** | **15 และ 20 ของทุกเดือน** |
| **สถานะ** | ✅ เสร็จ (ณ 2026-09-21) |
| **ต่อยอด** | ต่อบิล/นัด (กำลังทำต่อเนื่อง) |

> 💡 เชื่อมกับข้อเตือนใน [Business Rules](/business-rules): หลักฐานต้องเก็บแยกรายเดือน

### 3. Sheets Dashboard ภาษี

| หัวข้อ | ค่า |
|--------|-----|
| **งาน** | สร้าง dashboard ภาษีใน Google Sheets |
| **สถานะ** | 🔧 **รอ enable Sheets API** |

> ⚠️ **ห้ามเขียนเอกสารว่า "ทำแล้ว 02:05"** — ตัวเลขเวลา 02:05 นี้ไม่มีในเอกสารต้นทาง ถ้าจะใช้ต้องยืนยันจากโค้ดจริงก่อน

---

## 📦 สคริปต์ที่ยืนยันว่ามีอยู่จริง (`package.json`)

| คำสั่ง | ไฟล์ปลายทาง | หน้าที่ | สถานะ |
|--------|--------------|--------|--------|
| `npm run tax:update` | `jobs/scheduleTaxUpdate.ts` | อัปเดตข้อมูลภาษีตามรอบเวลา | ✅ มีไฟล์จริง |
| `npm run ai:audit` | `jobs/scheduleAiAudit.ts` | AI Audit ตรวจความผิดปกติ | ✅ มีไฟล์จริง |
| `npm run check:knowledge` | `scripts/verify-knowledge-sync.mjs` | ตรวจเอกสาร sync กับโค้ด | ✅ มีไฟล์จริง |
| `npm run check:consistency` | `scripts/weekly-consistency-audit.mjs` | ตรวจสอบสม่ำเสมอรายสัปดาห์ | ✅ มีไฟล์จริง |
| `npm test` | `tests/**/*.test.mjs` | Unit/governance tests | ✅ มีไฟล์จริง |
| `npm run lint` | — | ESLint | ✅ มีใน scripts |

> 🚫 **ยังไม่ทราบ**: schedule ของ `tax:update` และ `ai:audit` (cron expression อยู่ในไฟล์) → ต้องเปิดไฟล์ดูถึงจะยืนยันได้

---

## 🔗 บริการ Google ที่ automation ใช้

| บริการ | ใช้ทำอะไร | Scope ที่ใช้ |
|--------|----------|------------|
| **Google Drive** | เก็บ backup DB + เอกสาร | `drive` · `drive.file` |
| **Google Sheets** | Tax Dashboard | `spreadsheets` |
| **Google Calendar** | เตือนภาษี/บิล/นัด | `calendar` |
| **Admin SDK** | อ่านข้อมูล users/groups | `admin.directory.*.readonly` |

> ยืนยันจาก `package.json` ว่ามี `googleapis` (`^171.4.0`) และจาก inventory ว่ามี OAuth scopes เหล่านี้

---

## 🛡️ กฎที่ต้องปฏิบัติกับ automation

| กฎ | รายละเอียด | แหล่ง |
|----|-----------|------|
| **ห้าม hardcode secret** | เก็บที่ `.env.local` เท่านั้น ห้ามอยู่ในโค้ด/config/เอกสาร | `AGENTS.md` กฎ #2 |
| **ตรวจสอบก่อนรายงานสถานะระบบ** | ดึงข้อมูล live เสมอ ห้ามใช้รายการตายตัว | `AGENTS.md` กฎ #1 |
| **Backup ต้องมีก่อน deploy** | Pre-Change Checklist ข้อ 1 | `OPERATION_RUNBOOK.md` |
| **ห้าม destructive operation** | ห้าม DROP/mass delete ใน production | `OPERATION_RUNBOOK.md` |
| **Google-First** | ก่อนสร้าง service/provider ใหม่ ใช้ของในสิทธิ์ก่อน | `DECISIONS.md` |
| **การกระทำมีผลต้องขออนุมัติ** | เจ้านายสั่งเท่านั้น | `AGENTS.md` |

---

## 🚀 Roadmap (จาก inventory) — ยังไม่ทำ

### ทำได้เลย (scope มีแล้ว)
- [ ] **PDF อัตโนมัติ** ใบเสนอราคา/สัญญา/ใบแจ้งหนี้จาก DB → Drive
  - 💡 สอดคล้องกับ `jspdf` + `jspdf-autotable` ที่ติดตั้งไว้แล้วใน `package.json`
- [ ] **Sheets** ทะเบียนเอกสารส่งลูกค้า + ติดตามสถานะ
- [ ] **Calendar** เตือน due ใบแจ้งหนี้/สัญญา + แชร์ปฏิทินบริษัท

### ต้องขออนุมัติก่อน
- [ ] Forms → Sheets · Photos · Cloud Translate API
- [ ] ~~Gmail / Vault / Contacts-Groups~~ — ⛔ พี่สั่งยกเลิก 2026-09-21

---

## 🚫 สิ่งที่ยังไม่มีข้อมูล

| # | ต้องเก็บ | ทำไม |
|---|--------|------|
| 1 | ตำแหน่งไฟล์จริงของ backup script | เพื่อแก้/ตรวจ |
| 2 | ระยะเวลาเก็บ backup (retention) | `google-workspace-usage.md` เคยอ้าง 30 วัน — **ยังไม่มีในต้นทาง** |
| 3 | cron expression ของ `tax:update` / `ai:audit` | เพื่อรู้ว่ารันเมื่อไร |
| 4 | ผลการทดสอบ restore ล่าสุด | backup ที่ไม่ restore ได้ = ไม่มี backup |
| 5 | แจ้งเตือนเมื่อ automation ล้มเหลว | ปัจจุบันถ้างานล้มจะรู้ได้อย่างไร? |

---

## 🔗 Related Documents
- [Google Workspace Usage](/google-workspace-usage) — รายการแอป + scope
- [Operations Runbook](/archive/operations-runbook) — ตารางงาน
- [Business Rules](/business-rules)
- [Decisions Log](/decisions-log) — นโยบาย Google-First

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **แหล่งอ้างอิง**: `Micro-Account/docs/GWS_APPS_INVENTORY.md`, `Micro-Account/package.json`, `docs/OPERATION_RUNBOOK.md`