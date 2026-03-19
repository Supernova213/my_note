<script setup>
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  isHero: Boolean // 是否作为首页 Icon 渲染
})

const { page } = useData()
const containerRef = ref(null)

onMounted(async () => {
  const isHome = page.value.frontmatter.layout === 'home'
  
  if (!props.isHero && isHome) return
  if (props.isHero && !isHome) return

  const { loadOml2d } = await import('oh-my-live2d')
  
  loadOml2d({
    models: [
      {
        path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-hibiki@1.0.5/assets/hibiki.model.json',
        scale: props.isHero ? 0.3 : 0.12,
        position: props.isHero ? [40, 0] : [-10, 20],
        stageStyle: {
          width: props.isHero ? 500 : 300,
          height: props.isHero ? 550 : 350
        }
      }
    ],
    // 1. 禁用状态栏（彻底移除那个蓝色的加载成功/加载中提示）
    statusBar: {
      disable: true
    },
    // 2. 禁用右侧菜单
    menus: {
      disable: true 
    },
    // 3. 禁用加载成功后的欢迎语
    tips: {
      welcome: '',
      copy: '复制成功啦~'
    },
    parentElement: props.isHero ? containerRef.value : document.body,
    fixed: !props.isHero, 
    importType: 'complete',
  })
})
</script>

<template>
  <div ref="containerRef" :class="{ 'hero-kanban-container': isHero }"></div>
</template>

<style scoped>
.hero-kanban-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 550px;
  padding-right: 5%;
}

@media (max-width: 960px) {
  .hero-kanban-container {
    justify-content: center;
    padding-right: 0;
    height: 400px;
  }
}
</style>

<style>
/* 终极 CSS 补丁，确保任何状态栏和菜单都不显示 */
.hero-kanban-container #oml2d, 
#oml2d-statusBar,
.oml2d-statusBar {
  display: none !important;
}

/* 仅保留模型容器可见 */
#oml2d, #oml2d-stage {
  display: block !important;
}

.hero-kanban-container #oml2d {
  position: relative !important;
}
</style>
