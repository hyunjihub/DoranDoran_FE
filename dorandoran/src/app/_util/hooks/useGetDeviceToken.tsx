'use client';

import axios from 'axios';
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase';

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY!;

export const getDeviceToken = async () => {
  try {
    if (!messaging) {
      console.warn('Messaging이 초기화되지 않았습니다.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('알림 권한이 거부되었습니다.');
      return;
    }
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });

    if (currentToken) {
      await axios.post('/api/notice/device-token', { deviceToken: currentToken });
    } else {
      console.warn('토큰을 얻지 못했습니다.');
    }
  } catch (error) {
    console.error('FCM 토큰 요청 실패:', error);
  }
};
