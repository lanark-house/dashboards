"use client";

import React, { useEffect, useState } from "react";

/**
 * ClockDivider displays a real-time 12-hour clock (HH:MM) without AM/PM.
 * Aligns state updates to top-of-the-minute boundary via ceilingMinutes scheduling.
 */
export const ClockDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const updateClock = () => {
      const now = new Date();
      // Format 12-hour time without AM/PM
      let hours = now.getHours() % 12;
      if (hours === 0) hours = 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTimeStr(`${hours}:${minutes}`);

      // Calculate milliseconds until next minute boundary (ceilingMinutes)
      const msUntilNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      timerId = setTimeout(() => {
        updateClock();
      }, msUntilNextMinute);
    };

    updateClock();

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div
      className={`w-full py-2 flex items-center justify-center my-1 select-none ${className}`}
    >
      <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800/80 px-8 py-1.5 rounded-full shadow-lg backdrop-blur-md">
        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-indigo-500/50"></div>
        <span className="text-xl font-black tracking-widest text-indigo-300 font-mono animate-pulse">
          {timeStr || "12:00"}
        </span>
        <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-indigo-500/50"></div>
      </div>
    </div>
  );
};
