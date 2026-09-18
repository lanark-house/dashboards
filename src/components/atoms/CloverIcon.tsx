import React from "react";

export const CloverIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-[#8EA483]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    {/* Four heart-shaped clover leaves with stem */}
    <path d="M12 11.5C10.5 8.5 7 8 5.5 9.5C4 11 4.5 14.5 7.5 16C9 14.5 11.5 13 12 11.5Z" />
    <path d="M12.5 12C15.5 10.5 16 7 14.5 5.5C13 4 9.5 4.5 8 7.5C9.5 9 11 11.5 12.5 12Z" />
    <path d="M12 12.5C13.5 15.5 17 16 18.5 14.5C20 13 19.5 9.5 16.5 8C15 9.5 12.5 11 12 12.5Z" />
    <path d="M11.5 12C8.5 13.5 8 17 9.5 18.5C11 20 14.5 19.5 16 16.5C14.5 15 13 12.5 11.5 12Z" />
    <path d="M11.8 12.5C11 15 9 19 6 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);
