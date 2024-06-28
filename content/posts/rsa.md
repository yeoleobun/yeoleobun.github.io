---
title: "RSA简述"
date: 2024-06-20T16:47:12+08:00
math: true
---

加密算法核心是找到一对函数 $f$ 和 $g$，$g$ 是 $f$ 的逆函数，即满足 $g \circ f = \mathbf{id}$。

## 密钥生成

* 选择一对大素数 $p$ 和 $q$，令 $n = pq$
* 计算Carmichael函数 $\lambda(n) = [(p-1),(q - 1)]$（一些算法使用欧拉函数）
* 选择正整数 $e < \lambda(n)$ 且 $e$ 和 $\lambda(n)$ 互素
* 计算 $e$ 模 $\lambda(n) $ 的逆 $d$，即满足 $ ed \equiv 1 \pmod {\lambda(n)}$。

其中 $(n,e)$ 是公钥，$d$ 是私钥。

## 加密与解密

对于明文 $m$，且 $0 \le m < n$。密文：$c = m^{\color{green}e} \pmod n$，解密：$c ^ {\color{red}d}  \pmod n$。有 $c ^  {\color{red}d}  \equiv m ^ {{\color{green}e}{\color{red}d} } \equiv m \pmod n$。

## 签名和验证

哈希 $h = \mathbf{hash}(m)$，签名：$s = h ^ {\color{red}d}  \pmod n$，验证：$s ^ {\color{green}e} \pmod n$。有 $s ^ {\color{green}e} \equiv h ^ {{\color{red}d}{\color{green}e}} \equiv h \pmod n$

## 指数

与正整数 $n$ 互素的整数 $a$ 模 $n$ 的**指数** $\delta_n(a)$ 是满足 $a^x \equiv 1 \pmod n$ 的最小正整数。

如果整数 $x$ 满足 $a ^ x \equiv 1 \pmod n$，用带余除法有 $x = q * \delta_n(a) + r$，于是 $a^x\equiv a^r \equiv 1 \pmod n$，因此 $r = 0$，$\delta_n(a) \mid x $。

## Carmichael函数和欧拉函数

对正整数 $n$，**Carmichael函数** $\lambda(n)$ 是对任意与 $n$ 互素的整数 $a$，都有 $a^x \equiv 1 \pmod n$ 的最小正整数。即 **$\lambda(n)$ 是全体 $\delta_n(a)$ 的最小公倍数**。

**欧拉函数** $\varphi(n)$ 是小于 $n$ 且与 $n$ 互素的正整数的数量。这些数关于模乘运算构成一个群，称为**模 $n$ 乘法群**，记为 $\mathbb{Z}_n^*$。**欧拉函数 $\varphi(n)$ 也是 $\mathbb{Z}_n^*$ 的阶**。

当 $n$ 与 $a$ 互素，**$a$ 生成的群** $\langle a \rangle$ 是 $\{1,a, a^2,\dots, a^{\delta_n(a) - 1}\}$。由 $a ^ i \equiv a ^ j \pmod n \Leftrightarrow a ^ {i - j} \equiv 1 \pmod n \Leftrightarrow \delta_n(a) \mid (i - j) $，他们是全部的 $a ^ x \bmod n$。$\langle a \rangle$ 是一个 **有限循环群**，称 $a$ 是 $\langle a \rangle$ 的**生成元**，$\delta_n(a) $ 也称 $a$ 在 $\mathbb{Z}_n^*$ 中的**阶**。

$a ^ k$ 是生成元 $\Leftrightarrow$ 存在 $x$ 使得 $a ^ {kx} = a \Leftrightarrow n \mid {kx-1} \Leftrightarrow (k,n) = 1$。因此 **$n$ 阶循环群的生成元个数等于 $\varphi(n)$**。

同时 $\langle a \rangle$ 是 $\mathbb{Z}_n^*$的子群，由拉格朗日定理可得 $\delta_n(a) \mid \varphi(n)$。$a$ 是任意的，因此 $\lambda(n) \mid \varphi(n)$。

$n$ 阶循环群 $G$ 的任意元素 $a$ 生成一个子群，同时对于 $n$ 的任意因数 $d$ 都有**唯一** $d$ 阶循环子群 $H$，$H$ 的生成元的个数为 $\varphi(d)$，于是 $n = \sum_{d \mid n} {\varphi(d)}$。

**引理**：对于阶为 $n$ 的有限群 $G$，如果对任意 $n$ 的因数 $d$，$x^d = 1$ 至多有 $d$ 个解，则 $G$ 是循环群。

**证明**：令 $\psi(d)$ 为阶为 $d$ 的元素个数。当 $\psi(d) > 0$，存在 $d$ 阶元 $a$。依据假设 $\langle a \rangle$ 就是 $x^d = 1$ 全部的解，$d$ 阶元同时是 $\langle a \rangle$ 的生成元，因此 $\psi(d) = \varphi(d)$。又 $\sum_{d \mid n}\psi(d) = n = \sum_{d \mid n} \varphi(d)$，因此对任意因数 $d$，$d$ 阶元都存在。特别的，存在 $n$ 阶元。$\square$

当 $p$ 是素数，$\mathbb{Z}_p$ 是域，$x ^ d = 1$ 在 $\mathbb{Z}_p$ 中至多有 $d$ 个解，因此 $\mathbb{Z}_p^*$ 是循环群。于是 $\lambda(p) = \varphi(p) = p - 1$。

当 $m$ 和 $n$ 互素，依据中国剩余定理，有$a^x \equiv 1 \pmod {mn} \Leftrightarrow a ^ x \equiv 1 \pmod m \land a ^ x \equiv 1 \pmod n$。令 $ x = \lambda(mn)$，**及 $a$ 的任意性**可得 $\lambda(m) \mid \lambda(mn)$ 且 $\lambda(n) \mid \lambda(mn)$。令 $x =  [\lambda(m),\lambda(n)]$，有 $ \lambda(mn) \mid [\lambda(m),\lambda(n)]$，于是 $ \lambda(mn) = [\lambda(m),\lambda(n)]$。

对于任意正整数 $a$，且 $ a < mn $，令 $a_1 = a \bmod m$，$a_2 = a \bmod n$。$(a,mn) = 1 \Leftrightarrow (a_1,m) = 1 \land (a_2,n) = 1$，因此 $\varphi(mn) = \varphi(m)\varphi(n)$。

## 正确性证明

由 $ed \equiv 1 \pmod {\lambda(n)}$，令 $ed - 1 = k \lambda(n)$：

* 当 $m$ 与 $n$ 互素，$m ^ {ed} \equiv m * m^{ed - 1} \equiv m * m^{k\lambda(n)} \equiv m \pmod n$ 
* 当 $p \mid m$ 且 $q \mid m$，$m^{ed} \equiv m \equiv 0 \pmod n$
* 当 $p \nmid m$ 且 $q \mid m$，令 $m_p = m \bmod p$。$m^{ed} \equiv m_p^{ed} \equiv m_pm_p^{ed-1} \equiv m_pm_p^{k\lambda(n)} \equiv m_pm_p^{k[\lambda(p),\lambda(q)]} \equiv m_p \equiv m\pmod p$，$m^{ed} \equiv m \equiv 0 \pmod q$， 因此 $m^{ed} \equiv m \pmod n$
* 当 $p \mid m$ 且 $q \nmid m$，同上

当使用欧拉函数时，只需把上述证明中的 $\lambda(n)$ 换成 $\varphi(n)$，把 $[\lambda(p),\lambda(q)]$ 换成 $\varphi(p)\varphi(q)$。

## 解密、签名加速

$p$ 和 $q$ 都是素数，因此存在$px + qy = 1$。依据中国剩余定理，$\mathbb{Z}_n \cong \Z_p \bigoplus \mathbb{Z}_q$ 定义同构映射 $\sigma(a) = (a \bmod p,a \bmod q)$，$\sigma^{-1}(a_p,a_q) \equiv a_pqy + a_qpx \equiv a_pqy + a_q(1 - qy) \equiv a_q + (a_p - a_q)qy \pmod n$。

对于密文 $c$：令 $d_p = d \bmod \varphi(p)$，$d_q = d \bmod \varphi(q)$。有 $c ^ d \equiv c ^ {d_p} \pmod p$，$c ^ d \equiv c ^ {d_q} \pmod q$。令 $c_p = c^{d_p} \bmod p$，$c_q = c ^ {d_q} \bmod q$。$c^d = \sigma^{-1}\sigma(c^d) = \sigma^{-1}(c_p，c_q) = c_q + (c_p - c_q)qy$。

其中 $d_p$，$d_q$, $y$ 可以提前计算。

签名同理。
