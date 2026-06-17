# 01 — HTML Essentials

You've shipped HTML for two years. This module skips the tag tour and isolates
the handful of HTML topics that **still come up in senior interviews** and the
ones whose details people fumble under pressure.

## The heart of this module

[`index.html`](./index.html) — a single, heavily annotated page. **Read the
comments, not just the markup.** Each block answers an interview question:
doctype/quirks mode, charset placement, the viewport meta, the critical
rendering path, `defer` vs `async` vs `module`, semantic landmarks, accessible
forms, and responsive images.

Open it in a browser, then run **Lighthouse** (DevTools → Lighthouse) and read
the Accessibility + Best Practices audits against the code.

## The mental model that ties it together: the Critical Rendering Path

```
HTML bytes ─► DOM ─┐
                   ├─► Render Tree ─► Layout ─► Paint ─► Composite
CSS bytes ─► CSSOM ─┘
```

- **CSS is render-blocking**: nothing paints until the CSSOM is ready.
- **A plain `<script>` is parser-blocking**: it freezes DOM construction. This
  is the single reason `defer`/`async` exist and the most-asked HTML perf
  question. See the script-loading comment block in `index.html`.
- **JS can read AND write the DOM/CSSOM**, which is why the browser can't safely
  build them in parallel while a blocking script is pending.

## The topics, in one screen

| Topic | The point an interviewer wants |
|-------|--------------------------------|
| `<!DOCTYPE html>` | Switches to standards mode; absence = quirks mode (broken box model). |
| `charset` first | Must be in first 1024 bytes or the browser re-parses. UTF-8 always. |
| Viewport meta | Without it, media queries never fire on mobile. Never disable zoom. |
| `defer` vs `async` | `defer`: ordered, after DOM. `async`: unordered, ASAP. `module`: deferred + scoped. |
| Semantic elements | Landmarks + free a11y/keyboard behavior + SEO + readable markup. |
| One `<h1>`, no skipped levels | Screen readers navigate by the heading outline. |
| Labels for inputs | `<label for>` = accessible name + autofill + bigger hit target. Placeholder ≠ label. |
| `alt` text | Mandatory; `alt=""` for decorative so SRs skip it. |
| `width`/`height` on `<img>` | Reserves space → avoids layout shift (CLS, a Core Web Vital). |
| `srcset`/`sizes` | Browser picks the right-resolution image per device. |
| `loading="lazy"` | Defers offscreen images/iframes natively. |
| Core Web Vitals | LCP (loading), INP (interactivity), CLS (visual stability). |

## Accessibility (a11y) — the senior expectation

A senior is expected to ship accessible UI by default, not as a "phase 2". The
cheap, high-impact rules:

1. Use the **native element** (`<button>`, `<a href>`, `<input>`) before ARIA.
   *"No ARIA is better than bad ARIA."* ARIA changes semantics but adds **zero**
   behavior — a `<div role="button">` still needs you to wire keyboard handlers,
   focus, and `aria-pressed` by hand.
2. Everything operable by mouse must be operable by **keyboard** (Tab focus
   order, Enter/Space, visible focus ring).
3. Every input has an **accessible name** (a `<label>`).
4. Respect **contrast** (WCAG AA: 4.5:1 for body text) and don't convey meaning
   by color alone.
5. Provide a **skip link** and correct **landmarks** (`header`/`nav`/`main`/`footer`).

---

## Interview drills

> Answer out loud before reading the "wants to hear" line.

**Q1. What does `<!DOCTYPE html>` actually do?**
Wants to hear: it has nothing to do with validation against a DTD anymore; it
just opts the page into standards mode instead of quirks mode (where the box
model and legacy CSS bugs are emulated). There is one correct doctype.

**Q2. Difference between `defer`, `async`, and `type="module"`?**
Wants to hear: all three download in parallel without blocking the parser.
`defer` executes after parsing, in document order — the default for app code.
`async` executes the instant it arrives, order not guaranteed — for independent
third-party scripts. `module` is deferred by default, runs in strict mode with
its own scope, and supports `import`/`export`.

**Q3. Why is CSS "render-blocking" but not "parser-blocking"?**
Wants to hear: HTML parsing continues while CSS downloads (the DOM keeps
building), but the browser won't *paint* until the CSSOM is built, to avoid a
flash of unstyled content. A synchronous `<script>`, by contrast, blocks the
parser because scripts can mutate the DOM/CSSOM mid-construction.

**Q4. `<section>` vs `<article>` vs `<div>`?**
Wants to hear: `<article>` is self-contained/syndicatable; `<section>` is a
thematic group with a heading; `<div>` is the no-semantics fallback for styling
hooks. Don't use `<section>` purely to attach a class.

**Q5. Why isn't a `placeholder` a substitute for a `<label>`?**
Wants to hear: placeholders vanish on input (no persistent context), often fail
contrast, aren't reliably announced by screen readers, and break for users who
return to a half-filled form. Labels also enlarge the click target and enable
autofill.

**Q6. Name the Core Web Vitals and one HTML-level fix for each.**
Wants to hear: **LCP** (largest contentful paint) → preload the hero, size
images, avoid render-blocking resources. **INP** (interaction to next paint) →
keep main-thread work small, defer non-critical JS. **CLS** (cumulative layout
shift) → set `width`/`height` (or `aspect-ratio`) on images/embeds, reserve
space for ads/fonts.

**Q7. How do you make a non-`<button>` element behave as a button accessibly?**
Wants to hear: ideally don't — use `<button>`. If forced: `role="button"`,
`tabindex="0"`, keydown handlers for Enter **and** Space, and manage
`aria-pressed`/disabled state yourself. This is the canonical "ARIA adds
semantics but no behavior" answer.

### Coding task
Take a `<div class="card" onclick=...>` "fake button" and refactor it into
fully accessible, semantic markup. Justify each change (element choice, focus,
keyboard, naming) as if reviewing a junior's PR.
