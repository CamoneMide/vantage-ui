import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@vantage-ui/ui'],
  outputFileTracingRoot: path.join(process.cwd(), '..', '..'),
};

export default nextConfig;
