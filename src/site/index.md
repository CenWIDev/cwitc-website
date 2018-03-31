---
title: Home
layout: home.hbs
hideFromNav: true
---

### Getting Started
Run this command to build the site in dev configuration:
```
npm run build
```

This will compile the site and start it up with BrowserSync, which will live reload the site when the source changes.

The content of the site is in the `src/site` folder. This is where your markdown, styles, and assets will go. Layouts and Partials belong in the `src/layouts` folder. This solution uses handlebars for a templating engine.

### Included in this solution:

[metalsmith-markdown](https://www.npmjs.com/package/metalsmith-markdown)
  - Allows you to compose your pages with markdown

[metalsmith-collections](https://www.npmjs.com/package/metalsmith-collections)
  - Creates collections of pages that can be output to a page in a list
  - This solution sets up two collections, pages and posts
  - The pages collection are all the markdown files at the root of the site folder. It is used to output the navigation items in the header
  - The posts collection are all the markdown files at the root of the blog folder. This is used to output a list of blog posts on the blog page

[metalsmith-permalinks](https://www.npmjs.com/package/metalsmith-permalinks)
  - Places each page into its own folder in the dist folder with the same name as the file. Then renames the file to `index.html`. This allows urls to be `www.yoursite.com/blog` instead of `www.yoursite.com/blog.html`

[metalsmith-handlebars](https://www.npmjs.com/package/metalsmith-handlebars)
  - The templating engine used in your layout files. This allows you to pull out data from the yml header on your markdown page and place it in the layout

[metalsmith-discover-partials](https://www.npmjs.com/package/metalsmith-discover-partials)
  - Allows for the usage of partial handlebars templates

[metalsmith-sass](https://www.npmjs.com/package/metalsmith-sass)
  - Allows for usage of the CSS preprocessor, SASS

[metalsmith-autoprefixer](https://www.npmjs.com/package/metalsmith-autoprefixer)
  - Automatically makes your styles cross browser compatible, by detecting when to use browser prefixes on properties

[metalsmith-browser-sync](https://www.npmjs.com/package/metalsmith-browser-sync)
  - For developement, reload the page when changes are made to the source
  - BrowserSync will watch the markdown, scss, and handlebars files for changes.
  - BrowserSync will have to be restarted if changing the `app-config.json` or `build.js` files
