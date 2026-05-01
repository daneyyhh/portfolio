import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const CLICK_WORDS = ["POW!", "WHAM!", "BOOM!", "ZAP!", "KABOOM!", "SLAM!"];

const MilesSpider = ({ color }) => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L14 8L18 7L16 11L20 13L16 14L18 18L13 16L12 20L11 16L6 18L8 14L4 13L8 11L6 7L10 8L12 4Z" fill={color} />
    <circle cx="12" cy="12" r="2" fill="black" />
  </svg>
);

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [clicks, setClicks] = useState([]);

  const springConfig = { damping: 20, stiffness: 250 };
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
          width: 24,
          height: 24,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{ 
            scale: isPointer ? 1.5 : 1,
            rotate: isPointer ? 180 : 0,
          }}
        >
          <MilesSpider color={isPointer ? "#ff003c" : "#fff"} />
        </motion.div>
      </motion.div>

      {/* Outer Ring / Glow */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          position: 'fixed',
          zIndex: 100000,
          pointerEvents: 'none',
          width: 40,
          height: 40,
          translateX: '-50%',
          translateY: '-50%',
          border: '2px solid #ff003c',
          borderRadius: '50%', // Circle, not square
          boxShadow: isPointer ? '0 0 15px #ff003c' : 'none',
        }}
        animate={{
          scale: isPointer ? 1.4 : 1,
          opacity: isPointer ? 0.8 : 0.4,
          borderWidth: isPointer ? '3px' : '2px',
        }}
      />

      {/* Glitch Effect Trail */}
      <motion.div
        style={{
          left: mousePos.x,
          top: mousePos.y,
          position: 'fixed',
          zIndex: 99999,
          pointerEvents: 'none',
          width: 40,
          height: 40,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#ff003c',
          borderRadius: '50%',
          filter: 'blur(20px)',
          opacity: 0.1,
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -2, 2, 0],
          y: [0, 2, -2, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
        }}
      />
    </>
  );
};

export default Cursor;

