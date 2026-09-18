import React from "react";

interface StandardFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const StandardFrame: React.FC<StandardFrameProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        backgroundColor: "#020617",
        border: "1px solid #1e293b",
        borderRadius: "1.5rem",
        padding: "1rem",
        display: "grid",
        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
        gridTemplateRows: "repeat(3, minmax(0, 1fr))",
        gap: "0.75rem",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
        position: "relative",
      }}
      className={className}
    >
      {children}
    </div>
  );
};
