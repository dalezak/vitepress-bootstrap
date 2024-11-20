<template>
  <div class="card breadcrumbs my-4" v-if="showBreadcrumbs">
    <div class="card-body">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb" v-if="breadcrumbs && breadcrumbs.length > 0">
          <li class="breadcrumb-item" v-for="breadcrumb of breadcrumbs" :key="breadcrumb.name">
            <hyperlink :href="breadcrumb.url" :title="breadcrumb.name">{{ breadcrumb.name }}</hyperlink>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useData, useRoute } from 'vitepress';

const route = useRoute();
const { site, frontmatter } = useData();

const base = site.value.base;
const links = site.value.themeConfig.links || [];
const title = computed(() => frontmatter.value.title);
const showBreadcrumbs = computed(() => route.path != base && site.value.themeConfig.breadcrumbs == 'visible');

const breadcrumbs = computed(() => {
  const path = route.path.replace(base, '/');
  return path.split('/').map((item) => {
    if (item == "") {
      return { name: 'Home', url: "/" };
    }
    const link = links.find(link => [item, '/' + item, '/' + item + '/'].includes(link.url));
    if (link) {
      return { name: link.name, url: link.url };
    }
    return { name: title.value, url: path };
  });
});
</script>

<style scoped>

</style>