import React from 'react';

// import SequenceDiagram from "./SequenceDiagram";
import SequenceDiagramPhasedColorizedTooltip from "./SequenceDiagram";
const phases = [
  {
    name: "JOB INFO RESV",
    messages: [
      { from: "EAP", to: "EIS", transaction: "EISEAP_JOB_INFO_RESV", detail: "EAP → EIS JOB Info" },
      { from: "EAP", to: "EQP", transaction: "S7F19·PPIDCHECK", detail: "EAP → EQP PPIDCHECK" },
    ],
  },
  {
    name: "PPID SUCC",
    messages: [
      { from: "EQP", to: "EAP", transaction: "S7F20·RFD_1", detail: "EQP → EAP 응답" },
    ],
  },
];

export default function App() {
  //return <SequenceDiagram phases={phases} />;
  return SequenceDiagramPhasedColorizedTooltip();
}
