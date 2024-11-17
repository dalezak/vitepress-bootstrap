<template>
  <div>
    <div class="mt-4" :class="container">
      <nav-bar />
    </div> 
    <div class="my-4" :class="container">
      <breadcrumb-bar />
      <div class="row">
        <div class="col"> 
          <page-content />
        </div>
        <div class="col-12 col-md-3" v-if="showSidebar">
          <side-bar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue';
import { useData } from 'vitepress';
import { formatString } from '../utils/formatters';

const { site, frontmatter } = useData();

const themeConfig = site.value.themeConfig || {};
const container = themeConfig.container || '';

const id = computed(() => formatString(frontmatter.value.id));

const showSidebar = computed(() => {
  return id && id.value;
});

const loadTheme = () => {
  const theme = themeConfig.theme || '';
  if (theme && theme.length > 0) {
    document.body.setAttribute('data-bs-theme', theme);
  }
};

const loadFont = () => {
  const font = themeConfig.font || '';
  if (font && font.length > 0) {
    const style = document.createElement("style");
    style.type = "text/css"; 
    style.textContent = [
      `@import url('https://fonts.googleapis.com/css2?family=${font}&display=swap');`,
      `body { font-family: ${font}; }`
    ].join("\n")
    document.head.appendChild(style);
  }
};

onBeforeMount(() => {
  loadFont();
  loadTheme();
});
</script>

<style scoped>
</style>