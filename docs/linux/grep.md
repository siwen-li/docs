# grep 文本过滤工具

=== "说明"
    !!! note "说明"
        `grep` (global search regular expression(RE)and print out the line,全面搜索正则表达式并把行打印出来）是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。用于过滤搜索的特定字符。可使用正则表达式，能多种命令配合使用，使用上十分灵活。

=== "语法"
    !!! abstract "语法"
        ```shell
        grep [OPTION...] PATTERNS [FILE...] <br>
        grep [OPTION...] -e PATTERNS ... [FILE...] <br>
        grep [OPTION...] -f PATTERN_FILE ... [FILE...] 
        ```


  
## grep 命令选项

| 选项   | 作用                                               |
| ------ | -------------------------------------------------- |
| **-c** | 统计文件中匹配的行数                               |
| **-i** | 忽略模式中的字母大小写                             |
| **-n** | 列出所有的匹配行，并显示行号                       |
| **-v** | 列出没有匹配模式的行，取反                         |
| **-e** | 多个选项间的逻辑或                                 |
| -o     | 只显示被模式匹配到内容                             |
| -l     | 列出带有匹配内容的文件名                           |
| -w     | 匹配整个单词                                       |
| -q     | 静默模式，不输出任何信息                           |
| -r     | 递归搜索                                           |
| -f     | 根据文件内容匹配多个（文件中逐行写出要匹配的内容） |
| -A     | after,后n行（被匹配到的行及后n行）                 |
| -B     | before,前n行（被匹配到的行及前n行）                |
| -C     | context，前后各n行（被匹配到的行及前后各n行）      |
| **-E** | 使用扩展的正则表达式，相当于 egrep                 |
| -F     | 相当于fgrep，不支持正则表达式                      |
| -P     | 使用 perl 正则表达式                               |

> 使用帮助命令可查看全部选项（grep --help  或  man grep）

???+ tip 
    - `grep` 使用“标准正则表达式”作为匹配标准
    - `egrep` 扩展的grep命令，相当于 `grep -E` ，使用扩展正则表达式作为匹配标准
    - `fgrep` 简化版的grep命令，不支持正则表达式，但搜索速度快，系统资源使用率低



## 示例

```shell
# 统计空行的行数
[root@localhost ~]# grep -c '^$' test.txt

# 包含字符h的行（不区分大小写）
[root@localhost ~]# grep -i 'h' test.txt

# 列出所有空行 并显示行号
[root@localhost ~]# grep -n '^$' test.txt

# 列出所有非空行
[root@localhost ~]# grep -v '^$' test.txt

# 列出所有以S开头的行和空行
[root@localhost ~]# grep -e '^$' -e '^S' test.txt 

# 过滤所有的数字 只显示被匹配到的内容
[root@localhost ~]# grep -o '[0-9]' test.txt 

# 列出内容包含a的文件名
[root@localhost ~]# grep -l 'a' demo.txt test.txt pwd.txt

# 匹配包含单词you的行
[root@localhost ~]# grep -w 'you' test.txt 

# 根据file里面的范文进行匹配
[root@localhost ~]# grep -f file test.txt 

# 列出包含can的行以及其后三行 
[root@localhost ~]# grep -A3 'can' test.txt  

# 列出包含can的行以及其前三行 
[root@localhost ~]# grep -B3 'can' test.txt  

# 列出包含can的行以及其前后各三行 
[root@localhost ~]# grep -C3 'can' test.txt  

# 重复d字符最少2次
[root@localhost ~]# grep -E 'd{2,}' test.txt
```
