# AGENTS.md — business-planning

> กติกาสำหรับ AI ทุกตัวที่ทำงานในโครงการนี้
> ตั้งแต่ 3 ต.ค. 2569 · โดย **ฌอน** (opencode ฝั่ง workspace) · ตามพี่ฆังสั่ง

---

## โครงการนี้คืออะไร

**เอกสารวางแผนธุรกิจของ บริษัท ไมโครทรอนิก จำกัด** เผยแพร่เป็นเว็บเอกสาร VitePress

| | |
|---|---|
| path | `/home/neon13/Documents/Default Project/business-planning` |
| ภาษา | **ไทย ทั้งหมด** (`lang: th-TH`) |
| stack | VitePress 1.6.4 · Node 22 (Docker) · npm · private ESM |
| build | `npm run build` → `.vitepress/dist` |
| deploy | Dockerfile → nginx → Coolify |
| remote | `origin` → Gitea `http://192.168.1.200:3000/FahSai/business-planning.git` |
| branch | `main` → ติดตาม `origin/main` |

⚠️ **เอกสารภายในบริษัท** — มีข้อมูลราคา ลูกค้า และข้อมูลบริษัท → **ถือเป็นข้อมูลลับระดับครอบครัว**

---

## กติกาเหล็ก

### 1. ห้ามเดา
รายงานเฉพาะที่ตรวจจริง — `npm run build` ผ่านจริงไหม, git status สะอาดไหม, dependency version เท่าไร
ถ้าไม่รู้ = บอกว่าไม่รู้ แล้วไปตรวจ

### 2. ห้าม commit secret
- secret อยู่ใน `.env.local` เท่านั้น
- pre-commit hook (`gitleaks`) บล็อกไฟล์ `.pem` `.key` `.p12` `.pfx` `.jks` `.keystore` อยู่แล้ว — **อย่า bypass ด้วย `--no-verify`**
- ห้ามพิมพ์ token ลงคำสั่ง bash (คำสั่งถูก log ไว้ใน `opencode.log`)
- ถ้าต้องอ้างอิง key → ใช้ prefix ≤ 4 ตัว + ความยาวเท่านั้น

### 3. Git / push
- **ฌอน push ได้เฉพาะ remote ชื่อ `gitea`** · remote ชื่ออื่น → หยุดถามพี่ฆัง
- **GitHub พี่ฆัง push เอง** — ห้าม push ไป GitHub เด็ดขาด
- remote ปัจจุบันชื่อ `origin` (ชี้ Gitea) → ก่อน push ต้องให้พี่ฆังตัดสินใจเรื่องชื่อ remote
- **ห้าม push ถ้ายังไม่มีคำสั่งจากพี่ฆัง**

### 4. ต้องรายงานเลขาทุกครั้ง
> พี่ฆังสั่ง: *"ถ้ามีการกระทำใดๆให้รายงานเลขาด้วย นายคอยติดตามงานให้ด้วยนะ"*

- รายงานงานในโครงการนี้ → `~/Documents/secretary/memory/todo.md`
- สถานะเครื่องที่เปลี่ยน → `~/.config/opencode/skills/workspace-changelog/SKILL.md` (bump version)
- เลขาจำรู้ว่างานนี้เกี่ยวกับระบบสถานะเครื่อง (พี่ฆังยืนยัน 3 ต.ค. 2569)

### 5. VitePress
- แก้เนื้อหาใน `docs/` — ห้ามแก้ไฟล์ใน `.vitepress/dist/` (เป็นผลลัพธ์ build)
- เพิ่มหน้าใหม่ → เพิ่มใน nav ที่ `.vitepress/config.ts` ด้วย ไม่งั้นจะไม่โผล่
- build ต้องผ่านทุกครั้งก่อน commit: `npm run build`

---

## คำสั่งที่ใช้บ่อย

```bash
npm install        # ติดตั้ง dependency
npm run dev        # dev server พร้อม hot reload
npm run build      # build เป็น static → .vitepress/dist
npm run preview    # ดูผล build ก่อน deploy
```

## โครงสร้าง

```
business-planning/
├── docs/                 ← เนื้อหาทั้งหมด (แก้ที่นี่)
├── .vitepress/
│   ├── config.ts         ← nav / sidebar / metadata / theme
│   └── cache/ dist/      ← ผลลัพธ์ ห้ามแก้
├── .githooks/pre-commit  ← gitleaks
├── Dockerfile            ← build → nginx (Coolify)
├── package.json
└── AGENTS.md             ← ไฟล์นี้
```

---

## กติกาที่มีผลทุกโปรเจกต์ (จาก `~/.config/opencode/AGENTS.md`)

- **ห้ามเดา** — ใช้ข้อเท็จจริงที่ตรวจสอบได้เท่านั้น
- **Python ห้ามปนใน repo ของ Next.js** — ถ้าต้องใช้ทั้งสองฝั่งให้แยก repo (พี่สั่ง 28 ก.ย. 2569)
- **เว้นเวลา ICT (UTC+7)** และอ้างอิงวันที่แบบ `ปปปป`
- **เรียกผู้ใช้ว่า "พี่ฆัง"**
- **ทวนขอบเขตและรออนุมัติ** ก่อนแก้ไขที่มีผลจริง