# Decisions Log — บันทึกการตัดสินใจ

> สรุปจาก `Micro-Account/docs/DECISIONS.md` (ไฟล์ authoritative)
> ใช้ template เดียวกัน: Context → Decision → Alternatives → Why → Impacted files → Rollback

---

## Template

```markdown
### [YYYY-MM-DD] Decision Title
- Context:
- Decision:
- Alternatives considered:
- Why this was chosen:
- Impacted files/modules:
- Rollback plan:
```

---

## 📋 สรุปภาพรวม

| วันที่ | หัวข้อ | ประเภท | สถานะ |
|-------|--------|--------|--------|
| 2026-04-09 | Canonical RBAC + Role Standard | สถาปัตยกรรม | ✅ บังคับใช้ |
| 2026-04-09 | Governance Guardrails Automation | กระบวนการ | ✅ บังคับใช้ |
| 2026-04-09 | Unified Module Registry and Menu API | สถาปัตยกรรม | ✅ บังคับใช้ |
| 2026-09-21 | PDF Evidence Must Be Checked Before Recording Expenses | กฎงาน | ✅ บังคับใช้ |
| 2026-09-21 | ภาษี ก.ค. 2026: ใช้แค่ #21 | ภาษี | ✅ ยื่นแล้ว |
| 2026-09-21 | แก้วิธีคิด reverse charge ภ.พ.36: ×7% | ภาษี | ✅ แทนที่วิธี 7/107 |
| 2026-09-21 | Dominick Billing: Markup 25% | ราคา | ✅ เริ่ม ต.ค. 2026 |
| 2026-09-21 | นโยบาย Google-First | นโยบาย | ✅ บังคับใช้ |
| 2026-09-26 | **MBSuite เป็นสินค้าใน Products list / Micro-Account เป็นต้นแบบ** | **ผลิตภัณฑ์** | ✅ **ยืนยันจากเจ้าของ** |
| 2026-09-26 | **สินค้าที่เรามีตอนนี้ 3 ชิ้น: MBSuite · Vessuyan App · THOTH CMS** | **ผลิตภัณฑ์** | ✅ **ยืนยันจากเจ้าของ** |
| 2026-09-26 | **`Micro-Business-Suite` = MBSuite** · **`… full` = ออฟไลน์ ขายขาด** | **ผลิตภัณฑ์ + โมเดลการขาย** | ✅ ยืนยันเจ้าของ · ⏸️ ตัว offline **ยังไม่ทำตอนนี้** |
| 2026-09-26 | **`micro-account-platform` = MBSuite** (ตัวที่บริษัทใช้จริง → เปลี่ยนชื่อได้เลย) | **ผลิตภัณฑ์** | ✅ **ยืนยันจากเจ้าของ** |
| 2026-09-26 | **8 โครงการที่เหลือ = Roadmap (ยังทำอยู่ ไม่ตัดทิ้ง)** | **ผลิตภัณฑ์** | ✅ **ยืนยันจากเจ้าของ** |
| 2026-09-26 | **ตรวจ repo THOTH CMS = งานรอบหลัง (ฌอนทำ)** | **งาน** | ⏳ เลื่อน |
| 2026-09-26 | ยกเลิกการตามหา NUC7JY IP/สเปก | ขอบเขต | 🚫 ยกเลิก |
| 2026-09-26 | ยกเลิกการตัดสินใจ auth stack (Lightning/IoT) | ขอบเขต | 🚫 ยกเลิก |
| 2026-09-26 | ยกเลิกการยืนยันชื่อ Docker network (Lightning/IoT) | ขอบเขต | 🚫 ยกเลิก |

---

## 2026-09-26 — MBSuite เป็นสินค้าใน Products list / Micro-Account เป็นต้นแบบ ⭐

> 📌 **แหล่งที่มา: คำยืนยันโดยตรงจากพี่ฆัง (เจ้าของกิจการ) เมื่อ 2026-09-26**
> เอกสารนี้ override ข้อมูลใน `BUSINESS_CONTEXT.md` ที่ระบุว่าผู้ใช้ระบบเป็น "บริษัทตัวกลาง (Intermediary)"
> และ A/R รหัส 1121 = MICROTRONIC (THAILAND) — ส่วนนี้ยังไม่ได้รับการยืนยันว่าเป็น persona/ตัวอย่าง → 🚫 ห้ามสรุปเอง

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | เอกสารต้นทางมีความขัดแย้ง: `README.md` ระบุว่า Micro-Account "สำหรับธุรกิจ Microtronic" แต่ `BUSINESS_CONTEXT.md` ระบุว่าผู้ใช้ระบบเป็น "ตัวกลาง" ที่ขายต่อให้ MICROTRONIC (THAILAND) เป็นลูกค้า A/R 1121 → เอกสารเดิมจึงมี **2 คำถามค้าง**: (1) เจ้าของระบบเป็น Microtronic หรือบริษัทอื่น (2) จะเปิดขาย Micro-Account ภายนอกหรือไม่ |
| **Decision** | ✅ **Micro-Account เป็นโปรแกรมบัญชีของบริษัท Microtronic เอง**<br>✅ **Micro-Account เป็นต้นแบบ (prototype) ของ MBSuite**<br>✅ **MBSuite เป็นส่วนหนึ่งของ Products list ของบริษัท**<br>🚫 **ยังไม่ยืนยัน** ว่าจะเปิดขาย Micro-Account แยกหรือไม่ (พี่ฆังยืนยันเฉพาะคำว่า "ต้นแบบ")<br>🚫 **ยังไม่ยืนยัน** ว่าคำว่า "Intermediary" ใน `BUSINESS_CONTEXT.md` หมายถึงอะไร → ห้ามตีความเอง |
| **Alternatives** | ไม่มี — นี่เป็นการยืนยันข้อเท็จจริงจากเจ้าของ ไม่ใช่การเลือกทาง |
| **Why** | เจ้าของกิจการยืนยันด้วยวาจา → เป็น authoritative source ระดับสูงสุด เหนือไฟล์คู่มือ<br>ผลต่างที่สำคัญ: ทำให้ **Products list ของบริษัทมีซอฟต์แวร์ของตัวเอง** (ไม่ใช่แค่ตัวแทนของคนอื่น) → เปลี่ยนทิศทางการทำเว็บและการตลาดทั้งหมด<br>ลูกค้าจริงที่มีข้อมูลในระบบยังเป็น **Dominick** (contact_id 1) ไม่ใช่ Microtronic |
| **Impacted** | `company-profile.md` (คำถามข้อ 1 + หัวข้อ MICROTRONIC) · `product-catalog.md` (หัวข้อ 4 ใหม่ + คำถามข้อ 1/5) · `README.md` · `competitor-analysis.md` · `microtronic.biz` หน้า Products (ยังไม่สร้าง) |
| **Rollback** | ไม่มี — เป็นข้อเท็จจริงจากเจ้าของ ห้ามแก้กลับโดยไม่มีคำสั่งใหม่จากพี่ฆัง |

### 🚫 ข้อมูลที่ยังต้องเก็บเกี่ยวกับ MBSuite (ห้ามเดา)

| # | ต้องเก็บ | สถานะ |
|---|--------|--------|
| 1 | MBSuite คืออะไร / ต่างจาก Micro-Account อย่างไร | 🚫 |
| 2 | ชื่อเต็ม / ตัวย่อ / positioning | 🚫 |
| 3 | โมเดลการขาย (SaaS / License / On-premise) | 🚫 |
| 4 | ฐานลูกค้าเป้าหมาย | 🚫 |
| 5 | แพ็กเกจและราคา | 🚫 |
| 6 | Feature list ที่จะเปิดขาย | 🚫 |
| 7 | Roadmap / กำหนดเปิดตัว | 🚫 |
| 8 | เอกสารแปล / ตราสัญลักษณ์ / โดเมน | 🚫 |
| 9 | ทีมพัฒนา / ผู้ดูแล | 🚫 |

---

## 2026-09-26 — สินค้าของเราที่มีอยู่ตอนนี้: MBSuite · Vessuyan App · THOTH CMS ⭐

> 📌 **แหล่งที่มา: คำยืนยันโดยตรงจากพี่ฆัง (เจ้าของกิจการ) เมื่อ 2026-09-26**
> "โปรดักส์สินค้าที่เรามีตอนนี้ มี MBSuite, Vessuyan App, THOTH CMS"

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | ก่อนหน้านี้เอกสารระบุสินค้าของเราแค่ MBSuite และหน้าเว็บหลัก (`microtronic.dev/data/products.json`) มี 10 รายการ (active 5) ทำให้ไม่ชัดว่าอะไรคือ "สินค้าปัจจุบัน" |
| **Decision** | ✅ **สินค้าที่เรามีตอนนี้ = 3 ชิ้น**<br>1. **MBSuite** — ระบบบัญชี+ภาษีอัตโนมัติสำหรับ SMEs · ตัวที่ขาย · ดูแลโดย `LogicGate2026`<br>2. **Vessuyan App** — แพลตฟอร์มดูดวงอัตโนมัติสำหรับ LINE OA · ไพ่ 78 ใบ + รูน 24 ตัว<br>3. **THOTH CMS** — CMS สำหรับเว็บไซต์องค์กร (Modular + SEO-first) · ดูแลโดย `Ex0-Adam`<br>+ **Micro-Account** = ต้นแบบของ MBSuite (ไม่นับเป็นสินค้าแยก) |
| **Alternatives** | ใช้รายการใน `products.json` ทั้ง 10 รายการเป็น Products list → **ไม่ทำ** เพราะพี่ฆังยืนยันแค่ 3 ชิ้น |
| **Why** | เจ้าของยืนยันด้วยวาจา → authoritative สูงสุด · ทำให้หน้า Products บนเว็บไม่แสดงสินค้าที่ยังไม่มีจริง |
| **Impacted** | `product-catalog.md` (หัวข้อ 4) · `README.md` · `competitor-analysis.md` · หน้า Products บน `microtronic.dev` |
| **Rollback** | ไม่มี — เป็นข้อเท็จจริงจากเจ้าของ |

### 🔎 ผลการตรวจสอบในเครื่อง (ยืนยัน/ไม่ยืนยัน)

| สินค้า | หลักฐานที่ตรวจพบ | สถานะ |
|-------|----------------|--------|
| MBSuite | ✅ `services/next/01-PRODUCTS-BUSINESS/Micro-Business-Suite` · `package.json` = `micro-business-suite` v0.1.0 · `README.md` มีฟีเจอร์ครบ · `STAFF.md` ระบุ "Micro-Business-Suite (ตัวที่ขาย)" | ✅ ยืนยัน |
| Vessuyan App | ✅ `services/next/02-FORTUNE-WEB/vessuyan` · `package.json` = `vessuyan` v0.1.0 · `README.md` + `vercel.json` (cron) | ✅ ยืนยัน |
| THOTH CMS | ⚠️ พบเฉพาะรายการใน `microtronic.dev/data/products.json` (`thoth-platform-cms`) + ผู้ดูแลใน `STAFF.md` — **ไม่พบโค้ดใน `~/workspace/services/`** | 🚫 ยังตรวจ stack/ฟีเจอร์จริงไม่ได้ |

> ⚠️ **ข้อสังเกตที่ต้องแก้ไฟล์ (งานรอบหลัง)**: `products.json` ยังมี 8 รายการที่ไม่อยู่ใน 3 ชิ้นนี้
> (Templates Shop, Kafra Platform, Corporate Website Package, Micro Formula V1, หิวจัง, Micro Smart Home, Micro Smart Farm, PayUp)
> → ✅ **ตอบแล้ว 2026-09-26**: พี่ฆัง *"ยังทำอยู่ครับ อยู่ในแผน เดวต้องพึ่งพานายทำโครงการเหล่านี้"* → **เก็บไว้เป็น Roadmap ไม่ตัดออก**
> → 🚫 ยังไม่ยืนยันว่าเป็นสินค้าที่มีจริง, roadmap, หรือของเก่า → ต้องถามพี่ฆังเรื่องการซิงก์ `products.json`

---

## 2026-09-26 — MBSuite เป็นตัวออฟไลน์ ขายขาด (perpetual license)

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | ตรวจ workspace พบ MBSuite มี **2 โฟลเดอร์** คนละรุ่น/คนละ remote → เสนอให้พี่ฆังเลือกว่าอันไหนตัวจริง |
| **คำยืนยันเจ้าของ** | พี่ฆัง: *"Micro-Business-Suite full จะทำเป็นตัว ออฟไลน์ ขายขาด ยังไม่ได้ทำ"* |
| **คำยืนยันเจ้าของ (เพิ่ม)** | พี่ฆัง: *"MBSuite"* → โฟลเดอร์ `Micro-Business-Suite` (next `^16.3.6`) = **MBSuite** |
| **Decision** | ✅ **2 โฟลเดอร์ คนละบทบาท**<br>• `Micro-Business-Suite` (next `^16.3.6`, remote `MBSuite/…`) = **MBSuite ตัวจริงที่ขาย**<br>• `Micro-Business-Suite full` (next `^16.2.1`, remote `GridsMicro/…`) = **ตัวออฟไลน์ ขายขาด (perpetual)** — ⏸️ **ยังไม่ทำตอนนี้** (ยืนยันจากพี่ฆัง) → ไม่อยู่ในคิวทำงาน ไม่นับเป็นสินค้าที่เปิดขาย |
| **หลักฐานที่ตรวจเจอจริง** | ทั้งคู่มี `lib/license.ts` + `lib/license-check.ts` + `scripts/issue-license.mjs`<br>• MBSuite: มี `lib/license-packages.ts` · `issue-license-quick.mjs` · `app/api/admin/customers/[id]/license/route.ts` · commit `1bb8829` *"rebrand to Micro-Business-Suite with official logo"*<br>• full: commit `2588df0` *"feat: add offline signed license and docker delivery"* (3 commits เท่านั้น)<br>🚫 ทั้งสองโฟลเดอร์ **ไม่พบใน Gitea (sv)** → ยังไม่เคย push ขึ้น sv |
| **โมเดลธุรกิจที่ได้** | ขายขาด (perpetual) แทน SaaS รายเดือน → กระทบการคำนวณรายได้/ภาษี + ต้องมีระบบ license/activation |
| **🚫 ยังไม่ทราบ** | ราคาขายขาด · อัปเดตหลังขายหรือไม่ · license ต่อเครื่อง/ต่อ user · "ออฟไลน์" แค่ไหน (ไม่ต่อเน็ตเลย หรือ sync ได้แต่ไม่ต้อง) |
| **พบเพิ่ม** | 🚫 MBSuite / MBSuite full **ไม่พบใน Gitea (sv) public** → ยังไม่เคย push ขึ้น sv |
| **Impacted** | `product-catalog.md` (4.1 + 4.2) · `maintenance/reports/inventory-20260926.md` |
| **Rollback** | เปลี่ยนกลับเป็น SaaS ได้ถ้าพี่ฆังเปลี่ยนใจ |

---

## 2026-09-26 — `micro-account-platform` ใน products.json = MBSuite (ตัวที่บริษัทใช้จริง)

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | ตรวจ `microtronic.dev/data/products.json` พบรายการ `micro-account-platform` (active: true, slug `micro-account-platform`) แต่ไม่มีรายการชื่อ MBSuite เลย → เดิมผมตีความว่าต้อง "เพิ่ม" MBSuite เข้าไปใหม่ |
| **คำยืนยันเจ้าของ** | พี่ฆัง: *"เป็นตัวที่บริษัทใช้จริงเลยตัวนี้อะ micro-account-platform (เปลี่ยนชื่อเป็น MBSuite ได้เลย)"* |
| **Decision** | ✅ **`micro-account-platform` = MBSuite** — ไม่ต้องเพิ่มรายการใหม่ แค่ **เปลี่ยนชื่อ/slug เป็น MBSuite**<br>→ ตัวนี้คือสินค้าที่บริษัทใช้งานจริง ตรงกับที่ยืนยันว่าสินค้าปัจจุบันมี 3 ชิ้น |
| **ผลกระทบ** | แก้ความเข้าใจผิดก่อนหน้านี้ — ไม่ใช่ "products.json ไม่มี MBSuite" แต่เป็น "มีอยู่แล้วแต่ชื่อผิด" |
| **งานที่ยังค้างในไฟล์ข้อมูล** | 🚫 ยัง**ไม่มี Vessuyan App** ใน `products.json` → ต้องเพิ่ม = งานรอบหลัง (ฌอนทำ) |
| **Impacted** | `product-catalog.md` (4.5 + 4.8 ข้อ 10) · `README.md` · `web-development-planning.md` |
| **Rollback** | เปลี่ยน slug/ชื่อกลับเป็น `micro-account-platform` ได้ |

---

## 2026-09-26 — 8 โครงการที่เหลือ: ยังทำอยู่ / อยู่ในแผน (Roadmap) ไม่ใช่ของที่ตัดทิ้ง

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | ถามว่าจะซิงก์ `products.json` (10 รายการ) ให้เหลือเฉพาะ 3 สินค้าที่ยืนยันแล้วหรือไม่ |
| **Decision** | ✅ **ไม่ตัดออก** — พี่ฆังตอบว่า *"ยังทำอยู่ครับ อยู่ในแผน เดวต้องพึ่งพานายทำโครงการเหล่านี้"*<br>→ จัดเป็นหมวด **Roadmap** (8 โครงการ) แยกจาก "สินค้าที่พร้อมขาย 3 ชิ้น"<br>→ ผู้รับผิดชอบดำเนินการ: **ฌอน (opencode)** |
| **Impacted** | `product-catalog.md` (หัวข้อ 4.6 ใหม่) · `README.md` · `web-development-planning.md` |
| **Rollback** | เปลี่ยนเป็นตัดทิ้งได้ถ้าพี่ฆังสั่ง |

---

## 2026-09-26 — การตรวจ repo THOTH CMS = งานรอบหลัง (ฌอนทำ)

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | THOTH CMS ยืนยันว่าเป็นสินค้าจริง แต่ **ไม่พบโค้ดในเครื่องนี้** (มีแค่รายการใน `products.json` + ผู้ดูแลใน `STAFF.md`) → เสนอให้ clone มาตรวจ |
| **Decision** | ⏳ **รอบหลัง** — พี่ฆัง: *"เดวนายต้องทำ แต่รอบหลังนะ"*<br>→ **ฌอน (opencode)** เป็นผู้ clone + ตรวจ `microtronic-thailand/thoth-platform-cms` ในภายหลัง<br>→ ไม่ใช่ blocker ของงานเอกสารในรอบนี้ |
| **ผลกระทบต่อเอกสาร** | สเปก/stack/ฟีเจอร์จริงของ THOTH ยังไม่บันทึก — ทำเครื่องหมาย 🚫 ไว้แล้วใน `product-catalog.md` ข้อ 4.4 |
| **Rollback** | ไม่มี — เป็นการจัดลำดับงาน |

---

## 2026-09-26 — ยกเลิกการตามหาข้อมูล 3 เรื่อง (Lightning/IoT stack)

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | ระหว่างรวบรวมเอกสาร มี 3 ประเด็นที่ยังไม่มีคำตอบและถูกทำเป็น "คำถามค้าง" ในเอกสาร |
| **Decision** | 🚫 **ยกเลิกทั้ง 3 ข้อ** (สั่งโดยพี่ฆัง เมื่อ 2026-09-26)<br>1. **NUC7JY IP / สเปก** — ไม่ต้องยืนยัน<br>2. **auth stack ของ Lightning/IoT** (Firebase vs ทางเลือกอื่น) — ไม่ต้องตัดสินใจ<br>3. **ชื่อ Docker network จริง** (`local-Network-Dev` vs `iot_network` vs `mqtt_network`) — ไม่ต้องยืนยัน |
| **Alternatives** | เก็บเป็นคำถามค้างรอคำตอบในเอกสารหลัก (เดิม) → **ไม่ทำ** เพราะเป็นเรื่องของ Lightning/IoT stack ซึ่งอยู่นอกขอบเขตเอกสารชุดนี้ |
| **Why** | ลดรายการคำถามค้างให้เหลือเฉพาะเรื่องที่กระทบการทำเว็บ/ขายของจริง → เอกสารโฟกัสได้ |
| **Impacted** | `company-profile.md` (คำถามข้อ 5) · `NUC7JY.md` · `Optiplex7040.md` · `add-security_system.md` · `To-do-List.md` · `day2.md` · `day2-summary.md` · `hardware-infrastructure.md` |
| **Rollback** | เปิดใหม่ได้เมื่อพี่ฆังสั่ง |

---

## 2026-04-09 — Canonical RBAC + Role Standard

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | Role labels และ access checks ไม่สม่ำเสมอใน UI/API |
| **Decision** | มาตรฐานเป็น `superadmin` / `admin` / `user` + group-based RBAC permissions |
| **Alternatives** | เก็บ role aliases แบบผสมไว้เพื่อ backward compatibility |
| **Why** | ลด regression, ตัด logic ซ้ำซ้อน, ดูแลรักษาง่ายขึ้น |
| **Impacted** | `lib/core-standards.ts`, access checks ของ admin/member/API, เอกสาร |
| **Rollback** | ไม่ต้อง — เป็นการ normalize แบบ additive ไม่ทำลาย schema |

---

## 2026-04-09 — Governance Guardrails Automation

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | พฤติกรรมของระบบมีความเสี่ยง drift จากเอกสารและมาตรฐานเมื่อเวลาผ่านไป |
| **Decision** | เพิ่ม CI / PR / weekly enforcement + guard tests |
| **Alternatives** | ตรวจด้วยมนุษย์อย่างเดียว |
| **Why** | ลด human error, เอกสาร sync กับโค้ดอัตโนมัติ |
| **Impacted** | `.github/workflows/*`, `scripts/verify-knowledge-sync.mjs`, `scripts/weekly-consistency-audit.mjs`, `tests/governance-guards.test.mjs` |
| **Rollback** | ลบไฟล์ workflow/script/test ถ้า automation ทำให้เกิด false-positive |

---

## 2026-04-09 — Unified Module Registry and Menu API

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | Sidebar menu และ permission modules ถูกนิยามในหลายไฟล์ → drift |
| **Decision** | สร้าง module registry กลาง + expose ผ่าน modules API |
| **Alternatives** | เก็บ constants ในแต่ละหน้า |
| **Why** | รองรับการเพิ่มโมดูลใหม่ (HR, Sales, external APIs) โดยไม่ต้องนิยามซ้ำ |
| **Impacted** | `lib/module-registry.ts`, `components/Sidebar.tsx`, `app/admin/groups/page.tsx`, `app/api/modules/route.ts` |
| **Rollback** | กลับไปใช้ static menu constants ถ้า dynamic module model ทำให้ UI regression |

---

## 2026-09-21 — PDF Evidence Must Be Checked Before Recording Expenses ⭐

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | จัดทำภาษี ก.ค. 2026 พบว่า `original_currency` / `exchange_rate` บางรายการ (Google Workspace) ถูกบันทึกจาก**ตัวเลขที่เดา** (35.1 / 35.2) ไม่ตรงใบแจ้งยอดจริง (**34.385** จาก KTC statement 18/08/26) และเส้นบางเส้น (STARTER 137 lic) เปลี่ยนจาก USD เป็น THB ไม่ได้อัปเดต |
| **Decision** | ก่อนบันทึกค่าใช้จ่ายทุกครั้ง ต้องแปลง/อ่าน PDF ต้นทางก่อน ผ่าน `~/workspace/services/python/pdf-tools/pdf_toolkit.py` แล้วบันทึกตัวเลข**ตามหลักฐานเท่านั้น ห้ามเดา** |
| **Alternatives** | ปล่อยให้กรอกด้วยมือตามเดิม (เสี่ยงตัวเลขเพี้ยนซ้ำ) |
| **Why** | หลักฐานตรวจสอบย้อนหลังได้, ตัวเลขภาษีถูกต้อง, กฎ #1 (ห้ามเดา) บังคับ |
| **Impacted** | `docs/BUSINESS_RULES.md`, `docs/statements/*.pdf`, พฤติกรรมการบันทึก expenses |
| **Rollback** | ไม่มี — เป็นกฎการทำงาน ไม่กระทบ schema |

> 📌 **นี่คือบทเรียนหลักสำคัญของทั้งบริษัท** — การเดาตัวเลขทำให้ต้องแก้ภาษีย้อนหลัง

---

## 2026-09-21 — ภาษี ก.ค. 2026: ใช้แค่ #21 (จ่าย 547.11) — แบบ ส.ค. ใช้ #22 + #13 ไปแล้ว

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | ยื่นภาษีค้าง ก.ค. 2026 ล่าช้า (สรรพากรยืนยันยื่นได้ + ต่างปรับ) ตรวจหลักฐานบิล Google จริงด้วย pdf-tools พบ: **#21** (Starter 137 lic, USD 843.92 @ 34.385 = 29,017.52) และ **#13** (1 seat, THB 1,000) ทั้งคู่อยู่ช่วง 1–31 ก.ค. เป็น**ใบกำกับสิงคโปร์ GST 0% ไม่ใช่ใบกำกับไทย**; แบบ ส.ค. ที่ยื่นจริง (3/9/69, ref **P300039607819**) ใช้ #22 (29,022.41→2,031.57) + #13 (1,000→70) = ซื้อ 30,022.41 ไปแล้ว |
| **Decision** | ก.ค. 2026 ใช้เพียง **#21** เป็นรายการหักได้ → reverse charge 29,017.52×7/107 = VAT ซื้อ **1,898.34** → Net ภ.พ.30 = 2,445.45 − 1,898.34 = **547.11**; **#13/#22 ไม่นำมาก.ค. ซ้ำ** (ยื่นไปแบบ ส.ค. แล้ว) |
| **Alternatives** | ทาง ก เดิม (#21 + #13 = 1,963.76 → 481.69) — **ตกอันตราย** เพราะ #13 (1,000) ถูกใช้ไปแล้วในแบบ ส.ค. → หักซ้ำ 70 |
| **Why** | หลักฐานบิล + แบบที่ยื่นแล้วชี้ชัด ต้องกัน #13 ออกไม่งั้นเครดิตซ้ำ; จ่าย 547.11 เป็นยอดที่ถูกหลักฐานที่สุด |
| **Impacted** | `expenses` id=21 (amount 29,017.52 / net 27,119.18 / vat 1,898.34 / pp36_exempt=false), PP30+PP36 draft ก.ค., `docs/TAX_WORKLOG.md`, `docs/BUSINESS_RULES.md` |
| **Rollback** | ถ้าสรรพากรขอปรับยอด/ยื่นเพิ่ม ให้ยื่นเพิ่มผ่านภ.พ.30 โดยอ้างใบกำกับ #13 ใบใหม่ได้ (เปลี่ยนได้เฉพาะยอดที่ยังไม่ยื่นจริง) |

> ⚠️ **หมายเหตุ**: ตัวเลขส่วนนี้ถูก **supersede** โดย decision ถัดไป (เรื่องวิธี ×7%)

---

## 2026-09-21 — แก้วิธีคิด reverse charge ภ.พ.36: เงินที่จ่าย × 7% (แก้จาก 7/107) ⭐

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | ตรวจกฎหมายและแนวปฏิบัติย้อนหลัง (สน.สรรพากรจริง) พบว่า reverse charge ภ.พ.36 **ใช้อัตรา 7% ของเงินที่จ่าย** ไม่ใช่ 7/107<br>**หลักฐาน**: แนววินิจฉัย กค 0702/6764 ("นำส่งภาษีในอัตราร้อยละ 7.0 ของเงินที่จ่าย") · แบบฟอร์ม ภ.พ.36 ของ RD · PEAK/HashMicro/Chob · และแบบ ส.ค.2026 ที่ยื่นไปแล้ว (P300039607819) ใช้ 29,022.41×7% = 2,031.57 และ 1,000×7% = 70 พอดี — บิล Google เป็น **GST 0% ไม่มี VAT ไทยรวม** → เงินที่จ่ายทั้งหมด = ฐานภาษี |
| **Decision** | **#21 vat_amount = 29,017.52 × 7% = 2,031.23, net_amount = 29,017.52** → Net ภ.พ.30 ก.ค. = 2,445.45 − 2,031.23 = **414.22** และ **ภ.พ.36 = 29,017.52 / 2,031.23** (แทนเลขเดิม 1,898.34 = 7/107 และ 547.11)<br>ใช้แทน decision "547.11" ข้างต้น **เฉพาะส่วนวิธีคำนวณ**; ส่วน "ใช้แค่ #21 ไม่เอา #13/#22 ซ้ำ" **ยังคงเดิม** |
| **Alternatives** | คงวิธี 7/107 (1,898.34 / 547.11) — แม้ self-consistent (นำส่งแล้วหักคืนเท่ากัน) แต่ไม่ตรงแนวปฏิบัติและแบบอ้างอิงที่ยื่นผ่านมาแล้ว ต่างวิธี 3% ของเงินที่จ่าย *(หมายเหตุ: ดูหมายเหตุการคำนวณด้านล่าง)* |
| **Why** | ตรงแนววินิจฉัยสรรพากร + ตรงกับแบบ ส.ค. ที่ยื่นผ่านแล้ว → ลดความเสี่ยงถูกตั้งคำถาม/ผิดเพี้ยนเมื่อขอยื่นย้อนหลัง; รายได้/ภาระสุทธิเท่ากันทั้ง 2 วิธี (นำส่ง ภ.พ.36 เท่ากับหักเป็นภาษีซื้อใน ภ.พ.30) |
| **Impacted** | `expenses` id=21 (net 29,017.52 / vat 2,031.23 / notes อ้าง กค 0702/6764), PP30+PP36 draft ก.ค., `docs/TAX_WORKLOG.md`, `docs/BUSINESS_RULES.md` |
| **Rollback** | ถ้ายังไม่ยื่น → เปลี่ยน `vat_amount` กลับได้เลย; ถ้ายื่นแล้วไม่ต้องแก้ (2 วิธียอมรับได้ทั้งคู่, จำนวนต่างกัน <3% บนยอดภาษีซื้อ) |

> 🧮 **หมายเหตุการคำนวณ** (ตรวจสอบจากตัวเลขใน decision): ภาษีซื้อต่างกัน `2,031.23 − 1,898.34 = 132.89 บาท`
> คิดเป็น **6.54% ของยอดภาษีซื้อวิธี ×7%** (หรือ 7.00% ของวิธี 7/107)
> ส่วน **Net ภ.พ.30 สุทธิเท่ากันทั้งสองวิธี** เพราะ ภ.พ.36 ถูกหักกลับเต็มจำนวนเป็นภาษีซื้อ
> ดังนั้นถ้อยคำ "<3%" ใน `docs/DECISIONS.md` ควรอ่านว่า **อัตราต่างกันราว 0.46 จุดเปอร์เซ็นต์** (7% vs 7/107 = 6.54%) ไม่ใช่ผลต่างของจำนวนเงิน — ถ้าจะใช้ตัวเลขนี้ในการยื่นภาษี แนะนำยืนยันกับที่ปรึกษาภาษี/สรรพากรอีกครั้ง

---

## 2026-09-21 — Dominick Billing: Markup 25% ⭐

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | ต้นทุน Google Starter 137 lic เรียกเก็บเป็น USD (**843.92/เดือน**) ผันผวนตาม FX; เดิม fix ราคาขาย 34,935 THB → markup ลดลงจาก ~24.5% (มี.ค.) เหลือ ~20.4% (ก.ค.) เพราะ THB อ่อน; หากเรตถึง ~41.4/USD จะขาดทุน; พี่มีรายได้ประจำจากบิลนี้เพียงผู้เดียว (ไม่มีเงินเดือน) หลังหักค่าใช้จ่ายของตัวเอง (Google 1 seat = 1,000/เดือน) เหลือใช้แค่ ~4,800–4,900/เดือน |
| **Decision** | เปลี่ยนราคา Dominick เป็น **markup 25% บนต้นทุน USD**<br>`ราคา = 843.92 × 1.25 × เรตวันออกบิล`<br>เริ่มตั้งแต่บิล **ต.ค. 2026** — ไม่ fix THB อีกต่อไป<br>ต้องหาลูกค้าเพิ่มให้ได้รายได้รวม **≥ 10,000/เดือน** หลังหักค่าใช้ 1,000 |
| **Alternatives** | fix ราคาเดิม 34,935 (ขาดทุนแน่ถ้า THB อ่อนต่อ) / markup 20% (เหลือใช้แค่ ~4,800) / markup 24% (ยังต่ำกว่าเป้า 10,000) |
| **Why** | markup 25% = **~6,254/ลูกค้า/เดือน** หลังหัก 1,000 ที่เรต 34.385 → ต้องมีลูกค้าอย่างน้อย 2 รายเพื่อแตะ 10,000+/เดือน; กำไร % คงที่ ไม่แบกรับ FX; โปร่งใสให้ลูกค้าเห็นเรตจริง |
| **Impacted** | ราคาบิล Dominick งวดถัดไป (ต.ค. 2026), `docs/OPERATION_RUNBOOK.md` (Monthly Billing), การหาฐานลูกค้าเพิ่ม |
| **Rollback** | ถ้าลูกค้าไม่ยอมรับยอดใหม่ ให้กลับไปเจรจา/ลด markup ตามจริง — ต้องดูสัญญาที่พี่ตกลงกับลูกค้า |

### ตัวเลขที่ตรวจสอบย้อนได้ (ที่เรต 34.385)
| รายการ | ค่า |
|--------|-----|
| ยอดขาย (ก่อน VAT) | 843.92 × 1.25 × 34.385 = **36,271.90** |
| ต้นทุนจริง | **29,017.52** |
| กำไรขั้นต้น | **7,254.38** |
| หัก Google 1 seat | −1,000 |
| **เหลือใช้** | **6,254.38** ✅ ตรงกับ "~6,254" ใน decision |

---

## 2026-09-21 — นโยบาย Google-First ⭐

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | สิทธิ์ Google Workspace Business Plus (฿1,000/เดือน, 1 seat) มาพร้อมแอพ/บริการในตัว (Gmail, Drive, Sheets, Calendar, Photos, Vault ฯลฯ) — พบว่ามีหลายส่วนที่**จ่ายแล้วแต่ยังไม่ได้ใช้** เช่น คลาวด์ 5TB (ใช้ 7.8%), Vault/discovery, ขอบเขต API ต่าง ๆ |
| **Decision** | **เมื่อจะสร้างแอพ/โปรแกรม/ฟีเจอร์ใหม่ หรือเลือก service/provider → ใช้ประโยชน์จากแอพ Google ที่มีสิทธิ์อยู่ก่อนเสมอ** ก่อนไปเลือก provider/ซื้อบริการอื่น<br>ตัวอย่าง: backup, dashboard/รายงาน, เมลประกาศ, คลังเอกสาร, วิดีโอคอล |
| **Implementation notes** | ใช้ API ที่ scope มีอยู่แล้วก่อน (Drive/Sheets/Calendar/Admin-read/Reseller); เปิด scope เพิ่มเมื่อพี่อนุมัติ (Gmail → สแกนบิล, Vault → retention 7–10 ปี) |
| **Why** | ค่าใช้จ่ายนี้จ่ายอยู่แล้วทุกเดือน → ROI สูงสุดโดยไม่เพิ่มต้นทุน; ลด vendor sprawl; ข้อมูลอยู่ที่เดียวกับบัญชีธุรกิจ |
| **Impacted** | งานใหม่ทุกโปรเจกต์/ฟีเจอร์ — ตรวจ `GWS_APPS_INVENTORY.md` ก่อนตัดสินใจ vendor; `AGENTS.md` (กฎครอบครัว) |
| **Rollback** | ถ้า Google เปลี่ยนนโยบาย/ราคา กลับมาเปรียบเทียบ vendor อื่นได้ตามปกติ (กฎนี้เป็นการเรียงลำดับ "ลองก่อน" ไม่ใช่ห้ามเปลี่ยนชั่วนิรันด์) |

---

## 2026-10-06 — โครงสร้างแผนธุรกิจใหม่ 7 ไฟล์ + ราคาแพ็กเกจเว็บ

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **Context** | เอกสารเดิมเขียน 26 ก.ย. 2569 กระจาย 24 ไฟล์ · พี่ฆังสั่งเขียนแผนใหม่ทั้งหมดลงโครง 7 ไฟล์หลัก + เก็บไฟล์ IoT 11 ไฟล์เข้า `archive/` |
| **Decision** | **1)** แผนหลัก = 7 ไฟล์: 1-company-profile · 2-business-model-canvas · 3-market-competitor · 4-products-pricing · 5-visibility-plan · 6-roadmap-12-weeks · 7-action-calendar<br>**2)** **ราคาแพ็กเกจเว็บสำหรับ SME = 15,000–30,000 บาท/งาน** (ยืนยันจากพี่ฆังโดยตรง)<br>**3)** BMC ใช้โครง 4 มิติ (Who/What/How/Money) + เติม Customer Relationships · Channels · Revenue · Key Partners ตามที่พี่ฆังสั่ง |
| **Implementation notes** | ไฟล์เดิม (company-profile, product-catalog, pricing-strategy, competitor-analysis) คงไว้เป็นเอกสารอ้างอิง · config.ts อัปเดต nav/sidebar แล้ว · ราคาเว็บใส่ BMC + 4-products-pricing |
| **Why** | แผนเดิมกระจัดกระจาย ไม่มีภาพเดียวที่นำไปลงปฏิทินได้ — 7 ไฟล์ครอบคลุมครบวงจร ตั้งแต่ "เราเป็นใคร" ถึง "ตารางลง Calendar" |
| **Impacted** | เอกสารแผนธุรกิจทั้งหมด · `config.ts` · แผนลง Google Calendar `business` (ยังรอวันเริ่ม 12 สัปดาห์จากพี่ฆัง) |
| **Rollback** | โครงเดิมยังอยู่ครบ (ไฟล์ไม่ได้ลบ) — ย้อนได้โดยใช้ไฟล์เดิมเป็นหลัก |

---

## 🔗 Related Documents
- [Operations Runbook (archive)](/archive/operations-runbook) — Monthly Billing Dominick
- [Business Rules](/business-rules) — กฎ PDF Evidence First + reverse charge ×7%
- [Pricing Strategy](/pricing-strategy) — ตัวเลข markup 25%
- [Google Workspace Usage](/google-workspace-usage) — ต้นทุน Google-First

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **แหล่งอ้างอิง**: `Micro-Account/docs/DECISIONS.md` (ทุกรายการในหน้านี้มีที่มาในไฟล์ต้นทาง)