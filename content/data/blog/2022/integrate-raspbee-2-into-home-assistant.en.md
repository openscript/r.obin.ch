---
title: Integrate RaspBee 2 into Home Assistant
publishedAt: 2022-08-02T18:54:05.335Z
tags:
  - Home Automation
  - RaspBee 2
  - Zigbee
  - Home Assistant
modifiedAt: 2022-08-03T07:14:42.219Z
draft: true
---

With the RaspBee 2 you get a complete and robust Zigbee Gateway. It can be easily mounted on normally sized Raspberry Pis and is featuring a Real Time Clock (RTC), which becomes really important, when the host is not connected to the Internet at all times.

In this blog post I describe how I set up RaspBee 2 on a Raspberry Pi 4 with Home Assistant.

# Enable UART

https://developers.home-assistant.io/docs/operating-system/debugging/