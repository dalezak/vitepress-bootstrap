<template>
  <div class="card">
    <div class="card-body">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <!-- <li class="breadcrumb-item" v-for="link of links" :key="link.name">
            <a :href="link.url">{{ link.name }}</a>
          </li> -->
        </ol>
      </nav>
    </div>
  </div>
</template>

<script setup>

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