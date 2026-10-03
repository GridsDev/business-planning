# Operations Runbook — ขั้นตอนการทำงานและการกู้คืน

> สรุปจาก `Micro-Account/docs/OPERATION_RUNBOOK.md` (ไฟล์ authoritative)

---

## ✅ Pre-Change Checklist (ก่อนเปลี่ยนแปลงใด ๆ)

- [ ] ยืนยันว่า **มี backup ล่าสุดแล้ว**
- [ ] อ่าน `CORE_RULES.md` และ `docs/RBAC_STANDARD.md`
- [ ] ยืนยันว่า change เป็น **non-destructive**
- [ ] ระบุ **rollback path** ไว้ก่อน

---

## 🚀 Safe Deployment Sequence

```
1. Apply additive migration (ถ้าจำเป็น)
2. Deploy code
3. Verify critical routes
4. Verify journal write/read behavior
5. Verify RBAC access boundaries
```

> **ลำดับสำคัญ**: migration ก่อน code — เพราะต้องเป็น additive/backward-compatible โค้ดเก่าต้องยังทำงานได้ชั่วคราว

---

## 🔍 Critical Verification (ตรวจหลัง deploy)

### การเข้าสู่ระบบ
- [ ] `superadmin` login ได้
- [ ] `admin` login ได้
- [ ] `user` login ได้

### การควบคุมสิทธิ์
- [ ] หน้า admin ถูกบล็อกสำหรับ non-admin

### การทำบัญชี
- [ ] สร้าง invoice/expense แล้ว post journal ถูกต้อง
- [ ] Dashboard อ่านค่าได้ตามที่คาด

### Governance checks
```bash
npm run check:knowledge
npm run check:consistency
npm test
```

---

## ↩️ Rollback Guidance

1. **Revert code changes ก่อน**
2. **เก็บข้อมูลไว้** — ห้ามลบ
3. ใช้ **compensating migration** เฉพาะเมื่อจำเป็น
4. บันทึก incident ลง `docs/INCIDENT_LOG.md`

---

## ⛔ Prohibited Recovery Actions (ห้ามทำเด็ดขาด)

| ห้าม | เหตุผล |
|------|--------|
| ❌ `DROP TABLE` | ทำลายหลักฐานทางบัญชี |
| ❌ สร้างตารางใหม่เพื่อแก้ column mismatch | ทำให้ข้อมูลหาย |
| ❌ mass destructive delete ใน production | ไม่มีทางกู้คืน |

---

## 💰 Monthly Billing: Dominick (ทุกเดือน)

> บันทึก 2026-09-21 โดยพี่ฆัง

### ข้อมูลลูกค้า
> 🔒 **Internal only** — ข้อมูลผู้ติดต่อลูกค้าห้ามแจกจ่ายนอกทีม / นำไปใส่เว็บสาธารณะ

| รายการ | ค่า |
|--------|-----|
| **ลูกค้า** | บริษัท ดอมนิค (ประเทศไทย) จำกัด (contact_id 1) |
| **ผู้ติดต่อ** | Somsak@dhrlt.com |
| **บริการ** | Google Workspace Business Starter — 137 seats |
| **ต้นทุน/เดือน** | USD 843.92 |

### กำหนดเวลา
> ออกใบแจ้งหนี้ให้ Dominick **ภายในวันที่ 1–2 ของทุกเดือน**

### ประวัติจริงในระบบ (ยอดอ้างอิง)
| Invoice | เดือน | ยอดก่อน VAT | VAT | สถานะ |
|---------|-------|------------|-----|--------|
| INV028 | พ.ค. 2026 | 34,935 | 2,445.45 | paid |
| INV031 | ก.ค. 2026 | 34,935 | 2,445.45 | paid (ออก 6/7) |
| INV032 | ส.ค. 2026 | 34,935 | 2,445.45 | paid (ออก 4/8) |
| INV033 | ก.ย. 2026 | 34,935 | 2,445.45 | paid (ออก 1/9, ครบ 16/9) |
| INV030 | มิ.ย. 2026 | 4,200 | 294 | รายการแยกต่างหาก |

### งวดถัดไป
| หัวข้อ | ค่า |
|--------|-----|
| **ครบกำหนด** | **1–2 ต.ค. 2026** |
| **ขั้นตอน** | เช็คยอด **Google ล่าสุด** ก่อนออกบิล — ก.ย. = THB 28,183.05 |
| **ข้อเตือน** | **อย่าใช้ยอดเก่าลอยๆ** |
| **ข้อควรรู้** | ยอดจริงของเดือนหน้าขึ้นกับรูปเรียกเก็บของ Google เดือนนั้น → **ตรวจแล้วค่อยออก** |

---

## 💵 Dominick Pricing (ตั้งแต่ ต.ค. 2026)

> ตัดสินใจ 2026-09-21 — ดูรายละเอียดใน [Decisions Log](/decisions-log)

### สูตร
```
ราคา = 843.92 USD × 1.25 × เรต THB/USD ของวันออกบิล
```

### เหตุผลที่เลิก fix ราคา
| ปัญหา | ตัวเลข |
|-------|--------|
| ต้นทุนเป็น USD ผันผวน | markup ลดลงจาก ~24.5% (มี.ค.) เหลือ ~20.4% (ก.ค.) |
| จุดขาดทุนของราคาเดิม 34,935 | ที่เรต ~41.4 THB/USD |
| markup 25% แก้ปัญหา | กำไร % คงที่ ไม่แบกรับ FX |

### กฎการหาเรต
- **ดึงเรตจริงวันนั้น** ผ่าน `GET /api/fx-rate` (Bank of Thailand ผ่าน Frankfurter)
- **ต้องมีหลักฐาน/ที่มา** — **ห้ามเดา**

### เป้าหมายรายได้
| รายการ | ค่า (ที่เรต 34.385) |
|--------|-------------------|
| ยอดขาย/เดือน | 36,271.90 THB (ก่อน VAT) |
| ต้นทุนจริง | 29,017.52 THB |
| กำไรขั้นต้น | 7,254.38 THB |
| หักค่าใช้เอง (Google 1 seat) | −1,000 THB |
| **เหลือใช้จริง** | **6,254.38 THB/เดือน** |
| **เป้าหมาย** | ≥ 10,000 THB/เดือน → **ต้องมีลูกค้าอย่างน้อย 2 ราย** |

> ⚠️ ปัจจุบันมีลูกค้าที่ยืนยันแล้ว **1 ราย** → ยังไม่ถึงเป้า ต้องหาลูกค้าเพิ่ม

---

## 📅 งานอัตโนมัติที่ตั้งไว้

| เวลา | งาน | สถานะ |
|-----|------|--------|
| วันที่ **15** ของทุกเดือน | Calendar เตือนภาษี | ✅ ใช้งานแล้ว |
| วันที่ **20** ของทุกเดือน | Calendar เตือนภาษี | ✅ ใช้งานแล้ว |
| **02:00** ทุกวัน | Auto-backup DB → Drive `Backup-Auto` | ✅ ใช้งานแล้ว |
| ตามรอบ | `npm run tax:update` | ✅ มี script |
| ตามรอบ | `npm run ai:audit` | ✅ มี script |
| **02:05** | Sheets Dashboard | ⚠️ รอ enable Sheets API |

> ดู [Google Workspace Usage](/google-workspace-usage) และ [Automation Scripts](/gws-automation)

---

## 🔗 Related Documents
- [Architecture](/architecture)
- [Business Rules](/business-rules) — กฎ PDF Evidence First
- [Decisions Log](/decisions-log)
- [Pricing Strategy](/pricing-strategy)

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **แหล่งอ้างอิง**: `Micro-Account/docs/OPERATION_RUNBOOK.md`, `DECISIONS.md`, `GWS_APPS_INVENTORY.md`