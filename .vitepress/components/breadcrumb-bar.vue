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
import { useData, useRoute, withBase } from 'vitepress';

const route = useRoute();
const { site, frontmatter } = useData();

const title = computed(() => frontmatter.value.title);
const links = site.value.themeConfig.links || [];
// const showBreadcrumbs = computed(() => route.path != '/' && site.value.themeConfig.breadcrumbs == 'visible');
const showBreadcrumbs = false;

const breadcrumbs = computed(() => {
  console.log("path", route.path, "base", withBase(route.path), "breadcrumbs", route.path.split('/'), "withBase", withBase('/'));
  return route.path.split('/').filter(Boolean).map((item) => {
    console.log("item", item);
    if (item == withBase('')) {
      return { name: 'Home', url: withBase('/') };
    }
    const link = links.find(link => ['/' + item, item, '/' + item + '/'].includes(link.url));
    if (link) {
      return { name: link.name, url: withBase(link.url) };
    }
    return { name: title, url: withBase(route.path) };
  });
});
</script>

<style scoped>

</style>