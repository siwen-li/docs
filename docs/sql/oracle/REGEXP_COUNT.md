---
tags:
  - sql
  - oracle
  - regexp
---

# REGEXP_COUNT

## 语法

![regexp_count函数语法](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/img/regexp_count.gif)

=== "用途"
    !!! note annotate "用途"

        `REGEXP_COUNT` 函数补充了 [REGEXP_INSTR](./REGEXP_INSTR.md) 函数的功能,它返回模式在源字符串中出现的次数。该函数使用字符集定义的字符来评估字符串。它返回一个整数,表示 `pattern` 出现的次数。如果未找到匹配,则该函数返回 0。 (1)

    1.  :man_tipping_hand: `REGEXP_COUNT` 忽略 `pattern` 中的子表达式括号。


=== "参数说明"
    !!! Abstract annotate "参数"

        - `source_char` 是用作搜索值的字符表达式，通常是一个字符列。 
        - `pattern` 是正则表达式，通常是一个文本字面量。
        - `position` 是一个正整数,指示 Oracle 应开始搜索 `source_char` 的字符位置。默认为 1。 
        - `match_param` 指定匹配规则。 (1)  

    1.  :man_tipping_hand: `match_param` 的值可以包含以下一个或多个字符:
        - `'i'` 指定不区分大小写的匹配。
        - `'c'` 指定区分大小写和重音符号的匹配。
        - `'n'` 允许句点(.)这个通配符匹配换行符。
        - `'m'` 将源字符串视为多行。
        - `'x'` 忽略空白字符。
        如果 `match_param` 的值包含多个相互矛盾的字符,则 Oracle 使用最后一个字符。
        如果省略 `match_param`,则:
        > 默认的大小写敏感性和重音符敏感性由 `pattern` 决定。<br>
        > 句点(.)不匹配换行符。<br>
        > 源字符串被视为单行。


## 示例

下面的示例显示了模式中的子表达式括号会被忽略:

```sql 
select REGEXP_COUNT('123123123123123', '(12)3', 1, 'i') REGEXP_COUNT
from DUAL;

REGEXP_COUNT
------------
           5
```

在下面的示例中,该函数从第三个字符开始评估源字符串,因此跳过了第一个模式的出现:

```sql
select REGEXP_COUNT('123123123123', '123', 3, 'i') COUNT 
from DUAL;

     COUNT
----------
         3
```

<br>

### REGEXP_COUNT 简单匹配:示例

在下面的示例中,`REGEXP_COUNT` 验证提供的字符串是否符合给定的模式,并返回字母字符的数量:

```sql
select regexp_count('ABC123', '[A-Z]')
      ,regexp_count('A1B2C3', '[A-Z]') 
from dual;

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

