---
tags:
    - linux
    - shell
    - regexp
---

# linux正则表达式 

!!! tip "Linux三剑客"
    - `grep` 文本过滤工具（过滤，查找文本内容）
    - `sed` stream editor 流编辑器 文本编辑工具（取行，修改文件内容）
    - `awk` 文本分析工具 格式化文本输出（取列，统计计算）

`regual expression regexp `

此处使用 `grep` 命令来学习正则表达式（grep命令可过滤匹配模式的内容）

> `grep` 命令基本语法：`grep pattern filename`    pattern 是匹配的模式 


## linux通配符和正则表达式

- 通配符是对文件进行匹配的；由shell解析，如`ls`、`cp`、`mv`、`find`等命令
- 正则表达式是对文件内容进行匹配的；正则表达式一般结合 `grep`、`sed`、`awk`使用

**常见通配符**

| 符号        | 描述                              |
| ----------- | --------------------------------- |
| *           | 匹配任意长度的任意字符            |
| ?           | 匹配任意单个字符                  |
| []          | 匹配指定范围内任意单个字符        |
| [^]         | 匹配指定范围外任意单个字符        |
| [[:upper:]] | 所有大写字母，等价于[A-Z]         |
| [[:lower:]] | 所有小写字母，等价于[a-z]         |
| [[:alpha:]] | 所有字母，等价于[a-zA-Z]          |
| [[:digit:]] | 所有数字，等价于[0-9]             |
| [[:alnum:]] | 所有数字和字母，等价于[0-9a-zA-Z] |
| [[:space:]] | 所有空白字符                      |
| [[:punct:]] | 所有标点符号                      |

???+ quote 
    [0-9] 表示任意一个数字 <br>
    [a-z] 表示任意一个小写字母 <br>
    [A-Z] 表示任意一个大写字母 <br>
    [0-9a-zA-Z] 表示任意一个数字或字母



*文件test.txt内容如下:*

```shell
[root@localhost ~]# cat test.txt 
You and me.
xxx is a hanhan. ^_^
longzhaoqianwowudunjiu.

He can speak english.
Are you kidding?

I think ...
youoy abba ccccc ddd
My phone number is 1872272****.
 vvv
```



### 通配符示例

```shell
# 查找当前目录下以数字命名的文件
[root@localhost ~]# find . -name [0-9]
[root@localhost ~]# find . -name [[:digit:]]

# 查找test.txt中包含数字的内容
[root@localhost ~]# grep '[[:digit:]]' test.txt

# 查找test.txt中标点符号以外的内容
[root@localhost ~]# grep '[^[:punct:]]' test.txt
```



## 基础元字符

| 元字符    | 含义                                                                           |
| --------- | ------------------------------------------------------------------------------ |
| ^         | ^a 以a开头的内容                                                               |
| $         | a$ 以a结尾的内容                                                               |
| ^$        | 空行（在linux的文本中，每一行的末尾会有默认的$符号 使用`cat -E file`可以看到） |
| .         | 任意一个字符 （非空行）                                                        |
| \         | 转义字符，让有特殊含义的字符脱掉马甲                                           |
| *         | 之前的字符连续0次或多次                                                        |
| .*        | 任意多个字符（匹配全部内容）                                                   |
| ^.*       | 以任意多个字符串开头，具有贪婪性                                               |
| [ab]      | 包含中括号中的任意一个字符（a或b）                                             |
| [^ab]     | 不包含^后的任意字符（a或b），对[ab]的取反                                      |
| \\<       | 词首                                                                           |
| \\>       | 词尾                                                                           |
| \\{n\\}   | 重复前面字符n次                                                                |
| \\{n,\\}  | 重复前面字符最少n次                                                            |
| \\{,m\\}  | 重复前面字符最多m次                                                            |
| \\{n,m\\} | 重复前面字符n次到m次（最少n次，最多m次）                                       | 



### 示例

```shell
# 查找所有以'Y'开头的行
[root@localhost ~]# grep '^Y' test.txt 

# 查找以'g'结尾的行 
[root@localhost ~]# grep 'g$' test.txt 

# 查找所有空行
[root@localhost ~]# grep '^$' test.txt

# 查找非空行 
[root@localhost ~]# grep '.' test.txt 

# 查找以'.'结尾的行
[root@localhost ~]# grep '\.$' test.txt 

# 查找连续出现0个或多个d的内容
[root@localhost ~]# grep 'd*' test.txt 

# 查找全部内容
[root@localhost ~]# grep '.*' test.txt 

# 以任意字符串开头并且包含d的内容 （贪婪匹配，会匹配到每行文本的最后一个d）
[root@localhost ~]# grep '^.*d' test.txt 

# 匹配l或x
[root@localhost ~]# grep '[lx]' test.txt 

# 不匹配l和x
[root@localhost ~]# grep '[^lx]' test.txt 

# 匹配l或x开头
[root@localhost ~]# grep '^[lx]' test.txt 

# 匹配单词speak
[root@localhost ~]# grep '\<speak\>' test.txt

# 匹配空格开头的内容
[root@localhost ~]# grep '^[[:space:]]' test.txt
[root@localhost ~]# grep '^[ ]' test.txt
```



## 扩展元字符

| 元字符 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| +      | 重复前一个字符1次或多次（至少1次），取出连续的字符或文本     |
| ?      | 重复前一个字符0次或1次（最多1次）                            |
| \|     | 表示或者同时过滤多个字符                                     |
| ()     | 分组，将（）里的内容当成一个整体，\n（n是一个数字） 表示引用第几个括号里的内容 |



### 示例

???+ quote 
    - 在基本表达式中，扩展正则表达式需要在前面使用 \ 进行转义
    - 使用 `egrep` 或 `grep -E` 来使用扩展正则表达式不需要使用\转义

```shell
# 包含连续一个或多个d  
[root@localhost ~]# grep 'd\+' test.txt 
[root@localhost ~]# egrep 'd+' test.txt 
[root@localhost ~]# grep -E 'd+' test.txt 

# 包含0次或1次d 
[root@localhost ~]# grep -E 'd?' test.txt 

# 匹配a或b
[root@localhost ~]# grep -E 'a|b' test.txt

# 匹配 'and' 或 'abb'
[root@localhost ~]# grep -E 'a(nd|bb)' test.txt

# 匹配两个相同的字母
[root@localhost ~]# grep -E '([a-z])\1' test.txt

# 重复d字符最少1次，最多2次
[root@localhost ~]# grep -E 'd{1,2}' test.txt
```



## 扩展：perl支持的其他常用元字符

| 元字符 | 解释                    |
| ------ | ----------------------- |
| \d     | 数字                    |
| \D     | 非数字                  |
| \w     | 数字，字母，下划线      |
| \W     | 非   数字、字母、下划线 |
| \s     | 空字符                  |
| \S     | 非空字符                |

> 使用 grep -P 可以支持 perl 正则表达式


### 示例

```shell
# 匹配所有的单词
[root@localhost ~] # grep -P '\w+' test.txt

# 匹配所有的非数字
[root@localhost ~] # grep -P '\D' test.txt
```
