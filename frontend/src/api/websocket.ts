// src/api/websocket.ts
import { Client } from '@stomp/stompjs';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const WS_BASE = API_BASE_URL.replace(/^http/, 'ws');
export const WS_URL = `${WS_BASE}/ws/websocket`;

export const createStompClient = () =>
  new Client({
    brokerURL: WS_URL,
    reconnectDelay: 3000,
  });
