import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: [
      'apps/**/*.test.ts',
      'apps/**/*.test.tsx',
      'packages/**/*.test.ts',
      'packages/**/*.test.tsx',
    ],
    passWithNoTests: true,
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
