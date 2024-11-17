<template>
  <v-lazy-image :src="props.src" :alt="props.alt" :width="imageWidth" :height="imageHeight" :class="'lazy-image ' + props.class" alt="image"/>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Image'
  },
  width: {
    type: Number,
    default: null
  },
  height: {
    type: Number,
    default: null
  },
  class: {
    type: String,
    default: ''
  }
});

const imageWidth = computed(() => {
  const params = new URLSearchParams(props.src);
  return params.get('width') || props.width;
});

const imageHeight = computed(() => {
  const params = new URLSearchParams(props.src);
  return params.get('height') || props.height;
});
</script>

<style scoped>

</style>