import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const CLICK_WORDS = ["POW!", "WHAM!", "BOOM!", "ZAP!", "KABOOM!", "SLAM!"];

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [clicks, setClicks] = useState([]);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    const target = e.target;
    setIsPointer(
      window.getComputedStyle(target).cursor === 'pointer' ||
      target.tagName.toLowerCase() === 'button' ||
      target.tagName.toLowerCase() === 'a'
    );
  }, []);

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

  const springConfig = { damping: 20, stiffness: 250 };
  const cursorX = useSpring(mousePos.x, springConfig);
  const cursorY = useSpring(mousePos.y, springConfig);

  return (
    <>
      {/* Click Feedback */}
      <AnimatePresence>
        {clicks.map(click => (
          <motion.div
            key={click.id}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1.5, rotate: Math.random() * 20 - 10 }}
            exit={{ opacity: 0, scale: 2, y: -20 }}
            className="comic-click-effect"
            style={{
              left: click.x,
              top: click.y,
              position: 'fixed',
              zIndex: 100000,
            }}
          >
            {click.word}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        className="c-dot"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ width: '100%', height: '100%', border: '1px solid #fff' }}
        />
      </motion.div>

      <motion.div
        className="c-ring"
        animate={{
          scale: isPointer ? 1.5 : 1,
          rotate: isPointer ? 90 : mousePos.x % 360,
          backgroundColor: isPointer ? 'var(--comic-accent)' : 'transparent',
          borderRadius: isPointer ? '50%' : '4px'
        }}
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};

export default Cursor;
