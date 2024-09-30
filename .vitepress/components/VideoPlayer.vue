<template>
  <div class="ratio ratio-16x9">
    <iframe :src="url" allowfullscreen></iframe>
  </div>
</template>

<script setup>
const props = defineProps({
  video: {
    type: String
  }
});
const regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
const id = regex.exec(props.video)[3];
const url = `https://www.youtube.com/embed/${id}?rel=0`;
</script>