---
title: Gems of October 24"
publishedAt: 2024-10-31T00:00:00.000Z
tags:
  - Gems of the Month
---

One step closer to building a habit. This are my findings in October 24".

## Linux

### Logitech MX Mechanical Mini

Not long ago I've bought a Logitech MX Mechanical Mini. Typing feels good on it and it is quite for being a mechanical keyboard. For whatever reason Logitech has decided not to include a native <kbd>Print</kbd> key, but a custom one invoking <kbd>Shift</kbd>+<kbd>Super</kbd>+<kbd>S</kbd> instead. This shortcut is calling the Snipping Tool on Windows. I wish they have added a Linux preset to the keyboard. Unfortunately it is also not possible to remap the key by yourself within the keyboard.

As I use my laptop sometimes with other (proper) keyboards as well, the only good solution I could think of is, to multiple assign the screenshot shortcut. Gnome doesn't allow this via the System settings, but by setting the configuration directly:

```bash
gsettings set org.gnome.shell.keybindings show-screenshot-ui "['Print', '<Shift><Super>S']"
```
