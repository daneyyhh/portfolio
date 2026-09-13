import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children, disabled = false }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if prefers-reduced-motion is active
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || disabled) {
      return;
    }

    // High-end momentum physics configuration
    const lenis = new Lenis({
      lerp: 0.085, // Physical momentum linear interpolation
      duration: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Natural 1:1 responsive wheel input
      touchMultiplier: 1.5,
      syncTouch: false, // Maintain native smooth touch responsiveness on mobile
      autoResize: true,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Single unified requestAnimationFrame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global anchor navigation handler
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;

      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        const headerOffset = 72;
        lenis.scrollTo(element, {
          offset: -headerOffset,
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Force resize calculation after initial mount & layout pass
    const timer = setTimeout(() => {
      lenis.resize();
    }, 200);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, [disabled]);

  return <>{children}</>;
}
