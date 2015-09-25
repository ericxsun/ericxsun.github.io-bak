---
layout: post
title: linux命令(持续更新)
keywords: ["linux命令"]
description: "linux命令使用实例"
categories: ["Technology"]
tags: ["Linux"]
series: ""
---

linux命令行下有很多工具，像sed, awk，sort等，能帮助我们快速进行数据预处理工作。本文记录了我在数据预处理过程所用到的linux命令。

*注：此文本不断更新*

- awk

	- 列 \$i, \$NF(最后一列), \$0(整行文本)

			$awk '{print $i}' filename

			$awk '{for(i=?;i<=?;i++){printf("%sxx", $i)}printf("\n")}' filename

		xx表示原文中的分隔符，若不写，则一行的各数据之间将没有分隔

			$awk '{for(i=?;i<NF;i++){printf("%sxx", $i)}printf("%s\n", $NF)}' filename

	- 行NR指定

			$awk 'NR=i{print}' filename

	- 格式化

			$awk 'print $1"\t"$2' filename (将第一二列间的分隔符改为\t)

	- 随机读取行

			$awk 'BEGIN{srand(); while(i<num1){k=int(rand()*num2); if(!(k in a)){a[k]++;i++}}}(NR in a)' filename

		其中num1是想要取的行数，num2是原数据文件的行数

	- 指定分隔符 -F

			$awk -F '\t' '{...}'

	- 正则替换 gsub

			$awk '{gsub(/RE/, "", $?); print $?}'

			$awk '{IGNORECASE=1 gsub(/RE/, "", $?); print $?}' 忽略大小写

	- 大小转换 toupper, tolower

			$awk '{print toupper($i)}'

	- 过滤f2中第j列出现(或不出现)在f1中第i列的数据

			$awk 'NR==FNR{a[$i];next}($j in a)' f1 f2

			$awk 'NR==FNR{a[$i];next}!($j in a)' f1 f2

	- 统计频率

			一维key：$k指以data的第k列为key
			$cat data |sort |awk '{a[$k]++}END{for(i in a){print i"\t"a[i]}}'

			二维key：$i, $j指以data的第i,j列为key
			$cat data |sort |awk '{a[$i,$j]++}END{for(k in a){split(k, a2, SUBSEP); print a2[1]"\t"a2[2]"\t"a[a2[1], a2[2]]}}'

	- 字符串长度 length

	- 按正则判断字符串

			全数字
			$cat data |awk --posix '{if($i ~ /^[0-9]+$/){print $0}}'

	- awk 与 shell 参数相互引用

			1. awk引用shell的参数: -v
			$awk -v a=${shell_param} -v b=${shell_param} '{print a b}'

			2. awk向shell传参:

- wc 统计文本行数

		$wc -l filename

- split 文件切割

	-l 按行切割（即切割指定行数）

	-d 切割后的文件名，后缀为数字

	-b 按大小bytes切, K, M, G, T....

		$split -b 2K data

- 四则运算

	- 精度控制 bc

			$echo "scale=3;121/12" |bc #scale为小数精度

	- 加减乘除

			y=$(( ${xx} + 1 )) ....

- 字符串处理

	- 切分

			$echo ab:cd:ef | rev | cut -d: -f1 | rev #-d后是分隔符，-f为分隔后的序列（反序的）

			ef

- 文件列合并

	- 简单列合并

			$paste x y > xy

			| x | y | xy  |
			| 1	| a | 1	a |
			| 2	| b | 2	b |
			| 3	|	| 3   |

	- 按key列合并

			$awk 'NR==FNR{a[$i]=$j;next}{if($k in a){print $k, a[$k], $m}}' x y > xy

			| 	x  |   y  |   xy    |
			| 1 x1 | 1 y1 | 1 x1 y1 |
			| 2 x2 | 3 y3 | 3 x3 y3 |
			| 3 x3 |      |			|
