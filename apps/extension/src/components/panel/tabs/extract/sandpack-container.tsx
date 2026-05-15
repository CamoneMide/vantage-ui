import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';

import { SandpackLoadingState } from './sandpack-loading-state';
import { SandpackToolbar } from './sandpack-toolbar';

const INDEX_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: #FFFFFF;
  padding: 16px;
}
`;

const TAILWIND_CONFIG_JS = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F5F6',
        surface: '#FFFFFF',
        primary: { DEFAULT: '#053B84', foreground: '#FFFFFF' },
        foreground: '#0A0A0A',
        success: '#16A34A',
        destructive: '#DC2626',
        overlay: 'rgba(5,59,132,0.12)',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'level-1': 'none',
        'level-2': '0px 4px 12px rgba(0,0,0,0.05)',
        'level-3': '0px 8px 24px rgba(0,0,0,0.10)',
        cta: '0px 2px 4px rgba(5,59,132,0.20)',
      },
    },
  },
  plugins: [],
};
`;

const CUSTOM_SETUP = {
  dependencies: {
    tailwindcss: 'latest',
    clsx: 'latest',
    'tailwind-merge': 'latest',
    'framer-motion': 'latest',
    'class-variance-authority': 'latest',
  },
} as const;

function SandpackInner({ code, sourceUrl }: SandpackContainerProps) {
  const { sandpack } = useSandpack();
  const [ready, setReady] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!ready) {
      setReady(true);
      return undefined;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      sandpack.updateFile('/App.tsx', code);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [code, ready, sandpack]);

  if (sandpack.status === 'initial' || sandpack.status === 'idle') {
    return <SandpackLoadingState />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <SandpackToolbar sourceUrl={sourceUrl} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '16px',
          padding: '16px',
        }}
      >
        <div
          style={{
            flex: '3',
            minHeight: 0,
            background: '#FFFFFF',
            border: '1px solid rgba(10,10,10,0.08)',
            borderRadius: '8px',
            overflow: 'hidden',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '13px',
          }}
        >
          <SandpackCodeEditor
            showLineNumbers
            showInlineErrors
            style={{ height: '100%' }}
          />
        </div>
        <div
          style={{
            flex: '2',
            minHeight: 0,
            background: '#F5F5F6',
            border: '1px solid rgba(10,10,10,0.08)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <SandpackPreview
            showRefreshButton
            showNavigator={false}
            style={{ height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}

interface SandpackContainerProps {
  code: string
  sourceUrl: string | null
}

function SandpackContainer({ code, sourceUrl }: SandpackContainerProps) {
  const [initialCode] = useState(code);

  const files = useMemo(
    () => ({
      '/App.tsx': initialCode,
      '/index.css': INDEX_CSS,
      '/tailwind.config.js': TAILWIND_CONFIG_JS,
    }),
    [],
  );

  return (
    <SandpackProvider
      template="react-ts"
      customSetup={CUSTOM_SETUP}
      files={files}
      options={{ autorun: true }}
      theme="light"
    >
      <SandpackInner code={code} sourceUrl={sourceUrl} />
    </SandpackProvider>
  );
}

export { SandpackContainer };
