import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

/**
 * MaskHeading
 * Splits lines of text into individual masked lines (overflow: hidden containers),
 * revealing each line upward as it enters the viewport (translateY: 105% -> 0%, opacity: 0 -> 1).
 */
export function MaskHeading({
  children,
  lines = [],
  className = "",
  style = {},
  tag: Tag = "h2",
  delay = 0.1,
  stagger = 0.08,
  duration = 0.9,
  once = true,
}) {
  const prefersReduced = useReducedMotion();

  // If explicit lines array provided, render those
  const lineArray = lines.length > 0
    ? lines
    : (typeof children === 'string' ? children.split('\n') : null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : stagger,
        delayChildren: prefersReduced ? 0 : delay,
      },
    },
  };

  const lineVariants = {
    hidden: prefersReduced
      ? { opacity: 0 }
      : { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0.3 : duration,
        ease: PREMIUM_EASE,
      },
    },
  };

  if (lineArray && lineArray.length > 0) {
    return (
      <Tag className={className} style={style}>
        <motion.span
          className="block w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once, margin: "-8% 0px -8% 0px" }}
        >
          {lineArray.map((line, idx) => (
            <span key={idx} className="block overflow-hidden py-[0.05em] -my-[0.05em] leading-[1.05]">
              <motion.span
                className="block will-change-transform"
                variants={lineVariants}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  // Fallback for custom JSX children
  return (
    <Tag className={className} style={style}>
      <span className="block overflow-hidden py-[0.05em] -my-[0.05em]">
        <motion.span
          className="block will-change-transform"
          initial={prefersReduced ? { opacity: 0 } : { y: "110%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once, margin: "-8% 0px -8% 0px" }}
          transition={{ duration: prefersReduced ? 0.3 : duration, delay, ease: PREMIUM_EASE }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  );
}

/**
 * MaskParagraph
 * Subtle fade + translateY (20-28px) for comfortable reading.
 */
export function MaskParagraph({
  children,
  className = "",
  delay = 0.25,
  duration = 0.8,
  yOffset = 24,
  once = true,
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: prefersReduced ? 0.3 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: PREMIUM_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SectionHeaderReveal
 * Standard sequence:
 * 1. Tag/Badge reveals
 * 2. Heading reveals upward with line stagger
 * 3. Subtitle/supporting element follows
 */
export function SectionHeaderReveal({
  number = null,
  badge = null,
  badgeIcon: BadgeIcon = null,
  titleLines = [],
  title = "",
  tagColor = "text-[#111111]",
  badgeColor = "text-[#FF1E27]",
  className = "",
  style = {},
  h2Style = {},
  h2Class = "",
  children,
}) {
  const prefersReduced = useReducedMotion();
  const resolvedLines = titleLines.length > 0 ? titleLines : (title ? [title] : []);

  return (
    <div className={`w-full ${className}`} style={style}>
      {/* Step 1: Badge / Tag */}
      {(number || badge) && (
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
          transition={{ duration: 0.6, delay: 0.05, ease: PREMIUM_EASE }}
          className="flex items-center gap-2 mb-2"
        >
          {BadgeIcon && <BadgeIcon size={14} className={badgeColor} />}
          {badge && (
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${badgeColor}`}>
              {badge}
            </span>
          )}
        </motion.div>
      )}

      {/* Step 2: Main Masked Heading */}
      {resolvedLines.length > 0 && (
        <MaskHeading
          lines={resolvedLines}
          className={`font-syne font-extrabold uppercase tracking-tight ${h2Class}`}
          style={h2Style}
          delay={0.15}
          stagger={0.08}
        />
      )}

      {/* Step 3: Supporting Content */}
      {children && (
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: PREMIUM_EASE }}
          className="mt-3"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

/**
 * FadeInUp
 * General purpose smooth reveal for cards, grids, buttons, and elements.
 */
export function FadeInUp({
  children,
  className = "",
  delay = 0.2,
  duration = 0.75,
  yOffset = 28,
  scale = 1,
  once = true,
  onClick,
  ...props
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: yOffset, scale: scale !== 1 ? scale : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, margin: "-6% 0px -6% 0px" }}
      transition={{
        duration: prefersReduced ? 0.3 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: PREMIUM_EASE,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
