# SCSS

## CSS Block

  ```scss
      selector {
          css...
          &:hover {
              css...
          }
          child-selector {
              css...
          }
          & > direct-child-only-selector {
              css...
          }
      }
  ```

## BEM-Naming Convention

**Block** level element or main element class name should be `class="block"`
**Element** children should be added by `__` i.e. `class="block__child__grandchild`
**Modifier** any modifer to a element should be named `--` i.e. `class="block--mod"` or `class="block__child--mod"`

## Veriables

Written with `$` prefix like `$font: roboto, times-serif`

## Operators

`+`, `-`, `*`, `math.div()`, and `%`

## Flow Controls

### `@if` `@else` `@else if`

```scss
@use "sass:math";

@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;

  border-color: transparent;
  border-style: solid;
  border-width: math.div($size, 2);

  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.next {
  @include triangle(5px, black, right);
}
```

### `@each`

Evaluates a block for each element in a `list` or each pair in a `map`
With `lsit`

```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

`list` in `list`

```scss
$icons:
  "eye" "\f112" 12px,
  "start" "\f12e" 16px,
  "stop" "\f12f" 10px;

@each $name, $glyph, $size in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
    font-size: $size;
  }
}
```

With `map`

```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```

### `@for`

```scss
@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

```scss
@for $i from 1 to 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

If `through` is used final number will be included and if `to` is used final number is excluded

### `@while`

```scss
@use "sass:math";

/// Divides `$value` by `$ratio` until it's below `$base`.
@function scale-below($value, $base, $ratio: 1.618) {
  @while $value > $base {
    $value: math.div($value, $ratio);
  }
  @return $value;
}

$normal-font-size: 16px;
sup {
  font-size: scale-below(20px, 16px);
}
```

## At-rules

* `@use` loads `mixins`, `functions`, and `variables` from other Sass stylesheets, and combines CSS from multiple stylesheets together.

* `@forward` loads a Sass stylesheet and makes its `mixins`, `functions`, and `variables` available when your stylesheet is loaded with the `@use` rule.

* `@import` extends the CSS at-rule to load styles, `mixins`, `functions`, and `variables` from other stylesheets.

* `@mixin` and `@include` makes it easy to re-use chunks of styles.

* `@function` defines custom functions that can be used in SassScript expressions.

* `@extend` allows selectors to inherit styles from one another.

* `@at-root` puts styles within it at the root of the CSS document.

* `@error` causes compilation to fail with an error message.

* `@warn` prints a warning without stopping compilation entirely.

* `@debug` prints a message for debugging purposes.

### Mixins

Allows to replace repeated css pattern

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

## Partials or Modules

### Module

A **sass** file should name after `_` prefix like `_Font.scss`

### `Use`

To import module `@use 'Font';`
Veriable, Mixin, function can be acessed with `Font.font`

## Extend/Inheritance

Allows to spreately wirte same css at only place. Shares whole css rules

```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```
