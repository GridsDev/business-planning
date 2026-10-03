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
| stack | VitePress 1.6.4 · Node 22 (Docker) · pnpm (มีทั้ง `package-lock.json` และ `pnpm-lock.yaml`) |
| เนื้อหา | `.md` 24 ไฟล์ **อยู่ที่ root** — ไม่มีโฟลเดอร์ `docs/` |
| build | `npm run build` → `.vitepress/dist` |
| deploy | Dockerfile → nginx → Coolify · และ `vercel.json` (Vercel) |
| remote | `origin` → **GitHub** `https://github.com/GridsDev/business-planning.git` |
| branch | `main` |

> ⚠️ **remote คือ GitHub ไม่ใช่ Gitea** — ค่าบรรทัดเดิมเคยเขียนผิดว่า Gitea ตรวจสอบแล้วเมื่อ 3 ต.ค. 2569

⚠️ **เอกสารภายในบริษัท** — มีข้อมูลราคา ลูกค้า และข้อมูลบริษัท → **ถือเป็นข้อมูลลับระดับครอบครัว**

---

## กติกาเหล็ก

### 0. ห้ามออกนอกโฟลเดอร์นี้เด็ดขาด
> สั่งโดยพี่ฆัง เมื่อ 3 ต.ค. 2569 · เพิ่มเป็น **กฎ #0.5** ใน `~/.config/opencode/AGENTS.md`

- ทุก session นี้ผูกกับ `business-planning` เท่านั้น
- **ห้ามแตะ / แก้ / รันคำสั่งในโฟลเดอร์อื่น** เช่น `~/workspace/services/static/...` เว้นแต่พี่ฆังสั่งชัดเจน
- "ไม่ได้สั่ง" = ห้ามทำ · "น่าจะเกี่ยวข้อง" ไม่ใช่คำสั่ง
- ถ้าได้ log/error ที่ไม่รู้ว่ามาจากโปรเจกต์ไหน → ถามพี่ฆังก่อน ไม่ใช่เดาแล้ววิ่งไปแก้
- ต้องทำงานของโฟลเดอร์นี้ให้เสร็จก่อน แล้วค่อยรายงาน

### 1. ห้ามเดา
รายงานเฉพาะที่ตรวจจริง — `npm run build` ผ่านจริงไหม, git status สะอาดไหม, dependency version เท่าไร
ถ้าไม่รู้ = บอกว่าไม่รู้ แล้วไปตรวจ

### 2. ห้าม commit secret
- secret อยู่ใน `.env.local` เท่านั้น
- **ยังไม่ได้ติดตั้ง gitleaks / pre-commit hook** ในโปรเจกต์นี้ (ตรวจแล้ว 3 ต.ค. 2569: ไม่มี `.githooks/` และไม่ได้ตั้ง `core.hooksPath`) → ต้องระวังด้วยตัวเอง
- ห้ามพิมพ์ token ลงคำสั่ง bash (คำสั่งถูก log ไว้ใน `opencode.log`)
- ถ้าต้องอ้างอิง key → ใช้ prefix ≤ 4 ตัว + ความยาวเท่านั้น

### 3. Git / push
- **ฌอน push ได้เฉพาะ remote ชื่อ `gitea`** · remote ชื่ออื่น → หยุดถามพี่ฆัง
- **GitHub พี่ฆัง push เอง** — ห้าม push ไป GitHub เด็ดขาด
- remote ปัจจุบันชื่อ `origin` และ**ชี้ GitHub** → ในโปรเจกต์นี้ฌอน push ไม่ได้เลยจนกว่าพี่ฆังจะสั่ง
- **ห้าม push ถ้ายังไม่มีคำสั่งจากพี่ฆัง**

### 4. ต้องรายงานความคืบหน้าทุกครั้ง
> พี่ฆังสั่ง: *"ถ้ามีการกระทำใดๆให้รายงานเลขาด้วย นายคอยติดตามงานให้ด้วยนะ"*
> อัปเดต 3 ต.ค. 2569: *"สร้างโฟลเดอร์ changlog/ จากนี้ไปต้องรายงานความคืบหน้าในนี้"*

- **รายงานทุกการกระทำ → `changelog/CHANGELOG.md`** (ในโฟลเดอร์นี้ · ใหม่สุดอยู่บนสุด)
- เขียนวันที่แบบ ปปปป + เวลา ICT (UTC+7) · ใช้ภาษาไทย
- ระบุให้ชัดว่าอาการ → สาเหตุ → สิ่งที่แก้ → ผลลัพธ์ที่ตรวจจริง → อะไรที่ยัง**ไม่**ทำ
- **ห้ามรายงานนอกโฟลเดอร์งาน** — path เก่า `~/Documents/secretary/memory/todo.md` อยู่นอกโฟลเดอร์ → ห้ามเขียนตามกฎ #0.5
- สถานะเครื่องที่เปลี่ยน → `~/.config/opencode/skills/workspace-changelog/SKILL.md` (bump version)

### 5. VitePress
- แก้เนื้อหาในไฟล์ `.md` ที่ **root** — ห้ามแก้ไฟล์ใน `.vitepress/dist/` (เป็นผลลัพธ์ build)
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