<template>
  <div class="row" v-if="networks && networks.length > 0">
    <div class="my-4 text-center col-6 col-sm-4 col-md-4 col-lg-2" v-for="network of networks">
      <hyperlink :href="network.url" :title="network.name">
        <i class="fs-1 bi" :class="'bi-' + network.icon"></i>
      </hyperlink>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress';
const { site } = useData();
const networks = site.value.themeConfig.networks || [];
</script>

<style scoped>
</style>