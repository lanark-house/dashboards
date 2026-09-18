"use client";

import React, { useEffect, useState } from "react";
import { CloverIcon } from "../atoms/CloverIcon";

export const ClockDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours() % 12;
      if (hours === 0) hours = 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTimeStr(`${hours}:${minutes}`);

      const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
      setDateStr(now.toLocaleDateString('en-US', options));

      const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
      timerId = setTimeout(updateClock, msUntilNextMinute);
    };

    updateClock();
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className={`w-full py-2 flex items-center justify-center my-2 select-none ${className}`}>
      <div className="flex items-center gap-3 bg-[#F5F2EB]/90 border border-[#7A8B7B]/30 px-6 py-2 rounded-full shadow-md backdrop-blur-md">
        <CloverIcon className="w-4 h-4 text-[#8EA483]" />
        <span className="font-serif-display text-2xl font-semibold tracking-wider text-[#2C3531]">
          {timeStr || "12:00"}
        </span>
        <span className="text-xs uppercase tracking-widest text-[#7A8B7B] font-medium border-l border-[#7A8B7B]/30 pl-3">
          {dateStr || "Today"}
        </span>
      </div>
    </div>
  );
};
