---
title: "Functional Dependency"
pubDatetime: 2025-05-07T17:24:20+08:00
description: "Functional Dependency 和 associated type 的关系"
tags: [Rust，数据库]
---

## 引言

Functional Dependency 是一个在数据库理论中的一个概念，它描述了的是关系中属性之间的关系。如果属性集合 X 能够唯一决定属性集合 Y，那么我们就说 Y 依赖于 X，记作 X → Y。

他被称为 **Functional** Dependency 是因为它具有函数的特性，对于给定的输入，函数总是会产生固定的输出。

## 数据库中的 Functional Dependency 

在如下的 `employees` 表中：

| Field      | Type          | Null | Key | Default | Extra |
|------------|---------------|------|-----|---------|-------|
| emp_no     | int           | NO   | PRI | NULL    |       |
| birth_date | date          | NO   |     | NULL    |       |
| first_name | varchar(14)   | NO   |     | NULL    |       |
| last_name  | varchar(16)   | NO   |     | NULL    |       |
| gender     | enum('M','F') | NO   |     | NULL    |       |
| hire_date  | date          | NO   |     | NULL    |       |

`emp_no` 是主键， 因此给定一个 `emp_no` 能够唯一地确定 `first_name` 的值，但同名的雇员可以有不同的 `emp_no`。

### group by

对于 `group by` 语句有一个常见的误解：在 `select` 语句中除聚合函数以外的字段都需要出现在 `group by` 语句中。

但包含只是 Functional Dependency 的平凡情况。例如：字段 `first_name` 依赖于 `(first_name, last_name)`。相对准确的说法是 `select` 语句中出现的非聚合函数字段需要依赖于 `group by` 语句后的字段组合，但 mysql 只能发现部分的 Functional Dependency [^1] 。

> [14.19.4 Detection of Functional Dependence](https://dev.mysql.com/doc/refman/8.4/en/group-by-functional-dependence.html)

例如：

```sql
select year(hire_date) % 100, count(emp_no) 
from employees
group by year(hire_date);
```

这里 `year(hire_date) % 100` 显然依赖于 `year(hire_date)`，但 mysql 处理不了这种情况，因此会报错：

```
ERROR 1055 (42000): Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'employees.employees.hire_date' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```

### 范式

Functional Dependency 在数据库范式中扮演更重要的角色。数据库范式有两个目标，第一是减少数据冗余，手段是拆表，第二是提升数据完整性，即拆完之后的表连接得到的是原来的关系。

**Heath's 定理**: 假设关系 R 有属性集合 U，其中 X 和 Y 是 U 的子集，那么 X → Y 则 $ R = \Pi_{XY}(R) \Join \Pi_{XZ}(R) $， 其中 Z = U - X - Y。

简单的说： 如果 X 依赖于 Y, 那么将 R 拆成两个表，一个表包含 X 和 Y，另一个表包含 X 和 剩下的列，这两个子表连接得到的是原来的表。

## Rust 中的 Associated Type

Rust 中的 Associated Type 和范型有一些类似，不同的是一个类型只能实现同一个 trait 一次。

rust 中的 `AsRef` 和 `Deref` 是两个类似的 trait，`AsRef` 使用了范型， 而 `Deref` 使用了 `Associated Type` ：

```rust
pub trait AsRef<T>
where
    T: ?Sized,
{
    // Required method
    fn as_ref(&self) -> &T;
}

pub trait Deref {
    type Target: ?Sized;

    // Required method
    const fn deref(&self) -> &Self::Target;
}
```

带来的差异是一个类型可以对不同的范型实现多次 `AsRef`，而 `Deref` 只能实现一次。在调用 `deref()` 时，编译器会自动推断类型：

```rust
let s = String::from("Hello, world!");
let r = s.deref();
println!("Address of r: {:p}", r);
```

如果把 `deref()` 改成 `as_ref()` 则需要手动指定类型。

因此 Associated Type 也是一种 Functional Dependency。



