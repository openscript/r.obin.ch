---
title: Gems of September 24"
publishedAt: 2024-09-30T20:00:00.000Z
tags:
  - Gems of the Month
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

One could think that this can be achieved with `:empty` as well, but this pseudo-class selects elements with no children, what is always true for `<input>`-elements.

## Linux

### DNS of Wireguard NetworkManager config, is not applied

When installed my new laptop, I've made the mistake to install `dhcpcd`. Then when I activated a Wireguard connection, the configured DNS was not set. This happens because the NetworkManager wants to prevent conflicts when multiple services try to write `/etc/resolve.conf`. Disabling the `dhcpcd` service resolved the issue.

### Parallel downloads with Pacman

By default the package manager (or short pacman) downloads the packages sequentially. This can be changed in its config file, which resides at `/etc/pacman.conf`. Change or uncomment to `ParallelDownloads = 5`.

### `cryptomator` from AUR doesn't update

Sometimes I'm faced with the following error, when updating `cryptomator` from AUR:

```txt
==> Making package: cryptomator 1.14.0-1 (Mi 25 Sep 2024 08:34:34)
==> Retrieving sources...
  -> Found cryptomator-1.14.0.tar.gz
  -> Found cryptomator-1.14.0.tar.gz.asc
  -> Found jdk.tar.gz
  -> Found openjfx.zip
==> Validating source files with sha256sums...
    cryptomator-1.14.0.tar.gz ... Passed
    cryptomator-1.14.0.tar.gz.asc ... Skipped
==> Validating source_x86_64 files with sha256sums...
    jdk.tar.gz ... FAILED
    openjfx.zip ... FAILED
==> ERROR: One or more files did not pass the validity check!
```

The problem is, that there is already a `jdk.tar.gz` and `openjfx.zip` in Parus cache. `cryptomator` expect them to be another newer version than the one in the cache, so they don't match the expected checksum. You can manually delete them in `/home/user/.cache/paru/clone/cryptomator` or clear Parus cache with `paru -Scc`. After cleaning this up `cryptomator` should update normally.

## Tools

### Visual Studio Code: Better Git Line Blame

For a while I've been using GitLens. The paid features advertisements get more and more annoying. The feature of GitLens I've been using the most, is the inline blame feature. An alternative for that feature is the [Better Git Line Blame](https://marketplace.visualstudio.com/items?itemName=mk12.better-git-line-blame) extension. It is also way faster than the inline blame from GitLens.
