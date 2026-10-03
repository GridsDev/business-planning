# External Drive — โครงสร้าง `lightning-web-project`

> 📄 **ประเภท**: โครงสร้างโฟลเดอร์ที่วางแวนไว้
> 🔴 **ยังไม่ยืนยันว่ามีไฟล์จริง** — ต้องตรวจ `ls` บนเครื่องก่อน
> ⚠️ **คนละโปรเจกต์กับ Micro-Account** — เป็น Lightning/IoT web project

---

## 📍 ตำแหน่ง

```
/mnt/my_external_drive/lightning-web-project/
```

> 🚫 **ยังไม่ทราบ path จริงของ External Drive บนเครื่อง**
> ต้องตรวจด้วย `lsblk -f` หรือ `df -h` เพื่อหา mount point จริง

---

## 🌲 โครงสร้างที่วางแวนไว้

```
/mnt/my_external_drive/lightning-web-project/   <-- โฟลเดอร์หลัก

├── docker-compose.yml                           <-- Nginx + บริการที่เกี่ยวกับเว็บ
│
└── thunder-app/                                 <-- โปรเจกต์ Next.js UI
    ├── public/                                  <-- ไฟล์สาธารณะ
    ├── src/                                     <-- Source Code (TypeScript, App Router)
    │   ├── app/                                 <-- โฟลเดอร์หลักของ App Router
    │   └── ...
    ├── out/                                     <-- Static files ที่ build แล้ว (Nginx ให้บริการ)
    │   └── ...                                  <-- HTML, CSS, JS
    ├── .env                                     <-- Environment Variables ⚠️ ต้อง gitignore
    ├── next.config.js                           <-- ตั้งค่า Next.js
    ├── package.json                             <-- dependencies + scripts
    ├── tsconfig.json                            <-- ตั้งค่า TypeScript
    └── tailwind.config.js                       <-- ตั้งค่า Tailwind CSS
```

---

## 📂 คำอธิบายแต่ละส่วน

| โฟลเดอร์/ไฟล์ | หน้าที่ |
|--------------|--------|
| `docker-compose.yml` | Nginx เสิร์ฟ static files + reverse proxy ให้บริการอื่น |
| `thunder-app/` | Next.js UI ของ LNbits (Thunder) |
| `thunder-app/src/app/` | App Router — โครงสร้างหน้าและ API routes |
| `thunder-app/out/` | ผลลัพธ์ `next build` แบบ static export → Nginx ให้บริการตรง ๆ |
| `thunder-app/.env` | 🔴 Environment variables — **ห้าม commit** |

> 💡 **ข้อดีของการวางแบบนี้**: Nginx เสิร์ฟ static files ตรง ๆ ได้เร็ว ไม่ต้องรัน Node.js server ใน production → ลดช่องทางโจมตีและใช้ทรัพยากรน้อยกว่า

---

## 🔴 ข้อควรระวังเรื่อง External Drive

| # | ความเสี่ยง | ผลกระทบ | ข้อแนะนำ |
|---|-----------|---------|----------|
| 1 | **ถอดปลั๊กได้** ขณะรันระบบ | เว็บล่มทันที | ย้าย production ไป SSD/HDD ภายในเครื่อง |
| 2 | **ความเร็วต่ำ** ของ USB 3.0 | ช้าเมื่อ data เยอะ | เหมาะกับ dev/backup ไม่ใช่ production |
| 3 | **เสียหายได้ง่าย** | ข้อมูลหายทั้งก้อน | 🔴 ต้องมี backup แยก |
| 4 | **ไม่ใช่ git repo** (ยังไม่ยืนยัน) | แก้แล้วหายได้ | ตั้ง git init + remote |
| 5 | **filesystem ไม่รองรับ Linux permission** (ถ้าเป็น exFAT/NTFS) | Docker bind mount ทำงานผิด | ใช้ ext4 สำหรับ bind mount |

> 📌 ถ้าใช้เป็น bind mount ของ Docker **ต้องเป็น ext4** — exFAT/NTFS จะมีปัญหาเรื่อง ownership และ permission ของ container

---

## ❓ ต้องตรวจสอบก่อนใช้

| # | ตรวจ | คำสั่ง |
|---|-----|--------|
| 1 | External Drive ยัง mount อยู่หรือไม่ | `lsblk -f` |
| 2 | โฟลเดอร์มีอยู่จริงไหม | `ls -la /mnt/my_external_drive/lightning-web-project/` |
| 3 | เป็น git repo ไหม | `git -C <path> status` |
| 4 | filesystem type | `df -T <path>` |
| 5 | มี `.gitignore` ครอบ `.env` ไหม | `cat <path>/.gitignore` |
| 6 | Docker container ไหน bind mount จาก path นี้ | <span v-pre>`docker ps --format '{{.Names}}\t{{.Mounts}}'`</span> |

---

## 🔗 Related Documents
- [Hardware Infrastructure](/hardware-infrastructure) — ภาพรวมเครื่อง
- [Day 2](/day2) — บริบทโปรเจกต์
- [Security & Auth](/add-security_system) — คำเตือนเรื่อง `.env`
- [Optiplex 7040](/Optiplex7040) — เครื่องที่รันบริการ

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **สถานะ**: โครงสร้างที่วางแวน — ยังไม่ยืนยันการมีอยู่จริง