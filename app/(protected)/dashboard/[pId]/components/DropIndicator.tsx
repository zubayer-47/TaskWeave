import React from "react";

type DropIndicatorProps = {
  edge: "top" | "bottom";
  gap: string;
};

const DropIndicator = ({ edge, gap }: DropIndicatorProps) => {
  const edgeClassMap = {
    top: "edge-top",
    bottom: "edge-bottom",
  };

  const edgeClass = edgeClassMap[edge];

  const style = {
    "--gap": gap,
  };

  return <div className={edgeClass} style={style as React.CSSProperties}></div>;
};

export default DropIndicator;
