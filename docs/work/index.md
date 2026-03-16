# 🛠️ 工作问题记录

> 这里是我的“个人知识中台”与“避坑指南”。好记性不如烂笔头，记录日常开发中遇到的疑难杂症与架构思考。

## 📌 最新记录
<div v-if="$frontmatter.autoArticles && $frontmatter.autoArticles.length > 0">
  <ul>
    <li v-for="article in $frontmatter.autoArticles" :key="article.link">
      <span style="color: #999; font-size: 0.9em; margin-right: 8px;">[{{ article.date }}]</span>
      <a :href="article.link">{{ article.text }}</a>
    </li>
  </ul>
</div>
<div v-else>
  <p style="color: #666; font-style: italic;">📅 暂无内容，敬请期待...</p>
</div>
