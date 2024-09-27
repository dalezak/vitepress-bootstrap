import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vitepress",
  description: "Vitepress Bootstrap Starter",
  themeConfig: {
    nav: [
      { name: "Projects", url: "/projects/", icon: "bi-code-square" },
      { name: "Posts", url: "/posts/", icon: "bi-chat-left-text" },
    ],
    feeds: [
      { name: "projects", path: "./loaders/projects.data.js" },
      { name: "posts", path: "./loaders/posts.data.js" },
    ],
    links: [
      { name: 'GitHub', url: 'https://github.com', icon: 'github' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: 'linkedin' },
      { name: 'Twitter',  url: 'https://twitter.com', icon: 'twitter' },
      { name: "Facebook", url: 'https://www.facebook.com', icon: 'facebook' },
      { name: 'YouTube', url: 'https://www.youtube.com', icon: 'youtube' },
      { name: 'Instagram', url: 'https://www.instagram.com', icon: 'instagram' }
    ]
  },
  transformHead: ({ pageData }) => {
    const head = [];
    const frontmatter = pageData.frontmatter;
    if (frontmatter.title && frontmatter.title.length > 0) {
      head.push(['meta', { property: 'og:title', content: frontmatter.title }])
    }
    if (frontmatter.description && frontmatter.description.length > 0) {
      head.push(['meta', { name: 'description', content: frontmatter.description }])
      head.push(['meta', { property: 'og:description', content: frontmatter.description }])
    }
    if (frontmatter.image && frontmatter.image.length > 0) {
      head.push(['meta', { property: 'og:image', content: frontmatter.image }])
    }
    if (frontmatter.keywords && frontmatter.keywords.length > 0) { 
      head.push(['meta', { name: 'keywords', content: frontmatter.keywords }])
    }
    return head;
  },
  buildEnd: async (config) => {
    if (config.userConfig.themeConfig.feeds === undefined) return;

    config.userConfig.themeConfig.feeds.forEach(async (feed) => {
      const data = await (await import(feed.path)).default.load();
      await feedGenerator(config, feed.name, data);
    });
  }
})
