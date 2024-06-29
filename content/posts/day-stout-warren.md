---
title: "Day Stout Warren 算法"
date: 2024-06-29T15:57:20+08:00
---

Day-Stout-Warren 算法是一个高效的平衡二叉树算法，可以在 $O(n)$ 的时间内将一个非平衡的二叉树转换成一个平衡的二叉树。并且是一个原地算法。

## 旋转

二叉树的旋转就像是拉帽衫帽子上的绳子，使绳子的两端对齐。不过绳子一边只有一个头，但二叉树有两个，因此还需要考虑右边的左节点，和左边的右节点。

接下来都假设要旋转的根节点都是右子节点。

![旋转](/rotate.png)

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

把目标树转换成下面的形状，如果把`right`字段看作`next`指针，它是一个链表。
![链表](/vine.png)

有三种情况：

* 当目标节点为空，终止
* 当目标节点左节点不为空，右旋转，在当前节点递归
* 当目标节点左节点为空，在右节点递归

```python
# p 为父节点，p.right 是目标节点
def tree_to_vine(p): 
    if not p.right:
        return
    if p.right.left:
        right_rotate(p,p.right)
        tree_to_vine(p)
    else:
        tree_to_vine(p.right)

```

## 将链表转换成树

上图的链表中`1,3,5,7`是最终平衡树的叶子，每次循环都是沿着右节点向下左旋，将该层的节点旋转到正确的位置，**每层最后一个节点已经在正确的位置**。如下图：

第一层旋转：
![first_rotations](/rotations-1.png)

第二层旋转：
![first_rotations](/rotations-2.png)

$h$ 层完全二叉树节点数量为 $2^h - 1$，$n$ 个节点的完全二叉树层数为 $\log_2 n + 1$，最后一层节点数量为 $n - (2 ^ {(\log_2 n + 1) -1} - 1) = \frac{n+1}{2}$。因此需要左旋的节点数量为 $\frac{n-1}{2}$，$n$ 始终为奇数，在程序中等于 `n / 2`。

非完全满二叉树最后一层节点数量为 $n - (2 ^ {\lfloor \log_2 n + 1 \rfloor} - 1)$。

沿右节点向下执行 $m$ 次左旋转：
```python
def rotates(n,m):
    for _ in range(m):
        left_rotate(n,n.right)
        n = n.right
```

将链表转换成平衡树：

```python
# n 为树的节点数量
def vine_to_tree(root，n):
    root = TreeNode(right = root)
    m = 2 ** math.floor(math.log2(count + 1)) - 1
    rotates(root,n - m)
    # 剩下的节点是满二叉树
    while m > 1: 
        # 需要旋转的节点数量等于下一次循环的节点数量
        m //= 2  
        rotates(root,m)
    return root.right
```

合起来：

```python
def balanceBST(root):
    if not root:
        return None
        
    # 创建哑节点作为根
    dummy = TreeNode(right = root) 
    tree_to_vine(dummy)

    count = 0
    cur = dummy.right
    while cur:
        count += 1
        cur = cur.right

    vine_to_tree(dummy,count)
    return dummy.right
```