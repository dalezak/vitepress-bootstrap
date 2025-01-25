import * as fs from 'fs';

const [,,action,identifier] = process.argv;

if (action == 'book' && identifier) {
  await importBook(identifier);
}
else if (action == 'github' && identifier) {
  await importGithub(identifier);
} 
else {
  console.log("Usage: node import.js ACTION IDENTIFIER");
  console.log("  ACTION: book, github");
  console.log("  IDENTIFIER: ISBN, USERNAME");
  process.exit(1);
}

async function importBook(isbn) {
  let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  let data = await fetchJson(url);
  if (data && data.items && data.items.length > 0) {
    let item = data.items[0];
    let volumeInfo = item.volumeInfo;
    let title = volumeInfo.title;
    let slug = buildSlug(title);
    let path = `books/${slug}.md`;
    let markdown = markdownBook(slug, data);
    writeFile(path, markdown);
  }
  else {
    console.error("importBook", "Book isbn not found", isbn);
  }
}

async function importGithub(username) {
  let url = `https://api.github.com/users/${username}/repos`;
  let data = await fetchJson(url);
  for (let repo of data) {
    if (repo.fork) {
      continue;
    }
    let slug = repo.name;
    let path = `repos/${slug}.md`;
    let markdown = markdownRepo(repo);
    writeFile(path, markdown);
  }
}

function markdownBook(id, data) {
  let item = data.items[0];
  let volumeInfo = item.volumeInfo;
  let frontmatter = {
    id: id,
    title: volumeInfo.title,
    subtitle: volumeInfo.subtitle,
    authors: volumeInfo.authors.join(","),
    publisher: volumeInfo.publisher,
    published: volumeInfo.publishedDate,
    pages: volumeInfo.pageCount,
    keywords: volumeInfo.categories,
    image: volumeInfo.imageLinks.thumbnail,
    isbn: volumeInfo.industryIdentifiers[0].identifier,
    preview: volumeInfo.previewLink
  }
  return buildMarkdown(frontmatter, volumeInfo.description);
}

function markdownRepo(repo) {
  let frontmatter = {
    title: repo.name,
    url: repo.html_url,
    link: repo.homepage || '',
    stars: repo.watchers,
    forks: repo.forks,
    issues: repo.open_issues,
    language: repo.language || '',
    forked: repo.fork,
    archived: repo.archived,
    keywords: [
      repo.topics,
      repo.language ? repo.language.toLowerCase() : "",
      repo.watchers == 1 ? "1 star" : `${repo.watchers} stars`, 
      repo.forks == 1 ? "1 fork" : `${repo.forks} forks`,
    ].filter(String).join(",")
  }
  return buildMarkdown(frontmatter, repo.description);
}

function buildSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); 
  str = str.toLowerCase(); 
  str = str.replace(/[^a-z0-9 -]/g, '') 
           .replace(/\s+/g, '-') 
           .replace(/-+/g, '-');
  return str;
}

function buildMarkdown(values, description) {
  let markdown = `---\n`;
  for (let key in values) {
    markdown += `${key}: ${values[key]}\n`;
  }
  markdown += `description: >
    ${description||""}\n`;
  markdown += `---\n`;
  return markdown;
}

async function fetchJson(url) {
  console.log("fetchJson", url);
  const response = await fetch(url);
  var json = await response.json();
  return json;
}

function writeFile(path, content) {
  fs.writeFile(path, content, err => {
    if (err) {
      console.error("writeFile", err);
    } 
    else {
      console.log("writeFile", path);
    }
  });
}