import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: [
      'apps/**/*.test.ts',
      'apps/**/*.test.tsx',
      'packages/**/*.test.ts',
      'packages/**/*.test.tsx',
    ],
    passWithNoTests: true,
    globals: true,
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: `${path.resolve(__dirname, 'apps/extension/src')}/`,
      },
    ],
  },
});
