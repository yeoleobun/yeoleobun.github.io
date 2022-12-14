---
title: "斐波那契数列"
date: 2022-07-30T17:12:13+08:00
draft: false
---

## 斐波那契序列$\\{f_n\\}$

$$ 
\begin{align}
f_1 &= 1 \newline
f_2 &= 1 \newline
f_n &= f_{n-2} + f_{n-1} \quad(n \ge 3)
\end{align}
$$

## 线性映射 $T:R^2 \rightarrow R^2$，$T(x,y) = (y,x + y)$

注意到这个映射是线性的：
$$
   \begin{align}T((x_1,y_1) + (x_2,y_2)) &= T(x_1 + x_2,y_1+y_2) \newline
   &= (y_1+y_2,x_1+x_2+y_1 + y_2) \newline
   &= (y_1,x_1+y_1) + (y_2,x_2+y_2) \newline
   &= T(x_1,y_1) + T(x_2,y_2)\end{align}
$$

也是齐性的：
$$
\begin{align}
T(\lambda(x,y)) &= T(\lambda x,\lambda y) \newline
&= (\lambda y, \lambda x + \lambda y) \newline
&= \lambda(y,x+y) \newline
&= \lambda T(x,y)
\end{align}
$$

## $T$的$n$次幂，$T^n(0,1) = (f_n,f_{n+1})$ 当 $n \in N^+$

归纳证明：

当 $n=1$ ，$T(0,1) = (1,1) = (f_1,f_2)$。

当 $n > 1$ 上式对 $n-1$ 成立，有 $T^{n-1}(0,1) = (f_{n-1},f_n)$，

$T^n(0,1) = T(T^{n-1}(0,1)) = T(f_{n-1},f_n) = (f_n,f_{n-1} + f_n) = (f_n,f_{n+1})$。$\square$

## $T$的矩阵

对于标准基 $(1,0)$，$(0,1)$，$T(1,0) = (0,1)$，$T(0,1) = (1,1)$，T的矩阵为 $\begin{pmatrix}0 &1 \newline 1 &1\end{pmatrix}$。且 $(0,1) = 0 \times (1,0) + 1 \times (0,1)$，因此 $\begin{pmatrix}0 &1 \newline 1 &1\end{pmatrix} ^n\begin{pmatrix} 0 \newline 1\end{pmatrix} = \begin{pmatrix} f_n \newline f_{n+1}\end{pmatrix}$ 。

## 对角化

注意到 $\begin{pmatrix} a & 0 \newline 0 & b\end{pmatrix} ^ n = \begin{pmatrix} a^n & 0 \newline 0 & b^n \end{pmatrix}$，如果矩阵能够对角化计算幂次会非常方便。

首先计算 $\begin{pmatrix}0 &1 \newline 1 &1\end{pmatrix}$ 的特征值 $\lambda$，有 $\begin{pmatrix}0 &1 \newline 1 &1\end{pmatrix} \times \begin{pmatrix} a \newline b\end{pmatrix} = \lambda \begin{pmatrix} a \newline b\end{pmatrix} $，联立得：$\begin{cases} b = \lambda a \newline a + b = \lambda b\end{cases}$

把（1）代入（2）得 $ (\lambda^2 - \lambda - 1) \times a = 0 $。 当$a$等于$0$时，$(a,b)$ 是零向量，因此 $ a\neq 0$，

$(\lambda^2 - \lambda - 1) = 0$，用求根公式得 $\lambda = \frac{1\pm\sqrt5}{2}$。

令两个解分别为 $\lambda_1 = \frac{1+\sqrt{5}}{2}，\lambda_2 = \frac{1-\sqrt{5}}{2}$，对应的特征向量 $e_1 = (1,\frac{1+\sqrt{5}}{2})$，$e_2 = (1,\frac{1-\sqrt{5}}{2})$。

以 $e_1$，$e_2$ 为基得到$T$的对角化矩阵 $\begin{pmatrix}\lambda_1 & 0 \newline 0 & \lambda_2\end{pmatrix}$。又 $(0,1) = \frac{1}{\sqrt{5}}(e_1 - e_2)$，

于是 $T^n(0,1) = T^n(\frac{1}{\sqrt{5}}(e_1 - e_2)) = \frac{1}{\sqrt{5}} T^n(e_1 - e_2)$，
$\begin{align}\frac{1}{\sqrt{5}} \begin{pmatrix}\lambda_1 & 0 \newline 0 & \lambda_2\end{pmatrix}^n \times \begin{pmatrix} 1 \newline -1\end{pmatrix} = \begin{pmatrix} f_n \newline f_{n+1} \end{pmatrix}\end{align}$ ，

得 $f_n = \frac{1}{\sqrt{5}}[(\frac{1+\sqrt{5}}{2})^n - (\frac{1-\sqrt{5}}{2})^n]$ 。

