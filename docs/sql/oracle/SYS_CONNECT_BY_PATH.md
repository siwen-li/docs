---
tags:
  - sql/oracle
---

## SYS_CONNECT_BY_PATH

语法

![SYS_CONNECT_BY_PATH语法](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/img/sys_connect_by_path.gif)

作用

`SYS_CONNECT_BY_PATH`仅在层次查询中有效。它返回从根到节点的列值路径,用*`char`* 为每个由 `CONNECT BY` 条件返回的行分隔列值。

*`column`* 和 *`char`* 都可以是任何数据类型 `CHAR`、`VARCHAR2`、`NCHAR` 或 `NVARCHAR2`。返回的字符串为 `VARCHAR2` 数据类型,与 *`column`* 的字符集相同。

另请参阅:

- [[层次查询]] 以获取有关层次查询和 `CONNECT BY` 条件的更多信息
- [*Oracle 数据库全球化支持指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/sqlrf&id=NLSPG-GUID-AFCE41ED-775B-4A00-AF38-C436776AE0C5) 的附录 C 中的整理推导规则,它定义了赋予 `SYS_CONNECT_BY_PATH` 的字符返回值的整理

示例

以下示例返回从员工 `Kochhar` 到所有 `Kochhar` 的员工(及其员工)的员工姓名路径:

```sql
SELECT LPAD(' ', 2*level-1)||SYS_CONNECT_BY_PATH(last_name, '/') "Path"
FROM employees
START WITH last_name = 'Kochhar'
CONNECT BY PRIOR employee_id = manager_id;

Path
------------------------------
     /Kochhar/Greenberg/Chen
     /Kochhar/Greenberg/Faviet
     /Kochhar/Greenberg/Popp
     /Kochhar/Greenberg/Sciarra
     /Kochhar/Greenberg/Urman
     /Kochhar/Higgins/Gietz
   /Kochhar/Baer
   /Kochhar/Greenberg
   /Kochhar/Higgins
   /Kochhar/Mavris
   /Kochhar/Whalen
 /Kochhar
```

 