# Project Overview: 我的笔记 (Personal Notes)

A personal documentation and note-taking system built with **VitePress**. It serves as a centralized hub for managing a professional resume, exam preparation materials, work-related troubleshooting, personal reflections, and interview preparation.

## Core Technologies
- **Framework**: [VitePress](https://vitepress.dev/) (Static Site Generator)
- **Runtime**: Node.js
- **Frontend**: Vue 3 (for custom components within Markdown)
- **Deployment**: GitHub Pages via GitHub Actions

## Directory Structure
- `docs/`: Root directory for all Markdown content.
  - `.vitepress/`: VitePress configuration (`config.ts`) and theme data.
  - `resume/`: Personal resume module with client-side password protection.
  - `exams/`: Exam preparation materials (toggleable visibility).
  - `work/`: Documentation for technical issues encountered at work.
  - `thoughts/`: Personal reflections and journals.
  - `interviews/`: High-frequency interview questions and answers.
- `.github/workflows/`: Automated deployment configuration for GitHub Pages.

## Building and Running
The project uses standard NPM scripts defined in `package.json`:

| Command | Action |
|---------|--------|
| `npm run docs:dev` | Start the local development server (with hot reload). |
| `npm run docs:build` | Build the static site for production into `docs/.vitepress/dist`. |
| `npm run docs:preview` | Preview the production build locally. |

## Key Features & Configurations

### 1. Resume Password Protection
The file `docs/resume/index.md` uses a custom `<script setup>` block with Vue 3 to implement a basic password check.
- **Mechanism**: Validates a hardcoded string and stores authentication state in `localStorage`.
- **Default Password**: Set via `CORRECT_PASSWORD` variable in the file.

### 2. Feature Toggling (Exams Module)
The "Exams" module can be hidden from the navigation bar by modifying the `SHOW_EXAMS` constant in `docs/.vitepress/config.ts`.

### 3. Automated Deployment
A GitHub Action (`.github/workflows/deploy.yml`) is configured to:
1. Trigger on every push to the `main` branch.
2. Build the project using `npm run docs:build`.
3. Deploy the resulting assets to the `gh-pages` branch using the `peaceiris/actions-gh-pages` action.

## Development Conventions
- **Content**: All content is authored in Markdown (.md).
- **Navigation**: Sidebar and Navbar links must be manually updated in `docs/.vitepress/config.ts` when adding new sections.
- **Customization**: Use Vue components directly in Markdown files for interactive features (like the resume password lock).
