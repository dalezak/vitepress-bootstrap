<template>
  <audio class="audio-player" controls>
    <source :src="props.audio":type="contentType"/>
    Your browser does not support the audio element.
  </audio>
</template>

<script setup>
const props = defineProps({
  audio: {
    type: String,
    required: true
  }
});

const contentType = getContentType(props.audio);

function getContentType(audio) {
  const extension = audio.split('.').pop();
  switch (extension) {
    case 'mp3':
      return 'audio/mpeg';
    case 'ogg':
      return 'audio/ogg';
    case 'wav':
      return 'audio/wav';
    default:
      return 'audio/mpeg';
  }
}
</script>

<style scoped>
</style>