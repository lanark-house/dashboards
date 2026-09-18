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
  const baseStyles = "text-slate-100 font-sans tracking-tight";
  const variants = {
    h1: "text-2xl font-bold uppercase text-slate-100 tracking-wider",
    h2: "text-xl font-semibold text-slate-200",
    h3: "text-base font-medium text-slate-300",
    body: "text-sm text-slate-300 font-normal",
    caption: "text-xs text-slate-400 font-medium uppercase tracking-widest",
    metric: "text-3xl font-extrabold text-white tracking-tight tabular-nums",
  };

  return <p className={`${baseStyles} ${variants[variant]} ${className}`}>{children}</p>;
};
