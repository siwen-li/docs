---
tags:
  - sql/oracle
  - regexp
---

# REGEXP_COUNT

语法

![regexp_count函数语法](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/img/regexp_count.gif)

用途

`REGEXP_COUNT` 函数补充了 [[REGEXP_INSTR]] 函数的功能,它返回模式在源字符串中出现的次数。该函数使用字符集定义的字符来评估字符串。它返回一个整数,表示 `pattern` 出现的次数。如果未找到匹配,则该函数返回 0。

- `source_char` 是用作搜索值的字符表达式。它通常是一个字符列,可以是 `CHAR`、`VARCHAR2`、`NCHAR`、`NVARCHAR2`、`CLOB` 或 `NCLOB` 数据类型。

- `pattern` 是正则表达式。它通常是一个文本字面量,可以是 `CHAR`、`VARCHAR2`、`NCHAR` 或 `NVARCHAR2` 数据类型。它可以包含多达 512 个字节。如果 `pattern` 的数据类型与 `source_char` 的数据类型不同,则 Oracle 数据库会将 `pattern` 转换为 `source_char` 的数据类型。

  `REGEXP_COUNT` 忽略 `pattern` 中的子表达式括号。例如,模式 `'123(45)'` 等效于 `'12345'`。有关可以在 `pattern` 中指定的运算符的列表,请参阅 [[Oracle正则表达式支持]]。

- `position` 是一个正整数,指示 Oracle 应开始搜索 `source_char` 的字符位置。默认为 1,意味着 Oracle 从 `source_char` 的第一个字符开始搜索。在找到 `pattern` 的第一个匹配项之后,数据库会从第一个匹配项之后的第一个字符开始搜索第二个匹配项。

- `match_param` 是一个 `VARCHAR2` 或 `CHAR` 数据类型的字符表达式,它允许您更改函数的默认匹配行为。

  `match_param` 的值可以包含以下一个或多个字符:

  - `'i'` 指定不区分大小写的匹配,即使条件确定的整理是区分大小写的。
  - `'c'` 指定区分大小写和重音符号的匹配,即使条件确定的整理是不区分大小写或不区分重音符的。
  - `'n'` 允许句点(.)这个通配符匹配换行符。如果省略此参数,则句点不匹配换行符。
  - `'m'` 将源字符串视为多行。Oracle 会将插入符号(`^`)和美元符号(`$`)解释为源字符串中任意位置的行首和行尾,而不仅仅是整个源字符串的开始或结束。如果省略此参数,则 Oracle 将源字符串视为单行。
  - `'x'` 忽略空白字符。默认情况下,空白字符匹配它们本身。

  如果 `match_param` 的值包含多个相互矛盾的字符,则 Oracle 使用最后一个字符。例如,如果指定 `'ic'`,则 Oracle 使用区分大小写和重音符的匹配。如果该值包含上述字符之外的字符,则 Oracle 返回错误。

  如果省略 `match_param`,则:

  - 默认的大小写敏感性和重音符敏感性由 `REGEXP_COUNT` 函数确定的整理决定。
  - 句点(.)不匹配换行符。
  - 源字符串被视为单行。

另请参阅:  

[*Oracle 数据库全球化支持指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/sqlrf&id=NLSPG-GUID-AFCE41ED-775B-4A00-AF38-C436776AE0C5) 的附录 C,其中包含确定 `REGEXP_COUNT` 用于比较 `source_char` 与 `pattern` 的字符的整理规则。

示例

下面的示例显示了模式中的子表达式括号会被忽略:

```sql
SELECT REGEXP_COUNT('123123123123123', '(12)3', 1, 'i') REGEXP_COUNT
   FROM DUAL;

REGEXP_COUNT
------------
           5
```

在下面的示例中,该函数从第三个字符开始评估源字符串,因此跳过了第一个模式的出现:

```sql
SELECT REGEXP_COUNT('123123123123', '123', 3, 'i') COUNT FROM DUAL;

     COUNT
----------
         3
```

<br>

### REGEXP_COUNT 简单匹配:示例

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回字母字符的数量:

```sql
select regexp_count('ABC123', '[A-Z]'), regexp_count('A1B2C3', '[A-Z]') from dual;

REGEXP_COUNT('ABC123','[A-Z]') REGEXP_COUNT('A1B2C3','[A-Z]')  
------------------------------ ------------------------------
			     3				    3
```

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回字母字符后跟单个数字的数量:

```sql
select regexp_count('ABC123', '[A-Z][0-9]'), regexp_count('A1B2C3', '[A-Z][0-9]') from dual;
 
REGEXP_COUNT('ABC123','[A-Z][0-9]') REGEXP_COUNT('A1B2C3','[A-Z][0-9]')
----------------------------------- -----------------------------------
				 1				      3  
```

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回仅在字符串开头的字母字符后跟单个数字的数量:

```sql
select regexp_count('ABC123', '^[A-Z][0-9]'), regexp_count('A1B2C3', '^[A-Z][0-9]') from dual;

REGEXP_COUNT('ABC123','^[A-Z][0-9]') REGEXP_COUNT('A1B2C3','^[A-Z][0-9]')  
------------------------------------ ------------------------------------
				   0					1
```

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回仅包含在字符串中的字母字符后跟两个数字的数量:

```sql
select regexp_count('ABC123', '[A-Z][0-9]{2}'), regexp_count('A1B2C3', '[A-Z][0-9]{2}') from dual;

REGEXP_COUNT('ABC123','[A-Z][0-9]{2}') REGEXP_COUNT('A1B2C3','[A-Z][0-9]{2}')
-------------------------------------- --------------------------------------
				     1					    0
```

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回从字符串开头算起的前两个匹配中的字母字符后跟单个数字的数量:

```sql
select regexp_count('ABC12D3', '([A-Z][0-9]){2}'), regexp_count('A1B2C3', '([A-Z][0-9]){2}') from dual;  

REGEXP_COUNT('ABC12D3','([A-Z][0-9]){2}') REGEXP_COUNT('A1B2C3','([A-Z][0-9]){2}')
---------------------------------------- ----------------------------------------
                                       0                                        1
```

Live SQL:

您可以在 Oracle Live SQL 上查看并运行相关示例 [*REGEXP_COUNT简单匹配*](https://livesql.oracle.com/apex/livesql/docs/sqlrf/regexp_count/simple-match.html)

<br>

### REGEXP_COUNT 高级匹配:示例

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回字母字符的数量:

```sql
select regexp_count('ABC123', '[A-Z]') Match_char_ABC_count,  
regexp_count('A1B2C3', '[A-Z]') Match_char_ABC_count from dual;

MATCH_CHAR_ABC_COUNT MATCH_CHAR_ABC_COUNT
-------------------- --------------------
		 3			3
```

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回字母字符后跟单个数字的数量: 

```sql
select regexp_count('ABC123', '[A-Z][0-9]') Match_string_C1_count,
regexp_count('A1B2C3', '[A-Z][0-9]')  Match_strings_A1_B2_C3_count from dual;

MATCH_STRING_C1_COUNT MATCH_STRINGS_A1_B2_C3_COUNT  
--------------------- ----------------------------
		    1				 3
```

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回仅在字符串开头的字母字符后跟单个数字的数量:

```sql
select regexp_count('ABC123A5', '^[A-Z][0-9]') Char_num_like_A1_at_start,
regexp_count('A1B2C3', '^[A-Z][0-9]') Char_num_like_A1_at_start from dual;  

CHAR_NUM_LIKE_A1_AT_START CHAR_NUM_LIKE_A1_AT_START
------------------------- -------------------------
			0			  1
```

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回仅包含在字符串中的字母字符后跟两个数字的数量:

```sql  
select regexp_count('ABC123', '[A-Z][0-9]{2}') Char_num_like_A12_anywhere,
regexp_count('A1B2C34', '[A-Z][0-9]{2}') Char_num_like_A12_anywhere from dual;

CHAR_NUM_LIKE_A12_ANYWHERE CHAR_NUM_LIKE_A12_ANYWHERE
-------------------------- --------------------------
			 1			    1
```

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回从字符串开头算起的前两个匹配中的字母字符后跟单个数字的数量:

```sql
select regexp_count('ABC12D3', '([A-Z][0-9]){2}') Char_num_within_2_places,  
regexp_count('A1B2C3', '([A-Z][0-9]){2}') Char_num_within_2_places from dual;

CHAR_NUM_WITHIN_2_PLACES CHAR_NUM_WITHIN_2_PLACES    
------------------------ ------------------------
		       0			1
```

Live SQL:

您可以在 Oracle Live SQL 上查看并运行相关示例 [*REGEXP_COUNT高级匹配*](https://livesql.oracle.com/apex/livesql/docs/sqlrf/regexp_count/advanced-match.html)

<br>

### REGEXP_COUNT 区分大小写匹配:示例

下面的语句创建表 regexp_temp 并向其中插入值:

```sql
CREATE TABLE regexp_temp(empName varchar2(20));

INSERT INTO regexp_temp (empName) VALUES ('John Doe');
INSERT INTO regexp_temp (empName) VALUES ('Jane Doe'); 
```

在下面的示例中,该语句查询员工姓名列,并搜索小写字母 ‘E’:

```sql
SELECT empName, REGEXP_COUNT(empName, 'e', 1, 'c') "CASE_SENSITIVE_E" From regexp_temp;

EMPNAME	     CASE_SENSITIVE_E
-------------------- ----------------  
John Doe		    1
Jane Doe		    2
```

在下面的示例中,该语句查询员工姓名列,并搜索小写字母 ‘O’:

```sql
SELECT empName, REGEXP_COUNT(empName, 'o', 1, 'c') "CASE_SENSITIVE_O" From regexp_temp;

EMPNAME	     CASE_SENSITIVE_O
-------------------- ----------------
John Doe		    2  
Jane Doe		    1
```

在下面的示例中,该语句查询员工姓名列,并搜索小写或大写字母 ‘E’:

```sql
SELECT empName, REGEXP_COUNT(empName, 'E', 1, 'i') "CASE_INSENSITIVE_E" From regexp_temp;

EMPNAME	     CASE_INSENSITIVE_E
-------------------- ------------------   
John Doe		      1
Jane Doe		      2
```

在下面的示例中,该语句查询员工姓名列,并搜索小写字符串 ‘DO’:

```sql 
SELECT empName, REGEXP_COUNT(empName, 'do', 1, 'i') "CASE_INSENSITIVE_STRING" From regexp_temp;

EMPNAME	     CASE_INSENSITIVE_STRING  
-------------------- -----------------------
John Doe		   1
Jane Doe		   1
```

在下面的示例中,该语句查询员工姓名列,并搜索小写或大写字符串 ‘AN’:

```sql
SELECT empName, REGEXP_COUNT(empName, 'an', 1, 'c') "CASE_SENSITIVE_STRING" From regexp_temp;

EMPNAME	     CASE_SENSITIVE_STRING
-------------------- ---------------------    
John Doe		 0
Jane Doe		 1
```

