---
tags:
  - sql
  - oracle
---

# 层次查询伪列

层次查询伪列仅在层次查询中有效。层次查询伪列包括:

- [CONNECT_BY_ISCYCLE 伪列](#connect_by_iscycle)
- [CONNECT_BY_ISLEAF 伪列](#connect_by_isleaf)
- [LEVEL 伪列](#level)

!!! info
    要在查询中定义层级关系,必须使用 `CONNECT BY`子句。


## CONNECT_BY_ISCYCLE

如果当前行有一个子节点也是其祖先节点,则 `CONNECT_BY_ISCYCLE` 伪列返回 1,否则返回 0。 

只有在指定了 `CONNECT BY` 子句的 `NOCYCLE` 参数时,才能指定 `CONNECT_BY_ISCYCLE`。`NOCYCLE` 使 Oracle 能够返回，否则会因 `CONNECT BY` 循环而失败的查询结果。


## CONNECT_BY_ISLEAF

如果当前行是 `CONNECT BY` 条件定义的树的叶节点，则 `CONNECT_BY_ISLEAF` 伪列返回 1,否则返回 0。此信息指示是否可以进一步展开给定行以显示更多层次结构。

示例：

以下示例显示了 `hr.employees` 表的前三层，指示每个行是否是叶行(在 `IsLeaf` 列中用 1 表示)或者是否有子行(在 `IsLeaf` 列中用 0 表示):

```sql
select last_name                           "Employee"
     , connect_by_isleaf                   "IsLeaf"
     , level
     , sys_connect_by_path(last_name, '/') "Path"
from employees
where level <= 3 and department_id = 80
start with employee_id = 100
connect by prior employee_id = manager_id and level <= 4
order by "Employee", "IsLeaf";

Employee                      IsLeaf      LEVEL Path  
------------------------- ---------- ---------- -------------------------
Abel                               1          3 /King/Zlotkey/Abel
Ande                               1          3 /King/Errazuriz/Ande  
Banda                              1          3 /King/Errazuriz/Banda
Bates                              1          3 /King/Cambrault/Bates
Bernstein                          1          3 /King/Russell/Bernstein
Bloom                              1          3 /King/Cambrault/Bloom
Cambrault                          0          2 /King/Cambrault  
Cambrault                          1          3 /King/Russell/Cambrault
Doran                              1          3 /King/Partners/Doran
Errazuriz                          0          2 /King/Errazuriz
Fox                                1          3 /King/Cambrault/Fox
. . .

```


## LEVEL

对于层次查询返回的每一行，`LEVEL` 伪列返回 1 表示根行，2 表示根的子节点，以此类推。**根行** 是倒置树中的最高行。**子行** 是任何非根行。**父行** 是任何具有子节点的行。**叶行** 是任何没有子节点的行。下图显示了具有其 `LEVEL` 值的倒置树的节点。

![层次树](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/img/sqlrf001.gif)

