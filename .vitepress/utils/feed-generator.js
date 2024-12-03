import { Feed } from 'feed';
import { writeFileSync } from 'fs';

export default async function(siteConfig, feedItem) {
  if (!feedItem.loader) {
    return;
  }

  const loader = feedItem.loader;
  const userConfig = siteConfig.userConfig;
  const base = siteConfig.base;
  const folder = siteConfig.outDir;
  const title = siteConfig.site.title;
  const description = siteConfig.site.description;
  const author = userConfig.author;
  const website = userConfig.website;
  const copyright = `Copyright (c) 2024-present, ${author}`;
  const items = await (await import(loader)).default.load();

  const feedLinks = [];
  if (feedItem.rss && feedItem.rss.length > 0) {
    let href = [base, feedItem.rss].join("/").replace("//", "/");
    feedLinks.push(href);
  }
  if (feedItem.atom && feedItem.atom.length > 0) {
    let href = [base, feedItem.atom].join("/").replace("//", "/");
    feedLinks.push(href);
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
    let path = [folder, feedItem.rss].join("/").replace("//", "/");
    writeFileSync(path, feed.rss2());
    console.log("Generated RSS", path);
  }

  if (feedItem.atom && feedItem.atom.length > 0) {
    let path = [folder, feedItem.atom].join("/").replace("//", "/");
    writeFileSync(path, feed.atom1());
    console.log("Generated Atom", path);
  }
}