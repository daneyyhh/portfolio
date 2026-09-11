import React from 'react';
import logoLight from '../../assets/brand/reubg-logo-transparent.png';
import logoDark from '../../assets/brand/reubg-logo-dark-transparent.png';

export default function ReubgLogo({ variant = "light", className = "w-[135px] h-auto" }) {
  const logoSrc = variant === "dark" ? logoDark : logoLight;

  return (
    <img
      src={logoSrc}
      alt="reubg"
      className={`select-none inline-block object-contain h-auto ${className}`}
    />
  );
}
