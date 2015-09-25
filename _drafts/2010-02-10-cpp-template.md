---
layout: post
title: C++ 模板函数
keywords: ["C++", "模板函数"]
description: "C++模板函数声明定义"
categories: ["tech"]
tags: ["C++模板函数"]
---

模板函数与函数重载有些相似，但它们的作用是不同的，函数重载其内容可以完全不同，但模板函数其每个函数的主要内容是相同的。Essential-C++有这样的描述："一般而言，如果函数具备多种实现方式，我们可以将它重载，其每份实体提供的是相同的通用服务。如果我们希望程序代码的主体不变，仅仅改变其中用到的数据类型，可以通过函数模板达到目的。"

自己在写模板函数的时候，在头文件中声明了一个模板函数，而在源文件(.cpp)中定义这个模板函数，但是这样写会引发一个错误 : undefined reference to "…"，无法引用这个模板函数。

解决方案：（即声明了，就得立即定义。）

The problem is that a function template is not a function. It's a template for creating functions as needed.

So for a template to work, the compiler intuitively needs two pieces of information: The template itself, and the type that should be substituted into it. This is unlike a function call, which the compiler can generate as soon as it knows that the function exists. It doesn't need to know what the function does, just that it looks like
void func(int, float), or whatever its signature is.

When you declare the function template without defining it, you're only telling the compiler that such a template exists, but not what it looks like. That's not enough for the compiler to be able to instantiate it, it has to be able to see the full definition as well. The usual solution is to put the entire template in a header that can be included where needed.

When you declare the function template without defining it, you're only telling the compiler that such a template exists, but not what it looks like. That's not enough for the compiler to be able to instantiate it, it has to be able to see the full definition as well. The usual solution is to put the entire template in a header that can be included where needed.
