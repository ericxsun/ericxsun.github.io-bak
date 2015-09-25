---
layout: post
title: matlab 矩阵索引
keywords: ["matlab", "矩阵索引"]
description: "Matlab矩阵索引"
categories: ["tech"]
tags: ["matlab"]
---

matlab中有大量的操作涉及到矩阵(数组)，比如对某个具体位置上元素的访问和赋值。这就是矩阵索引问题。

matlab中矩阵元素的索引有两类方法：

1.数字索引

数字索引又可分为：下标法（subscripts, 双下标）和索引法（index，单下标）。

2.逻辑索引

注：在matlab中矩阵元素是按列优先存储的，比如说：

{% highlight matlab %}
A = 
  1 2 3
  4 5 6
  7 8 9
{% endhighlight %}

那对应元素的subscript和index为：

{% highlight matlab %}
value subscript index
  1    (1, 1)     1
  4    (2, 1)     2
  7    (3, 1)     3
  2    (1, 2)     4
  5    (2, 2)     5
  8    (3, 2)     6
  3    (1, 3)     7
  6    (2, 3)     8
  9    (3, 3)     9
{% endhighlight %}

以上例子说明matlab为矩阵的每一个元素都分配了唯一的ID。

（待整理...）