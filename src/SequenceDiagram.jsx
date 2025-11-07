import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

const SequenceDiagramPhasedColorizedTooltip = () => {
  const [shiftX, setShiftX] = useState(0);
  const [expandedPhases, setExpandedPhases] = useState({});
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });
  const containerRef = useRef(null);

  const phases_EQMode = [
  { name: "ONLINE_LOCAL_REP", messages: [{ from: "EQP", to: "EAP", transaction: "ERS_PROC" }, { from: "EAP", to: "EIS", transaction: "EAPEIS_EQMODE_OL" }] },
  { name: "ONLINE_REMOTE_REQ", messages: [{ from: "EIS", to: "EAP", transaction: "EISEAP_EQMODE_OR_REQ" }, { from: "EAP", to: "EQP", transaction: "RONL" }] },
  { name: "ONLINE_REMOTE_REP", messages: [{ from: "EQP", to: "EAP", transaction: "ERS_PROC" }, { from: "EAP", to: "EIS", transaction: "EAPEIS_EQMODE_OR" }] },
  { name: "OFFLINE_REQ", messages: [{ from: "EIS", to: "EAP", transaction: "EISEAP_EQMODE_OF_REQ" }, { from: "EAP", to: "EQP", transaction: "ROFL" }] },
  { name: "OFFLINE_REP", messages: [{ from: "EQP", to: "EAP", transaction: "ERS_PROC" }, { from: "EAP", to: "EIS", transaction: "EAPEIS_EQMODE_OF" }] },
];

const phases_LotTracking = [
  {
    "name": "JOB_INFO_RESV",
    "messages": [
      {
        "from": "EIS",
        "to": "EAP",
        "transaction": "EISEAP_JOB_INFO_RESV",
        "detail": "EAP이 EQP로 EISEAP_JOB_INFO_RESV 송신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "PPIDCHECK",
        "detail": "EAP이 EQP로 PPIDCHECK 전송"
      }
    ]
  },
  {
    "name": "PPID_SUCC",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "S7F20",
        "detail": "EQP이 EAP로 RED_1 수신"
      },
      {
        "from": "EAP",
        "to": "EAP",
        "transaction": "EAP_PPIDCHECK",
        "detail": "EAP이 EQP로 EAP_PPIDCHECK 호출"
      }
    ]
  },
  {
    "name": "CARRIER_ARRIVED",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "ERS_MODE",
        "detail": "EQP이 EAP로 ERS_MODE 수신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EAPEIS_PORT_ARRIVED",
        "detail": "EAP이 EQP로 EAPEIS_PORT_ARRIVED 호출"
      }
    ]
  },
  {
    "name": "CARRIER_READ",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "ERS_MAP",
        "detail": "EQP이 EAP로 ERS_MAP 수신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EAPEIS_VERIFY_SLOT_REQ",
        "detail": "EAP이 EQP로 EAPEIS_VERIFY_SLOT_REQ 호출"
      }
    ]
  },
  {
    "name": "CARRIER_READ_SUCC",
    "messages": [
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EISEAP_VERIFY_SLOT_SUCC",
        "detail": "EAP이 EQP로 EISEAP_VERIFY_SLOT_SUCC 송신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "HCS_PRJOB_CREATE",
        "detail": "EAP이 EQP로 HCS_PRJOB_CREATE 전송"
      }
    ]
  },
  {
    "name": "START_CMD_REQ",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "ERS_MODE",
        "detail": "EQP이 EAP로 ERS_MODE 수신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EAPEIS_START_CMD_REQ",
        "detail": "EAP이 EQP로 EAPEIS_START_CMD_REQ 호출"
      }
    ]
  },
  {
    "name": "START_CMD",
    "messages": [
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EISEAP_START_CMD",
        "detail": "EAP이 EQP로 EISEAP_START_CMD 송신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "HCS_START",
        "detail": "EAP이 EQP로 HCS_START 전송"
      }
    ]
  },
  {
    "name": "MVIN",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "ERS_MODE",
        "detail": "EQP이 EAP로 ERS_MODE 수신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EAPEIS_MVIN_REQ",
        "detail": "EAP이 EQP로 EAPEIS_MVIN_REQ 호출"
      },
      {
        "from": "EAP",
        "to": "FDC",
        "transaction": "EAPFDC_TOOLEVENT",
        "detail": "EAP이 FDC로 EAPFDC_TOOLEVENT 호출"
      }
    ]
  },
  {
    "name": "STEPPERSTART",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "ERS_INLINE",
        "detail": "EQP이 EAP로 ERS_INLINE 수신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EAPEIS_STEPPER_START_REQ",
        "detail": "EAP이 EQP로 EAPEIS_STEPPER_START_REQ 호출"
      }
    ]
  },
  {
    "name": "MVOU",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "ERS_MODE",
        "detail": "EQP이 EAP로 ERS_MODE 수신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EAPEIS_MVOU_REQ",
        "detail": "EAP이 EQP로 EAPEIS_MVOU_REQ 호출"
      },
      {
        "from": "EAP",
        "to": "FDC",
        "transaction": "EAPFDC_TOOLEVENT",
        "detail": "EAP이 FDC로 EAPFDC_TOOLEVENT 호출"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EAP_CHANNELREMOVE",
        "detail": "EAP이 EQP로 EAP_CHANNELREMOVE 호출"
      }
    ]
  },
  {
    "name": "PORT_UNLOAD",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "ERS_MODE",
        "detail": "EQP이 EAP로 ERS_MODE 수신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EAPEIS_PORT_UNLOAD",
        "detail": "EAP이 EQP로 EAPEIS_PORT_UNLOAD 호출"
      }
    ]
  }
];

const phases_FDC = [
  { name: "SETSENSOR", messages: [{ from: "EIS", to: "EAP", transaction: "FDCEAP_SETSENSOR" }] },
  { name: "STOPSENSOR", messages: [{ from: "EIS", to: "EAP", transaction: "FDCEAP_STOPSENSOR" }] },
  { name: "TOOLDATA", messages: [{ from: "EQP", to: "EAP", transaction: "TRACE_DATA" }, { from: "EAP", to: "FDC", transaction: "EAPFDC_TOOLDATA" }] },
];

// === 여러 시나리오를 모아둔 Map ===
const allPhaseSets = {
  "EQMode": phases_EQMode,
  "LotTracking": phases_LotTracking,
  "FDC": phases_FDC,
};


  const handleSelectChange = (e) => {
    const key = e.target.value;
    setSelectedScenario(key);
    setPhases(allPhaseSets[key]);
  };

  const handleSaveDiagram = () => {
    setShiftX(-30);
    const svgElements = document.querySelectorAll("svg");
    if (svgElements.length === 0) return;

    const combinedHTML = Array.from(svgElements)
      .map((svg) => svg.outerHTML)
      .join("<br/>");

    const newWindow = window.open("", "", "width=1200,height=800");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>시퀀스 다이어그램</title>
            <style>
              body { margin: 0; padding: 20px; background: white; }
            </style>
          </head>
          <body>
            ${combinedHTML}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
            <script>
              window.onload = () => {
                html2canvas(document.body, {
                  backgroundColor: '#ffffff',
                  scale: 2,
                }).then((canvas) => {
                  const link = document.createElement('a');
                  link.download = 'sequence-diagram.png';
                  link.href = canvas.toDataURL('image/png');
                  link.click();
                });
              };
            </script>
          </body>
        </html>
      `);
      setShiftX(0);
      newWindow.document.close();
    }
  };

  // Nodes and phases (same as before)
  const nodes = ["EQP", "EAP", "EIS", "FDC"];
  /*
  const phases = [
  {
    "name": "INIT",
    "messages": [
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "CR_H",
        "detail": "EAP이 EQP로 CR_H 전송"
      }
    ]
  },
  {
    "name": "INIT_ACK",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "CRA_E",
        "detail": "EQP이 EAP로 CRA_E 수신"
      }
    ]
  },
  {
    "name": "ALLDisableEventReport",
    "messages": [
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "INIT_ACK",
        "detail": "EAP이 EQP로 INIT_ACK 송신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "DER",
        "detail": "EAP이 EQP로 DER 전송"
      }
    ]
  },
  {
    "name": "ALL_DISABLE_ACK",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "DEA",
        "detail": "EQP이 EAP로 DEA 수신"
      }
    ]
  },
  {
    "name": "UnLinkEventReport",
    "messages": [
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "ALL_DISABLE_ACK",
        "detail": "EAP이 EQP로 ALL_DISABLE_ACK 송신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "ULER",
        "detail": "EAP이 EQP로 ULER 전송"
      }
    ]
  },
  {
    "name": "UNLINK_ACK",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "ULERA",
        "detail": "EQP이 EAP로 ULERA 수신"
      }
    ]
  },
  {
    "name": "UnDefineReport",
    "messages": [
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "UNLINK_ACK",
        "detail": "EAP이 EQP로 UNLINK_ACK 송신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "UDR",
        "detail": "EAP이 EQP로 UDR 전송"
      }
    ]
  },
  {
    "name": "UNDEFINE_ACK",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "UDRA",
        "detail": "EQP이 EAP로 UDRA 수신"
      }
    ]
  },
  {
    "name": "DefineReport",
    "messages": [
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "UNDEFINE_ACK",
        "detail": "EAP이 EQP로 UNDEFINE_ACK 송신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "DR",
        "detail": "EAP이 EQP로 DR 전송"
      }
    ]
  },
  {
    "name": "DEFINE_ACK",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "DRA",
        "detail": "EQP이 EAP로 DRA 수신"
      }
    ]
  },
  {
    "name": "LinkEventReport",
    "messages": [
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "DEFINE_ACK",
        "detail": "EAP이 EQP로 DEFINE_ACK 송신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "LER",
        "detail": "EAP이 EQP로 LER 전송"
      }
    ]
  },
  {
    "name": "LINK_ACK",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "LERA",
        "detail": "EQP이 EAP로 LERA 수신"
      }
    ]
  },
  {
    "name": "ALLEnableEventReport",
    "messages": [
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "LINK_ACK",
        "detail": "EAP이 EQP로 LINK_ACK 송신"
      },
      {
        "from": "EAP",
        "to": "EQP",
        "transaction": "EER_2",
        "detail": "EAP이 EQP로 EER_2 전송"
      }
    ]
  },
  {
    "name": "ALLENABLEACK",
    "messages": [
      {
        "from": "EQP",
        "to": "EAP",
        "transaction": "DEA_1",
        "detail": "EQP이 EAP로 DEA_1 수신"
      }
    ]
  }
];
*/
  const [selectedScenario, setSelectedScenario] = useState("LotTracking");
  const [phases, setPhases] = useState(allPhaseSets["LotTracking"]);



  const nodeSpacing = 200;
  const boxWidth = 100;
  const boxHeight = 80;
  const messageSpacing = 60;
  const diagramWidth = nodes.length * nodeSpacing + 200;

  const isExpanded = (name) =>
    expandedPhases[name] !== undefined ? expandedPhases[name] : true;

  const togglePhase = (name) => {
    setExpandedPhases((prev) => ({ ...prev, [name]: !isExpanded(name) }));
  };

  const totalHeight =
    phases.reduce(
      (acc, phase) =>
        acc +
        (isExpanded(phase.name)
          ? phase.messages.length * messageSpacing + 100
          : 80),
      0
    ) + 150;

  const getPhaseColor = (index) =>
    index % 2 === 0 ? "#f9f9f9" : "#ffffff";

  // 툴팁 표시/이동/숨김 함수
  const showTooltip = (event, text) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    // 화면 밖으로 나가지 않게 간단한 보정
    const offsetX = 12;
    const offsetY = 12;
    let x = mouseX + offsetX;
    let y = mouseY + offsetY;

    if (containerRect) {
      // 오른쪽 경계 보정
      const maxX = containerRect.left + containerRect.width - 220; // 툴팁 최대 너비 고려
      if (x > maxX) x = maxX;
      // 아래쪽 경계 보정
      const maxY = containerRect.top + containerRect.height - 60;
      if (y > maxY) y = maxY;
    }

    setTooltip({ visible: true, x, y, text });
  };

  const hideTooltip = () => {
    setTooltip((t) => ({ ...t, visible: false }));
  };

  return (
    
    <div style={{ position: "relative" }} ref={containerRef}>
      {/* === ✅ 시나리오 선택 콤보박스 추가 === */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "150px",
          zIndex: 200,
          background: "#fff",
          padding: "6px 8px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <label style={{ fontSize: "13px", fontWeight: "bold", marginRight: "6px" }}>
          시나리오:
        </label>
        <select
          value={selectedScenario}
          onChange={handleSelectChange}
          style={{
            fontSize: "13px",
            padding: "4px 6px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          {Object.keys(allPhaseSets).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      {/* 저장 버튼 */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 100,
        }}
      >
        <button
          onClick={handleSaveDiagram}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          시퀀스저장
        </button>
      </div>
      

      {/* 노드 헤더 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: `${boxHeight}px`,
          background: "#fff",
          zIndex: 10,
          borderBottom: "1px solid #ccc",
        }}
      >
        <svg width={diagramWidth} height={boxHeight}>
          {nodes.map((node, index) => {
            const centerX = index * nodeSpacing + 200;
            return (
              <g key={node}>
                <rect
                  x={centerX - boxWidth / 2 + shiftX}
                  y={15}
                  width={boxWidth}
                  height={boxHeight - 20}
                  rx={8}
                  ry={8}
                  fill="transparent"
                  stroke="#ccc"
                />
                <image
                  href="/images/System.png"
                  x={centerX - 20}
                  y={20}
                  width="40"
                  height="40"
                />
                <text
                  x={centerX + shiftX}
                  y={65}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {node}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* 시퀀스 본문 */}
      <div
        style={{
          marginTop: boxHeight,
          height: "800px",
          overflowY: "auto",
          background: "#fff",
          position: "relative",
        }}
      >
        <svg width={diagramWidth} height={totalHeight}>
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

          {/* lifeline (뒤쪽) */}
          {nodes.map((node, index) => {
            const centerX = index * nodeSpacing + 200;
            return (
              <line
                key={`back-${node}`}
                x1={centerX}
                y1={0}
                x2={centerX}
                y2={totalHeight}
                stroke="#e0e0e0"
                strokeDasharray="4"
                strokeWidth="1"
              />
            );
          })}

          {/* Phase 그룹 */}
          {(() => {
            let currentY = 30;
            return phases.map((phase, phaseIndex) => {
              const expanded = isExpanded(phase.name);
              const phaseHeight = expanded
                ? phase.messages.length * messageSpacing + 70
                : 60;
              const startY = currentY;
              currentY += phaseHeight + 20;
              const bgColor = getPhaseColor(phaseIndex);

              return (
                <g key={phaseIndex}>
                  {/* Phase 배경 */}
                  <rect
                    x={60}
                    y={startY}
                    width={diagramWidth - 120}
                    height={phaseHeight}
                    fill={bgColor}
                    stroke="#ccc"
                    rx={8}
                  />
                  {/* Phase 제목 (토글) */}
                  <text
                    x={80}
                    y={startY + 25}
                    textAnchor="start"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#333"
                    style={{ cursor: "pointer", userSelect: "none" }}
                    onClick={() => togglePhase(phase.name)}
                  >
                    {expanded ? "▼ " : "▶ "}
                    {phase.name}
                  </text>

                  {/* 메시지 (툴팁 이벤트 바인딩) */}
                  {expanded &&
                    phase.messages.map((msg, i) => {
                      const fromIndex = nodes.indexOf(msg.from);
                      const toIndex = nodes.indexOf(msg.to);
                      const y = startY + 50 + i * messageSpacing;
                      const x1 = fromIndex * nodeSpacing + 200;
                      const x2 = toIndex * nodeSpacing + 200;
                      const midX = (x1 + x2) / 2;
                      const radius = 15;
                      const isSelf = msg.from === msg.to;

                      if (isSelf) {
                          const prevMsg = phase.messages[i - 1];
                          let isClockwise = true; // 기본값

                          if (prevMsg) {
                            const prevFrom = nodes.indexOf(prevMsg.from);
                            const prevTo = nodes.indexOf(prevMsg.to);
                            if (prevTo > prevFrom) {
                              // 이전 메시지가 오른쪽으로 갔으면 → self-loop은 반시계 ↺
                              isClockwise = true;
                            } else if (prevTo < prevFrom) {
                              // 이전 메시지가 왼쪽으로 갔으면 → self-loop은 시계 ↻
                              isClockwise = false;
                            }
                          }

                          // 🎯 self-loop path
                          const r = 15;
                          const offsetX = isClockwise ? 15 : -15;
                          const endY = y + 25;

                          return (
                            <g key={i}>
                              <path
                                d={`M ${x1} ${y}
                                    A ${Math.abs(offsetX)} ${r} 0 1 ${isClockwise ? 1 : 0} ${x1} ${endY}`}
                                fill="none"
                                stroke={isClockwise ? "#007BFF" : "#FF5733"}
                                strokeWidth="1"
                                markerEnd="url(#arrow)"
                              />
                              <text
                                x={x1 + offsetX + (isClockwise ? 10 : -10)}
                                y={y + r / 2}
                                textAnchor={isClockwise ? "start" : "end"}
                                fontSize="12"
                                fill="#333"
                              >
                                {msg.transaction}
                              </text>
                            </g>
                          );
                        }


                      // 툴팁은 line과 transaction text에 바인딩
                      return (
                        <g key={i}>
                          <text
                            x={midX}
                            y={y - 8}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#333"
                            style={{ pointerEvents: "none" }}
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
                            style={{ cursor: "default" }}
                            onMouseEnter={(e) => showTooltip(e, msg.detail)}
                            onMouseMove={(e) => showTooltip(e, msg.detail)}
                            onMouseLeave={hideTooltip}
                          />

                          <text
                            x={midX}
                            y={y + 14}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#666"
                            style={{ pointerEvents: "none" }}
                          >
                            {msg.detail}
                          </text>

                          {/* invisible wide rect to make hover area 더 넓게 할 수 있음 */}
                          <rect
                            x={Math.min(x1, x2)}
                            y={y - 8}
                            width={Math.abs(x2 - x1)}
                            height={20}
                            fill="transparent"
                            onMouseEnter={(e) => showTooltip(e, msg.detail)}
                            onMouseMove={(e) => showTooltip(e, msg.detail)}
                            onMouseLeave={hideTooltip}
                            style={{ cursor: "default" }}
                          />
                        </g>
                      );
                    })}
                </g>
              );
            });
          })()}

          {/* lifeline (앞쪽) */}
          {nodes.map((node, index) => {
            const centerX = index * nodeSpacing + 200;
            return (
              <line
                key={`front-${node}`}
                x1={centerX}
                y1={0}
                x2={centerX}
                y2={totalHeight}
                stroke="#ccc"
                strokeDasharray="4"
                strokeWidth="1"
              />
            );
          })}
        </svg>

        {/* HTML 툴팁 (절대위치) */}
        {tooltip.visible && (
          <div
            style={{
              position: "fixed",
              left: tooltip.x,
              top: tooltip.y,
              zIndex: 9999,
              pointerEvents: "none",
              maxWidth: 220,
              background: "rgba(0,0,0,0.85)",
              color: "#fff",
              padding: "8px 10px",
              borderRadius: 6,
              fontSize: 13,
              lineHeight: "1.2",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default SequenceDiagramPhasedColorizedTooltip;
