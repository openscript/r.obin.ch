---
title: My workstation setup
publishedAt: '2021-11-13T09:56:50.506Z'
tags:
  - ArchLinux
featured: workstation.jpeg
---

1. Download install image from https://archlinux.org/download/
1. Copy image to a USB drive with https://www.ventoy.net prepared
1. Boot the image from the USB drive
1. Connect the device to the internet
1. Change keyboard layout with `loadkeys de_CH-latin1`

By the way, it's possible to connect from another computer to the live environment (livecd) via SSH.

1. Enable ssh service via `systemctl start sshd.service`
1. Reset root password with `passwd`
1. Find the ip address with `ip addr show`
1. Connect from another computer with `ssh root@[ip-address]`

1. Update system clock with `timedatectl set-ntp true`
1. Find installed block devices with `fdisk -l`
1. If there is a EFI partition with at least 200 MiB it can be used for `/boot` otherwise the size should be increased or a separate `/boot` partition created.
1. Partition the block device with `fdisk /dev/nvme0n1` to

   ```
   Device Start End Sectors Size Type
   /dev/nvme0n1p1 2048 1671167 1669120 815M EFI System
   /dev/nvme0n1p2 1671168 4000797326 3999126159 1.9T Linux filesystem
   ```

1. Encrypt system partition with `cryptsetup luksFormat /dev/nvme0n1p2`

   ```
   WARNING!
   ========
   This will overwrite data on /dev/nvme0n1p2 irrevocably.

   Are you sure? (Type 'yes' in capital letters): YES
   Enter passphrase for /dev/nvme0n1p2:
   Verify passphrase:
   cryptsetup luksFormat /dev/nvme0n1p2  18.01s user 0.77s system 53% cpu 35.251 total
   ```

1. Mount encrypted partition to `cryptlvm` with `cryptsetup open /dev/nvme0n1p2 cryptlvm`
1. Create a physical volume on top of the LUKS container with `pvcreate /dev/mapper/cryptlvm`
1. Create a volume group with the previously create physical volume with `vgcreate systemcryptlvm /dev/mapper/cryptlvm`
1. Create logical volumes on the volume group:

   ```
   lvcreate -L 8G systemcryptlvm -n swap
   lvcreate -L 500G systemcryptlvm -n root
   lvcreate -l 100%FREE systemcryptlvm -n home
   ```

1. Format filesystem on each logical volume:

   ```
   mkfs.btrfs /dev/systemcryptlvm/root
   mkfs.btrfs /dev/systemcryptlvm/home
   mkswap /dev/systemcryptlvm/swap
   ```

1. Mount filesystems:

   ```
   mount /dev/systemcryptlvm/root /mnt
   mkdir /mnt/home
   mount /dev/systemcryptlvm/home /mnt/home
   swapon /dev/systemcryptlvm/swap
   ```

1. Mount boot partition (https://wiki.archlinux.org/title/Dm-crypt/Encrypting_an_entire_system#Preparing_the_boot_partition_2):

   ```
   mkdir /mnt/boot
   mount /dev/nvme0n1p1 /mnt/boot
   ```

1. Install base system with `pacstrap /mnt base linux linux-firmware`
1. Generate an fstab file `genfstab -U /mnt >> /mnt/etc/fstab`
1. Install `lvm2`, `vim` and `btrfs-progs` with `pacman -S lvm2 vim btrfs-progs`
1. Update hooks in `mkinitcpio.conf` to `HOOKS=(base udev autodetect keyboard keymap consolefont modconf block encrypt lvm2 filesystems fsck)`
1. Set time zone ln -sf /usr/share/zoneinfo/Europe/Zurich /etc/localtime
1. Set hardware clock with `hwclock --systohc`
1. Uncomment locale `en_US.UTF-8 UTF-8` und `de_CH.UTF-8 UTF-8` in `/etc/locale.gen`
1. Generate locales with `locale-gen`
1. Set locale in `/etc/locale.conf` to `LANG=en_US.UTF-8`
1. Set keymap in `/etc/vconsole.conf` to

   ```
   KEYMAP=sg
   FONT=eurlatgr
   ```

   - All locales with `localectl list-keymaps`
   - All fonts with `ls -l /usr/share/kbd/consolefonts/ | grep -i ".psfu.gz"`

1. Set x11 keymap with `localectl --no-convert set-x11-keymap ch`
1. Set hostename in `/etc/hostname`
1. Create new `initramfs` with `mkinitcpio -P`
1. Set root password with `passwd`

## Boot manager

1. Install `grub` and `efibootmgr` packages with `pacman -S grub efibootmgr`
1. Install bootloader with `grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB`
1. Add `GRUB_DISABLE_OS_PROBER=false` at the end of `/etc/default/grub` to prevent `Warning: os-prober will not be executed to detect other bootable partition` otherwise install package `os-prober`.
1. Get UUID of cryptdevice with `blkid | grep crypto`
1. Change `GRUB_CMDLINE_LINUX="cryptdevice=UUID=[UUID]:cryptlvm root=/dev/systemcryptlvm/root`"
1. Generate GRUB configuration `grub-mkconfig -o /boot/grub/grub.cfg`

## DHCP client setup

1. Install `dhcpcd` via `pacman -S dhcpcd`.
1. Enable service with `systemctl enable dhcpcd

## Reboot to system

1. Logout <kbd>CTRL</kbd> + <kbd>D</kbd>
1. Unmount `umount -R /mnt`
1. Restart `reboot`

## Microcode

1. Add microcode package with `pacman -S intel-ucode`
1. Regenerate GRUB configuration `grub-mkconfig -o /boot/grub/grub.cfg`

## User management

1. Add a user `useradd -m robin`
1. Set password `passwd robin`
1. Add sudo package `pacman -S sudo`
1. Edit sudoers file with `EDITOR=vim visudo`
1. Uncomment that members of group `sudo` can execute any command
1. Add group sudo with `groupadd sudo`
1. Add user to group sudo `gpasswd -a robin sudo`

## Graphical User Interface

1. Install Gnome with `pacman -S gnome`
1. Enable `gdm` with `systemctl enable gdm`
1. Important settings:
   - Fast cursor speed
   - Tab to click for touch pad
   - Automatic login

## Networking

1. Add network manager package `pacman -S networkmanager`
1. Enable network manager `systemctl enable NetworkManager.service`

## AUR helper

1. Install build tools `pacman -S --needed base-devel git`
1. Clone paru `git clone https://aur.archlinux.org/paru.git`
1. Build paru `cd paru && makepkg -si`

## Tools

1. Install Firefox (Browser) `paru -S firefox`
1. Install Visual Studio Code (Editor) `paru -S visual-studio-code-bin`
1. Install KeepassXC (Password manager) `paru -S keepassxc`
