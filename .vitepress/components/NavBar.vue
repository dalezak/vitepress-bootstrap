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
      <div class="d-flex" v-if="placeholder">
        <div class="input-group ms-auto">
          <input type="text" name="search" v-model="state.search" :placeholder="placeholder" class="form-control" aria-label="Search" aria-describedby="input-search" @input="onSearch">
          <button type="button" id="input-search" class="btn btn-outline-secondary" title="Search" @click="onSearch">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script setup>
import { reactive } from 'vue';
import { useData, useRoute } from 'vitepress'
import eventBus from '../events/bus.js';

const { site, frontmatter } = useData()
const route = useRoute()

const title = site.value.title;
const links = site.value.themeConfig.nav || [];
const placeholder = frontmatter.value.search || false;

const query = window !== undefined ? window.location.search : "";
const params = new URLSearchParams(query);

const state = reactive({
  search: params.get('search') || "",
})

const isActive = (link) => {
  const path = link.url.replace(/\/+$/, '');
  return route.path.startsWith(path);
}

const emitSearch = () => {
  eventBus.emit('search', state.search);
}

const updateHistory = () => {
  if (history && history.replaceState) {
    history.replaceState(null, null, `?search=${state.search}`);
  }
}

const onSearch = () => {
  emitSearch();
  updateHistory();
}

const onMenu = () => {
  const navbarMenu = document.getElementById('navbarMenu');
  navbarMenu.classList.toggle('show');
}
</script>