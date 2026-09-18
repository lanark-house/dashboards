import React from "react";
import { Spinner } from "../atoms/Spinner";
import { CloverIcon } from "../atoms/CloverIcon";

export type WidgetSize = "small" | "medium" | "large" | "xlarge";

interface StandardWidgetProps {
  title: string;
  size?: WidgetSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const StandardWidget: React.FC<StandardWidgetProps> = ({
  title,
  size = "medium",
  loading = false,
  icon,
  children,
  className = "",
}) => {
  const sizeStyles: Record<WidgetSize, React.CSSProperties> = {
    small: {
      gridColumn: "span 1 / span 1",
      gridRow: "span 1 / span 1",
      width: "100%",
      minWidth: "200px",
      minHeight: "140px",
    },
    medium: {
      gridColumn: "span 2 / span 2",
      gridRow: "span 1 / span 1",
      width: "100%",
      minWidth: "360px",
      minHeight: "140px",
    },
    large: {
      gridColumn: "span 2 / span 2",
      gridRow: "span 2 / span 2",
      width: "100%",
      minWidth: "360px",
      minHeight: "280px",
    },
    xlarge: {
      gridColumn: "span 3 / span 3",
      gridRow: "span 3 / span 3",
      width: "100%",
      minWidth: "540px",
      minHeight: "420px",
    },
  };

  return (
    <div
      style={{
        ...sizeStyles[size],
        backgroundColor: "rgba(255, 255, 255, 0.65)",
        border: "1px solid rgba(122, 139, 123, 0.25)",
        borderRadius: "1rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 4px 15px -2px rgba(44, 53, 49, 0.05)",
        backdropFilter: "blur(6px)",
        overflow: "hidden",
        position: "relative",
      }}
      className={className}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid rgba(122, 139, 123, 0.2)",
          marginBottom: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {icon ? icon : <CloverIcon className="w-4 h-4 text-[#8EA483]" />}
          <h3
            className="font-serif-display text-sm tracking-widest text-[#2C3531] uppercase font-semibold"
          >
            {title}
          </h3>
        </div>
        {loading && <Spinner className="w-4 h-4 text-[#C86D51]" />}
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ height: "1rem", backgroundColor: "rgba(122, 139, 123, 0.15)", borderRadius: "0.25rem", width: "75%" }} />
            <div style={{ height: "1.75rem", backgroundColor: "rgba(122, 139, 123, 0.15)", borderRadius: "0.25rem", width: "50%" }} />
            <div style={{ height: "0.75rem", backgroundColor: "rgba(122, 139, 123, 0.15)", borderRadius: "0.25rem", width: "80%" }} />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
