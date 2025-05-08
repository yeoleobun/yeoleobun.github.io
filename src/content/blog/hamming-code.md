---
title: "汉明码和线性"
pubDatetime: 2024-07-04T17:00:49+08:00
tags: [线性代数]
---

汉明码是一个**线性**纠错码。编码长度为 $n = 2^r - 1$、消息长度为 $k = n - r$ 的汉明码称为汉明 (n,k)。$r$ 是 $n$ 二进制位数，也是校验位的长度。

以汉明 (7,4) 为例，其中 $n = 7, k = 4, r = 3$，编码长度位 7 位，消息占 4 位，校验占 3 位。

假设有消息：$(d_1,d_2,d_3,d_4)$，对应编码：$(p_1,p_2,d_1,p_3,d_2,d_3,d_4)$ 。

其中 $p_1,p_2,p_3$ 为奇偶校验位。$p_i$ 校验第 $j$ 位当且仅当 $j$ 的二进制表示的第 $i$ 位为 1。如下图：

|      | $\color{red}p_1$ | $\color{red}p_2$ | $\color{green}d_1$ | $\color{red}p_3$ | $\color{green}d_2$ | $\color{green}d_3$ | $\color{green}d_4$ |
|------|-------|-------|-------|-------|-------|-------|-------|
| $p_1$ | $\checkmark$ || $\checkmark$ || $\checkmark$|| $\checkmark$|
| $p_2$ ||$\checkmark$|$\checkmark$|||$\checkmark$|$\checkmark$|
| $p_3$ ||||$\checkmark$|$\checkmark$|$\checkmark$|$\checkmark$|

例如 5 的二进制表示为 `101`，因此 $p_1$ 和 $p_3$ 都要校验第 5 位。

$p_1,p_2,p_3$ 校验的结果决定了错误出现的位置，如下图：

![链表](@assets/images/venn-1.png)

假设 $p_1,p_3$ 校验为 1，$p_2$ 为 0，对应图中的 $d_2$。而$d_2$ 是编码中的第5位。

## 编码和校验

编码矩阵 $\mathbf G^{\mathbf{T}}$ 和校验矩阵 $\mathbf H$ ：

$$
\mathbf G^\mathbf{T} = \begin{pmatrix} 
1 & 1 & 0 & 1 \\
1 & 0 & 1 & 1 \\
1 & 0 & 0 & 0 \\
0 & 1 & 1 & 1 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\   
0 & 0 & 0 & 1 \\   
\end{pmatrix}
\qquad \mathbf H = \begin{pmatrix}
1&0&1&0&1&0&1 \\
0&1&1&0&0&1&1 \\
0&0&0&1&1&1&1
\end{pmatrix}
$$

矩阵 $\mathbf{G}^\mathbf{T}$ 的 3,5,6,7 行是单位阵，1,2,4 行是校验位，和表中的绿色部分对应。\
矩阵 $\mathbf H$ 和校验表一致，第 $i$ 列正好是 $i$ 的二进制表示（低位在上）。

假设有消息 $m = (d_1,d_2,d_3,d_4)$，对应的编码 $w = \mathbf G ^ \mathbf T m$，全体编码是 $\mathbf G ^ \mathbf T$ 的像。校验结果 $\mathbf H w = \mathbf H \mathbf G ^ \mathbf Tw = 0 * w = 0$ ，全体编码包含于 $\mathbf H$ 的[核](https://en.wikipedia.org/wiki/Kernel_(linear_algebra)) 。

$\mathbf G ^ \mathbf T$ 列线性无关, $\mathbf{dim} \; \mathbf{range}(\mathbf G ^ \mathbf T) = 4$。$\mathbf H$ 的行线性无关，$\mathbf{dim} \; \mathbf{range}(\mathbf H) = 3$，$\mathbf{dim} \; \mathbf{ker}(\mathbf H) = 7 - \mathbf{dim} \; \mathbf{range}(\mathbf H) = 4$。两者维数相等，因此 $\mathbf H$ 的核等于 $\mathbf G ^ \mathbf T$ 的像。

这意味着在没有错误出现的情况下，有且仅有合法编码的校验结果是 0 。

## 汉明距离

对于任意两个编码 $w_1,w_2$ ，$w_1,w_2$ 的汉明距离（不同位数）等于 $w_1 \oplus w_2$ 的汉明重量（ 1 的数量），且 $\mathbf H (w_1 \oplus w_2) = \mathbf H w_1 \oplus \mathbf H w_2 = 0$ 。

* 假设最小汉明距离是 1，则 $\mathbf H$ 中有一列全为 0，不成立。
* 假设最小汉明距离是 2，则 $\mathbf H$ 中有两列相同，也不成立。

因此汉明(7,4)的最小汉明距离是 3，比如 $\mathbf G ^ \mathbf T$ 的第 1 列和 第 4 列的距离。


## 纠错

令 $e_i$ 是长度为 7 的列向量，第 i 行为 1，其余为 0 。$\mathbf{H} e_i$ 等于 i 的二进制表示（低位在上）。假设码字 $w$ 在第 $i$ 位出现错误，对应的编码为 $w \oplus e_i$。校验结果为：

$$
\mathbf H (w \oplus e_i) = \mathbf H w \oplus \mathbf H e_i = 0 \oplus \mathbf H e_i = \mathbf H e_i
$$

此时校验结果表示的正是错误出现的位置。




