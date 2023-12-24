---
tags:
  - sql/oracle
  - regexp
---

# REGEXP_REPLACE

语法

![REGEXP_REPLACE函数语法](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/img/regexp_replace.gif)

用途

`REGEXP_REPLACE` 通过允许您在字符串中搜索正则表达式模式来扩展 `REPLACE` 函数的功能。默认情况下,该函数返回 `source_char`,并用 `replace_string` 替换正则表达式模式的每次出现。返回的字符串与 `source_char` 具有相同的字符集。如果第一个参数不是 LOB,则函数返回 `VARCHAR2`;如果第一个参数是 LOB,则返回 `CLOB`。

此函数符合 POSIX 正则表达式标准和 Unicode 正则表达式准则。有关更多信息,请参阅 [[Oracle正则表达式支持]]。

- `source_char` 是字符表达式,用作搜索值。它通常是一个字符列,可以是 `CHAR`、`VARCHAR2`、`NCHAR`、`NVARCHAR2`、`CLOB` 或 `NCLOB` 数据类型。

- `pattern` 是正则表达式。它通常是一个文本字面量,可以是 `CHAR`、`VARCHAR2`、`NCHAR` 或 `NVARCHAR2` 数据类型。它可以包含多达 512 个字节。如果 `pattern` 的数据类型与 `source_char` 的数据类型不同,则 Oracle 数据库会将 `pattern` 转换为 `source_char` 的数据类型。有关可以在 `pattern` 中指定的运算符的列表,请参阅 [[Oracle正则表达式支持]]。

- `replace_string` 可以是 `CHAR`、`VARCHAR2`、`NCHAR`、`NVARCHAR2`、`CLOB` 或 `NCLOB` 数据类型。如果 `replace_string` 是 `CLOB` 或 `NCLOB`,则 Oracle 会将 `replace_string` 截断为 32K。`replace_string` 可以包含最多 500 个对子表达式的反向引用,形式为 `\n`,其中 `n` 是 1 到 9 之间的数字。如果要在 `replace_string` 中包含反斜杠(`\`),则必须在前面加上转义字符,也是一个反斜杠。例如,要替换 `\2` 你需要输入 `\\2`。有关反向引用表达式的更多信息,请参阅 “[[Oracle正则表达式支持]]。

- `position` 是一个正整数,指示 Oracle 应开始搜索 `source_char` 的字符位置。默认值为 1,表示 Oracle 从 `source_char` 的第一个字符开始搜索。

- `occurrence` 是一个非负整数,指示替换操作的出现次数:

  - 如果指定 0,则 Oracle 替换所有匹配项。
  - 如果指定一个正整数 `n`,则 Oracle 替换第 `n` 次出现。

  如果 `occurrence` 大于 1,则数据库从第一个 `pattern` 匹配后的第一个字符开始搜索第二次出现,依此类推。 这种行为与 `INSTR` 函数不同,后者从第一个匹配的第二个字符开始搜索第二次出现。

- `match_param` 是 `VARCHAR2` 或 `CHAR` 数据类型的字符表达式,它允许您更改函数的默认匹配行为。 此参数对此函数的行为与 `REGEXP_COUNT` 中的行为相同。 有关详细信息,请参阅 [[REGEXP_COUNT]]。

另请参阅:

- [REPLACE](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/REPLACE.html#GUID-1A79BDDF-2D3B-4AD4-98E7-985B2E59DA6B)
- [[REGEXP_INSTR]]、[[REGEXP_SUBSTR]]和 [[REGEXP_LIKE#REGEXP_LIKE 条件|REGEXP_LIKE 条件]]
- [*Oracle 数据库全球化支持指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/sqlrf&id=NLSPG-GUID-AFCE41ED-775B-4A00-AF38-C436776AE0C5) 的附录 C,其中包含确定 `REGEXP_REPLACE` 用于比较 `source_char` 中的字符与 `pattern` 中的字符的整理规则,以及确定此函数的字符返回值的整理派生规则

### 示例

下面的示例检查 `phone_number`,查找模式 `xxx.xxx.xxxx`。Oracle 使用 `(\1) \2-\3` 重新格式化此模式。

```sql
SELECT
  REGEXP_REPLACE(phone_number, 
                 '([[:digit:]]{3})\.([[:digit:]]{3})\.([[:digit:]]{4})', 
                 '(\1) \2-\3') "REGEXP_REPLACE" 
  FROM employees
  ORDER BY "REGEXP_REPLACE";

REGEXP_REPLACE
--------------------------------------------------------------------------------
(515) 123-4444
(515) 123-4567
(515) 123-4568
(515) 123-4569
(515) 123-5555
. . .
```

下面的示例检查 `country_name`。Oracle 在字符串中的每个非空字符后面插入一个空格。

```sql
SELECT
  REGEXP_REPLACE(country_name, '(.)', '\1 ') "REGEXP_REPLACE"
  FROM countries; 
  
REGEXP_REPLACE
--------------------------------------------------------------------------------
A r g e n t i n a
A u s t r a l i a
B e l g i u m
B r a z i l
C a n a d a
. . .
```

下面的示例检查字符串,查找两个或多个空格。Oracle 用单个空格替换每个两个或多个空格的出现。

```sql
SELECT
  REGEXP_REPLACE('500   Oracle     Parkway,    Redwood  Shores, CA', 
                 '( ){2,}', ' ') "REGEXP_REPLACE"
  FROM DUAL;
  
REGEXP_REPLACE
--------------------------------------
500 Oracle Parkway, Redwood Shores, CA
```

### REGEXP_REPLACE 模式匹配:示例

下面的语句创建表 regexp_temp 并插入值:

```sql
CREATE TABLE regexp_temp(empName varchar2(20), emailID varchar2(20));

INSERT INTO regexp_temp (empName, emailID) VALUES ('John Doe', 'johndoe@example.com');
INSERT INTO regexp_temp (empName, emailID) VALUES ('Jane Doe', 'janedoe@example.com');
```

下面的语句用 'John' 替换字符串 'Jane':

```sql
SELECT empName, REGEXP_REPLACE (empName, 'Jane', 'John') "STRING_REPLACE" FROM regexp_temp;

EMPNAME		STRING_REPLACE
--------	--------------
John Doe	John Doe
Jane Doe	John Doe
```

下面的语句用 'Jane' 替换字符串 'John':

```sql
SELECT empName, REGEXP_REPLACE (empName, 'John', 'Jane' ) "STRING_REPLACE" FROM regexp_temp;

EMPNAME		STRING_REPLACE
--------	--------------
John Doe	Jane Doe
Jane Doe	Jane Doe
```

### REGEXP_REPLACE:示例

下面的语句替换字符串中的所有数字:

```sql
WITH strings AS (    
  SELECT 'abc123' s FROM dual union all    
  SELECT '123abc' s FROM dual union all    
  SELECT 'a1b2c3' s FROM dual
)    
  SELECT s "STRING", regexp_replace(s, '[0-9]', '') "MODIFIED_STRING"   
  FROM strings;
  
  STRING               MODIFIED_STRING
-------------------- --------------------
abc123               abc
123abc               abc
a1b2c3               abc
```

下面的语句替换字符串中的第一个数字出现:

```sql 
WITH strings AS (    
  SELECT 'abc123' s from DUAL union all    
  SELECT '123abc' s from DUAL union all    
  SELECT 'a1b2c3' s from DUAL
)    
  SELECT s "STRING", REGEXP_REPLACE(s, '[0-9]', '', 1, 1) "MODIFIED_STRING"   
  FROM   strings;
  
 STRING               MODIFIED_STRING
-------------------- --------------------
abc123               abc23
123abc               23abc
a1b2c3               ab2c3
```

下面的语句替换字符串中的第二个数字出现:

```sql
WITH strings AS (    
  SELECT 'abc123' s from DUAL union all    
  SELECT '123abc' s from DUAL union all    
  SELECT 'a1b2c3' s from DUAL  
)    
  SELECT s "STRING", REGEXP_REPLACE(s, '[0-9]', '', 1, 2) "MODIFIED_STRING"    
  FROM   strings;

STRING               MODIFIED_STRING
-------------------- --------------------
abc123               abc13
123abc               13abc
a1b2c3               a1bc3
```

下面的语句用单个空格替换字符串中的多个空格:

```sql  
WITH strings AS (
  SELECT 'Hello  World' s FROM dual union all
  SELECT 'Hello        World' s FROM dual union all 
  SELECT 'Hello,   World  !' s FROM dual
)
  SELECT s "STRING", regexp_replace(s, ' {2,}', ' ') "MODIFIED_STRING"
  FROM   strings; 
  
 STRING               MODIFIED_STRING
-------------------- --------------------
Hello  World         Hello World
Hello        World   Hello World
Hello,   World  !    Hello, World !
```

下面的语句将驼峰字符串转换为包含下划线分隔的小写单词的字符串:

```sql
WITH strings as (
  SELECT 'AddressLine1' s FROM dual union all
  SELECT 'ZipCode' s FROM dual union all
  SELECT 'Country' s FROM dual  
)
  SELECT s "STRING",  
         lower(regexp_replace(s, '([A-Z0-9])', '_\1', 2)) "MODIFIED_STRING"
  FROM strings; 
  
  STRING               MODIFIED_STRING
-------------------- --------------------
AddressLine1         address_line_1
ZipCode              zip_code
Country              country
```

下面的语句转换日期格式:

```sql
WITH date_strings AS (
  SELECT  '2015-01-01' d from dual union all
  SELECT '2000-12-31' d from dual union all 
  SELECT '900-01-01' d from dual   
)
  SELECT d "STRING",
         regexp_replace(d, '([[:digit:]]+)-([[:digit:]]{2})-([[:digit:]]{2})', '\3.\2.\1') "MODIFIED_STRING"
  FROM date_strings;
  
  STRING               MODIFIED_STRING
-------------------- --------------------
2015-01-01           01.01.2015
2000-12-31           31.12.2000
900-01-01            01.01.900
```

下面的语句用 '1' 替换字符串中的所有字母:

```sql 
WITH strings as (
  SELECT 'NEW YORK' s FROM dual union all
  SELECT 'New York' s FROM dual union all
  SELECT 'new york' s FROM dual
)
  SELECT s "STRING",
        regexp_replace(s, '[a-z]', '1', 1, 0, 'i') "CASE_INSENSITIVE",
        regexp_replace(s, '[a-z]', '1', 1, 0, 'c') "CASE_SENSITIVE",
        regexp_replace(s, '[a-zA-Z]', '1', 1, 0, 'c') "CASE_SENSITIVE_MATCHING"
  FROM  strings;
  
  STRING     CASE_INSEN CASE_SENSI CASE_SENSI
---------- ---------- ---------- ----------
NEW YORK   111 1111   NEW YORK   111 1111
New York   111 1111   N11 Y111   111 1111
new york   111 1111   111 1111   111 1111
```

