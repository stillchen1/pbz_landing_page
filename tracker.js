/**
 * tracker.js
 * Handles Google Analytics 4 tracking.
 */

class AnalyticsTracker {
  constructor() {
    this.measurementId = 'G-865MN3Y5JT'; // Replace with real GA4 Measurement ID
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    // Capture UTM parameters from URL before initializing tracking
    this.captureUTMParams();

    // Inject GA4 Script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
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

  captureUTMParams() {
    const params = new URLSearchParams(window.location.search);
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    let hasUTM = false;
    utmParams.forEach(param => {
      const value = params.get(param);
      if (value) {
        localStorage.setItem(`pbz_${param}`, value);
        hasUTM = true;
      }
    });

    if (hasUTM) {
      console.log('[Tracker] Captured UTM parameters from URL.');
    }
  }

  trackPageView() {
    // Basic Page View
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        utm_source: localStorage.getItem('pbz_utm_source') || undefined,
        utm_medium: localStorage.getItem('pbz_utm_medium') || undefined,
        utm_campaign: localStorage.getItem('pbz_utm_campaign') || undefined
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
      // 自动从缓存中读取当前用户的来源参数并绑定到各种交互事件上
      const utmSources = {
        utm_source: localStorage.getItem('pbz_utm_source') || undefined,
        utm_medium: localStorage.getItem('pbz_utm_medium') || undefined,
        utm_campaign: localStorage.getItem('pbz_utm_campaign') || undefined,
        utm_content: localStorage.getItem('pbz_utm_content') || undefined,
        utm_term: localStorage.getItem('pbz_utm_term') || undefined
      };
      
      // 合并事件数据与渠道来源数据
      const payload = { ...utmSources, ...eventParameters };
      
      window.gtag('event', eventName, payload);
      console.log(`[Tracker] Tracked Event: ${eventName}`, payload);
    }
  }
}

export const tracker = new AnalyticsTracker();
