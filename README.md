# Layout Thrashing Experiment

## What is Layout Thrashing?

Layout thrashing happens when JavaScript repeatedly reads and writes DOM properties that trigger layout recalculations. The browser recalculates the entire page layout multiple times, causing severe performance issues.

## The Problem

Mixing reads and writes in a loop forces the browser to recalculate layout for each iteration:

```javascript
for (let i = 0; i < 1000; i++) {
  const width = divs[i].offsetWidth;      // READ
  divs[i].style.width = width + 1 + "px"; // WRITE
}
```

This triggers ~2000 layout recalculations instead of 1-2.

---

## Our Experiment

Click "Kill the performance" button to see layout thrashing in action. The button triggers reads and writes in rapid succession on 1000 DOM elements.

### DevTools Performance Warning
![DevTools Performance Warning](./images/devtools-performance-warning.png)

### Layout Recalculation Flame Chart
![Recalculate Layout](./images/recalculate-layout-js.png)

JavaScript spends most time on layout recalculations instead of actual work.

---

## The Solution

Separate reads from writes:

```javascript
// Read all values first
const widths = [];
for (let i = 0; i < divs.length; i++) {
  widths[i] = divs[i].offsetWidth;
}

// Then write all values
for (let i = 0; i < divs.length; i++) {
  divs[i].style.width = widths[i] + 1 + "px";
}
```

Result: ~60x performance improvement.

---

## Key Points

- Avoid interleaving reads and writes in loops
- Use Chrome DevTools Performance tab to visualize bottlenecks
- Cache computed values instead of querying repeatedly
- Apply to animation loops, scroll handlers, and resize listeners