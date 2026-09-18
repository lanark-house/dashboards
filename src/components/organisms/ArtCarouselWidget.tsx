"use client";

import React, { useEffect, useState } from "react";
import { CloverIcon } from "../atoms/CloverIcon";

const ARTWORKS = [
  {
    title: "Morning Light on Muted Botanical Leaves",
    artist: "Botanical Series No. 4",
    palette: "Sage & Terracotta",
    svg: (
      <svg className="w-full h-full" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="400" fill="#F2ECE1" />
        <circle cx="450" cy="120" r="100" fill="#C86D51" opacity="0.35" />
        <circle cx="150" cy="300" r="140" fill="#7A8B7B" opacity="0.3" />
        <path d="M200 350 C 250 200, 350 150, 480 80" stroke="#2C3531" strokeWidth="4" strokeLinecap="round" />
        <path d="M280 250 C 320 230, 360 210, 380 180" stroke="#7A8B7B" strokeWidth="3" strokeLinecap="round" />
        <path d="M220 300 Q 260 270 300 290" fill="#8EA483" opacity="0.7" />
        <path d="M320 210 Q 370 170 410 200" fill="#C86D51" opacity="0.6" />
        <path d="M400 130 Q 450 90 490 120" fill="#8EA483" opacity="0.8" />
      </svg>
    ),
  },
  {
    title: "Terracotta Sunset Wash over Soft Hills",
    artist: "Minimalist Landscape No. 12",
    palette: "Warm Linen & Pastel",
    svg: (
      <svg className="w-full h-full" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="400" fill="#EFE8DC" />
        <circle cx="300" cy="180" r="85" fill="#C86D51" opacity="0.4" />
        <path d="M0 320 Q 150 240 300 290 T 600 250 L 600 400 L 0 400 Z" fill="#7A8B7B" opacity="0.5" />
        <path d="M0 360 Q 200 300 400 340 T 600 310 L 600 400 L 0 400 Z" fill="#2C3531" opacity="0.3" />
        <path d="M100 200 Q 120 180 140 200" stroke="#2C3531" strokeWidth="2" strokeLinecap="round" />
        <path d="M160 190 Q 175 175 190 190" stroke="#2C3531" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const ArtCarouselWidget: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ARTWORKS.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const current = ARTWORKS[index];

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#7A8B7B]/25 bg-[#F5F2EB]/80 shadow-inner flex flex-col justify-between p-3">
      {/* Artwork Canvas */}
      <div className="relative flex-1 w-full rounded-xl overflow-hidden shadow-sm">
        {current.svg}
        <div className="absolute top-3 right-3 bg-[#F5F2EB]/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-serif-display text-[#2C3531] border border-[#7A8B7B]/20 flex items-center gap-1.5">
          <CloverIcon className="w-3.5 h-3.5 text-[#8EA483]" />
          <span>{current.palette}</span>
        </div>
      </div>

      {/* Artwork Details Footer */}
      <div className="flex items-center justify-between pt-2 px-1">
        <div>
          <h4 className="font-serif-display text-base text-[#2C3531] font-semibold tracking-wide">
            {current.title}
          </h4>
          <p className="font-sans text-xs text-[#7A8B7B] uppercase tracking-wider">
            {current.artist}
          </p>
        </div>
        <div className="flex gap-1.5">
          {ARTWORKS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-5 bg-[#C86D51]" : "w-1.5 bg-[#7A8B7B]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
