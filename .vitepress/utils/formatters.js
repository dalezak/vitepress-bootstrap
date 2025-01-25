export function isEmpty(value) {
  return (value == null || (typeof value === "string" && value.trim().length === 0));
}

export function isPresent(value) {
  return value != null && value.trim().length > 0;
}

export function formatString(string) {
  if (string && string.length > 0) {
    return string;
  }
  return null;
}

export function formatInteger(string) {
  if (string) {
    return string;
  }
  return 0;
}

export function formatDate(string) {
  if (string && string.length > 0) {
    return new Date(string).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return null;
}

export function formatTags(string) {
  if (string && string.length > 0) {
    let tags = {};
    for (let tag of string.split(',')) {
      tag = tag.trim();
      tags[tag] = `/?search=${tag}`;
    }
    return tags;
  }
  return null;
}

export function formatArray(string) {
  if (string == undefined || string == '') {
    return [];
  }
  else if (Array.isArray(string)) {
    return string;
  }
  else if (string.includes(',')) {
    let items = [];
    for (let tag of string.split(',')) {
      items.push(tag.trim());
    }
    return items;
  }
  return [string];
}