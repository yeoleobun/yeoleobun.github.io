---
title: "斐波那契数列"
date: "2022-07-30"
draft: false
tag: ["数学"]
math: true
---

## 定义
斐波那契数列$\{f_n\}$：$f_0 = 0$， $f_1 = 1$， $f_n = f_{n-1} + f_{n-2}$。


## 线性映射
定义线性映射 $T:R^2 \to R^2$，$T(x,y) = (y,x + y)$。

**命题：对于 $n \in N$，$T^n(0,1) = (f_n,f_{n+1})$**

归纳证明：

当$n=0$时，$T^0(0,1) = (0,1) = (f_0,f_1)$。

当$n>0$时，假设上式对 $n-1$ 成立，即 $T^{n-1}(0,1) = (f_{n-1},f_n)$ 。于是有$T^n(0,1) = T(T^{n-1}(0,1)) = T(f_{n-1},f_n) = (f_n,f_{n-1} + f_n) = (f_n,f_{n+1})$，命题对$n$也成立。$\square$

## 矩阵

对于标准基 $(1,0),(0,1)$，线性映射T的矩阵为 $\begin{pmatrix}0 &1 \\ 1 &1\end{pmatrix}$。因此 $\begin{pmatrix}0 &1 \\ 1 &1\end{pmatrix} ^n\begin{pmatrix} 0 \\ 1\end{pmatrix} = \begin{pmatrix} f_n \\ f_{n+1}\end{pmatrix}$ 。

注意到矩阵是对称的，因此T是自伴的，依据谱定理，有规范正交基使得T有对角矩阵。

## 对角化

首先计算 $\begin{pmatrix}0 &1 \\ 1 &1\end{pmatrix}$ 的特征值。假设$\lambda$为特征值，存在非零向量$v$使得：

$$
\begin{aligned}
\begin{pmatrix}0 &1 \\ 1 &1\end{pmatrix} v &= \lambda v \\
\begin{pmatrix} -\lambda &1 \\ 1 & 1 - \lambda \end{pmatrix} v &= 0 \\
det\begin{pmatrix} -\lambda &1 \\ 1 & 1 - \lambda \end{pmatrix} &= 0 \\
\lambda^2 - \lambda - 1 &= 0 \\
\lambda &= \frac{1 \pm \sqrt{5}}{2}
\end{aligned}
$$

令$\lambda_1 = \frac{1+\sqrt{5}}{2}，\lambda_2 = \frac{1-\sqrt{5}}{2}$，又$T(x,y) = (y,x+y) = \lambda(x,y) = (\lambda x,\lambda y)$。

分别取长度为1的特征向量$e_1 = (\frac{1}{\sqrt{1 + \lambda_1^2}},\frac{\lambda_1}{\sqrt{1 + \lambda_1^2}})$、$e_2 = (\frac{1}{\sqrt{1 + \lambda_2^2}},\frac{\lambda_2}{\sqrt{1 + \lambda_2^2}})$。

以特征值为对角线定义对角矩阵 $\Lambda = \begin{pmatrix} \lambda_1 & 0 \\ 0 & \lambda_2\end{pmatrix}$ ，特征向量为列向量定义矩阵 $S = \begin{pmatrix}\frac{1}{\sqrt{1 + \lambda_1^2}} & \frac{1}{\sqrt{1 + \lambda_2^2}} \\ \frac{\lambda_1}{\sqrt{1 + \lambda_1^2}} & \frac{\lambda_2}{\sqrt{1 + \lambda_2^2}} \end{pmatrix}$ ，
$S^{-1} = S^T = \begin{pmatrix}\frac{1}{\sqrt{1 + \lambda_1^2}} & \frac{\lambda_1}{\sqrt{1 + \lambda_1^2}} \\ \frac{1}{\sqrt{1 + \lambda_2^2}} & \frac{\lambda_2}{\sqrt{1 + \lambda_2^2}} \end{pmatrix}$。

于是$\mathcal{M}(T) = S \Lambda S^{-1}$，$\mathcal{M}(T^{n}) = S\Lambda^{n}S^{-1}$。

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
   f_n &= \frac{1}{\sqrt{5}}(\lambda_1^n - \lambda_2^n)
\end{aligned}
$$