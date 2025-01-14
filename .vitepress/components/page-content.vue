<template>
  <div class="mb-4" v-if="id && id.length > 0">
    <share-button class="float-end" />
    <h1 v-if="title">{{ title }}</h1>
    <h5 v-if="subtitle">{{ subtitle }}</h5>
  </div>
  <div class="my-4">
    <content />
  </div>
  <div class="my-4" v-if="video && video.length > 0">
    <video-player :video="video" />
  </div>
  <div class="my-4" v-if="audio && audio.length > 0">
    <audio-player :audio="audio" />
  </div>
  <div class="my-4" v-if="images && images.length > 0">
    <image-gallery :images="images" />  
  </div>
  <div class="my-4" v-if="link || links">
    <link-button :url="link" v-if="link" />
    <link-button :url="link" :key="'link-' + index" v-for="(link, index) of links" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { formatString, formatArray } from '../utils/formatters';

const { frontmatter } = useData();

const id = computed(() => formatString(frontmatter.value.id));
const title = computed(() => formatString(frontmatter.value.title));
const subtitle = computed(() => formatString(frontmatter.value.subtitle));
const video = computed(() => formatString(frontmatter.value.video));
const audio = computed(() => formatString(frontmatter.value.audio));
const link = computed(() => formatString(frontmatter.value.link));
const links = computed(() => formatArray(frontmatter.value.links));
const images = computed(() => formatArray(frontmatter.value.images));
</script>