import React from "react";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "metric";
  children: React.ReactNode;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  children,
  className = "",
}) => {
  const baseStyles = "text-[#2C3531] tracking-normal";
  const variants = {
    h1: "font-serif-display text-4xl font-normal text-[#2C3531] tracking-tight",
    h2: "font-serif-display text-2xl font-semibold text-[#2C3531]",
    h3: "font-sans text-lg font-medium text-[#7A8B7B]",
    body: "font-sans text-base text-[#2C3531] font-normal leading-relaxed",
    caption: "font-sans text-xs font-semibold text-[#7A8B7B] uppercase tracking-widest",
    metric: "font-serif-display text-4xl font-semibold text-[#C86D51] tracking-tight tabular-nums",
  };

  return <p className={`${baseStyles} ${variants[variant]} ${className}`}>{children}</p>;
};
