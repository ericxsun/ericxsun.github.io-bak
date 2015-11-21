---
layout: post
title: Hadoop Streaming Error And Solution When Using Python
keywords: ["hadoop", "streaming", "python"]
description: "hadoop streaming error when using python"
categories: ["Tech"]
tags: ["Hadoop Streaming", "Python"]
---

整体的解决思路:

1. 随机选一个分区的数据，以本地的方式运用python，以确认代码是否有问题。
2. 到集群上运行，查看map/reduce的日志，具体定位错误信息。

### 1 PipeMapRed.waitOutputThreads(): subprocess failed with code N

 - N=1: Operation not permitted

	1. subprocess failed with code 1表示程序返回的就是1。详细出错原因需结合map/reduce的具体错误和程序源码定位

 - N=2: No such file or directory

{% highlight bash %}
	$hadoop jar streaming.jar -files $path/mapper.py,$path/reducer.py -mapper 'python ${mapper}' -reducer 'python ${reducer}' -input inputDir -output outputDir
{% endhighlight %}


	1. 不能在-mapper内使用变量，将${mapper}换成相应的实际名称(e.g. mapper.py)即可。

	此说法错误，关键在于shell的单引号、双引号的问题，单引号里无法使用变量名，双引号则可以。

	改为-mapper "python ${mapper} -paramerters"即可。

	备注：若shell的最外层是单引号，则引号里的内容不做解析替换；若为双引号，引号里的内容做解析替换，双引号里的单引号是被当作一般字符处理。

	2. -files里的文件找不到

 - N=137

    1. map或reduce程序超出平台内存限制被limit杀掉，一般的平台都会有一个默认内存限制，例如配置内存限制为800MB（137-128=9, 对应信号为SIGKILL）

 - N=139

    1. 代码出core了。

 - N=141

    1. 因管道异常出错(141-128=13， 信号13代表着SIGPIPE错误，即管道错误)根本原因还是程序异常退出导致。

 - N=143

    1. 因管道异常出错(143-128=15， 信号13代表着SIGPIPE错误，即管道错误)根本原因还是程序异常退出导致。

 - N=255

    1. map或reduce异常退出返回值-1。

### 2 java.io.IOException: Broken pipe

{% highlight bash %}
	Error: java.io.IOException: Broken pipe
		at java.io.FileOutputStream.writeBytes(Native Method)
		at java.io.FileOutputStream.write(FileOutputStream.java:
{% endhighlight %}

	可能数据有问题

### 3 java.io.IOException: Stream closed
{% highlight bash %}
	Error: java.io.IOException: Stream closed
		at java.lang.ProcessBuilder$NullOutputStream.write(ProcessBuilder.java:434)
		at java.io.OutputStream.write(OutputStream.java:116)
{% endhighlight %}

	python 里的not in会导致这个问题（目前是在参数合法性检测里使用not in，导致了些错误）
