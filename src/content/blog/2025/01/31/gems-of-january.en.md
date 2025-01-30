---
title: Gems of January 25"
publishedAt: 2025-01-31T00:00:00.000Z
tags:
  - Gems of the Month
---

We are already at the end of January. Time flies. Here are my gems of the month.

## Technology

### Sign Git commits with GPG

Recently I wanted to use a GPG key to sign my git commits. I didn't know the steps
from the top of my head so I want to write it down here.

1. Generate a key
1. Import the key into your local keychain
1. Set the intendet key fingerprint to `user.signing` via `git config --global user.signing 7F8...`
1. Enable commit signing with `git config --global commit.gpgsign true`
1. Export the public key `gpg --output public.pgp --armor --export r@example.com`
1. Import the public key at Github, Gitlab, ...

### Send emails with Curl

## Other

### SBB: Offered tickets are not always the cheapest option
