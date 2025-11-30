import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,  // Force la vérification active des changements de fichiers (fix WSL)
      interval: 1000,    // Vérifie toutes les 1 seconde
    },
    host: true,  // Expose le serveur sur le réseau local
  },
})
