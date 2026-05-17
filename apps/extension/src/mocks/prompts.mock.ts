export const mockPrompts: Record<'shadcn' | 'tailwind' | 'html', string> = {
  shadcn: `## Component Overview

A styled card component featuring a heading, body text, and a call-to-action button. The card uses a white surface with a subtle border, rounded corners, and a hover elevation effect. It is built with Shadcn/ui primitives and Tailwind CSS.

## Visual States

- **Default:** White background (\`bg-white\`), 1px solid border (\`border-gray-200\`), 12px rounded corners (\`rounded-xl\`), 24px inner padding (\`p-6\`).
- **Hover:** Elevates with \`shadow-lg\` and translates -2px on the Y axis (\`hover:-translate-y-0.5\`), transition duration 200ms ease-out.
- **Focus:** Nero Blue (\`#053B84\`) ring on interactive children via \`focus-visible:ring-2 focus-visible:ring-primary\`.
- **Loading:** Button shows a \`<Loader2>\` spinner with \`animate-spin\` in place of the label.
- **Disabled:** Opacity at 50% (\`opacity-50\`), \`cursor-not-allowed\`, no pointer events.

## Extracted Styles

| Token | Computed Value |
|---|---|
| Primary | \`#053B84\` |
| Surface | \`#FFFFFF\` |
| Background Canvas | \`#F5F5F6\` |
| Foreground | \`#0A0A0A\` |
| Border | \`rgba(10,10,10,0.08)\` |
| Secondary Text | \`rgba(10,10,10,0.6)\` |
| Destructive | \`#DC2626\` |
| Success | \`#16A34A\` |
| Border Radius | \`6px\` |
| Font Family (Display) | \`Outfit\`, sans-serif |
| Font Family (Body) | \`DM Sans\`, sans-serif |
| Font Family (Mono) | \`JetBrains Mono\`, monospace |

## ARIA Attributes

- \`role="article"\` on the root card element
- \`aria-labelledby="card-title"\` linking the heading to the card
- \`aria-describedby="card-desc"\` for the body description
- \`aria-label="Submit"\` on the CTA button
- \`aria-expanded="false"\` if any collapsible region exists

## Animations

- **Card entrance:** \`animate-fade-up\` with 300ms duration and 80ms easing
- **Hover elevation:** \`transition-all duration-200 ease-out\`
- **Button loading:** \`animate-spin\` on the spinner icon, 1s linear infinite
- **Content swap:** \`opacity-0 → 1\` cross-fade over 150ms

## Generate This Component

Generate a production-ready React component using Shadcn/ui \`Card\`, \`Button\`, and \`Badge\` primitives. Import from \`@/components/ui/\`. Use Tailwind CSS for all styling. Include all four visual states. Wrap the card in a \`forwardRef\` and spread additional \`className\` via \`cn()\` from \`tailwind-merge\`. Export as a named export. Add a JSDoc comment describing the component and its props.`,
  tailwind: `## Component Overview

A styled card component featuring a heading, body text, and a call-to-action button. The card uses a white surface with a subtle border, rounded corners, and a hover elevation effect. It is built with Tailwind CSS utility classes and does not depend on any component library.

## Visual States

- **Default:** White background (\`bg-white\`), 1px solid border (\`border-gray-200\`), 12px rounded corners (\`rounded-xl\`), 24px inner padding (\`p-6\`).
- **Hover:** Elevates with \`shadow-lg\` and translates -2px on the Y axis (\`hover:-translate-y-0.5\`), transition duration 200ms ease-out.
- **Focus:** Nero Blue (\`#053B84\`) ring on interactive children via \`focus-visible:ring-2 focus-visible:ring-blue-900\`.
- **Loading:** Button shows a spinner SVG with \`animate-spin\` in place of the label.
- **Disabled:** Opacity at 50% (\`opacity-50\`), \`cursor-not-allowed\`, no pointer events.

## Extracted Styles

| Token | Computed Value |
|---|---|
| Primary | \`#053B84\` |
| Surface | \`#FFFFFF\` |
| Background Canvas | \`#F5F5F6\` |
| Foreground | \`#0A0A0A\` |
| Border | \`rgba(10,10,10,0.08)\` |
| Secondary Text | \`rgba(10,10,10,0.6)\` |
| Destructive | \`#DC2626\` |
| Success | \`#16A34A\` |
| Border Radius | \`6px\` |
| Font Family (Display) | \`Outfit\`, sans-serif |
| Font Family (Body) | \`DM Sans\`, sans-serif |
| Font Family (Mono) | \`JetBrains Mono\`, monospace |

## ARIA Attributes

- \`role="article"\` on the root card element
- \`aria-labelledby="card-title"\` linking the heading to the card
- \`aria-describedby="card-desc"\` for the body description
- \`aria-label="Submit"\` on the CTA button
- \`aria-expanded="false"\` if any collapsible region exists

## Animations

- **Card entrance:** Tailwind \`animate-fade-up\` custom keyframe, 300ms duration
- **Hover elevation:** \`transition-all duration-200 ease-out\`
- **Button loading:** \`animate-spin\` on the spinner, 1s linear infinite
- **Content swap:** \`opacity-0 → 1\` cross-fade over 150ms

## Generate This Component

Generate a production-ready React component using Tailwind CSS utility classes only. Do not import any component library. Use \`cn()\` from \`tailwind-merge\` for className merging. Include all four visual states. Make the card accept \`className\` and spread it via \`cn()\`. Export as a named export. Add a JSDoc comment describing the component and its props.`,
  html: `## Component Overview

A styled card component featuring a heading, body text, and a call-to-action button. The card uses a white surface with a subtle border, rounded corners, and a hover elevation effect. This is a plain HTML/CSS implementation with no framework dependencies.

## Visual States

- **Default:** White background, 1px solid \`#E4E4E7\` border, 12px border radius, 24px inner padding, \`box-shadow: none\`.
- **Hover:** Elevates with \`box-shadow: 0px 8px 24px rgba(0,0,0,0.10)\` and translates -2px on the Y axis (\`transform: translateY(-2px)\`), transition 200ms ease-out.
- **Focus:** Nero Blue (\`#053B84\`) outline on interactive elements via \`:focus-visible\`.
- **Loading:** Button spinner overlay (CSS-only spinner using \`@keyframes spin\`).
- **Disabled:** Opacity at 50%, \`cursor: not-allowed\`, \`pointer-events: none\`.

## Extracted Styles

| Token | Computed Value |
|---|---|
| Primary | \`#053B84\` |
| Surface | \`#FFFFFF\` |
| Background Canvas | \`#F5F5F6\` |
| Foreground | \`#0A0A0A\` |
| Border | \`rgba(10,10,10,0.08)\` |
| Secondary Text | \`rgba(10,10,10,0.6)\` |
| Destructive | \`#DC2626\` |
| Success | \`#16A34A\` |
| Border Radius | \`6px\` |
| Font Family (Display) | \`Outfit\`, sans-serif |
| Font Family (Body) | \`DM Sans\`, sans-serif |
| Font Family (Mono) | \`JetBrains Mono\`, monospace |

## ARIA Attributes

- \`role="article"\` on the root card element
- \`aria-labelledby="card-title"\` on the card referencing the heading id
- \`aria-describedby="card-desc"\` on the card referencing the description id
- \`aria-label="Submit"\` on the CTA button
- \`aria-expanded="false"\` on any collapsible region
- \`aria-live="polite"\` on dynamic content regions

## Animations

- **Card entrance:** CSS \`@keyframes fadeInUp\` — translateY(12px) → 0, opacity 0 → 1, 300ms
- **Hover elevation:** \`transition: all 200ms ease-out\`
- **Button loading:** CSS \`@keyframes spin\` — 0% { transform: rotate(0deg) } → 100% { transform: rotate(360deg) }, 1s linear infinite
- **Content swap:** \`transition: opacity 150ms ease-out\`

## Generate This Component

Generate a self-contained HTML file with embedded CSS. Use semantic HTML5 elements (\`<article>\`, \`<h2>\`, \`<p>\`, \`<button>\`). Include a \`<style>\` block with all CSS. Include the CSS custom properties from the token table above as \`:root\` variables. Include all ARIA attributes. Do not use any JavaScript framework or library. Add a comment header describing the component origin.`,
};

export type Framework = keyof typeof mockPrompts;
