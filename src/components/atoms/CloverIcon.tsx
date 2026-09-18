import React from "react";

export const CloverIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-[#8EA483]" }) => (
  <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 10.5C10.8 7.8 7.5 7.2 6.2 8.6C4.8 10 5.2 13 7.8 14.2C9.2 13 11.2 11.8 12 10.5Z" />
    <path d="M13.5 12C16.2 10.8 16.8 7.5 15.4 6.2C14 4.8 11 5.2 9.8 7.8C11 9.2 12.2 11.2 13.5 12Z" />
    <path d="M12 13.5C10.8 16.2 7.5 16.8 6.2 15.4C4.8 14 5.2 11 7.8 9.8C9.2 11 11.2 12.2 12 13.5Z" />
    <path d="M10.5 12C7.8 13.2 7.2 16.5 8.6 17.8C10 19.2 13 18.8 14.2 16.2C13 14.8 11.8 12.8 10.5 12Z" />
    <path d="M12 13C11 16 9.5 19.5 7 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);
