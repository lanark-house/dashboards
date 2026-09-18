"use client";

import React, { useEffect, useState } from "react";
import { StandardWidget, WidgetSize } from "../templates/StandardWidget";
import { MetricCard } from "../molecules/MetricCard";
import { Sparkline } from "../molecules/Sparkline";
import { StatusIndicator } from "../molecules/StatusIndicator";

interface FinanceData {
  portfolioValue: number;
  dayChange: number;
  dayChangePercent: number;
  marketStatus: "OPEN" | "OFFLINE";
  sparkline: number[];
}

export const FinanceWidget: React.FC<{ size?: WidgetSize }> = ({ size = "medium" }) => {
  const [data, setData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/finance")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <StandardWidget title="Finance & Markets" size={size} loading={loading}>
      {data && (
        <div className="flex flex-col justify-between h-full gap-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">
                Portfolio
              </span>
              <div className="text-xl font-bold text-white tracking-tight">
                ${data.portfolioValue.toLocaleString()}
              </div>
            </div>
            <StatusIndicator status={data.marketStatus} label={data.marketStatus} />
          </div>

          <div className="flex items-center justify-between">
            <MetricCard
              title="24h Change"
              value={`+$${data.dayChange}`}
              subtext={`+${data.dayChangePercent}%`}
              trend="up"
              className="flex-1 py-1 px-2 border-none bg-slate-800/40"
            />
            {data.sparkline && (
              <div className="w-1/2">
                <Sparkline data={data.sparkline} color="#10b981" height={28} />
              </div>
            )}
          </div>
        </div>
      )}
    </StandardWidget>
  );
};
