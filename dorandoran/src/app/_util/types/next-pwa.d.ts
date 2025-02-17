declare module 'next-pwa' {
  import type { NextConfig } from 'next';

  interface PWAOptions {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
  }

  export default function withPWA(options: PWAOptions): (nextConfig: NextConfig) => NextConfig;
}
