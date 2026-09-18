"use client";

import React, { useEffect, useState } from "react";
import { StandardWidget, WidgetSize } from "../templates/StandardWidget";
import { Badge } from "../atoms/Badge";
import { CloverIcon } from "../atoms/CloverIcon";

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
    <StandardWidget title="DevOps & Server Vitals" size={size} loading={loading} icon={<CloverIcon className="w-4 h-4 text-[#8EA483]" />}>
      {data && (
        <div className="flex items-center justify-between h-full px-2 gap-4">
          <div>
            <span className="font-sans text-xs uppercase text-[#7A8B7B] font-semibold">Open Pull Requests</span>
            <div className="font-serif-display text-2xl font-semibold text-[#2C3531]">{data.openPRs} Active</div>
            <span className="font-sans text-xs text-[#5C6F5D] font-medium">CI Build {data.ciSuccessRate}%</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <Badge label="CI PASSING" variant="success" />
              <div className="font-sans text-xs text-[#7A8B7B] mt-1">{data.commitsToday} commits pushed</div>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#2C3531] bg-[#F5F2EB]/90 px-3 py-1.5 rounded-xl border border-[#7A8B7B]/20">
              <span>CPU: <strong className="text-[#5C6F5D]">{data.serverHealth.cpuUsage}%</strong></span>
              <span>RAM: <strong className="text-[#C86D51]">{data.serverHealth.memoryUsage}%</strong></span>
            </div>
          </div>
        </div>
      )}
    </StandardWidget>
  );
};
