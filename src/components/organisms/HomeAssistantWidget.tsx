"use client";

import React, { useEffect, useState } from "react";
import { StandardWidget, WidgetSize } from "../templates/StandardWidget";
import { Typography } from "../atoms/Typography";
import { Badge } from "../atoms/Badge";

interface HomeAssistantData {
  temperature: number;
  humidity: number;
  weatherCondition: string;
  activeLightsCount: number;
  totalLightsCount: number;
  securityStatus: string;
}

export const HomeAssistantWidget: React.FC<{ size?: WidgetSize }> = ({
  size = "medium",
}) => {
  const [data, setData] = useState<HomeAssistantData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/home-assistant")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <StandardWidget title="Home Assistant" size={size} loading={loading}>
      {data && (
        <div className="flex flex-col justify-between h-full gap-1 overflow-hidden">
          <div className="flex items-center justify-between gap-1">
            <div>
              <Typography variant="caption">Climate</Typography>
              <div className="text-xl font-bold text-white leading-none mt-0.5">
                {data.temperature}°F
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                {data.weatherCondition}
              </div>
            </div>
            <Badge label="ARMED" variant="success" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-300 bg-slate-800/40 p-1.5 rounded-lg">
            <span>
              Lights: <strong className="text-indigo-400">{data.activeLightsCount}/{data.totalLightsCount}</strong>
            </span>
            <span>
              Hum: <strong className="text-sky-400">{data.humidity}%</strong>
            </span>
          </div>
        </div>
      )}
    </StandardWidget>
  );
};
