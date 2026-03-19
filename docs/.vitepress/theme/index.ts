import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Sakura from './Sakura.vue'
import Live2D from './Live2D.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 樱花雨依然全局保留
      'layout-bottom': () => h('div', [h(Sakura), h(Live2D)]),
      // 首页 Icon 位置替换为看板郎
      'home-hero-image': () => h(Live2D, { isHero: true })
    })
  }
}
