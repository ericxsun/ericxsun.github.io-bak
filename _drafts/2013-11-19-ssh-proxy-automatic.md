---
layout: post
title: ssh proxy自动登录
keywords: ["ssh", "proxy"]
description: "shell脚本实现ssh proxy自动登录"
categories: ["tech"]
tags: ["ssh", "proxy"]
---

完全切换到linux已经很久了，使用代理长期以来都是直接在console里输入命令:

{% highlight bash %}
$ssh -C -N -D 127.0.0.1:7070 ssh2222@216.194.70.6
{% endhighlight %}

然后按提示输入密码，即可。

不过每次这样输入大麻烦了，今天闲着，试了下expect(用于自动化地执行linux环境下的命令行交互任务)。直接上代码(ssh_proxy.exp)：

{% highlight bash linenos %}
#!/usr/bin/expect

set timeout 30

set HOST 216.194.70.6
set PORT 7070
set USER ssh2222
set PWD  "password"

spawn ssh -C -N -D 127.0.0.1:$PORT $USER@$HOST

expect "password:"
send "$PWD\r"

interact

expect eof
{% endhighlight %}

代码第一行用于指定expect的路径，同shell脚本相同。如果系统中没有安装expect, 可用
{% highlight bash %} 
$yum install expect (Fedora/CentOS/RedHat) 
{% endhighlight %}
安装。接着5-8行输入4个参数，此处直接写死，当然可以手动输入。将相应代码修改如下：
{% highlight bash %}
set HOST [lindex $argv 0]
{% endhighlight %}
执行时：
{% highlight bash %}
$./ssh_proxy 216.194.70.6
{% endhighlight %}

第10行spawn代表本地终端执行命令，而12-13行的expect用于捕获终端的输出信息，然后send做出相应操作。interact 把控制权交给用户，脚本不再控制。代码末尾的expect eof与spawn对应，表示捕获终端输出信息的终止。

此仅是expect的一个简单利用，它还可以完成更为复杂的操作，实现自动化操作，以后再研究了。