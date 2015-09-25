---
layout: post
title: 最优化概览
keywords: ["最优化", "optimization"]
description: "最优化：概览"
categories: ["math", "machine learning", "optimization"]
tags: ["optimization"]
---

最优化问题的一般形式为

`\begin{equation}\label{eq:1}
\min \limits_x \quad f(x) \\
s.t. \quad x \in X
\end{equation}`

其中`$x \in R^n$`为决策变量，`$f(x)$`为目标函数，`$X \subset R^n$`为可行域（约束集）。

当`$X = R^n$`时，则最优化问题(`$\ref{eq:1}$`)称为无约束最优化问题

`\begin{equation}\label{eq:2}
\min \limits_{x \in R^n} \quad f(x)
\end{equation}`

而约束最优化问题则写为
`\begin{equation}\label{eq:3}
\min \limits_x \quad f(x) \\
s.t. \quad \begin{aligned}
h_i(x) = 0, i = 1, 2, ..., n \\
g_j(x) \leq 0, j = 1, 2, ..., m
\end{aligned}
\end{equation}`

其中`$h_i(x), g_j(x)$`为约束函数。

通常使用迭代法求解最优化问题的最优解，

其基本思想为：给定一个初始解`$x_0 \in R^n$`，按照某一迭代规则产生一系列点`$\{x_k\}$`。当`$\{x_k\}$`为有穷点列时，最后一个点就是最优化问题的最优解，当`$\{x_k\}$`为无穷点列时，若该点列收敛，则其极限点为最优解。

记`$x_k$`、`$d_k$`、`$\alpha_k$`分别为第`$k$`次迭代点、搜索方向、搜索步长，则第`$k$`次迭代为
`\begin{equation}\label{eq:4}
x_{k+1} = x_k + \alpha_k d_k
\end{equation}`

从这个迭代公式可以看出，不同的搜索方向`$d_k$`和不同的搜索步长`$\alpha_k$`可以构成不同的搜索算法。

其算法基本框架如下：
给定初始解`$x_0$`,
