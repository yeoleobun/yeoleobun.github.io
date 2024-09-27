---
title: "斐波那契数列通项公式推导"
pubDatetime: 2022-07-30T17:05:00+08:00
description: "斐波那契数列通项公式推导"
featured: true
tags: [线性代数]
---

## 定义
斐波那契数列$\{f_n\}$：$f_0 = 0$， $f_1 = 1$， $f_n = f_{n-1} + f_{n-2}\;(n \ge 2)$。


## 线性映射
定义线性映射 $T:R^2 \to R^2$，$T(x,y) = (y,x + y)$。

**命题**：对于 $n \in N$，有 $T^n(0,1) = (f_n,f_{n+1})$ 。

**证明**：当 $n=0$ 时，$T^0(0,1) = Id(0,1) = (f_0,f_1)$。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当 $n>0$ 时，假设命题对 $n-1$ 成立，有：

$$
\begin{aligned}
T^n(0,1) &= T(T^{n-1}(0,1)) \\
&= T(f_{n-1},f_n) \\
&= (f_n,f_{n-1} + f_n) \\
&= (f_n,f_{n+1})
\end{aligned}
$$

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;命题对$n$也成立。

对于标准基 $(1,0),(0,1)$，线性映射 $T$ 的矩阵为 $\begin{pmatrix}0 &1 \\ 1 &1\end{pmatrix}$。注意到矩阵是对称的，\
依据谱定理，有规范正交基使得 $T$ 为对角矩阵。

## 对角化

设 $\lambda$ 为 $\begin{pmatrix}0 &1 \\ 1 &1\end{pmatrix}$ 的特征值，存在非零向量 $v$ 满足：

$$
\begin{aligned}
\begin{pmatrix}0 &1 \\ 1 &1\end{pmatrix} v &= \lambda v \\
\begin{pmatrix} -\lambda &1 \\ 1 & 1 - \lambda \end{pmatrix} v &= 0 \\
det\begin{pmatrix} -\lambda &1 \\ 1 & 1 - \lambda \end{pmatrix} &= 0 \\
\lambda^2 - \lambda - 1 &= 0 \\
\lambda &= \frac{1 \pm \sqrt{5}}{2}
\end{aligned}
$$

设两个特征值分别为 $\lambda_1 = \frac{1+\sqrt{5}}{2}，\lambda_2 = \frac{1-\sqrt{5}}{2}$。注意 $\lambda_1 + \lambda_2 = 1$ ，$\lambda_1  \lambda_2 = -1$。

又 $T(x,y) = (y,x+y) = \lambda(x,y) = (\lambda x,\lambda y)$，有 $y = \lambda x$。

分别取长度为1的特征向量$e_1 = \left(\frac{1}{\sqrt{1 + \lambda_1^2}}, \frac{\lambda_1}{\sqrt{1 + \lambda_1^2}} \right)$、$e_2 = \left(\frac{1}{\sqrt{1 + \lambda_2^2}},\frac{\lambda_2}{\sqrt{1 + \lambda_2^2}}\right)$，$e_1$ 和 $e_2$ 是正交的。

以特征值为对角线定义对角矩阵 $\Lambda = \begin{pmatrix} \lambda_1 & 0 \\ 0 & \lambda_2\end{pmatrix}$ ，特征向量为列向量定义矩阵 $S = \begin{pmatrix}\frac{1}{\sqrt{1 + \lambda_1^2}} & \frac{1}{\sqrt{1 + \lambda_2^2}} \\ \frac{\lambda_1}{\sqrt{1 + \lambda_1^2}} & \frac{\lambda_2}{\sqrt{1 + \lambda_2^2}} \end{pmatrix}$ ，
$S^{-1} = S^T = \begin{pmatrix}\frac{1}{\sqrt{1 + \lambda_1^2}} & \frac{\lambda_1}{\sqrt{1 + \lambda_1^2}} \\ \frac{1}{\sqrt{1 + \lambda_2^2}} & \frac{\lambda_2}{\sqrt{1 + \lambda_2^2}} \end{pmatrix}$。

于是$\mathcal{M}(T) = S \Lambda S^{-1}$，$\mathcal{M}(T)^n = S\Lambda^{n}S^{-1}$。

$$
\begin{aligned}
   \begin{pmatrix}f_n \\ f_{n+1}\end{pmatrix} &=
   \begin{pmatrix}
      \frac{1}{\sqrt{1 + \lambda_1^2}} & \frac{1}{\sqrt{1 + \lambda_2^2}} \\
      \frac{\lambda_1}{\sqrt{1 + \lambda_1^2}} & \frac{\lambda_2}{\sqrt{1 + \lambda_2^2}}
   \end{pmatrix}
   \begin{pmatrix} 
      \lambda_1 & 0 \\
      0 & \lambda_2
   \end{pmatrix}^n
   \begin{pmatrix}
      \frac{1}{\sqrt{1 + \lambda_1^2}} & \frac{\lambda_1}{\sqrt{1 + \lambda_1^2}} \\
      \frac{1}{\sqrt{1 + \lambda_2^2}} & \frac{\lambda_2}{\sqrt{1 + \lambda_2^2}}
   \end{pmatrix}
   \begin{pmatrix}0 \\ 1\end{pmatrix} \\
   f_n &=
   \begin{pmatrix}
      \frac{1}{\sqrt{1 + \lambda_1^2}} & \frac{1}{\sqrt{1 + \lambda_2^2}}
   \end{pmatrix}
   \begin{pmatrix}
      \lambda_1^n & 0 \\ 0 & \lambda_2^n\end{pmatrix}
   \begin{pmatrix}
      \frac{\lambda_1}{\sqrt{1 + \lambda_1^2}} \\
      \frac{\lambda_2}{\sqrt{1 + \lambda_2^2}} 
   \end{pmatrix} \\
   f_n &=
   \frac{\lambda_1}{1 + \lambda_1^2} \lambda_1^n + \frac{\lambda_2}{1+\lambda_2^2} \lambda_2^n \\
   f_n &= \frac{\lambda_1(1+\lambda_2^2)\lambda_1^n + \lambda_2(1 + \lambda_1^2)\lambda_2^n}{(1 + \lambda_1^2)(1 + \lambda_2^2)} \\
   f_n &= \frac{(\lambda_1-\lambda_2)\lambda_1^n + (\lambda_2 - \lambda_1)\lambda_2^n}{1 + \lambda_1^2 + \lambda_2^2 + \lambda_1^2\lambda_2^2}\\
   f_n &= \frac{\lambda_1 - \lambda_2}{1 + (\lambda_1 + \lambda_2)^2 - 2\lambda_1\lambda_2 + 1}(\lambda_1^n - \lambda_2^n) \\
   f_n &= \frac{\sqrt{5}}{5}(\lambda_1^n - \lambda_2^n)
\end{aligned}
$$