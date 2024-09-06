<template>
  <div class="cards row">
    <div class="col" :class="columnClasses" :key="'col-' + column" v-for="(_, column) in state.columns">
      <card :title="card.title" :date="card.date" :tags="card.keywords" :image="image ? card.image : null" :url="link ? card.url : null" :link="card.link" :key="'card-'+index" v-for="(card, index) in columnCards[column]">
        {{ card.description }}
      </card>
    </div>
  </div>
  <div class="d-grid my-4" v-if="props.more && state.loading == false && cardsTotal > cardsCount">
    <button type="button" class="btn btn-outline-primary" @click="onMore">More</button>
  </div>
</template>

<script setup>
import { reactive, computed, defineProps, onMounted, onUnmounted } from 'vue';
import eventBus from '../events/bus.js';
import { onDebounce, addEvent, removeEvent } from '../events/listeners.js';

const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  },
  limit: {
    type: Number,
    default: 12
  },
  more: {
    type: Boolean,
    default: false
  },
  client: {
    type: String,
    default: ""
  },
  image: {
    type: Boolean,
    default: false
  },
  link: {
    type: Boolean,
    default: true
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

const query = window !== undefined ? window.location.search : "";
const params = new URLSearchParams(query);
const state = reactive({
  offset: 0,
  columns: 0,
  search: params.get('search') || "",
  loading: true
});

const cardsFiltered = computed(() => {
  if (props.cards && props.cards.length > 0) {
    let filtered = props.cards.filter((card) => {
      return (card.title && card.title.length > 0 && card.title.toLowerCase().includes(state.search.toLowerCase())) || 
        (card.description && card.description.length > 0 && card.description.toLowerCase().includes(state.search.toLowerCase())) || 
        (card.keywords && card.keywords.length > 0 && card.keywords.includes(state.search));
    });
    if (props.client && props.client.length > 0) {
      return filtered.filter((card) => {
        return (card.client && card.client.length > 0 && card.client.toLowerCase().includes(props.client.toLowerCase())) ||
          (card.keywords && card.keywords.length > 0 && card.keywords.includes(props.client.toLowerCase()));
      });
    }
    return filtered;
  }
  return [];
});

const cardsTotal = computed(() => {
  return cardsFiltered.value ? cardsFiltered.value.length : 0;
});

const cardsSliced = computed(() => {
  return cardsFiltered.value ? cardsFiltered.value.slice(0, state.offset + props.limit) : [];
});

const cardsCount = computed(() => {
  return cardsSliced.value.length;
})

const columnCards = computed(() => {
  return cardsSliced.value ? [...Array(state.columns).keys()].map(column => cardsSliced.value.filter((_, index) => index % state.columns === column)) : [];
});

const columnClasses = computed(() => {
  return `col-${12/state.columns}`;
});

const onMore = () => {
  state.offset += props.limit;
};

const onReposition = onDebounce(() => {
  state.columns = Math.min(Math.floor(window.innerWidth / props.width), props.columns);
  state.loading = false;
});

const listenSearch = () => {
  eventBus.on('search', (search) => {
    state.search = search;
  });
};

const unlistenSearch = () => {
  eventBus.off('search');
};

onMounted(() => {
  addEvent("resize", onReposition);
  listenSearch();
  onReposition();
})

onUnmounted(() => {
  removeEvent("resize", onReposition);
  unlistenSearch();
})
</script>

<style scoped lang="scss">

</style>