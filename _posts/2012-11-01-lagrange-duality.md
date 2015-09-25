---
layout: post
title: 拉格朗日对偶问题
keywords: ["最优化", "optimization", "拉格朗日", "对偶问题"]
description: "最优化: 拉格朗日对偶问题"
categories: ["Machine Learning"]
tags: ["Optimization"]
series: "Machine Learning and Optimization"
---

最近在看机器学习方面的资料，看到SVM这一部分的时候，总感觉有点儿不清不楚的，帮主的这篇[支持向量机通俗导论(理解SVM的三层境界)](http://blog.csdn.net/v_july_v/article/details/7624837)写得非常明白，不过有个地方，我怎么看都不明白 **对偶问题** 。查些了好些最优化的资料，亲自推倒了相关公式，基本明白了这个问题。俗话说的好："好记性，不如烂笔头"，还是记录下来吧。


各位看官，有任何问题，请不吝赐教。谢谢。


通常我们求解的最优化问题有以下三类：

1.无约束:

>>`$\min \limits_x \quad f(x)$`

2.等式约束

>>`$\min \limits_x \quad f(x) \\
s.t. \quad h_j(x)=0, j=1, 2, ..., m$`

3.不等式约束

>>`$\min \limits_x \quad f(x) \\
s.t.\quad \begin{aligned}
h_j(x)=0, j=1,2,..., m \\
g_i(x)\leq 0, i=1,2,..., n
\end{aligned}$`

对于第1类优化问题，常用的方法就[Fermat引理](http://zh.wikipedia.org/wiki/%E8%B4%B9%E9%A9%AC%E5%BC%95%E7%90%86)，即`$f(x)$`对`$x$`求导数，并令其为0，可求得极值点（最优解候选），然后验证即可。如果`$f(x)$`是[凸函数](http://zh.wikipedia.org/zh-cn/%E5%87%B8%E5%87%BD%E6%95%B0)，可保证如此求得的是最优解。

第2类问题，通常的做法是用拉格朗日乘子法(Lagrange Multiplier)求解。

下面来分析一下第3类问题。
定义示性函数：`$I_-(z)$`, `$I_o(z)$`

>>`$I_-(z) = \left\{ \begin{array}{ll}
0 & \quad \mbox{$z \leq 0$}\\
+\infty & \quad \mbox{$z > 0$}
\end{array} \right.$`

>>`$I_0(z) = \left\{ \begin{array}{ll}
0 & \quad \mbox{$z = 0$}\\
+\infty & \quad \mbox{$z \neq 0$}
\end{array} \right.$`

那么原问题（不等式约束问题）与如下无约束问题是等价的。

>>`$\min \limits_x \quad L(x)$`

其中`$L(x) = f(x) + \sum_i I_-[g_i(x)] + \sum_j I_o[h_j(x)]$`。

如何理解这个等价呢？假设`$g_i(\bar{x}) > 0$`, `$h_j(\bar{x}) \neq 0$`, 即`$\bar{x}$`违反了`$\leq 0$`和`$=0$`约束， 那么`$I_-[g_i(\bar{x})] = +\infty$`, `$I_o[h_j(\bar{x})] = +\infty$`, ``$L(\bar{x}) \to +\infty$`, 在`$\bar{x}$`处，不可能使得原问题取得最小值。而当`$x: \ni g_i(x) \leq 0, h_j(x) = 0$`时，`$L(x) = f(x)$`。故:

>>`$L(x) = \left\{ \begin{array}{ll}
f(x) & \quad \mbox{$g_i(x) \leq 0, h_j(x) = 0$}\\
+\infty & \quad \mbox{otherwise}
\end{array} \right.$`

也就说`$I_-[g_i(x)]$`是对违反`$\leq 0$`的`$x$`的`$+\infty$`惩罚，而`$I_o[h_j(x)]$`是对违反`$=0$`的`$x$`的`$+\infty$`惩罚，对于没有违反约束条件的$x$，是没有任何作用的。故而此问题和原问题是等价的。

如果我们用`$\sum_i \alpha_i g_i(x)$`代替`$\sum_i I_-[g_i(x)]$`，`$\sum_j \beta_j h_j(x)$`代替`$\sum_j I_o[h_j(x)]$`作为惩罚项，显然要求`$\alpha_i \geq 0$`，否则对于最小化问题是不能起到惩罚作用的。那么`$L(x, \alpha, \beta) = f(x) + \sum_i \alpha_i g_i(x) + \sum_j \beta_j h_j(x)$`。当x满足约束时，即`$g_i(x) \leq 0, h_j(x) = 0$时，$L(x, \alpha, \beta) = f(x) + \sum_i \alpha_i g_i(x) \leq f(x)$`，当x不满足约束条件时，只要令对应系数`$\alpha_i=+\infty, \beta_j=+\infty$`，即可施加惩罚。所以：

>>`$\max \limits_{\alpha, \beta: \alpha \geq 0}L(x, \alpha, \beta) \\
= \max \limits_{\alpha, \beta: \alpha \geq 0}{f(x) + \sum_i{\alpha_i g_i(x)} + \sum_j{\beta_j h_j(x)}} \\
=\left\{ \begin{array}{ll}
f(x) & \quad \mbox{$g_i(x) \leq 0, h_j(x) = 0$}\\
+\infty & \quad \mbox{otherwise}
\end{array}\right.$`

重述不等式约束极值和它的两个等价问题，如下：

1.	>>`$\min \limits_x \quad f(x) \\
s.t.\quad \begin{align*}
h_j(x)=0, j=1,2,..., m \\
g_i(x)\leq 0, i=1,2,..., n
\end{align*}$`

2.	>>`$\min \limits_x \quad L(x) = f(x) + \sum_i I_-[g_i(x)] + \sum_j I_o[h_j(x)]$`

3.	>>`$\min \limits_x \max \limits_{\alpha,\beta: \alpha \geq 0} \quad L(x, \alpha, \beta) = f(x) + \sum_i{\alpha_i g_i(x)} + \sum_j{\beta_j h_j(x)}$`

以上问题，我们可以用任何现成的优化包进行求解。

很明显最大值中的最小值始终不小于最小值中的最大值，即`$min\, max\, f(x) \geq max\, min\, f(x)$`，所以有：
>>`$\min \limits_x \max \limits_{\alpha, \beta: \alpha \geq 0} \, L(x, \alpha, \beta) \geq \max \limits_{\alpha, \beta: \alpha \geq 0} \min \limits_x \, L(x, \alpha, \beta)$`

至此，我们得到了原问题的lagrange对偶问题:

>>`$\max \limits_{\alpha, \beta: \alpha \geq 0} \quad \theta(\alpha, \beta)$`

其中`$\theta(\alpha, \beta) = \min \limits_x \quad f(x) + \sum_i{\alpha_i g_i(x)} + \sum_j{\beta_j h_j(x)}$`, `$\alpha$`称为对偶变量。

假设`$x^*$`为原问题的最优解，`$p^*$`为最优值，即`$p^*=f(x^*), g(x^*) \leq 0, h(x^*) = 0$`，则有：

>>`$\begin{align}
\theta(\alpha, \beta)  & = \min \limits_x \quad f(x) + \sum_i{\alpha_i g_i(x)} + \sum_j{\beta_j h_j(x)} \\
& \leq f(x^*) + \sum_i{\alpha_i g_i(x^*)} + \sum_j{\beta_j h_j(x^*)} \\
& = f(x^*) + \sum_i{\alpha_i g_i(x^*)} \\
& \leq f(x^*) \\
& = p^*
\end{align}$`

另设`$\alpha^*,\beta^*$`是对偶问题的最优解，`$d^*$`为最优值，即`$d^* = \theta(\alpha^*, \beta^*)$`，则有`$d^* \leq p^*$`，而`$\Delta = p^* - d^* \geq 0$`称为对偶间隙。如果`$\Delta = 0$`,(至于何时有`$\Delta = 0$`，[请移步](http://en.wikipedia.org/wiki/Karush%E2%80%93Kuhn%E2%80%93Tucker_conditions))，则有：

>>`$\begin{align}
d^* & = \theta(\alpha^*, \beta^*) \\
& = \min \limits_x \quad f(x) + \sum_i \alpha^* g_i(x) + \sum_j \beta^* h_j(x) \\
& \stackrel{\color{Red}A}{=} f(x^*) + \sum_i \alpha^* g_i(x^*) + \sum_j \beta^* h_j(x^*) \\
& \stackrel{\color{Red}B}{=} f(x^*) \\
& = p^*
\end{align}$`

上式中

`$\color{Red}A$`：`$x^*$`是使得`$L(x, \alpha^*, \beta^*) = f(x) + \sum_i \alpha^* g_i(x) + \sum_j \beta^* h_j(x)$`取得最小值的点。

`$\color{Red}B$`：`$\sum_i \alpha_i g_i(x) = 0$`，由此可以得出当`$\alpha_i^* > 0$`时，`$g_i(x^*) = 0$`，而`$g_i(x^*) < 0$`时，`$\alpha_i^* = 0$`。

>>`$g_i(x^*) < 0$`：`$x^*$`在可行域内部，不等式约束不起作用，即`$\alpha_i^* = 0$`;

>>`$\alpha_i^* > 0$`：`$g_i(x^*) = 0$`，`$x^*$`在可行域边界上，不等式约束起作用

故只有起作用的不等式约束才有不为零的对偶变量(`$\alpha$`)。
