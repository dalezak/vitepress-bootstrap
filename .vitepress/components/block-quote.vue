<template>
  <figure>
    <blockquote class="blockquote">
      <p v-if="hasText">{{ text }}</p>
    </blockquote>
    <figcaption class="blockquote-footer" v-if="hasAuthor || hasSource">
      {{ author }}
      <cite v-if="hasSource">{{ source }}</cite>
    </figcaption>
  </figure>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false
  },
  source: {
    type: String,
    required: false
  }
});
const hasText = props.text && props.text.length > 0;
const hasAuthor = props.author && props.author.length > 0;
const hasSource = props.source && props.source.length > 0;
</script>