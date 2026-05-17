/* eslint-disable react/no-array-index-key */
// This file renders static markdown content. Array indices in keys are safe
// here because the content never reorders or filters — it's a pure render helper.

import type { ReactNode } from 'react';

type MarkdownNode =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; children: InlineNode[] }
  | { type: 'code'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'list'; items: InlineNode[][] }
  | { type: 'hr' };

type InlineNode =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'code'; text: string }
  | { type: 'linebreak' };

function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\n)/g;
  let lastIndex = 0;

  let match = regex.exec(text);
  while (match !== null) {
    if (match.index > lastIndex) {
      nodes.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }
    const token = match[0];
    if (token === '\n') {
      nodes.push({ type: 'linebreak' });
    } else if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push({ type: 'bold', text: token.slice(2, -2) });
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push({ type: 'code', text: token.slice(1, -1) });
    }
    lastIndex = match.index + token.length;
    match = regex.exec(text);
  }
  if (lastIndex < text.length) {
    nodes.push({ type: 'text', text: text.slice(lastIndex) });
  }
  return nodes;
}

function parseMarkdown(markdown: string): MarkdownNode[] {
  const lines = markdown.split('\n');
  const nodes: MarkdownNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^##\s/.test(line)) {
      nodes.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
      i += 1;
    } else if (/^###\s/.test(line)) {
      nodes.push({ type: 'h3', text: line.replace(/^###\s+/, '') });
      i += 1;
    } else if (/^---+\s*$/.test(line)) {
      nodes.push({ type: 'hr' });
      i += 1;
    } else if (/^```/.test(line)) {
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      nodes.push({ type: 'code', text: codeLines.join('\n') });
    } else if (/^\|/.test(line)) {
      const headers = line
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean);
      i += 1;
      if (i < lines.length && /^\|[\s:-]+\|/.test(lines[i])) {
        i += 1;
      }
      const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        const row = lines[i]
          .split('|')
          .map((s) => s.trim())
          .filter(Boolean);
        if (row.length > 0) {
          rows.push(row);
        }
        i += 1;
      }
      nodes.push({ type: 'table', headers, rows });
    } else if (/^-\s/.test(line)) {
      const items: InlineNode[][] = [];
      while (i < lines.length && /^-\s/.test(lines[i])) {
        const text = lines[i].replace(/^-\s+/, '');
        items.push(parseInline(text));
        i += 1;
      }
      nodes.push({ type: 'list', items });
    } else if (/^\d+\.\s/.test(line)) {
      const items: InlineNode[][] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const text = lines[i].replace(/^\d+\.\s+/, '');
        items.push(parseInline(text));
        i += 1;
      }
      nodes.push({ type: 'list', items });
    } else if (line.trim() === '') {
      i += 1;
    } else {
      nodes.push({ type: 'p', children: parseInline(line) });
      i += 1;
    }
  }

  return nodes;
}

const STYLES = {
  heading2: {
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    color: '#0A0A0A',
    margin: '16px 0 6px',
  },
  heading3: {
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 600,
    fontSize: '14px',
    color: '#0A0A0A',
    margin: '12px 0 4px',
  },
  paragraph: {
    margin: '6px 0',
    lineHeight: 1.6,
  },
  inlineCode: {
    background: '#F5F5F6',
    fontFamily: 'JetBrains Mono, monospace' as const,
    fontSize: '12px',
    borderRadius: '4px',
    padding: '2px 4px',
  },
  blockCode: {
    display: 'block',
    background: '#F5F5F6',
    fontFamily: 'JetBrains Mono, monospace' as const,
    fontSize: '12px',
    borderRadius: '6px',
    padding: '12px',
    margin: '8px 0',
    overflowX: 'auto' as const,
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap' as const,
  } as React.CSSProperties,
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '13px',
    margin: '8px 0',
  },
  th: {
    textAlign: 'left' as const,
    padding: '6px 8px',
    background: '#F5F5F6',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 500,
    fontSize: '12px',
    color: 'rgba(10,10,10,0.6)',
    borderBottom: '1px solid rgba(10,10,10,0.08)',
  },
  td: {
    padding: '6px 8px',
    borderBottom: '1px solid rgba(10,10,10,0.06)',
    fontFamily: 'JetBrains Mono, monospace' as const,
    fontSize: '12px',
  },
  list: {
    margin: '4px 0',
    paddingLeft: '20px',
  },
  listItem: {
    margin: '2px 0',
  },
  bold: {
    fontWeight: 600,
    color: '#0A0A0A',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid rgba(10,10,10,0.08)',
    margin: '12px 0',
  },
};

function renderInline(nodes: InlineNode[]): ReactNode {
  return nodes.map((node, i) => {
    if (node.type === 'text') {
      return <span key={`t-${i}-${node.text.slice(0, 8)}`}>{node.text}</span>;
    }
    if (node.type === 'bold') {
      return (
        <strong key={`b-${i}-${node.text}`} style={STYLES.bold}>
          {node.text}
        </strong>
      );
    }
    if (node.type === 'code') {
      return (
        <code key={`c-${i}-${node.text}`} style={STYLES.inlineCode}>
          {node.text}
        </code>
      );
    }
    if (node.type === 'linebreak') {
      return <br key={`lb-${i}`} />;
    }
    return null;
  });
}

let nodeKeyCounter = 0;
function nextNodeKey(): number {
  nodeKeyCounter += 1;
  return nodeKeyCounter;
}

function MarkdownRenderer({ markdown }: { markdown: string }) {
  const nodes = parseMarkdown(markdown);

  return (
    <>
      {nodes.map((node) => {
        const key = nextNodeKey();
        switch (node.type) {
          case 'h2':
            return (
              <h2 key={key} style={STYLES.heading2}>
                {node.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={key} style={STYLES.heading3}>
                {node.text}
              </h3>
            );
          case 'p':
            return (
              <p key={key} style={STYLES.paragraph}>
                {renderInline(node.children)}
              </p>
            );
          case 'code':
            return (
              <pre key={key} style={STYLES.blockCode}>
                {node.text}
              </pre>
            );
          case 'hr':
            return <hr key={key} style={STYLES.hr} />;
          case 'table':
            return (
              <div key={key} style={{ overflowX: 'auto', margin: '8px 0' }}>
                <table style={STYLES.table}>
                  <thead>
                    <tr>
                      {node.headers.map((h, j) => (
                        <th key={`h-${j}-${h}`} style={STYLES.th}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {node.rows.map((row, j) => (
                      <tr key={`r-${j}`}>
                        {row.map((cell, k) => (
                          <td
                            key={`c-${k}-${cell.slice(0, 8)}`}
                            style={STYLES.td}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'list':
            return (
              <ul key={key} style={STYLES.list}>
                {node.items.map((item, j) => (
                  <li key={`li-${j}`} style={STYLES.listItem}>
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export { MarkdownRenderer };
