import React from 'react';

const SequenceDiagram = () => {
  const nodes = ['Client', 'API Gateway', 'Auth Service', 'User DB', 'Logger'];
  const messages = [
    { from: 'Client', to: 'API Gateway', transaction: 'LoginRequest', detail: '사용자가 로그인 요청을 보냅니다' },
    { from: 'API Gateway', to: 'Auth Service', transaction: 'VerifyCredentials', detail: '자격 증명을 인증 서비스에 전달합니다' },
    { from: 'Auth Service', to: 'User DB', transaction: 'QueryUser', detail: '사용자 정보를 데이터베이스에서 조회합니다' },
    { from: 'User DB', to: 'Auth Service', transaction: 'UserInfoResponse', detail: '조회된 사용자 정보를 반환합니다' },
    { from: 'Auth Service', to: 'Logger', transaction: 'LogLogin', detail: '로그인 시도를 로깅합니다' },
    { from: 'Auth Service', to: 'API Gateway', transaction: 'AuthResult', detail: '인증 결과를 게이트웨이에 전달합니다' },
    { from: 'API Gateway', to: 'Client', transaction: 'LoginResponse', detail: '클라이언트에게 로그인 결과를 응답합니다' },
  ];

  const nodeSpacing = 150;
  const boxWidth = 100;
  const boxHeight = 80;
  const imageSize = 40;
  const messageSpacing = 60;
  const diagramHeight = messages.length * messageSpacing + 100;

  // 자동 판별: Request/Reply 쌍 인식
  const classifyMessageType = (msg, index) => {
    const pair = messages.find((m, i) =>
      i !== index &&
      m.from === msg.to &&
      m.to === msg.from &&
      m.transaction.toLowerCase().includes('response') &&
      msg.transaction.toLowerCase().includes('request')
    );
    return pair ? 'reply' : msg.transaction.toLowerCase().includes('response') ? 'reply' : 'single';
  };

  const colorMap = {
    request: '#007BFF', // 파란색
    reply: '#00BFA5',   // 청록색
    single: '#000000'   // 기본 검정
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 고정 노드 헤더 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '1000px',
          height: `${boxHeight}px`,
          background: '#fff',
          zIndex: 10,
          borderBottom: '1px solid #ccc',
        }}
      >
        <svg width="1000" height={boxHeight}>
          {nodes.map((node, index) => {
            const centerX = index * nodeSpacing + 50;
            return (
              <g key={node}>
                <rect
                  x={centerX - boxWidth / 2 + 30}
                  y={10 + 5}
                  width={boxWidth}
                  height={boxHeight - 20}
                  rx={8}
                  ry={8}
                  fill="#f0f0f0"
                  stroke="#999"
                />
                <image
                  href={`/images/${node}.png`}
                  x={centerX - imageSize / 2 + 30}
                  y={20}
                  width={imageSize}
                  height={imageSize}
                />
                <text
                  x={centerX + 30}
                  y={70}
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

      {/* 스크롤 가능한 메시지 영역 */}
      <div style={{ marginTop: boxHeight, height: '700px', overflowY: 'auto' }}>
        <svg width="1000" height={diagramHeight}>
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

          {/* 수직 점선 */}
          {nodes.map((node, index) => {
            const centerX = index * nodeSpacing + 50;
            return (
              <line
                key={node}
                x1={centerX}
                y1={0}
                x2={centerX}
                y2={diagramHeight}
                stroke="#ccc"
                strokeDasharray="4"
              />
            );
          })}

          {/* 메시지 화살표 */}
          {messages.map((msg, i) => {
            const fromIndex = nodes.indexOf(msg.from);
            const toIndex = nodes.indexOf(msg.to);
            const y = boxHeight + (i + 1) * messageSpacing;

            const x1 = fromIndex * nodeSpacing + 50;
            const x2 = toIndex * nodeSpacing + 50;
            const midX = (x1 + x2) / 2;

            const type = classifyMessageType(msg, i);
            const strokeColor = colorMap[type] || '#000';

            return (
              <g key={i}>
                <title>{msg.detail}</title>
                <text
                  x={midX}
                  y={y - 10}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#333"
                >
                  {msg.transaction}
                </text>
                <line
                  x1={x1}
                  y1={y}
                  x2={x2}
                  y2={y}
                  stroke={strokeColor}
                  markerEnd="url(#arrow)"
                />
                <text
                  x={midX}
                  y={y + 15}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#666"
                >
                  {msg.detail}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default SequenceDiagram;