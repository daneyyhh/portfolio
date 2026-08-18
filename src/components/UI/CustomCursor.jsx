import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setHovered(true);
        setCursorText(target.getAttribute('data-cursor') || '');
      } else if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        setHovered(true);
        setCursorText('');
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ccff00] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: hovered ? 1.5 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Expanding Ring & Context Label */}
      <motion.div
        className={`fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] flex items-center justify-center font-mono text-[9px] font-bold tracking-widest text-[#ccff00] transition-colors duration-200 ${
          hovered
            ? 'border-[#ccff00] bg-[#ccff00]/10 shadow-[0_0_15px_rgba(204,255,0,0.4)]'
            : 'border-white/30 bg-transparent'
        }`}
        animate={{
          x: position.x - (hovered ? (cursorText ? 40 : 20) : 16),
          y: position.y - (hovered ? (cursorText ? 40 : 20) : 16),
          width: hovered ? (cursorText ? 80 : 40) : 32,
          height: hovered ? (cursorText ? 80 : 40) : 32,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {cursorText && (
          <span className="uppercase text-center px-1 leading-tight text-white drop-shadow">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
