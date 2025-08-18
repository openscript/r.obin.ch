---
title: Gems of August 25"
publishedAt: 2025-08-31T00:00:00.000Z
tags:
  - Gems of the Month
---

Long time no see, huh? Let's try to bring this habit back.

## Technology

### MacOS

#### Host names

Did you know that your Mac has three different host names? There is the `ComputerName`, that is the name you see in the Finder or AirDrop for example. Then you have the `LocalHostName`, which is used for Bonjour and other discovery services. And finally, there is the networking `HostName`, which is used for SSH and other network services. The `ComputerName` and `LocalHostName` can be set via the System Preferences, but the `HostName` can only be set via the command line. I like to set all three via the command line:

```bash
sudo scutil --set ComputerName "PearEatsApples"
sudo scutil --set HostName "PearEatsApples"
sudo scutil --set LocalHostName "PearEatsApples"
```

By the way, how do you choose your host names?

#### Greedy updates with `brew`

Some GUI apps like to update themselves. A few examples are Visual Studio Code, Chromium or AltTab. `brew` treats this apps differently than other apps. It doesn't update them with `brew upgrade --cask`, because `brew` expect them to update them independently via their own mechanism.

I usually like to update everything at once, so I found out that you can use `brew upgrade --cask --greedy` to update all casks, including those that usually update themselves.

### Podman

Recently when I had the problem, that when I triggered an update of an app hosted on Podman, sometimes it forgot the credentials to the container registry.

By default the `podman login` is stored in `/run` and with that, doesn't survive reboots. When you specify [`--authfile`](https://docs.podman.io/en/latest/markdown/podman-login.1.html#examples) the credentials are stored persistently. So when I logged in with `podman login --authfile ~/.config/containers/auth.json cr.gitlab.com` I didn't have the issue anymore.
