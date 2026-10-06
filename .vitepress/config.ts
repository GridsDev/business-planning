import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'th-TH',
  title: 'Microtronic Business Planning',
  description: 'เอกสารแผนธุรกิจของบริษัท ไมโครทรอนิก (ไทยแลนด์) จำกัด — โปรไฟล์ ตลาด สินค้า ราคา แผนส่งเสียง 12 สัปดาห์',
  rewrites: (srcPath: string) =>
    srcPath.replace(/(^|\/)README\.md$/, '$1index.md'),
  themeConfig: {
    nav: [
      { text: 'หน้าแรก', link: '/' },
      {
        text: 'แผนธุรกิจ',
        items: [
          { text: '1 · โปรไฟล์บริษัท', link: '/1-company-profile' },
          { text: '2 · Business Model Canvas', link: '/2-business-model-canvas' },
          { text: '3 · ตลาดและคู่แข่ง', link: '/3-market-competitor' },
          { text: '4 · สินค้าและราคา', link: '/4-products-pricing' },
          { text: '5 · แผนส่งเสียง (Visibility)', link: '/5-visibility-plan' },
          { text: '6 · Roadmap 12 สัปดาห์', link: '/6-roadmap-12-weeks' },
          { text: '7 · Action Calendar', link: '/7-action-calendar' },
        ]
      },
      {
        text: 'เอกสารอ้างอิง',
        items: [
          { text: 'โปรไฟล์ (ฉบับเต็ม)', link: '/company-profile' },
          { text: 'แคตตาล็อกผลิตภัณฑ์', link: '/product-catalog' },
          { text: 'กลยุทธ์ราคา', link: '/pricing-strategy' },
          { text: 'วิเคราะห์คู่แข่ง', link: '/competitor-analysis' },
        ]
      },
      { text: 'Google Workspace', link: '/google-workspace-usage' },
    ],
    sidebar: [
      {
        text: '📋 แผนธุรกิจ 7 แผ่น (อัปเดต 6 ต.ค. 2569)',
        items: [
          { text: '1 · โปรไฟล์บริษัท', link: '/1-company-profile' },
          { text: '2 · Business Model Canvas', link: '/2-business-model-canvas' },
          { text: '3 · ตลาดและคู่แข่ง', link: '/3-market-competitor' },
          { text: '4 · สินค้าและราคา', link: '/4-products-pricing' },
          { text: '5 · แผนส่งเสียง (Visibility)', link: '/5-visibility-plan' },
          { text: '6 · Roadmap 12 สัปดาห์', link: '/6-roadmap-12-weeks' },
          { text: '7 · Action Calendar', link: '/7-action-calendar' },
        ]
      },
      {
        text: '📚 เอกสารอ้างอิง (ฉบับเต็ม)',
        items: [
          { text: 'โปรไฟล์บริษัท (ฉบับเต็ม)', link: '/company-profile' },
          { text: 'แคตตาล็อกผลิตภัณฑ์', link: '/product-catalog' },
          { text: 'กลยุทธ์ราคา (Pricing)', link: '/pricing-strategy' },
          { text: 'วิเคราะห์คู่แข่ง', link: '/competitor-analysis' },
        ]
      },
      {
        text: '⚙️ ระบบภายใน & กฎ',
        items: [
          { text: 'Business Rules', link: '/business-rules' },
          { text: 'Decisions Log', link: '/decisions-log' },
          { text: 'Technical Planning', link: '/web-development-planning' },
          { text: 'Site Structure (App Router)', link: '/webStructure' },
        ]
      },
      {
        text: '💼 Google Workspace Business Plus',
        items: [
          { text: 'Apps Inventory & Usage', link: '/google-workspace-usage' },
          { text: 'Automation Scripts', link: '/gws-automation' },
        ]
      },
      {
        text: '📁 อื่น ๆ',
        items: [
          { text: 'External Drive Structure', link: '/external' },
          { text: 'ไฟล์เก่า (Archive)', link: '/archive/' },
        ]
      },
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
