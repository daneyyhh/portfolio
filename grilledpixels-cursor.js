// GrilledPixels Custom Cursor Component
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GrilledPixelsCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorScaleRef = useRef(1);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Mouse move handler
    const onMouseMove = (e) => {
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    // Mouse enter handler - scale up
    const onMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(cursorDot, {
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Mouse leave handler - scale back
    const onMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);

    // Interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, .project-card, .nav-link, [data-interactive]'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed w-10 h-10 border border-white/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div 
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50"
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
};

export default GrilledPixelsCursor;