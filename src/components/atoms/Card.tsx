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
        backgroundColor: "rgba(15, 23, 42, 0.8)",
        borderColor: "rgba(30, 41, 59, 0.8)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "0.75rem",
        padding: "0.75rem",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
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
