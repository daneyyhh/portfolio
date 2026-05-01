import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const Cursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a'
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999]">
      {/* Outer Tech Brackets */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          position: 'fixed',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: isClicking ? 90 : 0,
          scale: isPointer ? 1.5 : 1,
        }}
      >
        <div className="relative w-12 h-12">
          {/* Top Left */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-spider-red" />
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-spider-red" />
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-spider-red" />
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-spider-red" />
        </div>
      </motion.div>

      {/* Inner Glitch Core */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          position: 'fixed',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 bg-spider-yellow opacity-50"
            animate={{ 
              x: [-1, 1, 0],
              skew: [0, 5, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 0.2 }}
          />
          <div className="w-1.5 h-1.5 bg-spider-white shadow-[0_0_10px_#fff]" />
        </div>
      </motion.div>

      {/* Spider-Sense Pulse Lines (Only on Pointer) */}
      {isPointer && (
        <motion.div
          style={{
            left: smoothX,
            top: smoothY,
            position: 'fixed',
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className="relative w-20 h-20">
            {[0, 90, 180, 270].map((angle) => (
              <motion.div
                key={angle}
                className="absolute top-1/2 left-1/2 w-8 h-[2px] bg-spider-yellow"
                style={{ 
                  originX: "0px", 
                  rotate: angle,
                  x: "-50%",
                  y: "-50%" 
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scaleX: [0.5, 1.5, 0.5],
                  translateX: ["0%", "50%", "0%"]
                }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Screen Glitch Overlay (Subtle) */}
      <motion.div
        className="fixed inset-0 bg-spider-red/5 pointer-events-none mix-blend-overlay"
        animate={{
          opacity: isClicking ? 0.2 : 0,
        }}
      />
    </div>
  );
};

export default Cursor;
