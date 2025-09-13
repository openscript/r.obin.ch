---
title: GPD MicroPC 2 Arch Linux Setup
publishedAt: 2025-09-15T06:41:23.000Z
tags:
  - Linux
  - GPD MicroPC 2
  - Arch Linux
---

Since I was a child, small computers fascinated me. I remember playing with my dads Psion Revo. It fascinated me how much you could do with such a small device. A whole ecosystem of apps to explore, as well as programming it yourself or using the office tools that came with it.

![GPD MicroPC 2](./oqo.jpg)

About ten years later ultra mobile PCs (UMPCs) became a thing. I remember reading about one made by a company called OQO. It had a slide-out keyboard, ran Windows and was about 5 inch small. It looked cool, when McGee in the tv show NCIS used one. Oh, I wished to have one of those, but they were expensive and had to be imported from the US.

Fast forward another five ten years, I finally got my hands on an UMPC. A GPD MicroPC 2 arrived last week.

## Preparation

Of course I wanted to try it out as quickly as possible, so I start up the pre installed Windows 11. It was useful to update the firmware of the device. After extracting the product key, I plugged in my USB stick with Ventoy and a Arch Linux ISO. I booted into the Arch Linux live system by pressing (<kbd>FN</kbd> +) <kbd>F7</kbd> and started the installation.

The product key can be found in the registry at `Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\SoftwareProtectionPlatform` in the `BackupProductKeyDefault` entry.

## Installation

I followed more or less my notes from my [previous installations](/notes/tools/workstation). Accessing the installation via SSH was very handy, because the device is really quite small and typing so many commands on the tiny keyboard is not very comfortable.

Also it displayed everything 90 degrees rotated, which can be fixed with some kernel parameters, but I didn't bother for the installation.


