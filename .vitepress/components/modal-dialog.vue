<template>
  <div :id="id" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-if="title && title.length > 0">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img :src="state.image" class="img-fluid w-100 h-auto p-0 m-0" alt="Image" v-if="state.image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
const props = defineProps({
  id: {
    type: String,
    default: "ModalDialog"
  },
  title: {
    type: String
  },
  image: {
    type: String
  }
})

const state = reactive({
  modal: null,
  image: null
});

const importModal = async () => {
  const { Modal } = await import("bootstrap");
  const element = document.getElementById(props.id);
  const options = {
    backdrop: true,
    keyboard: false
  };
  state.modal = new Modal(element, options);
}

const showModal = (image = null) => {
  state.image = image;
  if (state.modal) {
    state.modal.show();
  }
}

onMounted(() => {
  importModal();
});

defineExpose({
  showModal
});
</script>