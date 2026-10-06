# Hardware Infrastructure — โครงสร้างพื้นฐาน

> สรุปจาก `Optiplex7040.md` (ไฟล์เดิมของ repo นี้) + `external.md` + `day2-summary.md`
> ✅ = ยืนยันแล้ว · ⚠️ = ยังไม่ยืนยัน · 🚫 = ไม่มีข้อมูล

---

## 🖥️ เครื่องที่มีการอ้างถึง

| เครื่อง | บทบาท | IP | สถานะ |
|--------|-------|-----|--------|
| **Dell Optiplex 7040** | LND · PostgreSQL + PgAdmin · Discourse · Node.js API Server | **192.168.1.202** | ✅ ยืนยัน |
| **NUC7JY** | Bitcoin Full Node | 🚫 | ⚠️ มีการอ้างถึงแต่ไม่มี IP/สเปก |
| **External Drive** | เก็บ `lightning-web-project` | — | ✅ มีโครงสร้างที่วางไว้ |

---

## 🐳 Dell Optiplex 7040 — รายละเอียดที่ยืนยันได้

### บริการที่รันอยู่ (ทั้งหมดใน Docker Network `local-Network-Dev`)

| # | บริการ | หมายเหตุ |
|---|--------|----------|
| 1 | **LND Node** (Docker Compose) | เชื่อมต่อกับ Bitcoin Full Node บน NUC7JY |
| 2 | **PostgreSQL + PgAdmin** (Docker Compose) | — |
| 3 | **Discourse** (Docker) | เว็บบอร์ดนักพัฒนา · **localhost:30000** |
| 4 | **Node.js API Server** (Backend) | แนะนำให้ใช้ Docker Compose · เชื่อม LND + PostgreSQL ผ่าน `local-Network-Dev` |

### โครงสร้างโฟลเดอร์ (ตามเอกสารเดิม)

```
/home/your_username/

├── lnd-docker/                          # LND Node Docker Compose
│   ├── docker-compose.yml
│   ├── lnd.conf
│   ├── tls.cert
│   └── lnd_macaroons/                    # chain_sync.db, macaroon.db
│       └── ...
│
└── Microtronic.local/                    # Node.js API Server
    ├── Proxy-Manager/                    # Docker Compose สำหรับ Node.js API
    │   ├── data/
    │   ├── letsencrypt/
    │   ├── postgre/
    │   ├── node-Data/
    │   ├── local-Network-Dev/
    │   └── docker-compose.yml
    ├── node-Data/                        # Source Code ของ Postgre
    │   ├── web_service/
    │   ├── node_module/
    │   ├── postgre_config/
    │   ├── package.json
    │   └── docker-compose.yml
    ├── node-API/                         # Source Code ของ Node.js API Server
    │   ├── src/
    │   ├── package.json
    │   └── ...
    └── .env                              # Environment Variables
```

### ข้อควรทราบ
| หมายเหตุ | รายละเอียด |
|----------|-----------|
| `your_username` | แทนด้วยชื่อผู้ใช้จริงบน Ubuntu 24.04 |
| `lnd_data/`, `pg_data/`, `volumes/` | เป็น **Docker Volumes (Bind Mounts)** ที่เชื่อมข้อมูลถาวรจาก Host เข้าคอนเทนเนอร์ → ข้อมูลไม่หายเมื่อลบ/สร้างคอนเทนเนอร์ใหม่ |
| Discourse | การติดตั้งด้วย Docker อาจสร้างโครงสร้างโฟลเดอร์ซับซ้อนกว่านี้ (เช่น `/var/discourse`) → ปรับตามการติดตั้งจริง |
| `local-Network-Dev` | Docker Network ที่ถูกสร้างโดย Docker Compose ของแต่ละบริการ เพื่อให้สื่อสารกันได้ |

---

## 💻 NUC7JY — Bitcoin Full Node

| หัวข้อ | สถานะ |
|--------|--------|
| **บทบาท** | ✅ Bitcoin Full Node (เชื่อมกับ LND บน Optiplex 7040) |
| **IP** | 🚫 ไม่มีข้อมูล |
| **CPU / RAM / Storage** | 🚫 ไม่มีข้อมูล |
| **OS** | 🚫 ไม่มีข้อมูล |
| **Bitcoin Core version** | 🚫 ไม่มีข้อมูล |
| **สถานะ sync** | 🚫 ไม่มีข้อมูล |

> 📄 ดู [NUC7JY](/archive/NUC7JY) — ไฟล์นี้ยังว่างเปล่าในต้นฉบับ ต้องเก็บข้อมูลจริงก่อน

---

## 🌐 Docker Network

| หัวข้อ | ค่า | สถานะ |
|--------|-----|--------|
| **ชื่อ Network** | `local-Network-Dev` | ✅ ยืนยัน |
| **บริการที่ร่วม Network** | LND, PostgreSQL, PgAdmin, Discourse, Node.js API Server | ✅ ยืนยัน |
| **วิธีสร้าง** | Docker Compose ของแต่ละบริการ | ✅ ยืนยัน |

> จาก `To-do-List.md` / `day2-summary.md` (เดิม) มีการวางแผนเพิ่ม: **Mosquitto (MQTT)**, **Node-RED**, **Prometheus + Grafana + cAdvisor**, **WireGuard**
> ⚠️ สถานะการทำจริงยังไม่ยืนยัน — ดู [To-Do List](/archive/To-do-List)

---

## 💾 External Drive

✅ โครงสร้างที่วางไว้: `lightning-web-project/`

```
/mnt/my_external_drive/lightning-web-project/

├── docker-compose.yml          # Nginx และบริการที่เกี่ยวข้องกับเว็บ
└── thunder-app/                 # Next.js UI (TypeScript, App Router)
    ├── public/
    ├── src/app/
    ├── out/                     # Static files ที่ build แล้ว (Nginx ให้บริการ)
    ├── .env
    ├── next.config.js
    ├── package.json
    ├── tsconfig.json
    └── tailwind.config.js
```

> 📄 ดู [External Drive Structure](/external)

---

## 🖥️ สภาพแวดล้อมการพัฒนา

| หัวข้อ | ค่า | สถานะ |
|--------|-----|--------|
| **OS (เครื่องพัฒนา)** | Ubuntu 24.04 | ⚠️ ระบุใน `day2-summary.md` |
| **Editor** | VS Code | ⚠️ ระบุใน `day2-summary.md` |
| **ภาษา** | TypeScript | ⚠️ ระบุใน `day2-summary.md` |
| **Framework** | Next.js + App Router + `src/` | ⚠️ ระบุใน `day2-summary.md` |
| **ฐานข้อมูล** | PostgreSQL | ✅ ยืนยัน (รันจริงบน Optiplex 7040) |
| **CSS Framework** | Tailwind CSS | ✅ ยืนยัน (ใช้ในโปรเจกต์) |

---

## 🚫 สิ่งที่ยังไม่มีข้อมูล (ต้องเก็บ)

| # | ต้องเก็บ | เหตุผล |
|---|--------|--------|
| 1 | สเปค NUC7JY ทั้งหมด | จำเป็นสำหรับการวางแผน/ขาย/สำรอง |
| 2 | IP ของ NUC7JY | จำเป็นสำหรับจัดการ LND ↔ Full Node |
| 3 | โครงสร้างโฟลเดอร์จริงบน NUC7JY | ป้องกันข้อมูลหาย |
| 4 | ระบบสำรองข้อมูล (backup) ของทั้งสองเครื่อง | ป้องกันข้อมูล blockchain/ฐานข้อมูลหาย |
| 5 | สถานะความปลอดภัย (Firewall, port ที่เปิด) | ป้องกันการเข้าถึงจากภายนอก |
| 6 | รายการ Docker images/versions ที่ใช้งานจริง | ทำซ้ำ/อัปเกรดได้ |
| 7 | ผู้ดูแลแต่ละเครื่อง | ชัดเจนว่าใครรับผิดชอบ |

---

## 🔗 Related Documents
- [NUC7JY](/archive/NUC7JY) — Bitcoin Full Node
- [Optiplex 7040](/archive/Optiplex7040) — LND Node
- [External Drive Structure](/external)
- [Security & Auth](/archive/add-security_system) — ความปลอดภัย
- [Company Profile](/company-profile)

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **แหล่งอ้างอิง**: `Optiplex7040.md`, `external.md`, `day2-summary.md`, `To-do-List.md` (ไฟล์เดิมของ repo)