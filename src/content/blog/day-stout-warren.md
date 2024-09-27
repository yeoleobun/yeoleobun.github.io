---
title: "Day Stout Warren 算法"
pubDatetime: 2024-06-29T15:57:20+08:00
description: "O(n) 时间原地平衡二叉树"
tags: [数据结构]
---

Day-Stout-Warren 算法是一个高效的二叉树平衡算法，可以在 $O(n)$ 的时间内原地将一个二叉树转换成平衡的二叉树。

## 旋转

二叉树的旋转就像是拉帽子上的绳子，使绳子的两端对齐。不过绳子一边只有一个头，二叉树有两个。因此还需要考虑右边的左节点，和左边的右节点。

![hoodie](@assets/images/hoodie.jpg)

此算法中需要旋转的都是右节点，因此以下函数都遵从这一假设。

![旋转](@assets/images/rotate.png)

左旋：从左图到右图
```python
def left_rotate(p,n):
    r = n.right
    n.right,r.left,p.right = r.left,n,r
```

右旋：从右图到左图

```python
def right_rotate(p,n):
    l = n.left
    n.left,l.right,p.right = l.right,n,l
```

## 将树转换成链表

如果把 `right` 字段看作 `next` 指针，下图中的树也是一个链表。
![链表](@assets/images/vine.png)

沿着右节点向下执行以下不住，直至树变成一个链表：

* 当前节点为空，终止
* 右旋直至左节点为空
* 在右节点继续执行

```python
# p 为父节点，n 是当前节点
def tree_to_vine(p,n):
    while n:
        while n.left:
            right_rotate(p,n)
            n = p.right
        p,n = n,n.right
```

## 将链表转换成树

在上图的链表中 `1`、`3`、`5`、`7` 是最终平衡树的叶子。每次循环都沿着右节点向下左旋，将该一层的节点放置到对应的位置，**每层最后一个节点无需变动**。如下图：

第一次循环：
![first_rotations](@assets/images/rotations-1.png)

第二次循环：
![first_rotations](@assets/images/rotations-2.png)

沿右节点向下执行 $m$ 次左旋转：
```python
def rotates(n,m):
    for _ in range(m):
        left_rotate(n,n.right)
        n = n.right
```

$h$ 层满二叉树节点数量为 $2^h - 1$，$n$ 节点的满二叉树层数为 $\log_2 (n + 1)$。当完全二叉树不满时，最后一层有 $n - (2 ^ {\lfloor \log_2(n+1)\rfloor} - 1)$ 个节点。

将链表转换成树：

```python
# root 为伪根节点，n 为节点数量
def vine_to_tree(root,n):
    m = 2 ** math.floor(math.log2(count + 1)) - 1
    rotates(root,n - m)
    while m > 1: # 此时 m 为剩下的节点的数量
        m //= 2  # 需要旋转的节点刚好也是下一次循环的节点数量
        rotates(root,m)
```

合起来：

```python
def balanceBST(root):
    dummy = TreeNode(right = root)
    tree_to_vine(dummy,root)

    count = 0
    cur = dummy.right
    while cur:
        count += 1
        cur = cur.right

    vine_to_tree(dummy,count)
    return dummy.right
```