import React from "react";
import { StandardFrame } from "../templates/StandardFrame";
import { ClockDivider } from "../templates/ClockDivider";
import { FinanceWidget } from "../organisms/FinanceWidget";
import { HomeAssistantWidget } from "../organisms/HomeAssistantWidget";
import { WorkPerformanceWidget } from "../organisms/WorkPerformanceWidget";

export const DashboardPage: React.FC = () => {
  return (
    <main className="w-screen h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-2 overflow-hidden">
      {/* 9:16 Portrait Container spanning full height */}
      <div className="h-full aspect-[9/16] flex flex-col justify-between items-stretch p-3 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

        {/* Top 16:9 StandardFrame */}
        <StandardFrame>
          <FinanceWidget size="large" />
          <HomeAssistantWidget size="large" />
          <WorkPerformanceWidget size="large" />
        </StandardFrame>

        {/* Center Clock Divider */}
        <ClockDivider />

        {/* Bottom 16:9 StandardFrame */}
        <StandardFrame>
          <WorkPerformanceWidget size="large" />
          <FinanceWidget size="large" />
          <HomeAssistantWidget size="large" />
        </StandardFrame>

      </div>
    </main>
  );
};
