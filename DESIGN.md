# Design System

## 1. Visual Theme & Atmosphere

The interface is clean, modern, and highly professional. Built on a crisp Soft White (`#F5F5F6`) canvas, the design creates a sense of clarity and precision. Where other designs might lean into warm organics, this system radiates reliability and sharp execution.

The signature typographic combination pairs **Outfit** for geometric, modern headings with **DM Sans** for highly legible, clean body text. Combined with a striking **Nero Blue** (`#053B84`) accent, the visual language says "trustworthy, precise, and powerful tool."

### Key Characteristics:

- Clean Soft White (`#F5F5F6`) canvas evoking digital clarity.
- Geometric and modern type family: **Outfit** for headlines, **DM Sans** for UI and body text.
- Nero Blue brand accent (`#053B84`) — professional, deep, and authoritative.
- High-contrast neutral palette anchoring the design with Deep Black (`#0A0A0A`) and pure Black (`#000000`).
- Crisp, modern container styling emphasizing content readability and structure.

## 2. Color Palette & Roles

### Primary

- **Deep Black (`#0A0A0A`)**: The primary text color and primary dark surface. A very rich, almost pure black that provides maximum readability on light surfaces.
- **Black (`#000000`)**: The absolute darkest tone, used for ultimate emphasis or deep background elements.
- **Nero Blue (`#053B84`)**: The core brand color — a deep, authoritative blue used for primary CTA buttons, brand moments, and interactive focus states.

### Surface & Background

- **Soft White (`#F5F5F6`)**: The primary page background. A crisp off-white that reduces eye strain while maintaining a clean, modern aesthetic.
- **White (`#FFFFFF`)**: The lightest surface — used for cards, elevated containers, and primary content areas on the Soft White background to create subtle layering.

_(Note: Use opacity variations of Deep Black, e.g., `rgba(10, 10, 10, 0.6)`, for secondary text, borders, and shadows to maintain chromatic consistency without introducing conflicting gray hues.)_

## 3. Typography Rules

### Font Family

- **Heading**: Outfit
- **Body / UI**: DM Sans

### Hierarchy

| Role                | Font    | Size           | Weight         | Line Height | Notes                       |
| :------------------ | :------ | :------------- | :------------- | :---------- | :-------------------------- |
| **Display / Hero**  | Outfit  | 64px (4rem)    | 600 (SemiBold) | 1.10        | Maximum impact              |
| **Section Heading** | Outfit  | 52px (3.25rem) | 600 (SemiBold) | 1.20        | Feature section anchors     |
| **Sub-heading**     | Outfit  | 32px (2rem)    | 500 (Medium)   | 1.20        | Card titles, feature names  |
| **Body Large**      | DM Sans | 20px (1.25rem) | 400 (Regular)  | 1.60        | Intro paragraphs            |
| **Body Standard**   | DM Sans | 16px (1rem)    | 400 (Regular)  | 1.50        | Standard body, button text  |
| **Body Small**      | DM Sans | 14px (0.88rem) | 400 (Regular)  | 1.50        | Compact body text, metadata |
| **Label / Micro**   | DM Sans | 12px (0.75rem) | 500 (Medium)   | 1.25        | Badges, small labels        |

### Principles

- **Outfit for presence, DM Sans for clarity**: Outfit gives headlines a modern, geometric punch, while DM Sans handles all functional UI text quietly and efficiently.
- **Clear typographical hierarchy**: Ensure distinct size and weight differences between headings and body text to guide the user's eye naturally.
- **Comfortable line-heights**: Body text uses a 1.50 line-height for optimal readability, while headings remain tighter (1.10–1.20) for visual impact.

## 4. Component Stylings

### Buttons

**Primary Brand**

- Background: Nero Blue (`#053B84`)
- Text: White (`#FFFFFF`)
- Radius: 8px
- Shadow: Subtle shadow (`0px 2px 4px rgba(5, 59, 132, 0.2)`)
- The primary CTA — the highest signal interactive element.

**Secondary / Surface**

- Background: White (`#FFFFFF`)
- Text: Deep Black (`#0A0A0A`)
- Border: 1px solid `rgba(10, 10, 10, 0.1)`
- Radius: 8px
- Clean, elevated button for less prominent actions.

**Ghost / Text**

- Background: Transparent
- Text: Nero Blue (`#053B84`) or Deep Black (`#0A0A0A`)
- Hover: Soft White (`#F5F5F6`) background.

### Cards & Containers

- Background: White (`#FFFFFF`) on Soft White surfaces, or Soft White (`#F5F5F6`) on White surfaces.
- Border: Thin solid border using a low opacity of Deep Black (`rgba(10, 10, 10, 0.08)`).
- Radius: Comfortably rounded (8px–12px).
- Shadow: Subtle depth for elevated content (`0px 4px 12px rgba(0, 0, 0, 0.05)`).

### Inputs & Forms

- Background: White (`#FFFFFF`)
- Text: Deep Black (`#0A0A0A`)
- Border: `1px solid rgba(10, 10, 10, 0.15)`
- Focus: 2px solid Nero Blue (`#053B84`)
- Radius: 8px
- Padding: 12px 16px

### Navigation

- Background: White (`#FFFFFF`) or Soft White (`#F5F5F6`)
- Links: Deep Black (`#0A0A0A`)
- Active/Hover state: Nero Blue (`#053B84`)

## 5. Layout Principles

### Spacing System

- Base unit: 8px
- Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
- Standardize padding and margins using multiples of 8.

### Whitespace Philosophy

- Use whitespace intentionally to group related elements and separate distinct sections.
- Generous padding inside containers (e.g., 24px–32px for cards) ensures content never feels cramped.

### Border Radius Scale

- Sharp (0px–4px): Minimal inline elements or strict grid-based designs.
- Comfortably rounded (8px): Standard buttons, inputs, cards.
- Generously rounded (12px–16px): Large featured containers or modals.

## 6. Depth & Elevation

- **Flat (Level 0)**: Soft White (`#F5F5F6`) background, inline text. No shadows.
- **Contained (Level 1)**: White (`#FFFFFF`) surfaces with thin 1px borders. No shadows.
- **Elevated (Level 2)**: Cards or dropdowns with soft drop shadows (`0px 4px 12px rgba(0, 0, 0, 0.05)`).
- **Highest (Level 3)**: Modals or floating action buttons with prominent shadows (`0px 8px 24px rgba(0, 0, 0, 0.1)`).

## 7. Do's and Don'ts

### Do

- Use Soft White (`#F5F5F6`) as the primary light background to reduce glare and establish the modern aesthetic.
- Use Outfit for all headings to maintain the brand's geometric identity.
- Use Nero Blue (`#053B84`) strategically for primary CTAs and active states.
- Maintain high contrast by using Deep Black (`#0A0A0A`) for primary text.
- Use low-opacity black (`rgba(10, 10, 10, 0.6)`) for secondary text rather than introducing arbitrary grays.

### Don't

- Don't use warm, earthy colors like terracotta or parchment. The aesthetic is sharp, cool, and professional.
- Don't mix other font families — stick strictly to Outfit and DM Sans.
- Don't overuse Nero Blue; keep it reserved for elements that genuinely need user attention.
- Don't use heavy, dark shadows; keep elevation subtle and clean.

## 8. Agent Prompt Guide

### Quick Color Reference

- **Brand CTA**: Nero Blue (`#053B84`)
- **Page Background**: Soft White (`#F5F5F6`)
- **Card Surface**: White (`#FFFFFF`)
- **Primary Text**: Deep Black (`#0A0A0A`)
- **Darkest Element**: Black (`#000000`)

### Example Component Prompts

- "Create a hero section on Soft White (`#F5F5F6`) with a headline at 64px Outfit, SemiBold. Use Deep Black (`#0A0A0A`) text. Add a subtitle in `rgba(10, 10, 10, 0.6)` at 20px DM Sans with 1.60 line-height. Place a Nero Blue (`#053B84`) CTA button with White text, 8px radius."
- "Design a feature card on White (`#FFFFFF`) with a 1px solid `rgba(10, 10, 10, 0.08)` border and comfortably rounded corners (8px). Title in Outfit at 24px Medium, description in DM Sans at 16px. Add a subtle shadow (`0px 4px 12px rgba(0, 0, 0, 0.05)`)."

### Iteration Guide

- Always reference specific color hexes and font names.
- Describe the visual hierarchy explicitly: "Outfit for the heading, DM Sans for the body".
- Focus on sharp, clean UI execution.
