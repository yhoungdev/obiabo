declare global {
    interface Window {
      dataLayer: any[];
    }
  }
  
  declare function gtag(command: string, ...params: any[]): void;
  
  export function initializeAnalytics() {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }

      //@ts-ignore
      gtag('js', new Date());
      //@ts-ignore
      gtag('config', 'G-GSQTWFBD18');
    }
  }
  