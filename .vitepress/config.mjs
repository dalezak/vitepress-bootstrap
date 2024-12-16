import { defineConfig } from 'vitepress'

import feedGenerator from './utils/feed-generator.js';
import headTransformer from './utils/head-transformer.js';
import themeVariables from './utils/theme-variables.js';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepress-bootstrap",
  cleanUrls: true,
  title: "Vitepress",
  description: "Vitepress Bootstrap Theme",
  themeConfig: {
    author: "Dale Zak",
    website: "https://dalezak.github.io",
    layout: 'default', // default
    theme: 'light', // light, dark
    font: 'Roboto', // Open Sans, Roboto, Lato, Ubuntu, Droid Sans, Merriweather, Inconsolata, Oswald, Raleway, Source Sans Pro, Montserrat, Poppins, Playfair Display, Nunito, Quicksand, Pacifico, Lobster, Lora, Merriweather Sans, Roboto Condensed, Roboto Slab, Ubuntu Mono, Vollkorn, Work Sans, Yantramanav, Zilla Slab, Zilla Slab Highlight
    navbar: 'top', // top, fixed-top, fixed-bottom, sticky-top, sticky-bottom
    container: 'container', // container, container-fluid
    sidebar: 'visible', // hidden, visible
    search: 'visible', // hidden, visible
    breadcrumbs: 'visible', // hidden, visible,
    share: 'visible', // hidden, visible
    variables: { // https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss
      'primary': '#135D66',
      'secondary': '#77B0AA',
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
      'code-color': '#003C43',
    },
    links: [
      { name: "Features", url: "/features", icon: "bi-check-square" },
      { name: "Code", url: "https://github.com/dalezak/vitepress-bootstrap", icon: "bi-code-square" }
    ],
    feeds: [
      { name: "Features", loader: "./loaders/features.data.js", rss: "/features.rss", atom: "/features.atom" }
    ],
    networks: [
      { name: 'GitHub', url: 'https://github.com/dalezak', icon: 'github' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dalezak', icon: 'linkedin' },
      { name: 'Twitter',  url: 'https://x.com/dalezak', icon: 'twitter' },
      { name: "Facebook", url: 'https://www.facebook.com/dalezak', icon: 'facebook' },
      { name: 'YouTube', url: 'https://www.youtube.com/dalezak', icon: 'youtube' },
      { name: 'Instagram', url: 'https://www.instagram.com/dalezak', icon: 'instagram' }
    ]
  },
  transformHead: ({ siteConfig, pageData }) => {
    const frontmatter = pageData.frontmatter;
    return headTransformer(siteConfig, frontmatter);
  },
  async transformHtml(code, id, context) {
    const siteConfig = context.siteConfig;
    const userConfig = siteConfig.userConfig;
    const themeConfig = userConfig.themeConfig;
    await themeVariables(id, siteConfig.themeDir, themeConfig.variables);
  },
  buildEnd: async (siteConfig) => {
    const userConfig = siteConfig.userConfig;
    const themeConfig = userConfig.themeConfig;
    if (themeConfig.feeds) {
      themeConfig.feeds.forEach(async (feed) => {
        await feedGenerator(siteConfig, feed);
      });
    }
  }
})
