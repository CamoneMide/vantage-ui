import type { SelectedElementData } from '~schemas/inspector.schema';

import { ARIA_ATTRIBUTES, DATA_ATTRIBUTES, VANTAGEUI_ATTR } from './types';

function collectAttributes(
  element: Element,
  attrs: readonly string[],
): Record<string, string> {
  const result: Record<string, string> = {};
  attrs.forEach((attr) => {
    const value = element.getAttribute(attr);
    if (value !== null) {
      result[attr] = value;
    }
  });
  return result;
}

export function getAriaAttributes(element: Element): Record<string, string> {
  return collectAttributes(element, ARIA_ATTRIBUTES);
}

export function getDataAttributes(element: Element): Record<string, string> {
  return collectAttributes(element, DATA_ATTRIBUTES);
}

export function getSelectedElementData(element: Element): SelectedElementData {
  const rect = element.getBoundingClientRect();
  const rawClassName = element.className || '';
  const className = typeof rawClassName === 'string'
    ? rawClassName.split(/\s+/).slice(0, 3).join(' ') || null
    : null;
  const innerHTML = element.innerHTML.slice(0, 500);

  return {
    tagName: element.tagName.toLowerCase(),
    id: element.id || null,
    className,
    boundingRect: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    },
    ariaAttributes: {
      ...getAriaAttributes(element),
      ...getDataAttributes(element),
    },
    innerHTML,
  };
}

export function isValidTarget(el: Element | null): el is Element {
  if (!el) return false;
  if (el.getAttribute(VANTAGEUI_ATTR) !== null) return false;
  if (el.closest(`[${VANTAGEUI_ATTR}]`)) return false;
  if (el.id === 'vantageui-root') return false;
  if (el.tagName === 'HTML' || el.tagName === 'BODY') return false;
  if (el.getRootNode() instanceof ShadowRoot) return false;
  return true;
}
