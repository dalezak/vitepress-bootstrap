<template>
  <div class="card mb-4">
    <div class="card-header" v-if="title && title.length > 0">{{ title }}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-if="item">{{ item }}</li>
      <li class="list-group-item" :key="item" v-for="item in items">{{ item }}</li>
      <li class="list-group-item" :key="key" v-for="(value, key) in links">
        <hyperlink :href="value" :title="key">{{ key }}</hyperlink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  item: {
    type: String,
    default: ""
  },
  items: {
    type: Array,
    default: []
  },
  links: {
    type: Object,
    default: {}
  }
});
</script>