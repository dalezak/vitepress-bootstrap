<template>
  <div class="dropdown ms-2" v-if="hasRss || hasAtom">
    <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="true" type="button" aria-expanded="false" @click="showDropdown">
      <i class="bi bi-rss"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li v-if="hasRss">
        <a class="dropdown-item" title="RSS Feed" :href="withBase(rss)" target="_blank" @click="hideDropdown">RSS</a>
      </li>
      <li v-if="hasAtom">
        <a class="dropdown-item" title="Atom Feed" :href="withBase(atom)" target="_blank" @click="hideDropdown">Atom</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, onUnmounted } from 'vue';
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData();

const rss = frontmatter.value.rss;
const atom = frontmatter.value.atom;

const hasRss = rss && rss.length > 0;
const hasAtom = atom && atom.length > 0;

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