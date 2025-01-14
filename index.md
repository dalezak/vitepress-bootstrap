---
title: Vitepress Bootstrap
description: Vitepress Bootstrap Starter Project
---

<jumbotron 
  title="Vitepress Bootstrap"
  subtitle="Static site generator using markdown for content built with Vitepress and Bootstrap"
  description="Customizable starter theme with responsive layout, dark mode, video player, photo gallery, and more"
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

- **id** - page slug
- **title** - page title
- **date** - date
- **year** - year
- **keywords** - comma separated list of keywords
- **link** - url to external website
- **links** - comma separated list of urls
- **image** - single image url
- **images** - comma separated list of images
- **audio** - link to MP3 audio file
- **video** - link to YouTube
- **repo** - link to Github repo
- **isbn** - book ISBN number
- **description** - page description

---

#### Configuration

Easily custom your site configuration by editing options in [.vitepress/config.mjs](https://github.com/dalezak/vitepress-bootstrap/blob/main/.vitepress/config.mjs).

- **title** - site title
- **description** - site description
- **cleanUrls** - `true`, `false`
- **base** - site path, Github Pages is project name, custom domain is `/`
- **themeConfig.author** - your name
- **themeConfig.website** - website url
- **themeConfig.layout** - `default`
- **themeConfig.theme** - `light`, `dark`
- **themeConfig.font** - any font family from [Google Fonts](https://fonts.google.com)
- **themeConfig.container** - `container`, `container-fluid`
- **themeConfig.navbar** - `top`, `fixed-top`, `fixed-bottom`, `sticky-top`, `sticky-bottom`
- **themeConfig.footer** - `visible`, `hidden`
- **themeConfig.sidebar** - `visible`, `hidden`
- **themeConfig.search** - `visible`, `hidden`
- **themeConfig.breadcrumbs** - `visible`, `hidden`
- **themeConfig.share** - `hidden`, `visible`
- **themeConfig.variables** - override any [Bootstrap](https://getbootstrap.com) variables
- **themeConfig.links** - navbar links
- **themeConfig.feeds** - rss and atom feeds
- **themeConfig.networks** - social network links

---

#### Theme

The theme is built using [Bootstrap](https://getbootstrap.com), you can override the default styling by editing any of the stylesheets in [.vitepress/theme](https://github.com/dalezak/vitepress-bootstrap/blob/main/.vitepress/theme).

---

#### Start

Getting started is easy, simply follow the steps:

- clone or fork [dalezak/vitepress-bootstrap](https://github.com/dalezak/vitepress-bootstrap)
- edit [.vitepress/config.mjs](https://github.com/dalezak/vitepress-bootstrap/blob/main/.vitepress/config.mjs) configuration
- remove [features](https://github.com/dalezak/vitepress-bootstrap/tree/main/features) examples
- edit [index.md](https://github.com/dalezak/vitepress-bootstrap/blob/main/index.md) page
- add your markdown content

You can follow the [features](https://github.com/dalezak/vitepress-bootstrap/features) for examples using different components like video player, image gallery, etc.

---

#### Contact
Like what you see? Find me elsewhere.

<network-links />