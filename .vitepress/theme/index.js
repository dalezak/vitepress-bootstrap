import 'bootstrap-icons/font/bootstrap-icons.scss'
import './index.scss'

import VLazyImage from "v-lazy-image";
import Layout from '../components/layout.vue'

/** @type {import('vitepress').Theme} */
export default {
  Layout: Layout,
  enhanceApp({ app }) {
    loadComponents(app);
  }
}

function loadComponents(app) {
  app.component('v-lazy-image', VLazyImage);

  const components = import.meta.glob('../components/*.vue', { eager: true });
  for (const path in components) {
    const component = components[path].default;
    const name = path.match(/\.\/components\/(.*?)\.vue$/)[1];
    app.component(name, component);
  }
}
