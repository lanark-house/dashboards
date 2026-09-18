"use client";

import React, { useEffect, useState } from "react";
import { ClockDivider } from "../templates/ClockDivider";
import { WeatherFrogHeader } from "../organisms/WeatherFrogHeader";
import { HomeAssistantWidget } from "../organisms/HomeAssistantWidget";
import { FinanceWidget } from "../organisms/FinanceWidget";
import { WorkPerformanceWidget } from "../organisms/WorkPerformanceWidget";
import { SecondaryInfoWidget } from "../organisms/SecondaryInfoWidget";
import { ComicArtCarouselWidget } from "../organisms/ComicArtCarouselWidget";

interface PersonalData {
  weather: {
    temp: number;
    condition: string;
    summary: string;
  };
}

export const DashboardPage: React.FC = () => {
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);

  useEffect(() => {
    fetch("/api/personal")
      .then((res) => res.json())
      .then((json) => setPersonalData(json.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="w-screen h-screen artistic-background flex items-center justify-center p-3 overflow-hidden">
      {/* 9:16 Portrait Viewport Container with inset picture frame matte border */}
      <div className="h-full aspect-[9/16] frame-matte bg-[#F5F2EB]/95 border border-[#2C3531]/20 rounded-3xl shadow-2xl p-5 flex flex-col justify-between items-stretch overflow-hidden relative">

        {/* EYE-LEVEL TOP ZONE (0% - 65% Height): Prominent Data Widgets */}

        {/* 1. Weather Frog Dynamic Title Hero */}
        <section className="mb-2">
          <WeatherFrogHeader
            temp={personalData?.weather.temp ?? 72}
            condition={personalData?.weather.condition ?? "Partly Sunny & Warm"}
            summary={personalData?.weather.summary ?? "Expect pleasant mild winds, perfect for an evening walk."}
          />
        </section>

        {/* 2. Primary Smart Home & Telemetry Cluster */}
        <section className="grid grid-cols-2 gap-3 mb-2 flex-1">
          <HomeAssistantWidget size="large" />
          <FinanceWidget size="large" />
        </section>

        {/* 3. Server Vitals & Work Performance */}
        <section className="mb-2 h-[120px]">
          <WorkPerformanceWidget size="medium" />
        </section>

        {/* 4. Clock Divider Bridge */}
        <ClockDivider className="my-1" />

        {/* 5. Shared Notes, Reminders & Music Media */}
        <section className="mb-2 h-[135px]">
          <SecondaryInfoWidget />
        </section>

        {/* LOWER ZONE (70% - 100% Height): Bottom Decorative Carousel Art / Comic */}
        <section className="h-[180px] shrink-0">
          <ComicArtCarouselWidget />
        </section>

      </div>
    </main>
  );
};
