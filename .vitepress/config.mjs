import { defineConfig } from 'vitepress'

import feedGenerator from './utils/feed-generator.js';
import headTransformer from './utils/head-transformer.js';
import themeVariables from './utils/theme-variables.js';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  title: "Vitepress",
  description: "Vitepress Bootstrap Theme",
  themeConfig: {
    layoyt: 'default', // default, sidebar, topbar
    theme: 'light', // light, dark
    font: 'Roboto', // Open Sans, Roboto, Lato, Ubuntu, Droid Sans, Merriweather, Inconsolata, Oswald, Raleway, Source Sans Pro, Montserrat, Poppins, Playfair Display, Nunito, Quicksand, Pacifico, Lobster, Lora, Merriweather Sans, Roboto Condensed, Roboto Slab, Ubuntu Mono, Vollkorn, Work Sans, Yantramanav, Zilla Slab, Zilla Slab Highlight
    navbar: 'top', // top, fixed-top, fixed-bottom, sticky-top, sticky-bottom
    container: 'container', // container, container-fluid
    search: 'visible', // hidden, visible
    breadcrumbs: 'visible', // hidden, visible
    variables: { // https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss
      'primary': '#dc3545',
      'secondary': '#6c757d',
      'success': '#198754',
      'danger': '#dc3545',
      'warning': '#ffc107',
      'info': '#0dcaf0',
      'light': '#f8f9fa',
      'dark': '#212529',
      'hover': '#0d6efd',
      'body-bg': '#fff',
      'body-color': '#212529',
      'navbar-bg': '#fafafa',
      'navbar-color': '#212529',
      'navbar-border-color': '#e9ecef',
      'navbar-dark-bg': '#212529',
      'navbar-dark-color': '#fff',
      'navbar-dark-border-color': '#343a40',
      'card-bg': '#fafafa',
      'card-border-color': '#e6e6e6',
      'card-dark-bg': '#212529',
      'card-dark-border-color': '#343a40',
    },
    links: [
      { name: "Features", url: "/features", icon: "bi-check-square" },
      { name: "Code", url: "https://github.com/dalezak/vitepress-bootstrap", icon: "bi-code-square" }
    ],
    feeds: [
      { name: "features", path: "./loaders/features.data.js" }
    ],
    networks: [
      { name: 'GitHub', url: 'https://github.com', icon: 'github' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: 'linkedin' },
      { name: 'Twitter',  url: 'https://twitter.com', icon: 'twitter' },
      { name: "Facebook", url: 'https://www.facebook.com', icon: 'facebook' },
      { name: 'YouTube', url: 'https://www.youtube.com', icon: 'youtube' },
      { name: 'Instagram', url: 'https://www.instagram.com', icon: 'instagram' }
    ]
  },
  transformHead: ({ siteConfig, pageData }) => {
    const themeConfig = siteConfig.userConfig.themeConfig;
    const frontmatter = pageData.frontmatter;
    return headTransformer(themeConfig, frontmatter);
  },
  async transformHtml(code, id, context) {
    const siteConfig = context.siteConfig;
    const themeConfig = siteConfig.userConfig.themeConfig;
    await themeVariables(id, siteConfig.themeDir, themeConfig.variables);
  },
  buildEnd: async (siteConfig) => {
    const themeConfig = siteConfig.userConfig.themeConfig;
    if (themeConfig.feeds) {
      themeConfig.feeds.forEach(async (feed) => {
        const data = await (await import(feed.path)).default.load();
        await feedGenerator(siteConfig, feed.name, data);
      });
    }
  }
})
