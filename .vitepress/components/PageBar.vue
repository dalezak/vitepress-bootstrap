<template>
  <div class="card my-4">
    <div class="card-body">
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <!-- <li class="breadcrumb-item" v-for="link of links" :key="link.name">
                <a :href="link.url">{{ link.name }}</a>
              </li> -->
            </ol>
          </nav>
        </div>
        <div class="col-auto" v-if="props.search">
          <search-bar :placeholder="props.search" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  search: {
    type: String,
    default: null
  }
});
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
  .card-body {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
.breadcrumb {
  margin-bottom: 0;
}
</style>