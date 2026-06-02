import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { getSelectedElementData, isValidTarget } from './dom-utils';
import { GhostHighlight } from './ghost-highlight';
import { InspectorChip } from './inspector-chip';

export function InspectorOverlay() {
  const [isActive, setIsActive] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [navHint, setNavHint] = useState<string | null>(null);

  const isActiveRef = useRef(false);
  const isSelectedRef = useRef(false);
  const hoveredElementRef = useRef<Element | null>(null);
  const selectedElementRef = useRef<Element | null>(null);

  const cleanup = useCallback(() => {
    setIsActive(false);
    setHoveredElement(null);
    setIsSelected(false);
    setNavHint(null);
    isActiveRef.current = false;
    isSelectedRef.current = false;
    hoveredElementRef.current = null;
    selectedElementRef.current = null;
  }, []);

  const deactivate = useCallback(() => {
    cleanup();
    try {
      chrome.runtime.sendMessage({ type: 'INSPECTOR_DEACTIVATED' });
    } catch {
      // ignore
    }
  }, [cleanup]);

  useEffect(() => {
    const messageListener = (message: { type: string }) => {
      if (message.type === 'TOGGLE_INSPECTOR') {
        if (isActiveRef.current) {
          cleanup();
          try {
            chrome.runtime.sendMessage({ type: 'INSPECTOR_DEACTIVATED' });
          } catch {
            // ignore
          }
        } else {
          setIsActive(true);
          isActiveRef.current = true;
          try {
            chrome.runtime.sendMessage({ type: 'INSPECTOR_ACTIVATED' });
          } catch {
            // ignore
          }
        }
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, [cleanup]);

  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isSelectedRef.current) return;
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (isValidTarget(el)) {
        setHoveredElement(el);
        hoveredElementRef.current = el;
      }
    });
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!isActiveRef.current || isSelectedRef.current) return;
    if (!hoveredElementRef.current || !e.target) return;

    const el = hoveredElementRef.current;
    const isTargetClick = el.contains(e.target as Node) || el === e.target;
    if (!isTargetClick) return;

    e.preventDefault();
    e.stopPropagation();

    const data = getSelectedElementData(el);
    setIsSelected(true);
    isSelectedRef.current = true;
    selectedElementRef.current = el;

    try {
      chrome.runtime.sendMessage({ type: 'ELEMENT_SELECTED', payload: data });
    } catch {
      // ignore
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActiveRef.current) return;

      if (e.key === 'Escape') {
        deactivate();
        return;
      }

      if (!isSelectedRef.current) return;

      const currentEl = hoveredElementRef.current;
      if (!currentEl) return;

      let newElement: Element | null = null;
      let hint: string | null = null;

      if (e.key === 'ArrowUp') {
        newElement = currentEl.parentElement;
        hint = 'Parent';
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        newElement = currentEl.firstElementChild;
        hint = 'Child';
        if (newElement instanceof Element) {
          e.preventDefault();
        }
      } else if (e.key === 'ArrowLeft') {
        newElement = currentEl.previousElementSibling;
        hint = 'Previous Sibling';
        if (newElement instanceof Element) {
          e.preventDefault();
        }
      } else if (e.key === 'ArrowRight') {
        newElement = currentEl.nextElementSibling;
        hint = 'Next Sibling';
        if (newElement instanceof Element) {
          e.preventDefault();
        }
      }

      if (newElement) {
        setHoveredElement(newElement);
        hoveredElementRef.current = newElement;
        selectedElementRef.current = newElement;
        setNavHint(hint);
      }
    },
    [deactivate],
  );

  useEffect(() => {
    if (!isActive) return undefined;

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, handleMouseMove, handleClick, handleKeyDown]);

  if (!isActive) return null;

  return (
    <>
      <GhostHighlight
        element={hoveredElement}
        isSelected={isSelected}
        navHint={navHint}
      />
      <InspectorChip show={isActive} />
    </>
  );
}
