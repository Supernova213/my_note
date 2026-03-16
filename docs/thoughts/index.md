# 💡 心得与慢思考

> 技术之外的自留地。关于生活、学习方法、职业规划论与碎碎念。

## 📌 精选文章
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
