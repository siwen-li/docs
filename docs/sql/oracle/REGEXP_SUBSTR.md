---
tags:
  - sql/oracle
  - regexp
---

# REGEXP_SUBSTR

语法

![REGEXP_SUBSTR函数语法](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/img/regexp_substr.gif)

用途

`REGEXP_SUBSTR` 通过允许您在字符串中搜索正则表达式模式来扩展 `SUBSTR` 函数的功能。它与 `REGEXP_INSTR` 也类似,但是它返回匹配子字符串本身,而不是返回子字符串的位置。如果你需要匹配字符串的内容但不需要它在源字符串中的位置,这个函数很有用。该函数以与 `source_char` 相同的字符集返回字符串,为 `VARCHAR2` 或 `CLOB` 数据类型。

此函数符合 POSIX 正则表达式标准和 Unicode 正则表达式准则。有关更多信息,请参阅 [[Oracle正则表达式支持]]。

- `source_char` 是字符表达式,用作搜索值。它通常是一个字符列,可以是 `CHAR`、`VARCHAR2`、`NCHAR`、`NVARCHAR2`、`CLOB` 或 `NCLOB` 数据类型。

- `pattern` 是正则表达式。它通常是一个文本字面量,可以是 `CHAR`、`VARCHAR2`、`NCHAR` 或 `NVARCHAR2` 数据类型。它可以包含多达 512 个字节。如果 `pattern` 的数据类型与 `source_char` 的数据类型不同,则 Oracle 数据库会将 `pattern` 转换为 `source_char` 的数据类型。有关可以在 `pattern` 中指定的运算符列表,请参阅 [[Oracle正则表达式支持]]。

- `position` 是一个正整数,指示 Oracle 应开始搜索 `source_char` 的字符位置。默认值为 1,表示 Oracle 从 `source_char` 的第一个字符开始搜索。

- `occurrence` 是一个正整数,指示 Oracle 应在 `source_char` 中搜索 `pattern` 的第几次出现。默认值为 1,表示 Oracle 搜索 `pattern` 的第一次出现。

  如果 `occurrence` 大于 1,则数据库会从第一个 `pattern` 匹配之后的第一个字符开始搜索第二次出现,依此类推。此行为不同于 `SUBSTR` 函数,后者从第一个匹配的第二个字符开始搜索第二次出现。

- `match_param` 是 `VARCHAR2` 或 `CHAR` 数据类型的字符表达式,它允许您更改函数的默认匹配行为。 此参数对此函数的行为与 `REGEXP_COUNT` 中的行为相同。 有关详细信息,请参阅 [[REGEXP_COUNT]]。

- 对于具有子表达式的 `pattern`,`subexpr` 是一个非负整数,范围从 0 到 9,用于指示函数应返回 `pattern` 中的哪个子表达式。 此参数具有与 `REGEXP_INSTR` 函数相同的语义。 有关更多信息,请参阅 [[REGEXP_INSTR]]。

另请参阅:

- [SUBSTR](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SUBSTR.html#GUID-C8A20B57-C647-4649-A379-8651AA97187E) 和 [[REGEXP_INSTR]]
- [[REGEXP_REPLACE]] 和 [[REGEXP_LIKE#REGEXP_LIKE 条件|REGEXP_LIKE 条件]]
- [*Oracle 数据库全球化支持指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/sqlrf&id=NLSPG-GUID-AFCE41ED-775B-4A00-AF38-C436776AE0C5) 的附录 C,其中包含确定 `REGEXP_SUBSTR` 用于比较 `source_char` 中的字符与 `pattern` 中的字符的整理规则,以及确定此函数的字符返回值的派生整理规则

### 示例 

下面的示例检查字符串,查找第一个以逗号括起来的子字符串。Oracle 数据库搜索以逗号开头后跟一个或多个非逗号字符最后以逗号结尾的字符串。Oracle 返回子字符串,包括前导逗号和尾随逗号。

```sql
SELECT
  REGEXP_SUBSTR('500 Oracle Parkway, Redwood Shores, CA', 
                ',[^,]+,') "REGEXPR_SUBSTR"
  FROM DUAL;
  
REGEXPR_SUBSTR
-----------------
, Redwood Shores,
```

下面的示例检查字符串,查找 `http://` 后跟一个或多个字母数字字符的子字符串,可选地后跟一个句点(.)。 Oracle 在 `http://` 和斜杠 (`/`) 或字符串末尾之间搜索此子字符串的最小 3 次和最大 4 次出现。

```sql
SELECT
  REGEXP_SUBSTR('http://www.example.com/products',
                'http://([[:alnum:]]+\.?){3,4}/?') "REGEXP_SUBSTR"
  FROM DUAL;
  
----------------------
http://www.example.com/
```

下两个示例使用 `subexpr` 参数返回 `pattern` 的特定子表达式。第一个语句返回 `pattern` 中的第一个子表达式:

```sql
SELECT REGEXP_SUBSTR('1234567890', '(123)(4(56)(78))', 1, 1, 'i', 1)  
"REGEXP_SUBSTR" FROM DUAL;

REGEXP_SUBSTR
-------------------
123
```

下一个语句返回 `pattern` 中的第四个子表达式:

```sql 
SELECT REGEXP_SUBSTR('1234567890', '(123)(4(56)(78))', 1, 1, 'i', 4)
"REGEXP_SUBSTR" FROM DUAL;

REGEXP_SUBSTR
-------------------
78
```

### REGEXP_SUBSTR 模式匹配:示例

下面的语句创建表 regexp_temp 并插入值:

```sql
CREATE TABLE regexp_temp(empName varchar2(20), emailID varchar2(20));

INSERT INTO regexp_temp (empName, emailID) VALUES ('John Doe', 'johndoe@example.com'); 
INSERT INTO regexp_temp (empName, emailID) VALUES ('Jane Doe', 'janedoe');
```

在下面的示例中,该语句查询邮箱列并搜索有效的邮箱地址:

```sql
SELECT empName, REGEXP_SUBSTR(emailID, '[[:alnum:]]+\@[[:alnum:]]+\.[[:alnum:]]+') "Valid Email" FROM regexp_temp;
```

在下面的示例中,该语句查询邮箱列并返回有效邮箱地址的数量:

```sql
SELECT empName, REGEXP_SUBSTR(emailID, '[[:alnum:]]+\@[[:alnum:]]+\.[[:alnum:]]+') "Valid Email", REGEXP_INSTR(emailID, '\w+@\w+(\.\w+)+') "FIELD_WITH_VALID_EMAIL" FROM regexp_temp;

EMPNAME  Valid Email
-------- -------------------
John Doe johndoe@example.com
Jane Doe
```

在下面的示例中,从字符串中提取数字和字母:

```sql
with strings as (
  select 'ABC123' str from dual union all
  select 'A1B2C3' str from dual union all
  select '123ABC' str from dual union all
  select '1A2B3C' str from dual   
)
  select regexp_substr(str, '[0-9]') First_Occurrence_of_Number,
         regexp_substr(str, '[0-9].*') Num_Followed_by_String,  
         regexp_substr(str, '[A-Z][0-9]') Letter_Followed_by_String
  from strings; 
  
FIRST_OCCURRENCE_OF_NUMB NUM_FOLLOWED_BY_STRING   LETTER_FOLLOWED_BY_STRIN
------------------------ ------------------------ ------------------------
1			 123			  C1
1			 1B2C3			  A1
1			 123ABC
1			 1A2B3C 		  A2
```

在下面的示例中,从字符串中提取乘客姓名和航班信息:

```sql
with strings as (   
  select 'LHRJFK/010315/JOHNDOE' str from dual union all
  select 'CDGLAX/050515/JANEDOE' str from dual union all
  select 'LAXCDG/220515/JOHNDOE' str from dual union all
  select 'SFOJFK/010615/JANEDOE' str from dual   
)
  SELECT regexp_substr(str, '[A-Z]{6}') String_of_6_characters,  
         regexp_substr(str, '[0-9]+') First_Matching_Numbers,
         regexp_substr(str, '[A-Z].*$') Letter_by_other_characters,      
         regexp_substr(str, '/[A-Z].*$') Slash_letter_and_characters
  FROM strings;
  
STRING_OF_6_CHARACTERS	FIRST_MATCHING_NUMBERS	LETTER_BY_OTHER_CHARACTERS	SLASH_LETTER_AND_CHARACTERS
----------------------	----------------------	--------------------------	---------------------------
LHRJFK	                010315	                LHRJFK/010315/JOHNDOE	      	/JOHNDOE
CDGLAX	                050515	                CDGLAX/050515/JANEDOE	      	/JANEDOE
LAXCDG	                220515	                LAXCDG/220515/JOHNDOE	      	/JOHNDOE
SFOJFK	                010615	                SFOJFK/010615/JANEDOE       	/JANEDOE
```

