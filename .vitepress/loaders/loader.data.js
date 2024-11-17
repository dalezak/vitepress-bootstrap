import { createContentLoader } from 'vitepress';

export default function contentLoader(path, sort = "title", direction = "asc") {
  return createContentLoader(path, {
    transform(data) {
      return data.map(({ url, frontmatter }) => ({
        id: frontmatter.id,
        url: frontmatter.id && frontmatter.id.length > 0 ? url : null,
        date: frontmatter.date,
        title: frontmatter.title,
        description: frontmatter.description,
        keywords: frontmatter.keywords,
        content: frontmatter.content,
        markdown: frontmatter.markdown,
        image: frontmatter.image,
        images: frontmatter.images,
        link: frontmatter.link,
        links: frontmatter.links,
        views: frontmatter.views,
        likes: frontmatter.likes,
        client: frontmatter.client,
        year: frontmatter.year,
        isbn: frontmatter.isbn
      })).sort((a, b) => {
        if (sort === "date") {
          return direction === "desc" 
            ? new Date(b.date) - new Date(a.date) 
            : new Date(a.date) - new Date(b.date);
        } 
        else if (typeof a[sort] === "string") {
          return direction === "desc" 
            ? b[sort].localeCompare(a[sort]) 
            : a[sort].localeCompare(b[sort]);
        } 
        else {
          return direction === "desc" 
            ? b[sort] - a[sort] 
            : a[sort] - b[sort];
        }
      });
    }
  });
}
