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
        backgroundColor: "transparent",
        padding: "0.25rem",
        display: "grid",
        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
        gridTemplateRows: "repeat(3, minmax(0, 1fr))",
        gap: "0.75rem",
        overflow: "hidden",
        position: "relative",
      }}
      className={className}
    >
      {children}
    </div>
  );
};
