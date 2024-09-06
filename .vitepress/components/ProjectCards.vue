<template>
  <grid-cards :limit="limit" :more="more" :width="width" :columns="columns" :client="client" :cards="projects"></grid-cards>
</template>

<script setup>
import { defineProps } from 'vue';
import { data as projects } from '../loaders/projects.data.js';
const props = defineProps({
  limit: {
    type: Number,
    default: 12
  },
  more: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 400
  },
  columns: {
    type: Number,
    default: 4
  },
  client: {
    type: String,
    default: ""
  }
})
</script>