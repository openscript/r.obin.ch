---
title: Connect to Ivanti Pulse Secure from Arch Linux
publishedAt: 2024-09-22T07:41:34.203Z
tags:
  - VPN
cover:
  src: ./vpn.jpg
  alt: Netgear switch with a key and an ethernet cable
---

University of Zurich uses Ivantis Pulse Secure in connection with Microsoft single sign on (SSO) as their VPN technology. I want to outline here, how to connect this VPN, when using Arch Linux.

## Summary

1. Install packages `paru -S pulse-secure gtkmm3 webkit2gtk`
1. Start service `systemctl start pulsesecure`
1. Start application via launcher `pulseui`
1. Add a connection
1. Connect and maybe install Chrome Embedded Framework (CEF)

## Installation

Luckily there is a suitable package in the Arch User Repository (AUR) called [`pulse-secure`](https://aur.archlinux.org/packages/pulse-secure). I'm using [Paru](https://github.com/Morganamilo/paru) as my AUR helper, so I installed the package with:

```bash
paru -S pulse-secure
```

If you want to use the Pulse user interface, you also need to install `gtkmm3` and `webkit2gtk` with:

```bash
paru -S gtkmm3 webkit2gtk
```

## Usage

As the package already prompted after the installation, the user interface `pulseUi` needs a service to be running.

```txt
==> NOTE: From 9.1r10.0, the client (pulseUi, pulselauncher) requires a service called pulsesecure.
==> NOTE: Run 'sudo systemctl start pulsesecure' before you run the client.
==> NOTE: Run 'sudo systemctl enable pulsesecure' to start the service automatically in boot.
```

I usually just start the service before I connect to the VPN using the user interface with `systemctl start pulsesecure`. After getting the service up and running I start `pulseui` via the application launcher.

![Pulse Secure UI](./vpn-ui.png)

Then I simply add a new connection, with the details provided by the organization and click the connect button.

![Pulse Secure UI: Add a connection](./vpn-connection.png)

If the VPN site requires you to log into a web based SSO, you are maybe prompted to install the Chrome Embedded Framework (CEF), which is used to display the SSO.

![Pulse Secure UI: Install CEF](./vpn-cef.png)
![Pulse Secure UI: Download CEF](./vpn-cef-downloading.png)

After installing CEF the SSO should open, where you can login using your personal credentials.

![Pulse Secure UI](./vpn-sso.png)

With the successful login, you should be connected to the VPN.

