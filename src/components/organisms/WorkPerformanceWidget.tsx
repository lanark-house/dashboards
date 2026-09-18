"use client";

import React, { useEffect, useState } from "react";
import { StandardWidget, WidgetSize } from "../templates/StandardWidget";
import { Badge } from "../atoms/Badge";

interface WorkPerformanceData {
  openPRs: number;
  ciSuccessRate: number;
  buildStatus: "PASSING" | "FAILING";
  commitsToday: number;
  serverHealth: {
    cpuUsage: number;
    memoryUsage: number;
  };
}

export const WorkPerformanceWidget: React.FC<{ size?: WidgetSize }> = ({
  size = "medium",
}) => {
  const [data, setData] = useState<WorkPerformanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/work-performance")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <StandardWidget title="Work & DevOps" size={size} loading={loading}>
      {data && (
        <div className="flex flex-col justify-between h-full gap-1 overflow-hidden">
          <div className="flex items-center justify-between gap-1">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold">Open PRs</span>
              <div className="text-xl font-bold text-white leading-none mt-0.5">{data.openPRs}</div>
              <span className="text-[10px] text-emerald-400 font-medium">CI {data.ciSuccessRate}%</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge label="PASSING" variant="success" />
              <span className="text-[10px] text-slate-400">{data.commitsToday} commits</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-300 bg-slate-800/40 p-1.5 rounded-lg">
            <span>CPU: <strong className="text-emerald-400">{data.serverHealth.cpuUsage}%</strong></span>
            <span>MEM: <strong className="text-sky-400">{data.serverHealth.memoryUsage}%</strong></span>
          </div>
        </div>
      )}
    </StandardWidget>
  );
};
