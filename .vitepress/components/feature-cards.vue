<template>
  <grid-cards :limit="limit" :more="more" :width="width" :columns="columns" :cards="features">
    <template #card="{ card }">
      <card :title="card.title" :date="card.date" :keywords="card.keywords" :image="card.image" :url="card.url" :link="card.link">
        {{ card.description }}
      </card>
    </template>
  </grid-cards>
</template>

<script setup>
import { defineProps } from 'vue';
import { data as features } from '../loaders/features.data.js';
const props = defineProps({
  limit: {
    type: Number,
    default: 12
  },
  width: {
    type: Number,
    default: 400
  },
  columns: {
    type: Number,
    default: 4
  },
  more: {
    type: Boolean,
    default: true
  }
})
</script>