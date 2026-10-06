# Business Rules — กฎทางธุรกิจ/บัญชี/ภาษี (Canonical)

> สรุปจาก `Micro-Account/docs/BUSINESS_RULES.md` (ไฟล์ authoritative) + `BUSINESS_CONTEXT.md`
> 🚫 ถ้าเอกสารนี้ขัดกับ `CORE_RULES.md` หรือ `RBAC_STANDARD.md` → **สองไฟล์นั้นชนะ**

---

## 📌 ลำดับความสำคัญของเอกสาร (KNOWLEDGE_PACK.md)

อ่านตามลำดับนี้ก่อนทำงาน:

1. `CORE_RULES.md`
2. `docs/RBAC_STANDARD.md`
3. `docs/BUSINESS_RULES.md` ← เอกสารนี้
4. `docs/ARCHITECTURE.md`
5. `docs/OPERATION_RUNBOOK.md`
6. `docs/DECISIONS.md`
7. `docs/INCIDENT_LOG.md`
8. `docs/CHANGELOG_PROJECT.md`

**นโยบายอัปเดต:**
- อัปเดตเอกสาร **ก่อนหรือพร้อมกับ** การเปลี่ยนโค้ด
- บันทึกสั้น ตรงไปตรงมา มีวันที่
- **ห้ามลบประวัติ incident** — ให้เพิ่มรายการแก้ไขต่อท้าย
- ถ้าเอกสารขัดกัน → `CORE_RULES.md` + `RBAC_STANDARD.md` ชนะ

---

## 1. โมเดลธุรกิจ

| กฎ | รายละเอียด |
|----|---------|
| **Operating model** | Intermediary / Agent model (ตัวกลาง) |
| **Supplier invoice** | บันทึกเป็น **ต้นทุน (cost)** |
| **Customer invoice** | บันทึกเป็น **รายได้ (revenue)** |

### กระบวนการ
```
1. รับ QT จากซัพพลายเออร์ (เช่น Noventiq)
2. ออก QT ในนามเราให้ลูกค้า + Markup
3. ได้ Invoice จากซัพพลายเออร์ → Expense (ต้นทุน)
4. ออก Invoice ให้ลูกค้า → Revenue (รายได้)
```
ลักษณะรายได้: รายได้จากการให้บริการประสานงาน + สิทธิ์การใช้งาน (Service/Agent Fee)

---

## 2. กฎบัญชี

| กฎ | รายละเอียด |
|----|---------|
| **Double-entry บังคับ** | ทุกเหตุการณ์ทางธุรกิจต้องมี Dr/Cr |
| **Canonical journal mapping** | ใช้ 3 ฟิลด์: `debit_account_id` · `credit_account_id` · `amount` |

### บัญชีมาตรฐานที่ใช้จริง
| รหัส | ชื่อบัญชี | ประเภท |
|-----|----------|--------|
| 1121 | ลูกหนี้ — MICROTRONIC | สินทรัพย์ |
| 1141 | ภาษีซื้อ | สินทรัพย์ |
| 2110 | เจ้าหนี้ — Noventiq | หนี้สิน |
| 2121 | ภาษีขาย | หนี้สิน |
| 2130 | ภาษีหัก ณ ที่จ่ายค้างจ่าย | หนี้สิน |
| 4110 | รายได้จากการขายและบริการ | รายได้ |
| 5110 | ต้นทุนค่าสิทธิ์/บริการ | ต้นทุน |

---

## 3. กฎภาษี

| กฎ | รายละเอียด |
|----|---------|
| **VAT** | ตาม company settings ที่ตั้งค่าไว้ |
| **WHT (ค่าเริ่มต้น)** | **3%** สำหรับ service flows ที่รองรับ |
| **ข้อยกเว้น** | ต้องบันทึกไว้ในเอกสารนี้ **ก่อน** implement |

> การเลือกใช้ 3% อ้างอิง: กิจกรรมตามรูปแบบ "การให้บริการประสานงาน" (`BUSINESS_CONTEXT.md`)

---

## 4. กฎการบันทึกค่าใช้จ่าย — PDF Evidence First ⭐

> **กฎที่บังคับใช้จริงแล้ว** (ตัดสินใจ 2026-09-21 หลังเจอตัวเลขเพี้ยนจากการเดา)

### ขั้นตอนบังคับ
1. **ก่อนบันทึกค่าใช้จ่ายทุกครั้ง** ต้องแปลง/อ่าน PDF ต้นทาง (invoice/statement) ก่อนเสมอ
2. ใช้เครื่องมือ: `~/workspace/services/python/pdf-tools/pdf_toolkit.py`
   - `extract_text_pdfplumber`
   - `extract_text_pypdf`
   - `pdf_to_images`
3. ดึงตัวเลขจริงจาก PDF: ยอดเงิน, VAT, สกุลเงิน, อัตราแลกเปลี่ยน (เช่น TC rate บน KTC statement)
4. **ห้ามเดาตัวเลขเด็ดขาด**

### ฟิลด์ที่ต้องบันทึกให้ตรงกับหลักฐาน
`net_amount` · `vat_amount` · `original_currency` · `original_amount` · `exchange_rate`

### กฎ `pp36_exempt`
- ตั้ง `pp36_exempt = true` **เฉพาะเมื่อ** หลักฐานยืนยันว่าซัพพลายเออร์เก็บภาษี VAT ไทยแล้ว
- **Google Workspace = reverse charge ต้องยื่น ภ.พ.36** → ใบกำกับสิงคโปร์ (GST 0%, ระบุว่า "เอกสารนี้ไม่ใช่ใบกำกับภาษีของประเทศไทย") → `pp36_exempt = false`

### 🔑 กฎคำนวณภาษีซื้อ reverse charge (สำคัญมาก)
```
ภาษีซื้อ = เงินที่จ่ายจริง (THB) × 7%      ← ใช้ 7% ของเงินที่จ่าย
                ✗ ห้ามใช้ 7/107
```
**เหตุผล**: บิลสิงคโปร์เป็น **GST 0% ไม่มี VAT ไทยรวม** → เงินที่จ่ายทั้งหมดคือฐานภาษี

**หลักฐานยืนยัน:**
- แนววินิจฉัย กค 0702/6764 — "นำส่งภาษีในอัตราร้อยละ 7.0 ของเงินที่จ่าย"
- แบบฟอร์ม ภ.พ.36 ของกรมสรรพากร
- แบบ ส.ค.2026 ที่ยื่นไปแล้ว (ref P300039607819): 29,022.41 × 7% = 2,031.57 และ 1,000 × 7% = 70
- ระบบ PEAK / HashMicro / Chob ใช้วิธีเดียวกัน

> 7/107 ใช้กรณีที่จำนวนเงิน **รวม VAT ไทยแล้ว** เท่านั้น

### ตัวอย่างจริง: ค่าใช้จ่าย #21 (Google Starter 137 lic)
| รายการ | ค่า |
|--------|-----|
| เงินที่จ่าย | 29,017.52 THB (USD 843.92 @ 34.385) |
| `net_amount` | 29,017.52 |
| `vat_amount` | 29,017.52 × 7% = **2,031.23** |
| `pp36_exempt` | `false` |
| หมายเหตุ | อ้าง กค 0702/6764 |

### การจัดเก็บหลักฐาน
- ไฟล์ใบกำกับ Google เก็บใน **Drive** โฟลเดอร์รายเดือน ชื่อ = `tax_invoice_no.pdf` (เลข 10 หลัก)
- เก็บ PDF ต้นทางเป็นหลักฐานใน `docs/statements/`

---

## 5. กฎบทบาทและสิทธิ์

| กฎ | รายละเอียด |
|----|---------|
| **บทบาทมาตรฐานเท่านั้น** | `superadmin` · `admin` · `user` |
| **สิทธิ์มาจาก RBAC group** | ไม่ hardcode สิทธิ์ตามบทบาท |
| **เก็บ role เป็นตัวพิมพ์เล็กเท่านั้น** | ห้ามใช้ alias จากเวอร์ชันเก่า |
| **UI แปลภาษาได้** | แต่ค่าที่เก็บต้องเป็น canonical |

**Actions**: `create` · `read` · `update` · `delete` · `export` · `manage`

> รายละเอียด: `Micro-Account/docs/RBAC_STANDARD.md`

---

## 6. กฎคุ้มครองข้อมูล

| กฎ | รายละเอียด |
|----|---------|
| **ห้าม destructive operation ใน production** | ห้าม DROP / reset / สร้างตารางใหม่เพื่อแก้ schema |
| **ต้องเก็บหลักฐานทางบัญชีย้อนหลัง** | ห้ามลบ/แก้ประวัติ |
| **Migration ต้อง additive / backward-compatible** | ห้ามทำให้ของเดิมพัง |

---

## 7. Change Control

| กฎ | รายละเอียด |
|----|---------|
| แก้ไฟล์นี้เมื่อ business logic เปลี่ยน | — |
| ผูกการเปลี่ยนแปลงโค้ดกับรายการใน `docs/DECISIONS.md` | — |
| PR ต้องผ่าน knowledge enforcement | `.github/workflows/knowledge-guard.yml` + PR template |

---

## 🔗 Related Documents
- [Architecture](/archive/architecture) — โครงสร้างระบบ
- [Operations Runbook](/archive/operations-runbook) — ขั้นตอนทำงาน
- [Decisions Log](/decisions-log) — การตัดสินใจ
- [Pricing Strategy](/pricing-strategy) — ราคา markup 25%

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **แหล่งอ้างอิง**: `Micro-Account/docs/BUSINESS_RULES.md`, `BUSINESS_CONTEXT.md`, `KNOWLEDGE_PACK.md`, `DECISIONS.md`