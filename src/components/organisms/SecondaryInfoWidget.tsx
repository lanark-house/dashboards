"use client";

import React, { useEffect, useState } from "react";
import { CloverIcon } from "../atoms/CloverIcon";

interface PersonalData {
  nowPlaying: {
    title: string;
    artist: string;
    album: string;
    isPlaying: boolean;
  };
  weather: {
    temp: number;
    high: number;
    low: number;
    condition: string;
    location: string;
  };
  reminders: Array<{
    id: string;
    text: string;
    time: string;
    completed: boolean;
  }>;
  anniversary: {
    title: string;
    daysLeft: number;
    targetDate: string;
    subtitle: string;
  };
}

export const SecondaryInfoWidget: React.FC = () => {
  const [data, setData] = useState<PersonalData | null>(null);

  useEffect(() => {
    fetch("/api/personal")
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <span className="font-serif-display text-sm text-[#7A8B7B]">Loading dashboard telemetry...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full grid grid-cols-3 gap-3">
      {/* Weather Card */}
      <div className="bg-white/60 backdrop-blur-md border border-[#7A8B7B]/25 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs uppercase tracking-widest text-[#7A8B7B] font-semibold">
            Weather
          </span>
          <CloverIcon className="w-4 h-4 text-[#8EA483]" />
        </div>
        <div>
          <div className="font-serif-display text-4xl text-[#C86D51] font-semibold">
            {data.weather.temp}°
          </div>
          <div className="font-sans text-xs text-[#2C3531] font-medium mt-0.5">
            {data.weather.condition}
          </div>
        </div>
        <div className="font-sans text-[11px] text-[#7A8B7B] border-t border-[#7A8B7B]/20 pt-1.5 flex justify-between">
          <span>High: {data.weather.high}°</span>
          <span>Low: {data.weather.low}°</span>
        </div>
      </div>

      {/* Shared Reminders */}
      <div className="bg-white/60 backdrop-blur-md border border-[#7A8B7B]/25 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <span className="font-sans text-xs uppercase tracking-widest text-[#7A8B7B] font-semibold">
            Shared Notes
          </span>
          <span className="text-[10px] bg-[#8EA483]/20 text-[#5C6F5D] px-2 py-0.5 rounded-full font-semibold">
            {data.reminders.length} Active
          </span>
        </div>
        <div className="space-y-1.5 overflow-hidden flex-1 justify-center flex flex-col">
          {data.reminders.map((item) => (
            <div key={item.id} className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${item.completed ? "bg-[#7A8B7B]" : "bg-[#C86D51]"}`} />
              <span className={`truncate ${item.completed ? "line-through text-[#7A8B7B]" : "text-[#2C3531] font-medium"}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Now Playing Music */}
      <div className="bg-white/60 backdrop-blur-md border border-[#7A8B7B]/25 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs uppercase tracking-widest text-[#7A8B7B] font-semibold">
            Now Playing
          </span>
          <div className="flex gap-1 items-end h-3">
            <div className="w-0.5 h-3 bg-[#C86D51] animate-pulse" />
            <div className="w-0.5 h-2 bg-[#C86D51] animate-bounce" />
            <div className="w-0.5 h-3.5 bg-[#C86D51] animate-pulse" />
          </div>
        </div>
        <div>
          <div className="font-serif-display text-lg text-[#2C3531] font-semibold truncate">
            {data.nowPlaying.title}
          </div>
          <div className="font-sans text-xs text-[#7A8B7B] truncate">
            {data.nowPlaying.artist}
          </div>
        </div>
        <div className="font-sans text-[11px] text-[#C86D51] font-medium border-t border-[#7A8B7B]/20 pt-1.5 truncate">
          {data.nowPlaying.album}
        </div>
      </div>
    </div>
  );
};
