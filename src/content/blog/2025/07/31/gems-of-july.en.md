---
title: Gems of July 25"
publishedAt: 2025-07-31T00:00:00.000Z
tags:
  - Gems of the Month
---

Long time no see, huh? Let's try to come back to this habit.

## Technology

### Podman

Recently when I had the problem, that when I triggered an update of an app hosted on Podman, sometimes it forgot the credentials to the container registry.

By default the `podman login` is stored in `/run` and with that, doesn't survive reboots. When you specify [`--authfile`](https://docs.podman.io/en/latest/markdown/podman-login.1.html#examples) the credentials are stored persistently. So when I logged in with `podman login --authfile ~/.config/containers/auth.json cr.gitlab.com` I didn't have the issue anymore.


