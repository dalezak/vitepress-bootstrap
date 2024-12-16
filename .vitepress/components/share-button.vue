<template>
  <div class="dropdown ms-2" v-if="showShare">
    <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="true" type="button" aria-expanded="false" @click="showDropdown">
      <i class="bi bi-share"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <a class="dropdown-item" href="#" @click="shareTwitter">Twitter</a>
      </li>
      <li>
        <a class="dropdown-item" href="#" @click="shareFacebook">Facebook</a>
      </li>
      <li>
        <a class="dropdown-item" href="#" @click="shareLinkedIn">LinkedIn</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, computed, onUnmounted } from 'vue';
import { useData } from 'vitepress';

const { site, frontmatter } = useData();

const url = (window !== undefined) ? window.location.href : "";
const id = frontmatter.value.id || "";
const title = frontmatter.value.title || "";
const description = frontmatter.value.description || "";
const hashtags = frontmatter.value.keywords ? frontmatter.value.keywords.split(",").map((keyword) => `#${keyword.trim()}`) : [];

const showShare = computed(() => id.length > 0 && site.value.themeConfig.share == 'visible');

const state = reactive({
  dropdown: null
});

const showDropdown = async (event) => {
  event.stopPropagation();
  if (state.dropdown == null) {
    const { Dropdown } = await import("bootstrap");
    const element = event.target.closest(".dropdown");
    state.dropdown = new Dropdown(element);
  }
  state.dropdown.show();
};

const hideDropdown = (event) => {
  event.stopPropagation();
  if (state.dropdown) {
    state.dropdown.hide();
  }
};

const shareTwitter = (event) => {
  hideDropdown(event);
  shareSocial("https://twitter.com/intent/tweet", {
    url: url,
    text: `${title} - ${description} ${hashtags.join(" ")}`
  }); 
};

const shareFacebook = (event) => {
  hideDropdown(event);
  shareSocial("https://www.facebook.com/sharer/sharer.php", {
    u: url,
    quote: `${title} - ${description} ${hashtags.join(" ")}`
  });
};

const shareLinkedIn = (event) => {
  hideDropdown(event);
  shareSocial("https://www.linkedin.com/shareArticle", {
    mini: true,
    url: url,
    title: title,
    summary: `${description} ${hashtags.join(" ")}`
  });
};

const shareSocial = (url, params = {}) => {
  const link = new URL(url);
  for (const key in params) {
    link.searchParams.append(key, params[key]);
  }
  if (window !== undefined) {
    window.open(link.href, "_blank");
  }
};

onUnmounted(() => {
  if (state.dropdown) {
    state.dropdown.dispose();
    state.dropdown = null;
  }
});
</script>