import { createContentLoader } from 'vitepress';

export default function contentLoader(path, sort = "date", direction = "desc") {
  return createContentLoader(path, {
    transform(data) {
      return data.map(({ url, frontmatter }) => ({
          url: url,
          id: frontmatter.id,
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
          year: frontmatter.year
        }))
        .sort((a, b) => {
          if (sort === "date") {
            if (direction === "desc") {
              return new Date(b.date) - new Date(a.date);
            }
            else {
              return new Date(a.date) - new Date(b.date);
            }
          } 
          else {
            if (direction === "desc") {
              return b[sort] - a[sort];
            } 
            else {
              return a[sort] - b[sort];
            }
          }
        });
    }
  });
}
