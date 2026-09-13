import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export function ParallaxImage({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  speed = 0.15, // Subtle parallax speed
  yOffset = 25, // Pixels of subtle shift
  children,
  ...props
}) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [-yOffset * speed, yOffset * speed]
  );

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${containerClassName}`}
      {...props}
    >
      <motion.div
        style={{ y }}
        className="w-full h-full will-change-transform"
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover select-none ${className}`}
          />
        ) : (
          children
        )}
      </motion.div>
    </div>
  );
}

export function ParallaxElement({
  children,
  className = "",
  speed = 0.2,
  yOffset = 30,
  ...props
}) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [-yOffset * speed, yOffset * speed]
  );

  return (
    <div ref={containerRef} className={`relative ${className}`} {...props}>
      <motion.div style={{ y }} className="w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
