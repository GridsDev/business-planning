# Optiplex 7040 — LND, PostgreSQL, Discourse, Node.js API

> ✅ **สถานะ: ยืนยันว่ารันอยู่จริง** บนเครื่อง Dell Optiplex 7040
> 🔴 **ส่วนที่ยังไม่ยืนยัน**: โครงสร้างโฟลเดอร์จริง, Docker Compose ไฟล์จริง
> 🚫 **ไม่ต้องยืนยัน**: ชื่อ Docker network จริง, NUC7JY IP/สเปก, auth stack (ยกเลิก 2026-09-26)
> ⚠️ **คนละโปรเจกต์กับ Micro-Account** — เป็นส่วนหนึ่งของ Lightning/IoT stack

---

## 🖥️ บริการที่รันบนเครื่องนี้

| Service | รายละเอียด | Docker Network |
|---------|-----------|----------------|
| **LND Node** | Lightning Network Daemon | `local-Network-Dev` |
| **PostgreSQL** | ฐานข้อมูลหลัก | `local-Network-Dev` |
| **PgAdmin** | เครื่องมือจัดการ PostgreSQL | `local-Network-Dev` |
| **Discourse** | เว็บบอร์ดนักพัฒนา — `localhost:30000` | `local-Network-Dev` |
| **Node.js API** | Backend — เชื่อม LND + PostgreSQL | `local-Network-Dev` |

### ความเชื่อมโยง
- **LND** → เชื่อมต่อ **Bitcoin Full Node บน NUC7JY** ([NUC7JY](/NUC7JY))
- **Node.js API** → เชื่อมต่อ **LND** และ **PostgreSQL** ผ่าน `local-Network-Dev`

---

## 🌐 เครือข่าย

| หัวข้อ | ค่า |
|--------|-----|
| **IP** | `192.168.1.202` |
| **Docker Network** | `local-Network-Dev` |

> 🔴 **ต้องตรวจยืนยัน**: ใช้ `ip addr` และ `docker network ls | grep local-Network-Dev`
> ค่า IP เป็น DHCP หรือ static? ถ้า DHCP อาจเปลี่ยนได้

---

## 📁 โครงสร้างโฟลเดอร์ (ตามที่วางแวนไว้ — ยังไม่ยืนยัน)

```
/home/your_username/                          <-- Home ของผู้ใช้ (ยังไม่ทราบชื่อจริง)

├── lnd-docker/                               <-- LND Node Docker Compose
│   ├── docker-compose.yml
│   ├── lnd.conf
│   ├── tls.cert                              # 🔐 SECRET
│   └── lnd_macaroons/                        <-- chain_sync.db, macaroon.db
│       └── ...
│
└── Microtronic.local/                        <-- Node.js API Server
    ├── Proxy-Manager/
    │   ├── data/
    │   ├── letsencrypt/
    │   ├── postgre/
    │   ├── node-Data/
    │   ├── local-Network-Dev/
    │   └── docker-compose.yml
    ├── node-Data/                            <-- Source ของ PostgreSQL config
    │   ├── web_service/
    │   ├── node_module/
    │   ├── postgre_config/
    │   ├── package.json
    │   └── docker-compose.yml
    ├── node-API/                             <-- Source ของ Node.js API
    │   ├── src/
    │   ├── package.json
    │   └── ...
    └── .env                                  # 🔐 SECRET — ห้าม commit
```

> 🔴 **ยังไม่ยืนยันว่าโฟลเดอร์เหล่านี้มีอยู่จริง** — ต้องรัน `ls -la` เพื่อยืนยัน
> โฟลเดอร์ `Microtronic.local` เป็นจุดยืนยันว่าโปรเจกต์นี้เกี่ยวข้องกับ Microtronic

---

## 📌 หมายเหตุจากเอกสารเดิม

| หัวข้อ | คำอธิบาย |
|--------|----------|
| `lnd_data/`, `pg_data/`, `volumes/` | Docker Volumes (bind mount) ที่ผูกข้อมูลถาวรจาก host เข้า container — ข้อมูลไม่หายเมื่อ container ถูกลบหรือสร้างใหม่ |
| **Discourse** | การติดตั้ง Discourse ด้วย Docker สร้างโครงสร้างโฟลเดอร์ซับซ้อนกว่านี้ (เช่น `/var/discourse`) — ต้องปรับตามการติดตั้งจริง |
| `local-Network-Dev` | ไม่ปรากฏในโครงสร้างโฟลเดอร์ แต่เป็น Docker **network** ที่ถูกสร้างโดย Docker Compose เพื่อให้บริการเหล่านี้สื่อสารกันได้ |

> 📌 `local-Network-Dev` เป็นชื่อ Docker network ที่ปรากฏในเอกสารเดิม
> 🚫 **ไม่ต้องยืนยันชื่อ network** — ยกเลิก 2026-09-26 (ดู [Decisions Log](/decisions-log))

---

## 🔴 ข้อควรระวัง

| # | ความเสี่ยง | เหตุผล | ข้อแนะนำ |
|---|-----------|-------|----------|
| 1 | **LND `tls.cert` และ macaroons เป็น credential ระดับสูง** | ใครมีไฟล์นี้ = ควบคุมทุนได้ | เก็บนอก repo, chmod 600, หมุนได้ |
| 2 | **Bitcoin node + Lightning node อยู่คนละเครื่อง** | ถ้าเครื่องนี้เสีย | ต้องมี static channel backup เก็บที่อื่น |
| 3 | **Discourse เปิดที่ `localhost:30000`** | ถ้า bind ที่ `0.0.0.0` จะเปิดสู่ LAN | ตรวจ `docker ps` ว่า bind อยู่ที่ไหน |
| 4 | **Node.js API เชื่อม LND + PostgreSQL พร้อมกัน** | ถ้า API ถูกโจมตี → เข้าถึงทั้งสองอย่าง | แยก network/credential ตาม least privilege |
| 5 | **ไม่มีข้อมูลว่ามี firewall** | port เปิดทั้งหมด | ตรวจ `sudo ufw status` |
| 6 | **`Microtronic.local` ไม่ใช่ domain จริง** | เป็นแค่ชื่อโฟลเดอร์ | อย่าใช้เป็น hostname ใน production |

---

## 📋 คำสั่งตรวจสอบ (copy ไปรันบน Optiplex 7040)

```bash
# Docker
docker ps
docker network ls
docker network inspect local-Network-Dev

# เครือข่าย
ip -4 addr show
ip route

# เครื่อง
hostname
lsb_release -a
lscpu | grep -E "Model name|^CPU\(s\)"
free -h
lsblk -f

# Firewall
sudo ufw status verbose

# Port ที่ฟังอยู่
ss -tulpn

# LND (ถ้ามี lndcli)
docker exec <lnd_container> lncli getinfo
```

<div v-pre>

```bash
# แบบเต็ม (ต้องอยู่ใน v-pre เพราะมี {{ }})
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'
```

</div>

> 📌 ผลลัพธ์คำสั่งเหล่านี้ควรนำไปอัปเดตใน [Hardware Infrastructure](/hardware-infrastructure)
> เพื่อแทนที่สถานะ "ยังไม่ยืนยัน" ด้วยข้อมูลจริง

---

## 🔗 Related Documents
- [NUC7JY](/NUC7JY) — Bitcoin full node ที่ LND เชื่อมต่อ
- [Hardware Infrastructure](/hardware-infrastructure) — ภาพรวมทั้งระบบ
- [External Drive](/external) — โครงสร้าง `lightning-web-project`
- [Security & Auth](/add-security_system) — เอกสารประกอบ Docker Compose
- [To-Do List](/To-do-List) — งานค้างด้านความปลอดภัย

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **สถานะ**: ยืนยันการมีบริการ + IP — โครงสร้างโฟลเดอร์และรายละเอียดยังรอตรวจจริง