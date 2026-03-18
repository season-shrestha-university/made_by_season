---
name: bem-css
description: >
  Apply BEM (Block Element Modifier) naming conventions to CSS and HTML.
  Use this skill whenever the user asks about CSS class naming, BEM methodology,
  structuring stylesheets, refactoring messy CSS, writing component-based styles,
  or building scalable/maintainable CSS architecture. Trigger this skill for
  requests like "name my CSS classes", "how should I structure this component's
  CSS", "convert to BEM", "write styles for this component", or any task that
  involves authoring, reviewing, or refactoring CSS class names and selectors.
---

# BEM CSS Naming Convention Skill

BEM stands for **Block**, **Element**, **Modifier**. It is a component-based methodology for naming CSS classes that promotes modularity, reusability, and clarity.

---

## Core Syntax

```
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

| Part     | Separator                | Purpose                                     |
| -------- | ------------------------ | ------------------------------------------- |
| Block    | _(none)_                 | Standalone component; meaningful on its own |
| Element  | `__` (double underscore) | Part of a block; no meaning outside it      |
| Modifier | `--` (double hyphen)     | Variant or state of a block or element      |

---

## 1. Block

A **Block** is a top-level, self-contained UI component.

### Rules

- Named using **lowercase words**, hyphenated for multi-word names.
- Should describe **what it is**, not **what it looks like**.
- Never depends on other blocks for styling.

### Examples

```css
.card {
}
.nav-menu {
}
.search-form {
}
.user-profile {
}
```

```html
<div class="card">...</div>
<nav class="nav-menu">...</nav>
```

---

## 2. Element

An **Element** is a child of a block that has no standalone meaning.

### Rules

- Always prefixed with its **parent block name** and `__`.
- Represents a **functional part** of the block.
- Never chain elements: `.block__elem1__elem2` ❌ — use `.block__elem2` ✅ instead.
- Even if deeply nested in HTML, the class reflects the **block** it belongs to, not its immediate parent.

### Examples

```css
.card__image {
}
.card__title {
}
.card__body {
}
.card__footer {
}

.nav-menu__item {
}
.nav-menu__link {
}

.search-form__input {
}
.search-form__button {
}
```

```html
<div class="card">
  <img class="card__image" />
  <div class="card__body">
    <h2 class="card__title">Title</h2>
  </div>
  <footer class="card__footer">...</footer>
</div>
```

---

## 3. Modifier

A **Modifier** represents a **variation or state** of a block or element.

### Rules

- Appended to the block or element with `--`.
- The **base class must also be present** on the element — modifiers never stand alone.
- Use for: themes, sizes, states, orientations.

### Examples

```css
/* Block modifiers */
.card--featured {
}
.card--dark {
}
.card--horizontal {
}

/* Element modifiers */
.card__title--large {
}
.nav-menu__item--active {
}
.nav-menu__link--disabled {
}

/* State modifiers */
.search-form__button--loading {
}
.search-form__input--error {
}
```

```html
<!-- Block modifier -->
<div class="card card--featured">
  <h2 class="card__title card__title--large">Featured</h2>
</div>

<!-- Element modifier -->
<ul class="nav-menu">
  <li class="nav-menu__item nav-menu__item--active">
    <a class="nav-menu__link">Home</a>
  </li>
  <li class="nav-menu__item">
    <a class="nav-menu__link nav-menu__link--disabled">About</a>
  </li>
</ul>
```

> ✅ Always keep the base class: `class="card card--featured"` not just `class="card--featured"`

---

## 4. Mix — Combining Multiple Blocks

A single HTML node can carry classes from **multiple blocks**. This is called a **Mix**.

```html
<!-- .header__logo is an element of .header -->
<!-- .logo is its own standalone block -->
<div class="logo header__logo">...</div>
```

This lets you apply position/layout styles via the element class, and visual styles via the block class — keeping concerns separate.

---

## 5. Naming Patterns Cheatsheet

| Pattern          | Class example         | Use case                     |
| ---------------- | --------------------- | ---------------------------- |
| Block            | `.button`             | A reusable button component  |
| Element          | `.button__icon`       | An icon inside the button    |
| Element          | `.button__label`      | Text label inside the button |
| Block modifier   | `.button--primary`    | Primary colour variant       |
| Block modifier   | `.button--large`      | Large size variant           |
| Block modifier   | `.button--disabled`   | Disabled state               |
| Element modifier | `.button__icon--spin` | Spinning state for the icon  |

---

## 6. Full Component Example

### HTML

```html
<form class="search-form search-form--compact">
  <div class="search-form__field">
    <input
      class="search-form__input search-form__input--error"
      type="text"
      placeholder="Search..."
    />
    <span class="search-form__hint">Please enter at least 3 characters.</span>
  </div>
  <button
    class="search-form__button search-form__button--loading"
    type="submit"
  >
    <span class="search-form__button-label">Search</span>
    <svg class="search-form__button-icon search-form__button-icon--spin">
      ...
    </svg>
  </button>
</form>
```

### CSS

```css
/* Block */
.search-form {
  display: flex;
  gap: 1rem;
}
.search-form--compact {
  gap: 0.5rem;
}

/* Elements */
.search-form__field {
  display: flex;
  flex-direction: column;
}
.search-form__input {
  border: 1px solid #ccc;
  padding: 0.5rem;
}
.search-form__input--error {
  border-color: red;
}
.search-form__hint {
  font-size: 0.75rem;
  color: red;
}
.search-form__button {
  padding: 0.5rem 1rem;
  background: blue;
  color: white;
}
.search-form__button--loading {
  opacity: 0.7;
  pointer-events: none;
}
.search-form__button-icon {
  width: 1rem;
  height: 1rem;
}
.search-form__button-icon--spin {
  animation: spin 1s linear infinite;
}
```

---

## 7. Common Mistakes to Avoid

| ❌ Anti-pattern                              | ✅ Correct BEM                |
| -------------------------------------------- | ----------------------------- |
| `.card .card__title` (descendant selector)   | `.card__title` alone          |
| `.card__body__heading` (chained elements)    | `.card__heading`              |
| `class="card--featured"` without base        | `class="card card--featured"` |
| `.is-active` global state class (standalone) | `.nav-menu__item--active`     |
| `.cardTitle` (camelCase)                     | `.card__title`                |
| `.card_title` (single underscore)            | `.card__title`                |

---

## 8. BEM with CSS Preprocessors (SCSS)

BEM pairs naturally with SCSS using the `&` parent selector:

```scss
.card {
  padding: 1rem;

  &__image {
    width: 100%;
  }

  &__title {
    font-size: 1.25rem;

    &--large {
      font-size: 2rem;
    }
  }

  &--featured {
    border: 2px solid gold;
  }
}
```

> ⚠️ Note: While this nesting looks clean, it makes grep-searching for `.card__title` harder. Consider a project-level trade-off.

---

## 9. When to Create a New Block vs an Element

Ask: **"Can this piece of UI exist independently or be reused outside this context?"**

- **Yes** → Make it a **Block**
- **No** → Make it an **Element**

```
❓ Is `.nav-menu__dropdown` only meaningful inside `.nav-menu`?
   → Yes → Keep it as an element: .nav-menu__dropdown

❓ Could a dropdown appear elsewhere in the UI?
   → Yes → Promote it to its own block: .dropdown
   → Then mix: class="dropdown nav-menu__dropdown"
```

---

## 10. Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  BEM NAMING QUICK REFERENCE                                 │
│                                                             │
│  .block              Top-level component                    │
│  .block__element     Part of block (double underscore)      │
│  .block--modifier    Variant/state (double hyphen)          │
│  .block__el--mod     Element variant                        │
│                                                             │
│  ✅  .nav-menu__item--active                                │
│  ✅  class="card card--dark"    (always keep base class)    │
│  ❌  .nav-menu__item__icon      (no chained elements)       │
│  ❌  class="card--dark"         (missing base class)        │
└─────────────────────────────────────────────────────────────┘
```
