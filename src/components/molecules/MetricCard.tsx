import React from "react";
import { Typography } from "../atoms/Typography";
import { Card } from "../atoms/Card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtext,
  trend,
  className = "",
}) => {
  const trendColor =
    trend === "up"
      ? "text-emerald-400"
      : trend === "down"
      ? "text-rose-400"
      : "text-slate-400";

  return (
    <Card className={className}>
      <Typography variant="caption">{title}</Typography>
      <div className="mt-1 flex items-baseline justify-between">
        <Typography variant="metric">{value}</Typography>
        {subtext && (
          <span className={`text-xs font-semibold ${trendColor}`}>
            {trend === "up" ? "▲ " : trend === "down" ? "▼ " : ""}
            {subtext}
          </span>
        )}
      </div>
    </Card>
  );
};
