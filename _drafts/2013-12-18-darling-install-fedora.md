---
layout: post
title: Darling installation on Fedora
keywords: ["Darling", "fedora"]
description: "尝试将Darling系统安装到Fedora上"
categories: ["tech"]
tags: ["darling", "fedora", "os"]
---

在中国不用QQ，好像有点儿离群啊。平时工作都在linux下，之前用了[龙井wineQQ2012](http://www.longene.org/forum/viewtopic.php?f=6&t=4700)，不过企鹅公司直接干掉2012,从此“你使用的QQ版本已退休”。[龙井wineQQ2013](http://www.longene.org/forum/viewtopic.php?f=6&t=4700)，只提供了deb包，并且alies成rpm包时始终都有错，故而最近都一直没法正常上QQ啊。

之前关注过一个类似于Wine的项目[Darling](http://darling.dolezel.info/en/Darling)，在linux上运行Mac程序，不过当前还不能直接安装DMG文件。官方只有ubuntu, Gentoo的配置教程，所在Fedora下配置，遇到了很多坑。配置过程记录如下。

1. 官方给出的Build方案

[移步Build](http://darling.dolezel.info/en/Build)

2. 本次实验的Build过程

1) Build Tools + Libraries
{% highlight bash %}
$sudo yum install clang gcc nasm libudev-devel openssl libbsd-devel
{% endhighlight %}

下载[libkqueue](http://sourceforge.net/projects/libkqueue/files/libkqueue-2.0/)源码，安装libkqueue

{% highlight bash %}
$sudo yum install libuuid libuuid-devel 
$sudo yum install libtool-ltdl libtool-ltdl-devel 
$sudo yum install ncurses-devel ncurses 
$sudo yum install libX11 libX11-devel 
$sudo yum install mesa-libGL-devel  mesa-libGL
{% endhighlight %}

修改/usr/include/unistd.h文件, 以解决问题：/usr/include/unistd.h:1147:35: error: __block attribute not allowed, only allowed on local variables。

{% highlight bash %}
$sudo cp /usr/include/unistd.h /usr/include/unistd-bak.h
$sudo sed -i -e 's/\*__block/\*__libc_block/g' /usr/include/unistd.h
{% endhighlight %}

2)GNUstep Make
{% highlight bash %}
$svn co http://svn.gna.org/svn/gnustep/tools/make/trunk/ gnustep-make
$cd gnustep-make
$CC=clang CXX=clang++ ./configure
$sudo make install
{% endhighlight %}

3)GNUstep Libobjc2
{% highlight bash %}
$svn co http://svn.gna.org/svn/gnustep/libs/libobjc2/trunk/ gnustep-libobjc2
$cd gnustep-libobjc2
$OBJCFLAGS=-fblocks CC=clang CXX=clang++ cmake .
$rm GNUmakefile
$make
$sudo make install
{% endhighlight %}

4)GNUstep Base
{% highlight bash %}
$svn co http://svn.gna.org/svn/gnustep/libs/base/trunk/ gnustep-base
$cd gnustep-base

$sudo yum install libffi libffi-devel 
$sudo yum install libxml2 libxml2-devel 
$sudo yum install libxslt libxslt-devel 
$sudo yum install gnutls gnutls-devel 
$sudo yum install libicu-devel

$OBJCFLAGS=-fblocks CC=clang CXX=clang++ ./configure
$make
$sudo make install GNUSTEP_MAKEFILES=/usr/local/share/GNUstep/Makefiles
{% endhighlight %}

5)GNUstep GUI
{% highlight bash %}
$svn co http://svn.gna.org/svn/gnustep/libs/gui/trunk/ gnustep-gui
$cd gnustep-gui

$sudo yum install libtiff libtiff-devel 
$sudo yum install cups cups-devel 
$sudo yum install libjpeg-turbo libjpeg-turbo-devel

$OBJCFLAGS=-fblocks CC=clang CXX=clang++ ./configure
$make
$sudo make install GNUSTEP_MAKEFILES=/usr/local/share/GNUstep/Makefiles
{% endhighlight %}

6)GNUstep CoreBase
{% highlight bash %}
$svn co http://svn.gna.org/svn/gnustep/libs/corebase/trunk/ gnustep-corebase
$cd gnustep-corebase
$OBJCFLAGS=-fblocks CC=clang CXX=clang++ ./configure
$make
$sudo make install GNUSTEP_MAKEFILES=/usr/local/share/GNUstep/Makefiles
{% endhighlight %}

7)Darling
{% highlight bash %}
$git clone --recursive git://github.com/LubosD/darling.git

$cd darling
$mkdir -p build/32

$cd build/32
$CC=clang CXX=clang++ cmake ../.. -DSUFFIX=32
$make
$make install

{% endhighlight %}

8)Running Applications
{% highlight bash %}
$dyldd executable(Mach-O file, not DMG)
{% endhighlight %}


目前Darling还无法直接安装DMG文件，将持续关注Darling的进展，尝试实现DMG install。