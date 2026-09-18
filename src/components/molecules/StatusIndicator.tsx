import React from "react";
import { Badge } from "../atoms/Badge";

interface StatusIndicatorProps {
  status: "ONLINE" | "OFFLINE" | "WARNING" | "OPEN";
  label?: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  className = "",
}) => {
  const variantMap = {
    ONLINE: "success",
    OPEN: "success",
    WARNING: "warning",
    OFFLINE: "error",
  } as const;

  const dotColor = {
    ONLINE: "bg-emerald-400",
    OPEN: "bg-emerald-400",
    WARNING: "bg-amber-400",
    OFFLINE: "bg-rose-400",
  }[status];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColor}`}
        ></span>
      </span>
      <Badge label={label || status} variant={variantMap[status] || "neutral"} />
    </div>
  );
};
