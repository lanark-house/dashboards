"use client";

import React, { useEffect, useState } from "react";
import { CloverIcon } from "../atoms/CloverIcon";

const COMICS_CAROUSEL = [
  {
    title: "r/comics — Weekly Highlight",
    subtitle: "Top Comic & Artistic Illustration",
    svg: (
      <svg className="w-full h-full" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="240" fill="#F2ECE1" rx="12" />
        <rect x="20" y="20" width="170" height="200" fill="#FFFFFF" rx="8" stroke="#7A8B7B" strokeWidth="1.5" />
        <rect x="215" y="20" width="170" height="200" fill="#FFFFFF" rx="8" stroke="#7A8B7B" strokeWidth="1.5" />
        <rect x="410" y="20" width="170" height="200" fill="#FFFFFF" rx="8" stroke="#7A8B7B" strokeWidth="1.5" />

        {/* Panel 1 */}
        <circle cx="105" cy="90" r="30" fill="#8EA483" />
        <path d="M75 160 Q 105 130 135 160" stroke="#2C3531" strokeWidth="3" />
        <path d="M120 50 Q 140 40 150 60 Q 130 70 120 50 Z" fill="#C86D51" />

        {/* Panel 2 */}
        <circle cx="300" cy="90" r="30" fill="#C86D51" />
        <path d="M270 160 Q 300 120 330 160" stroke="#2C3531" strokeWidth="3" />

        {/* Panel 3 */}
        <circle cx="495" cy="90" r="30" fill="#8EA483" />
        <path d="M465 150 Q 495 180 525 150" stroke="#2C3531" strokeWidth="3" />
      </svg>
    ),
  },
  {
    title: "Botanical Serenity No. 8",
    subtitle: "Muted Watercolor Art Carousel",
    svg: (
      <svg className="w-full h-full" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="240" fill="#EFE8DC" rx="12" />
        <circle cx="450" cy="80" r="70" fill="#C86D51" opacity="0.3" />
        <circle cx="150" cy="160" r="90" fill="#7A8B7B" opacity="0.3" />
        <path d="M100 200 C 200 100, 400 180, 500 50" stroke="#2C3531" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const ComicArtCarouselWidget: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % COMICS_CAROUSEL.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const current = COMICS_CAROUSEL[index];

  return (
    <div className="w-full h-full bg-white/60 backdrop-blur-md border border-[#7A8B7B]/25 rounded-2xl p-3 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <CloverIcon className="w-4 h-4 text-[#8EA483]" />
          <span className="font-serif-display text-sm font-semibold text-[#2C3531]">
            {current.title}
          </span>
        </div>
        <span className="font-sans text-[11px] text-[#7A8B7B] uppercase tracking-wider font-medium">
          {current.subtitle}
        </span>
      </div>

      <div className="flex-1 w-full rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
        {current.svg}
      </div>
    </div>
  );
};
