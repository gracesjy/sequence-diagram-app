import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // 선택사항: 스타일 파일

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);