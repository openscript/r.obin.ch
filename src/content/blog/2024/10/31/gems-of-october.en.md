---
title: Gems of October 24"
publishedAt: 2024-10-31T00:00:00.000Z
tags:
  - Gems of the Month
---

One step closer to building a habit out of this. These are my findings in October 24".

## Linux

### Creating screenshots with Logitech MX Mechanical Mini

Not long ago I've bought a Logitech MX Mechanical Mini. Typing feels good on it and it is quiet for being a mechanical keyboard. For whatever reason Logitech has decided not to include a native <kbd>Print</kbd> key, but a custom one with a camera symbol, invoking <kbd>Shift</kbd>+<kbd>Super</kbd>+<kbd>S</kbd> instead. This shortcut is calling the Snipping Tool on Windows. I wish they have added a Linux preset to the keyboard. Unfortunately it is also not possible to remap the key by yourself within the keyboard.

As I use my laptop sometimes with other (proper) keyboards as well, the only good solution I could think of is, to multiple assign the screenshot shortcut. Gnome doesn't allow this via the System settings, but by setting the configuration directly:

```bash
gsettings set org.gnome.shell.keybindings show-screenshot-ui "['Print', '<Shift><Super>S']"
```

## Tools

### Git and SSH: no mutual signature algorithm

Sometimes things go wrong and it did recently when I wanted to clone a git repository via SSH.

```txt
Cloning into 'project'...
git@scm.example.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Adding `GIT_SSH_COMMAND="ssh -v"` in front of the `git clone` command, lets make SSH more talkative about what is going on:

```bash
GIT_SSH_COMMAND="ssh -v" git clone git@scm.example:customer/project.git
```

In the logs I could spot the following message:

```txt
debug1: send_pubkey_test: no mutual signature algorithm
```

The reason for this is that `ssh-rsa` was disabled by default a while ago.[^1] By adding `PubkeyAcceptedKeyTypes +ssh-rsa` to your `~/.ssh/config` it can be reenabled.


[^1]: See https://www.openssh.com/txt/release-8.2
