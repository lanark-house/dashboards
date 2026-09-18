"use client";

import React, { useEffect, useState } from "react";
import { StandardWidget, WidgetSize } from "../templates/StandardWidget";
import { MetricCard } from "../molecules/MetricCard";
import { Sparkline } from "../molecules/Sparkline";
import { StatusIndicator } from "../molecules/StatusIndicator";
import { CloverIcon } from "../atoms/CloverIcon";

export interface FinanceData {
  portfolioValue: number;
  dayChange: number;
  dayChangePercent: number;
  marketStatus: "OPEN" | "OFFLINE";
  sparkline: number[];
}

const DEFAULT_FINANCE_DATA: FinanceData = {
  portfolioValue: 142850,
  dayChange: 1240,
  dayChangePercent: 0.87,
  marketStatus: "OPEN",
  sparkline: [141200, 141500, 141800, 142100, 142000, 142500, 142850],
};

export interface FinanceWidgetProps {
  size?: WidgetSize;
  data?: FinanceData;
  isLoading?: boolean;
}

export const FinanceWidget: React.FC<FinanceWidgetProps> = ({
  size = "medium",
  data: propData,
  isLoading: propLoading,
}) => {
  const [fetchedData, setFetchedData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const data = propData ?? fetchedData;
  const effectiveLoading = propLoading ?? (propData ? false : loading);

  useEffect(() => {
    if (propData !== undefined) return;

    let isMounted = true;
    fetch("/api/finance")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setFetchedData(json.data ?? DEFAULT_FINANCE_DATA);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFetchedData(DEFAULT_FINANCE_DATA);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [propData]);

  return (
    <StandardWidget title="Finance & Assets" size={size} loading={effectiveLoading} icon={<CloverIcon className="w-4 h-4 text-[#8EA483]" />}>
      {data && (
        <div className="flex flex-col justify-between h-full gap-2 p-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-sans text-xs uppercase text-[#7A8B7B] font-semibold tracking-wider">
                Portfolio Net
              </span>
              <div className="font-serif-display text-3xl font-semibold text-[#2C3531]">
                ${data.portfolioValue.toLocaleString()}
              </div>
            </div>
            <StatusIndicator status={data.marketStatus} label={data.marketStatus} />
          </div>

          <div className="flex items-center justify-between gap-2">
            <MetricCard
              title="24h Performance"
              value={`+$${data.dayChange}`}
              subtext={`+${data.dayChangePercent}%`}
              trend="up"
              className="flex-1 py-1.5 px-2.5 border border-[#7A8B7B]/20 bg-[#F5F2EB]/90 rounded-xl"
            />
            {data.sparkline && (
              <div className="w-1/2">
                <Sparkline data={data.sparkline} color="#7A8B7B" height={32} />
              </div>
            )}
          </div>
        </div>
      )}
    </StandardWidget>
  );
};
