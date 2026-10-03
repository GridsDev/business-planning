# NUC7JY — Bitcoin Full Node

> 🔴 **สถานะ: ข้อมูลไม่ครบ** — ยืนยันได้เพียงว่าเครื่องนี้ทำหน้าที่เป็น **Bitcoin full node** และ LND เชื่อมต่อมาที่นี่
> 🚫 **ไม่ทราบ**: IP address, CPU, RAM, storage, OS, Bitcoin Core version, สถานะ sync
> 🚫 **ไม่ต้องยืนยัน**: พี่ฆังสั่ง **ยกเลิกการตามหา IP/สเปก NUC7JY** เมื่อ 2026-09-26 → เอกสารนี้ไม่ต้องรอข้อมูลชุดนี้
> ⚠️ **คนละโปรเจกต์กับ Micro-Account** — เป็นส่วนหนึ่งของ Lightning/IoT stack

---

## ✅ สิ่งที่ยืนยันได้

| หัวข้อ | ค่า | แหล่งอ้างอิง |
|--------|-----|-----------|
| หน้าที่ | Bitcoin full node | หัวข้อเดิมของไฟล์นี้ |
| ถูกอ้างถึงว่า LND เชื่อมต่อมาที่นี่ | ✅ | [Optiplex 7040](/Optiplex7040) — "เชื่อมต่อกับ Bitcoin Full Node บน NUC7" |
| บทบาทในเครือข่าย | Source of blocks ให้ LND บน Optiplex 7040 | [Optiplex 7040](/Optiplex7040) |

---

## 🚫 ข้อมูลสเปก (ยกเลิกการตามหาเมื่อ 2026-09-26)

> พี่ฆังสั่งยกเลิก — เอกสารนี้ **ไม่ต้องรอ** ข้อมูลชุดนี้
> เก็บรายการไว้เป็นข้อมูลอ้างอิง ถ้าวันหนึ่งต้องการจริงค่อยรันคำสั่งด้านล่าง

| # | ข้อมูล | คำสั่ง (ถ้าต้องการเก็บ) |
|---|--------|---------------------|
| 1 | IP address | `hostname -I` หรือ `ip -4 addr show` |
| 2 | CPU / RAM / Storage | `lscpu`, `free -h`, `lsblk` |
| 3 | OS + version | `lsb_release -a` หรือ `cat /etc/os-release` |
| 4 | Bitcoin Core version | `bitcoind --version` |
| 5 | สถานะ sync | `bitcoin-cli getblockchaininfo` |
| 6 | chain (mainnet/testnet) | `bitcoin-cli getblockchaininfo \| grep chain` |
| 7 | rpcuser / rpcpassword | 🔴 อย่าเขียนค่าลงเอกสารนี้ |
| 8 | พื้นที่ดิสก์ที่ใช้จริง | `du -sh ~/.bitcoin` |
| 9 | เชื่อมต่อ LND ด้วยอะไร | Neutrino? RPC? Compact blocks? |

---

## ⚠️ ข้อควรระวัง

| # | ความเสี่ยง | ผลกระทบ | ข้อแนะนำ |
|---|-----------|---------|----------|
| 1 | **Blockchain data กินพื้นที่มาก** (mainnet ≈ 600+ GB ณ 2026) | ดิสก์เต็ม → node หยุด | ตรวจ `df -h` และวางแผนขยาย |
| 2 | **Sync ใหม่ใช้เวลาหลายวัน** | ระบบล่มชั่วคราว | 🔴 ต้องมี backup ของ LND แยก |
| 3 | **เครื่องเสีย = LND ไม่มี blocks** | Lightning node ทำงานไม่ได้ | ต้องมี full node สำรอง หรือเชื่อม public node |
| 4 | **RPC เปิดออก LAN** | ใครก็ชุ่ม blocks ได้ | จำกัดด้วย firewall + `rpcallowip` |
| 5 | **ไม่มี UPS** | ไฟตก → ดิสก์เสีย | ควรมี UPS สำหรับเครื่องนี้ |

> 💡 Bitcoin full node + Lightning node ควรอยู่คนละเครื่องถ้าเป็นไปได้ เพราะ full node กิน I/O หนัก
> การแยกเครื่อง (ดังที่ทำไว้: NUC7JY ↔ Optiplex 7040) ถือว่าถูกต้อง ✅

---

## 📋 คำสั่งตรวจสอบ (copy ไปรันบนเครื่อง NUC7JY)

```bash
# ข้อมูลเครื่อง
hostname
lsb_release -a
lscpu | grep -E "Model name|^CPU\(s\)"
free -h
lsblk -f

# เครือข่าย
ip -4 addr show
ip route

# Bitcoin Core
bitcoind --version
bitcoin-cli getblockchaininfo
bitcoin-cli getnetworkinfo

# พื้นที่
df -h
du -sh ~/.bitcoin
```

> 🔐 **อย่าคัดลอก `rpcpassword` หรือ `bitcoin.conf` ทั้งไฟล์มาวางในเอกสาร/บทสนทนา**
> ใช้แค่ชื่อค่าว่ามีอยู่หรือไม่

---

## 🔗 Related Documents
- [Optiplex 7040](/Optiplex7040) — เครื่องที่รัน LND และเชื่อมมาที่นี่
- [Hardware Infrastructure](/hardware-infrastructure) — ภาพรวมทั้งระบบ
- [Day 2](/day2) — บริบทสถาปัตยกรรม
- [To-Do List](/To-do-List) — รวมรายการสำรองข้อมูล

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **สถานะ**: ยืนยันเฉพาะบทบาท (Bitcoin full node) — สเปกทั้งหมดรอเก็บข้อมูลจริง