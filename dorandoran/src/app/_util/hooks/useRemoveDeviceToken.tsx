'use client';

import axios from 'axios';
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase';

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_APP_ID!;

export const removeDeviceToken = async () => {
  try {
    if (!messaging) {
      console.warn('Messaging이 초기화되지 않았습니다.');
      return;
    }

    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });

    if (currentToken) {
      await axios.delete('/api/notice/device-token', { data: { deviceToken: currentToken } });
    } else {
      console.warn('토큰을 얻지 못했습니다.');
    }
  } catch (error) {
    console.error('FCM 토큰 요청 실패:', error);
  }
};
