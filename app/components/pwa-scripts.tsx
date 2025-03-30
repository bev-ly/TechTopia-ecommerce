import Script from "next/script";

export default function PWAScripts() {
  return (
    <>
      {/* Service Worker Registration */}
      <Script
        id="service-worker-registration"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                  (registration) => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  },
                  (err) => {
                    console.log('ServiceWorker registration failed: ', err);
                  }
                );
              });
            }
          `,
        }}
      />

      {/* Web App Install Prompt */}
      <Script
        id="web-app-install-prompt"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
              e.preventDefault();
              deferredPrompt = e;
              document.dispatchEvent(new Event('pwa:installable'));
            });
            
            window.addEventListener('appinstalled', () => {
              deferredPrompt = null;
              document.dispatchEvent(new Event('pwa:installed'));
            });
          `,
        }}
      />


<Script
  id="install-click-handler"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      document.addEventListener('pwa:installclick', async () => {
        if (window.deferredPrompt) {
          window.deferredPrompt.prompt();
          const { outcome } = await window.deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            document.dispatchEvent(new Event('pwa:installed'));
          }
          window.deferredPrompt = null;
        }
      });
    `,
  }}
/>
    </>
  );
}