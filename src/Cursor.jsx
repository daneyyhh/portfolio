import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const CLICK_WORDS = ["POW!", "WHAM!", "BOOM!", "ZAP!", "KABOOM!", "SLAM!"];

const MilesSpider = ({ color, isPointer }) => (
  <div className="relative w-full h-full">
    {/* Glitch Shadow 1 (Red) */}
    <motion.svg 
      viewBox="0 0 24 24" 
      className="absolute inset-0 w-full h-full opacity-50" 
      style={{ filter: 'drop-shadow(0 0 2px #ff003c)' }}
      animate={{ x: [0, -1, 1, 0], y: [0, 1, -1, 0] }}
      transition={{ duration: 0.1, repeat: Infinity }}
    >
      <path d="M12 2C11.5 2 11 2.5 11 3C11 3.5 11.5 4 12 4C12.5 4 13 3.5 13 3C13 2.5 12.5 2 12 2ZM12 5C10 5 8 6 8 8C8 10 10 11 10 13C10 15 8 16 8 18C8 20 10 21 12 21C14 21 16 20 16 18C16 16 14 15 14 13C14 11 16 10 16 8C16 6 14 5 12 5ZM5 7C4 7 3 8 3 9C3 10 4 11 5 11C5.5 11 6 10.5 6 10C6 9.5 5.5 9 5 9C4.5 9 4 9.5 4 10C4 10.5 4.5 11 5 11C6 11 7 10 7 9C7 8 6 7 5 7ZM19 7C18 7 17 8 17 9C17 10 18 11 19 11C19.5 11 20 10.5 20 10C20 9.5 19.5 9 19 9C18.5 9 18 9.5 18 10C18 10.5 18.5 11 19 11C20 11 21 10 21 9C21 8 20 7 19 7ZM5 14C4 14 3 15 3 16C3 17 4 18 5 18C5.5 18 6 17.5 6 17C6 16.5 5.5 16 5 16C4.5 16 4 16.5 4 17C4 17.5 4.5 18 5 18C6 18 7 17 7 16C7 15 6 14 5 14ZM19 14C18 14 17 15 17 16C17 17 18 18 19 18C19.5 18 20 17.5 20 17C20 16.5 19.5 16 19 16C18.5 16 18 16.5 18 17C18 17.5 18.5 18 19 18C20 18 21 17 21 16C21 15 20 14 19 14Z" fill="#ff003c" />
    </motion.svg>
    {/* Main White Spider */}
    <svg viewBox="0 0 24 24" className="relative w-full h-full" style={{ filter: 'drop-shadow(0 0 5px #ff003c)' }}>
      <path d="M12 2C11.5 2 11 2.5 11 3C11 3.5 11.5 4 12 4C12.5 4 13 3.5 13 3C13 2.5 12.5 2 12 2ZM12 5C10 5 8 6 8 8C8 10 10 11 10 13C10 15 8 16 8 18C8 20 10 21 12 21C14 21 16 20 16 18C16 16 14 15 14 13C14 11 16 10 16 8C16 6 14 5 12 5ZM5 7C4 7 3 8 3 9C3 10 4 11 5 11C5.5 11 6 10.5 6 10C6 9.5 5.5 9 5 9C4.5 9 4 9.5 4 10C4 10.5 4.5 11 5 11C6 11 7 10 7 9C7 8 6 7 5 7ZM19 7C18 7 17 8 17 9C17 10 18 11 19 11C19.5 11 20 10.5 20 10C20 9.5 19.5 9 19 9C18.5 9 18 9.5 18 10C18 10.5 18.5 11 19 11C20 11 21 10 21 9C21 8 20 7 19 7ZM5 14C4 14 3 15 3 16C3 17 4 18 5 18C5.5 18 6 17.5 6 17C6 16.5 5.5 16 5 16C4.5 16 4 16.5 4 17C4 17.5 4.5 18 5 18C6 18 7 17 7 16C7 15 6 14 5 14ZM19 14C18 14 17 15 17 16C17 17 18 18 19 18C19.5 18 20 17.5 20 17C20 16.5 19.5 16 19 16C18.5 16 18 16.5 18 17C18 17.5 18.5 18 19 18C20 18 21 17 21 16C21 15 20 14 19 14Z" fill="#fff" />
    </svg>
  </div>
);

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [clicks, setClicks] = useState([]);

  const springConfig = { damping: 25, stiffness: 300 };
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

  const handleClick = useCallback((e) => {
    const word = CLICK_WORDS[Math.floor(Math.random() * CLICK_WORDS.length)];
    const id = Date.now();
    setClicks(prev => [...prev, { id, x: e.clientX, y: e.clientY, word }]);
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [handleMouseMove, handleClick]);

  return (
    <>
      {/* Click Feedback */}
      <AnimatePresence>
        {clicks.map(click => (
          <motion.div
            key={click.id}
            initial={{ opacity: 0, scale: 0.5, rotate: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1.5, rotate: Math.random() * 20 - 10, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 2, y: -20, filter: 'blur(10px)' }}
            className="comic-click-effect"
            style={{
              left: click.x,
              top: click.y,
              position: 'fixed',
              zIndex: 100000,
              backgroundColor: '#ff003c', // Miles Red
              color: '#000',
              border: '3px solid #000',
              fontFamily: 'Bangers, cursive',
              borderRadius: '2px',
              padding: '4px 8px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {click.word}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Cursor (Miles Spider) */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          position: 'fixed',
          zIndex: 100001,
          pointerEvents: 'none',
          width: 28,
          height: 28,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{ 
            scale: isPointer ? 1.4 : 1,
            rotate: isPointer ? 15 : 0,
          }}
        >
          <MilesSpider isPointer={isPointer} />
        </motion.div>
      </motion.div>

      {/* Outer Glow Ring (Circle) */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          position: 'fixed',
          zIndex: 100000,
          pointerEvents: 'none',
          width: 50,
          height: 50,
          translateX: '-50%',
          translateY: '-50%',
          border: '2px solid #ff003c',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(255, 0, 60, 0.5)',
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          opacity: isPointer ? 0.9 : 0.3,
          borderColor: isPointer ? '#ff003c' : 'rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Glitch Particles Trail */}
      <motion.div
        style={{
          left: mousePos.x,
          top: mousePos.y,
          position: 'fixed',
          zIndex: 99999,
          pointerEvents: 'none',
          width: 50,
          height: 50,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#ff003c',
          borderRadius: '50%',
          filter: 'blur(25px)',
          opacity: 0.15,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
        }}
      />
    </>
  );
};

export default Cursor;


