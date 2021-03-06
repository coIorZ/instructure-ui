---
describes: Pill
---

Displays short, contextual information about an item. Change the border
and text color via the `variant` prop. Use the `margin` prop to add space around
the component.

```js
---
example: true
---
<div>
    <Pill
      text="Excused"
      margin="x-small"
    />
    <Pill
      variant="danger"
      text="Missing"
      margin="x-small"
    />
    <Pill
      variant="success"
      text="Checked In"
      margin="x-small"
    />
    <Pill
      variant="primary"
      text="Draft"
      margin="x-small"
    />
    <Pill
      variant="warning"
      text="Late"
      margin="x-small"
    />
    <Pill
      variant="message"
      text="Notification"
      margin="x-small"
    />
</div>
```
The component has a max-width, set by its theme. Any overflowing text will
be handled via ellipses.

```js
---
example: true
---
<Pill
  text="extraordinary superfluousness"
/>
```

### Guidelines


```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Use all capital letters</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Use more than 2 words</FigureItem>
    <FigureItem>Use for dismissible items (use a <Link href="/#Tag">Tag</Link> instead)</FigureItem>
    <FigureItem>Use for counts (use a <Link href="/#Badge">Badge</Link> instead)</FigureItem>
    <FigureItem>Put icons or actions next to the text</FigureItem>
  </Figure>
</Guidelines>
```
