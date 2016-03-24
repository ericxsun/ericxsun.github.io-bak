---
layout: post
title: Jupyter Notebook
keywords: ["jupyter", "ipython"]
description: "Configuration for Jupyter notebook"
categories: ["Tool"]
tags: ["tools"]
---

作为一个交互式的数据分析和科学计算的 web 应用，[Jupyter Notebook](http://jupyter.readthedocs.org/en/latest/index.html) 方便了数据分析，并且能够完整记录下对一个数据挖掘项目的完整过程，包括代码，数据，分析结果等，以便于在未来能够 reproduce 结果。

本文为使用 Jupyter Notebook 进行数据分析系列的前奏：工具安装。工欲善其事，必先利其器。

- 系统配置

Mac OS 10.10.4

Python 2.7.6

[pip](https://pip.pypa.io/en/latest/installing/)

- 安装 Jupyter 

{% highlight bash %}
pip install -U jupyter  // using pip3 for Python3.x

cd $path_proj
jupyter notebook --port xxxx --no-browser
{% endhighlight %}

浏览器访问 http://hostname:port

到此，就可以在 Jupyter Notebook 里使用 python 进行交互式的分析。


- 安装其他 [kernels](https://github.com/ipython/ipython/wiki/IPython-kernels-for-other-languages)

[Bash](https://github.com/takluyver/bash_kernel)
{% highlight bash %}
pip install bash_kernel
python -m bash_kernel.install
{% endhighlight %}

[Scala](https://github.com/mattpap/IScala)


[Matlab](https://github.com/calysto/matlab_kernel)

{% highlight bash %}
pip install numpy
pip install matlab_kernel
python -m matlab_kernel.install
{% endhighlight %}


