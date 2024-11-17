<template>
  <div class="card mb-5">
    <div class="card-header" v-if="title && title.length > 0">{{ title }}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-if="item">{{ item }}</li>
      <li class="list-group-item" :key="item" v-for="item in items">{{ item }}</li>
      <li class="list-group-item" :key="key" v-for="(value, key) in links">
        <a :title="key" :href="value">{{ key }}</a>
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