import React from "react";

interface WeatherFrogProps {
  condition: string;
  temp: number;
  summary: string;
}

export const WeatherFrogHeader: React.FC<WeatherFrogProps> = ({ condition, temp, summary }) => {
  const isRainy = condition.toLowerCase().includes("rain");

  return (
    <div className="w-full bg-white/70 backdrop-blur-md border border-[#7A8B7B]/30 rounded-2xl p-4 shadow-sm flex items-center justify-between">
      {/* Left: Weather Metrics & Dynamic Summary */}
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-sans text-xs uppercase tracking-widest text-[#7A8B7B] font-semibold">
            Current Weather & Forecast
          </span>
          <span className="text-[10px] bg-[#8EA483]/20 text-[#5C6F5D] px-2 py-0.5 rounded-full font-medium">
            sensor.airdrie_summary
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-serif-display text-5xl font-semibold text-[#2C3531]">
            {temp}°F
          </span>
          <span className="font-serif-display text-2xl text-[#C86D51]">
            {condition}
          </span>
        </div>
        <p className="font-serif-body italic text-sm text-[#7A8B7B] mt-1 leading-snug">
          &ldquo;{summary}&rdquo;
        </p>
      </div>

      {/* Right: Weather Frog Illustration SVG */}
      <div className="w-28 h-28 relative flex items-center justify-center bg-[#F5F2EB] rounded-2xl border border-[#7A8B7B]/20 p-2 overflow-hidden shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background Sun or Cloud */}
          {!isRainy && <circle cx="75" cy="25" r="14" fill="#E5A93C" opacity="0.8" />}
          {isRainy && <path d="M60 25 Q 70 15 80 25 T 90 25" stroke="#7A8B7B" strokeWidth="2" fill="none" />}

          {/* Frog Body */}
          <ellipse cx="50" cy="65" rx="26" ry="20" fill="#8EA483" />
          {/* Frog Head */}
          <circle cx="50" cy="48" r="18" fill="#8EA483" />
          {/* Frog Eyes */}
          <circle cx="42" cy="34" r="6" fill="#8EA483" />
          <circle cx="58" cy="34" r="6" fill="#8EA483" />
          <circle cx="42" cy="34" r="3" fill="#2C3531" />
          <circle cx="58" cy="34" r="3" fill="#2C3531" />
          {/* Smile */}
          <path d="M42 52 Q 50 58 58 52" stroke="#2C3531" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Rainy Umbrella or Sunny Hat */}
          {isRainy ? (
            <path d="M30 25 Q 50 10 70 25 Z M50 25 L50 40" stroke="#C86D51" strokeWidth="3" fill="#C86D51" />
          ) : (
            <path d="M35 34 Q 50 28 65 34" stroke="#C86D51" strokeWidth="4" strokeLinecap="round" fill="none" />
          )}
        </svg>
      </div>
    </div>
  );
};
