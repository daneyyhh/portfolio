// GrilledPixels Lenis Setup
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react';

export const useGrilledPixelsScroll = () => {
  useEffect(() => {
    // GrilledPixels-style Lenis configuration
    const lenis = new Lenis({
      duration: 1.2,          // Premium feel - slightly slower
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,    // Controlled scroll sensitivity
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF loop for 60fps buttery smooth
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle scroll stop
    lenis.on('scroll', ({ velocity }) => {
      if (Math.abs(velocity) < 0.1) {
        lenis.stop();
        setTimeout(() => lenis.start(), 100);
      }
    });

    // Global access for other components
    window.lenis = lenis;

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis.destroy();
    };
  }, []);
};

export default useGrilledPixelsScroll;