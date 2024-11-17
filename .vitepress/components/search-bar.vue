<template>
  <div class="input-group ms-auto" v-if="showSearch">
    <input type="text" name="search" v-model="state.search" :placeholder="placeholder" class="form-control" aria-label="Search" aria-describedby="input-search" @input="onSearch">
    <button type="button" id="input-search" class="btn btn-outline-secondary" title="Search" @click="onSearch">
      <i class="bi bi-search"></i>
    </button>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useData, useRoute } from 'vitepress';
import eventBus from '../utils/event-bus.js';

const route = useRoute();
const { site, frontmatter } = useData();
const query = (window !== undefined) ? window.location.search : "";
const params = new URLSearchParams(query);
const placeholder = computed(() => frontmatter.value.search);
const showSearch = computed(() => route.path != '/' && site.value.themeConfig.search == 'visible' && frontmatter.value.search && frontmatter.value.search.length > 0);

const state = reactive({
  search: params.get('search') || "",
})

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
</script>