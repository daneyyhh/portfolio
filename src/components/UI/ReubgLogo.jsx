import React from 'react';

export default function ReubgLogo({ variant = "light", className = "w-[135px] h-auto" }) {
  const logoSrc = variant === "dark" ? "/brand/reubg-logo-dark.png" : "/brand/reubg-logo-light.png";

  return (
    <img
      src={logoSrc}
      alt="reubg"
      className={`select-none inline-block object-contain h-auto ${className}`}
    />
  );
}
