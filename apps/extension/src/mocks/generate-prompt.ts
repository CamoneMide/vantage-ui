import type { Framework } from '~mocks/prompts.mock';
import { mockPrompts } from '~mocks/prompts.mock';
import type { JsonBlueprint } from '~store/extraction-store';
import type { SelectedElementData } from '~schemas/inspector.schema';

export function generatePrompt(
  framework: Framework,
  selectedElement?: SelectedElementData | null,
  jsonBlueprint?: JsonBlueprint | null,
  generatedCode?: string | null,
  sourceUrl?: string | null,
): string {
  if (!selectedElement && !jsonBlueprint) {
    return mockPrompts[framework];
  }

  const tagName = selectedElement?.tagName?.toLowerCase() ?? jsonBlueprint?.element?.toLowerCase() ?? 'component';
  let domain = 'unknown';
  try {
    domain = sourceUrl ? new URL(sourceUrl).hostname.replace('www.', '') : 'unknown';
  } catch {
    domain = 'unknown';
  }

  const styles = jsonBlueprint?.styles ?? {};
  const attributes = jsonBlueprint?.attributes ?? {};
  const ariaAttrs = jsonBlueprint?.ariaAttributes ?? {};
  const childElements = jsonBlueprint?.childElements ?? [];
  const animations = jsonBlueprint?.animations ?? [];

  const overview = `## Component Overview

A \`<${tagName}>\` element extracted from ${domain}${selectedElement?.className ? ` with class \`${selectedElement.className.split(/\s+/)[0]}\`` : ''}. It has ${childElements.length > 0 ? `${childElements.length} child element${childElements.length > 1 ? 's' : ''}` : 'no child elements'} and includes ARIA attributes for accessibility.${sourceUrl ? `\n\n**Source URL:** \`${sourceUrl}\`` : ''}`;

  const styleRows = Object.entries(styles)
    .map(([key, value]) => `| ${key.charAt(0).toUpperCase() + key.slice(1)} | \`${value}\` |`)
    .join('\n');

  const extractedStyles = styleRows
    ? `\n## Extracted Styles\n\n| Token | Computed Value |\n|---|---|\n${styleRows}`
    : '';

  const ariaSection = ariaAttrs && Object.keys(ariaAttrs).length > 0
    ? `\n## ARIA Attributes\n\n${Object.entries(ariaAttrs).map(([key, value]) => `- \`${key}="${value}"\``).join('\n')}`
    : '';

  const animationsSection = animations.length > 0
    ? `\n## Animations\n\n${animations.map((a) => `- ${a}`).join('\n')}`
    : '';

  const childSection = childElements.length > 0
    ? `\n## Child Elements\n\n${childElements.map((c) => `- \`<${c.element}>\`${c.content ? `: "${c.content}"` : ''}`).join('\n')}`
    : '';

  let generateInstruction: string;
  switch (framework) {
    case 'shadcn':
      generateInstruction = `Generate a production-ready React component using Shadcn/ui primitives and Tailwind CSS. Import from \`@/components/ui/\`. Use Tailwind CSS for all styling. Wrap the component in \`forwardRef\` and spread additional \`className\` via \`cn()\` from \`tailwind-merge\`. Export as a named export. Add a JSDoc comment describing the component and its props.${generatedCode ? `\n\n### Reference Generated Code\n\nHere is the code generated from the original extraction:\n\n\`\`\`tsx\n${generatedCode}\n\`\`\`` : ''}`;
      break;
    case 'tailwind':
      generateInstruction = `Generate a production-ready React component using Tailwind CSS utility classes only. Do not import any component library. Use \`cn()\` from \`tailwind-merge\` for className merging. Make the component accept \`className\` and spread it via \`cn()\`. Export as a named export. Add a JSDoc comment describing the component and its props.${generatedCode ? `\n\n### Reference Generated Code\n\nHere is the code generated from the original extraction:\n\n\`\`\`tsx\n${generatedCode}\n\`\`\`` : ''}`;
      break;
    case 'html':
      generateInstruction = `Generate a self-contained HTML file with embedded CSS. Use semantic HTML5 elements. Include a \`<style>\` block with all CSS. Include the CSS custom properties from the token table above as \`:root\` variables. Include all ARIA attributes. Do not use any JavaScript framework or library. Add a comment header describing the component origin.${generatedCode ? `\n\n### Reference Generated Code\n\nHere is the code generated from the original extraction:\n\n\`\`\`tsx\n${generatedCode}\n\`\`\`` : ''}`;
      break;
    default:
      generateInstruction = '';
  }

  return [
    overview,
    extractedStyles,
    ariaSection,
    animationsSection,
    childSection,
    '\n## Generate This Component\n',
    generateInstruction,
  ]
    .filter(Boolean)
    .join('\n');
}
