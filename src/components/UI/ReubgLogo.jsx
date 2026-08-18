import React from 'react';

export default function ReubgLogo({ className = "w-[130px] h-auto object-contain" }) {
  return (
    <img
      src="/images/reubg-logo.png"
      alt="reubg"
      className={`select-none inline-block object-contain ${className}`}
    />
  );
}
