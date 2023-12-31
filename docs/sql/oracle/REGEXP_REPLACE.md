---
tags:
  - sql
  - oracle
  - regexp
---

# REGEXP_REPLACE

## 语法

![REGEXP_REPLACE函数语法](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/img/regexp_replace.gif)

=== "用途"
    !!! note "用途"

        `REGEXP_REPLACE` 通过允许您在字符串中搜索正则表达式模式来扩展 `REPLACE` 函数的功能。默认情况下,该函数返回 `source_char`,并用 `replace_string` 替换正则表达式模式的每次出现。

=== "参数说明"
    !!! abstract annotate "参数"
    
        - `source_char` 是字符表达式,用作搜索值。
        - `pattern` 是正则表达式。通常是一个文本字面量。
        - `replace_string` 是字符类型的值。`replace_string` 可以包含最多 500 个对子表达式的反向引用,形式为 `\n`,其中 `n` 是 1 到 9 之间的数字。如果要在 `replace_string` 中包含反斜杠(`\`),则必须在前面加上转义字符,也是一个反斜杠。
        - `position` 是一个正整数,指示 Oracle 应开始搜索 `source_char` 的字符位置。默认为 1。 
        - `occurrence` 是一个非负整数,指示替换操作的出现次数。 (1)
        - `match_param` 是 `VARCHAR2` 或 `CHAR` 数据类型的字符表达式,它允许您更改函数的默认匹配行为。

    1.  - 如果指定 0,则 Oracle 替换所有匹配项。这是默认值。
        - 如果指定一个正整数 `n`,则 Oracle 替换第 `n` 次出现。
        - 如果 `occurrence` 大于 1,则数据库从第一个 `pattern` 匹配后的第一个字符开始搜索第二次出现,依此类推。

## 示例

查找模式 `xxx.xxx.xxxx`，使用 `(\1) \2-\3` 重新格式化此模式。

```sql
select regexp_replace(phone_number,
                      '([[:digit:]]{3})\.([[:digit:]]{3})\.([[:digit:]]{4})',
                      '(\1) \2-\3') "REGEXP_REPLACE"
from employees
order by "REGEXP_REPLACE"; -- (1)!
```

1.  !!! quote ""
        REGEXP_REPLACE
        --------------------------------------------------------------------------------
        (515) 123-4444
        (515) 123-4567
        (515) 123-4568
        (515) 123-4569
        (515) 123-5555
        . . .


在字符串中的每个非空字符后面插入一个空格。

```sql
select regexp_replace(country_name, '(.)', '\1 ') "REGEXP_REPLACE"
from countries; -- (1)!
```

1.  !!! quote ""
        REGEXP_REPLACE
        --------------------------------------------------------------------------------
        A r g e n t i n a
        A u s t r a l i a
        B e l g i u m
        B r a z i l
        C a n a d a
        . . .


用单个空格替换每个两个或多个空格的出现。

```sql
select regexp_replace('500   Oracle     Parkway,    Redwood  Shores, CA',
                      '( ){2,}', ' ') "REGEXP_REPLACE"
from dual; -- (1)!
```

1.  !!! quote ""
        REGEXP_REPLACE
        --------------------------------------
        500 Oracle Parkway, Redwood Shores, CA


替换字符串中的所有数字:

```sql
with strings as (    
    select 'abc123' s from dual union all    
    select '123abc' s from dual union all    
    select 'a1b2c3' s from dual
)
select s                              "STRING"
     , regexp_replace(s, '[0-9]', '') "MODIFIED_STRING"
from strings; -- (1)!
```

1.  !!! quote ""
          STRING               MODIFIED_STRING
        -------------------- --------------------
        abc123               abc
        123abc               abc
        a1b2c3               abc


替换字符串中的第一个出现的数字:

```sql 
with strings as (    
    select 'abc123' s from dual union all    
    select '123abc' s from dual union all    
    select 'a1b2c3' s from dual
)
select s                                    "STRING"
     , regexp_replace(s, '[0-9]', '', 1, 1) "MODIFIED_STRING"
from strings; -- (1)!
```

1.  !!! quote ""
        STRING               MODIFIED_STRING
        -------------------- --------------------
        abc123               abc23
        123abc               23abc
        a1b2c3               ab2c3


替换字符串中的第二个出现的数字:

```sql
with strings as (
    select 'abc123' s from dual union all
    select '123abc' s from dual union all
    select 'a1b2c3' s from dual
)
select s                                    "STRING"
     , regexp_replace(s, '[0-9]', '', 1, 2) "MODIFIED_STRING"
from strings; -- (1)!
```

1.  !!! quote ""
        STRING               MODIFIED_STRING
        -------------------- --------------------
        abc123               abc13
        123abc               13abc
        a1b2c3               a1bc3


用单个空格替换字符串中的多个空格:

```sql  
with strings as (
    select 'Hello  World' s from dual union all
    select 'Hello        World' s from dual union all 
    select 'Hello,   World  !' s from dual
)
select s                               "STRING"
     , regexp_replace(s, ' {2,}', ' ') "MODIFIED_STRING"
from strings; -- (1)!
```

1.  !!! quote ""
        STRING               MODIFIED_STRING
        -------------------- --------------------
        Hello  World         Hello World
        Hello        World   Hello World
        Hello,   World  !    Hello, World !


将驼峰字符串转换为包含下划线分隔的小写单词的字符串:

```sql
with strings as (
    select 'AddressLine1' s from dual union all
    select 'ZipCode' s from dual union all
    select 'Country' s from dual  
)
select s                                                "STRING"
     , lower(regexp_replace(s, '([A-Z0-9])', '_\1', 2)) "MODIFIED_STRING"
from strings; -- (1)!
```

1.  !!! quote ""
          STRING               MODIFIED_STRING
        -------------------- --------------------
        AddressLine1         address_line_1
        ZipCode              zip_code
        Country              country


转换日期格式:

```sql
with date_strings as (
    select  '2015-01-01' d from dual union all
    select '2000-12-31' d from dual union all 
    select '900-01-01' d from dual   
)
select d                                                                                 "STRING"
     , regexp_replace(d, '([[:digit:]]+)-([[:digit:]]{2})-([[:digit:]]{2})', '\3.\2.\1') "MODIFIED_STRING"
from date_strings; -- (1)!
```

1.  !!! quote ""
          STRING               MODIFIED_STRING
        -------------------- --------------------
        2015-01-01           01.01.2015
        2000-12-31           31.12.2000
        900-01-01            01.01.900


用 '1' 替换字符串中的所有字母:

```sql 
with strings as (
    select 'NEW YORK' s from dual union all
    select 'New York' s from dual union all
    select 'new york' s from dual
)
select s                                             "STRING"
     , regexp_replace(s, '[a-z]', '1', 1, 0, 'i')    "CASE_INSENSITIVE"
     , regexp_replace(s, '[a-z]', '1', 1, 0, 'c')    "CASE_SENSITIVE"
     , regexp_replace(s, '[a-zA-Z]', '1', 1, 0, 'c') "CASE_SENSITIVE_MATCHING"
from strings; -- (1)!
```

1.  !!! quote ""
          STRING     CASE_INSEN CASE_SENSI CASE_SENSI
        ---------- ---------- ---------- ----------
        NEW YORK   111 1111   NEW YORK   111 1111
        New York   111 1111   N11 Y111   111 1111
        new york   111 1111   111 1111   111 1111


