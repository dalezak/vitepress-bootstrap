<template>
  <div class="d-grid mb-4">
    <button :title="url" class="btn btn-outline-primary" @click="visitUrl">{{ props.title || props.url }}</button>
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String
  },
  title: {
    type: String,
    default: null
  }
});

const visitUrl = () => {
  if (window !== undefined) {
    window.open(props.url, '_blank');
  }
}
</script>