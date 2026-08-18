import React from 'react';

export default function ReubgLogo({ className = "w-[130px] h-auto" }) {
  return (
    <img
      src="/brand/reubg-logo.png"
      alt="reubg"
      className={`select-none inline-block object-contain h-auto ${className}`}
    />
  );
}
