# Understanding the Color Scale

Learn which scale step is the most appropriate for each use case.

## Use Cases

There are **12 steps** in each scale. Each step was designed for at least one specific use case.

This table is a simple overview of the most common use case for each step. However, there are many exceptions and caveats to factor in, which are covered in further detail below.

| Step | Use Case                                |
| ---- | --------------------------------------- |
| 1    | App background                          |
| 2    | Subtle background                       |
| 3    | UI element background                   |
| 4    | Hovered UI element background           |
| 5    | Active / Selected UI element background |
| 6    | Subtle borders and separators           |
| 7    | UI element border and focus rings       |
| 8    | Hovered UI element border               |
| 9    | Solid backgrounds                       |
| 10   | Hovered solid backgrounds               |
| 11   | Low-contrast text                       |
| 12   | High-contrast text                      |

## Steps 1–2: Backgrounds

Steps 1 and 2 are designed for **app backgrounds** and **subtle component backgrounds**. You can use them interchangeably, depending on the vibe you're going for.

### Appropriate applications include:

- Main app background
- Striped table background
- Code block background
- Card background
- Sidebar background
- Canvas area background

> **Tip:** You may want to use white for your app background in light mode, and Step 1 or 2 from a gray or coloured scale in dark mode. In this case, set up a mutable alias for \`AppBg\` and map it to a different color for each color mode.

## Steps 3–5: Component Backgrounds

Steps 3, 4, and 5 are designed for **UI component backgrounds**.

- **Step 3** is for normal states
- **Step 4** is for hover states
- **Step 5** is for pressed or selected states

> **Note:** If your component has a transparent background in its default state, you can use Step 3 for its hover state.

> **Accessibility:** Steps 11 and 12—which are designed for text—are guaranteed to meet Lc 60 and Lc 90 APCA contrast ratio on top of a step 2 background from the same scale.

## Steps 6–8: Borders

Steps 6, 7, and 8 are designed for **borders**.

- **Step 6** is designed for subtle borders on components which are **not interactive**. For example: sidebars, headers, cards, alerts, and separators.
- **Step 7** is designed for subtle borders on **interactive components**.
- **Step 8** is designed for stronger borders on **interactive components** and **focus rings**.

## Steps 9–10: Solid Backgrounds

Steps 9 and 10 are designed for **solid backgrounds**.

### Step 9 - The Purest Color

Step 9 has the **highest chroma** of all steps in the scale. In other words, it's the purest step, the step mixed with the least amount of white or black. Because 9 is the purest step, it has a wide range of applications:

- Website/App backgrounds
- Website section backgrounds
- Header backgrounds
- Component backgrounds
- Graphics/Logos
- Overlays
- Coloured shadows
- Accent borders

### Step 10 - Hover States

Step 10 is designed for **component hover states**, where step 9 is the component's normal state background.

> **Text Color Guidelines:** Most step 9 colors are designed for **white foreground text**. Sky, Mint, Lime, Yellow, and Amber are designed for **dark foreground text** on steps 9 and 10.

## Steps 11–12: Text

Steps 11 and 12 are designed for **text**.

- **Step 11** is designed for low-contrast text
- **Step 12** is designed for high-contrast text

### Examples:

- Low contrast: Pink 11, Slate 11, Gray 11
- High contrast: Pink 12, Slate 12, Gray 12

### shadows Guidelines:

- Shadows used in the components are derived from a 6-step scale. refer theme.css.
- shadow-1 for inset.
- Shadows for variant="classic" panels, like Card:
  var(--shadow-2);
  var(--shadow-3);

- Shadows for smaller overlay panels, like Hover Card and Popover:
  var(--shadow-4);
  var(--shadow-5);

- Shadows for larger overlay panels, like Dialog:
  var(--shadow-6);

# 12-Step Color Scale Summary

This is a **12-step color scale** where each step or group of steps is designated for specific UI element use cases and states.

## Quick Reference

- **Steps 1-2:** Primarily for app backgrounds and subtle backgrounds
- **Steps 3-5:** For interactive UI component backgrounds (normal, hover, active/selected states)
- **Steps 6-8:** For borders and separators, increasing in prominence (subtle non-interactive, subtle interactive, strong interactive/focus)
- **Steps 9-10:** For solid, vibrant backgrounds (Step 9 is the purest color) and their hover states
- **Steps 11-12:** For text (low and high contrast), designed to ensure readability against lighter backgrounds like Step 2

## Purpose

The scale aims to provide a **structured and consistent** way to apply color across a user interface, mapping specific visual roles (like backgrounds, borders, text, and interactive states) to distinct steps for clarity and maintainability in design systems.

> **Note:** While general use cases are assigned, specific applications may have exceptions.
