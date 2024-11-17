---
title: Vitepress Bootstrap
description: Vitepress Bootstrap Starter Project
---

<jumbotron 
  title="Vitepress Bootstrap"
  subtitle="Static site generator using markdown for content built with Vitepress and Bootstrap"
  description="Customizable turn key starter theme with responsive layout, dark mode, video player, photo gallery, and more"
  primaryText="See Features"
  primaryUrl="/features"
  secondaryText="Source Code"
  secondaryUrl="https://github.com/dalezak/vitepress-bootstrap"/>

---

#### Features

Lots of powerful [features](/features) built in like video player, image gallery, responsive grid, and more.

<feature-cards :limit="12" :columns="3" :more="false" />

---

#### Frontmatter

Easily write content for your pages using YAML [frontmatter](https://vitepress.dev/guide/frontmatter) in your markdown.

- **id** - the
- **title** - page title
- **description** - 
- **keywords** - 



---

#### Configuration

Update the site configuration in `.vitepress/config.mjs`.

- **title** - site title
- **description** - site description
- **themeConfig.navbar** - `fixed-top`, `fixed-bottom`, `sticky-top`, `sticky-bottom`
- **themeConfig.container** - `container`, `container-fluid`
- **themeConfig.links** - navbar links
- **themeConfig.feeds** - rss and atom feeds
- **themeConfig.networks** - social network links

---

#### Theme

The theme is built using [Bootstrap](https://getbootstrap.com), you can override the default styling by editing the stylesheets in `.vitepress/theme`.

---

#### Start

Getting started is easy:

- fork [dalezak/vitepress-bootstrap](https://github.com/dalezak/vitepress-bootstrap)
- edit `.vitepress/config.mjs`
- create your markdown content

You can follow the [features](https://github.com/dalezak/vitepress-bootstrap/features) for examples using different components like video player or image gallery.

---

#### Contact
Like what you see? Find me elsewhere.

<network-links />