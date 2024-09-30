<template>
  <div class="image-gallery" v-if="images && images.length > 0">
    <grid-cards :limit="limit" :width="width" :columns="columns" :cards="images">
      <template #card="{ card }">
        <lazy-image :src="card" class="img-fluid cursor-pointer rounded mb-3" alt="Image" @click="showModal(card)" />
      </template>
    </grid-cards>
    <modal-dialog ref="modal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  images: {
    type: Array,
    default: []
  },
  width: {
    type: Number,
    default: 400
  },
  columns: {
    type: Number,
    default: 4
  }
})

const modal = ref(null);
const limit = props.images.length;

const showModal = (image) => {
  if (modal.value) {
    modal.value.showModal(image);
  }
}
</script>