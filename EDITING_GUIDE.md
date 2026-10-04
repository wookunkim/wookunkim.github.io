# Editing the website

This repository is the live source for `wookunkim.github.io`.

## Main files

- `index.html` — homepage
- `research/index.html` — publications, selected working papers, and work in progress
- `teaching/index.html` — teaching page and teaching-material links
- `cv/index.html` — CV landing page
- `assets/styles.css` — layout, typography, colors, and mobile behavior
- `assets/portrait.png` — homepage portrait

## Simple text edits

Open the relevant HTML file in GitHub, click the pencil icon, search for the exact sentence or paper title, edit it, and commit the change to `main`. GitHub Pages will redeploy automatically.

## Reordering research papers

In `research/index.html`, each paper is one complete block:

```html
<article class="paper" id="paper-id">
  ...
</article>
```

Move the entire `<article>...</article>` block above or below another paper. Keep papers inside the appropriate section.

## Adding a paper link

Inside a paper's `paper-links` block, add:

```html
<a href="YOUR-URL" target="_blank" rel="noopener noreferrer">Paper</a>
```

For a draft that is not public, use plain text:

```html
<span class="availability-note">Draft available upon request</span>
```

## Homepage document links

The homepage links to:
- CV
- Research statement

Teaching documents are linked from `teaching/index.html`.

## Before launch at www.wookunkim.com

The site is currently staged with `noindex`. Remove the noindex directives and update `robots.txt` only when the custom domain is ready to replace the old Google Sites version.
