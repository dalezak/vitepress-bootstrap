<template>
  <div class="card">
    <div class="card-body">
      <h1 class="card-title" v-if="title && title.length > 0">
        {{ title }}
      </h1>
      <h5 class="card-subtitle" v-if="subtitle && subtitle.length > 0">
        {{ subtitle }}
      </h5>
      <div class="card-text mb-2" v-if="description && description.length > 0">
        <hr />
        {{ description }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { formatString } from '../utils/formatters';

const { frontmatter } = useData();
const title = computed(() => formatString(frontmatter.value.title));
const subtitle = computed(() => formatString(frontmatter.value.subtitle));
const description = computed(() => formatString(frontmatter.value.description));
</script>