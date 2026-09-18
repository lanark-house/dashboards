"use client";

import React, { useEffect, useState } from "react";
import { StandardWidget, WidgetSize } from "../templates/StandardWidget";
import { Typography } from "../atoms/Typography";
import { Badge } from "../atoms/Badge";
import { CloverIcon } from "../atoms/CloverIcon";

export interface HomeAssistantData {
  temperature: number;
  humidity: number;
  weatherCondition: string;
  activeLightsCount: number;
  totalLightsCount: number;
  securityStatus: string;
}

const DEFAULT_HOME_ASSISTANT_DATA: HomeAssistantData = {
  temperature: 72,
  humidity: 45,
  weatherCondition: "Clear & Soft Sunlight",
  activeLightsCount: 4,
  totalLightsCount: 12,
  securityStatus: "Armed Home",
};

export interface HomeAssistantWidgetProps {
  size?: WidgetSize;
  data?: HomeAssistantData;
  isLoading?: boolean;
}

export const HomeAssistantWidget: React.FC<HomeAssistantWidgetProps> = ({
  size = "medium",
  data: propData,
  isLoading: propLoading,
}) => {
  const [fetchedData, setFetchedData] = useState<HomeAssistantData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const data = propData ?? fetchedData;
  const effectiveLoading = propLoading ?? (propData ? false : loading);

  useEffect(() => {
    if (propData !== undefined) return;

    let isMounted = true;
    fetch("/api/home-assistant")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setFetchedData(json.data ?? DEFAULT_HOME_ASSISTANT_DATA);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFetchedData(DEFAULT_HOME_ASSISTANT_DATA);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [propData]);

  return (
    <StandardWidget title="Home Telemetry" size={size} loading={effectiveLoading} icon={<CloverIcon className="w-4 h-4 text-[#8EA483]" />}>
      {data && (
        <div className="flex flex-col justify-between h-full gap-2 p-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption">Indoor Climate</Typography>
              <div className="font-serif-display text-4xl font-semibold text-[#2C3531] mt-0.5">
                {data.temperature}°F
              </div>
              <div className="font-sans text-xs text-[#7A8B7B] mt-0.5">
                Humidity: {data.humidity}%
              </div>
            </div>
            <Badge label={data.securityStatus} variant="success" />
          </div>

          <div className="flex items-center justify-between font-sans text-xs text-[#2C3531] bg-[#F5F2EB]/90 p-2.5 rounded-xl border border-[#7A8B7B]/20">
            <span>
              Active Lighting: <strong className="text-[#C86D51]">{data.activeLightsCount} of {data.totalLightsCount}</strong>
            </span>
            <span className="text-[#5C6F5D] font-medium">Warm Preset</span>
          </div>
        </div>
      )}
    </StandardWidget>
  );
};
