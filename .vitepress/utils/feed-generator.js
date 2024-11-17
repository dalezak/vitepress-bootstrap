import { Feed } from 'feed';
import { writeFileSync } from 'fs';

export default async function(config, path, items) {
  const folder = config.outDir;
  const title = config.site.title;
  const author = config.userConfig.author;
  const website = config.userConfig.website;
  const description = config.site.description;

  const feed = new Feed({
    id: website,
    title: title,
    link: website,
    description: description,
    feedLinks: {
      rss: `${website}/${path}.rss`,
      atom: `${website}/${path}.atom`
    },
    copyright: `Copyright (c) 2024-present, ${author}`,
  });

  for (let item of items) {
    let link = item.url && item.url.length > 0 && item.url.startsWith("http") == false ? `${website}${item.url}` : item.url;
    feed.addItem({
      id: item.url || item.id || item.title,
      link: link || "",
      title: item.title && item.title.length > 0 ? item.title : "",
      date: item.date && item.date.length > 0 ? new Date(item.date) : new Date(),
      description: item.description && item.description.length > 0 ? item.description : "",
      content: item.content && item.content.length > 0 ? item.content : "",
      image: item.image
    });
  }

  writeFileSync(`${folder}/${path}.rss`, feed.rss2());
  writeFileSync(`${folder}/${path}.atom`, feed.atom1());
}