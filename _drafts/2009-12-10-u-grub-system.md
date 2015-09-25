---
layout: post
title: 制作U盘系统工具盘
keywords: ["系统工具", "U盘引导"]
description: "制作U盘系统工具盘"
categories: ["tech"]
tags: ["grub", "linux", "os"]
---
{% include JB/setup %}

准备材料：HPUSBFW 、grub4dos(含grubinst_gui.exe)、WINPE.iso

1、制作可引导的U盘


1）用HP U盘格式化工具(HPUSBFW)格式化U盘，建立MBR区，使其具备可引导功能;


2）安装GRLDR到U盘的MBR区

运行grubinst_gui.exe将GRLDR的启动代码写入到MBR;

3）将grub4dos下的grldr, grub.exe, menu.lst拷贝到U盘根目录

到此，可引导的U盘就制作完成。

2、配置Fedora安装程序(其它系统类似)

1）将Fedora.iso文件中的isolinux, images目录解压到U盘/LINUX/fedora/, sdb2:/fedora/目录下

2）将Fedora.iso拷贝到U盘sdb2:/fedora/目录下

3）修改menu.lst

{% highlight bash %}
color black/cyan yellow/cyan
timeout 30

title [01] Run WinPE
find --set-root /WINPE/WINPE.ISO
map --mem /WINPE/WINPE.ISO (0xff) || map /WINPE/WINPE.ISO (0xff)
map --hook
chainloader (0xff)

title [02] Install Fedora  DVD
find --set-root /LINUX/fedora/isolinux/vmlinuz
kernel /LINUX/fedora/isolinux/vmlinuz repo=hd:/dev/sdb2:/fedora/
initrd /LINUX/fedora/isolinux/initrd.img
boot

title [04] Install CentOS-64bit
find --set-root /LINUX/centos/isolinux/vmlinuz
kernel /LINUX/centos/isolinux/vmlinuz repo=hd:/dev/sdb2:/centos/
initrd /LINUX/centos/isolinux/initrd.img
boot

title [05] Install ubuntu
find --set-root /LINUX/ubuntu/ubuntu.iso
kernel /LINUX/ubuntu/vmlinuz boot=casper iso-scan/filename=hd:/dev/sdb2:/ubuntu/ubuntu.iso quiet splash ro locale=zh_CN.UTF-8
initrd /LINUX/ubuntu/initrd.lz
boot

title [06] commandline
commandline

title [07] reboot
reboot

title [08] halt
halt
{% endhighlight %}

menu.lst中的repo=hd:/dev/sdb2:/为ISO文件的目录位置， sdb表示U盘

3、重启电脑，从U盘引导，即可。
