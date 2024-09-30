<template>
  <div>
    <nav-bar :search="search" />
    <div class="container my-4">
      <div v-if="showPageBar">
        <page-bar :search="search" />
      </div>
      <div class="row">
        <div class="col-12" :class="showSidebar ? 'col-md-9' : ''">
          <div class="mb-4" v-if="id && id.length > 0">
            <h1 v-if="title">{{ title }}</h1>
            <h5 v-if="subtitle">{{ subtitle }}</h5>
          </div>
          <div class="my-4">
            <content />
          </div>
          <div class="my-5" v-if="video && video.length > 0">
            <video-player :video="video" />
          </div>
          <div class="my-5" v-if="audio && audio.length > 0">
            <audio-player :audio="audio" />
          </div>
          <div class="my-5" v-if="images && images.length > 0">
            <image-gallery :images="images" />  
          </div>
          <div class="my-5" v-if="link || links">
            <link-button :url="link" v-if="link" />
            <link-button :url="link" :key="'link-' + index" v-for="(link, index) of links" />
          </div>
        </div>
        <div class="col-12 col-md-3" v-if="showSidebar">
          <list-items title="Year" :item="year" v-if="year" />  
          <list-items title="Date" :item="date" v-if="date" />  
          <list-items title="Tags" :links="tags" v-if="tags" />
          <list-items title="Views" :item="views" v-if="views" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
const { frontmatter } = useData();

const path = computed(() => formatString(frontmatter.value.path));
const id = computed(() => formatString(frontmatter.value.id));
const title = computed(() => formatString(frontmatter.value.title));
const subtitle = computed(() => formatString(frontmatter.value.subtitle));
const date = computed(() => formatDate(frontmatter.value.date));
const year = computed(() => formatString(frontmatter.value.year));
const video = computed(() => formatString(frontmatter.value.video));
const audio = computed(() => formatString(frontmatter.value.audio));
const image = computed(() => formatString(frontmatter.value.image));
const link = computed(() => formatString(frontmatter.value.link));
const links = computed(() => formatArray(frontmatter.value.links));
const tags = computed(() => formatTags(frontmatter.value.keywords));
const views = computed(() => formatInteger(frontmatter.value.views));
const images = computed(() => formatArray(frontmatter.value.images));
const search = computed(() => formatString(frontmatter.value.search));

const showPageBar = computed(() => {
  return path.value || id.value || search.value;
});

const showSidebar = computed(() => {
  return date.value || views.value || tags.value;
});

const hasSearch = computed(() => {
  return search.value;
});

function formatString(string) {
  if (string && string.length > 0) {
    return string;
  }
  return null;
}

function formatDate(string) {
  if (string && string.length > 0) {
    return new Date(string).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return null;
}

function formatTags(string) {
  if (string && string.length > 0) {
    let tags = {};
    for (let tag of string.split(',')) {
      tag = tag.trim();
      tags[tag] = `/${path.value}?search=${tag}`;
    }
    return tags;
  }
  return null;
}

function formatInteger(string) {
  if (string) {
    return string;
  }
  return 0;
}

function formatArray(string) {
  if (string) {
    let items = [];
    for (let tag of string.split(',')) {
      items.push(tag.trim());
    }
    return items;
  }
  return [];
}
</script>

<style scoped>
</style>