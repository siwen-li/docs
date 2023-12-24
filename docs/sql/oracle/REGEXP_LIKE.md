---
tags:
  - sql/oracle
  - regexp
---

# 模式匹配条件

模式匹配条件用于比较字符数据。

## LIKE 条件

`LIKE` 条件指定了一个涉及模式匹配的测试。相比等号运算符(`=`)精确匹配两个字符值,`LIKE` 条件通过在第一个值中搜索由第二个值指定的模式,来匹配第一个值的一部分与另一个值。`LIKE` 使用输入字符集定义的字符计算字符串。`LIKEC` 使用 Unicode 完整字符。`LIKE2` 使用 UCS2 代码点。`LIKE4` 使用 UCS4 代码点。

*like_condition*::=

![like_condition语法](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/img/like_condition.gif)

其中:

- *`char1`* 是字符表达式,比如字符列,称为**搜索值**。
- *`char2`* 是字符表达式,通常是字面量,称为**模式**。
- *`esc_char`* 是字符表达式,通常是字面量,称为**转义字符**。

在大多数情况下,`LIKE` 是最好的选择。使用以下准则确定任何变体在您的环境中是否有用:

- 使用 `LIKE2` 以 UCS-2 语义处理字符串。`LIKE2` 将 Unicode supplementary字符视为两个字符。
- 使用 `LIKE4` 以 UCS-4 语义处理字符串。`LIKE4` 将 Unicode supplementary字符视为一个字符。
- 使用 `LIKEC` 以 Unicode 完整字符语义处理字符串。`LIKEC` 将复合字符视为一个字符。

有关字符长度的更多信息,请参见:

- [*Oracle 数据库全球化支持指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/sqlrf&id=NLSPG435)
- [*Oracle 数据库 SecureFiles 和大对象开发人员指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/sqlrf&id=ADLOB45586)

如果不指定 *`esc_char`*,则没有默认转义字符。如果 *`char1`*、*`char2`* 或 *`esc_char`* 中的任何一个为 null,则结果未知。否则,转义字符(如果指定)必须是一个长度为 1 的字符字符串。

所有字符表达式(*`char1`*、*`char2`* 和 *`esc_char`*)都可以是 `CHAR`、`VARCHAR2`、`NCHAR` 或 `NVARCHAR2` 中的任何一种数据类型。如果它们不同,Oracle 会将它们都转换为 *`char1`* 的数据类型。

模式可以包含特殊的模式匹配字符:

- 模式中的下划线(_)与值中的确切一个字符(与多字节字符集中的一个字节相对)匹配。
- 模式中的百分号(%)可以匹配值中任意字符串中的零个或多个字符(与多字节字符集中的字节相对)。模式'%'不能匹配 null。

您可以通过使用 `ESCAPE` 子句来实际包含 `%` 或 `_` 模式中的字符,`ESCAPE` 子句标识转义字符。 如果转义字符在模式中出现在 `%` 或 `_` 之前,则 Oracle 会将这个字符解释为字面意义上的模式,而不是特殊的模式匹配字符。 您还可以通过重复它来搜索转义字符本身。 例如,如果 @ 是转义字符,那么您可以使用 @@ 来搜索 @。

注意: 只有与 ASCII 等效的下划线(_)和百分比(%)字符才被识别为模式匹配字符。它们的全角变体,存在于东亚字符集和 Unicode 中,会被视为普通字符。

下表描述了 `LIKE` 条件:

| 条件类型                      | 操作                                                         | 示例                                                         |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `x [NOT] LIKE y [ESCAPE 'z']` | 如果 *`x`* [不]匹配模式 *`y`* 则为`TRUE`。在 *`y`* 中,字符 `%` 匹配除 null 之外的任意零个或多个字符的字符串。字符 `_` 匹配任意单个字符。`ESCAPE` 后面可以跟任意字符,除了百分号(%)和下划线(_)。 如果转义字符在模式中出现在通配符之前,则将通配符视为字面值而不是通配符。 | `SELECT last_name FROM employees WHERE last_name LIKE '%A\_B%' ESCAPE '\' ORDER BY last_name;` |

为了处理 `LIKE` 条件,Oracle 将模式划分为由一个或两个字符组成的子模式。 两个字符的子模式以转义字符开头,另一个字符是 %、_ 或转义字符。

设 P1、P2、...、Pn 为这些子模式。如果存在一种方法可以将搜索值划分为子字符串 S1、S2、...、Sn,使得对于 1 和 n 之间的所有 i:

- 如果 Pi 是 _,那么 Si 是单个字符。
- 如果 Pi 是 %,那么 Si 是任意字符串。
- 如果 Pi 是以转义字符开头的两个字符,那么 Si 是 Pi 的第二个字符。
- 否则,Pi = Si。

那么像条件为真。

使用 `LIKE` 条件,您可以将一个值与一个模式进行比较,而不是与一个常量。 模式必须出现在 `LIKE` 关键字之后。例如,您可以发出以下查询来查找名字以 `R` 开头的所有员工的薪水:

```sql
SELECT salary  
FROM employees
WHERE last_name LIKE 'R%'
ORDER BY salary;
```

下面的查询使用 = 运算符而不是 `LIKE` 条件来查找名字为 'R%' 的所有员工的薪水:

```sql   
SELECT salary
FROM employees
WHERE last_name = 'R%'  
ORDER BY salary;
```

以下查询查找所有名字为“SM%”的员工的薪水。Oracle 将 'SM%' 解释为文本字面量,而不是模式,因为它在 `LIKE` 关键字之前:

```sql
SELECT salary
FROM employees 
WHERE 'SM%' LIKE last_name
ORDER BY salary;
```

整理和大小写敏感性

`LIKE` 条件区分大小写。Oracle Database 使用上面处理算法中从 *`char1`* 和 *`char2`* 派生的整理来比较子模式 Pi 和子字符串 Si。如果此整理不区分大小写,则模式匹配也不区分大小写。

参见:

[*Oracle 数据库全球化支持指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/sqlrf&id=NLSPG0051) 了解有关不区分大小写和重音符号的整理以及 `LIKE` 条件的整理确定规则的更多信息。

<br>

### 索引列上的模式匹配

当您使用 `LIKE` 在索引列上搜索模式时,如果模式中的首字符不是 `%` 或 `_`,Oracle 可以通过该首字符扫描索引来提高查询性能。在这种情况下,Oracle 可以通过该首字符扫描索引。如果模式中的第一个字符是 `%` 或 `_`,则索引无法改进性能,因为 Oracle 无法扫描索引。

#### LIKE 条件:常规示例

当 `last_name` 值以 `Ma` 开头时,此条件为真:

```
last_name LIKE 'Ma%'
```

所有这些 `last_name` 值都使条件为真:

```
Mallin, Markle, Marlow, Marvins, Mavris, Matos
```

大小写区分,所以以 `MA`、`ma` 和 `mA` 开头的 `last_name` 值使条件为假。

考虑这个条件:

```
last_name LIKE 'SMITH_'
```

对于这些 `last_name` 值,该条件为真:

```
SMITHE, SMITHY, SMITHS
```

对于 `SMITH` 条件为假,因为特殊的下划线字符 (`_`) 必须与 `last_name` 值的确切一个字符匹配。

### 转义子句示例

以下示例搜索名称中包含 `A_B` 模式的员工:

```sql
SELECT last_name
FROM employees 
WHERE last_name LIKE '%A\_B%' ESCAPE '\'
ORDER BY last_name;
```

`ESCAPE` 子句将反斜杠 (\) 标识为转义字符。 在模式中,转义字符出现在下划线 (_) 之前。 这会导致 Oracle 将下划线字面解释,而不是将其解释为特殊的模式匹配字符。

**不含 % 的模式示例**

如果一个模式不包含 `%` 字符,则只有当两个操作数具有相同的长度时,条件才能为真。考虑这个表的定义和插入到其中的值:

```sql
CREATE TABLE ducks (f CHAR(6), v VARCHAR2(6));

INSERT INTO ducks VALUES ('DUCK', 'DUCK'); 

SELECT '*'||f||'*' "char",  
       '*'||v||'*' "varchar"
FROM ducks;

char     varchar
-------- --------
*DUCK  * *DUCK*
```

因为 Oracle 使用空格填充 `CHAR` 值,所以 `f` 的值为 6 个字节长度的空格填充。`v` 没有空格填充,长度为 4。

<br>

## REGEXP_LIKE 条件

`REGEXP_LIKE` 与 `LIKE` 条件类似,但是 `REGEXP_LIKE` 执行正则表达式匹配而不是 `LIKE` 执行的简单模式匹配。 此条件使用输入字符集定义的字符来评估字符串。

此条件符合 POSIX 正则表达式标准和 Unicode 正则表达式准则。 有关更多信息,请参阅 [[Oracle正则表达式支持]]。

*regexp_like_condition*::=

![regexp_like_condition语法](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/img/regexp_like_condition.gif)

- *`source_char`* 是字符表达式,充当搜索值。它通常是一个字符列,可以是 `CHAR`、`VARCHAR2`、`NCHAR`、`NVARCHAR2`、`CLOB` 或 `NCLOB` 数据类型。

- *`pattern`* 是**正则表达式**。它通常是一个文本字面量,可以是 `CHAR`、`VARCHAR2`、`NCHAR` 或 `NVARCHAR2` 数据类型。它可以包含多达 512 个字节。如果 *`pattern`* 的数据类型与 *`source_char`* 的数据类型不同,Oracle 会将 *`pattern`* 转换为 *`source_char`* 的数据类型。有关可以在 *`pattern`* 中指定的运算符列表,请参阅 [[Oracle正则表达式支持]]。

- *`match_param`* 是 `VARCHAR2` 或 `CHAR` 数据类型的字符表达式,它允许您更改条件的默认匹配行为。

  *`match_param`* 的值可以包含以下一个或多个字符:

  - `'i'` 指定不区分大小写的匹配,即使条件确定的整理是区分大小写的。
  - `'c'` 指定区分大小写和重音符号的匹配,即使条件确定的整理是不区分大小写或不区分重音符的。
  - `'n'` 允许句点(.)这个通配符匹配换行符。如果省略此参数,则句点不匹配换行符。
  - `'m'` 将源字符串视为多行。Oracle 会将插入符号(`^`)和美元符号(`$`)解释为源字符串中任意位置的行首和行尾,而不仅仅是整个源字符串的开始或结束。如果省略此参数,则 Oracle 将源字符串视为单行。
  - `'x'` 忽略空白字符。默认情况下,空白字符匹配它们本身。

  如果 *`match_param`* 的值包含多个相互矛盾的字符,则 Oracle 使用最后一个字符。例如,如果指定 `'ic'`,则 Oracle 使用区分大小写和重音符的匹配。如果该值包含上述字符之外的字符,则 Oracle 返回错误。

  如果省略 *`match_param`*,则:

  - 默认的大小写敏感性和重音符敏感性由 `REGEXP_LIKE` 条件确定的整理决定。
  - 句点(.)不匹配换行符。
  - 源字符串被视为单行。

与 `LIKE` 条件类似,`REGEXP_LIKE` 条件也区分大小写。

参见:

- [[#LIKE 条件]]
- [[REGEXP_INSTR]]、[[REGEXP_REPLACE]] 和 [[REGEXP_SUBSTR]] 这些函数提供正则表达式支持
- [*Oracle 数据库全球化支持指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/sqlrf&id=NLSPG-GUID-AFCE41ED-775B-4A00-AF38-C436776AE0C5) 的附录 C,其中包含 `REGEXP_LIKE` 条件的整理确定规则

### 示例

下面的查询返回第一个名字为 Steven 或 Stephen(其中 `first_name` 以 `Ste` 开头并以 `en` 结尾,中间是 `v` 或 `ph`)的员工的名字和姓:

```sql
SELECT first_name, last_name
FROM employees
WHERE REGEXP_LIKE (first_name, '^Ste(v|ph)en$')  
ORDER BY first_name, last_name;

FIRST_NAME           LAST_NAME
-------------------- -------------------------
Steven               King
Steven               Markle
Stephen              Stiles
```

下面的查询返回姓中包含两个相邻的 `a`、`e`、`i`、`o` 或 `u` 的员工的姓(不区分大小写):

```sql
SELECT last_name   
FROM employees
WHERE REGEXP_LIKE (last_name, '([aeiou])\1', 'i')
ORDER BY last_name;

LAST_NAME
-------------------------
De Haan
Greenberg
Khoo
Gee
Greene
Lee
Bloom
Feeney
```
