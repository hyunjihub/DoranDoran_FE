importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyD9YOy7MG3f-wYHxiOcx35SbJy6dIldc_8',
  authDomain: 'doran-aa43b.firebaseapp.com',
  projectId: 'doran-aa43b',
  messagingSenderId: '128075909619',
  appId: '1:128075909619:web:9dcb0915d39b2e5585aa86',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || '새 알림';
  const notificationOptions = {
    body: payload.notification?.body || '',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
