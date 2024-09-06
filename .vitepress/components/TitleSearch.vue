<template>
  <div class="row mb-4">
    <div class="col-12 col-sm-6 col-md-8" v-if="props.title">
      <h1>{{ props.title }}</h1>
    </div>
    <div class="col-12 col-sm-6 col-md-4" v-if="props.search || props.rss || props.atom">
      <div class="row">
        <div class="col" v-if="props.search">
          <div class="input-group">
            <input type="text" name="search" v-model="state.search" :placeholder="props.search" class="form-control" aria-label="Search" aria-describedby="input-search" @input="onSearch">
            <button type="button" id="input-search" class="btn btn-outline-secondary" title="Search" @click="onSearch">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div class="col-auto" v-if="props.rss || props.atom">
          <feed-button :rss="props.rss" :atom="props.atom"></feed-button>
        </div>
      </div>
    </div>
    <div class="col-12" v-if="props.subtitle">
      <h4>{{ props.subtitle }}</h4>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps } from 'vue';
import eventBus from '../events/bus.js';

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: null
  },
  search: {
    type: String,
    default: null
  },
  rss: {
    type: String,
    default: null
  },
  atom: {
    type: String,
    default: null
  }
});

const query = window !== undefined ? window.location.search : "";
const params = new URLSearchParams(query);
const state = reactive({
  search: params.get('search') || "",
});

const emitSearch = () => {
  eventBus.emit('search', state.search);
};

const updateHistory = () => {
  if (history && history.replaceState) {
    history.replaceState(null, null, `?search=${state.search}`);
  }
};

const onSearch = () => {
  emitSearch();
  updateHistory();
};
</script>

<style lang="scss" scoped>
</style>