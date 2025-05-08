---
title: "米田引理和CPS变换"
pubDatetime: 2024-07-01T16:17:26+08:00
tags: [函数式编程,范畴论]
---
>人的本质不是单个人所固有的抽象物，在其现实性上，它是一切社会关系的总和。
><div style='text-align: right;'>———— 马克思《关于费尔巴哈的提纲》</div>

**凯莱定理**：每个群同构于一个对称群的子群。

给定 $g \in G$，定义函数 $\varphi_g: G \to G$，$\varphi_g(x) = gx$；令 $H = \{\varphi_g \mid g \in G\}$，对于任意 $\varphi_g \in H$，又有 $\varphi_g(e) = ge = g$。

凯莱定理是在说可以用函数来表示群上的元素，并且群和一组群上的函数一一对应，而米田引理是凯莱定理的推广。

## 函子

范畴 $\cal C$ 到 范畴 $\cal D$ 的函子 $F$ 是满足以下条件的映射：

* 将 $\cal C$ 中的对象 $X$ 映射到 $\cal D$ 中的对象 $F(X)$
* 将 $\cal C$ 中的态射 $f: X \to Y$ 映射到 $\cal D$ 中的态射 $F(f): F(X) \to F(Y)$，且满足 $F(id_X) = id_{F(X)}$ 和 $F(g \circ f) = F(g) \circ F(f)$

对于数组类型 `[]`
* 对于类型 `A` 的值 `a`，`[a]` 是类型为 `[A]` 的数组
* 函数 `map: (A -> B) -> [A] -> [B]` 接受类型为 `(A -> B)` 的函数作为参数，返回类型为 `[A] -> [B]` 的函数。

因此 `[]` 是一个函子。

## 自然变换

$F$ 和 $G$ 都是范畴 $\cal C$ 到 $\cal D$ 的函子，$F$ 到 $G$ 的自然变换 $\eta$ 是满足以下条件的态射：

* 对于 $\cal C$ 中的对象 $X$，有 $\cal D$ 中的态射 $\eta_X: F(X) \to G(X)$，$\eta_X$ 称为 $\eta$ 在 $X$ 上的**组件**
* 对于 $\cal C$ 中的态射 $f: X \to Y$，满足: $\eta_Y \circ F(f) = G(f) \circ \eta_X$

交换图（Commutative diagram）：

$$
\begin{CD}
\text{F(X)} @>F(f)>> \text{F(Y)}\\
@V\eta_XVV @VV\eta_YV \\
\text{G(X)} @>>G(f)> \text{G(Y)}
\end{CD}
$$

交换图是个很差的翻译，commute 还有通勤的意思，在这里代表以 $F(X)$ 为起点 $F(Y)$ 为终点，不同的路径有相同的结果。

## Hom 函子

对于范畴 $\cal C$ 中的对象 $X$ 和 $Y$，$X$ 到 $Y$ 的 **hom-set** 是全体 $X$ 到 $Y$ 的态射，记为 $\text{Hom}(X,Y)$。当 $\cal C$ 是局部小范畴时，hom-set 是一个集合。

* 协变函子 $\text{Hom}(X,-)$，将 $\cal C$ 中的对象 $A$ 映射到 $\text{Hom}(X,A)$，将 $\cal C$ 中的态射 $f: A \to B$ 映射到态射 $\sigma : \text{Hom}(X,A) \to \text{Hom}(X,B)$，$\sigma(g) = f \circ g$（后组合）。

* 逆变函子 $\text{Hom}(-,Y)$，将 $\cal C$ 中的对象 $A$ 映射到 $\text{Hom}(A,Y)$，将 $\cal C$ 中的态射 $h: A \to B$ 映射到态射 $\tau : \text{Hom}(B,Y) \to \text{Hom}(A,Y)$，$\tau(g) = g \circ h$（前组合）。

设 $f: X' \to X$，$h: Y \to Y'$，$g: X \to Y$：

$$
\begin{aligned}
\text{Hom}(f,Y')(\text{Hom}(X,h)(g)) &= \text{Hom}(f,Y')(h \circ g) = h \circ g \circ f \\
\text{Hom}(X',h)(\text{Hom}(f,Y)(g)) &= \text{Hom}(X',h)(g \circ f) = h \circ g \circ f \\
\text{Hom}(f,Y') \circ \text{Hom}(X,h) &= \text{Hom}(X',h) \circ \text{Hom}(f,Y)
\end{aligned}
$$

交换图：

$$
\begin{CD}
@. \text{Hom}(X,Y) @>\text{Hom}(X,h)>> \text{Hom}(X,Y')\\
@. @V\text{Hom}(f,Y)VV @VV\text{Hom}(f,Y')V \\
@.\text{Hom}(X',Y) @>>\text{Hom}(X',h)> \text{Hom}(X',Y')
\end{CD}
$$

对于范型 `R -> A`（`A` 是类型参数）：

* `const(x,r) = x` 接受类型为 `X` 的参数，返回类型为 `R -> X` 的函数
* `map(f,g,x) = f(g(x))` 接受类型为 `A -> B` 的参数，返回类型为 `(R -> A) -> R -> B`的函数

因此 `R -> A` 是一个协变 $\text{Hom}$ 函子。

## 米田引理

$F$ 是局部小范畴 $\cal C$ 到 $\mathbf{Set}$ 范畴的的函子，对于 $\cal C$ 中任意对象 $A$，从 $h_A: \text{Hom}(A,-)$ 到 $F$ 的自然变换 $\text{Nat}(h_A,F):\text{Hom}(\text{Hom}(A,-),F)$ 和 $F(A)$ 的元素一一对应，即 $\text{Nat}(h_A,F) \cong F(A)$。

给定 $F(A)$ 的元素的元素 $u$，定义自然变换 $\Phi_X(f) = F(f)(u)$。
设 $f: A \to X$, $g: X \to Y$:

$$
\begin{aligned}
\Phi_Y(\text{Hom}(A,g)(f)) &= \Phi_Y(g \circ f) \\
&= F(g \circ f)(u) \\
&= (F(g) \circ F(f))(u) \\
&= F(g)(F(f)(u)) \\
&= F(g)(\Phi_X(f))
\end{aligned}
$$

交换图：
$$
\begin{CD}
\text{Hom}(A,X) @>\text{Hom}(A,g)>> \text{Hom}(A,Y)\\
@V{\Phi_X}VV @VV{\Phi_Y}V \\
F(X) @>>F(g)> F(Y)
\end{CD}
$$

给定从 $h_A$ 到 $F$ 的自然变换 $\Phi$，交换图：

$$
\begin{CD}
\text{Hom}(A,A) @>Hom(A,f)>> \text{Hom}(A,X) \\
@V{\Phi_A}VV @VV{\Phi_X}V \\
F(A) @>>F(f)> F(X)
\end{CD}
$$

设 $u = \Phi_A(id_A)$，由自然性：

$$
\begin{aligned}
\Phi_X \circ \text{Hom}(A,f) &= F(f) \circ \Phi_A \\
\Phi_X(\text{Hom}(A,f)(id_A)) &= F(f)(\Phi_A(id_A)) \\
\Phi_X(f \circ id_A) &= F(f)u\\
\Phi_X(f) &= F(f)u
\end{aligned}
$$

可见自然变换 $\Phi$ 完全由 $\Phi_A(id)$ 的取值 $u$ 决定，形式与之前由 $F(A)$ 元素 $u$ 定义完全相同。

$Id$ 函子：对于范畴 $\cal C$ 中对象 $A$ 和 $B$ 及态射 $f: A \to B$，$Id(A) = A$，$Id(f) = f$。

对于类型为 `A` 的值 `a`，其CPS 形式是 `f(k) -> k(a)`；给定函数 `g: (A -> R) -> R`，又可以得到类型 `A` 的值 `g(id)`。

可以看到，CPS 变换是米田引理的特殊形式，其中 $F$ 是 $Id$ 函子，对于类型为 `A` 的值，对应的 CPS 形式 `(A -> R) -> R` 是 $\text{Hom}(A,-)$ 函子到 $Id$ 函子的自然变换，当代入 `id` 时，`R` 的具体类型是 `A`，此时 `(A -> A) -> A` 是自然变换上的组件。

## 米田嵌入

$\text{Hom}(-,-): \cal C \times \cal C \to \mathbf{Set}$ 是一个二元函子，在第一个位置逆变，在第二个位置协变。或者说，在参数位置逆变，在返回值位置协变。这一点和子类型协变规则是一样的：

> Scala's type system ensures that variance annotations are sound by keeping track of the positions where a type parameter is used. These positions are classied as covariant for the types of immutable fields and **method results**, and contravariant for **method argument** types and upper type parameter bounds.[^1]

把 $\cal C \to \mathbf{Set}$ 记作 $\mathbf{Set} ^ \mathcal C$，将 $\text{Hom}(-,-)$ 可以看作 $\cal C^\text{op}$ （$\cal C$ 的对偶范畴）到 $\mathbf{Set} ^ \mathcal C$ 的逆变函子 $h_\bullet$。它把：

* $\cal C$ 中对象 $A$ 映射到协变函子 $\text{Hom}(A,-)$
* $\cal C$ 中态射 $B \to A$，映射到自然变换 $\text{Hom}(A,-) \to \text{Hom}(B,-)$。

当 $\cal C$ 是局部小范畴时 hom-set 是集合，$h_B: \text{Hom}(B,-)$ 是 $\cal C$ 到 $\mathbf{Set}$ 范畴的函子，依据米田引理有 $ \text{Hom}(B,A) \cong \text{Nat}(h_A,h_B)$，因此 $h_\bullet$ 是完全忠实的。

 交换两个参数的位置，同样可以看作协变函子 $h^\bullet : \cal C \to \mathbf {Set} ^ {\mathcal{C} ^ \text{op}} $。$h_\bullet$ 把局部小范畴 $\cal C$ 嵌入到 $\cal C$ 到 hom-set 的函子范畴当中，并且是完全忠实的，这也被称为**米田嵌入**。

同样，`(->)` 把类型 `A` 嵌入 `A` 的 continuation `A -> R` (`R` 是类型参数) 中，把类型为 `A -> B` 的函数，转换成 `B`的 continuation 到 `A` 的continuation 的函数。

[^1]: https://scala-lang.org/docu/files/ScalaOverview.pdf

