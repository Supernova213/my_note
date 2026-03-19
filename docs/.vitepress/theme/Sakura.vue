<script setup>
import { onMounted, ref, onUnmounted } from 'vue'

const canvasRef = ref(null)

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)
  let animationId

  const petalCount = 15
  const petals = []

  class Petal {
    constructor() {
      this.init()
      this.y = Math.random() * height // 初始随机分布在屏幕上
    }

    init() {
      this.x = Math.random() * width
      this.y = -20
      this.l = Math.random() * 15 + 10
      this.w = Math.random() * 10 + 5
      this.s = Math.random() * 1.5 + 0.5 // 下落速度
      this.angle = Math.random() * 360
      this.swing = Math.random() * 2 + 1 // 摆动幅度
      this.swingSpeed = Math.random() * 0.02 + 0.01 // 摆动速度
    }

    draw() {
      this.y += this.s
      this.x += Math.sin(this.angle * this.swingSpeed) * this.swing
      this.angle += 1

      if (this.y > height + 20) {
        this.init()
      }

      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate((this.angle * Math.PI) / 180)
      ctx.beginPath()
      // 绘制一个带弧度的樱花瓣
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(this.w, -this.l / 2, this.w, this.l / 2, 0, this.l)
      ctx.bezierCurveTo(-this.w, this.l / 2, -this.w, -this.l / 2, 0, 0)
      ctx.fillStyle = 'rgba(255, 183, 197, 0.6)'
      ctx.fill()
      ctx.restore()
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal())
  }

  const render = () => {
    ctx.clearRect(0, 0, width, height)
    petals.forEach(p => p.draw())
    animationId = requestAnimationFrame(render)
  }

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }

  window.addEventListener('resize', handleResize)
  render()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="sakura-canvas" />
</template>

<style scoped>
.sakura-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1; /* 浮在背景之上，内容之下 */
  opacity: 0.8;
}
</style>
