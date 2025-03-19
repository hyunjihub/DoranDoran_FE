'use client';

import { useEffect } from 'react';

const PwaProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return <>{children}</>;
};

export default PwaProvider;
