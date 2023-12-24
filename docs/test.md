<!-- ---
hide:
  - navigation
  - toc
--- -->

=== "a"
    ```python
    print('aaa')
    ```
=== "b"
    # aa


| Method      | Description                          |
| ----------- | ------------------------------------ |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |



[Hover me][example]

  [example]: https://example.com "I'm a tooltip!"

=== "Unordered list"
    * Sed sagittis eleifend rutrum
    * Donec vitae suscipit est
    * Nulla tempor lobortis orci

=== "Ordered list"
    1. Sed sagittis eleifend rutrum
    2. Donec vitae suscipit est
    3. Nulla tempor lobortis orci

- ==This was marked==
- ^^This was inserted^^
- ~~This was deleted~~

- H~2~O
- A^T^A

- ++ctrl+alt+del++



``` yaml
    aaa # (1)!
```

1.  :man_raising_hand: 123


The `#!python range()` function is used to generate a sequence of numbers.

``` py hl_lines="2 3"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

``` py title="bubble_sort.py"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```



!!! info inline end "标题"
    ccc 

!!! info inline "title"
    aaa

??? note
!!! note
!!! abstract
!!! info
!!! tip
!!! success
!!! question 
!!! warning
!!! failure
!!! danger
!!! bug 
!!! example 
!!! quote 

[emoji](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/)