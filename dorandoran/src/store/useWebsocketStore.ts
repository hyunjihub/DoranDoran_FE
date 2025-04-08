import { createJSONStorage, persist } from 'zustand/middleware';

import { Client } from '@stomp/stompjs';
import { IMessage } from '@/app/_util/types/types';
import { create } from 'zustand';

interface WebSocketStore {
  socket: Client | null;
  subscribedRoomId: number | null;
  messages: IMessage[];

  connect: () => void;
  disconnect: () => void;
  subscribeRoom: (roomId: number) => void;
  sendMessage: (msg: string) => void;
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
          brokerURL: 'ws://your-websocket-url',
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
            socket.unsubscribe(`topic/${currentRoom}`);
          }

          socket.subscribe(`/topic/${roomId}`, (message) => {
            const parsed = JSON.parse(message.body);
            set((state) => ({
              messages: [...state.messages, parsed],
            }));
          });

          set({ subscribedRoomId: roomId, messages: [] });
        }
      },

      sendMessage: (msg: string) => {
        const socket = get().socket;
        const roomId = get().subscribedRoomId;

        if (socket && roomId) {
          socket.publish({
            destination: `/app/chat/${roomId}`,
            body: JSON.stringify({ content: msg }),
          });
        }
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
