# Project Overview: 我的笔记 (Personal Notes)

一个基于 **VitePress** 构建的个人知识管理与笔记系统。作为技术积累、考公复习、工作复盘和面试准备的集中地。

## 核心技术栈
- **框架**: [VitePress](https://vitepress.dev/) (静态站点生成器)
- **运行环境**: Node.js
- **前端**: Vue 3 (用于 Markdown 中的自定义组件)
- **部署**: 通过 GitHub Actions 自动化部署至 GitHub Pages

## 目录结构
- `docs/`: Markdown 内容根目录。
  - `.vitepress/`: VitePress 配置 (`config.ts`)、头部信息及主题定制。
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
- **生效范围**：
  - 顶部导航栏 (Navbar) 与侧边栏 (Sidebar)。
  - 首页 (Home) 的 Hero 区快捷按钮。
  - 首页的 Features 特性卡片。
  - 首页的副标题 (Tagline) 文字。

### 2. 自动化部署
配置了 GitHub Action (`.github/workflows/deploy.yml`)，实现以下自动化流程：
1. 监听 `main` 分支的推送请求。
2. 执行 `npm run docs:build` 构建项目。
3. 使用 `peaceiris/actions-gh-pages` 将构建产物部署至 `gh-pages` 分支。

### 3. GitHub Pages 路径适配
在 `config.ts` 中配置了 `base: '/my_note/'`，确保所有静态资源（JS, CSS, 图片）在 GitHub 二级域名路径下能正常加载。

## 开发约定
- **内容编写**：所有内容均使用 Markdown (.md) 编写。
- **资源引入**：支持使用 `<!-- @include: ./file.md -->` 语法进行文档嵌套。
- **导航更新**：新增分类目录后，需手动在 `docs/.vitepress/config.ts` 中更新 `nav` 和 `sidebar` 配置。
