---
tags:
  - linux
---

# awk 编程

## awk 运算符

### 算术运算符

| 运算符        | 描述                             |
| ------------- | -------------------------------- |
| +  -  *  /  % | 加  减  乘  除  取余             |
| ^  **         | 求幂                             |
| ++  --        | 自增  自减  （可作为前缀或后缀） |



### 赋值运算符

| 运算符                         | 描述                                    |
| ------------------------------ | --------------------------------------- |
| =  +=  -=  \*=  /=  %=  ^=  \*\*= | 赋值语句（a+=b 等价于 a=a+b，其他类似） |



### 关系运算符

| 运算符               | 描述                                 |
| -------------------- | ------------------------------------ |
| >  <  >=  <=  !=  == | 比较语句（成立返回真，不成立返回假） |



### 逻辑运算符

| 运算符 | 描述                     |
| ------ | ------------------------ |
| \|\|   | 逻辑或（有真则真）       |
| &&     | 逻辑与（有假则假）       |
| !      | 逻辑非（真变假，假变真） |



### 正则运算符

| 运算符 | 描述             |
| ------ | ---------------- |
| ~      | 匹配正则表达式   |
| !~     | 不匹配正则表达式 |



### 其他运算符

| 运算符 | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| $      | 字段引用                                                     |
| 空格   | 字符串连接符                                                 |
| in     | 数组成员迭代符（一般和for循环一起，用于遍历数组）            |
| ? :    | 三目运算符（和C语言一样：  `表达式 ? 语句1 : 语句2`   表达式成立，执行语句1，否则执行语句2) |



## awk 流程控制语句   

### 条件判断语句

```shell
# if
if(表达式)
	语句
	
# if-else
if(表达式)
	语句1
else
	语句2 
	
# if-else-if
if(表达式)
	语句1 
else if (表达式2)
	语句2 
else
	语句3 
```

> awk 分支结构允许嵌套，为了方便判断和阅读，可以将多个语句用{}括起来



### 循环语句

- 三大循环语句

```shell
# while循环
while(表达式){
	语句
}

# for循环
# 格式1
for(初始变量;循环判断语句;循环遍历递增/递减语句){
	语句
}

# 格式2 
for(变量 in 数组){
	语句
}

# do-while循环
do{
	语句
} while(条件)
```

???+ tip "循环流程改变语句"
    - `break；`  退出循环
    - `continue; `  跳过本次循环
    - `exit status_code;`   `exit` 语句用于停止脚本的执行（若有 `END` 则是转移到 `END` ），接受一个整数参数作为 `awk` 进程的退出状态码，如未提供参数，则默认为 0（ `$?` 可以查看）



## awk 数组

> 数组是awk的灵魂，处理文本中常常会用到数组处理

`awk` 数组特性：

- `awk` 数组的下标可以是数字，也可以是字符串，因此，`awk` 中数组是关联数组
- 在内部， `awk` 数组的索引全都是字符串，即使是数值索引在使用时内部也会转换成字符串
- `awk` 的数组元素的顺序和元素插入时的顺序不一定相同
- `awk` 中的数组不必提前声明，也不用声明大小
- 数组元素会根据上下文使用0或空字符串来初始化



### 创建（添加、修改）数组

语法：`数组名[下标] = 值`

- 给数组添加/修改元素的语法和创建数组一样



### 访问数组元素

语法：`数组名[下标]`



### 删除数组元素

语法：`delete 数组名[下标]`  

- 删除不存在的元素不会报错
- `delete 数组名`可以直接删除数组所有元素



### 数组相关函数

- `length(arr)`  获取数组长度

- `asort(arr) `  对数组进行排序，并返回数组长度

- `split(str,arr,sep)`  分割字符串为数组，并返回数组长度

  > 生成的awk数组下标从1开始，和C语言数组不一样

```shell
[root@localhost ~]# awk 'BEGIN{str="a,b,c,d";len=split(str,arr,",");print len,length(arr),asort(arr),arr[1]}'
4 4 4 a
```


### 遍历数组

```shell
# 方式1
[root@localhost ~]# awk 'BEGIN{
str="a,b,c,d";
len=split(str,arr,",");
for(i in arr){
print i,arr[i];
}
}'
1 a
2 b
3 c
4 d

# 方式2 （awk数组是关联数组，该方式可以保证有序遍历）
[root@localhost ~]# awk 'BEGIN{
str="a,b,c,d";
len=split(str,arr,",");
for(i=1;i<=len;i++){
print i,arr[i];
}
}'
1 a
2 b
3 c
4 d

# 判断数组中是否包含某个key
if(key in arr)

# 检测arr是否是数组
isarray(arr)  如果arr是数组，返回1，否则返回0
typeof(arr)   返回数据类型，如果arr是数组，返回 'array'
```





### 多维数组

- awk只支持一维数组，我们可以使用一维数组来模拟多维数组

```shell
# 有如下 3*3 的二维数组arr：
1 2 3 
4 5 6
7 8 9
在C语言中，arr[0][0] = 100；在awk中，我们可以令arr[0,0] = 100，以此类推：arr[0,1]、arr[0,2]...arr[3,3]；
实际上，0,1   0,2   3,3   只是一个字符串索引
```



## awk 内置函数

### 数学函数

| 函数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| sin(expr)     | 返回expr的正弦值                                             |
| cos(expr)     | 返回expr的余弦值                                             |
| atan2(y,x)    | 返回y/x的反切值                                              |
| log(expr)     | 返回expr的自然对数                                           |
| exp(expr)     | 返回以e为底，expr的指数值                                    |
| sqrt(expr)    | 返回expr的平方根                                             |
| int(expr)     | 返回expr截断至整数的值                                       |
| rand()        | 返回任意数字n，其中 0<=n<1                                   |
| srand([expr]) | 把rand函数的种子值设置为expr参数的值，如果省略参数，则使用某天的时间 |

#### 示例

```shell
# 获取0-99之间的随机整数
[root@localhost ~]# awk 'BEGIN{srand();randint=int(100*rand());print randint}'
```



### 字符串函数

| 函数                      | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| asort(arr [, d ])         | 按 ASCII 字符顺序对数组 `arr` 的值进行排序                   |
| asorti(arr [, d])         | 按 ASCII 字符顺序对数组 `arr` 的键进行排序                   |
| gsub(regexp, sub, str)    | 在一个字符串中查找指定的模式匹配的全部字符串，找到之后都替换为另一个字符串 |
| sub(search, sub, str)     | 在一个字符串中查找指定的字符串，找到之后则替换为另一个字符串。只会替换一次 |
| index(str, sub)           | 查找一个字符串在另一个字符串中的位置。如果找到则返回找到的位置，否则返回0 |
| length(str)               | 返回一个字符串的长度                                         |
| match(str, regexp)        | 查找匹配模式的第一个最长子串位置。如果没找到则返回 0，找到则返回最长子串的开始位置 |
| split(str, arr, regexp)   | 把一个字符串根据给定的模式分割成多个子串。如果没有传递模式则会使用变量 `FS` 的值 |
| printf(format, expr-list) | 根据给定的字符串格式和传递的变量构造字符串并输出到标准输出   |
| strtonum(str)             | 用于检查一个字符串是否数字并将它转换为十进制数字             |
| substr(str, start, len)   | 用于返回字符串 `str` 中的从 `start` 的位置开始，长度为 `len` 的子串 |
| tolower(str)              | 用于将指定的字符串中的大写字母转换为小写字母                 |
| toupper(str)              | 用于将指定的字符串中的小写字母转换为大写字母                 |



#### 示例

```shell
# asort(arr[,d])  arr-->数组 d-->数组，如果传了该参数，就不会修改arr，而是把arr中所有元素拷贝到d，然后对d进行排序
[root@localhost ~]# awk 'BEGIN{
    arr[11]=800;
    arr[22]=200;
    arr[33]=300;
    arr[44]=100;
	for(i in arr){
        print i,arr[i];
    }
    asort(arr);
    print;
    for(j in arr){
        print j,arr[j];
    }
}'
11 800
22 200
33 300
44 100

1 100
2 200
3 300
4 800

# asorti
[root@localhost ~]# awk 'BEGIN{
	arr[11]=800;
	arr[22]=200;
	arr[33]=300;
	arr[44]=100;
    for(i in arr){
        print i,arr[i];
    }
    asorti(arr);
    print;
    for(j in arr){
        print j,arr[j];
    }
}'
11 800
22 200
33 300
44 100

1 11
2 22
3 33
4 44

# gsub(regexp, sub, str)
[root@localhost ~]# awk 'BEGIN{
    str="hello world";
    gsub("[o|l]","*",str);
    print str;
}'
he*** w*r*d

# sub(search, sub, str)
[root@localhost ~]# awk 'BEGIN{
    str="hello world";
    sub("[o|l]","*",str);
    print str;
}'
he*lo world

# index(str, sub)
[root@localhost ~]# awk 'BEGIN{
    str="hello world";
    idx=index(str,"l");
    print idx;
}'
3

# match(str, regexp)
[root@localhost ~]# awk 'BEGIN{
    str="hello world hi haaaaaa";
    idx=match(str,"h*");
    print idx;
}'
1

# strtonum(str)
[root@localhost ~]# awk 'BEGIN{
    str="01010";
    res=strtonum(str);
    print res;
}'
520

# substr(str, start, len)
[root@localhost ~]# awk 'BEGIN{
    str="hello world";
    res=substr(str,7,5);
    print res;
}'
world

# tolower(str)
[root@localhost ~]#  awk 'BEGIN{
    str="HAHAHA";
    res=tolower(str);
    print res;
}'
hahaha

# tolupper(str)
[root@localhost ~]# awk 'BEGIN{
    str="hello world";
    res=toupper(str);
    print res;
}'
HELLO WORLD
```



### 日期和时间函数

| 函数                             | 描述                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| systime()                        | 返回当前时间戳                                               |
| mktime(datespec)                 | 将指定格式的时间字符串(`YYYY MM DD HH MM SS`)转换为时间戳    |
| strftime([format [, timestamp]]) | 将一个时间戳格式的时间根据指定的时间格式化符转成字符串形式表示 |



#### 示例

```shell
# systime()
[root@localhost ~]# awk 'BEGIN{print systime()}'
1672448348

# mktime(datespec)
[root@localhost ~]# awk 'BEGIN{print mktime("2022 12 31 09 00 00")}'
1672448400

# strftime([format [, timestamp]])
[root@localhost ~]# awk 'BEGIN{print strftime("%c",systime())}'
Sat Dec 31 09:03:53 2022
```



#### 格式化

| 格式符 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| %a     | 本地化的星期几，例如 `星期四`                                |
| %A     | 本地化的星期几缩写，例如 `四`                                |
| %b     | 本地化的月份所写，例如 `5月`                                 |
| %B     | 本地化的月份，例如 `五月`                                    |
| %c     | C语言中的 `%A %B %d %T %Y` 的格式，例如 `2019年05月30日 星期四 21时08分37秒` |
| %C     | 本年度的世纪部分。也就是四位数字年份的前两位，例如 `2019` 年中的 `20` |
| %d     | 当月中的第几天，范围为 `01-31`，例如 `30`                    |
| %D     | 格式 `%m/%d/%y` 的简写，例如 `05/30/19`                      |
| %e     | 当月中的第几天，范围为 `1-31`，如果小于 `10` 则在前面补空格，如 `1` 补全为 `1` |
| %F     | `ISO 8601` 日期格式中的 `%Y-%m-%d` 的别名                    |
| %g     | `ISO 8601` 日期格式中的周数除以 100 的值，范围 `00-99` 例如1993 年 1 月 1 日是1992年的第53周 |
| %G     | IOS 周数制下的完整年费，类似于四位数年份，例如 `2019`        |
| %h     | 格式 `%b` 的别名                                             |
| %H     | 24小时制的当前时间的时，范围为 `00–23`                       |
| %I     | 12小时制的当前时间的时，范围为 `01–12`                       |
| %j     | 一年中的第几天，范围为 `001–366`                             |
| %m     | 当前时间的月，范围为 `01–12`                                 |
| %M     | 当前时间的分，范围为 `00–59`                                 |
| %n     | 换行符 `\n`                                                  |
| %p     | 本地化的 12 小时制时间格式中的 `AM` 或 `PM`，也就是本地化的上午或下午表示形式 |
| %r     | 本地化的 12 小时制时间格式，类似于C语言中的 `%I:%M:%S %p`    |
| %R     | 格式 `%H:%M` 的缩写                                          |
| %S     | 当前时间的秒，范围为 `00-60` 。`60` 主要考虑闰秒             |
| %t     | 制表符 `\t`                                                  |
| %T     | 格式 `%H:%M:%S` 的缩写                                       |
| %u     | 一周中的第几天，也就是星期几，范围为 `1–7`。每周以星期一开始 |
| %U     | 一年中的第几周，范围为 `00-53`。第一周从第一个星期日开始     |
| %V     | 一年中的第几周，范围为 `01-53`。第一周从第一个星期一开始     |
| %w     | 一周中的第几天，也就是星期几，范围为 `0–6`。每周以星期日开始 |
| %W     | 一年中的第几周，范围为 `00-53`。第一周从第一个星期一开始     |
| %x     | 本地化的完整日期表示，类似于 `%A %B %d %Y`，例如 `星期四 五月 30 2019` |
| %X     | 本地化的完整时间表示，类似于C语言中的 `%T` ，例如 `07:06:05` |
| %y     | 两位十进制年份，即取年份的后两位，范围为 `00-99`，比如 `2019` 则返回 `19` |
| %Y     | 完整的 4 位十进制年份，例如 `2019`                           |
| %z     | 以 `+HHMM` 格式的时区偏移。是 `RFC 822` 或 `RFC 1036` 日期格式中的组成部分。 |
| %Z     | 时区名称或时区名称缩写。如果没有时区则返回空字符串 `''`      |



### 其他函数

| 函数            | 描述                                       |
| --------------- | ------------------------------------------ |
| close(expr)     | 用于关闭已经打开的文件或管道               |
| system(command) | 执行系统脚本命令，并返回脚本执行的退出状态 |
| getline         | 读取下一行                                 |
| next            | 处理下一行                                 |
| nextfile        | 处理下一个文件                             |



#### 示例

```shell
# close(expr) 
[root@localhost ~]# awk 'BEGIN{while("cat emp.txt" | getline){print $0}close("emp.txt")}'

# system(command)
[root@localhost ~]# awk 'BEGIN{system("ls -l")}'

# getline
[root@localhost ~]# awk '{getline;print}' emp.txt
002 李四 2000 10
004 赵六 2000 20
006 小丽 800 20

[root@localhost ~]# awk 'BEGIN{print "输入：";getline name;print name}'
输入：
123
123

# next
[root@localhost ~]# awk '{if($3<2000)next;print}' emp.txt
002 李四 2000 10
003 王五 3000 10
004 赵六 2000 20

# nextfile
[root@localhost ~]# awk '{if($3==2000) nextfile;print}' emp.txt file
001 张三 1000 10
xxx is a hanhan. ^_^

are you kidding?
I think ...
My phone number is 1872272****.
```



### 自定义函数

- 函数定义

```shell
function 函数名(参数1, 参数2, ...) { 
   函数体
}
```

???+ quote 
    - 函数名必须以字母开始，可以由字母、数字、下划线组成，不能使用保留字
    - 函数体语句之间必须以分号分隔
    - 函数可以有返回值，也可以没有，如果需要返回值，则必须在大括号里使用 `return`关键字

- 函数调用

```shell
# 调用无参函数
fun_name 
# 调用有参数的函数
fun_name(arg1[,arg2...])
# 调用有返回值的函数
var = fun_name([arg1...])
```

> 函数在 `BEGIN` ,`主体`, `END` 中均可调用



#### 示例

```shell
# 无参数函数
[root@localhost ~]# awk 'BEGIN{
	fun1()
}
function fun1(){
	print "this is a function!"
}'
this is a function!

# 有参数函数
[root@localhost ~]# awk 'BEGIN{
	fun2(10,20)
}
function fun2(num1,num2){
	print "函数执行的结果是："num1+num2
}'
函数执行的结果是：30

# 有返回值函数
[root@localhost ~]# awk 'BEGIN{
	res = fun3(10,20);
	print "num1+num2的和是："res
}
function fun3(num1,num2){
	return num1+num2
}'
num1+num2的和是：30
```



## 练习 

=== "(1)" 
    用`awk`命令输出1-100的偶数和

=== "(2)"
    打印文件中第20列之后的内容

=== "(3)" 
    去除文件中的空行（分别使用`grep`、`sed`、`awk`命令实现）

    ```shell
    [root@localhost ~]# cat file.txt
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

=== "(4)"
    打印文件中的空行的行号

    ```shell
    [root@localhost ~]# cat file.txt 
    a
    b
    c


    d
    e

    f
    ```


=== "(5)" 
    去除文件中的重复行

    ```shell
    [root@localhost ~]# cat file.txt 
    You and me.
    xxx is a hanhan. ^_^
    xxx is a hanhan. ^_^
    xxx is a hanhan. ^_^
    longzhaoqianwowudunjiu.
    He can speak english.
    Are you kidding?
    He can speak english.
    youoy abba ccccc ddd
    My phone number is 1872272****.
    xxx is a hanhan. ^_^
    ```


=== "(6)"
    统计文件中第二列出现的次数大于1的次数和科目

    ```shell
    [root@localhost ~]# cat file.txt
    01 python 99
    02 go 80
    03 c++ 88
    04 java 77
    05 go 88
    06 shell 89
    07 java 70
    08 java 88

    # 结果示例：
    2 go
    3 java
    ```


=== "(7)" 
    统计文件中每个单词出现的次数

    ```shell
    [root@localhost ~]# cat file.txt 
    you and you 
    you and me 
    hello 

    # 结果示例：
    you: 3
    and: 2
    hello: 1
    ```


=== "(8)" 
    统计文件中每一行数字出现的次数和整个文件中数字出现的总数

    ```shell
    [root@localhost ~]# cat file.txt 
    a123
    wo4r2d0
    ab8cd
    sss

    # 结果示例：
    line1: 3
    line2: 3
    line3: 1
    line4: 0
    total: 7 
    ```


=== "(9)" 
    将文件中的列转置成行

    ```shell
    [root@localhost ~]# cat file.txt 
    job salary
    c++ 13
    java 14
    php 12

    # 结果示例：
    job c++ java php
    salary 13 14 12
    ```


=== "(10)" 
    将文件中的内容按照结果示例输出

    ```shell
    [root@localhost ~]# cat file.txt 
    111:13443
    222:13211
    111:13643
    333:12341
    222:12123

    # 结果示例：
    [111]
    13443
    13643
    [222]
    13211
    12123
    [333]
    12341
    ```