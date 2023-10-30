import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/deckbook/',
  plugins: [react()],

  build: {
    manifest: true,
    rollupOptions: {
      external: [
        'D:/Code/personal/deckbook/src/components/CardTextEditor/nodes/TableComponent.tsx',
        'D:/Code/personal/deckbook/src/components/CardTextEditor/plugins/CommentPlugin/index.tsx',
      ],
    },
  },
});
