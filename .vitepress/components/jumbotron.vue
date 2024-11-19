<template>
  <div class="card">
    <div class="card-body text-center p-5">
      <h1 class="display-3" v-if="title && title.length > 0">{{ title }}</h1>
      <p class="lead" v-if="subtitle && subtitle.length > 0">{{ subtitle }}</p>
      <p v-if="description && description.length > 0">{{ description }}</p>
      <p v-if="hasPrimary || hasSecondary">
        <hyperlink :href="primaryUrl" :title="primaryText" class="btn btn-primary" v-if="hasPrimary">{{ primaryText }}</hyperlink>
        <hyperlink :href="secondaryUrl" :title="secondaryText" class="btn btn-secondary ms-3" v-if="hasSecondary">{{ secondaryText }}</hyperlink>
      </p>
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
const hasPrimary = props.primaryUrl && props.primaryUrl.length > 0 && props.primaryText && props.primaryText.length > 0;
const hasSecondary = props.secondaryUrl && props.secondaryUrl.length > 0 && props.secondaryText && props.secondaryText.length > 0;
</script>