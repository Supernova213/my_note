import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 【一键开关】设置为 false 即可完全隐藏考公相关内容
const SHOW_EXAMS = true

// 自动生成侧边栏项目的工具函数
function getSidebarItems(dir: string, text: string) {
  const dirPath = path.resolve(__dirname, '../', dir)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => {
      const filePath = path.join(dirPath, file)
      const stat = fs.statSync(filePath)
      const content = fs.readFileSync(filePath, 'utf-8')
      // 提取第一个 H1 标题
      const titleMatch = content.match(/^#\s+(.*)$/m)
      const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '')

      return {
        text: title,
        link: `/${dir}/${file.replace('.md', '')}`,
        mtime: stat.mtimeMs,
        date: new Date(stat.mtimeMs).toISOString().split('T')[0]
      }
    })
    // 按修改时间排序（最近更新在前）
    .sort((a, b) => b.mtime - a.mtime)

  return [
    {
      text,
      items: [
        { text: '首页', link: `/${dir}/` },
        ...files.map(({ text, link, date }) => ({ text, link, date }))
      ]
    }
  ]
}

      export default defineConfig({
      base: '/my_note/',
      title: "我的笔记",
      description: SHOW_EXAMS ? "考公心得、工作记录与面试经验" : "工作记录与面试经验",
      head: [
      ['link', { rel: 'icon', href: 'https://img.icons8.com/doodle/96/rabbit.png' }]
      ],

      // 动态处理页面数据
      transformPageData(pageData) {
        // 自动为目录索引页生成文章列表
        const relativeSourcePath = pageData.filePath
        if (relativeSourcePath && relativeSourcePath.endsWith('index.md')) {
          const dir = path.dirname(relativeSourcePath)
          // 如果是在子目录下（比如 work/index.md, exams/index.md）
          if (dir !== '.' && dir !== '') {
            const sidebarItems = getSidebarItems(dir, '')
            // 初始化为空数组，确保模板中可以判断长度
            pageData.frontmatter.autoArticles = []

            if (sidebarItems.length > 0) {
              const items = sidebarItems[0].items
                .filter(item => 
                  item.link !== `/${dir}/` && 
                  item.link !== `/${dir}/index`
                )
                .map(item => {
                  // 确保 link 以 / 开头，且不带 .html
                  let link = item.link
                  if (!link.startsWith('/')) link = '/' + link

                  // 拼接最终的访问路径：base + link + .html
                  // 注意：VitePress 的 base 通常包含首尾斜杠，如 '/my_note/'
                  const base = '/my_note/'
                  const normalizedLink = link.startsWith('/') ? link.slice(1) : link
                  return {
                    ...item,
                    link: `${base}${normalizedLink}.html`
                  }
                })
              pageData.frontmatter.autoArticles = items
            }
          }
        }

        // 如果关闭了考公显示，针对首页进行清理
        if (!SHOW_EXAMS && (pageData.frontmatter.layout === 'home' || pageData.filePath?.endsWith('index.md'))) {

      // 1. 过滤掉首页 features 中关于考公的卡片
      if (pageData.frontmatter.features) {
        pageData.frontmatter.features = pageData.frontmatter.features.filter(
          (f: any) => !f.title?.includes('考公')
        )
      }

      // 2. 过滤掉首页 hero actions 中的考公按钮
      if (pageData.frontmatter.hero?.actions) {
        pageData.frontmatter.hero.actions = pageData.frontmatter.hero.actions.filter(
          (a: any) => !a.text?.includes('考公')
        )
      }

      // 3. 清理 hero tagline 中的考公字样
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
      // 导航栏动态显隐
      ...(SHOW_EXAMS ? [{ text: '考公模块', link: '/exams/' }] : []),
      { text: '工作中遇到的问题', link: '/work/' },
      { text: '心得体会', link: '/thoughts/' },
      { text: '面试难题', link: '/interviews/' },
    ],
    sidebar: {
      '/work/': getSidebarItems('work', '工作问题记录'),
      '/interviews/': getSidebarItems('interviews', '面试难题'),
      '/thoughts/': getSidebarItems('thoughts', '心得体会'),
      // 侧边栏动态显隐
      ...(SHOW_EXAMS ? {
        '/exams/': getSidebarItems('exams', '考公资料')
      } : {})
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Supernova213/my_note' }
    ]
  }
})
