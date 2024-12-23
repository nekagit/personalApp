// src/service-workers/timer-worker.js
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'START_TIMER') {
    const endTime = event.data.endTime;
    
    setTimeout(() => {
      self.registration.showNotification('Timer Complete!', {
        body: 'Your timer has finished!',
        icon: '/timer-icon.png',
        vibrate: [200, 100, 200]
      });
    }, endTime - Date.now());
  }
});

export default null;