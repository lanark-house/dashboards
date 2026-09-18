import React from "react";
import { Spinner } from "../atoms/Spinner";

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
    small: { gridColumn: "span 1 / span 1", gridRow: "span 1 / span 1" },
    medium: { gridColumn: "span 2 / span 2", gridRow: "span 1 / span 1" },
    large: { gridColumn: "span 2 / span 2", gridRow: "span 2 / span 2" },
    xlarge: { gridColumn: "span 3 / span 3", gridRow: "span 3 / span 3" },
  };

  return (
    <div
      style={{
        ...sizeStyles[size],
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        border: "1px solid rgba(30, 41, 59, 0.9)",
        borderRadius: "1rem",
        padding: "0.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
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
          borderBottom: "1px solid rgba(30, 41, 59, 0.6)",
          marginBottom: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {icon && <span style={{ color: "#818cf8" }}>{icon}</span>}
          <h3
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#cbd5e1",
              margin: 0,
            }}
          >
            {title}
          </h3>
        </div>
        {loading && <Spinner className="w-4 h-4 text-indigo-400" />}
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
            <div style={{ height: "1rem", backgroundColor: "#1e293b", borderRadius: "0.25rem", width: "75%" }} />
            <div style={{ height: "1.75rem", backgroundColor: "#1e293b", borderRadius: "0.25rem", width: "50%" }} />
            <div style={{ height: "0.75rem", backgroundColor: "#1e293b", borderRadius: "0.25rem", width: "80%" }} />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
