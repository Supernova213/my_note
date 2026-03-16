import { defineConfig } from 'vitepress'

// 【一键开关】设置为 false 即可完全隐藏考公相关内容
const SHOW_EXAMS = true

export default defineConfig({
  base: '/my_note/',
  title: "我的笔记",
  description: SHOW_EXAMS ? "个人简历、考公心得、工作记录与面试经验" : "个人简历、工作记录与面试经验",
  head: [
    ['link', { rel: 'icon', href: 'https://img.icons8.com/doodle/96/rabbit.png' }]
  ],
  
  // 动态处理页面数据
  transformPageData(pageData) {
    // 如果关闭了考公显示，针对首页进行清理
    if (!SHOW_EXAMS && (pageData.frontmatter.layout === 'home' || pageData.relativeSourcePath?.endsWith('index.md'))) {
      // 1. 过滤掉首页 features 中关于考公的卡片
      if (pageData.frontmatter.features) {
        pageData.frontmatter.features = pageData.frontmatter.features.filter(
          (f: any) => !f.title?.includes('考公')
        )
      }

      // 2. 清理 hero tagline 中的考公字样
      if (pageData.frontmatter.hero?.tagline) {
        pageData.frontmatter.hero.tagline = pageData.frontmatter.hero.tagline
          .replace('、考公之路', '')
          .replace('考公之路与', '')
          .replace('考公之路', '')
      }
    }
  },

  themeConfig: {
    logo: 'https://img.icons8.com/doodle/96/rabbit.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '个人简历', link: '/resume/' },
      // 导航栏动态显隐
      ...(SHOW_EXAMS ? [{ text: '考公模块', link: '/exams/' }] : []),
      { text: '工作中遇到的问题', link: '/work/' },
      { text: '心得体会', link: '/thoughts/' },
      { text: '面试难题', link: '/interviews/' },
    ]},
    sidebar: {
      '/work/': [
        { 
          text: '工作问题记录', 
          items: [
            { text: '首页', link: '/work/' },
            { text: 'Vue3 内存泄漏排查', link: '/work/vue-memory-leak' }
          ] 
        }
      ],
      '/interviews/': [
        {
          text: '面试难题',
          items: [
            { text: '首页', link: '/interviews/' }
          ]
        }
      ],
      '/thoughts/': [
        {
          text: '心得体会',
          items: [
            { text: '首页', link: '/thoughts/' }
          ]
        }
      ],
      // 侧边栏动态显隐
      ...(SHOW_EXAMS ? {
        '/exams/': [
          { text: '考公资料', items: [{ text: '概览', link: '/exams/' }] }
        ]
      } : {})
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Supernova213/my_note' }
    ]
  }
)
