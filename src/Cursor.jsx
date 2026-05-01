import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const SpiderSense = ({ isPointer }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <motion.path
        key={i}
        d="M50 20 Q50 10 60 5"
        stroke="#ff003c"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        style={{ originX: "50px", originY: "50px", rotate: angle }}
        animate={{ 
          opacity: isPointer ? [0, 1, 0] : [0, 0.5, 0],
          scale: isPointer ? [0.8, 1.2, 0.8] : [0.5, 0.8, 0.5],
          x: isPointer ? [0, 5, -5, 0] : 0
        }}
        transition={{ 
          duration: 0.3, 
          repeat: Infinity, 
          delay: i * 0.05 
        }}
      />
    ))}
  </svg>
);

const MilesSpiderGraffiti = ({ isPointer }) => (
  <div className="relative w-full h-full">
    {/* RGB Glitch Layers */}
    <motion.div
      className="absolute inset-0 text-[#00ffff] mix-blend-screen opacity-70"
      animate={{ x: [-2, 2, -1], y: [1, -1, 0] }}
      transition={{ duration: 0.1, repeat: Infinity }}
    >
      <SpiderSVG />
    </motion.div>
    <motion.div
      className="absolute inset-0 text-[#ff003c] mix-blend-screen opacity-70"
      animate={{ x: [2, -2, 1], y: [-1, 1, 0] }}
      transition={{ duration: 0.1, repeat: Infinity }}
    >
      <SpiderSVG />
    </motion.div>
    <div className="relative text-white">
      <SpiderSVG />
    </div>
  </div>
);

const SpiderSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C11.5 2 11 2.5 11 3C11 3.5 11.5 4 12 4C12.5 4 13 3.5 13 3C13 2.5 12.5 2 12 2ZM12 5C10 5 8 6 8 8C8 10 10 11 10 13C10 15 8 16 8 18C8 20 10 21 12 21C14 21 16 20 16 18C16 16 14 15 14 13C14 11 16 10 16 8C16 6 14 5 12 5ZM5 7C4 7 3 8 3 9C3 10 4 11 5 11C5.5 11 6 10.5 6 10C6 9.5 5.5 9 5 9C4.5 9 4 9.5 4 10C4 10.5 4.5 11 5 11C6 11 7 10 7 9C7 8 6 7 5 7ZM19 7C18 7 17 8 17 9C17 10 18 11 19 11C19.5 11 20 10.5 20 10C20 9.5 19.5 9 19 9C18.5 9 18 9.5 18 10C18 10.5 18.5 11 19 11C20 11 21 10 21 9C21 8 20 7 19 7ZM5 14C4 14 3 15 3 16C3 17 4 18 5 18C5.5 18 6 17.5 6 17C6 16.5 5.5 16 5 16C4.5 16 4 16.5 4 17C4 17.5 4.5 18 5 18C6 18 7 17 7 16C7 15 6 14 5 14ZM19 14C18 14 17 15 17 16C17 17 18 18 19 18C19.5 18 20 17.5 20 17C20 16.5 19.5 16 19 16C18.5 16 18 16.5 18 17C18 17.5 18.5 18 19 18C20 18 21 17 21 16C21 15 20 14 19 14Z" />
  </svg>
);

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    const target = e.target;
    setIsPointer(
      window.getComputedStyle(target).cursor === 'pointer' ||
      target.tagName.toLowerCase() === 'button' ||
      target.tagName.toLowerCase() === 'a'
    );
  }, [cursorX, cursorY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      {/* Spider Sense Pulse */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          position: 'fixed',
          zIndex: 100000,
          pointerEvents: 'none',
          width: 80,
          height: 80,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <SpiderSense isPointer={isPointer} />
      </motion.div>

      {/* Main Cursor (Glitch Spider) */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          position: 'fixed',
          zIndex: 100001,
          pointerEvents: 'none',
          width: 32,
          height: 32,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ 
          scale: isPointer ? 1.5 : 1,
          rotate: isPointer ? [0, -5, 5, 0] : 0
        }}
      >
        <MilesSpiderGraffiti isPointer={isPointer} />
      </motion.div>

      {/* Neon Glow */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          position: 'fixed',
          zIndex: 99999,
          pointerEvents: 'none',
          width: 40,
          height: 40,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#ff003c',
          borderRadius: '50%',
          filter: 'blur(15px)',
          opacity: 0.2,
        }}
        animate={{
          scale: isPointer ? 2 : 1,
          opacity: isPointer ? 0.4 : 0.2
        }}
      />
    </>
  );
};

export default Cursor;



