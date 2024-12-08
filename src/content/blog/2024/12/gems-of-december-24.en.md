---
title: Gems of December 24"
publishedAt: 2024-12-31T00:00:00.000Z
tags:
  - Gems of the Month
---

Hopefully back to the habit after a longer trip in Asia.

## Archlinux

### Manage Pacmans mirror list

Archlinux package manager Pacman stores a list of mirrors from which the packages are loaded. This list is located in `/etc/pacman.d/mirrorlist`. [Reflector](https://wiki.archlinux.org/title/Reflector) is a tool to manage this list. When I'm in Switzerland I want to use Swiss mirrors, https only and sorted by the download rate, so I update the list as follows:

```bash
reflector --country Switzerland --age 12 --protocol https --sort rate --download-timeout 10 --save /etc/pacman.d/mirrorlist
```
