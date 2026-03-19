# Project Overview: 我的笔记 (Personal Notes)

一个基于 **VitePress** 构建的个人知识管理与笔记系统。作为技术积累、考公复习、工作复盘和面试准备的集中地。

## 核心技术栈
- **框架**: [VitePress](https://vitepress.dev/) (静态站点生成器)
- **运行环境**: Node.js
- **前端**: Vue 3 (用于 Markdown 中的自定义组件)
- **部署**: 通过 GitHub Actions 自动化部署至 GitHub Pages
- **特效**: Canvas (Sakura) & Live2D (oh-my-live2d)

## 目录结构
- `docs/`: Markdown 内容根目录。
  - `.vitepress/`: VitePress 配置 (`config.ts`)、头部信息及主题定制。
    - `theme/`: 包含 `Sakura.vue` (樱花特效) 与 `Live2D.vue` (看板郎组件)。
  - `public/`: 静态资源存放，如全局背景图 `background.png`。
  - `exams/`: 考公复习材料（支持一键显隐）。
  - `work/`: 工作中遇到的技术问题与解决方案记录。
  - `thoughts/`: 个人心得、感悟与生活随笔。
  - `interviews/`: 高频面试题库与深度解析。
- `.github/workflows/`: GitHub Actions 自动化部署流程配置。

## 运行与构建
项目使用 `package.json` 中定义的标准 NPM 脚本：

| 命令 | 描述 |
|---------|--------|
| `npm run docs:dev` | 启动本地开发服务器（支持热重载）。 |
| `npm run docs:build` | 构建静态站点至 `docs/.vitepress/dist`。 |
| `npm run docs:preview` | 在本地预览生产环境构建结果。 |

## 关键功能与配置

### 1. 考公模块一键显隐 (Feature Toggling)
可以通过修改 `docs/.vitepress/config.ts` 中的 `SHOW_EXAMS` 常量来控制考公相关内容的展示。

### 2. 二次元视觉定制 (Anime Aesthetic)
项目进行了深度视觉美化，具有浓郁的二次元氛围：
- **全局背景**: 使用《四月是你的谎言》高清壁纸作为固定背景。
- **毛玻璃效果**: 全站容器应用了 `backdrop-filter: blur()`，使内容卡片呈现半透明磨砂质感，透出背景。
- **樱花飘落**: 集成了高性能 Canvas 樱花瓣下落特效 (`Sakura.vue`)，默认粒子数为 15 以保持清新。
- **品牌配色**: 主题色统一采用 **樱花粉 (#ff99aa)**。

### 3. Live2D 智能看板郎
集成了 `oh-my-live2d` 插件，并根据场景动态调整：
- **首页嵌入**: 自动识别首页 Hero 区域，将看板郎 (Hibiki) 完美嵌入原本 Icon 的位置，并放大展示。
- **全站浮动**: 在进入文章页面后，看板郎自动移动至右下角进行伴读。
- **纯净模式**: 禁用了所有自带菜单、状态栏和冗余加载提示，提供沉浸式体验。

### 4. 自动化部署
配置了 GitHub Action (`.github/workflows/deploy.yml`)，实现提交代码后自动构建并部署至 `gh-pages` 分支。

### 5. 侧边栏与列表自动生成
通过工具函数自动扫描目录并提取 Markdown 标题，按修改日期倒序生成列表，无需手动维护导航。

## 开发约定
- **内容编写**: 所有内容均使用 Markdown (.md) 编写。建议在文件开头使用 `# 标题` 定义文章名。
- **组件注入**: 所有的全局 UI 特效组件（如樱花、看板）均通过 `docs/.vitepress/theme/index.ts` 的 `layout-bottom` 或插槽注入。
- **图片路径**: 公共图片请存放在 `docs/public/`，在 CSS 或 Markdown 中使用 `/image-name.png` 引用。
