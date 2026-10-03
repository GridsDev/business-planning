# Security & Auth System — ข้อเสนอสำหรับ Lightning/IoT Stack

> 🔴 **สถานะ: ข้อเสนอ (PROPOSED) — ยังไม่มีหลักฐานว่านำไปใช้จริง**
> ⚠️ **คนละโปรเจกต์กับ Micro-Account** — ระบบบัญชีมี auth ของตัวเอง ดู [Architecture](/architecture)
> เอกสารนี้เก็บรายละเอียด Docker Compose ฉบับเต็มไว้ เพื่อให้ตรวจสอบ/นำไปปรับใช้ภายหลังได้

---

## 🔴 5 ประเด็นความปลอดภัย (สำคัญสูงสุดอันดับ 1)

| # | ประเด็น | สถานะปัจจุบัน | ต้องทำ |
|---|--------|--------------|--------|
| 1 | **PostgreSQL** — รหัสผ่านแข็งแรง + สิทธิ์เท่าที่จำเป็น | ⚠️ ต้องตรวจ | ตั้ง password + revoke สิทธิ์เกินจำเป็น |
| 2 | **Mosquitto** — Username/Password + ACL + **ปิด `allow_anonymous true`** | 🔴 ค่าเริ่มต้นเป็น `true` | ปิด + ทำ ACL |
| 3 | **Node-RED** — เปิด Admin Authentication | ⚠️ ต้องตรวจ | ตั้ง `adminAuth` ใน `settings.js` |
| 4 | **Firebase Authentication** — SDK ใน Next.js + Admin SDK ใน Backend | 🚫 **นอกขอบเขต** | ยกเลิกการตัดสินใจ 2026-09-26 — ไม่ต้องเลือก auth stack |
| 5 | **HTTPS** — Nginx + SSL/TLS | ⚠️ ต้องตรวจ | Let's Encrypt |

> **เหตุผลที่เป็นอันดับ 1**: ถ้าพื้นฐานไม่มั่นคจะมีความเสี่ยง ทุกอย่างจะพังตามมา

> 🚫 **หมายเหตุเรื่อง Firebase (2026-09-26: ยกเลิกการตัดสินใจ)**
> พี่ฆังสั่ง **ยกเลิก** การพิจารณาเลือก auth stack ของ Lightning/IoT stack
> → **ไม่ต้องเปรียบเทียบ Firebase / Google OAuth / NextAuth / LNbits key**
> → ไม่ต้องยืนยันต้นทุน Blaze plan, consent screen หรือเงื่อนไข Noventiq ในบริบทนี้
>
> ตัวอย่าง config ด้านล่างจึงเป็น **ตัวอย่างเชิงเทคนิคจากเอกสารเดิม** — ไม่ใช่สิ่งที่อนุมัติ

---

## ⚠️ คำเตือนที่ต้องอ่านก่อนใช้ไฟล์เหล่านี้

| # | คำเตือน | เหตุผล |
|---|--------|-------|
| 1 | **อย่า commit `.env*` ขึ้น git** | จะกลายเป็นการรั่ว secret — ต้องอยู่ใน `.gitignore` |
| 2 | **อย่าใช้ค่าในไฟล์ตัวอย่างเป็นค่าจริง** | ทุกค่าเป็น placeholder (`your_*`) ต้องเปลี่ยนทั้งหมด |
| 3 | **`--noseedbackup` ปิดการสำรอง LND** | ⚠️ เหมาะกับ regtest เท่านั้น — **ห้ามใช้กับ mainnet เด็ดขาด** |
| 4 | **อย่าปิด `no-macaroons` / `tlsdisableautofill` ใน production** | ทำให้ LND ไม่มีการยืนยันตัวตน |
| 5 | **`firebase-admin-sdk.json` คือไฟล์ Service Account Key** | ถือเป็น credential ระดับสูงสุด — ห้ามเข้า git ห้ามแชร์ |
| 6 | **Network `shared_app_network` ทำให้ทุกบริการคุยกันได้** | ลดการแยกขาด (isolation) — ใช้เมื่อจำเป็นจริงเท่านั้น |
| 7 | **`node:20-alpine` + `latest` tag** | ใช้ในโปรดักชันควร pin version และสแกน CVE |

---

## 📂 โครงสร้างโฟลเดอร์ (ตามข้อเสนอ)

```
your-project/
├── .env.iot              # IoT compose vars
├── .env.nextjs           # Next.js compose vars
├── .env.backend          # Backend compose vars
├── .env.lnd              # LND compose vars
│                         # ⚠️ ทั้ง 4 ไฟล์ต้องอยู่ใน .gitignore
├── docker-compose.iot.yml
├── docker-compose.nextjs.yml
├── docker-compose.backend.yml
├── docker-compose.lnd.yml
│
├── mosquitto/
│   ├── config/
│   │   ├── mosquitto.conf
│   │   ├── passwd          # สร้างด้วย mosquitto_passwd
│   │   └── acl.conf
│   ├── data/
│   └── log/
│
├── nodered/
│   └── data/
│       ├── settings.js     # ต้องมี adminAuth
│       └── flows.json      # สร้างอัตโนมัติ
│
├── nextjs-ui/
│   ├── src/
│   ├── .env.local
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   ├── firebase-admin-sdk.json   # ⚠️ SECRET — ห้ามเข้า git
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── lnd/
│   ├── data/
│   └── lnd.conf
│
├── .gitignore             # ⚠️ ต้องมี: .env*  firebase-admin-sdk.json  lnd/data/
└── README.md
```

---

## 1️⃣ `docker-compose.iot.yml` — Mosquitto + Node-RED

```yaml
version: '3.9'

services:
  mosquitto:
    image: eclipse-mosquitto:2.0.18
    container_name: iot_mosquitto
    restart: unless-stopped
    volumes:
      - ./mosquitto/config:/mosquitto/config:ro
      - ./mosquitto/data:/mosquitto/data
      - ./mosquitto/log:/mosquitto/log
    ports:
      - "1883:1883"   # MQTT
      - "9001:9001"   # MQTT over WebSockets
    networks:
      - iot_network

  nodered:
    image: nodered/node-red:latest   # ⚠️ ควร pin เป็นเวอร์ชันเฉพาะ
    container_name: iot_nodered
    restart: unless-stopped
    environment:
      TZ: "Asia/Bangkok"
      NODE_RED_ENABLE_PROJECTS: "true"
      # 🔐 ตัวอย่าง adminAuth (ย้ายค่าจริงไปเก็บใน hashedPassword ใน settings.js)
      # NODE_RED_ADMIN_AUTH: >
      #   {"type":"credentials","users":[{"username":"admin","password":"<HASH>","permissions":"*"}]}
    volumes:
      - ./nodered/data:/data
      - ./nodered/data/settings.js:/data/settings.js:ro
    ports:
      - "1880:1880"
    networks:
      - iot_network
    depends_on:
      - mosquitto

networks:
  iot_network:
    driver: bridge
```

### 🔐 `mosquitto/config/mosquitto.conf` (เข้มงวด — แทนที่ค่าเริ่มต้น)

```conf
# 🔴 ห้ามใช้ค่านี้ใน production
# allow_anonymous true

# ✅ production
allow_anonymous false
listener 1883
password_file /mosquitto/config/passwd
acl_file /mosquitto/config/acl.conf

# MQTT over WebSockets (ถ้าใช้)
listener 9001
protocol websockets
password_file /mosquitto/config/passwd
acl_file /mosquitto/config/acl.conf
```

### `mosquitto/config/acl.conf`

```conf
# ตัวอย่าง: แยกสิทธิ์ตามหน้าที่
user backend_api
topic readwrite devices/#
topic read telemetry/#

user node_red
topic readwrite devices/#
topic readwrite telemetry/#
```

**สร้างไฟล์ passwd:**
```bash
docker run --rm -it -v "$PWD/mosquitto/config:/mosquitto/config" \
  eclipse-mosquitto:2.0.18 mosquitto_passwd -c /mosquitto/config/passwd backend_api
docker run --rm -it -v "$PWD/mosquitto/config:/mosquitto/config" \
  eclipse-mosquitto:2.0.18 mosquitto_passwd /mosquitto/config/passwd node_red
```

### การใช้งาน
```bash
docker compose -f docker-compose.iot.yml --env-file .env.iot up -d
docker compose -f docker-compose.iot.yml --env-file .env.iot down
```

---

## 2️⃣ `docker-compose.nextjs.yml` — Next.js UI

```yaml
version: '3.9'

services:
  nextjs_ui:
    build:
      context: ./nextjs-ui
      dockerfile: Dockerfile
    container_name: nextjs_ui_app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_FIREBASE_API_KEY: ${NEXT_PUBLIC_FIREBASE_API_KEY}
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
      NEXT_PUBLIC_FIREBASE_APP_ID: ${NEXT_PUBLIC_FIREBASE_APP_ID}
      NEXT_PUBLIC_MEASUREMENT_ID: ${NEXT_PUBLIC_MEASUREMENT_ID}
      NEXT_PUBLIC_BACKEND_URL: ${NEXT_PUBLIC_BACKEND_URL}
      NEXT_PUBLIC_MQTT_WS_URL: ${NEXT_PUBLIC_MQTT_WS_URL}
    networks:
      - nextjs_network
      # - shared_app_network   # เปิดเมื่อต้องคุย backend / IoT
      # - iot_network
```

> ⚠️ `NEXT_PUBLIC_*` = ข้อมูล**สาธารณะ** ถูกฝังใน bundle ที่ส่งไปยัง browser — ห้ามใส่ secret ใด ๆ ในชื่อนี้

### `nextjs-ui/Dockerfile`

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  else npm install; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
# ⚠️ ควร uncomment เพื่อรันเป็น non-root
# RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
# USER nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

> ⚠️ `COPY . .` จะ copy ทุกอย่างรวม `.env.local` — **ต้องมี `.dockerignore`**

### `.env.nextjs` (ตัวอย่าง — เปลี่ยนทุกค่า)

```env
# Firebase Client SDK (จาก Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_MEASUREMENT_ID=G-...

NEXT_PUBLIC_BACKEND_URL=http://backend_app:8000
NEXT_PUBLIC_MQTT_WS_URL=ws://iot_mosquitto:9001/mqtt
```

> 📌 Next.js จะอ่าน `NEXT_PUBLIC_*` จาก `.env.local` ในโหมด dev; ใน Docker production จะส่งผ่าน environment variables จาก compose

---

## 3️⃣ `docker-compose.backend.yml` — Backend + PostgreSQL

```yaml
version: '3.9'

services:
  db:
    image: postgres:16-alpine
    container_name: backend_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"     # ⚠️ อย่า expose ออก LAN ถ้าไม่จำเป็น
    networks:
      - backend_network

  backend_app:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: your_custom_backend
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
      FIREBASE_ADMIN_SDK_PATH: /app/firebase-admin-sdk.json
      LNBITS_ADMIN_KEY: ${LNBITS_ADMIN_KEY}
      LND_GRPC_URL: ${LND_GRPC_URL}
    volumes:
      - ./backend/firebase-admin-sdk.json:/app/firebase-admin-sdk.json:ro
    depends_on:
      - db
    networks:
      - backend_network
      # - shared_app_network
      # - iot_network
      # - lnd_network

networks:
  backend_network:
    driver: bridge

volumes:
  postgres_data:
```

> 🔐 **หลังรันครั้งแรก**: ต้องตั้ง PostgreSQL permissions ให้ `your_backend_user` ใน container `backend_postgres` (ตามข้อ 1 ในหัวเอกสาร)

### `.env.backend` (ตัวอย่าง — 🚫 ห้ามใช้ค่านี้จริง)

```env
POSTGRES_DB=your_backend_db
POSTGRES_USER=your_backend_user
POSTGRES_PASSWORD=<สร้างด้วย openssl rand -base64 32>

LNBITS_ADMIN_KEY=<สร้างค่าใหม่>
LND_GRPC_URL=lnd:10009
```

### สร้าง password ที่แข็งแรง
```bash
openssl rand -base64 32
```

### `backend/Dockerfile`

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
EXPOSE 8000
CMD ["node", "dist/index.js"]
```

> 🔐 `firebase-admin-sdk.json` ถูก **mount แบบ read-only** ตอน runtime ไม่ได้ `COPY` เข้า image (ลดความเสี่ยงที่ secret ถูกฝังใน layer)

---

## 4️⃣ `docker-compose.lnd.yml` — LND Node

> 🚨 **คำเตือนร้ายแรง**: เอกสารเดิมระบุ `command: ["--noseedbackup"]`
> คำสั่งนี้ **ปิดการสำรองข้อมูล LND** — blockchain channels, wallet, macaroons
> เหมาะกับ **regtest ทดลองเท่านั้น** — **ห้ามใช้กับ mainnet**

```yaml
version: '3.9'

services:
  lnd:
    image: lightninglabs/lnd:v0.18.1-beta
    container_name: your_lnd_node
    restart: unless-stopped
    volumes:
      - lnd_data:/root/.lnd
      - ./lnd/lnd.conf:/root/.lnd/lnd.conf:ro
    environment:
      LND_CHAIN: bitcoin
      LND_NETWORK: regtest
      LND_DEBUGLEVEL: info
    ports:
      - "9735:9735"     # P2P
      - "10009:10009"   # gRPC
      - "8080:8080"     # REST (ถ้าเปิด)
    networks:
      - lnd_network
      # - backend_network
    # command: ["--noseedbackup"]   # ⚠️ เปิดเฉพาะ regtest — ดำเนินการอย่างระวัง
    # depends_on:
    #   - bitcoind

networks:
  lnd_network:
    driver: bridge

volumes:
  lnd_data:
```

### `lnd/lnd.conf` (ตัวอย่างสำหรับ regtest)

```ini
[Application Options]
debuglevel=info
maxlogfiles=3
maxlogrotates=10
no-macaroons=false          # 🔴 อย่าปิดใน production
tlsdisableautofill=true

[Bitcoin]
bitcoin.active=1
bitcoin.node=neutrino       # หรือ bitcoind
bitcoin.defaultchanconfs=1
bitcoin.feeurl=https://nodes.lightning.engineering/fees/v1/fast.json

[autopilot]
autopilot.active=false

[neutrino]
neutrino.connect=<IP ของ NUC7JY>:8333   # 🚫 ไม่ยืนยัน IP — ยกเลิกการตามหา 2026-09-26

[RPC]
rpclisten=0.0.0.0:10009
tlscertpath=/root/.lnd/tls.cert
tlskeypath=/root/.lnd/tls.key
macaroonpath=/root/.lnd/data/chain/bitcoin/regtest/admin.macaroon

[rest]
restlisten=0.0.0.0:8080
```

> 📌 **ศึกษาเรื่อง Macaroons และ TLS Certificates อย่างละเอียด** — เป็นชั้นความปลอดภัยหลักของ LND

### 🔐 ข้อควรสำรอง LND (สำคัญมาก)
```bash
# สำรอง static channel backup ไปที่อื่นทันที
lncli backup static --backup_base /secure/lnd-cstaticbackup
```
> 💡 ถ้าเครื่องเสียและไม่มี static channel backup → **กู้คืนทุน Lightning ไม่ได้** ต้องรอ sync blockchain ใหม่

---

## 🔗 การเชื่อมต่อระหว่าง Container (Networking)

เมื่อแยกเป็นหลายไฟล์ compose แต่ละไฟล์จะสร้าง network ของตัวเอง → ต้องใช้ **External Network** เพื่อให้มองเห็นกัน

```bash
docker network create shared_app_network
```

```yaml
# เพิ่มในทุกไฟล์ compose ที่ต้องสื่อสารข้ามกัน
services:
  your_service:
    networks:
      - your_own_network
      - shared_app_network

networks:
  your_own_network:
    driver: bridge
  shared_app_network:
    external: true
```

### เมื่ออยู่ network เดียวกัน ใช้ชื่อ container เป็น hostname ได้

| จาก → ไป | ค่า |
|----------|-----|
| Next.js UI → Backend | `http://your_custom_backend:8000` |
| Backend → PostgreSQL | `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}` |
| Backend → Mosquitto | `mqtt://iot_mosquitto:1883` |
| Backend → LND (gRPC) | `lnd:10009` |

> ⚠️ **ข้อควรระวัง**: network เดียวที่รวมทุกอย่าง = ลด isolation
> ถ้าเป็น production ให้แยก network ตาม trust boundary (dmz / internal / data) และใช้ reverse proxy เป็นจุดเดียวที่เข้าถึงได้

---

## 🔴 สิ่งที่ยังไม่มีข้อมูล

| # | ต้องเก็บ | เหตุผล |
|---|--------|--------|
| 1 | สถานะจริงของ `allow_anonymous` | ต้องรู้ว่าเปิดอยู่หรือไม่ **ตอนนี้** |
| 2 | ว่ามี `settings.js` adminAuth หรือยัง | Node-RED เปิดหน้า login หรือไม่ |
| 3 | Port ที่เปิดออก LAN | ประเมินความเสี่ยง |
| 4 | มี Firewall (ufw) หรือไม่ | ต้องตรวจด้วย `sudo ufw status` |
| 5 | LND macaroon ถูกหมุนหรือไม่ | credential รั่วต้องหมุนได้ |
| 6 | มี `.gitignore` ครอบ `.env*` และ `firebase-admin-sdk.json` หรือยัง | กันการรั่ว secret |
| 7 | ผลการทดสอบ restore ล่าสุด | backup ที่ไม่ restore ได้ = ไม่มี backup |

---

## 🔗 Related Documents
- [To-Do List](/To-do-List) — ลำดับความสำคัญ
- [Day 2](/day2) — บริบทสถาปัตยกรรม
- [Hardware Infrastructure](/hardware-infrastructure) — เครื่องจริง
- [Optiplex 7040](/Optiplex7040) — ที่รัน LND
- [Architecture](/architecture) — ข้อขัดแย้งเรื่อง Auth (Micro-Account)
- [Decisions Log](/decisions-log) — นโยบาย Google-First

---

> **Last Updated**: 2026-09-26 โดย ฌอน (opencode)
> **สถานะ**: ข้อเสนอ — ต้องตรวจสภาพจริงก่อนนำไปใช้