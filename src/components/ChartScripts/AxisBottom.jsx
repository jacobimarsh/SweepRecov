import React from "react";

const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) => {
  const labelTicks = [0, 1000, 2000, 3000, 4000, 5000];

  return xScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
      fill="#635F5D"
    >
      <line y2={innerHeight} stroke="#C0C0BB" />
      <text
        style={{ textAnchor: "middle" }}
        dy=".71em"
        y={innerHeight + tickOffset}
      >
        {labelTicks.includes(tickValue) ? tickFormat(tickValue) : ""}
      </text>
    </g>
  ));
};
export default AxisBottom;
