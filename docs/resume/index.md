---
layout: doc
---

<script setup>
import { ref, onMounted } from 'vue'

const isAuth = ref(false)
const password = ref('')
const error = ref('')
const CORRECT_PASSWORD = 'yourpassword' // 您可以根据需要修改此处的密码

onMounted(() => {
  if (localStorage.getItem('resume_auth') === 'true') {
    isAuth.value = true
  }
})

function checkPassword() {
  if (password.value === CORRECT_PASSWORD) {
    isAuth.value = true
    localStorage.setItem('resume_auth', 'true')
    error.value = ''
  } else {
    error.value = '密码错误，请重试'
  }
}

function clearAuth() {
  localStorage.removeItem('resume_auth')
  isAuth.value = false
}
</script>

<div v-if="!isAuth" style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 400px; margin: 40px auto; text-align: center;">
  <h3>🔒 简历受保护</h3>
  <p>请输入访问密码查看个人简历</p>
  <input v-model="password" type="password" @keyup.enter="checkPassword" style="padding: 8px; width: 100%; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;"/>
  <button @click="checkPassword" style="padding: 8px 16px; background: #3eaf7c; color: white; border: none; border-radius: 4px; cursor: pointer;">确定</button>
  <p v-if="error" style="color: red; margin-top: 10px;">{{ error }}</p>
</div>

<div v-else>
  <button @click="clearAuth" style="float: right; font-size: 12px; color: #666;">退出访问</button>

  # 个人简历

  ## 基本信息
  - 姓名：[您的姓名]
  - 职位：[您的意向职位]
  - 经验：[XX 年]

  ## 核心技能
  - 编程语言：JavaScript, TypeScript, Vue, Node.js
  - 框架/库：VitePress, TailwindCSS...

  ## 工作经历
  - 20XX - 至今：[公司 A] - [职位]
  - 20XX - 20XX：[公司 B] - [职位]

  ## 教育背景
  - [大学名称] - [专业]

</div>
