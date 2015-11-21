---
layout: post
title: spark-DM-ML系列:环境配置
keywords: ["spark", "配置"]
description: "学习使用spark来进行数据分析挖掘。本文为基础环境配置"
categories: ["Machine Learning"]
tags: ["spark"]
---

本系列为运用python+spark进行数据分析挖掘，机器学习实验。

首先我们得有个可用的spark本地环境（spark集群配置不在本文讨论范围内，看官另行查找）。

### Dependencies

- Python (>= 2.7), pip
- java (>= 1.6)
- node.js
- apache-spark
- pyspark
- generate-pyspark-app (自动生成pyspark代码模板)

### PATH settings

{% highlight bash %}
$vi ~/.bashrc

export SPARK_HOME=?
export PYTHONPATH=$SPARK_HOME/python/:$SPARK_HOME/python/build:$SPARK_HOME/python/lib/py4j-$version-src.zip:$PYTHONPATH

source ~/.bashrc
{% endhighlight %}


### Error and Solution

- ImportError: No module named configparser

{% highlight bash %}

$sudo pip install configparser

{% endhighlight %}

- six version error, less than 1.5

{% highlight bash %}

$sudo pip install six --upgrade

$python -c "import six; print six.__version__"

{% endhighlight %}

如果six的版本始终不正确，则可以将使用的python对应的site-packages路径添加到PYTHONPATH里。

-----

Notes

- Generate template of pyspark code and run

{% highlight bash %}

$mkdir test && cd test
$yo pyspark-app

{% endhighlight %}

如下图所示:

> ![Alt text](https://raw.githubusercontent.com/followyourheart/followyourheart.github.io/master/images/2015-11-19-spark-dm-ml-series-env-config-1.png)

阅读REAME.md，根据需要作相应修改。

若在代码中有print，并希望在spark集群中执行时，看到结果，则修改bin/run:

{% highlight bash %}

project.add_job中的--master的value改为yarn-client

{% endhighlight %}
