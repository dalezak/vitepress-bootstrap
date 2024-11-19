<template>
  <a :href="linkHref(href)" :target="linkTarget(href)" :class="class" :title="title" :role="role">
    <slot></slot>
  </a>
</template>

<script setup>
import { withBase } from 'vitepress';

const props = defineProps({
  href: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ""
  },
  class: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: ""
  }
});

const linkHref = (url) => {
  if (url) {
    return url.startsWith('http') ? url : withBase(url);
  }
  return '';
}

const linkTarget = (url) => {
  if (url) {
    return url.startsWith('http') ? '_blank' : '_self';
  }
  return '';
}
</script>