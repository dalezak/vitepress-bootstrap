<template>
  <footer class="footer">
    <div class="card">
      <div class="card-body">
        <div class="text-muted">© {{ author }} {{ year }}</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useData } from 'vitepress';
const { site } = useData();
const themeConfig = site.value.themeConfig || {};
const author = themeConfig.author || '';
const year = new Date().getFullYear();
</script>