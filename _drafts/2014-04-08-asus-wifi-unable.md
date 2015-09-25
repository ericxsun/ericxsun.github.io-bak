---
layout: post
title: 笔记本无法打开WiFi
keywords: ["ASUS", "WIFI", "ACER WMI"]
description: "ASUS R409J因ACER WMI驱动导致无法在linux下使用WIFI"
categories: ["tech"]
tags: ["linux"]
---

新换了台"Asus R409J", 绕开UEFI的Secure boot安装了Fedora 20, 但装好了结果无线网络打不开.折腾好半天都没搞定.

不过中间成功搜索到了WiFi信号,但后来重启就再也打不开了.这类问题第一个想到的就是驱动问题,之前重来没遇到过这样的问题,所以一个下午都纠结在驱动问题上.试了网友的很多法子,依然不行.这样说我的问题就不是驱动的问题了, 中途lsmod |grep wmi出现好几个模块,有asus_wmi,acer_wmi,我就郁闷了我用的Asus,关Acer鸟事儿呀,果断卸掉rmmod acer_wmi,无线马上就可以用了.

永久性禁止acer_wmi:

{% highlight bash %}
$echo "blacklist acer_wmi" >> /etc/modprobe.d/blacklist-acer_wmi.conf
{% endhighlight %}

我晕啊,浪费我一个下午.

查看(linux man page)[modprobe.conf](http://linux.die.net/man/5/modprobe.conf)

modprobe.conf里有一个句"but there are cases where two or more modules both support the same devices, or a module invalidly claims to support a device: the blacklist keyword indicates that all of that particular module's internal aliases are to be ignored."

相关命令:

(显示当前装入的内核模块)

lsmod

(显示模块信息)

modinof module_name

(卸载模块)

rmmod module_name
