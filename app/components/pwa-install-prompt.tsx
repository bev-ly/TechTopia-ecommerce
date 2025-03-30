'use client';

import { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleInstallable = () => setIsInstallable(true);
    const handleInstalled = () => setIsInstallable(false);

    document.addEventListener('pwa:installable', handleInstallable);
    document.addEventListener('pwa:installed', handleInstalled);

    return () => {
      document.removeEventListener('pwa:installable', handleInstallable);
      document.removeEventListener('pwa:installed', handleInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const event = new Event('pwa:installclick');
    document.dispatchEvent(event);
  };

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Install TechTopia</h3>
        <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
          Get the full app experience. Add TechTopia to your home screen!
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleInstallClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Install
          </button>
          <button
            onClick={() => setIsInstallable(false)}
            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium py-2 px-4 rounded transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}