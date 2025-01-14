<template>
  <div class="card mb-4">
    <template v-if="image && image.length > 0">
      <hyperlink :href="url" :title="title" v-if="url && url.length > 0">
        <img :src="image" class="card-img-top" alt="image"/>
      </hyperlink>
      <img :src="image" class="card-img-top" alt="image" v-else>
    </template>
    <div class="card-body">
      <h5 class="card-title" v-if="title && title.length > 0">
        <hyperlink :href="url" :title="title" v-if="url && url.length > 0">{{ title }}</hyperlink> 
        <hyperlink :href="link" :title="title" v-else-if="link && link.length > 0">{{ title }}</hyperlink> 
        <span v-else>{{ title }}</span>
      </h5>
      <h6 class="card-subtitle mb-2 text-body-secondary" v-if="subtitle && subtitle.length > 0">
        <hyperlink :href="url" :title="title" v-if="url && url.length > 0">{{ subtitle }}</hyperlink> 
        <hyperlink :href="link" :title="title" v-else-if="link && link.length > 0">{{ subtitle }}</hyperlink> 
        <span v-else>{{ subtitle }}</span>
      </h6>
      <h6 class="card-subtitle mb-2 text-body-secondary" v-if="date && date.length > 0">
        <hyperlink :href="url" :title="title" v-if="url && url.length > 0">{{ formatDate(date) }}</hyperlink> 
        <hyperlink :href="link" :title="title" v-else-if="link && link.length > 0">{{ formatDate(date) }}</hyperlink> 
        <span v-else>{{ formatDate(date) }}</span>
      </h6>
      <p class="card-text">
        <slot></slot>
      </p>
      <div v-if="keywords && keywords.length > 0">
        <badge :text="keyword" :key="keyword" v-for="keyword in keywords.split(',')"/>
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
  keywords: {
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
</style>