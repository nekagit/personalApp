import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";

import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },

  plugins: [vue(), {
      name: 'service-worker',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/timer-worker.js') {
            res.setHeader('Content-Type', 'application/javascript');
            res.end(`
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
            `);
          } else {
            next();
          }
        });
      }
    }, vueJsx()],
  server: {
    headers: {
      "Service-Worker-Allowed": "/",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
