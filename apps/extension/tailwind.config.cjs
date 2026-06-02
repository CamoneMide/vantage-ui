const vantageUiConfig = require('@vantage-ui/ui/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...vantageUiConfig,
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
};
