<template>
  <div class="card">
    <div class="card-body text-center p-5">
      <h1 class="display-3" v-if="title && title.length > 0">{{ title }}</h1>
      <p class="lead" v-if="subtitle && subtitle.length > 0">{{ subtitle }}</p>
      <p v-if="description && description.length > 0">{{ description }}</p>
      <a class="btn btn-outline-primary" :href="primaryUrl" :target="linkTarget(primaryUrl)" role="button" v-if="primaryUrl && primaryText">{{ primaryText }}</a>
      <a class="btn btn-outline-secondary ms-3" :href="secondaryUrl" :target="linkTarget(secondaryUrl)" role="button" v-if="secondaryUrl && secondaryText">{{ secondaryText }}</a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  primaryText: {
    type: String,
    default: null
  },
  primaryUrl: {
    type: String,
    default: null
  },
  secondaryText: {
    type: String,
    default: null
  },
  secondaryUrl: {
    type: String,
    default: null
  }
});

const linkTarget = (link) => {
  return link.startsWith('http') ? '_blank' : '_self';
}
</script>