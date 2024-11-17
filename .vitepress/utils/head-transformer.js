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
  return head;
}