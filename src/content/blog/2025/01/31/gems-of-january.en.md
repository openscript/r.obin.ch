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

Sometimes you quickly want to test if your email server is working. This can be easily done with curl. First create an email file `email.txt` with the following content:

```txt
From: John Smith <r@example.com>
To: Joe Smith <r@example.com>
Subject: an example.com example email
Date: Mon, 28 Jan 2025 17:55:16

Dear Joe,
Welcome to this example email. What a lovely day.
```

For example, you can send this email with the following command:

```bash
curl --ssl-reqd smtps://example.com --mail-from r@example.com \
     --mail-rcpt r@example.com --upload-file email.txt \
     --user 'user:password'
```

This is also documented [here](https://everything.curl.dev/usingcurl/smtp.html).

### Forgejo/Gitea: Send email notifications only on mention

By default Forgejo/Gitea sends emails notifications on every action. This can be annoying and if there are many users it can also be a lot of emails.

To only send emails on mention, you can set the following configuration in the `app.ini`:

```ini
[admin]
DEFAULT_EMAIL_NOTIFICATIONS = onmention
```

To update existing users, you can run the following SQL query:

```sql
UPDATE public.user SET email_notifications_preference = 'onmention';
```

## Other

### SBB: Offered tickets are not always the cheapest option
