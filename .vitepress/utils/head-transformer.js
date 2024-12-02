export default function(config, frontmatter, assets) {
  const head = [];
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
  if (config.feeds && config.feeds.length > 0) {
    for (let feed of config.feeds) {
      if (feed.rss && feed.rss.length > 0) {
        let title = `${feed.name} RSS Feed`;
        let href = `${feed.rss}`;
        head.push(['link', { rel: 'alternate', type: 'application/rss+xml', title: title, href: href }])
      }
      if (feed.atom && feed.atom.length > 0) {
        let title = `${feed.name} Atom Feed`;
        let href = `${feed.atom}`;
        head.push(['link', { rel: 'alternate', type: 'application/atom+xml', title: title, href: href }])
      }
    }
  }
  return head;
}