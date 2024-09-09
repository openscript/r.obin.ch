---
title: Handy bootable USB drives with Ventoy
publishedAt: 2024-09-09T06:55:37.838Z
tags:
  - Tools
  - Setup
cover:
  src: ./boot-drive.jpg
  alt: Samsung USB drive labeled with BOOT
---

[Ventoy](https://www.ventoy.net) helps to make system images like ISO bootable from a USB drive. Once you have Ventoy installed on a USB drive, it is as simple as copying ISO files to the mounted USB drive and you are ready to go.

## Installing on a USB drive

The tool offers graphical interfaces for Windows and Linux, as well as a CLI and a web interface. Individual packages can be downloaded from the download page.

Inside the extracted folder are several shell scripts, as well as binaries for several system architectures. With `uname -m` you can find out which architecture you are using. From Gnome Nautilus, the binaries can be executed by double-clicking.

![Ventoy user interface on Linux](./ventoy.png)

Ventoy usually detects inserted USB drives automatically. Make sure you select the correct one **as the installation will destroy the data on the drive.**

## Using the bootable USB drive

After having Ventoy successfully installed on the USB drive, you can just copy ISO (and a few other formats) to your USB drive. Plug in the USB drive and boot from USB. Sometimes you need to enable this feature in the BIOS first. Some devices also offer to press a key like <kbd>F12</kbd> during the first few seconds of booting to enter a menu, where you can select the boot device.

## Useful ISO images

I would say that a well-equipped bootable USB drive is a must for computer nerds away from home. In my opinion, the following images can be useful to bring along:

- **Repair and rescue systems**: Whether you are using ArchLinux, Windows or any other operating system, it is always a good idea to carry a copy of the installation media with you. If something goes horribly wrong and you can no longer boot, it can be a lifesaver.
  - ArchLinux: https://archlinux.org/download
  - Windows (Hiren's BootCD): https://www.hirensbootcd.org
- **Virus and malware control**: We've all been there. Your parents invite you over for a quiet Sunday lunch, and before coffee and dessert, Mum announces that her computer is behaving strangely. Usually this goes hand in hand with printer problems. So it's great to have a LiveCD with a bit of antivirus to be the hero of the day.
  - Avira Rescue System: https://www.avira.com/de/downloads#tab_a3_0
- **Backup and preservation**: If you need to backup or clone a whole disk https://clonezilla.org becomes useful.
- **Forensic, security testing and privacy**: You never know, when you need to investigate something.
  - Tails for privacy: https://tails.net
  - Kali for penetration testing: https://www.kali.org
