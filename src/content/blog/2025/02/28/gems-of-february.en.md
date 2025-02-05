---
title: Gems of February 25"
publishedAt: 2025-02-28T00:00:00.000Z
tags:
  - Gems of the Month
---

Another month went by. Here are my gems of the month.

## Technology

### VSCode on remote RedHat server causes issues

When connecting to a remote server, VS Code tries to index the file system. Something goes wrong with that on RedHat devices, because it endlessly loops through some commonly found symlinks.

![rg going crazy](rg-issue.png)

To disable this switch the following setting off:

`search.followSymlinks`

