# Document outline audit

This small script analyses the heading outline of the document (or given container), and report possible errors.

Can be dropped in the DevTools directly or integrated to a testing suite for instance.

## Basic usage

Display warnings in the console:

```js
var outline = new Outline()
outline.warn()
```

![Example usage from DevTools](http://i.imgur.com/TY6R9fG.png)

Get an array of warnings:

```js
var outline = new Outline()
outline.audit()
```

Get the outline itself

```js
var outline = new Outline()
outline.get()
```
