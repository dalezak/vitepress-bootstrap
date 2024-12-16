<template>
<nav class="navbar navbar-expand-sm" :class="navbar">
  <div class="container-fluid">
    <hyperlink class="navbar-brand" href="/" v-if="title">{{ title }}</hyperlink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle menu" @click="onMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarMenu">
      <ul class="navbar-nav me-auto">
        <li class="nav-item" :key="link.name" v-for="link of links">
          <hyperlink class="nav-link" :class="linkActive(link.url)" :title="link.name" :href="link.url">
            <i class="me-2 bi" :class="link.icon" v-if="link.icon"></i>
            <span v-if="link.name">{{ link.name }}</span>
          </hyperlink>
        </li>
      </ul>
      <div class="d-flex">
        <search-bar />
        <feed-button />
        <share-button />
      </div>
    </div>
  </div>
</nav>
</template>

<script setup>
import { useRoute, useData, withBase } from 'vitepress'

const { site } = useData()
const route = useRoute()

const title = site.value.title;
const links = site.value.themeConfig.links || [];
const navbar = site.value.themeConfig.navbar || '';

const linkActive = (url) => {
  const path = withBase(url);
  return route.path.startsWith(path) ? 'active' : '';
}

const onMenu = () => {
  const navbarMenu = document.getElementById('navbarMenu');
  navbarMenu.classList.toggle('show');
}
</script>