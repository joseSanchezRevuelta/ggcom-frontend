import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
 base: "/",
 plugins: [react()],
 preview: {
  port: 5173,
  strictPort: true,
 },
 server: {
  port: 5173,
  strictPort: true,
  host: true,
  origin: "http://0.0.0.0:5173",
 },
//  proxy: {
//     '/api': {
//       target: 'https://media.rawg.io',
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api/, ''),
//     },
//   },
});