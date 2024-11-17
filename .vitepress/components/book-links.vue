<template>
  <div class="card mb-5">
    <div class="card-header">{{ title }}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" :key="label" v-for="(url, label) in links">
        <a :title="label" :href="url" target="_blank">{{ label }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String || Number,
    default: "Book"
  },
  isbn: {
    type: String,
    required: true
  },
});
const links = {
  "Amazon": `https://www.amazon.com/s?k=${props.isbn}&i=stripbooks-intl-ship`,
  "Google": `https://books.google.ca/books?isbn=${props.isbn}`,
  "GoodReads": `https://www.goodreads.com/book/show/${props.isbn}`,
};
</script>