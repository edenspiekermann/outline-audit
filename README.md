# Document outline audit

This small script analyses the heading outline of the document (or given container), and report possible errors. It can be dropped in the DevTools directly, put into a bookmarklet or integrated to a testing suite for example. It’s pretty much up to you.

## Bookmarklet

Unfortunately, GitHub prevents JS links in README, so you’ll have to make the bookmarklet yourself. Here is the code:

```js
(function(e,n,t){n=e.body,t=e.createElement('script'),t.src='https://cdn.rawgit.com/edenspiekermann/outline-audit/master/index.js',t.async=!0,t.onload=function(){new Outline().warn()},n.appendChild(t)}(document));
```

And wrapped with a link already:

```html
<a href="javascript:(function(e,n,t){n=e.body,t=e.createElement('script'),t.src='https://cdn.rawgit.com/edenspiekermann/outline-audit/master/index.js',t.async=!0,t.onload=function(){new Outline().warn()},n.appendChild(t)}(document));">Audit document outline</a>
```

## DevTools snippet

Go in *Sources* tab, then *Snippets* sub-tab in the left panel. Right click, and click *New*. Then paste the script, and add `new Outline().warn()` at the very end. Save, and you should be able to run it whenever you want.

![DevTools snippet for Outline Audit](http://i.imgur.com/2kDj2ZI.png)

*Note: this disconnects you from the source. You won’t get updates.*

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

Get the outline itself:

```js
var outline = new Outline()
outline.get()
```

## About the document outline

The document outline is the theoretical schema constructed from the structure of a document (such as a web page), mostly based on headings. It matters because assistive technologies like screen readers heavily rely on this to give context and help navigation. It also matters for search engines, so they can locate and index meaningful content first.

With HTML5, we got a set of new “sectioning elements”, such as `<header>`, `<footer>`, `<section>`, `<aside>`, `<article>` and so on. The theory (a.k.a the specification) says that inside one of these elements, the document outline is being resetted to create a sub-outline. The same way nested ordered list have their own counter and create sub-lists.

However, that is the theory. In practice, unfortunately, it is dramatically different. As of today, there is not a single browser or user assistive technology that applies this. It means that right now, regarding document outline (exclusively), these elements are no different than `<div>`. And that means that if you rely on these sectioning elements to put `<h1>` everywhere, you end up with a flat document outline composed exclusively of `<h1>`, which hurts accessibility and possibly SEO.

> If you as a developer want to provide a meaningful document structure, use the `<h1>`–`<h6>` elements to express document structure. DO NOT rely upon the HTML5 document outline. By all means use the HTML5 section elements, but do not rely upon them to convey a meaningful structure. If at some point in the future the HTML5 document outline ceases to be a fiction, you will be covered as the use of h1–h6 is backwards compatible.
> — [Steve Faulkner](http://blog.paciellogroup.com/2013/10/html5-document-outline/)

To avoid these issues, we can make our heading structure consistent and meaningful. Basically, it does not matter what kind of container we use, the heading level must be meaningful in regard to the previous heading. If it is a sort of sub-section, go down one level in the heading structure. If it is an unrelated section, have the same kind of heading as before. When checking the page, we should have a logical heading structure (which also mean never skipping a heading level). It’s actually what recommends the HTML5 specification:

> Sections may contain headings of any rank, and authors are strongly encouraged to use headings of the appropriate rank for the section’s nesting level.
> — [HTML 5.1 - Headings and sections](http://w3c.github.io/html/sections.html#headings-and-sections)

Last thing to point out on this topic: the theory is so far away from the current state of things that the spec authors decided to review the whole thing to design something that will actually make sense and get implemented. [More to come in the next few months](https://github.com/w3c/html/issues/33).

More on the topic in this [outstanding article about the document outline by Adrian Roselli](http://adrianroselli.com/2013/12/the-truth-about-truth-about-multiple-h1.html).
