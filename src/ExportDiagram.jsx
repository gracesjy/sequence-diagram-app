// ExportDiagram.jsx
import React from "react";

const ExportDiagram = ({ nodes = [], phases = [], width = 800, height = 600 }) => {
  const nodeSpacing = 200;
  const messageSpacing = 60;

  if (!phases.length) return null;

  return (
    <div className="export-svg" style={{ display: "none" }}>
      <svg width={width} height={height}>
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="10"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="black" />
          </marker>
        </defs>

        {nodes.map((node, i) => {
          const x = i * nodeSpacing + 200;
          return (
            <line
              key={node}
              x1={x}
              y1={0}
              x2={x}
              y2={height}
              stroke="#ccc"
              strokeDasharray="4"
            />
          );
        })}

        {(() => {
          let currentY = 30;
          return phases.map((phase, phaseIndex) => {
            const phaseHeight = phase.messages.length * messageSpacing + 70;
            const startY = currentY;
            currentY += phaseHeight + 20;
            const bgColor = phaseIndex % 2 === 0 ? "#f9f9f9" : "#fff";

            return (
              <g key={phaseIndex}>
                <rect
                  x={60}
                  y={startY}
                  width={width - 120}
                  height={phaseHeight}
                  fill={bgColor}
                  stroke="#ccc"
                  rx={8}
                />
                <text
                  x={80}
                  y={startY + 25}
                  textAnchor="start"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {phase.name}
                </text>
                {phase.messages.map((msg, i) => {
                  const fromIndex = nodes.indexOf(msg.from);
                  const toIndex = nodes.indexOf(msg.to);
                  const y = startY + 50 + i * messageSpacing;
                  const x1 = fromIndex * nodeSpacing + 200;
                  const x2 = toIndex * nodeSpacing + 200;
                  const midX = (x1 + x2) / 2;
                  return (
                    <g key={i}>
                      <text
                        x={midX}
                        y={y - 8}
                        textAnchor="middle"
                        fontSize="12"
                      >
                        {msg.transaction}
                      </text>
                      <line
                        x1={x1}
                        y1={y}
                        x2={x2}
                        y2={y}
                        stroke="#007BFF"
                        markerEnd="url(#arrow)"
                      />
                      <text
                        x={midX}
                        y={y + 14}
                        textAnchor="middle"
                        fontSize="11"
                        fill="#666"
                      >
                        {msg.detail}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          });
        })()}
      </svg>
    </div>
  );
};

export default ExportDiagram;
