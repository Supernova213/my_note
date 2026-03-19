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
        scale: props.isHero ? 0.18 : 0.1, // 稍微放大一点点
        position: props.isHero ? [100, 0] : [-10, 20],
        stageStyle: {
          width: props.isHero ? 400 : 250, // 同步略微增大容器
          height: props.isHero ? 450 : 350
        }
      }
    ],
    transition: 'fade', 
    statusBar: {
      disable: true
    },
    menus: {
      disable: true 
    },
    tips: {
      style: {
        width: 220,
        height: 'auto',
        minHeight: 60,
        left: props.isHero ? '70%' : '50%', 
        top: props.isHero ? '15%' : '-15%',
        transform: 'translateX(-50%)',
        fontSize: '13px' // 字号也随之微调
      },
      idleTips: {
        word: '快来和我一起学习吧!',
        interval: 15000
      },
      copy: '复制成功啦~',
      welcome: ''
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
  height: 450px; /* 容器高度同步回升 */
  padding-right: 20%;
}

@media (max-width: 960px) {
  .hero-kanban-container {
    justify-content: center;
    padding-right: 0;
    height: 350px;
  }
}
</style>

<style>
.hero-kanban-container #oml2d {
  position: relative !important;
}

#oml2d .oml2d-menus, 
#oml2d-statusBar,
.oml2d-statusBar {
  display: none !important;
}

#oml2d, #oml2d-stage {
  display: block !important;
}

.oml2d-tips {
  white-space: normal !important;
  word-wrap: break-word !important;
}
</style>
