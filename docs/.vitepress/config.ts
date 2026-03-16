import { defineConfig } from 'vitepress'

// 考公模块开关：设置为 false 可隐藏
const SHOW_EXAMS = true

export default defineConfig({
  title: "我的笔记",
  description: "个人简历、考公心得、工作记录与面试经验",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '个人简历', link: '/resume/' },
      ...(SHOW_EXAMS ? [{ text: '考公模块', link: '/exams/' }] : []),
      { text: '工作中遇到的问题', link: '/work/' },
      { text: '心得体会', link: '/thoughts/' },
      { text: '面试难题', link: '/interviews/' },
    ],
    sidebar: {
      '/work/': [
        { text: '工作问题记录', items: [{ text: '首页', link: '/work/' }] }
      ],
      '/exams/': [
        { text: '考公资料', items: [{ text: '概览', link: '/exams/' }] }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Supernova213/my_note' }
    ]
  }
})
