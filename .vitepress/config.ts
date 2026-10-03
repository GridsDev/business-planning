import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'th-TH',
  title: 'Microtronic Business Planning',
  description: 'เอกสารวางแผนธุรกิจและเทคนิคของบริษัท ไมโครทรอนิกส์ (ไทยแลนด์) จำกัด — Google Workspace/Microsoft/Adobe Partner, Micro-Account, IT Consulting',
  rewrites: (srcPath: string) =>
    srcPath.replace(/(^|\/)README\.md$/, '$1index.md'),
  themeConfig: {
    nav: [
      { text: 'หน้าแรก', link: '/' },
      { text: 'บริษัท', link: '/company-profile' },
      { text: 'ผลิตภัณฑ์', link: '/product-catalog' },
      { text: 'ราคากลยุทธ์', link: '/pricing-strategy' },
      { text: 'ฮาร์ดแวร์/Node', link: '/hardware-infrastructure' },
      { text: 'Google Workspace', link: '/google-workspace-usage' },
    ],
    sidebar: [
      {
        text: 'ภาพรวมธุรกิจ',
        items: [
          { text: 'โปรไฟล์บริษัท', link: '/company-profile' },
          { text: 'แคตตาล็อกผลิตภัณฑ์', link: '/product-catalog' },
          { text: 'กลยุทธ์ราคา', link: '/pricing-strategy' },
          { text: 'วิเคราะห์คู่แข่ง', link: '/competitor-analysis' },
        ]
      },
      {
        text: 'เว็บไซต์ Microtronic.biz (Next.js Commerce)',
        items: [
          { text: 'Milestone & Planning', link: '/ask' },
          { text: 'Technical Planning', link: '/web-development-planning' },
          { text: 'Site Structure (App Router)', link: '/webStructure' },
          { text: 'Security & Auth', link: '/add-security_system' },
          { text: 'To-Do List', link: '/To-do-List' },
        ]
      },
      {
        text: 'ระบบ Micro-Account (Internal)',
        items: [
          { text: 'Architecture', link: '/architecture' },
          { text: 'Business Rules', link: '/business-rules' },
          { text: 'Operations Runbook', link: '/operations-runbook' },
          { text: 'Decisions Log', link: '/decisions-log' },
        ]
      },
      {
        text: 'ฮาร์ดแวร์ & Infrastructure',
        items: [
          { text: 'Hardware Infrastructure', link: '/hardware-infrastructure' },
          { text: 'NUC7JY — Bitcoin Full Node', link: '/NUC7JY' },
          { text: 'Optiplex 7040 — LND Node', link: '/Optiplex7040' },
        ]
      },
      {
        text: 'Google Workspace Business Plus',
        items: [
          { text: 'Apps Inventory & Usage', link: '/google-workspace-usage' },
          { text: 'Automation Scripts', link: '/gws-automation' },
        ]
      },
      {
        text: 'บันทึกการประชุม',
        items: [
          { text: 'Day 1 — Business Context', link: '/day1' },
          { text: 'Day 2 — Technical Deep Dive', link: '/day2' },
          { text: 'Day 2 Summary', link: '/day2-summary' },
        ]
      },
      {
        text: 'External Drive Structure',
        items: [
          { text: 'Folder Structure', link: '/external' },
        ]
      }
    ],
    search: { provider: 'local' },
    footer: {
      message: 'Microtronic (Thailand) Co., Ltd. — Internal Documentation',
      copyright: '© 2024-present Microtronic'
    },
    editLink: {
      pattern: 'http://192.168.1.200:3000/FahSai/business-planning/src/branch/main/:path',
      text: 'แก้ไขหน้านี้'
    },
    lastUpdated: true,
    lastUpdatedText: 'อัปเดตล่าสุด',
  }
})