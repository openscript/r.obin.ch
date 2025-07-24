---
title: Set up iWay Fiber Internet with Nokia Bridge XS-010X-Q
publishedAt: 2025-01-31T00:00:00.000Z
tags:
  - OpenWRT
  - Router
  - LAN
draft: true
---

iWay is a Swiss Internet provider that offers fiber internet and gives you the freedom to choose your own router. Exactly what was missing for our office. I want to answer the following questions:

- How was the experience with iWay?
- How to activate the iWay fiber connection with the Nokia Bridge XS-010X-Q and a Linux laptop?
- How to set up the iWay fiber connection with OpenWRT?

## Experience with iWay

After I've ordered the service on a friday and on monday I've already been called by the company in charge to install the optical cables to the office. Despite the mentioned 12 weeks lead time, they already came by on wednesday for connecting our office.

Everything went smooth and about 100 meters of optical cables were laid by the evening.

The next morning I received an email, that everything is ready to activate the connection.

## Activation with Nokia Bridge XS-010X-Q

So I unpacked the Nokia Bridge XS-010X-Q and read through iWays instructions I've found here:

https://wiki.iway.ch/kb/wiki/Internet_Access/Fiber_-_FTTH/XGS-PON/XGS-PON_Aktivierung/XGS-PON_Aktivierung_-_Nokia_Bridge_XS-010X-Q

I did the following steps on my laptop running Arch Linux:

1. Connect all the cables.
1. Add a link upon the existing ethernet link and use the vlan tag id 10
   ```bash
   ip link add link enp1s0f0 name enp1s0f0.10 type vlan id 10
   ```
1. Retrieve an ip address (100.95.160.158) via DHCP
  ```bash
  dhcpcd enp1s0f0.10
  ```
1. Open a browser and be redirected to the catch all portal to activate the line
1. Enter the provided credentials
1. Wait 30 minutes

## Setup with OpenWRT

