# ⚔️ 面试突围专栏

> 那些年我们一起背过的八股文。这里不只有标准答案，更注重深层原理的剖析。

## 📌 核心解析
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

