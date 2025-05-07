import { createJSONStorage, persist } from 'zustand/middleware';

import { Client } from '@stomp/stompjs';
import { IMessage } from '@/app/_util/types/types';
import SockJS from 'sockjs-client';
import { create } from 'zustand';

interface WebSocketStore {
  socket: Client | null;
  subscribedRoomId: number | null;
  messages: IMessage[];

  connect: () => void;
  disconnect: () => void;
  subscribeRoom: (roomId: number) => void;
  unsubscribeRoom: () => void;
  sendMessage: (msg: string, type: string) => void;
  setMessage: (msg: IMessage[]) => void;
}

export const websocketStore = create<WebSocketStore>()(
  persist(
    (set, get) => ({
      socket: null,
      subscribedRoomId: null,
      messages: [],

      connect: () => {
        const currentSocket = get().socket;
        if (currentSocket && currentSocket.connected) return;

        const socket = new Client({
          webSocketFactory: () => new SockJS('https://api.dorandoran.online/ws/chat'),
          reconnectDelay: 5000,
          onConnect: () => {
            set({ socket });

            const roomId = get().subscribedRoomId;
            if (roomId !== null) {
              get().subscribeRoom(roomId);
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
          set({ socket: null, subscribedRoomId: null, messages: [] });
        }
      },

      subscribeRoom: (roomId: number) => {
        const socket = get().socket;
        const currentRoom = get().subscribedRoomId;

        if (socket && socket.connected && currentRoom !== roomId) {
          if (currentRoom !== null) {
            socket.unsubscribe(`/chatRoom/${currentRoom}`);
          }

          socket.subscribe(`/chatRoom/${roomId}`, (message) => {
            const parsed = JSON.parse(message.body);
            set((state) => ({
              messages: [...state.messages, parsed],
            }));
          });

          set({ subscribedRoomId: roomId, messages: [] });
        }
      },

      unsubscribeRoom: () => {
        const socket = get().socket;
        const currentRoom = get().subscribedRoomId;

        if (socket && socket.connected && currentRoom !== null) {
          socket.unsubscribe(`/chatRoom/${currentRoom}`);
          set({ subscribedRoomId: null, messages: [] });
        }
      },

      sendMessage: (msg: string, type: string) => {
        const socket = get().socket;
        const roomId = get().subscribedRoomId;

        if (socket && roomId) {
          socket.publish({
            destination: `/pub/${roomId}`,
            body: JSON.stringify({ content: msg, type }),
          });
        }
      },

      setMessage: (msg: IMessage[]) => {
        set({ messages: msg });
      },
    }),
    {
      name: 'websocketStorage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        subscribedRoomId: state.subscribedRoomId,
        messages: state.messages,
      }),
    }
  )
);
