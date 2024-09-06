<template>
  <div class="row" v-if="links && links.length > 0">
    <div class="my-4 text-center col-6 col-sm-4 col-md-4 col-lg-2" v-for="link of links">
      <a :href="link.url" :title="link.name" target="_blank">
        <i class="fs-1 bi" :class="'bi-' + link.icon"></i>
      </a>  
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress';
const { site } = useData();
const links = site.value.themeConfig.links || [];
</script>

<style scoped>
</style>