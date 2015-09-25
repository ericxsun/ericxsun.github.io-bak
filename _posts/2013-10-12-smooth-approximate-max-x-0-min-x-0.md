---
layout: post
title: Smooth Approximation for max(0, x) and min(0, x)
keywords: ["approximation", "max", "min"]
description: "对max(0,x)/min(0,x)在零点不过导的一种平滑方法"
categories: ["Machine Learning"]
tags: ["Approximation"]
series: "Tech"
---

今天在群里，师兄问到`$f(x) = max(0, x)$`, 在`$x=0$`处不可导，怎么办呢？

作为Neural Network中的激活函数，不可导就不好办了。

那怎么来光滑化这个函数呢？也就是找一个处处可导的函数来逼近函数`$f(x)=max(0, x)$`。

记得在上数学分析这门课的时候，有提过绝对值函数`$f(x)=|x|$`，由于在`$x=0$`处不可导，而缺少了很多可导函数的特性。依稀记得老师说过，可以如下方式光滑化：

>>`$f(x)=\sqrt{x^2+\epsilon^2}, \epsilon > 0$`

而此函数在`$x$`的定义域内都是可导的。

考虑到

>>`$0 \leq \sqrt{x^2+\epsilon^2}-|x| = \frac{\epsilon^2}{\sqrt{x^2+\epsilon^2}+|x|} \leq \frac{\epsilon^2}{\sqrt{x^2+\epsilon^2}} \leq \epsilon$`

所以只要`$\epsilon$`很小，那么用`$\sqrt{x^2+\epsilon^2}$`代替`$|x|$`所产生的误差就很小(`$\leq \epsilon$`)。

*那`$max(0, x)$`怎么来逼近呢？*

考虑到

1. 当`$x \geq 0$`时，`$max(0, x) = x = \frac{|x|+x}{2}$`,

2. 当`$x < 0$`时，`$max(0, x) = 0 = \frac{-x+x}{2} = \frac{|x|+x}{2}$`

就得到了`$max(0, x) = \frac{|x| + x}{2}$`。再用到上面提到的`$|x| \approx \sqrt{x^2+\epsilon^2}$`，我们就可以得到`$max(0, x) \approx \frac{\sqrt{x^2+\epsilon^2}+x}{2}$`。

那用`$\frac{\sqrt{x^2+\epsilon^2}+x}{2}$`来近似代替`$max(0, x)$`所产生的误差是多少呢？

1.当`$x \geq 0$`时, `$max(0, x) = x$`

>>`$0 \leq \frac{\sqrt{x^2+\epsilon^2}+x}{2} - max(0, x) = \frac{\sqrt{x^2+\epsilon^2}-x}{2} \leq \frac{\epsilon^2}{2(\sqrt{x^2+\epsilon^2}+x)} \leq \frac{\epsilon}{2}$`

2.当`$x < 0$`时, `$max(0, x) = 0$`

>>`$0 \leq \frac{\sqrt{x^2+\epsilon^2}+x}{2} - max(0, x) = \frac{\sqrt{x^2+\epsilon^2}-\sqrt{x^2}}{2} \leq \frac{\epsilon^2}{2(\sqrt{x^2+\epsilon^2}+\sqrt{x^2})} \leq \frac{\epsilon}{2}$`

所以逼近误差的上限为`$\frac{\epsilon}{2}$`。


因为`$min(0, x) = -max(0, -x)$`，所以，可根据以上提出`$min(0, x)$`的逼近函数。

-----

备注

rectifier， sigmoid, hyperbolic tangent都可以作为激活函数，但是"while logistic sigmoid neurons are more biologically plausible than hyperbolic tangent neurons, the latter work better for training multi-player neural networks."和"This paper shows that rectifying neurons are an even better model of biological neurons and yield equal or better performance than hyperbolic tangent networks" declared in [Deep Sparse Rectifier Neural Networks by Xavier Glorot, Antoine Bordes & Yoshua Bengio](http://eprints.pascal-network.org/archive/00008596/01/glorot11a.pdf)

@kevin师兄：rectifier的max(0,x) 自动有了sparse的特性了， 而大脑皮层中真正的的确是很sparse。
