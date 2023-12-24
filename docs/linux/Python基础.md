---
tags:
  - python
cssclasses: []
---
### Python基础 

## 一. 认识Python

### 1. Python简介

Python是一种解释型、面向对象、动态数据类型的高级程序设计语言，由荷兰的吉多·范罗苏姆(Guido van Rossum)（龟叔）于1989年底发明，第一个公开发行版于1991年发布，Python源代码遵循 GPL(GNU General Public License)协议。

![img](https://f005.backblazeb2.com/file/siwen-/python/%E9%BE%9F%E5%8F%94.jpg)

TIOBE2022年5月TOP20的编程语言：

![img](https://f005.backblazeb2.com/file/siwen-/python/001.jpg)

### 2. Python的优缺点

优点：

- 易于学习：Python有相对较少的关键字，结构简单，和一个明确定义的语法，学习起来更加简单。
- 易于阅读：Python代码定义的更清晰。
- 易于维护：Python的成功在于它的源代码是相当容易维护的。
- 丰富的标准库：Python的最大的优势之一是丰富的库，并且是跨平台的，在UNIX，Windows和Macintosh兼容很好。
- 互动模式：互动模式的支持，您可以从终端输入执行代码并获得结果的语言，互动的测试和调试代码片断。
- 可移植：基于其开放源代码的特性，Python已经被移植（也就是使其工作）到许多平台。
- 可扩展：如果你需要一段运行很快的关键代码，或者是想要编写一些不愿开放的算法，你可以使用C或C++完成那部分程序，然后从你的Python程序中调用。
- 数据库：Python提供所有主要的商业数据库的接口。
- GUI编程：Python支持GUI可以创建和移植到许多系统调用。
- 可嵌入: 你可以将Python嵌入到C/C++程序，让你的程序的用户获得"脚本化"的能力。

缺点：

- 速度慢：Python是解释型语言，与C、C++等编译型语言相比速度较慢。

### 3. Python的应用

Python主要应用方向如下：

- 网络爬虫
- 自动化运维
- 自动化测试
- 大数据与数据分析：Spark
- Web开发：Flask、Django
- 机器学习：Tensor Flow
- 胶水语言：混合C++、Java等语言进行编程。

### 4. Python版本

- Python2 (2.x 2.7) （2020年1月1日官方已停止维护）
- Python3(主流使用的版本, 3.6 之后的版本(即大于等于 3.6))



## 二. 语言的分类

- 机器语言：计算机不需要翻译就能直接识别的语言被称为机器语言(又被称为二进制代码语言),该语言是由二进制数0或1组成的一串指令。
- 汇编语言：汇编语言用英文字母或符号串来替代机器语言,把不易理解和记忆的机器语言按照对应关系转换成汇编指令,汇编语言比机器语言更加便于阅读和理解。
- 高级语言：高级语言不是一门语言,而是一类语言的统称,它比汇编语言更贴近于人类使用的语言,易于理解、记忆和使用。
  - 编程语言：编程语言是人和计算机沟通的语言。
    - 编程语言的分类：编译型语言，解释型语言

![img](https://f005.backblazeb2.com/file/siwen-/python/%E7%BC%96%E8%AF%91%E3%80%81%E8%A7%A3%E9%87%8A.jpg)



## 三. Python环境配置

### 1. Python解释器的安装

官网下载后直接安装就行，记得勾选上”添加path环境变量“ ，建议下载3.6以上版本 [下载地址](https://www.python.org/)

### 2. pycharm的下载安装

[pycharm](https://www.jetbrains.com/pycharm/)是Python中最好用的IDE(集成开发环境)之一, 是用来书写代码运行代码,调试代码的；

pycharm分为专业版(收费)和社区版(免费)



## 四. Python基础知识

### 1. 第一个Python程序

![img](https://f005.backblazeb2.com/file/siwen-/python/002.png)

### 2. Python注释

- 单行注释

以#开头，#右边的所有东西当做说明，而不是真正要执行的程序，起辅助说明作用

```python
# 我是注释，可以在里写一些功能说明之类的信息
print('hello world')
```

- 多行注释

```python
'''
我是多行注释
可以分行写出功能说明
'''
```

### 3. 变量和数据类型

#### 3.1 变量

```python
# 作用: 是用来存储数据的(在程序代码中出现的数据,想要保存下来使用, 就必须使用变量), 如: 测试数据, 用户名, 密码, 验证码
# 变量注意事项: 变量必须先定义(保存数据)后使用(取出数据)
```

#### 3.2 定义变量

```python
# 变量名 = 数据值
name = '张三'   # 定义一个变量name 存储的值是‘张三’
```

#### 3.3 使用变量

```python
# 使用变量时直接使用变量名就可以了
print(name)   # 输出结果为‘张三’
```

#### 3.4 数据类型

- 程序中使用的数据可以划分为不同的类型，因为不同类型的数据操作是不一样的
- 常用数据类型
  - 数字类型
    - 整型 (`int` ) , 就是整数 , 即不带小数点的数
    - 浮点型( `float` ), 就是小数
    - 复数类型 `3 + 4j`, 几乎用不到
  - 布尔类型
    - 真 `True` , `1`
    - 假 `False` `0`, 非 0 即真
  - 非数值类型
    - 字符串: (`str`) 使用引号引起来的就是字符串
    - 列表 (`list`) `[1, 2, 3, 4]`
    - 元组(`tuple`) `(1, 2, 4, 4)`
    - 字典 (`dict`) `{'name': '小明', 'age': 18}`
      <img src="https://f005.backblazeb2.com/file/siwen-/python/003.png" alt="img" style="zoom: 50%;" />
- `type()`函数
  - `type()`函数可以获取变量的数据类型

```python
# 格式：type(变量)
print(type(变量))   # 将变量的数据类型打印在控制台
```

#### 3.5 数据类型转换

```python
根据代码的需要, 将一种数据类型转换另一种数据类型
语法: 变量 = 要转换为的类型(原数据)
数据类型转换,不会改变原来的数据的类型, 而是会生成一个新的数据类型
```

- 常用的数据类型转换

  - `int()` 将其他类型转换为 int 类型

  - `float()` 将其他类型转换为 浮点型

  - `str()` 将其他类型转换为 字符串类型
    - 可以通过直接加引号`''`把其他数据类型转换为字符串类型

数据类型转换：

|      函数       |                        说明                         |
| :-------------: | :-------------------------------------------------: |
| int(x [,base ]) |                  将x转换为一个整数                  |
|    float(x )    |                 将x转换到一个浮点数                 |
|     str(x )     |                将对象 x 转换为字符串                |
|   eval(str )    | 用来计算在字符串中的有效Python表达式,并返回一个对象 |
|    tuple(s )    |               将序列 s 转换为一个元组               |
|    list(s )     |               将序列 s 转换为一个列表               |
|     chr(x )     |              将一个整数转换为一个字符               |
|     ord(x )     |             将一个字符转换为它的整数值              |
|     hex(x )     |         将一个整数转换为一个十六进制字符串          |
|     oct(x )     |          将一个整数转换为一个八进制字符串           |
|     bin(x )     |          将一个整数转换为一个二进制字符串           |

### 4. 标识符和关键字

#### 4.1 标识符

- 标识符是开发人员在程序中自定义的一些符号和名称
- 标识符是自己定义的，如变量名 、函数名、类名等
- 标识符的命名规则
  - 标识符由字母、下划线和数字组成，且不能以数字开头
  - 不能使用 Python 中的关键字作为变量名
  - python中的标识符是区分大小写的
  - 建议的命名规则
    - 见名知意
    - 驼峰命名法
      - 大驼峰: 每个单词的首字母大写 `MyName`
      - 小驼峰: 第一个单词的首字母小写,其余单词的首字母大写 `myName`
    - 下划线连接法
      - 每个单词之间使用下划线连接 `my_name`

#### 4.2 关键字

- 关键字是python中一些具有特殊功能的标识符
- python中的关键字

```python
['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

- 查看关键字

![img](https://f005.backblazeb2.com/file/siwen-/python/004.png)

### 5. 输出

#### 5.1 输出函数`print()`

```python
# 输出使用的函数是print()函数
# 作用是将程序中的数据或者结果打印到控制台(屏幕)
print('hello word!')
print('aaa','bbb')      # 可以用多个逗号输出多个内容
```

#### 5.2 格式化输出

- 在字符串中指定的位置,输出变量中存储的值
  - 在需要使用变量的地方,使用特殊符号占位
  - 使用变量填充占位的数据
- % 格式化输出占位符号
  - `%d` 占位, 填充整型数据 `digit`
  - `%f` 占位, 填充浮点型数据 `float`
  - `%s` 占位, 填充字符串数据 `string`

```python
# 定义变量  姓名 年龄 身高
name = '张三'
age = 18
height = 173.1

# 要求按照以下格式输出个人信息
# 我的名字是 xx, 年龄是 xx, 身高是 xx cm
# 使用格式化输出实现
print('我的名字是 %s, 年龄是 %d, 身高是 %f cm' % (name, age, height))

# 补充
%.nf    %0nd    %d%%
```

- F-string( f字符串的格式化方法)
  - python版本需要大等于3.6
  - 需要在字符串的前边加上 f 或者 F
  - 占位符号统一变为 {}
  - 需要填充的变量 写在 {} 中

```python
# 定义变量  姓名 年龄 身高
name = '张三'
age = 18
height = 173.1

# 要求按照以下格式输出个人信息
# 我的名字是 xx, 年龄是 xx, 身高是 xx cm
# 使用格式化输出实现
print(f'我的名字是 {name}, 年龄是 {age}, 身高是 {height} cm')

# 补充
{xxx:.nf}    {xxx:0nd}  
```

- 字符串.format()
  - 可以在任意版本中使用
  - 在需要使用变量的地方使用 {} 占位
  - '{}, {}, ...'.format(变量, 变量, ...)

```python
# 定义变量  姓名 年龄 身高
name = '张三'
age = 18
height = 173.1

# 要求按照以下格式输出个人信息
# 我的名字是 xx, 年龄是 xx, 身高是 xx cm
# 使用格式化输出实现
print('我的名字是 {}, 年龄是 {}, 身高是 {} cm'.format(name, age, height))

# 补充
{:.nf}    {:0nd} 
```

### 6. 输入

```python
# 使用的函数是input()函数
# 作用是获取用户使用键盘录入的内容
语法： 变量 = input('提示的信息')
# 1. 代码从上到下执行, 遇到 input 函数之后,会暂停执行,等待用户的输入, 如果不输入会一直等待
# 2. 在输入的过程中,遇到回车,代表本次输入结束
# 3. 会将输入的内容保存到等号左边的变量中, 并且变量的数据类型一定是 str
```

### 7. 运算符

#### 7.1 算数运算符

python中的算数运算符如下表：

(下面以a=10 ,b=20为例进行计算)

| 运算符 |  描述  | 实例                                                         |
| :----- | :----: | ------------------------------------------------------------ |
| +      |   加   | 两个对象相加 a + b 输出结果 30                               |
| -      |   减   | 得到负数或是一个数减去另一个数 a - b 输出结果 -10            |
| *      |   乘   | 两个数相乘或是返回一个被重复若干次的字符串 a * b 输出结果 200 |
| /      |   除   | x除以y b / a 输出结果 2                                      |
| //     | 取整除 | 返回商的整数部分 9//2 输出结果 4 , 9.0//2.0 输出结果 4.0     |
| %      |  取余  | 返回除法的余数 b % a 输出结果 0                              |
| **     |   幂   | 返回x的y次幂 a**b 为10的20次方， 输出结果 100000000000000000000 |

#### 7.2 比较(关系)运算符

python中的比较运算符如下表：

| 运算符 | 描述                                                         | 示例                          |
| :----- | :----------------------------------------------------------- | :---------------------------- |
| ==     | 检查两个操作数的值是否相等，如果是则条件变为真。             | 如a=3,b=3则（a == b) 为 true. |
| !=     | 检查两个操作数的值是否相等，如果值不相等，则条件变为真。     | 如a=1,b=3则(a != b) 为 true.  |
| >      | 检查左操作数的值是否大于右操作数的值，如果是，则条件成立。   | 如a=7,b=3则(a > b) 为 true.   |
| <      | 检查左操作数的值是否小于右操作数的值，如果是，则条件成立。   | 如a=7,b=3则(a < b) 为 false.  |
| >=     | 检查左操作数的值是否大于或等于右操作数的值，如果是，则条件成立。 | 如a=3,b=3则(a >= b) 为 true.  |
| <=     | 检查左操作数的值是否小于或等于右操作数的值，如果是，则条件成立。 | 如a=3,b=3则(a <= b) 为 true.  |

#### 7.3 逻辑运算符

(下面以a=10 ,b=20为例进行计算)

| 运算符 | 逻辑表达式 | 描述                                                         | 实例                    |
| :----- | :--------- | :----------------------------------------------------------- | :---------------------- |
| and    | x and y    | 布尔"与" - 如果 x 为 False，x and y 返回 False，否则它返回 y 的计算值。 | (a and b) 返回 20。     |
| or     | x or y     | 布尔"或" - 如果 x 是 True，它返回 True，否则它返回 y 的计算值。 | (a or b) 返回 10。      |
| not    | not x      | 布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。 | not(a and b) 返回 False |

```python
逻辑运算符可以连接多个条件, 通常在判断和循环中使用

and 逻辑与  和,并且  and 连接的多个条件,都必须为 True, 整体结果才为 True, 即有假则假 (当第一个条件为 False 的时候,第二个条件就不再判断)

or  逻辑或  或者     or 连接的多个条件, 只要有一个条件为 True , 整体结果就为 True, 即有真则真 (当第一个条件为 True的时候,第二个条件就不再判断)

not 逻辑非  取反     not 后边的条件, True 变 False, False 变 True
```

#### 7.4 赋值运算符

- 赋值运算符 `=`, 作用就是将等号右边的值保存到等号左边的变量中
- 复合赋值运算符(将算术运算符和赋值运算符进行结合)

```python
#复合赋值运算符： += -= *= /= //=  %=
a += b  -->  a = a + b
```





# 判断语句和循环语句

## 一. if 语句

### 1. if 判断语句

- `if` 是用来判断的，即日常生活中的“如果”
- `if` 最基本的格式就是只有”如果“的情况，其基本语法如下：

```python
if 要判断的条件:
	判断条件成立时执行的代码
        
# if顶格书写,没有缩进的代码和if无关,不管条件是否成立,都会执行

注意事项：
# 1. if是一个关键字,和后续的判断条件之间需要一个空格
# 2. 判断条件后边需要一个冒号
# 3. 冒号之后,回车,代码需要缩进,一般是4个空格或者一个tab键
# 4. 所有在if代码下方的缩进中书写的代码,属于if语句的代码块,判断条件为True的时候会执行
# 5. if代码块中的代码,要么都执行,要么都不执行
# 6. if代码块结束之后,代码要顶格书写,表示是和if无关的代码
```

### 2. if-else结构

- 如果条件成立做什么事，否则(条件不成立) 做另一件事
- 基本语法

```python
if 判断条件:
    判断条件成立时执行的代码
else:
    判断条件不成立时执行的代码
   
注意事项：
# 1. else是关键字,后边需要冒号
# 2. 冒号之后回车,需要缩进
# 3. else代码下方缩进中的内容,属于else的代码块
# 4. if和else的代码块,只会执行其中的一个
# 5. else需要结合if使用
# 6. if-else之间不能有其他顶格书写的内容(elif除外)
```

> python中三目运算符的写法(其他编程语言里面的`?:`)：
>
>  `a if a > b else b`
>
> 等价于其他语言中的：
>
>  `a > b ? a : b`

### 3. if-elif-else结构

- 如果判断条件有多个，可以使用 `if-elif-else`语句来实现
- 基本语法

```python
if 判断条件1:
    判断条件1成立时执行的代码
elif 判断条件2:
    判断条件2成立时执行的代码
else:
    以上条件都不成立时执行的代码
    
注意事项：
# 1. elif是关键字,后边和判断条件之间需要一个空格,判断条件之后需要冒号
# 2. 冒号之后回车,需要缩进,处在这个缩进中的的代码表示是elif的代码块
# 3. 在一个if判断中,可以有多个elif 
# 4. 只有if的条件不成立,才会去判断elif的条件
# 5. 在一个if中,如果有多个elif,只要有一个条件成立,后续的都不再判断
# 6. if-elif-else结构, 和if的缩进相同的只能是elif和else,如果是其他的,就表示这个判断结构结束了
if 判断条件1:
    条件成立时执行的代码
if 判断条件2:
    条件成立时执行的代码
if 判断条件3:
    条件成立时执行的代码
    
# 多个if的结构: 每个if都会进行判断,之间没有关联系
```

### 4. if 嵌套

- `if` 嵌套, 是指在一个`if(elif else)` 中嵌套另一个 `if`
- 使用场景: 判断条件存在递进关系(只有第一个条件满足了,才会判断第二个条件)
- 格式：

```python
if 判断条件1:
    判断条件1成立时执行的代码
    if 判断条件2:
        判断条件2成立时执行的代码
    else:
        判断条件2不成立时执行的代码
else:
    判断条件1不成立时执行的代码
```

### 5. if 应用(猜拳游戏)

```makefile
剪刀 石头 布
剪刀 赢 布
石头 赢 剪刀
布 赢 石头

案例的步骤:
1. 自己出拳(石头(1)/剪刀(2)/布(3)) input  (player)
2. 电脑随机出拳 (使用随机数模块实现)  (computer)
3. 判断输赢
玩家胜利:
player==1 and computer == 2
or
player==2 and computer == 3
or
player==3 and computer == 1
平局:
player == computer
玩家输了: 
else 
案例中需要电脑随机出拳,即随机出 1 2 3
在 Python 中想要随机获得整数数字可以使用如下方法
# 1. 导入随机数工具包
import random
# 2. 使用工具包中的工具产生指定范围内的数字
random.randint(a, b)  # 产生[a, b] 之间的随机整数
```

- 参考代码:

```python
import random

# 1. 自己出拳(石头(1)/剪刀(2)/布(3)) input  (player)
player = int(input('请出拳:石头(1)/剪刀(2)/布(3):'))   
# 2. 电脑随机出拳 (使用随机数模块(工具)完成)  (computer)
computer = random.randint(1, 3)
# 3. 判断输赢
# 3.1 玩家胜利
if (player == 1 and computer == 2) or (player == 2 and computer == 3) or (player == 3 and computer == 1):
    print('恭喜你,你赢了!')
# 3.2 平局
elif player == computer:
    print('平局,决战到天亮!!!')
# 3.3 玩家输了
else:
    print('很遗憾，你输了。。。')
```



## 二. while 循环

### 1. while 循环

- `while` 循环可以让指定的代码重复执行
- 格式

```python
while 条件:
	条件满足时执行的代码
```

### 2. while循环应用

- 求1-100的累加和

```python
i = 1
sum = 0
while i<=100:
    sum = sum + i
    i += 1

print("1~100的累积和为:%d" % sum)
```

### 3. while 循环嵌套

- 格式

```python
while 条件1:
	条件1满足时执行的代码
	while 条件2:
		条件2满足时执行的代码
```

- 应用：打印下列结果

```markdown
    *
    * *
    * * *
    * * * *
    * * * * *
```

- 参考代码

```python
i = 1
while i <= 5:
    j = 1
    while j <= i:
        print('*', end=' ')
        j += 1
    print('')
    i += 1
```



## 三. for 循环

### 1. 基本的for循环

- `for` 循环也可以让指定的代码重复执行 (循环)
- `for` 循环可以遍历容器中的数据
  - 遍历: 从容器中把数据一个一个取出
  - 容器: 可以简单理解为盒子, 盒子中可以存放很多的数据 (字符串 `str`, 列表 `list`, 元组 `tuple`, 字典 `dict`)
- `for` 循环又叫做 `for` 遍历
- 格式：

```python
for 临时变量 in 容器:
    重复执行的代码
    
注意事项:
# 1. for和in都是关键字
# 2. 容器中有多少个数据,循环就会执行多少次
# 3. 每次循环,会将容器中数据取出一个保存到in关键字前边的临时变量中
```

### 2. for 指定范围循环

```python
for 变量 in range(n):
    重复执行的代码
 
注意事项:
# 1. range()是Python中的函数,作用是生成 [0, n) 之间的整数
# 2. n是几,for循环就循环多少次
# 3. 变量的值是每次循环从 [0, n) 取出一个值,第一次取得是0,最后一次取得是n-1


for 变量 in range(a, b):
    重复执行的代码  
# range(a, b) 作用是生成 [a, b) 之间的整数数字,不包含b

for 变量 in range(start, end, step):
    重复执行的代码
# range(start, end, step)  step 表示步长(代表每次隔多少)
```



## 四. break 和 continue

### 1. 介绍

- `break` 和 `continue` 是 Python 中的两个关键字, 只能在循环中使用
  - `break`: 终止循环, 即代码执行遇到 `break`, 循环不再执行,立即结束
  - `continue`: 跳过本次循环. 即代码执行遇到 `continue`, 本次循环剩下的代码不再执行, 继续下一次循环
- 注意: `break` 和 `continue` 在嵌套循环中，只对最近的一层循环起作用

### 2. 应用

- `break` 应用举例

```python
# 遍历字符串 'hello',如果遇到字符 'l',则终止循环
for i in 'hello':
    if i == 'l':
        break
    print(i)
```

- `continue` 应用举例

```python
# 遍历字符串 'hello',如果字符是 'l',则不打印
for i in 'hello':
    if i == 'l':
        continue  # 本次循环后续的代码不执行,执行下一次循环
    print(i)

print('-' * 30)
```





# 字符串、列表、元组、字典、集合

## 一. 字符串 `str`

### 1.字符串介绍

- 使用引号引起来的内容就是字符串(`str`)

```python
# 使用单引号引起来的字符串
str1 = 'hello'
# 使用双引号引起来的字符串
str2 = "hello"
# 使用三引号引起来的字符串
str3 = '''hello'''
str4 = """hello"""

# \ 转义字符 如果字符串中包含'、"、\ 等特殊字符 可以使用 \ 进行转义
# 在字符串的前面加上 r(R) 字符串中的\不会作为转义字符
```

### 2.下标和切片

#### 2.1 下标

- 下标就是编号，比如高铁上的座位号，打卡机的员工工号等
- 下标又叫做索引，指字符在字符串中的位置编号
- python中的下标
  - 从左到右编号 从0开始
  - python中支持负数下标 从右到左 从-1开始
  - 可以使用下标获取字符串中某个位置的字符
    - 语法: `字符串[下标]`

![img](https://f005.backblazeb2.com/file/siwen-/python/%E5%88%87%E7%89%87.png)

#### 2.2 切片

- 切片是指截取字符串中的多个字符
- 语法：字符串`[start:end:step]` (end位置取不到)

```python
# 字符串切片举例
str1 = 'abcdefg'
print(str1[0:3:1]) # abc
print(str1[0:3])   # abc  步长默认为 1
print(str1[:3])    # abc  开始下标不写默认为 0

print(str1[3:])    # defg
print(str1[:])     # abcdefg

print(str1[0:7:2]) # aceg
print(str1[::2])   # aceg
```

### 3.字符串常见操作

#### 3.1 字符串长度 `len`

```python
# len() 
# 返回字符串的长度

print(len(str1))   # 7 
# len() 函数可以用于其他容器
```

#### 3.2 字符串查找 `find`

```python
# 格式：字符串.find(sub_str, start, end) 
# 返回 sub_str 在 字符串中第一次出现的下标
# sub_str 要查找的子字符串  start 开始位置 默认为0  end 结束位置 默认为字符串长度

str1 = 'you and you'
print(str1.find('you'))  # 1
print(str1.find('fff'))  # -1
```

#### 3.3 字符串替换 `replace`

```python
# 格式：字符串.replace(old_str, new_str, count)
# old_str: 被替换的内容  new_str: 替换为的内容  count: 替换的次数, 默认是全部替换
# 返回替换之后的完整的字符串

str1 = 'you and you'
print(str1.replace('you', 'me'))  # me and me
print(str1.replace('you', 'me', 1))  # me and you
```

#### 3.4 字符串拆分 `split`

```python
# 格式：字符串.split(sep, maxsplit)
# 将字符串按照 sep 进行分割(拆分) 存到列表中
# sep 字符串按照什么进行拆分 默认是空白字符(空格, \n, \t)
# max_split 分割次数 默认全部分割

str1 = 'you and you'
print(str1.split())  # ['you', 'and', 'you']
print(str1.split('and'))  # ['you ', ' you']
print(str1.split(' ', 1)) # ['you', 'and you']
```

#### 3.5 字符串连接 `join`

```python
# 格式：字符串.join(列表)
# 将字符串插入到列表中每相邻的两个数据之间, 组成一个新的字符串

list1 = ['a', 'b', 'c', 'd']
str1 = '_'
print(str1.join(list1))  # a_b_c_d
print('*'.join(list1))  # a*b*c*d
```

#### 3.6 判断子字符串是否存在于字符串中 `in`, `not in`

```python
str1 = 'you and you'
if 'aa' in str1:     # 不存在
    print('存在')
else:
    print('不存在')
 
# in 和 not in 可以用于其他容器
```

#### 3.7 统计子字符串在字符串中出现的次数 `count`

```python
# 格式：字符串.count(sub_str)   sub_str表示子字符串

str1 = 'you and you'
print(str1.count('y'))  # 2
# count 可以用于其他容器
```



## 二. 列表 `list`

### 1.列表介绍

- 列表(`list`)可以存储多个数据，每个数据之间用逗号隔开
- 列表中可以存放不同的数据类型

```python
# 列表的定义
# 定义空列表：
list1 = []
print(list1)  # []
list2 = list()
print(list2)  # []
# 类型转换：list1 = list('abc')
list3 = list('abc')
print(list3)  # ['a', 'b', 'c']

# 定义非空列表
list4 = ['a', 1, 'abc']
print(list4)  # ['a', 1, 'abc']
```

### 2.列表常见操作

#### 2.1 列表支持下标和切片

```python
# 下标和切片操作和字符串中的一样
list1 = ['a', 1, 'abc']
print(list1[-1])  # abc
print(list1[:2])  # ['a', 1] 列表的切片返回的是一个列表
```

#### 2.2 查询数据在列表中的下标

```python
# 格式：列表.index(数据, start, end)  使用和 find 方法一样
list1 = ['a', 1, 'abc']
print(list1.index('abc'))  # 2

# 如果没有找到会报错
```

#### 2.3 添加元素 `append`

```python
# 格式：列表.append(数据)
# 将数据添加到列表的尾部(追加)

list1 = ['a', 1, 'abc']
list2 = list1.append(2)
print(list2)  # None
print(list1)  # ['a', 1, 'abc', 2]
```

#### 2.4 插入元素 `insert`

```python
# 格式：列表.insert(下标, 数据)
# 在指定的下标位置添加数据,如果指定的下标位置本来有数据,原数据会后移

list1 = ['a', 1, 'abc']
list2 = list1.insert(1, 'apple')
print(list2)  # None
print(list1)  # ['a', 'apple', 1, 'abc']
```

#### 2.5 合并数据 `extend`

```python
# 格式：列表1.extend(列表2)
# 将列表2中的所有数据逐个添加的列表1的尾部

list1 = ['a', 1, 'abc']
list2 = ['apple', 2]
list3 = list1.extend(list2)
print(list3)  # None
print(list1)  # ['a', 1, 'abc', 'apple', 2]
```

#### 2.6 修改元素

```python
# 修改元素的时候，要通过下标来确定要修改的是哪个元素
# 格式：列表[下标] = 新元素

list1 = ['a', 1, 'abc']
list1[0] = 'apple'
print(list1)  # ['apple', 1, 'abc']
```

#### 2.7 删除元素 `del` , `pop` , `remove`

```python
# 列表中删除元素有以下几种方法：
# del：根据下标进行删除  		格式：del 列表[下标]
# pop：删除最后一个元素  		格式：列表.pop(下标) 默认删除最后一个
# remove：根据元素的值进行删除    格式：列表.remove(元素)

list1 = ['a', 1, 'abc', 'apple', 'hello']

del list1[0]        # 删除元素 ’a‘
print(list1)        # [1, 'abc', 'apple', 'hello']

list1.pop()         # 删除元素 ’hello‘
print(list1)        # [1, 'abc', 'apple']

list1.remove('abc') # 删除元素 ’abc'
print(list1)        # [1, 'apple']
```

#### 2.8 排序 `sort` , `reverse`

```python
# sort方法是将list按特定顺序重新排列，默认为由小到大 参数reverse=True可改为倒序，由大到小
# reverse方法是将list逆置

# sort
list1 = ['a', '1', 'abc']
list1.sort()
print(list1)  # ['1', 'a', 'abc']

list2 = [12, 1, 123]
list2.sort()
print(list2)  # [1, 12, 123]
list2.sort(reverse=False)
print(list2)  # [123, 12, 1]

list3 = ['a', 1, 'abc']
list3.sort()
print(list3)  # 报错

# reverse
list1 = ['a', 1, 'abc']
list1.reverse()
print(list1)  # ['abc', 1, 'a']
```

#### 2.9 列表的复制

```python
# 列表的复制
# 变量 = 列表[:]
# 变量 = 列表.copy()

list1 = [1, 2, 3]
list2 = list1[:]
list3 = list1.copy()
list4 = list1
list1.pop()
print(list2)  # [1, 2, 3]
print(list3)  # [1, 2, 3]
print(list4)  # [1, 2]
```

### 3.列表的遍历

- 列表的遍历可以输出列表中的每一个元素

#### 3.1 `for` 循环遍历

```python
list1 = ['a', 1, 'abc']
for i in list1:
    print(i)
# a
# 1
# abc
```

#### 3.2 `while` 循环遍历

```python
list1 = ['a', 1, 'abc']
i = 0
while i < len(list1):
    print(list1[i])
    i += 1
# a
# 1
# abc
```

### 4.列表嵌套

- 列表的嵌套指的是一个列表中的元素又是一个列表

```python
list1 = [['a', 1, 'ab'], [2, 3], ['hello']]
# 遍历该列表输出的是里面的列表
```



## 三. 元组 `tuple`

### 1.元组介绍

- Python的元组与列表类似，不同之处在于**元组的元素不能修改**

```python
# 元组的定义
# 定义空元组：
tuple1 = ()
print(tuple1)  # ()
tuple2 = tuple()
print(tuple2)  # ()
# 类型转换：tuple = tuple('abc')
tuple3 = tuple('abc')
print(tuple3)  # ('a', 'b', 'c')

# 定义非空元组
tuple4 = ('a', 1, 'abc')
print(tuple4)  # ('a', 1, 'abc')
```

### 2.元组常见操作

```python
# 1. 在元组中也可以使用下标和切片获取数据
# 2. 在元组中存在 index 方法
# 3. 在元组中存在 count 方法
# 4. 在元组中可以使用 in 和 not in 操作
# 5. len() 统计个数
# 以上方法的使用方法和列表中一样
```



## 四. 字典 `dict`

### 1.字典介绍

- 字典中的数据是由键-值(`key-value`)对组成的
- 字典中一组键值对是一个数据，键值之间用冒号隔开，每个数据之间用逗号隔开
- 字典中的键不可以重复，值可以重复，键一般是字符串，可以是数字

```python
# 字典的定义
# 定义空字典：
dict1 = {}
print(dict1)  # {}
dict2 = dict()
print(dict2)  # {}

# 定义非空字典
dict3 = {'name': '王路飞', 'age': 23}
print(dict3)  # {'name': '王路飞', 'age': 23}
```

### 2.字典常见操作

#### 2.1 添加和修改元素

```python
# 格式: 字典[键] = 数据值

dict1 = {'name': '王路飞', 'age': 23}

# 如果键已经存在,就是修改数据值
dict1['age'] = 18
print(dict1)    # {'name': '王路飞', 'age': 18}

# 如果键不存在,就是添加数据
dict1['sex'] = '男'
print(dict1)    # {'name': '王路飞', 'age': 18, 'sex': '男'}
```

#### 2.2 删除元素

```python
# 字典中删除元素有以下几种方法：
# del：根据键进行删除  		格式：del 字典[键]
# pop：删除指定元素  		 格式：字典.pop(键)
# clear：清空字典          格式：字典.clear()

dict1 = {'name': '王路飞', 'age': 18, 'sex': '男', 'height': 173.1}

del dict1['sex']
print(dict1)      # {'name': '王路飞', 'age': 18, 'height': 173.1}

dict1.pop('age')
print(dict1)      # {'name': '王路飞', 'height': 173.1}

dict1.clear()
print(dict1)      # {}
```

#### 2.3 查询元素

```python
# 字典中没有下标，键是唯一的，所以可以通过键来获取对应的值
# 格式：字典[键]      字典.get(键)

dict1 = {'name': '王路飞', 'age': 18, 'sex': '男'}
print(dict1['name'])     # 王路飞
print(dict1.get('age'))  # 18
```

#### 2.4 其他操作

```python
# 字典的其他操作

dict1 = {'name': '王路飞', 'age': 18, 'sex': '男'}

# len() 返回字典中的元素个数(键值对个数)
print(len(dict1))  # 3

# keys() 返回字典中所有键的列表
print(dict1.keys())  # dict_keys(['name', 'age', 'sex'])

# values() 返回字典中所有值的列表
print(dict1.values())  # dict_values(['王路飞', 18, '男'])

# items() 返回字典中所有键值对的元组列表
print(dict1.items())  # dict_items([('name', '王路飞'), ('age', 18), ('sex', '男')])

# 字典1.update(字典2) 把字典2的元素更新到字典1里面
dict2 = {'height': 178, 'weight': 60}
dict1.update(dict2)
print(dict1)  # {'name': '王路飞', 'age': 18, 'sex': '男', 'height': 178, 'weight': 60}
```

### 3.字典的遍历

#### 3.1 遍历字典的键 (`key`)

```python
dict1 = {'name': '王路飞', 'age': 18, 'sex': '男'}

for key in dict1.keys():
    print(key)

# name
# age
# sex
```

#### 3.2 遍历字典的值 (`value`)

```python
dict1 = {'name': '王路飞', 'age': 18, 'sex': '男'}

for value in dict1.values():
    print(value)

# 王路飞
# 18
# 男
```

#### 3.3 遍历字典的元素

```python
dict1 = {'name': '王路飞', 'age': 18, 'sex': '男'}

for item in dict1.items():
    print(item)

# ('name', '王路飞')
# ('age', 18)
# ('sex', '男')
```

#### 3.4 遍历字典的键值对

```python
dict1 = {'name': '王路飞', 'age': 18, 'sex': '男'}

for key, value in dict1.items():
    print('%s:%s' % (key, value))

# name:王路飞
# age:18
# sex:男
```



## 五. 集合 `set`

### 1.集合介绍

- 集合（set）是一个无序的不重复元素序列

```python
# 集合的定义
# 定义空集合：
set1 = set()
print(set1)  # set()

# 定义非空集合
set2 = {'name', 'age', 'sex'}
print(set2)  # {'age', 'name', 'sex'}

set3 = {'age', 'name', 'sex', 'name'}
print(set3)  # {'name', 'age', 'sex'}  集合可以去重
```

### 2.集合的基本操作

```python
# 集合的基本操作
set1 = {'a', 'b', 'c'}

# add() 添加元素  格式：集合.add(元素)
set1.add('d')
print(set1)  # {'c', 'b', 'd', 'a'}  每次输出的顺序不一样

# remove() 删除元素  格式：集合.remove(元素)
set1.remove('d')
print(set1)  # {'a', 'b', 'c'}

# clear() 清空集合  格式：集合.clear()
set1.clear()
print(set1)  # set()

# 集合可用于给列表去重
list1 = [1, 1, 2, 2, 2, 3, 4, 5, 5]
print(set(list1))  # {1, 2, 3, 4, 5}
```





# 函数

## 一. 函数介绍

### 1.什么是函数

- 如果在开发程序时，需要多次执行某代码块，但是为了提高编写的效率以及代码的重用，所以把具有独立功能的代码块组织为一个小模块，这就是函数

### 2.函数的文档说明

- 定义函数，在函数体的最开始用引号引起来的内容就是函数的文档说明

```python
def print_hello():
    """
    打印 hello python
    """
    print('hello python')
```

- 执行`help(test)`，可以看到函数的说明

```python
def print_hello():
    """
    打印 hello python
    """
    print('hello python')


help(print_hello)

"""
输出如下内容：
Help on function print_hello in module __main__:

print_hello()
    打印 hello python
"""
```



## 二. 函数的定义和调用

### 1.函数的定义

- 函数使用关键字 `def` 定义，定义函数的格式如下：

```python
def 函数名():
    函数体
```

- 例子：定义一个函数，用于打印 `hello python`

```python
# 定义一个函数，用于打印 `hello python`
def print_hello():
    print('hello python')
```

### 2.函数的调用

- 定义完函数后，我们就拥有了一段具有某些功能的代码，想要这些代码能够执行，就需要对该函数进行调用
- 使用`函数名()`即可调用函数，函数调用格式如下：

```python
# 定义完一个函数后，函数是不会执行的，需要我们进行调用
# 调用我们刚刚定义的函数 print_hello
print_hello()
```



## 三. 函数参数

### 1.什么是函数参数

- 为了让一个函数更通用，在定义函数的时候，使用变量代替具体的数据值进行占位，用于接收数据，调用函数的时候，传递具体的数据值；
- 进行占位，用于接收数据的，称为“形参”，用于传递给函数的，称为“实参”

### 2.定义带参数的函数

- 在函数后面的小括号中，用变量来作为形参，多个变量之间用逗号隔开

```python
# 定义一个函数，用于计算两个数的和
def add_result(a,b):
    result = a + b
    print(result)
  
# a 和 b 就是该函数的形参
```

### 3.调用带参数的函数

- 调用带参数的函数时，需要传入对应的数据，调用格式如下：

```python
# 调用带参数的函数时，需要在小括号中传入数据
def add_result(a,b):
    result = a + b
    print(result)
    

add_result(10,20)   # 30
```

### 4.调用函数时参数的顺序

- 实参和形参是对应关系，可以使用 `形参=实参` 的方式来改变对应的顺序

```python
"""
	调用带参数的函数时，参数的顺序
"""
def add_result(a, b):
    result = a - b
    print(result)


add_result(10, 20)  # -10
add_result(20, 10)  # 10
add_result(a=20, b=10)  # 10
add_result(b=20, a=10)  # 10
add_result(20, b=10)  # 10
```



## 四. 函数返回值

### 1.什么是函数的返回值

- 所谓“返回值”，就是程序在调用结束后，最后给到调用者的结果
- 当函数的得到的数据在后续程序中还需要使用的时候，就应该给到调用者一个返回值，以供后续使用
- 在函数中如果想要将一个结果作为返回值返回，需要使用 `return` 关键字

### 2.带有返回值的函数

- 定义一个带有返回值的函数

```python
# 定义一个带返回值的函数 返回这两个数的和
def add_result(a, b):
    c = a + b
    return c
```

- 获取函数返回的值

```python
def add_result(a, b):
    c = a + b
    return c


# 我们上面的函数中并没有print 此时如何获取到这两个数的和
add_result(10, 20)  # 没有结果
print(add_result(10, 20))  # 30
# 可以使用 变量 = 函数() 的方式来将函数返回的值保存在变量中 以供后续代码使用
result = add_result(10, 20)
print(result)  # 30
```

### 3.函数返回值的说明

```python
def 函数名():  # 返回值是 None
    pass   


def 函数名():  # 返回值是 None
    return 


def 函数名():  # 返回值是 xxx
    return xxx 
```

### 4.函数返回多个值

- 我们之前学习的都是返回一个值的情况，那么可以返回多个值吗

```python
# 定义一个函数，实现获取两个数的和与差的功能
def test(a, b):
    c = a + b
    d = a - b
    return c, d


result = test(10, 20)
print(result)  # (30, -10)
# 返回多个值的情况本质就是利用了元组

result1, result2 = test(10, 20)
print(result1, result2)  # 30 -10
```



## 五. 函数的类型

- #### 函数有没有参数和有没有返回值可以相互结合，定义函数时，可以根据实际的功能需求来进行设计

### 1.无参数，无返回值的函数

- 此类函数不能接收参数，并且没有返回值，一般情况下，用于打印提示相关的功能

```python
def print_menu():
    print('''
    ========== 学生管理系统 ==========
    -> 1. 添加学生
    -> 2. 删除学生
    -> 3. 修改学生信息
    -> 4. 查询单个学生信息
    -> 5. 查询所有学生的信息
    -> q. 退出系统
    --------------------------------''')
```

### 2.无参数，有返回值的函数

- 此类函数，不能接收参数，但是可以返回某个数据，一般情况下，用于采集数据

```python
def get_age():
    age = input('你今年多少岁了？')
    return age


my_age = get_age()
print('我今年%s岁' % my_age)
```

### 3.有参数，无返回值的函数

- 此类函数，能接收参数，但不可以返回数据，一般情况下，用于输入变量直接在函数体内使用 `print` 输出结果

```python
def add_result(a, b):
    result = a + b
    print('你输入的两个数的和是%d' % result)


add_result(10, 20)  # 你输入的两个数的和是30
```

### 4.有参数，有返回值的函数

- 此类函数，不仅能接收参数，还可以返回某个数据，一般情况下，像数据处理并需要结果的应用，用此类函数

```python
def add_result(a, b):
    c = a + b
    return c


result = add_result(10, 20)
print('你输入的两个数的和乘以2的结果是%d' % (result * 2))  # 你输入的两个数的和乘以2的结果是60
```



## 六. 函数的嵌套使用

- 一个函数里面调用了另外一个函数，这就是函数调用

```python
def funA():
    print('函数A')


def funB():
    print('函数B')
    funA()


funB()


# 运行结果
函数B
函数A
```



## 七. 局部变量和全局变量

### 1.局部变量

- 局部变量，就是在函数内部定义的变量
- 不同的函数，可以定义相同的名字的局部变量，但是不会相互产生影响
- 局部变量的作用是为了临时保存数据，需要在函数中定义变量来进行存储

```python
def funA():
    a = 10
    print(a)
    
   
def funB():
    a = 100
    print(a)
    
    
funA()  # 10
funB()  # 100
```

### 2.全局变量

- 全局变量，就是在函数外部定义的变量
- 全局变量能够在所有的函数中进行访问
- 如果在函数中存在和全局变量名字相同的局部变量, 在函数中使用的是局部变量的值
- 果在函数中修改全局变量，那么就需要使用`global`进行声明

```python
# 定义全局变量
a = 100


def funA():
    print(a)


def funB():
    print(a)


funA()  # 100
funB()  # 100



# 全局变量和局部变量同名的情况
a = 100


def funA():
    a = 10
    print(a)


def funB():
    print(a)


funA()  # 10
funB()  # 100


# 修改全局变量
a = 100


def funA():
    global a
    a = 10
    print(a)


def funB():
    print(a)


funA()  # 10
funB()  # 10



# 可变类型的全局变量  可变类型：list dict set  
lst = [100]


def funA():
    lst.append(200)
    print(lst)


def funB():
    print(lst)


funA()  # [100, 200]
funB()  # [100, 200]
```



## 八. 函数参数

### 1.函数传参的方式

- 位置传参：在函数调用的时候, 按照形参的顺序, 将实参值传递给形参
- 关键字传参：在函数调用的时候, 指定数据值给到哪个形参
- 混合传参：关键字传参必须写在位置传参的后面

```python
def funA(a, b, c):
    print(a, b, c)


funA(10, 20, 30)  # 位置传参
funA(a=10, b=20, c=30)  # 关键字传参
funA(10, b=20, c=30)  # 混合传参
```

### 2.缺省参数

- 缺省参数就是默认参数，函数调用时，如果没有传入值，则被认为是默认值
- 在函数定义的时候, 给形参一个默认的数据值, 这个形参就变为缺省参数（缺省参数的书写要放在普通参数的后边）

```python
def funA(a, b=10):
    print(a, b)


funA(10, 20)  # 10 20
funA(10)  # 10 10
```

### 3.不定长参数

- 当我们在书写函数的时候, 不确定参数的具体个数时, 可以使用不定长参数

#### 3.1 不定长位置(元组)参数

```python
# 在普通参数的前边,加上一个 *,这个参数就变为不定长位置参数
# 不定长位置参数 要写在普通的参数的后面
# 形参的类型是元组
# 不定长位置参数一般命名为 args, 即(*args)

def funA(*args):
    print(args)


funA(1)  # (1,)
funA(1, 2)  # (1, 2)
funA(1, 2, 3)  # (1, 2, 3)
```

#### 3.2 不定长关键字(字典)参数

```python
# 在普通参数的前边,加上两个 * (**),这个参数就变为不定长位置参数
# 不定长位置参数 要写在所有参数的后面
# 形参的类型是字典
# 不定长位置参数一般命名为 kwargs, 即(**kwargs)

def funA(**kwargs):
    print(kwargs)


funA(a=1)  # {'a': 1}
funA(a=1, b=2)  # {'a': 1, 'b': 2}
funA(a=1, b=2, c=3)  # {'a': 1, 'b': 2, 'c': 3}
```

#### 3.3 完整的参数顺序

```python
def 函数名(普通函数, *args, 缺省参数, **kwargs):
    pass

# 一般情况下 不会使用到所有的参数 使用部分参数时 只需按照以上顺序挑选书写即可
```



## 九. 匿名函数

- 使用 `lambda` 关键字定义的函数就叫做匿名函数，这种函数得名于省略了用def声明函数的标准步骤
- 匿名函数的语法只包含一个语句
- 匿名函数的返回值不需要 `return`, 一行代码(表达式) 的结果就是返回值

```python
# 在定义的时候,将匿名函数的引用保存到一个变量中
# 变量 = lambda 参数: 代码
show = lambda: print('hello')
# 匿名函数一般作为参数使用 不需要我们进行调用 如果要进行调用 可以使用 变量() 的方式进行调用
show()  # hello

test = lambda a, b: a + b
print(test(10, 20))  # 30


# 匿名函数作为参数使用
def test1(a, b, opt):
    print(a, b, opt(a, b))


test1(10, 20, lambda x, y: x + y)  # 10 20 30
```



## 十. 递归函数

- 如果一个函数在内部不调用其它的函数，而是自己本身的话，这个函数就是递归函数
- 递归函数必须要有一个出口

```python
# 计算 n 的阶乘 n!=1*2*...*n
# --> n! = n * (n - 1)!
def calc(n):
    if n >= 1:
        res = n * calc(n - 1)
    else:
        res = 1
    return res


print(calc(5))
```



