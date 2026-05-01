import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const SpiderSense = ({ isPointer }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <motion.path
        key={i}
        d="M50 15 Q50 5 65 0"
        stroke={isPointer ? "#ffd600" : "#ff003c"}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        style={{ originX: "50px", originY: "50px", rotate: angle }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: isPointer ? [1, 1.4, 1] : [0.8, 1.2, 0.8],
          pathLength: [0, 1, 0]
        }}
        transition={{ 
          duration: 0.4, 
          repeat: Infinity, 
          delay: i * 0.05 
        }}
      />
    ))}
  </svg>
);

const SpiderSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C11.5 2 11 2.5 11 3C11 3.5 11.5 4 12 4C12.5 4 13 3.5 13 3C13 2.5 12.5 2 12 2ZM12 5C10 5 8 6 8 8C8 10 10 11 10 13C10 15 8 16 8 18C8 20 10 21 12 21C14 21 16 20 16 18C16 16 14 15 14 13C14 11 16 10 16 8C16 6 14 5 12 5ZM5 7C4 7 3 8 3 9C3 10 4 11 5 11C5.5 11 6 10.5 6 10C6 9.5 5.5 9 5 9C4.5 9 4 9.5 4 10C4 10.5 4.5 11 5 11C6 11 7 10 7 9C7 8 6 7 5 7ZM19 7C18 7 17 8 17 9C17 10 18 11 19 11C19.5 11 20 10.5 20 10C20 9.5 19.5 9 19 9C18.5 9 18 9.5 18 10C18 10.5 18.5 11 19 11C20 11 21 10 21 9C21 8 20 7 19 7ZM5 14C4 14 3 15 3 16C3 17 4 18 5 18C5.5 18 6 17.5 6 17C6 16.5 5.5 16 5 16C4.5 16 4 16.5 4 17C4 17.5 4.5 18 5 18C6 18 7 17 7 16C7 15 6 14 5 14ZM19 14C18 14 17 15 17 16C17 17 18 18 19 18C19.5 18 20 17.5 20 17C20 16.5 19.5 16 19 16C18.5 16 18 16.5 18 17C18 17.5 18.5 18 19 18C20 18 21 17 21 16C21 15 20 14 19 14Z" />
  </svg>
);

const GhostSpider = ({ x, y, delay, color }) => (
  <motion.div
    style={{
      left: x,
      top: y,
      position: 'fixed',
      zIndex: 99998,
      pointerEvents: 'none',
      width: 24,
      height: 24,
      translateX: '-50%',
      translateY: '-50%',
      color: color,
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1, 1.2] }}
    transition={{ duration: 0.5, delay: delay }}
  >
    <SpiderSVG />
  </motion.div>
);

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState([]);
  const lastPos = useRef({ x: 0, y: 0 });

  const springConfig = { damping: 20, stiffness: 500, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e) => {
    const { clientX: x, clientY: y } = e;
    setMousePos({ x, y });
    cursorX.set(x);
    cursorY.set(y);

    const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);
    if (dist > 30) {
      const id = Date.now();
      setTrail(prev => [{ id, x, y }, ...prev.slice(0, 5)]);
      lastPos.current = { x, y };
    }

    const target = e.target;
    setIsPointer(
      window.getComputedStyle(target).cursor === 'pointer' ||
      target.tagName.toLowerCase() === 'button' ||
      target.tagName.toLowerCase() === 'a'
    );
  }, [cursorX, cursorY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      {/* Ghosting Trail */}
      {trail.map((point, i) => (
        <GhostSpider 
          key={point.id} 
          x={point.x} 
          y={point.y} 
          delay={i * 0.05} 
          color={i % 2 === 0 ? "#ff003c" : "#00ffff"}
        />
      ))}

      {/* Spider Sense HUD */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          position: 'fixed',
          zIndex: 100000,
          pointerEvents: 'none',
          width: 100,
          height: 100,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <SpiderSense isPointer={isPointer} />
      </motion.div>

      {/* Main Glitch Cursor */}
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
          scale: isPointer ? 1.6 : 1,
          rotate: isPointer ? [0, -10, 10, 0] : 0,
        }}
      >
        <div className="relative w-full h-full">
          <motion.div className="absolute inset-0 text-[#00ffff] mix-blend-screen" animate={{ x: [-2, 2], y: [1, -1] }} transition={{ repeat: Infinity, duration: 0.1 }}><SpiderSVG /></motion.div>
          <motion.div className="absolute inset-0 text-[#ff003c] mix-blend-screen" animate={{ x: [2, -2], y: [-1, 1] }} transition={{ repeat: Infinity, duration: 0.1 }}><SpiderSVG /></motion.div>
          <div className="relative text-white"><SpiderSVG /></div>
        </div>
      </motion.div>

      {/* Background Distortion Glow */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          position: 'fixed',
          zIndex: 99999,
          pointerEvents: 'none',
          width: 60,
          height: 60,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#ff003c',
          borderRadius: '50%',
          filter: 'blur(20px)',
          opacity: 0.3,
        }}
        animate={{ scale: isPointer ? 2.5 : 1 }}
      />
    </>
  );
};

export default Cursor;




