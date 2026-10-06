# To-Do List — งานค้างของ Lightning / IoT Stack

> 🔴 **ขอบเขต**: รายการนี้เป็นงานของ **Lightning/IoT stack** (Day 2) — **ไม่ใช่** Micro-Account
> ดู [Business Rules](/business-rules) และ [Operations Runbook](/archive/operations-runbook) สำหรับงานของระบบบัญชี
> ⚠️ รายการทั้งหมดมาจากแผนที่วางไว้ — **ยังไม่มีหลักฐานว่าอันใดเสร็จ**

---

## 📋 สรุปสถานะ

| # | งาน | ลำดับ | สถานะ |
|---|-----|--------|--------|
| 1 | ความปลอดภัยพื้นฐาน + Authentication | 🔴 สูงสุด | 🚫 ยังไม่ยืนยัน |
| 2 | เชื่อม LNbits UI กับ Backend | 🟠 สูง | 🚫 ยังไม่ยืนยัน |
| 3 | Deploy ระบบมอนิเตอร์ (Prometheus + Grafana) | 🟡 กลาง | 🚫 ยังไม่ทำ |
| 4 | สร้าง VPN Server (WireGuard) | 🟡 กลาง | 🚫 ยังไม่ทำ |
| 5 | สำรวจ/ผสาน AI/ML | ⚪ อนาคต | 🚫 ยังไม่เริ่ม |

---

## 1️⃣ ความปลอดภัยพื้นฐานและ Authentication

> 🔴 **สำคัญสูงสุดอันดับ 1** — รายละเอียดฉบับเต็มที่ [Security & Auth](/archive/add-security_system)

| # | งาน | สถานะ | หมายเหตุ |
|---|-----|--------|----------|
| 1.1 | ตั้งรหัสผ่านแข็งแรงสำหรับ PostgreSQL user + กำหนดสิทธิ์เท่าที่จำเป็น | ⚠️ ต้องตรวจ | PostgreSQL รันจริงแล้ว |
| 1.2 | Mosquitto: Username/Password + ACL + **ปิด `allow_anonymous true`** | ⚠️ ต้องตรวจ | ค่าเริ่มต้นเป็น `true` |
| 1.3 | Node-RED: เปิด Admin Authentication | ⚠️ ต้องตรวจ | |
| 1.4 | Firebase Authentication (SDK ใน Next.js + Admin SDK ใน Backend) | 🚫 **นอกขอบเขต** | ยกเลิกการตัดสินใจ 2026-09-26 |

> **เหตุผลที่เป็นอันดับ 1**: ถ้าพื้นฐานไม่มั่นคจะมีความเสี่ยง ทุกอย่างจะพังตามมา

> 🚫 **2026-09-26 — พี่ฆังยกเลิกการตัดสินใจเรื่อง auth stack ของ Lightning/IoT**
> → ไม่ต้องเปรียบเทียบ Firebase / Google OAuth / NextAuth / LNbits key
> → ไม่ต้องยืนยันต้นทุน Blaze plan, OAuth consent screen หรือเงื่อนไข Noventiq
> → ข้อ 2.2 ใน To-Do นี้จึง **ยังไม่มีคำตอบว่าใช้อะไร** และไม่ต้องรีบ — เอาข้อ 1.1–1.3 (ปิดช่องโหว่จริง) ก่อน
> → ดู [Decisions Log](/decisions-log)

---

## 2️⃣ เชื่อมต่อ LNbits UI กับ Backend

| # | งาน | สถานะ |
|---|-----|--------|
| 2.1 | พัฒนา Backend (LNbits Backend เอง หรือ API ที่เขียนเอง เพื่อเชื่อม UI กับการควบคุม IoT) | 🚫 ยังไม่ยืนยัน |
| 2.2 | Authorization: ตรวจสอบ JWT + ใช้ Roles/Permissions ใน PostgreSQL คุมการเข้าถึง API | 🚫 ยังไม่ยืนยัน |

> **เหตุผล**: ทำให้ Frontend ↔ Backend ทำงานร่วมกันได้สมบูรณ์ และมี security layer

> 🚫 **ไม่ต้องรีบ**: ยังไม่มีการตัดสินใจเรื่อง auth (ยกเลิก 2026-09-26)
> รายการนี้ผูกกับข้อ 1.4 ซึ่งพักไว้ — ทำข้อ 1.1–1.3 (ปิดช่องโหว่จริง) ก่อน
> ดู [Security & Auth](/archive/add-security_system) และ [Architecture](/archive/architecture)

---

## 3️⃣ ระบบมอนิเตอร์ (Prometheus + Grafana)

| # | งาน | สถานะ |
|---|-----|--------|
| 3.1 | เพิ่ม services Prometheus + Grafana + cAdvisor ลง `docker-compose.yml` | 🚫 ยังไม่ทำ |
| 3.2 | ตั้งค่า `prometheus.yml` + เชื่อม Grafana กับ Prometheus | 🚫 ยังไม่ทำ |

> **เหตุผล**: เห็น "สุขภาพ" ของระบบและข้อมูลสำคัญแบบเรียลไทม์ จำเป็นมากในการแก้ปัญหา

> 📌 **แนะนำ**: ทำข้อนี้หลังข้อ 1–2 เสร็จ เพราะถ้ายังไม่มี Backend ที่ชัดเจน ก็ยังไม่มีอะไรให้มอนิเตอร์

---

## 4️⃣ VPN Server (WireGuard)

| # | งาน | สถานะ |
|---|-----|--------|
| 4.1 | เพิ่ม service WireGuard ลง `docker-compose.yml` | 🚫 ยังไม่ทำ |
| 4.2 | ตั้งค่า `SERVERURL`, `SERVERPORT`, `PEERS` | 🚫 ยังไม่ทำ |

> **เหตุผล**: ช่องทางเข้าถึงระบบจากระยะไกลอย่างปลอดภัย
> ⚠️ ควรพิจารณาทำ **ก่อน**เปิด port ใด ๆ ออกอินเทอร์เน็ต

---

## 5️⃣ สำรวจและผสาน AI/ML

| # | งาน | สถานะ |
|---|-----|--------|
| 5.1 | ทดลอง Ollama / FlowiseAI ด้วย Docker Compose (ถ้ามี Hardware รองรับ) | 🚫 ยังไม่เริ่ม |
| 5.2 | ระบุ Use case ที่ชัดเจน | 🚫 ยังไม่เริ่ม |

> **เหตุผล**: เตรียมพร้อมเทคโนโลยีแห่งอนาคต เพิ่มจุดเด่นให้แพลตฟอร์ม

> 📌 **ต้องตรวจก่อน**: เครื่องมี GPU หรือไม่? 🚫 ไม่มีข้อมูลสเปก (ดู [Hardware Infrastructure](/archive/hardware-infrastructure))

---

## 🔴 งานที่ยังไม่อยู่ในรายการเดิมแต่ควรทำ

> หากพี่ฆังอนุมัติเพิ่ม — เหตุผลด้านความปลอดภัย/ความเสี่ยง

| # | งาน | เหตุผล |
|---|-----|--------|
| A | **เก็บสำรอง LND `chain_sync.db` + macaroons + `tls.cert` แยกจากเครื่อง** | ถ้าเครื่องเสีย = ทุน Lightning หายถาวร |
| B | **เก็บสำรอง NUC7JY (Bitcoin blockchain data)** | เสียเวลา sync ใหม่หลายวัน |
| C | **ทดสอบ restore จาก backup** | backup ที่ไม่ restore ได้ = ไม่มี backup |
| D | **กำหนด port ที่เปิดออกสู่ภายนอก + Firewall** | ดู [Hardware Infrastructure](/archive/hardware-infrastructure) |
| E | **หมุนรอบ credential** (LND macaroon, Postgres password, LNbits admin key) | credential รั่วต้องหมุนได้ |
| F | **ตรวจสอบสถานะจริงของ service ทุกตัว** (`docker ps`) | ปัจจุบันหลายรายการเป็น "ยังไม่ยืนยัน" |

---

## 🔗 Related Documents
- [Security & Auth](/archive/add-security_system) — รายละเอียดข้อ 1
- [Day 2](/archive/day2) — บริบทสถาปัตยกรรม
- [Hardware Infrastructure](/archive/hardware-infrastructure) — สถานะเครื่องจริง
- [Architecture](/archive/architecture) — ข้อขัดแย้งเรื่อง Auth
- [Decisions Log](/decisions-log) — นโยบาย Google-First

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **หมายเหตุ**: ยังไม่มี item ใดถูกทำเสร็จและยืนยัน — ทุกอย่างรอการตรวจสอบสภาพจริง