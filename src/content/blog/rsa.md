---
title: "RSA详解"
pubDatetime: 2024-06-20T16:47:12+08:00
tags: [算法,数论,抽象代数]
---

加密算法核心是找到一对函数 $f$ 和 $g$，满足 $g \circ f = \mathbf{id}$。\
假设有消息 $m$，加密得到密文 $c = f(m)$，解密密文有 $g(c) = g(f(m)) = id(m) = m$。

在 RSA 中 $f \circ g$ 也等于 $id$，其他算法中这一点不一定成立。

## 计算步骤

生成密钥：
* 选择一对大素数 $p$ 和 $q$，令 $n = pq$
* 计算 Carmichael 函数 $\lambda(n) = [(p-1),(q - 1)]$（或使用欧拉函数）
* 选择正整数 $e < \lambda(n)$ 且 $e$ 和 $\lambda(n)$ 互素
* 计算 $e$ 模 $\lambda(n) $ 的逆 $d$，即满足 $ ed \equiv 1 \pmod {\lambda(n)}$。

其中 $(n,e)$ 是**公钥**，$d$ 是**私钥**。

对于消息 $m$，加密得到密文 $c = m^{\color{green}e} \pmod n$，解密密文有 $c ^  {\color{red}d}  \equiv m ^ {{\color{green}e}{\color{red}d} } \equiv m \pmod n$。

对于文本 $\text{text}$，计算哈希 $h = \mathbf{hash}(\text{text})$，签名 $s = h ^ {\color{red}d}  \pmod n$，验证：$s ^ {\color{green}e} \equiv h ^ {{\color{red}d}{\color{green}e}} \equiv h \pmod n$

## 模 $n$ 乘法群

模 $n$ 同余是一个[等价关系](https://en.wikipedia.org/wiki/Equivalence_relation)，通过同余可以得到整数的一个[划分](https://en.wikipedia.org/wiki/Partition_of_a_set)，称为模 $n$ 同余类，记为 $\mathbb Z_n$。\
或者用集合来表示：$\{0,1,\dots,n-1\}$，这里的数字代表与它同余的整数集合。

与 $n$ 互素的整数在乘法上构成一个群，他是 $\mathbb Z_n$ 的子集加上乘法运算，记为 $\mathbb Z_n^*$。

$\mathbb Z_n^*$ 满足群公理：
* 单位元：1
* 封闭性：$a,b$ 与 $n$ 互素，则 $ab$ 与 $n$ 互素
* 结合性：继承自乘法的结合性
* 可逆性：当 $a$ 和 $n$ 互素，依据 bézout 等式，有 $ax + ny = 1$ 即 $ax \equiv 1 \pmod n$，\
$x$ 即是 $a$ 的逆

## 阶和群的阶

$n$ 是正整数，与 $n$ 互素的整数 $a$ 的**阶** $|a|$ 是满足 $a^x \equiv 1 \pmod n$ 的最小正整数。

$a$ **生成的群** $\left<a\right>$ 是 $\{1,a,a^2,\dots\}_{\bmod n}$，如果群 $G = \left<a\right>$ 称 $a$ 为 $G$ 的**生成元**。

依据[鸽巢原理](https://en.wikipedia.org/wiki/Pigeonhole_principle)存在 $a^p \equiv a^q \pmod n$，$a^{p - q} \equiv 1 \pmod n$。因此存在 $x$ 满足 $a^x \equiv 1 \pmod n$，\
且 $\left<a\right>$ 是有限群。

有限群的**阶**是群元素的数量，$\left<a\right>$ 的阶等于 $|a|$。

**命题**：如果整数 $x$ 满足 $a ^ x \equiv 1 \pmod n$，则 $|a|$ 整除 $x$。

**证明**：使用带余除法有 $x = q * |a| + r $，$a^x\equiv a^r \equiv 1 \pmod n$，因此 $r = 0$，否则与阶的最小性矛盾。$\square$

## Carmichael函数和欧拉函数

对于正整数 $n$，**Carmichael函数** $\lambda(n)$ 是对于任意和 $n$ 互素的整数 $a$，都满足 $a^x \equiv 1 \pmod n$ 的最小正整数，或者说 $\lambda(n)$ 是所有 $|a|$ 的最小公倍数。**欧拉函数** $\varphi(n)$ 是小于 $n$ 且与 $n$ 互素的正整数的数量，因此 $\varphi(n)$ 是 $\mathbb Z_n^*$ 的阶。

对于任意与 $n$ 互素的整数 $a$，$\left< a \right>$ 是 $\mathbb Z_n^*$ 的子群，依据[拉格朗日定理](https://en.wikipedia.org/wiki/Lagrange%27s_theorem_(group_theory))，$\left< a \right>$ 的阶整除 $\mathbb Z_n^*$ 的阶，\
因此 $\lambda(n) \mid \varphi(n)$。

当 $p$ 是素数，$\mathbb Z_p$ 是一个域。$x ^{\lambda(p)} = 1$ 在 $\mathbb Z_p$ 中至多有 $\lambda(p)$ 个解，且 $\mathbb Z_p^*$ 中所有元素都是它的解，因此 $\varphi(p) \le \lambda(p)$，$\lambda(p) = \varphi(p)= p - 1$。

当 $m$ 和 $n$ 互素，对于任意整数 $a$ 有 $a^x \equiv 1 \pmod {mn} \Leftrightarrow a ^ x \equiv 1 \pmod m \;\land \;a ^ x \equiv 1 \pmod n$。\
令 $ x = \lambda(mn)$，可得 $\lambda(m) \mid \lambda(mn)$ 且 $\lambda(n) \mid \lambda(mn)$。令 $x =  [\lambda(m),\lambda(n)]$，有 $ \lambda(mn) \mid [\lambda(m),\lambda(n)]$，因此 $ \lambda(mn) = [\lambda(m),\lambda(n)]$。

同样有 $(a,mn) = 1 \Leftrightarrow (a,m) = 1 \;\land \;(a,n) = 1$，因此 $\varphi(mn) = \varphi(m)\varphi(n)$。

## 正确性证明

由于 $ed \equiv 1 \pmod {\lambda(n)}$ ，令 $ed = k \lambda(n) + 1 = k[\lambda(p),\lambda(q)] + 1$，对于消息 $0 \le m < n$：
* 当 $p \mid m$，$m^{ed} \equiv m \equiv 0 \pmod p$
* 当 $p \nmid m$，$m^{ed} \equiv m ^ {k[\lambda(p),\lambda(q)]} m \equiv m \pmod p$

因此 $m^{ed} \equiv m \pmod p$，同理有 $m^{ed} \equiv m \pmod q$，因此 $m^{ed} \equiv m \pmod n$。

当使用欧拉函数时，把上述证明中的 $\lambda(n)$ 换成 $\varphi(n)$，把 $[\lambda(p),\lambda(q)]$ 换成 $\varphi(p)\varphi(q)$ 即可。

## 解密、签名加速

依据 bézout 定理有 $px + qy = 1$，依据中国剩余定理有 $\mathbb{Z}_n \cong \mathbb Z_p \bigoplus \mathbb{Z}_q$。定义同构映射 $\sigma: \mathbb{Z}_n \rightarrow \mathbb Z_p \bigoplus \mathbb{Z}_q$：
* $\sigma(a) = (a \bmod p,a \bmod q)$
* $\sigma^{-1}(a,b) \equiv aqy + bpx \equiv aqy + b(1 - qy) \equiv b + (a - b)qy \;\pmod n$。

令 $d_p = d \bmod \lambda(p)$，$d_q = d \bmod \lambda(q)$。对于密文 $c$，设 $c_p = c^{d_p} \bmod p$，$c_q = c ^ {d_q} \bmod q$。有：

$$
c^d = \sigma^{-1}\sigma(c^d) = \sigma^{-1}(c_p，c_q) = c_q + (c_p - c_q)qy
$$

其中 $d_p$，$d_q$，$y$ 可以提前计算。

签名同理。
