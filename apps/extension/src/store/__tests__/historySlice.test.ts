import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import type { ExtractionHistoryItem } from '~mocks/history.mock';

import { useHistoryStore } from '../historySlice';

const createMockItem = (id: string): ExtractionHistoryItem => ({
  id,
  sourceUrl: 'https://example.com',
  sourceDomain: 'example.com',
  elementTag: 'div.test',
  capturedAt: new Date().toISOString(),
  thumbnailUrl: 'https://picsum.photos/seed/test/112/80',
  generatedCode: '<div>test</div>',
  jsonBlueprint: {
    element: 'div',
    attributes: {},
    styles: {},
    animations: [],
    assets: [],
    ariaAttributes: {},
    childElements: [],
  },
});

describe('HistorySlice', () => {
  beforeEach(() => {
    // Reset the store state: the store initializes with mock items,
    // but since Zustand stores are module singletons, we need to
    // clear and re-seed for test isolation.
    useHistoryStore.setState({ items: [] });
  });

  afterEach(() => {
    useHistoryStore.getState().clearAll();
  });

  it('starts empty after reset', () => {
    expect(useHistoryStore.getState().items).toEqual([]);
  });

  it('addItem appends a new item', () => {
    const newItem = createMockItem('new-1');
    useHistoryStore.getState().addItem(newItem);

    const { items } = useHistoryStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('new-1');
  });

  it('removeItem removes only the correct item by id', () => {
    const item1 = createMockItem('id-a');
    const item2 = createMockItem('id-b');
    const item3 = createMockItem('id-c');
    useHistoryStore.getState().addItem(item1);
    useHistoryStore.getState().addItem(item2);
    useHistoryStore.getState().addItem(item3);

    useHistoryStore.getState().removeItem('id-b');

    const { items } = useHistoryStore.getState();
    expect(items).toHaveLength(2);
    expect(items.find((i) => i.id === 'id-b')).toBeUndefined();
  });

  it('removeItem does not mutate the original array (immutable)', () => {
    const item = createMockItem('test-id');
    useHistoryStore.getState().addItem(item);

    const { items: itemsBefore } = useHistoryStore.getState();
    useHistoryStore.getState().removeItem('test-id');

    const { items: itemsAfter } = useHistoryStore.getState();
    expect(itemsAfter).not.toBe(itemsBefore);
    expect(itemsAfter).not.toContainEqual(item);
  });

  it('clearAll removes all items', () => {
    useHistoryStore.getState().addItem(createMockItem('a'));
    useHistoryStore.getState().addItem(createMockItem('b'));
    useHistoryStore.getState().clearAll();
    expect(useHistoryStore.getState().items).toEqual([]);
  });

  it('addItem shows most recent first (prepend behavior)', () => {
    useHistoryStore.getState().addItem(createMockItem('first'));
    useHistoryStore.getState().addItem(createMockItem('second'));

    const { items } = useHistoryStore.getState();
    expect(items[0].id).toBe('second');
    expect(items[1].id).toBe('first');
  });
});
