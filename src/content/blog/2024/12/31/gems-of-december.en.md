---
title: Gems of December 24"
publishedAt: 2024-12-31T00:00:00.000Z
tags:
  - Gems of the Month
---

Hopefully I get back to the habit after a trip to Asia.

## Arch Linux

### Manage Pacmans mirror list

Archlinux package manager Pacman stores a list of mirrors from which the packages are loaded. This list is located in `/etc/pacman.d/mirrorlist`. [Reflector](https://wiki.archlinux.org/title/Reflector) is a tool to manage this list. When I'm in Switzerland I want to use Swiss mirrors, https only and sorted by the download rate, so I update the list as follows:

```bash
reflector --country Switzerland --age 12 --protocol https --sort rate --download-timeout 10 --save /etc/pacman.d/mirrorlist
```

## Tools

### Visual Studio Code: Editor Git Blame decoration

In September I [wrote](../09/30/gems-of-september-24) about a VS Code extension called "Better Git Blame". This extension shows the git blame information in the editor per line. With [version 1.96](https://code.visualstudio.com/updates/v1_96#_git-blame-information-experimental) of VS Code, this feature is now built-in. You can enable it with the setting `"git.blame.editorDecoration.enabled": true` in your settings json.
