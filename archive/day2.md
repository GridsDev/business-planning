# Day 2 — บันทึกสถาปัตยกรรม Lightning / IoT Stack

> 📄 **ประเภทเอกสาร**: Historical Session Record + **Proposed Architecture**
> ⚠️ **คนละโครงการกับ Micro-Account** — เป็น Lightning/IoT stack ไม่ใช่เว็บบัญชี
> 🔴 **สถานะ: ส่วนใหญ่เป็น "ข้อเสนอ" ไม่ใช่สิ่งที่ deploy แล้ว**

---

## ⚠️ อ่านก่อนใช้

> เอกสารนี้เป็น **บทสนทนา/ข้อเสนอเชิงสถาปัตยกรรม** กับ Gemini
> **ยังไม่มีหลักฐานว่าส่วนใดถูก deploy จริง** เว้นแต่ระบุชัดเจนในตารางสถานะด้านล่าง
> อย่าใช้เอกสารนี้อ้างอิงเป็น "ระบบที่เรามีอยู่แล้ว"

---

## 🎯 บริบท

พี่ฆังกำลังออกแบบแพลตฟอร์ม **LNbits / Lightning Network + IoT** โดยใช้ Docker Compose เป็นแกนกลาง บนเครื่อง Optiplex 7040 (ดู [Hardware Infrastructure](/archive/hardware-infrastructure))

> 📌 **โปรเจกต์นี้แยกจาก Micro-Account** (ระบบบัญชี/ภาษี) และแยกจากเว็บ Microtronic
> ดู [Architecture](/archive/architecture) สำหรับสถาปัตยกรรมของเว็บบัญชี

---

## 🧱 Component ที่วางแผนไว้

| Component | บทบาท | สถานะ |
|-----------|--------|--------|
| **Next.js UI** | Frontend — TypeScript, App Router, โฟลเดอร์ `src`, Tailwind CSS | ⚠️ อยู่ใน `lightning-web-project/thunder-app/` — ยังไม่ยืนยันว่า deploy แล้ว |
| **Nginx** | เสิร์ฟ static files + reverse proxy | ⚠️ อยู่ใน `docker-compose.yml` — ยังไม่ยืนยันว่ารันอยู่ |
| **PostgreSQL** | ฐานข้อมูลหลัก (แอป + IoT + ผู้ใช้) | ✅ **ยืนยันว่ารันอยู่จริง** (บน Optiplex 7040 ผ่าน Docker Compose) |
| **Mosquitto** | MQTT Broker สำหรับ IoT | ⚠️ อยู่ใน `docker-compose.iot.yml` — ยังไม่ยืนยันว่ารันอยู่ |
| **Node-RED** | Low-code สร้าง Flow Logic + Dashboard สำหรับ IoT | ⚠️ อยู่ใน `docker-compose.iot.yml` — ยังไม่ยืนยันว่ารันอยู่ |
| **LND Node** | Lightning Network Daemon | ✅ **ยืนยันว่ารันอยู่จริง** (Optiplex 7040, เชื่อม NUC7JY) |

---

## 📡 รายละเอียดการตั้งค่า (ตามเอกสารเดิม)

### Mosquitto
| หัวข้อ | ค่า |
|--------|-----|
| Image | `eclipse-mosquitto:2.0.18` |
| Port | `1883` (MQTT) · `9001` (MQTT over WebSockets) |
| Container | `iot_mosquitto` |
| Network | `iot_network` |
| Volumes | `./mosquitto/config` (ro) · `./mosquitto/data` · `./mosquitto/log` |
| ⚠️ ค่าเริ่มต้นเดิม | `allow_anonymous true` — **ต้องปิด** ดู [Security](/archive/add-security_system) |

### Node-RED
| หัวข้อ | ค่า |
|--------|-----|
| Image | `nodered/node-red:latest` |
| Port | `1880` (UI) |
| Container | `iot_nodered` |
| Timezone | `Asia/Bangkok` |
| Volumes | `./nodered/data:/data` + `settings.js` (ro) |
| Network | `iot_network` (เชื่อม Mosquitto ด้วย hostname `mosquitto`) |
| Ordering | `depends_on: mosquitto` |

### LND
| หัวข้อ | ค่า (ตัวอย่างจาก `docker-compose.lnd.yml`) |
|--------|----------|
| Image | `lightninglabs/lnd:v0.18.1-beta` |
| Port | `9735` (P2P) · `10009` (gRPC) · `8080` (REST) |
| Volume | `lnd_data:/root/.lnd` (blockchain, channels, wallet) |
| Network | `lnd_network` |

> ⚠️ **คำเตือนจากเอกสารเดิม**: `no-macaroons=true` และ `tlsdisableautofill=true` **ไม่ควรใช้ใน production** — ต้องศึกษาเรื่อง Macaroons และ TLS Certificates อย่างละเอียด

---

## 🔮 Component ที่ "แนะนำ" (ยังไม่ได้ทำ — ต้องยืนยัน)

> 🔴 ทั้งหมดในหัวข้อนี้เป็น **ข้อเสนอ** จากบทสนทนา ไม่มีหลักฐานว่า implement แล้ว

| Component | บทบาท | เหตุผล | สถานะ |
|-----------|--------|-------|--------|
| **Prometheus** | เก็บ Metric ของ Services | เห็น "สุขภาพ" ระบบแบบเรียลไทม์ | 🚫 ยังไม่ทำ |
| **Grafana** | Dashboard + Visualization | แสดงผลแบบสวยงาม | 🚫 ยังไม่ทำ |
| **cAdvisor** | เก็บ Resource usage ของ container | คู่กับ Prometheus | 🚫 ยังไม่ทำ |
| **WireGuard** | VPN Server เข้ารหัส | เข้าถึง Docker services จากภายนอกอย่างปลอดภัย | 🚫 ยังไม่ทำ |
| **Firebase Auth** | Authentication | เร็ว/Scale/ปลอดภัยสูง (ดูแลโดย Google) | 🚫 ยังไม่ทำ — ต้นทุน/สิทธิ์ยังไม่ชัด (ดูหมายเหตุด้านล่าง) |

---

## 🔐 แนวทาง Authentication & Authorization (ข้อเสนอ)

> แยก 2 เรื่อง: **Authentication** (ยืนยันตัวตน = ใคร) vs **Authorization** (อนุญาต = ทำอะไรได้)

| ชั้น | ข้อเสนอ | สถานะ |
|-----|--------|--------|
| Authentication (UI) | Firebase SDK ใน Next.js | 🚫 ยังไม่ทำ |
| Token verification (Backend) | Firebase Admin SDK ตรวจสอบ token | 🚫 ยังไม่ทำ |
| Authorization (Backend) | JWT + Roles/Permissions เก็บใน PostgreSQL | 🚫 ยังไม่ทำ |
| Postgres security | รหัสผ่านแข็งแรง + สิทธิ์เท่าที่จำเป็น | ⚠️ ต้องตรวจ |
| Mosquitto security | Username/Password + ACL, **ปิด `allow_anonymous`** | ⚠️ ต้องตรวจ |
| Node-RED security | เปิด Admin Authentication | ⚠️ ต้องตรวจ |
| HTTPS | Nginx + SSL/TLS (เช่น Let's Encrypt) | ⚠️ ต้องตรวจ |

> 🚫 **2026-09-26 — พี่ฆังยกเลิกการตัดสินใจเรื่อง auth stack ของ Lightning/IoT**
> เอกสารนี้จึงบันทึก Firebase Auth / NextAuth / Google OAuth ไว้ **เฉพาะในฐานะข้อเสนอจากบทสนทนาเดิม**
> ไม่ต้องเปรียบเทียบ ไม่ต้องยืนยันต้นทุน Blaze plan / consent screen / เงื่อนไข Noventiq
> → ดู [Decisions Log](/decisions-log) และ [To-Do List](/archive/To-do-List)

---

## ☁️ ตัวเลือก Google Cloud ที่พูดถึง (ยังไม่ตัดสินใจ)

| บริการ | ใช้ทำอะไร | หมายเหตุ |
|--------|----------|----------|
| **Google Kubernetes Engine (GKE)** | Hosting ระบบซับซ้อน / Scale | หนักเกินไปสำหรับ use case นี้? |
| **Cloud Run** | Serverless container | เหมาะกับ Next.js UI |
| **Compute Engine** | VM ควบคุมเต็มรูปแบบ | ทางเลือก |
| **Cloud SQL (PostgreSQL)** | ฐานข้อมูลที่ไม่ต้องดูแลเอง | — |
| **Cloud Pub/Sub** | Messaging ที่ Scale สูง | — |
| **BigQuery** | เก็บ/วิเคราะห์ข้อมูล IoT ขนาดใหญ่ | — |
| **Vertex AI** | สร้าง ML model จากข้อมูล IoT | — |

> ⚠️ พูดถึง Free Tier / Free Trial ($300 เครดิต 90 วัน) แต่ **ยังไม่ได้ตัดสินใจย้ายอะไรทั้งสิ้น** ระบบยังรันบน Optiplex 7040

---

## 🤖 แนวคิด AI/ML (ยังไม่เริ่ม)

| เครื่องมือ | บทบาท | Use case ที่คิดไว้ |
|----------|--------|----------------|
| **Ollama** | รัน LLM บนเครื่องตัวเอง (ถ้ามี GPU) | ลดการพึ่ง Cloud API |
| **FlowiseAI / Langflow** | Low-code สร้าง LLM App | Chatbot · RAG pipeline |
| — | — | Predictive Maintenance จากข้อมูลเซ็นเซอร์ |
| — | — | Anomaly Detection |
| — | — | NL → Query สำหรับ Dashboard |
| — | — | AI Chatbot ควบคุม IoT ด้วยแชท |

> 🚫 ยังไม่มีหลักฐานว่ามีการติดตั้งหรือทดลองใด ๆ

---

## 📐 Framework ที่แนะนำ (ยังไม่ได้ตัดสินใจ)

| ชั้น | ตัวเลือก | ข้อเสนอ |
|------|---------|--------|
| Backend | **Option A**: Next.js API Routes / Server Actions | ✅ แนะนำ (เรียนรู้ง่าย, โค้ด repo เดียว) |
| Backend | Option B: NestJS หรือ Express (TS) | เมื่อโปรเจกต์ใหญ่ขึ้น |
| ORM | Prisma หรือ Drizzle | ✅ แนะนำ Prisma (type-safe สูง, migrations ดี) |
| Auth | NextAuth.js (Auth.js) | ✅ แนะนำ (ครบวงจร, เชื่อม DB ได้) |
| UI | Shadcn/ui + Tailwind CSS | ✅ แนะนำ (full control over styling) |

> 🔴 **ข้อขัดแย้งสำคัญ**: บทสนทนานี้แนะนำ **NextAuth.js** และ **Firebase Auth**
> แต่โปรเจกต์ **Micro-Account** ใช้ `@react-oauth/google` + `jose` + `bcryptjs` (ไม่มี `next-auth`)
> และ `Micro-Account/docs/ARCHITECTURE.md` ระบุ **NextAuth** — สามทางไม่ตรงกัน
> → ต้องตัดสินใจข้ามโปรเจกต์ ดู [Architecture](/archive/architecture)

---

## 🔗 โครงสร้าง Docker Compose ที่เสนอ (4 ไฟล์)

| ไฟล์ | บริการ |
|------|--------|
| `docker-compose.iot.yml` | Mosquitto + Node-RED |
| `docker-compose.nextjs.yml` | Next.js UI |
| `docker-compose.backend.yml` | Backend + PostgreSQL |
| `docker-compose.lnd.yml` | LND Node |

การเชื่อมข้ามไฟล์ด้วย **External Network**: `docker network create shared_app_network` แล้วตั้ง `external: true` ในทุกไฟล์

> ⚠️ **สถานะ**: นี่คือ **ข้อเสนอ** — ไม่ได้ยืนยันว่าแยกไฟล์ตามนี้จริง
> สิ่งที่ยืนยันคือ Optiplex 7040 ใช้ **network เดียว** ชื่อ `local-Network-Dev` ดู [Hardware Infrastructure](/archive/hardware-infrastructure)

---

## 🔗 Related Documents
- [Day 1](/archive/day1) — บันทึกก่อนหน้า (เว็บ Microtronic)
- [Security & Auth](/archive/add-security_system) — ข้อเสนอด้านความปลอดภัยฉบับเต็ม
- [Hardware Infrastructure](/archive/hardware-infrastructure) — เครื่องที่ใช้จริง
- [External Drive Structure](/external) — โครงสร้าง `lightning-web-project`
- [To-Do List](/archive/To-do-List) — งานค้าง
- [Architecture](/archive/architecture) — สถาปัตยกรรม Micro-Account (คนละโปรเจกต์)

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **ประเภท**: ข้อเสนอเชิงสถาปัตยกรรม — ยังไม่ยืนยันการนำไปใช้จริง