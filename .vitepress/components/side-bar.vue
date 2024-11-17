<template>
  <list-items title="Year" :item="year" v-if="year" />  
  <list-items title="Date" :item="date" v-if="date" />  
  <list-items title="Tags" :links="tags" v-if="tags" />
  <list-items title="Views" :item="views" v-if="views" />
  <list-items title="Stars" :item="stars" v-if="stars" />
  <list-items title="Forks" :item="forks" v-if="forks" />
  <book-links title="Book" :isbn="isbn" v-if="isbn" />
</template>

<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { formatString, formatInteger, formatDate, formatTags } from '../utils/formatters';

const { frontmatter } = useData();

const date = computed(() => formatDate(frontmatter.value.date));
const year = computed(() => formatString(frontmatter.value.year));
const tags = computed(() => formatTags(frontmatter.value.keywords));
const views = computed(() => formatInteger(frontmatter.value.views));
const isbn = computed(() => formatInteger(frontmatter.value.isbn));
const stars = computed(() => formatInteger(frontmatter.value.stars));
const forks = computed(() => formatInteger(frontmatter.value.forks));
</script>