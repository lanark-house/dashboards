import React from "react";

interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "error" | "neutral";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "neutral",
  className = "",
}) => {
  const styles = {
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    error: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    neutral: "bg-slate-700/40 text-slate-300 border-slate-600/40",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider border ${styles[variant]} ${className}`}
    >
      {label}
    </span>
  );
};
