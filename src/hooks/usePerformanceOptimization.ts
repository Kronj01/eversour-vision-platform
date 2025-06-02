
import { useEffect, useCallback, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

export const usePerformanceOptimization = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  });

  // Measure Core Web Vitals
  useEffect(() => {
    // First Contentful Paint
    const observeFCP = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    };

    // Largest Contentful Paint
    const observeLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // First Input Delay
    const observeFID = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          setMetrics(prev => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }));
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
    };

    // Cumulative Layout Shift
    const observeCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    };

    // Time to First Byte
    const measureTTFB = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
      }
    };

    if ('PerformanceObserver' in window) {
      observeFCP();
      observeLCP();
      observeFID();
      observeCLS();
    }
    
    measureTTFB();
  }, []);

  // Optimize images
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" if not present
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add proper alt text if missing
      if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
        img.setAttribute('alt', 'Image');
      }
    });
  }, []);

  // Preload critical resources
  const preloadCriticalResources = useCallback((resources: string[]) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
        link.as = 'image';
      } else if (resource.match(/\.(woff|woff2|ttf|otf)$/)) {
        link.as = 'font';
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });
  }, []);

  // Remove unused CSS
  const removeUnusedCSS = useCallback(() => {
    const stylesheets = Array.from(document.styleSheets);
    
    stylesheets.forEach(stylesheet => {
      try {
        const rules = Array.from(stylesheet.cssRules || []);
        
        rules.forEach((rule, index) => {
          if (rule instanceof CSSStyleRule) {
            const selector = rule.selectorText;
            
            // Check if selector is used in the DOM
            try {
              if (!document.querySelector(selector)) {
                stylesheet.deleteRule(index);
              }
            } catch (e) {
              // Selector might be complex, skip
            }
          }
        });
      } catch (e) {
        // Cross-origin stylesheet, skip
      }
    });
  }, []);

  // Optimize fonts
  const optimizeFonts = useCallback(() => {
    // Add font-display: swap to font faces
    const fontFaces = Array.from(document.fonts);
    
    fontFaces.forEach(font => {
      if (!font.display) {
        font.display = 'swap';
      }
    });

    // Preload critical fonts
    const criticalFonts = [
      '/fonts/inter-regular.woff2',
      '/fonts/inter-semibold.woff2',
      '/fonts/inter-bold.woff2'
    ];

    criticalFonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  // Optimize JavaScript
  const optimizeJavaScript = useCallback(() => {
    // Remove console logs in production
    if (process.env.NODE_ENV === 'production') {
      const originalLog = console.log;
      console.log = () => {};
      console.warn = () => {};
      console.error = originalLog; // Keep errors for debugging
    }

    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      const src = script.getAttribute('src');
      if (src && !src.includes('critical')) {
        script.setAttribute('defer', '');
      }
    });
  }, []);

  // Monitor performance
  const monitorPerformance = useCallback(() => {
    // Check if page load time is too slow
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      if (loadTime > 3000) {
        console.warn(`Slow page load detected: ${loadTime}ms`);
      }
    });

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`);
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    }
  }, []);

  // Bundle all optimizations
  const applyAllOptimizations = useCallback(() => {
    optimizeImages();
    optimizeFonts();
    optimizeJavaScript();
    monitorPerformance();
    
    // Preload critical resources
    preloadCriticalResources([
      '/fonts/inter-regular.woff2',
      '/images/hero-bg.webp',
      '/images/logo.webp'
    ]);
  }, [optimizeImages, optimizeFonts, optimizeJavaScript, monitorPerformance, preloadCriticalResources]);

  // Get performance score
  const getPerformanceScore = useCallback(() => {
    const { fcp, lcp, fid, cls, ttfb } = metrics;
    let score = 100;

    // Deduct points based on Core Web Vitals thresholds
    if (fcp && fcp > 1800) score -= 10;
    if (lcp && lcp > 2500) score -= 20;
    if (fid && fid > 100) score -= 15;
    if (cls && cls > 0.1) score -= 15;
    if (ttfb && ttfb > 800) score -= 10;

    return Math.max(0, score);
  }, [metrics]);

  return {
    metrics,
    optimizeImages,
    preloadCriticalResources,
    removeUnusedCSS,
    optimizeFonts,
    optimizeJavaScript,
    monitorPerformance,
    applyAllOptimizations,
    getPerformanceScore
  };
};
