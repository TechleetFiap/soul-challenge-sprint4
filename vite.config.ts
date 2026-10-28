import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  // Destino do proxy em desenvolvimento: a API local ou a publicada no Render.
  const alvoApi = env.VITE_API_URL || "http://localhost:8080";

  return {
    plugins: [react()],
    server: {
      port: 5173,
      // Falha se a porta estiver ocupada, para o endereço de acesso não mudar.
      strictPort: true,
      // O navegador chama /techleet/... no próprio front e o Vite repassa para a API.
      proxy: {
        "/techleet": {
          target: alvoApi,
          changeOrigin: true,
        },
      },
    },
  };
});
