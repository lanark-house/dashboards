import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = "", style }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.65)",
        borderColor: "rgba(122, 139, 123, 0.25)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "1rem",
        padding: "1.25rem",
        boxShadow: "0 4px 20px -2px rgba(44, 53, 49, 0.05)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
