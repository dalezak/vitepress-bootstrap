<template>
  <div class="dropdown">
    <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="true" type="button" aria-expanded="false" @click="showDropdown">
      <i class="bi bi-rss"></i>
    </button>
    <ul class="dropdown-menu">
      <li v-if="rss && rss.length > 0">
        <a class="dropdown-item" title="RSS Feed" :href="rss" target="_blank" @click="hideDropdown">RSS</a>
      </li>
      <li v-if="atom && atom.length > 0">
        <a class="dropdown-item" title="Atom Feed" :href="atom" target="_blank" @click="hideDropdown">Atom</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, onUnmounted } from 'vue';

const props = defineProps({
  rss: {
    type: String,
    default: ""
  },
  atom: {
    type: String,
    default: ""
  }
});

const state = reactive({
  dropdown: null
});

const showDropdown = async (event) => {
  event.stopPropagation();
  if (state.dropdown == null) {
    const { Dropdown } = await import("bootstrap");
    const element = event.target.closest(".dropdown");
    state.dropdown = new Dropdown(element);
  }
  state.dropdown.show();
};

const hideDropdown = () => {
  if (state.dropdown) {
    state.dropdown.hide();
  }
};


onUnmounted(() => {
  if (state.dropdown) {
    state.dropdown.dispose();
    state.dropdown = null;
  }
});
</script>