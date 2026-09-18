"use client";

import React, { useEffect, useState } from "react";
import { OrnamentalDivider } from "../atoms/OrnamentalDivider";
import { CloverIcon } from "../atoms/CloverIcon";
import { ClockDivider } from "../templates/ClockDivider";
import { ArtCarouselWidget } from "../organisms/ArtCarouselWidget";
import { SecondaryInfoWidget } from "../organisms/SecondaryInfoWidget";

interface HomeStatusData {
  temperature: number;
  targetTemperature: number;
  activeLightsCount: number;
  totalLightsCount: number;
  securityStatus: string;
}

export const DashboardPage: React.FC = () => {
  const [homeData, setHomeData] = useState<HomeStatusData | null>(null);

  useEffect(() => {
    fetch("/api/home-assistant")
      .then((res) => res.json())
      .then((json) => setHomeData(json.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="w-screen h-screen artistic-background flex items-center justify-center p-4 overflow-hidden">
      {/* 9:16 Portrait Viewport Container with inset picture frame matte border */}
      <div className="h-full aspect-[9/16] frame-matte bg-[#F5F2EB]/95 border border-[#2C3531]/20 rounded-3xl shadow-2xl p-6 flex flex-col justify-between items-stretch overflow-hidden relative">

        {/* Section 1: Top Greeting & Title Header */}
        <header className="text-center pt-2 pb-1">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CloverIcon className="w-5 h-5 text-[#8EA483]" />
            <span className="font-sans text-xs uppercase tracking-widest text-[#7A8B7B] font-semibold">
              Our Sanctuary & Personal Space
            </span>
            <CloverIcon className="w-5 h-5 text-[#8EA483]" />
          </div>
          <h1 className="font-serif-display text-4xl text-[#2C3531] font-semibold tracking-tight">
            Welcome Home, My Love
          </h1>
          <p className="font-serif-body italic text-[#C86D51] text-lg mt-0.5">
            Counting down 42 joyful days to our Anniversary Celebration
          </p>
          <OrnamentalDivider className="mt-2" />
        </header>

        {/* Section 2: Upper-Middle Primary Home Controls Compact Cluster (Read-Only) */}
        <section className="grid grid-cols-3 gap-3 my-1">
          {/* Climate Status */}
          <div className="bg-white/60 backdrop-blur-md border border-[#7A8B7B]/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#7A8B7B] font-semibold">
              Climate
            </span>
            <div className="font-serif-display text-2xl text-[#2C3531] font-semibold mt-0.5">
              {homeData ? `${homeData.temperature}°F` : "72°F"}
            </div>
            <span className="font-sans text-[10px] text-[#7A8B7B]">
              Target: {homeData ? `${homeData.targetTemperature}°F` : "70°F"}
            </span>
          </div>

          {/* Lighting Summary */}
          <div className="bg-white/60 backdrop-blur-md border border-[#7A8B7B]/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#7A8B7B] font-semibold">
              Lighting
            </span>
            <div className="font-serif-display text-2xl text-[#C86D51] font-semibold mt-0.5">
              {homeData ? `${homeData.activeLightsCount} / ${homeData.totalLightsCount}` : "4 / 12"}
            </div>
            <span className="font-sans text-[10px] text-[#7A8B7B]">
              Warm Ambiance
            </span>
          </div>

          {/* Security Status */}
          <div className="bg-white/60 backdrop-blur-md border border-[#7A8B7B]/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#7A8B7B] font-semibold">
              Security
            </span>
            <div className="font-serif-display text-xl text-[#5C6F5D] font-semibold mt-0.5">
              {homeData ? homeData.securityStatus : "Armed Home"}
            </div>
            <span className="font-sans text-[10px] text-[#7A8B7B]">
              All Sensors Normal
            </span>
          </div>
        </section>

        {/* Section 3: Middle Rotating Photo / Generated Artwork Display */}
        <section className="flex-1 my-2 overflow-hidden min-h-[380px]">
          <ArtCarouselWidget />
        </section>

        {/* Section 4: Clock Divider Bridge */}
        <ClockDivider />

        {/* Section 5: Lower-Middle Secondary Information Cluster */}
        <section className="my-1 h-[150px]">
          <SecondaryInfoWidget />
        </section>

        {/* Section 6: Bottom Thin Decorative Footer & Whimsical Quote */}
        <footer className="mt-2 pt-1 pb-1 text-center">
          <OrnamentalDivider />
          <p className="font-serif-body italic text-sm text-[#7A8B7B] mt-1">
            &ldquo;Home is not a place, it’s a feeling shared together.&rdquo;
          </p>
        </footer>

      </div>
    </main>
  );
};
