import { createJSONStorage, persist } from 'zustand/middleware';

import { Client } from '@stomp/stompjs';
import { IMessage } from '@/app/_util/types/types';
import SockJS from 'sockjs-client';
import { create } from 'zustand';

interface WebSocketStore {
  socket: Client | null;
  subscribedRoomId: number | null;
  subscribedRoomType: 'group' | 'private' | null;

  connect: () => void;
  disconnect: () => void;
  subscribeRoom: (roomId: number, roomType: 'group' | 'private') => void;
  unsubscribeRoom: () => void;
  sendMessage: (msg: string, type: string) => void;
  setMessageHandler: (handler: (msg: IMessage) => void) => void;
  clearMessageHandler: () => void;
}

let messageHandler: ((msg: IMessage) => void) | null = null;

export const websocketStore = create<WebSocketStore>()(
  persist(
    (set, get) => ({
      socket: null,
      subscribedRoomId: null,
      subscribedRoomType: null,

      connect: () => {
        const currentSocket = get().socket;
        if (currentSocket && currentSocket.connected) return;

        const socket = new Client({
          webSocketFactory: () => new SockJS('https://api.dorandoran.online/ws/chat'),
          reconnectDelay: 5000,
          onConnect: () => {
            set({ socket });

            const { subscribedRoomId, subscribedRoomType } = get();
            if (subscribedRoomId !== null && subscribedRoomType !== null) {
              get().subscribeRoom(subscribedRoomId, subscribedRoomType);
            }
          },
        });

        socket.activate();
        set({ socket });
      },

      disconnect: () => {
        const socket = get().socket;
        if (socket) {
          socket.deactivate();
          set({ socket: null, subscribedRoomId: null, subscribedRoomType: null });
        }
      },

      subscribeRoom: (roomId, roomType) => {
        const socket = get().socket;
        const { subscribedRoomId, subscribedRoomType } = get();

        const prevTopic =
          subscribedRoomId !== null && subscribedRoomType !== null
            ? `/${subscribedRoomType}/${subscribedRoomId}`
            : null;

        const newTopic = `/sub/${roomType}/${roomId}`;

        if (socket && socket.connected) {
          if (prevTopic) {
            socket.unsubscribe(prevTopic);
          }

          socket.subscribe(newTopic, (message) => {
            try {
              const parsed: IMessage = JSON.parse(message.body);
              if (messageHandler) {
                messageHandler(parsed);
              }
            } catch (error) {
              console.error('메시지 파싱 오류:', error);
            }
          });

          socket.publish({
            destination: `/pub/${subscribedRoomType}/${subscribedRoomId}`,
            body: JSON.stringify({ content: null, type: 'enter' }),
          });

          set({ subscribedRoomId: roomId, subscribedRoomType: roomType });
        }
      },

      unsubscribeRoom: () => {
        const socket = get().socket;
        const { subscribedRoomId, subscribedRoomType } = get();

        if (socket && socket.connected && subscribedRoomId !== null && subscribedRoomType !== null) {
          const topic = `/${subscribedRoomType}/${subscribedRoomId}`;
          socket.publish({
            destination: `/pub/${subscribedRoomType}/${subscribedRoomId}`,
            body: JSON.stringify({ content: null, type: 'leave' }),
          });
          socket.unsubscribe(topic);
          set({ subscribedRoomId: null, subscribedRoomType: null });
        }
      },

      sendMessage: (msg: string, type: string) => {
        const socket = get().socket;
        const { subscribedRoomId, subscribedRoomType } = get();

        if (socket && subscribedRoomId && subscribedRoomType) {
          socket.publish({
            destination: `/pub/${subscribedRoomType}/${subscribedRoomId}`,
            body: JSON.stringify({ content: msg, type }),
          });
        }
      },

      setMessageHandler: (handler) => {
        messageHandler = handler;
      },

      clearMessageHandler: () => {
        messageHandler = null;
      },
    }),
    {
      name: 'websocketStorage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        subscribedRoomId: state.subscribedRoomId,
        subscribedRoomType: state.subscribedRoomType,
      }),
    }
  )
);
