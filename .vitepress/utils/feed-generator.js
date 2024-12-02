import { Feed } from 'feed';
import { writeFileSync } from 'fs';

export default async function(config, feedItem) {
  if (!feedItem.loader) {
    return;
  }

  const items = await (await import(feedItem.loader)).default.load();

  const base = config.base;
  const folder = config.outDir;
  const title = config.site.title;
  const author = config.userConfig.author;
  const website = config.userConfig.website;
  const description = config.site.description;
  const copyright = `Copyright (c) 2024-present, ${author}`;

  const feedLinks = [];
  if (feedItem.rss && feedItem.rss.length > 0) {
    feedLinks.push(`${website}/${base}/${feedItem.rss}`);
  }
  if (feedItem.atom && feedItem.atom.length > 0) {
    feedLinks.push(`${website}/${base}/${feedItem.atom}`);
  }

  const feed = new Feed({
    id: website,
    title: title,
    link: website,
    description: description,
    feedLinks: feedLinks,
    copyright: copyright
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
      image: item.image && item.image.length > 0 ? item.image : "",
    });
  }

  if (feedItem.rss && feedItem.rss.length > 0) {
    writeFileSync(`${folder}/${feedItem.rss}`, feed.rss2());
    console.log(`Generated RSS: ${folder}/${feedItem.rss}`);
  }

  if (feedItem.atom && feedItem.atom.length > 0) {
    writeFileSync(`${folder}/${feedItem.atom}`, feed.atom1());
    console.log(`Generated Atom: ${folder}/${feedItem.atom}`);
  }
}