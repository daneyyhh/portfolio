import React from 'react';

export default function ReubgLogo({ className = "h-8 w-auto object-contain" }) {
  return (
    <img
      src="/images/reubg-logo.png"
      alt="reubg"
      className={`select-none inline-block ${className}`}
    />
  );
}
