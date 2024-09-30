<template>
<nav class="navbar navbar-expand-sm sticky-top bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/" v-if="title">{{ title }}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation" @click="onMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarMenu">
      <ul class="navbar-nav me-auto">
        <li class="nav-item" :key="link.name" v-for="link of links">
          <a class="nav-link" :class="{'active' : isActive(link)}" aria-current="page" :title="link.name" :href="link.url">
            <i class="me-2 bi" :class="link.icon" v-if="link.icon"></i>
            <span v-if="link.name">{{ link.name }}</span>
          </a>
        </li>
      </ul>
      <div class="d-flex" v-if="props.search">
        <search-bar :placeholder="props.search" />
      </div>
    </div>
  </div>
</nav>
</template>

<script setup>
import { useData, useRoute } from 'vitepress'

const { site } = useData()
const route = useRoute()

const props = defineProps({
  search: {
    type: String,
    default: null
  }
});

const title = site.value.title;
const links = site.value.themeConfig.nav || [];

const isActive = (link) => {
  const path = link.url.replace(/\/+$/, '');
  return route.path.startsWith(path);
}

const onMenu = () => {
  const navbarMenu = document.getElementById('navbarMenu');
  navbarMenu.classList.toggle('show');
}
</script>