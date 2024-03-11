---
title: "斐波那契数列"
date: 2022-07-30T17:12:13+08:00
draft: false
---

## 斐波那契序列$\\{f_n\\}$

$$ 
\begin{align}
f_0 &= 0 \newline
f_1 &= 1 \newline
f_n &= f_{n-2} + f_{n-1} \quad(n \ge 2)
\end{align}
$$

## 线性映射
定义线性映射 $T:R^2 \to R^2$，$T(x,y) = (y,x + y)$。

**命题：对于 $n \in N^+$，$T^n(0,1) = (f_n,f_{n+1})$**

归纳证明：

当 $n=0$ 时，$T^0(0,1) = (0,1) = (f_0,f_1)$。

当 $n>0$ 时，假设上式对 $n-1$ 成立，即 $T^{n-1}(0,1) = (f_{n-1},f_n)$ 。

$T^n(0,1) = T(T^{n-1}(0,1)) = T(f_{n-1},f_n) = (f_n,f_{n-1} + f_n) = (f_n,f_{n+1})$，对 n 也成立。$\square$

## 矩阵

对于标准基 $(1,0),(0,1)$，T的矩阵为 $\begin{pmatrix}0 &1 \newline 1 &1\end{pmatrix}$。因此 $\begin{pmatrix}0 &1 \newline 1 &1\end{pmatrix} ^n\begin{pmatrix} 0 \newline 1\end{pmatrix} = \begin{pmatrix} f_n \newline f_{n+1}\end{pmatrix}$ 。

## 对角化

首先计算 $\begin{pmatrix}0 &1 \newline 1 &1\end{pmatrix}$ 的特征值。假设$\lambda$为特征值，存在非零向量$(x_1,x_2)$ 使得：

$$
\begin{align}
\begin{pmatrix}0 &1 \newline 1 &1\end{pmatrix} \times \begin{pmatrix} x_1 \newline x_2\end{pmatrix} &= \lambda \begin{pmatrix} x_1 \newline x_2\end{pmatrix} \newline
\begin{pmatrix} -\lambda &1 \newline 1 & 1 - \lambda \end{pmatrix} \times \begin{pmatrix} x_1 \newline x_2 \end{pmatrix} &= 0 \newline
det\begin{pmatrix} -\lambda &1 \newline 1 & 1 - \lambda \end{pmatrix} &= 0 \newline
\lambda^2 - \lambda - 1 &= 0 \newline
\lambda = \frac{1 \pm \sqrt{5}}{2}
\end{align}
$$

令$\lambda_1 = \frac{1+\sqrt{5}}{2}，\lambda_2 = \frac{1-\sqrt{5}}{2}$，对应的特征向量 $e_1 = (1,\lambda_1)$，$e_2 = (1,\lambda_2)$。 特征向量张成的空间是二维的，因此可以对角化。

以特征值为对角线定义对角矩阵 $ \Lambda = \begin{pmatrix} \lambda_1 & 0 \newline 0 & \lambda_2\end{pmatrix}$ ，特征向量为列向量定义矩阵 $S = \begin{pmatrix}1 & 1 \newline \lambda_1 & \lambda_2 \end{pmatrix}$ ，
$S^{-1} = \frac{1}{\lambda_2 - \lambda_1}\begin{pmatrix} \lambda_2 & -1 \newline -\lambda_1 & 1 \end{pmatrix} = -\frac{1}{\sqrt{5}} \begin{pmatrix} \lambda_2 & -1 \newline -\lambda_1 & 1 \end{pmatrix}$。

于是$T = S \Lambda S^{-1}$，$T^{n} = S\Lambda^{n}S^{-1}$。

$$
\begin{align} 
   \begin{pmatrix}1 & 1 \newline \lambda_1 & \lambda_2 \end{pmatrix}\begin{pmatrix} \lambda_1 & 0 \newline 0 & \lambda_2\end{pmatrix}^n -\frac{1}{\sqrt{5}}\begin{pmatrix} \lambda_2 & -1 \newline -\lambda_1 & 1 \end{pmatrix}\begin{pmatrix}0 \newline 1\end{pmatrix}  &= \begin{pmatrix}f_n \newline f_{n+1}\end{pmatrix} \newline
   -\frac{1}{\sqrt{5}}\begin{pmatrix}1 & 1\end{pmatrix}\begin{pmatrix} \lambda_1^n & 0 \newline 0 & \lambda_2^n\end{pmatrix}\begin{pmatrix}-1 \newline 1\end{pmatrix} &= f_n  \newline
   -\frac{1}{\sqrt{5}}\begin{pmatrix}\lambda_1^n & \lambda_2^n\end{pmatrix}\begin{pmatrix}-1 \newline 1\end{pmatrix} &= f_n \newline
   \frac{1}{\sqrt{5}}(\lambda_1^n - \lambda_2^n) &= f_n \newline
\end{align}
$$

即$f_n = \frac{1}{\sqrt{5}}[\,(\frac{1+\sqrt{5}}{2})^n - (\frac{1 - \sqrt{5}}{2})^n]\,$ 。$\square$