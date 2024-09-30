<template>
  <span class="badge rounded-pill text-bg-secondary me-1">{{ props.text }}</span>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: null
  }
});

</script>