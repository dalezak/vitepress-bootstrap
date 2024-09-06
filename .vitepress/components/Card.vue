<template>
  <div class="card mb-4">
    <template v-if="image && image.length > 0">
      <a :href="url" :title="title" target="_blank" v-if="url && url.length > 0 && url.startsWith('http')">
        <lazy-image :src="image" class="card-img-top" alt="image"/>
      </a>
      <a :href="url" :title="title" v-else-if="url && url.length > 0">
        <lazy-image :src="image" class="card-img-top" alt="image"/>
      </a>
      <img :src="image" class="card-img-top" alt="image" v-else>
    </template>
    <div class="card-body">
      <h5 class="card-title" v-if="title && title.length > 0">
        <a :href="url" target="_blank" v-if="url && url.length > 0 && url.startsWith('http')">{{ title }}</a>
        <a :href="url" v-else-if="url && url.length > 0">{{ title }}</a>
        <span v-else>{{ title }}</span>
      </h5>
      <h6 class="card-subtitle mb-2 text-body-secondary" v-if="subtitle && subtitle.length > 0">
        <a :href="link" target="_blank" v-if="link && link.length > 0 && link.startsWith('http')">{{ subtitle }}</a>
        <a :href="url" v-else-if="url && url.length > 0">{{ subtitle }}</a>
        <span v-else>{{ subtitle }}</span>
      </h6>
      <h6 class="card-subtitle mb-2 text-body-secondary" v-if="date && date.length > 0">
        <a :href="link" target="_blank" v-if="link && link.length > 0 && link.startsWith('http')">{{ formatDate(date) }}</a>
        <a :href="url" v-else-if="url && url.length > 0">{{ formatDate(date) }}</a>
        <span v-else>{{ formatDate(date) }}</span>
      </h6>
      <p class="card-text">
        <slot></slot>
      </p>
      <div v-if="tags && tags.length > 0">
        <span class="badge badge-light me-1" v-for="tag in tags.split(',')" :key="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: [String, Number]
  },
  subtitle: {
    type: String
  },
  date: {
    type: String
  },
  url: {
    type: String
  },
  tags: {
    type: String
  },
  image: {
    type: String
  },
  link: {
    type: String
  }
});
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>