/**
 * tracker.js
 * Handles Google Analytics 4 tracking.
 */

class AnalyticsTracker {
  constructor() {
    this.measurementId = 'G-XXXXXXXXXX'; // Replace with real GA4 Measurement ID
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    
    // Inject GA4 Script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    }
    
    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      send_page_view: false // We handle pageview manually below if we need extra custom dims
    });

    this.initialized = true;
    
    // Process initial tracking
    this.trackPageView();
    
    console.log('[Tracker] GA4 Initialized. Ready for Data Team implementation.');
  }

  trackPageView() {
    // Basic Page View
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
      console.log('[Tracker] Tracked Page View (PV)');
    }

    // Tracking UV locally (for demo purposes if needed, though GA4 tracks users automatically via cookies)
    const uvToken = localStorage.getItem('pbz_uv_token');
    if (!uvToken) {
      const freshToken = 'uv_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('pbz_uv_token', freshToken);
      
      // Fire custom first_visit event if needed
      if (window.gtag) {
        window.gtag('event', 'custom_unique_visit', {
          custom_token: freshToken
        });
      }
      console.log('[Tracker] Tracked New Unique Visitor (UV)');
    } else {
      console.log('[Tracker] Returning Visitor');
    }
  }

  trackEvent(eventName, eventParameters = {}) {
    if (window.gtag) {
      window.gtag('event', eventName, eventParameters);
      console.log(`[Tracker] Tracked Event: ${eventName}`, eventParameters);
    }
  }
}

export const tracker = new AnalyticsTracker();
