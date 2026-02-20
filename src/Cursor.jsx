import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      raf = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    };
    const onLeaveLink = () => {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
                @media (pointer: fine) {
                    body { cursor: none !important; }
                    a, button, [role="button"] { cursor: none !important; }
                }
                .c-dot {
                    position: fixed;
                    top: 0; left: 0;
                    width: 12px; height: 12px;
                    background: #FFE500;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99999;
                    will-change: transform;
                    transition: width 0.2s, height 0.2s, background 0.2s;
                    mix-blend-mode: difference;
                }
                .c-dot.cursor-hover {
                    width: 8px; height: 8px;
                    background: #fff;
                }
                .c-ring {
                    position: fixed;
                    top: 0; left: 0;
                    width: 40px; height: 40px;
                    border: 1.5px solid rgba(255,229,0,0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99998;
                    will-change: transform;
                    transition: width 0.3s, height 0.3s, border-color 0.3s, border-width 0.3s;
                }
                .c-ring.cursor-hover {
                    width: 56px; height: 56px;
                    border-color: rgba(255,229,0,0.9);
                    border-width: 2px;
                }
                @media (pointer: coarse) {
                    .c-dot, .c-ring { display: none; }
                    body { cursor: auto !important; }
                }
            `}</style>
      <div ref={dotRef} className="c-dot" aria-hidden="true" />
      <div ref={ringRef} className="c-ring" aria-hidden="true" />
    </>
  );
};

export default Cursor;
