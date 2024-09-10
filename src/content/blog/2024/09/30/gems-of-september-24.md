---
title: Gems of September 24"
publishedAt: 2024-09-10T18:20:18.708Z
tags:
  - Gems of the Month
draft: true
---

This article is a collection of gems I encountered during September 24". Hopefully a series or habit will develop out of this.

## HTML, CSS and JS

### `:placeholder-shown` and `:focus-within` pseudo-classes

I've found `:placeholder-shown` useful in combination with `:focus-within` to style elements when an input element is focused, but the user has not entered anything into it, yet. For example you have a search input, but you want to show the results box, that maybe contain a loading indicator first, only when the user started to type into the input field, then you can do:

```css
.results {
  display: none;
}

.search-wrapper:focus-within input:not(:placeholder-shown) + .results {
  display: flex;
}
```
