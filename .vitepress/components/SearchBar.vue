<template>
  <div class="input-group ms-auto">
    <input type="text" name="search" v-model="state.search" :placeholder="placeholder" class="form-control" aria-label="Search" aria-describedby="input-search" @input="onSearch">
    <button type="button" id="input-search" class="btn btn-outline-secondary" title="Search" @click="onSearch">
      <i class="bi bi-search"></i>
    </button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import eventBus from '../events/bus.js';

const query = window !== undefined ? window.location.search : "";
const params = new URLSearchParams(query);

const props = defineProps({
  placeholder: {
    type: String,
    default: "Search..."
  }
});

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