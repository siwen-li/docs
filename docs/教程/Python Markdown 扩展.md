!!! Failure ""
    Python Markdown 扩展官方文档: [pymdown-extensions](https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/)

## Admonition 

> 官方链接: [admonitions](https://zensical.org/docs/authoring/admonitions/)

### 基础用法

=== "用法"

    ``` 
    !!! note 

        这是一个 note 
    ```

    !!! note 

        这是一个 note 


=== "带标题"

    ```
    !!! note "标题"

        带标题
    ```

    !!! note "标题"

        带标题


=== "无标题"

    ```
    !!! note ""

        无标题
    ```

    !!! note ""

        无标题


=== "折叠"

    ```
    ??? note "折叠"

        可折叠
    ```

    ??? note "折叠"

        可折叠



=== "展开"

    ```
    ???+ note "展开"

        展开
    ```


    ???+ note "展开"

        展开



=== "行内"
    === "左"

        !!! info inline "Lorem ipsum"

        ```
        !!! info inline "Lorem ipsum"
        ```

        1111

    === "右"

        !!! info inline end "Lorem ipsum"
        
        ```
        !!! info inline "Lorem ipsum"
        ```

        1111


---
    

### 支持的类型

=== "note"

    !!! note 

=== "abstract"

    !!! abstract 

=== "info"

    !!! info 

=== "tip"

    !!! tip 

=== "success"

    !!! success 

=== "question"

    !!! question 

=== "warning"

    !!! warning 

=== "failure"

    !!! failure 

=== "danger"

    !!! danger 

=== "bug"

    !!! bug 

=== "example"

    !!! example 

=== "quote"

    !!! quote 



---

## code block  

> 官方链接: [code-blocks](https://zensical.org/docs/authoring/code-blocks/)

### 基础用法

=== "用法"

    ````
    ``` py
    import tensorflow as tf
    ```
    ````

    ``` py
    import tensorflow as tf
    ```

=== "添加标题"

    ````
    ``` py title="bubble_sort.py"
    def bubble_sort(items):
        for i in range(len(items)):
            for j in range(len(items) - 1 - i):
                if items[j] > items[j + 1]:
                    items[j], items[j + 1] = items[j + 1], items[j]
    ```
    ````

    ``` py title="bubble_sort.py"
    def bubble_sort(items):
        for i in range(len(items)):
            for j in range(len(items) - 1 - i):
                if items[j] > items[j + 1]:
                    items[j], items[j + 1] = items[j + 1], items[j]
    ```

=== "添加注释"

    ````
    ``` python
    print("hello")  # (1)!
    ```

    1. 这是注释
    ````

    ``` python
    print("hello")  # (1)!
    ```

    2. 这是注释

    > 放置在代码块中可以添加代码块语言注释的地方


=== "不显示行号"

    ````
    ``` py linenums="0"
    def bubble_sort(items):
        for i in range(len(items)):
            for j in range(len(items) - 1 - i):
                if items[j] > items[j + 1]:
                    items[j], items[j + 1] = items[j + 1], items[j]
    ```
    ````

    ``` py linenums="0"
    def bubble_sort(items):
        for i in range(len(items)):
            for j in range(len(items) - 1 - i):
                if items[j] > items[j + 1]:
                    items[j], items[j + 1] = items[j + 1], items[j]
    ```

=== "高亮显示行"

    ````
    ``` py hl_lines="2 3"
    def bubble_sort(items):
        for i in range(len(items)):
            for j in range(len(items) - 1 - i):
                if items[j] > items[j + 1]:
                    items[j], items[j + 1] = items[j + 1], items[j]
    ```
    ```` 

    ``` py hl_lines="2 3"
    def bubble_sort(items):
        for i in range(len(items)):
            for j in range(len(items) - 1 - i):
                if items[j] > items[j + 1]:
                    items[j], items[j + 1] = items[j + 1], items[j]
    ```



## tabbed 

> 官方链接: [tabbed](https://facelessuser.github.io/pymdown-extensions/extensions/tabbed/#syntax-tab-1)

=== "用法"

    ```
    === "Tab 1"
        Markdown **content**.

        Multiple paragraphs.

    === "Tab 2"
        More Markdown **content**.

        - list item a
        - list item b
    ```

    === "Tab 1"
        Markdown **content**.

        Multiple paragraphs.

    === "Tab 2"
        More Markdown **content**.

        - list item a
        - list item b

=== "分隔"

    ```
    === "Tab 1"
        Markdown **content**.

        Multiple paragraphs.

    === "Tab 2"
        More Markdown **content**.

        - list item a
        - list item b

    ===! "Tab A"
        Different tab set.

    === "Tab B"
        More content.
    ```

    === "Tab 1"
        Markdown **content**.

        Multiple paragraphs.

    === "Tab 2"
        More Markdown **content**.

        - list item a
        - list item b

    ===! "Tab A"
        Different tab set.

    === "Tab B"
        ```
        More content.
        ```

=== "默认选中"

    ```
    === "Not Me"
        Markdown **content**.

        Multiple paragraphs.

    ===+ "Select Me"
        More Markdown **content**.

        - list item a
        - list item b

    === "Not Me Either"
        Another Tab
    ```

    === "Not Me"
        Markdown **content**.

        Multiple paragraphs.

    ===+ "Select Me"
        More Markdown **content**.

        - list item a
        - list item b

    === "Not Me Either"
        Another Tab


## formatting

=== "文本"

    ```
    - ==This was marked (highlight)==
    - ^^This was inserted (underline)^^
    - ~~This was deleted (strikethrough)~~
    ```

    - ==This was marked (highlight)==
    - ^^This was inserted (underline)^^
    - ~~This was deleted (strikethrough)~~

=== "上下标"

    ```
    - H~2~O
    - A^T^A
    ```

    - H~2~O
    - A^T^A

=== "键盘"

    ```
    ++ctrl+alt+del++
    ```

    ++ctrl+alt+del++



## grids

=== "卡片网格"

    ```
    <div class="grid cards" markdown>

    - :fontawesome-brands-html5: __HTML__ for content and structure
    - :fontawesome-brands-js: __JavaScript__ for interactivity
    - :fontawesome-brands-css3: __CSS__ for text running out of boxes
    - :fontawesome-brands-internet-explorer: __Internet Explorer__ ... huh?

    </div>
    ```

    <div class="grid cards" markdown>

    - :fontawesome-brands-html5: __HTML__ for content and structure
    - :fontawesome-brands-js: __JavaScript__ for interactivity
    - :fontawesome-brands-css3: __CSS__ for text running out of boxes
    - :fontawesome-brands-internet-explorer: __Internet Explorer__ ... huh?

    </div>


=== "复杂网格"

    ```
    <div class="grid cards" markdown>

    -   :material-clock-fast:{ .lg .middle } __标题 1__

        ---

        Install [`链接`](#) with [`pip`](#) 

        [:octicons-arrow-right-24: Getting started](#)

    -   :fontawesome-brands-markdown:{ .lg .middle } __标题 2__

        ---

        xxx

    </div>
    ```


    <div class="grid cards" markdown>

    -   :material-clock-fast:{ .lg .middle } __标题 1__

        ---

        Install [`链接`](#) with [`pip`](#) 

        [:octicons-arrow-right-24: Getting started](#)

    -   :fontawesome-brands-markdown:{ .lg .middle } __标题 2__

        ---

        xxx

    </div>


=== "通用网格"

    
    <div class="grid" markdown>

    === "Unordered list"

        * Sed sagittis eleifend rutrum

    === "Ordered list"

        1. Sed sagittis eleifend rutrum

    ``` title="Content tabs"
    === "Unordered list"

        * Sed sagittis eleifend rutrum

    === "Ordered list"

        1. Sed sagittis eleifend rutrum
    ```


## button

=== "添加按钮"

    ```
    [Subscribe to our newsletter](#){ .md-button }
    ```

    [Subscribe to our newsletter](#){ .md-button }


=== "添加主按钮"

    ```
    [Subscribe to our newsletter](#){ .md-button .md-button--primary }
    ```

    [Subscribe to our newsletter](#){ .md-button .md-button--primary }

=== "添加带图标按钮"

    ```
    [Send :fontawesome-solid-paper-plane:](#){ .md-button }
    ```

    [Send :fontawesome-solid-paper-plane:](#){ .md-button }




[111](quick-start/#_2){ data-preview } 
