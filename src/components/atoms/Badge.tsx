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
    success: "bg-[#7A8B7B]/15 text-[#5C6F5D] border-[#7A8B7B]/30",
    warning: "bg-[#C86D51]/15 text-[#A85038] border-[#C86D51]/30",
    error: "bg-rose-500/15 text-rose-700 border-rose-400/30",
    neutral: "bg-[#2C3531]/10 text-[#2C3531] border-[#2C3531]/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium tracking-wide border ${styles[variant]} ${className}`}
    >
      {label}
    </span>
  );
};
