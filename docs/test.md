---
comments: true
---



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

!!! note annotate "Phasellus posuere in sem ut cursus (1)"

    Lorem ipsum dolor sit amet, (2) consectetur adipiscing elit. Nulla et
    euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
    purus auctor massa, nec semper lorem quam in massa.

1.  :man_raising_hand: I'm an annotation!
2.  :woman_raising_hand: I'm an annotation as well!


=== "Tab 1"

    Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
    { .annotate }

    1.  :man_raising_hand: I'm an annotation!

=== "Tab 2"

    Phasellus posuere in sem ut cursus (1)
    { .annotate }

    1.  :woman_raising_hand: I'm an annotation as well!

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